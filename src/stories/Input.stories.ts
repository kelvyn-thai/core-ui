import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { Input } from "@input/index";
import "@input/input.less";

const meta = {
  title: "Example/Input",
  component: Input,
  parameters: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    placeholder: "Type something...",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Type something...");
    expect(input).toBeInTheDocument();
  },
};
