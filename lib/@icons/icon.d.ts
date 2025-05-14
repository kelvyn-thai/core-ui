/// <reference types="react" />
import "./icon.less";
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}
export declare const Icon: ({ size, className, children, ...iconProps }: IconProps) => import("react/jsx-runtime").JSX.Element;
export default Icon;
