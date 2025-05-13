import React from "react";
import "./button.less";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg";
}
declare const Button: React.FC<ButtonProps>;
export default Button;
