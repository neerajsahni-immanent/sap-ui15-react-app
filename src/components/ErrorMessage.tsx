import React from 'react';

interface Props {
  message?: string | null;
  details?: Record<string, string> | null;
  onClose?: () => void;
}

export const ErrorMessage: React.FC<Props> = ({ message = null, details = null, onClose }) => {
  if (!message && !details) return null;
  return (
    <div className="error-message" role="alert">
      {message && <div className="error-main">{message}</div>}
      {details && (
        <ul>
          {Object.entries(details).map(([k, v]) => (
            <li key={k}>{`${k}: ${v}`}</li>
          ))}
        </ul>
      )}
      {onClose && (
        <button aria-label="dismiss" onClick={onClose} className="error-close">
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
