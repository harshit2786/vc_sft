import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Position, useReactFlow, MarkerType } from 'reactflow';
import { BaseNode } from './BaseNode';

// Matches {{ validJsIdentifier }} with optional surrounding whitespace
const VAR_REGEX = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;

// Deterministic display name derived from the ReactFlow node's id
const getNodeName = (node) => {
  switch (node.type) {
    case 'customInput':  return node.id.replace('customInput-', 'input_');
    case 'customOutput': return node.id.replace('customOutput-', 'output_');
    case 'llm':          return node.id.replace('llm-', 'llm_');
    case 'text':         return node.id.replace('text-', 'text_');
    case 'codeExecution':return node.id.replace('codeExecution-', 'code_execution_');
    case 'api':          return node.id.replace('api-', 'api_');
    case 'urlScraper':   return node.id.replace('urlScraper-', 'url_loader_');
    case 'fetchStock':   return node.id.replace('fetchStock-', 'fetch_stock_prices_');
    case 'wait':         return node.id.replace('wait-', 'wait_node_');
    default:             return node.id;
  }
};

// The source handle id that each connectable node type exposes
const getSourceHandle = (node) => {
  switch (node.type) {
    case 'customInput':   return `${node.id}-value`;
    case 'llm':           return `${node.id}-response`;
    case 'text':
    case 'codeExecution':
    case 'api':
    case 'urlScraper':
    case 'fetchStock':
    case 'wait':          return `${node.id}-output`;
    default:              return null;
  }
};

const MIN_WIDTH = 240;
const MAX_WIDTH = 440;
const CH_PX = 7.5; // approximate px per character for width estimation

const icon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 4.5h10M3 8h10M3 11.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const staticHandles = [
  { suffix: 'output', type: 'source', position: Position.Right },
];

const fields = [
  {
    key: 'textName',
    label: 'Name',
    type: 'text',
    isPill: true,
    defaultValue: (id) => id.replace('text-', 'text_'),
  },
  {
    key: 'text',
    label: 'Text',
    type: 'textarea',
    defaultValue: '',
    placeholder: 'Type {{varName}} to reference another node…',
    style: { minHeight: 64, resize: 'none', overflow: 'hidden', width: '100%' },
  },
];

export const TextNode = ({ id, data }) => {
  // Mirror the textarea value so we can derive variables and width from it
  const [text, setText] = useState(data?.text ?? '');
  const textareaRef = useRef(null);
  const { getNodes, setEdges } = useReactFlow();

  // ── Parsed variables (deduplicated) ─────────────────────────────────
  const variables = useMemo(() => {
    const hits = [...text.matchAll(VAR_REGEX)].map((m) => m[1]);
    return [...new Set(hits)];
  }, [text]);

  // ── Dynamic node width based on longest line ─────────────────────────
  const nodeWidth = useMemo(() => {
    const lines = text.split('\n');
    const longest = Math.max(...lines.map((l) => l.length), 28);
    return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, longest * CH_PX + 48));
  }, [text]);

  // ── Auto-grow textarea height ────────────────────────────────────────
  const resizeTextarea = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${ta.scrollHeight}px`;
  }, []);

  useEffect(() => { resizeTextarea(); }, [text, resizeTextarea]);

  // ── Auto-connect: variable name → matching node ──────────────────────
  useEffect(() => {
    const nodes = getNodes();

    // Build name → node map for every node except this one
    const nameMap = {};
    nodes.forEach((n) => { if (n.id !== id) nameMap[getNodeName(n)] = n; });

    // Edges we WANT to exist for the current variable set
    const wanted = [];
    variables.forEach((varName) => {
      const peer = nameMap[varName];
      if (!peer) return;
      const srcHandle = getSourceHandle(peer);
      if (!srcHandle) return;
      wanted.push({
        id: `e-auto__${peer.id}__${id}__${varName}`,
        source: peer.id,
        sourceHandle: srcHandle,
        target: id,
        targetHandle: `${id}-var-${varName}`,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#6366f1', strokeWidth: 1.5 },
        markerEnd: { type: MarkerType.Arrow, height: '18px', width: '18px', color: '#6366f1' },
      });
    });

    const wantedIds = new Set(wanted.map((e) => e.id));

    setEdges((prev) => {
      // Remove stale auto-edges that target this text node
      const kept = prev.filter((e) =>
        !(e.target === id && e.id.startsWith('e-auto__') && !wantedIds.has(e.id))
      );
      // Add newly desired edges
      const existingIds = new Set(kept.map((e) => e.id));
      const toAdd = wanted.filter((e) => !existingIds.has(e.id));
      return toAdd.length > 0 ? [...kept, ...toAdd] : kept;
    });
  }, [variables, id, getNodes, setEdges]);

  // ── Dynamic handles: one target per detected variable ────────────────
  const dynamicHandles = variables.map((varName, idx) => ({
    suffix: `var-${varName}`,
    type: 'target',
    position: Position.Left,
    style: {
      top: variables.length === 1
        ? '50%'
        : `${((idx + 1) / (variables.length + 1)) * 100}%`,
    },
  }));

  // Keep local `text` in sync so we can derive variables/width
  const onFieldChange = useCallback((key, value) => {
    if (key === 'text') setText(value);
  }, []);

  return (
    <BaseNode
      id={id}
      data={data}
      label="Text"
      icon={icon}
      description={`Write text or type {{name}} to reference a node by its name.`}
      handles={staticHandles}
      dynamicHandles={dynamicHandles}
      fields={fields}
      width={nodeWidth}
      onFieldChange={onFieldChange}
      fieldRefs={{ text: textareaRef }}
    >
      {/* Variable tags — shown above the textarea */}
      {variables.length > 0 && (
        <div className="vs-var-tags">
          {variables.map((v) => (
            <span key={v} className="vs-var-tag">{`{{${v}}}`}</span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
