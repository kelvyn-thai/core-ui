import type { StoryObj } from "@storybook/react";
declare const meta: {
    title: string;
    component: ({ size, className, children, ...iconProps }: import("@icons/index").IconProps) => import("react/jsx-runtime").JSX.Element;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const SmallIcon: Story;
export declare const LargeIcon: Story;
export declare const SearchIcon: Story;
export declare const TrashIcon: Story;
export declare const MapPinIcon: Story;
