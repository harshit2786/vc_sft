import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const icon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="4" width="14" height="8" rx="2" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M4 8h1.5M10.5 8H12M7 6.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M8.5 7l1.5 1-1.5 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const handles = [
  { suffix: 'input',  type: 'target', position: Position.Left },
  { suffix: 'output', type: 'source', position: Position.Right },
];

const namePillField = [
  {
    key: 'apiName',
    label: 'Name',
    type: 'text',
    isPill: true,
    defaultValue: (id) => id.replace('api-', 'api_'),
  },
  {
    key: 'method',
    label: 'Method',
    type: 'select',
    defaultValue: 'GET',
    options: [
      { value: 'GET',    label: 'GET'    },
      { value: 'POST',   label: 'POST'   },
      { value: 'PUT',    label: 'PUT'    },
      { value: 'DELETE', label: 'DELETE' },
      { value: 'PATCH',  label: 'PATCH'  },
    ],
  },
  {
    key: 'url',
    label: 'URL',
    type: 'text',
    required: true,
    placeholder: 'www.vectorshift.ai',
    badges: ['Text'],
  },
];

const TABS = ['Headers', 'Query', 'Body', 'Files'];

let rowCounter = 0;
const newRow = () => ({ id: rowCounter++, key: '', value: '' });

export const ApiNode = ({ id, data }) => {
  const [activeTab, setActiveTab] = useState('Headers');
  const [tabRows, setTabRows] = useState({
    Headers: [newRow()],
    Query:   [],
    Body:    [],
    Files:   [],
  });

  const addRow = () =>
    setTabRows((prev) => ({ ...prev, [activeTab]: [...prev[activeTab], newRow()] }));

  const removeRow = (rowId) =>
    setTabRows((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((r) => r.id !== rowId),
    }));

  const updateRow = (rowId, field, value) =>
    setTabRows((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((r) => (r.id === rowId ? { ...r, [field]: value } : r)),
    }));

  return (
    <BaseNode
      id={id}
      data={data}
      label="API"
      icon={icon}
      description="Make an API request to a given URL."
      handles={handles}
      fields={namePillField}
      width={360}
    >
      {/* Tab bar */}
      <div className="vs-api-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`vs-api-tab nodrag${activeTab === tab ? ' vs-api-tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Key / Value rows */}
      <div className="vs-kv-section">
        <div className="vs-kv-header">
          <span>Key <span className="vs-field-badge">Text</span></span>
          <span>Value <span className="vs-field-badge">Text</span></span>
        </div>
        {tabRows[activeTab].map((row) => (
          <div key={row.id} className="vs-kv-row">
            <input
              className="vs-input nodrag"
              value={row.key}
              onChange={(e) => updateRow(row.id, 'key', e.target.value)}
              placeholder="Key"
            />
            <input
              className="vs-input nodrag"
              value={row.value}
              onChange={(e) => updateRow(row.id, 'value', e.target.value)}
              placeholder="Value"
            />
            <button className="vs-kv-del nodrag" onClick={() => removeRow(row.id)} title="Remove">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1.5 1.5l8 8M9.5 1.5l-8 8" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        ))}
        <button className="vs-add-btn nodrag" onClick={addRow}>+ Add {activeTab}</button>
      </div>
    </BaseNode>
  );
};
