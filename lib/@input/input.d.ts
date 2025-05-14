import React from "react";
import "./input.less";
export type InputProps = {
    className?: string;
    inputSize?: "small" | "medium" | "large";
} & React.InputHTMLAttributes<HTMLInputElement>;
declare const Input: ({ className, inputSize, ...inputProps }: InputProps) => import("react/jsx-runtime").JSX.Element;
export default Input;
