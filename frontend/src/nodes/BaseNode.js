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
  dynamicHandles = [],   // variable / computed handles from the node wrapper
  fields = [],
  children,
  width = 260,
  onFieldChange,         // (key, value) => void — called after internal state update
  fieldRefs = {},        // { [fieldKey]: React ref } — attached to the DOM element
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

  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setFieldValues((prev) => ({ ...prev, [key]: value }));
    onFieldChange?.(key, value);
  };

  const handleToggle = (key) => () =>
    setFieldValues((prev) => ({ ...prev, [key]: !prev[key] }));

  const allHandles = [...handles, ...dynamicHandles];
  const targetHandles = allHandles.filter((h) => h.type === 'target');
  const sourceHandles = allHandles.filter((h) => h.type === 'source');

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

    const isEmpty = field.required && !String(fieldValues[field.key] ?? '').trim();

    return (
      <div key={field.key} className="vs-field">
        <div className="vs-field-header">
          <span className="vs-field-label">
            {field.label}
            {field.required && <span className="vs-required">*</span>}
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            {field.badges?.map((b) => (
              <span key={b} className="vs-field-badge">{b}</span>
            ))}
            {field.type === 'select' && !field.badges && (
              <span className="vs-field-badge">Dropdown</span>
            )}
          </div>
        </div>

        {field.type === 'select' ? (
          <select
            className={`vs-select nodrag${isEmpty ? ' vs-input--error' : ''}`}
            value={fieldValues[field.key]}
            onChange={handleChange(field.key)}
            style={field.style}
          >
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : field.type === 'textarea' ? (
          <textarea
            ref={fieldRefs[field.key]}
            className={`vs-textarea nodrag nowheel${isEmpty ? ' vs-input--error' : ''}`}
            value={fieldValues[field.key]}
            onChange={handleChange(field.key)}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            style={field.style}
          />
        ) : (
          <input
            ref={fieldRefs[field.key]}
            className={`vs-input nodrag${isEmpty ? ' vs-input--error' : ''}`}
            type="text"
            value={fieldValues[field.key]}
            onChange={handleChange(field.key)}
            placeholder={field.placeholder}
            style={field.style}
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
        {fields
          .filter((f) => f.required && !String(fieldValues[f.key] ?? '').trim())
          .map((f) => (
            <div key={`err-${f.key}`} className="vs-error-banner">
              <ErrorIcon /> {f.label} field is required
            </div>
          ))}
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

const ErrorIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="6.5" cy="6.5" r="6" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M6.5 3.5v3.5M6.5 9h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
