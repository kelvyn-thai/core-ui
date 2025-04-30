import type { StoryObj } from "@storybook/react";
import "@input/input.less";
declare const meta: {
    title: string;
    component: ({ placeholder, inputClassName, size }: import("@input/index").IInput) => import("react/jsx-runtime").JSX.Element;
    parameters: {};
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Primary: Story;
