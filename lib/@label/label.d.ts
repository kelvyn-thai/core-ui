import React, { JSX } from "react";
import "./label.less";
export type LabelProps = {
    children?: JSX.Element;
    size?: "small" | "medium" | "large";
    content?: string;
} & React.LabelHTMLAttributes<HTMLLabelElement>;
declare const Label: ({ children, className, content, size, ...labelProps }: LabelProps) => import("react/jsx-runtime").JSX.Element;
export default Label;
