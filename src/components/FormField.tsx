import React from 'react';

interface Props {
  id: string;
  name: string;
  label?: string;
  value: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const FormField: React.FC<Props> = ({ id, name, label, value, type = 'text', placeholder, required = false, disabled = false, error = null, onChange }) => {
  return (
    <div className="form-field">
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required ? '*' : null}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea id={id} name={name} value={value} placeholder={placeholder} required={required} disabled={disabled} onChange={onChange} />
      ) : (
        <input id={id} name={name} type={type} value={value} placeholder={placeholder} required={required} disabled={disabled} onChange={onChange} />
      )}
      {error ? <div role="alert" className="field-error">{error}</div> : null}
    </div>
  );
};

export default FormField;
