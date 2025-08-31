import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from '@storybook/test';
import { Input } from '@input';
import { Icon, SearchIcon } from '@icons';

import '@input/input.less';
import './input.less';
import clsx from 'clsx';

const meta = {
  title: 'Example/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    inputSize: 'medium',
  },
};

export const SmallInput: Story = {
  args: {
    inputSize: 'small',
  },
};

export const LargeInput: Story = {
  args: {
    inputSize: 'large',
  },
};

export const InputWithIcon: Story = {
  args: {
    inputSize: 'medium',
    placeholder: 'Type something...',
  },
  render: (args) => {
    return (
      <div className={clsx('base-wrapper-input')}>
        <Input {...args} />
        <Icon size="sm" className="input-icon">
          <SearchIcon />
        </Icon>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Type something...');
    expect(input).toBeInTheDocument();
  },
};
