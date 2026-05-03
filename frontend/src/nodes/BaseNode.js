import { useState } from 'react';
import { Handle, useReactFlow } from 'reactflow';

// handles: [{ suffix, type, position, style? }]
// fields:  [{ key, label, type, defaultValue, options?, placeholder?, rows?, isPill? }]
//   types: 'text' | 'select' | 'textarea' | 'toggle' | (with isPill:true → read-only pill display)

export const BaseNode = ({
  id,
  data,
  label,
  icon,
  description,
  handles = [],
  fields = [],
  children,
  width = 260,
}) => {
  const initialState = Object.fromEntries(
    fields.map((f) => {
      const fallback =
        typeof f.defaultValue === 'function' ? f.defaultValue(id, data) : f.defaultValue;
      return [f.key, data?.[f.key] ?? fallback];
    })
  );

  const [fieldValues, setFieldValues] = useState(initialState);
  const { deleteElements } = useReactFlow();
  const onDelete = () => deleteElements({ nodes: [{ id }] });

  const handleChange = (key) => (e) =>
    setFieldValues((prev) => ({ ...prev, [key]: e.target.value }));

  const handleToggle = (key) => () =>
    setFieldValues((prev) => ({ ...prev, [key]: !prev[key] }));

  const targetHandles = handles.filter((h) => h.type === 'target');
  const sourceHandles = handles.filter((h) => h.type === 'source');

  const renderField = (field) => {
    if (field.isPill) {
      return (
        <div key={field.key} className="vs-name-pill">
          {fieldValues[field.key]}
        </div>
      );
    }

    if (field.type === 'toggle') {
      return (
        <div key={field.key} className="vs-toggle-row">
          <span className="vs-toggle-label">{field.label}</span>
          <div className="vs-toggle-right">
            <span className="vs-toggle-value">
              {fieldValues[field.key] ? 'Yes' : 'No'}
            </span>
            <button
              type="button"
              className={`vs-toggle${fieldValues[field.key] ? ' vs-toggle--on' : ''}`}
              onClick={handleToggle(field.key)}
            >
              <span className="vs-toggle-thumb" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div key={field.key} className="vs-field">
        <div className="vs-field-header">
          <span className="vs-field-label">{field.label}</span>
          {field.type === 'select' && (
            <span className="vs-field-badge">Dropdown</span>
          )}
        </div>

        {field.type === 'select' ? (
          <select
            className="vs-select nodrag"
            value={fieldValues[field.key]}
            onChange={handleChange(field.key)}
          >
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : field.type === 'textarea' ? (
          <textarea
            className="vs-textarea nodrag"
            value={fieldValues[field.key]}
            onChange={handleChange(field.key)}
            placeholder={field.placeholder}
            rows={field.rows || 3}
          />
        ) : (
          <input
            className="vs-input nodrag"
            type="text"
            value={fieldValues[field.key]}
            onChange={handleChange(field.key)}
            placeholder={field.placeholder}
          />
        )}
      </div>
    );
  };

  return (
    <div className="vs-node" style={{ width }}>
      {targetHandles.map((h) => (
        <Handle
          key={h.suffix}
          type="target"
          position={h.position}
          id={`${id}-${h.suffix}`}
          style={h.style}
        />
      ))}

      <div className="vs-node-header">
        <div className="vs-node-header-left">
          {icon && <span className="vs-node-icon">{icon}</span>}
          <span className="vs-node-title">{label}</span>
        </div>
        <div className="vs-node-actions">
          <button className="vs-node-action-btn" title="Remove node" onClick={onDelete}>
            <CloseIcon />
          </button>
        </div>
      </div>

      {description && <div className="vs-node-subtitle">{description}</div>}

      <div className="vs-node-body">
        {fields.map(renderField)}
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

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
