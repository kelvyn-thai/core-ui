import "./input.less";
export type IInput = {
    placeholder?: string;
    inputClassName?: string;
    size?: "small" | "medium" | "large";
};
declare const Input: ({ placeholder, inputClassName, size }: IInput) => import("react/jsx-runtime").JSX.Element;
export default Input;
