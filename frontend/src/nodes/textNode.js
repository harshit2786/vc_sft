import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const icon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 4.5h10M3 8h10M3 11.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const handles = [
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
    defaultValue: '{{input}}',
    placeholder: 'Type "{{" to reference a variable…',
    rows: 3,
  },
];

export const TextNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    label="Text"
    icon={icon}
    description="Write static text or use {{ }} to reference variables from other nodes."
    handles={handles}
    fields={fields}
    width={260}
  />
);
