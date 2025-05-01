import type { StoryObj } from "@storybook/react";
import "@input/input.less";
import "./input.less";
declare const meta: {
    title: string;
    component: ({ className, inputSize, ...inputProps }: import("@input/index").InputProps) => import("react/jsx-runtime").JSX.Element;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const SmallInput: Story;
export declare const LargeInput: Story;
export declare const InputWithIcon: Story;
