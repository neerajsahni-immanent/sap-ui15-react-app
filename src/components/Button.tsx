import React from 'react';

type Variant = 'primary' | 'secondary' | 'danger';

interface Props {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<Props> = ({ children, onClick, type = 'button', variant = 'primary', disabled = false, loading = false }) => {
  return (
    <button type={type} onClick={onClick} className={`btn btn-${variant}`} disabled={disabled || loading}>
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
