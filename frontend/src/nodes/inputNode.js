// inputNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const handles = [
  { suffix: 'value', type: 'source', position: Position.Right },
];

const fields = [
  {
    key: 'inputName',
    label: 'Name',
    type: 'text',
    defaultValue: (id) => id.replace('customInput-', 'input_'),
  },
  {
    key: 'inputType',
    label: 'Type',
    type: 'select',
    defaultValue: 'Text',
    options: [
      { value: 'Text', label: 'Text' },
      { value: 'File', label: 'File' },
    ],
  },
];

export const InputNode = ({ id, data }) => (
  <BaseNode id={id} data={data} label="Input" handles={handles} fields={fields} />
);
