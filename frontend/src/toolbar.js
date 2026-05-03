import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => (
  <div className="vs-toolbar">
    <span className="vs-toolbar-brand">VectorShift</span>
    <div className="vs-toolbar-divider" />
    <span className="vs-toolbar-label">Nodes</span>
    <div className="vs-toolbar-nodes">
      <DraggableNode type="customInput"   label="Input"        icon={<InputIcon />} />
      <DraggableNode type="llm"           label="LLM"          icon={<LLMIcon />} />
      <DraggableNode type="customOutput"  label="Output"       icon={<OutputIcon />} />
      <DraggableNode type="text"          label="Text"         icon={<TextIcon />} />
      <DraggableNode type="codeExecution" label="Code"         icon={<CodeIcon />} />
      <DraggableNode type="api"           label="API"          icon={<ApiIcon />} />
      <DraggableNode type="urlScraper"    label="URL Scraper"  icon={<LinkIcon />} />
      <DraggableNode type="fetchStock"    label="Fetch Stock"  icon={<StockIcon />} />
      <DraggableNode type="wait"          label="Wait"         icon={<WaitIcon />} />
    </div>
  </div>
);

/* ── Toolbar icons ────────────────────────────────────────────── */

const InputIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="2.5" width="9" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M13 8H7.5M11 6l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const OutputIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <rect x="6" y="2.5" width="9" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 8h5.5M5.5 6L3.5 8l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LLMIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5.5 5.5C5.5 5.5 6.5 4 8 4s2.5 1 2.5 2c0 1.5-2.5 2-2.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="8" cy="12" r="0.8" fill="currentColor"/>
  </svg>
);

const TextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 4.5h10M3 8h10M3 11.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CodeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M5 5L2 8l3 3M11 5l3 3-3 3M9 3l-2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ApiIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="4" width="14" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 8h1.5M10.5 8H12M7 6.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M8.5 7l1.5 1-1.5 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M6.5 9.5a4.24 4.24 0 0 0 6 0l1.5-1.5a4.24 4.24 0 0 0-6-6L7 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9.5 6.5a4.24 4.24 0 0 0-6 0L2 8a4.24 4.24 0 0 0 6 6L9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const StockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 6h12" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 9.5l2-2 2 2 2-2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WaitIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3.5 3.5A6.5 6.5 0 1 0 8 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
