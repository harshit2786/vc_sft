import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => (
  <div className="vs-toolbar">
    <span className="vs-toolbar-brand">VectorShift</span>
    <div className="vs-toolbar-divider" />
    <span className="vs-toolbar-label">Nodes</span>
    <div className="vs-toolbar-nodes">
      <DraggableNode type="customInput" label="Input"  icon={<InputIcon />} />
      <DraggableNode type="llm"         label="LLM"    icon={<LLMIcon />} />
      <DraggableNode type="customOutput" label="Output" icon={<OutputIcon />} />
      <DraggableNode type="text"        label="Text"   icon={<TextIcon />} />
    </div>
  </div>
);

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
