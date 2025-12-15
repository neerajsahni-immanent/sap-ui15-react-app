import React from 'react';

interface Props {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<Props> = ({ message, fullScreen = false }) => {
  return (
    <div className={fullScreen ? 'spinner-overlay' : 'spinner-inline'} aria-live="polite">
      <div className="spinner" />
      {message && <div className="spinner-message">{message}</div>}
    </div>
  );
};

export default LoadingSpinner;
