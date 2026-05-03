import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const icon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="2.5" width="9" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M13 8H7.5M11 6l2 2-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const handles = [
  { suffix: 'value', type: 'source', position: Position.Right },
];

const fields = [
  {
    key: 'inputName',
    label: 'Name',
    type: 'text',
    isPill: true,
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
  <BaseNode
    id={id}
    data={data}
    label="Input"
    icon={icon}
    description="Pass data of different types into your workflow"
    handles={handles}
    fields={fields}
  />
);
