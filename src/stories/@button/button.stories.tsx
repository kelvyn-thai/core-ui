import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: 'secondary',
  },
};

export const Large: Story = {
  args: {
    ...Primary.args,
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    ...Primary.args,
    size: 'sm',
  },
};
