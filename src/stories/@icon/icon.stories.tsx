import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, SearchIcon as BaseSearchIcon, TrashIcon as BaseTrashIcon, MapPinIcon as BaseMapPinIcon } from '@icons';

const meta = {
  title: 'Example/Icon',
  component: Icon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <BaseSearchIcon />,
  },
};

export const SmallIcon: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const LargeIcon: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const SearchIcon: Story = {
  args: {
    children: <BaseSearchIcon />,
  },
};

export const TrashIcon: Story = {
  args: {
    children: <BaseTrashIcon />,
  },
};

export const MapPinIcon: Story = {
  args: {
    children: <BaseMapPinIcon />,
  },
};
