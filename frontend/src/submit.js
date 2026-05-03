import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const BACKEND_URL = 'http://localhost:8000';

// ── API helper ────────────────────────────────────────────────────────

async function submitPipeline(nodes, edges) {
  const response = await fetch(`${BACKEND_URL}/pipelines/parse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nodes: nodes.map((n) => ({ id: n.id })),
      edges: edges.map((e) => ({ source: e.source, target: e.target })),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Server responded ${response.status}: ${text}`);
  }

  return response.json(); // { num_nodes, num_edges, is_dag }
}

// ── Store selector ────────────────────────────────────────────────────

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

// ── Components ────────────────────────────────────────────────────────

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await submitPipeline(nodes, edges);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="vs-submit-bar">
        <button
          className="vs-submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Analysing…' : 'Run Pipeline'}
        </button>
      </div>

      {(result || error) && (
        <PipelineResultModal
          result={result}
          error={error}
          onClose={() => { setResult(null); setError(null); }}
        />
      )}
    </>
  );
};

// ── Result modal ──────────────────────────────────────────────────────

function PipelineResultModal({ result, error, onClose }) {
  return (
    <div className="vs-modal-overlay" onClick={onClose}>
      <div className="vs-modal" onClick={(e) => e.stopPropagation()}>
        <div className="vs-modal-header">
          <span className="vs-modal-title">Pipeline Analysis</span>
          <button className="vs-modal-close" onClick={onClose}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1.5 1.5l10 10M11.5 1.5l-10 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="vs-modal-body">
          {error ? (
            <div className="vs-modal-error">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.4"/>
                <path d="M8 4.5v4M8 10.5h.01" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          ) : (
            <>
              <div className="vs-stat-row">
                <StatCard label="Nodes" value={result.num_nodes} icon={<NodeIcon />} />
                <StatCard label="Edges" value={result.num_edges} icon={<EdgeIcon />} />
              </div>
              <DagBadge isDAG={result.is_dag} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="vs-stat-card">
      <span className="vs-stat-icon">{icon}</span>
      <span className="vs-stat-value">{value}</span>
      <span className="vs-stat-label">{label}</span>
    </div>
  );
}

function DagBadge({ isDAG }) {
  return (
    <div className={`vs-dag-badge ${isDAG ? 'vs-dag-badge--yes' : 'vs-dag-badge--no'}`}>
      {isDAG ? <CheckIcon /> : <CrossIcon />}
      <div>
        <strong>{isDAG ? 'Valid DAG' : 'Not a DAG'}</strong>
        <p>
          {isDAG
            ? 'This pipeline has no cycles and can be executed.'
            : 'This pipeline contains a cycle and cannot be executed as-is.'}
        </p>
      </div>
    </div>
  );
}

// ── Inline SVG icons ──────────────────────────────────────────────────

const NodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="5" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="11" y="10" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M9 7.5h3M9 12.5h-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="2 1"/>
  </svg>
);

const EdgeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="4"  cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
    <circle cx="16" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M6.5 10h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2 1.5"/>
    <path d="M11.5 8l2 2-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M6 10.5l3 3 5-5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CrossIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
