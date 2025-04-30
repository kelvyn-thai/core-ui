import React, { JSX } from "react";
import "./label.less";
export type ILabel = {
    children?: JSX.Element;
    size?: "small" | "medium" | "large";
    content?: string;
};
type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;
declare const Label: ({ children, className, content, size, ...labelProps }: ILabel & LabelProps) => import("react/jsx-runtime").JSX.Element;
export default Label;
