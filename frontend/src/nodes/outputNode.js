import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const icon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="6" y="2.5" width="9" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M3 8h5.5M5.5 6L3.5 8l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const handles = [
  { suffix: 'value', type: 'target', position: Position.Left },
];

const fields = [
  {
    key: 'outputName',
    label: 'Name',
    type: 'text',
    isPill: true,
    defaultValue: (id) => id.replace('customOutput-', 'output_'),
  },
  {
    key: 'outputType',
    label: 'Type',
    type: 'select',
    defaultValue: 'Text',
    options: [
      { value: 'Text', label: 'Text' },
      { value: 'Image', label: 'Image' },
    ],
  },
  {
    key: 'outputValue',
    label: 'Output',
    type: 'textarea',
    defaultValue: '',
    placeholder: 'Connect a node or type a value…',
    rows: 2,
  },
];

export const OutputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    label="Output"
    icon={icon}
    description="Output data of different types from your workflow."
    handles={handles}
    fields={fields}
    width={280}
  />
);
