import React from 'react';
import clsx from 'clsx';
import './button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', size = 'medium', ...rest }) => {
  return (
    <button className={clsx('base-button', `base-button--${variant}`, `base-button--${size}`, className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
