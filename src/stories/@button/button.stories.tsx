import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fireEvent, userEvent, within } from '@storybook/test';
import { Button } from '@button';
import { StoryShowcase, StoryCard, StoryGrid, ComponentPreview, PropertyTable, StatusBadge } from 'src/stories/shared';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and sizes following BEM methodology.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test button is rendered with correct classes
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('base-button', 'base-button--primary', 'base-button--medium');
    expect(button).toHaveTextContent('Primary Button');

    // Test button is clickable
    expect(button).not.toBeDisabled();

    // Test click interaction
    await userEvent.click(button);
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete Item',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    expect(button).toHaveClass('base-button--destructive');
    expect(button).toHaveTextContent('Delete Item');
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    expect(button).toHaveClass('base-button--outline');
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    expect(button).toHaveClass('base-button--secondary');
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    expect(button).toHaveClass('base-button--ghost');
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    expect(button).toHaveClass('base-button--link');
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    children: 'Small Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    expect(button).toHaveClass('base-button--small');
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Medium Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    expect(button).toHaveClass('base-button--medium');
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'Large Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    expect(button).toHaveClass('base-button--large');
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled Button',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveClass('base-button--primary');
  },
};

export const WithClickHandler: Story = {
  args: {
    variant: 'primary',
    children: 'Click Me',
    onClick: () => alert('Button clicked!'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test button can be focused
    await userEvent.tab();
    expect(button).toHaveFocus();

    // Test keyboard interaction
    await userEvent.keyboard('{Enter}');

    // Test click event (note: we can't test the actual alert in Storybook)
    await userEvent.click(button);
  },
};

export const ButtonShowcase: Story = {
  render: () => (
    <StoryShowcase
      title="Button Component"
      subtitle="A versatile button component with multiple variants, sizes, and states following BEM methodology"
    >
      <div className="mb-8 flex items-center justify-center gap-2">
        <StatusBadge status="stable" />
        <span className="text-sm text-gray-600">Production Ready</span>
      </div>

      <StoryCard title="Variants" description="Different visual styles for various use cases" variant="showcase">
        <StoryGrid columns={3} gap="md">
          <ComponentPreview name="Primary" description="Main call-to-action button">
            <Button variant="primary">Get Started</Button>
          </ComponentPreview>
          <ComponentPreview name="Destructive" description="For dangerous actions">
            <Button variant="destructive">Delete Account</Button>
          </ComponentPreview>
          <ComponentPreview name="Outline" description="Secondary actions">
            <Button variant="outline">Learn More</Button>
          </ComponentPreview>
          <ComponentPreview name="Secondary" description="Alternative styling">
            <Button variant="secondary">Cancel</Button>
          </ComponentPreview>
          <ComponentPreview name="Ghost" description="Minimal appearance">
            <Button variant="ghost">Skip</Button>
          </ComponentPreview>
          <ComponentPreview name="Link" description="Text-like appearance">
            <Button variant="link">Read Documentation</Button>
          </ComponentPreview>
        </StoryGrid>
      </StoryCard>

      <StoryCard title="Sizes" description="Three size options to fit different contexts" variant="showcase">
        <StoryGrid columns={3} gap="lg">
          <ComponentPreview name="Small" description="Compact UI elements and tight layouts">
            <div className="space-y-3 text-center">
              <Button size="small" variant="primary">
                Small Button
              </Button>
              <p className="font-mono text-xs text-gray-500">32px height</p>
            </div>
          </ComponentPreview>
          <ComponentPreview name="Medium" description="Default size for most interfaces">
            <div className="space-y-3 text-center">
              <Button size="medium" variant="primary">
                Medium Button
              </Button>
              <p className="font-mono text-xs text-gray-500">40px height</p>
            </div>
          </ComponentPreview>
          <ComponentPreview name="Large" description="Hero sections and prominent CTAs">
            <div className="space-y-3 text-center">
              <Button size="large" variant="primary">
                Large Button
              </Button>
              <p className="font-mono text-xs text-gray-500">48px height</p>
            </div>
          </ComponentPreview>
        </StoryGrid>
      </StoryCard>

      <StoryCard
        title="Interactive Examples"
        description="Real-world usage patterns and combinations"
        variant="interactive"
      >
        <StoryGrid columns={2} gap="lg">
          <ComponentPreview name="Call-to-Action Section" description="Hero section with primary and secondary actions">
            <div className="space-y-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900">Ready to get started?</h3>
              <p className="text-sm text-gray-600">Join thousands of developers building amazing experiences</p>
              <div className="flex justify-center gap-3">
                <Button size="medium" variant="primary">
                  Get Started Free
                </Button>
                <Button size="medium" variant="outline">
                  View Pricing
                </Button>
              </div>
            </div>
          </ComponentPreview>
          <ComponentPreview name="Form Actions" description="Typical form button arrangements">
            <div className="space-y-4 rounded-lg bg-gray-50 p-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  placeholder="My awesome project"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button size="small" variant="ghost">
                  Cancel
                </Button>
                <Button size="small" variant="primary">
                  Create Project
                </Button>
              </div>
            </div>
          </ComponentPreview>
        </StoryGrid>
      </StoryCard>

      <StoryCard title="Properties" description="Component API and configuration options">
        <PropertyTable
          properties={[
            {
              name: 'variant',
              type: '"primary" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
              default: 'primary',
              description: 'Visual style variant of the button',
            },
            {
              name: 'size',
              type: '"small" | "medium" | "large"',
              default: 'medium',
              description: 'Size of the button affecting padding and font size',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Whether the button is disabled and non-interactive',
            },
            {
              name: 'onClick',
              type: '(event: MouseEvent) => void',
              description: 'Click event handler function',
            },
            {
              name: 'children',
              type: 'ReactNode',
              description: 'Button content (text, icons, etc.)',
            },
          ]}
        />
      </StoryCard>
    </StoryShowcase>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test showcase title is rendered
    expect(canvas.getByText('Button Component')).toBeInTheDocument();

    // Test all variants are rendered with correct classes
    expect(canvas.getByText('Get Started')).toHaveClass('base-button--primary');
    expect(canvas.getByText('Delete Account')).toHaveClass('base-button--destructive');
    expect(canvas.getByText('Learn More')).toHaveClass('base-button--outline');
    expect(canvas.getByText('Cancel')).toHaveClass('base-button--secondary');
    expect(canvas.getByText('Skip')).toHaveClass('base-button--ghost');
    expect(canvas.getByText('Read Documentation')).toHaveClass('base-button--link');

    // Test all sizes are rendered
    expect(canvas.getByText('Small Button')).toHaveClass('base-button--small');
    expect(canvas.getByText('Medium Button')).toHaveClass('base-button--medium');
    expect(canvas.getByText('Large Button')).toHaveClass('base-button--large');

    // Test status badge is shown
    expect(canvas.getByText('stable')).toBeInTheDocument();
  },
};
