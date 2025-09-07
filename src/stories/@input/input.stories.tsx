import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fireEvent, userEvent, within } from '@storybook/test';
import { Input } from '@input';
import { Icon, SearchIcon } from '@icons';
import { useState } from 'react';
import { StoryShowcase, StoryCard, StoryGrid, ComponentPreview, PropertyTable, StatusBadge } from 'src/stories/shared';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with multiple sizes following BEM methodology.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    inputSize: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the input field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
      description: 'The input type',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    inputSize: 'medium',
    placeholder: 'Enter text...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Enter text...');

    // Test input is rendered with correct classes
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('base-input', 'base-input--medium');
    expect(input).toHaveAttribute('type', 'text');

    // Test typing
    await userEvent.type(input, 'Hello World');
    expect(input).toHaveValue('Hello World');

    // Test focus
    await userEvent.click(input);
    expect(input).toHaveFocus();
  },
};

export const Small: Story = {
  args: {
    inputSize: 'small',
    placeholder: 'Small input...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Small input...');

    expect(input).toHaveClass('base-input--small');
  },
};

export const Medium: Story = {
  args: {
    inputSize: 'medium',
    placeholder: 'Medium input...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Medium input...');

    expect(input).toHaveClass('base-input--medium');
  },
};

export const Large: Story = {
  args: {
    inputSize: 'large',
    placeholder: 'Large input...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Large input...');

    expect(input).toHaveClass('base-input--large');
  },
};

export const Disabled: Story = {
  args: {
    inputSize: 'medium',
    placeholder: 'Disabled input...',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Disabled input...');

    expect(input).toBeDisabled();
    expect(input).toHaveClass('base-input--medium');
  },
};

export const WithValue: Story = {
  args: {
    inputSize: 'medium',
    placeholder: 'Input with default value...',
    defaultValue: 'Pre-filled value',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByDisplayValue('Pre-filled value');

    expect(input).toHaveValue('Pre-filled value');

    // Test clearing and typing new value
    await userEvent.clear(input);
    await userEvent.type(input, 'New value');
    expect(input).toHaveValue('New value');
  },
};

export const ControlledInput: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div className="space-y-4 p-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Controlled Input</label>
          <Input
            inputSize="medium"
            placeholder="Type to see controlled behavior..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            data-testid="controlled-input"
          />
        </div>
        <div className="text-sm text-gray-600">
          Current value: <span data-testid="current-value">&quot;{value}&quot;</span>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('controlled-input');
    const valueDisplay = canvas.getByTestId('current-value');

    // Test controlled behavior
    await userEvent.type(input, 'Controlled');
    expect(input).toHaveValue('Controlled');
    expect(valueDisplay).toHaveTextContent('"Controlled"');

    // Test clearing
    await userEvent.clear(input);
    expect(input).toHaveValue('');
    expect(valueDisplay).toHaveTextContent('""');
  },
};

export const DifferentTypes: Story = {
  render: () => (
    <div className="space-y-4 p-6">
      <h3 className="mb-4 text-lg font-semibold">Input Types</h3>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Email Input</label>
          <Input type="email" inputSize="medium" placeholder="Enter email..." data-testid="email-input" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password Input</label>
          <Input type="password" inputSize="medium" placeholder="Enter password..." data-testid="password-input" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Number Input</label>
          <Input type="number" inputSize="medium" placeholder="Enter number..." data-testid="number-input" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Search Input</label>
          <Input type="search" inputSize="medium" placeholder="Search..." data-testid="search-input" />
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test different input types
    const emailInput = canvas.getByTestId('email-input');
    const passwordInput = canvas.getByTestId('password-input');
    const numberInput = canvas.getByTestId('number-input');
    const searchInput = canvas.getByTestId('search-input');

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(numberInput).toHaveAttribute('type', 'number');
    expect(searchInput).toHaveAttribute('type', 'search');

    // Test typing in different inputs
    await userEvent.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');

    await userEvent.type(passwordInput, 'secret123');
    expect(passwordInput).toHaveValue('secret123');

    await userEvent.type(numberInput, '42');
    expect(numberInput).toHaveValue('42');

    await userEvent.type(searchInput, 'query');
    expect(searchInput).toHaveValue('query');
  },
};

export const InputShowcase: Story = {
  render: () => (
    <StoryShowcase
      title="Input Component"
      subtitle="Flexible input fields with multiple sizes and types, perfect for forms and user interfaces"
    >
      <div className="mb-8 flex items-center justify-center gap-2">
        <StatusBadge status="stable" />
        <span className="text-sm text-gray-600">Production Ready</span>
      </div>

      <StoryCard title="Sizes" description="Three size options for different contexts and layouts" variant="showcase">
        <StoryGrid columns={3} gap="md">
          <ComponentPreview name="Small" description="Compact forms and dense layouts">
            <Input inputSize="small" placeholder="Small input..." />
          </ComponentPreview>
          <ComponentPreview name="Medium" description="Default size for most forms">
            <Input inputSize="medium" placeholder="Medium input..." />
          </ComponentPreview>
          <ComponentPreview name="Large" description="Hero sections and prominent forms">
            <Input inputSize="large" placeholder="Large input..." />
          </ComponentPreview>
        </StoryGrid>
      </StoryCard>

      <StoryCard
        title="Input Types"
        description="Support for different HTML input types with proper validation"
        variant="showcase"
      >
        <StoryGrid columns={2} gap="md">
          <ComponentPreview name="Email" description="Email input with validation">
            <Input type="email" placeholder="user@example.com" />
          </ComponentPreview>
          <ComponentPreview name="Password" description="Secure password input">
            <Input type="password" placeholder="••••••••" />
          </ComponentPreview>
          <ComponentPreview name="Number" description="Numeric input field">
            <Input type="number" placeholder="123" />
          </ComponentPreview>
          <ComponentPreview name="Search" description="Search input with styling">
            <Input type="search" placeholder="Search..." />
          </ComponentPreview>
        </StoryGrid>
      </StoryCard>

      <StoryCard title="States" description="Different input states for various user interactions" variant="showcase">
        <StoryGrid columns={2} gap="lg">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Interactive States</h4>
            <div className="space-y-3">
              <ComponentPreview name="Normal" description="Default state">
                <Input placeholder="Type something..." />
              </ComponentPreview>
              <ComponentPreview name="With Value" description="Pre-filled input">
                <Input defaultValue="Pre-filled content" />
              </ComponentPreview>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Disabled State</h4>
            <div className="space-y-3">
              <ComponentPreview name="Disabled" description="Non-interactive state">
                <Input placeholder="Disabled input..." disabled />
              </ComponentPreview>
              <ComponentPreview name="Disabled with Value" description="Read-only content">
                <Input defaultValue="Read-only value" disabled />
              </ComponentPreview>
            </div>
          </div>
        </StoryGrid>
      </StoryCard>

      <StoryCard title="Properties" description="Component API and configuration options">
        <PropertyTable
          properties={[
            {
              name: 'inputSize',
              type: '"small" | "medium" | "large"',
              default: 'medium',
              description: 'Size of the input field affecting height and padding',
            },
            {
              name: 'type',
              type: '"text" | "email" | "password" | "number" | "search" | ...',
              default: 'text',
              description: 'HTML input type for different data formats',
            },
            {
              name: 'placeholder',
              type: 'string',
              default: 'Type something...',
              description: 'Placeholder text shown when input is empty',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Whether the input is disabled and non-interactive',
            },
            {
              name: 'value',
              type: 'string',
              description: 'Controlled value for the input (controlled component)',
            },
            {
              name: 'defaultValue',
              type: 'string',
              description: 'Initial value for uncontrolled input',
            },
            {
              name: 'onChange',
              type: '(event: ChangeEvent) => void',
              description: 'Change event handler function',
            },
          ]}
        />
      </StoryCard>
    </StoryShowcase>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test showcase title is rendered
    expect(canvas.getByText('Input Component')).toBeInTheDocument();

    // Test all sizes are rendered with correct classes
    expect(canvas.getByPlaceholderText('Small input...')).toHaveClass('base-input--small');
    expect(canvas.getByPlaceholderText('Medium input...')).toHaveClass('base-input--medium');
    expect(canvas.getByPlaceholderText('Large input...')).toHaveClass('base-input--large');

    // Test different input types
    expect(canvas.getByPlaceholderText('user@example.com')).toHaveAttribute('type', 'email');
    expect(canvas.getByPlaceholderText('••••••••')).toHaveAttribute('type', 'password');
    expect(canvas.getByPlaceholderText('123')).toHaveAttribute('type', 'number');
    expect(canvas.getByPlaceholderText('Search...')).toHaveAttribute('type', 'search');

    // Test states
    expect(canvas.getByPlaceholderText('Disabled input...')).toBeDisabled();
    expect(canvas.getByDisplayValue('Pre-filled content')).toHaveValue('Pre-filled content');

    // Test status badge is shown
    expect(canvas.getByText('stable')).toBeInTheDocument();
  },
};
