/// <reference types="react" />
import "./icon.less";
export type IconProps = {
    size?: "xs" | "sm" | "lg" | "xl" | "2xl";
} & React.HTMLAttributes<HTMLSpanElement>;
declare const Icon: ({ size, className, children, ...iconProps }: IconProps) => import("react/jsx-runtime").JSX.Element;
export default Icon;
