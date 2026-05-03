// outputNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const handles = [
  { suffix: 'value', type: 'target', position: Position.Left },
];

const fields = [
  {
    key: 'outputName',
    label: 'Name',
    type: 'text',
    defaultValue: (id) => id.replace('customOutput-', 'output_'),
  },
  {
    key: 'outputType',
    label: 'Type',
    type: 'select',
    defaultValue: 'Text',
    options: [
      { value: 'Text', label: 'Text' },
      { value: 'File', label: 'Image' },
    ],
  },
];

export const OutputNode = ({ id, data }) => (
  <BaseNode id={id} data={data} label="Output" handles={handles} fields={fields} />
);
