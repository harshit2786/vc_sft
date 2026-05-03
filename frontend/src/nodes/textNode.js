// textNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const handles = [
  { suffix: 'output', type: 'source', position: Position.Right },
];

const fields = [
  {
    key: 'text',
    label: 'Text',
    type: 'text',
    defaultValue: '{{input}}',
  },
];

export const TextNode = ({ id, data }) => (
  <BaseNode id={id} data={data} label="Text" handles={handles} fields={fields} />
);
