import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const icon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M5.5 5.5C5.5 5.5 6.5 4 8 4s2.5 1 2.5 2c0 1.5-2.5 2-2.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="8" cy="12" r="0.8" fill="currentColor"/>
  </svg>
);

const handles = [
  { suffix: 'system',   type: 'target', position: Position.Left, style: { top: '38%' } },
  { suffix: 'prompt',   type: 'target', position: Position.Left, style: { top: '62%' } },
  { suffix: 'response', type: 'source', position: Position.Right },
];

const fields = [
  {
    key: 'llmName',
    label: 'Name',
    type: 'text',
    isPill: true,
    defaultValue: (id) => id.replace('llm-', 'llm_'),
  },
  {
    key: 'system',
    label: 'System (Instructions)',
    type: 'textarea',
    defaultValue: '',
    placeholder: 'Answer the question based on context in a professional manner',
    rows: 3,
  },
  {
    key: 'prompt',
    label: 'Prompt',
    type: 'textarea',
    defaultValue: '',
    placeholder: 'Type "{{" to utilize a variable. E.g. Question: {{input_1.text}}',
    rows: 3,
  },
  {
    key: 'model',
    label: 'Model',
    type: 'select',
    defaultValue: 'gpt-4o',
    options: [
      { value: 'gpt-4o',      label: 'gpt-4o' },
      { value: 'gpt-4-turbo', label: 'gpt-4-turbo' },
      { value: 'gpt-3.5-turbo', label: 'gpt-3.5-turbo' },
      { value: 'claude-3-5-sonnet', label: 'claude-3-5-sonnet' },
    ],
  },
  {
    key: 'usePersonalKey',
    label: 'Use Personal API Key',
    type: 'toggle',
    defaultValue: false,
  },
];

export const LLMNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    label="LLM"
    icon={icon}
    description="Call a large language model with a system prompt and user prompt."
    handles={handles}
    fields={fields}
    width={320}
  />
);
