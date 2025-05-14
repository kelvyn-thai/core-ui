import type { StoryObj } from "@storybook/react";
declare const meta: {
    title: string;
    component: ({ children, className, content, size, ...labelProps }: import("@label/index").LabelProps) => import("react/jsx-runtime").JSX.Element;
    parameters: {};
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const SmallSize: Story;
export declare const LargeSize: Story;
export declare const WithChildren: Story;
