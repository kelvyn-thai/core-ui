import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '@label';

const meta = {
  title: 'Example/Label',
  component: Label,
  parameters: {},
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
    content: 'Medium Label',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'small',
    content: 'Small Label',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'large',
    content: 'Large Label',
  },
};

export const WithChildren: Story = {
  args: {
    size: 'medium',
  },
  render: (args) => {
    return (
      <Label {...args}>
        <p style={{ color: 'red' }}>Customized Paragraph</p>
      </Label>
    );
  },
};
