import "./combobox.less";
export type ICombobox = {
    placeholder?: string;
    label?: string;
    inputLabel?: string;
};
declare const Combobox: ({ placeholder, label, inputLabel }: ICombobox) => import("react/jsx-runtime").JSX.Element;
export default Combobox;
