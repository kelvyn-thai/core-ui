import { default as React } from 'react';
export type InputProps = {
    className?: string;
    inputSize?: 'small' | 'medium' | 'large';
} & React.InputHTMLAttributes<HTMLInputElement>;
declare const Input: ({ className, inputSize, ...inputProps }: InputProps) => import("react/jsx-runtime").JSX.Element;
export default Input;
