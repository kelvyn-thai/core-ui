import { default as React } from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'small' | 'medium' | 'large';
}
declare const Button: React.FC<ButtonProps>;
export default Button;
