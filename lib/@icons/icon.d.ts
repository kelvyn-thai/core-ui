export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: 'small' | 'medium' | 'large';
}
export declare const Icon: ({ size, className, children, ...iconProps }: IconProps) => import("react/jsx-runtime").JSX.Element;
export default Icon;
