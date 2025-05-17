import { JSX } from "react";
import "./combobox.less";
export type ComboboxItem = {
    text: string;
    value: string;
    metadata?: any;
};
export type ComboboxProps = {
    placeholder?: string;
    label?: string;
    items: ComboboxItem[];
    onSelectItem: (item: ComboboxItem) => void;
    selectedItem: ComboboxItem | null;
    keySearch: string;
    onChangeKeySearch: (value: string) => void;
    isLoading: boolean;
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
    className?: string;
    renderItem?: (item: ComboboxItem) => JSX.Element;
};
declare const Combobox: {
    ({ placeholder, label, keySearch, onChangeKeySearch, items, onSelectItem, selectedItem, isLoading, isMenuOpen, setIsMenuOpen, className, renderItem, }: ComboboxProps): JSX.Element;
    DropDownMenu: ({ children, }: {
        children: JSX.Element | JSX.Element[];
    }) => import("react/jsx-runtime").JSX.Element;
    Message: ({ msg }: {
        msg: string;
    }) => import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const ComboboxMessage: ({ msg }: {
    msg: string;
}) => import("react/jsx-runtime").JSX.Element;
export declare const ComboboxDropdownMenu: ({ children, }: {
    children: JSX.Element | JSX.Element[];
}) => import("react/jsx-runtime").JSX.Element;
export default Combobox;
