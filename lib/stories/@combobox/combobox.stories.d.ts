/// <reference types="react" />
import type { StoryObj } from "@storybook/react";
import { ComboboxProps } from "@combobox/index";
import "@combobox/combobox.less";
declare const meta: {
    title: string;
    component: {
        ({ placeholder, label, keySearch, onChangeKeySearch, items, onSelectItem, selectedItem, isLoading, isMenuOpen, setIsMenuOpen, className, renderItem, }: ComboboxProps): import("react").JSX.Element;
        DropDownMenu: ({ children, }: {
            children: import("react").JSX.Element | import("react").JSX.Element[];
        }) => import("react/jsx-runtime").JSX.Element;
        Message: ({ msg }: {
            msg: string;
        }) => import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithRenderItem: Story;
export declare const Loading: Story;
export declare const EmptyData: Story;
export declare const EmptySearchResult: Story;
