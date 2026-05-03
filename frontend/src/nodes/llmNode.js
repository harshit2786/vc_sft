// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const handles = [
  { suffix: 'system', type: 'target', position: Position.Left, style: { top: `${100 / 3}%` } },
  { suffix: 'prompt', type: 'target', position: Position.Left, style: { top: `${200 / 3}%` } },
  { suffix: 'response', type: 'source', position: Position.Right },
];

export const LLMNode = ({ id, data }) => (
  <BaseNode id={id} data={data} label="LLM" handles={handles}>
    <span>This is a LLM.</span>
  </BaseNode>
);
