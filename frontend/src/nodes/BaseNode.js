// BaseNode.js
// Shared foundation for all node types. Configure via props rather than copying boilerplate.

import { useState } from 'react';
import { Handle } from 'reactflow';

// handles: [{ suffix, type, position, style? }]
//   suffix  — appended to `id` to form the handle id (e.g. 'value' → `${id}-value`)
//   type    — 'source' | 'target'
//   position — Position.Left | Position.Right | ...
//   style   — optional inline style overrides (e.g. { top: '33%' })
//
// fields: [{ key, label, type, defaultValue, options? }]
//   key          — matches data[key]; used for initial state
//   label        — displayed before the control
//   type         — 'text' | 'select'
//   defaultValue — value or function (id, data) => value
//   options      — [{ value, label }] required when type === 'select'

const NODE_STYLE = { width: 200, height: 80, border: '1px solid black' };

export const BaseNode = ({ id, data, label, handles = [], fields = [], children }) => {
  const initialState = Object.fromEntries(
    fields.map((f) => {
      const fallback = typeof f.defaultValue === 'function'
        ? f.defaultValue(id, data)
        : f.defaultValue;
      return [f.key, data?.[f.key] ?? fallback];
    })
  );

  const [fieldValues, setFieldValues] = useState(initialState);

  const handleChange = (key) => (e) => {
    setFieldValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const targetHandles = handles.filter((h) => h.type === 'target');
  const sourceHandles = handles.filter((h) => h.type === 'source');

  return (
    <div style={NODE_STYLE}>
      {targetHandles.map((h) => (
        <Handle
          key={h.suffix}
          type="target"
          position={h.position}
          id={`${id}-${h.suffix}`}
          style={h.style}
        />
      ))}
      <div>
        <span>{label}</span>
      </div>
      <div>
        {fields.map((field) => (
          <label key={field.key}>
            {field.label}:
            {field.type === 'select' ? (
              <select value={fieldValues[field.key]} onChange={handleChange(field.key)}>
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={fieldValues[field.key]}
                onChange={handleChange(field.key)}
              />
            )}
          </label>
        ))}
        {children}
      </div>
      {sourceHandles.map((h) => (
        <Handle
          key={h.suffix}
          type="source"
          position={h.position}
          id={`${id}-${h.suffix}`}
          style={h.style}
        />
      ))}
    </div>
  );
};
