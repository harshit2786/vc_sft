import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const icon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2v4l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M3.5 3.5A6.5 6.5 0 1 0 8 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const handles = [
  { suffix: 'input',  type: 'target', position: Position.Left },
  { suffix: 'output', type: 'source', position: Position.Right },
];

const fields = [
  {
    key: 'waitName',
    label: 'Name',
    type: 'text',
    isPill: true,
    defaultValue: (id) => id.replace('wait-', 'wait_node_'),
  },
  {
    key: 'waitTime',
    label: 'Wait Time',
    type: 'text',
    required: true,
    defaultValue: '1',
    badges: ['Number', 'Variable', 'Integer'],
  },
  {
    key: 'timeUnit',
    label: 'Time Unit',
    type: 'select',
    required: true,
    defaultValue: 'Seconds',
    options: [
      { value: 'Seconds', label: 'Seconds' },
      { value: 'Minutes', label: 'Minutes' },
      { value: 'Hours',   label: 'Hours'   },
    ],
  },
];

export const WaitNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    label="Wait"
    icon={icon}
    description="Pause Pipeline execution for a specified duration"
    handles={handles}
    fields={fields}
    width={260}
  />
);
