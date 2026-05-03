import { useState } from 'react';
import { Position } from 'reactflow';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';
import { BaseNode } from './BaseNode';

const icon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M5 5L2 8l3 3M11 5l3 3-3 3M9 3l-2 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const handles = [
  { suffix: 'input',  type: 'target', position: Position.Left },
  { suffix: 'output', type: 'source', position: Position.Right },
];

const namePillField = [
  {
    key: 'codeName',
    label: 'Name',
    type: 'text',
    isPill: true,
    defaultValue: (id) => id.replace('codeExecution-', 'code_execution_'),
  },
];

const TYPE_OPTIONS = ['Any', 'String', 'Integer', 'Float', 'Boolean', 'List', 'Dict'];

const DEFAULT_CODE = `def main(input_0):
    """
    Description:
    Inputs:
        input_0: Any
    Outputs:
        output_0: Any
    """

    output_0 = input_0
    return {'output_0': output_0}`;

let rowId = 0;
const newInput = (idx) => ({ id: rowId++, name: `input_${idx}`, type: 'Any', value: '' });

export const CodeExecutionNode = ({ id, data }) => {
  const [activeTab, setActiveTab] = useState('Inputs');
  const [inputs, setInputs]       = useState([newInput(0)]);
  const [code, setCode]           = useState(DEFAULT_CODE);

  const addInput = () => setInputs((prev) => [...prev, newInput(prev.length)]);

  const removeInput = (rowId) =>
    setInputs((prev) => prev.filter((r) => r.id !== rowId));

  const updateInput = (rowId, field, value) =>
    setInputs((prev) => prev.map((r) => (r.id === rowId ? { ...r, [field]: value } : r)));

  return (
    <BaseNode
      id={id}
      data={data}
      label="Code Execution"
      icon={icon}
      description="Execute code in the language of your choice."
      handles={handles}
      fields={namePillField}
      width={380}
    >
      {/* ── Inputs / Outputs section ── */}
      <div className="vs-code-section">
        <div className="vs-io-header-row">
          <span className="vs-field-label">Inputs and Outputs</span>
          <div className="vs-tab-group">
            {['Inputs', 'Outputs'].map((t) => (
              <button
                key={t}
                className={`vs-tab-btn nodrag${activeTab === t ? ' vs-tab-btn--active' : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'Inputs' && (
          <>
            <div className="vs-io-col-header">
              <span>Name</span><span>Type</span><span>Value</span>
            </div>
            {inputs.map((inp) => (
              <div key={inp.id} className="vs-io-row">
                <input
                  className="vs-input nodrag"
                  value={inp.name}
                  onChange={(e) => updateInput(inp.id, 'name', e.target.value)}
                />
                <select
                  className="vs-select nodrag"
                  value={inp.type}
                  onChange={(e) => updateInput(inp.id, 'type', e.target.value)}
                >
                  {TYPE_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <input
                  className="vs-input nodrag"
                  value={inp.value}
                  onChange={(e) => updateInput(inp.id, 'value', e.target.value)}
                />
                <button
                  className="vs-kv-del nodrag"
                  onClick={() => removeInput(inp.id)}
                  title="Remove input"
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M1.5 1.5l8 8M9.5 1.5l-8 8" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ))}
            <button className="vs-add-btn nodrag" onClick={addInput}>+ Add Input</button>
          </>
        )}

        {activeTab === 'Outputs' && (
          <div className="vs-io-col-header" style={{ color: '#6b7280', fontSize: 11.5 }}>
            Outputs are declared inside the return statement of your function.
          </div>
        )}
      </div>

      {/* ── Code editor section ── */}
      <div className="vs-code-section">
        <div className="vs-io-header-row">
          <span className="vs-field-label">Code</span>
          <span className="vs-field-badge">Text</span>
        </div>
        <div className="vs-code-editor-wrap nodrag nowheel">
          <div className="vs-code-lang-badge">Python</div>
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(c) => highlight(c, languages.python, 'python')}
            padding={10}
            className="vs-code-editor"
            style={{
              fontFamily: '"Fira Mono", "Fira Code", "Courier New", monospace',
              fontSize: 12,
              lineHeight: 1.55,
              minHeight: 160,
              background: '#f8f9fe',
            }}
          />
        </div>
      </div>
    </BaseNode>
  );
};
