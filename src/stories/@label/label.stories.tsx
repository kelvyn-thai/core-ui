import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from '@storybook/test';
import { Label } from '@label';
import { StoryShowcase, StoryCard, StoryGrid, ComponentPreview, PropertyTable, StatusBadge } from 'src/stories/shared';

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible label component with multiple sizes following BEM methodology.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the label',
    },
    content: {
      control: 'text',
      description: 'Text content of the label',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'small',
    content: 'Small Label',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Small Label');

    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('base-label', 'base-label--small');
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    content: 'Medium Label',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Medium Label');

    expect(label).toHaveClass('base-label', 'base-label--medium');
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    content: 'Large Label',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Large Label');

    expect(label).toHaveClass('base-label', 'base-label--large');
  },
};

export const LabelShowcase: Story = {
  render: () => (
    <StoryShowcase
      title="Label Component"
      subtitle="Semantic label component for form fields and content with consistent typography and sizing"
    >
      <div className="mb-8 flex items-center justify-center gap-2">
        <StatusBadge status="stable" />
        <span className="text-sm text-gray-600">Production Ready</span>
      </div>

      <StoryCard
        title="Sizes"
        description="Three typography scales for different content hierarchies"
        variant="showcase"
      >
        <StoryGrid columns={3} gap="lg">
          <ComponentPreview name="Small" description="Secondary labels and captions">
            <div className="flex flex-col items-center gap-3">
              <Label size="small" content="Small Label" />
              <span className="font-mono text-xs text-gray-600">12px / 16px height</span>
            </div>
          </ComponentPreview>
          <ComponentPreview name="Medium" description="Standard form labels and content">
            <div className="flex flex-col items-center gap-3">
              <Label size="medium" content="Medium Label" />
              <span className="font-mono text-xs text-gray-600">14px / 20px height</span>
            </div>
          </ComponentPreview>
          <ComponentPreview name="Large" description="Prominent headings and important labels">
            <div className="flex flex-col items-center gap-3">
              <Label size="large" content="Large Label" />
              <span className="font-mono text-xs text-gray-600">16px / 24px height</span>
            </div>
          </ComponentPreview>
        </StoryGrid>
      </StoryCard>

      <StoryCard
        title="Usage Examples"
        description="Real-world label applications in different contexts"
        variant="showcase"
      >
        <StoryGrid columns={2} gap="lg">
          <ComponentPreview name="Form Labels" description="Semantic labels for form inputs">
            <div className="w-full max-w-xs space-y-4">
              <div>
                <Label size="medium" content="Email Address" />
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <Label size="small" content="Optional Field" />
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Optional information"
                />
              </div>
            </div>
          </ComponentPreview>
          <ComponentPreview name="Content Labels" description="Labels for UI sections and components">
            <div className="w-full space-y-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <Label size="large" content="Settings" />
                <p className="mt-2 text-sm text-gray-600">Configure your application preferences</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <Label size="medium" content="Notifications" />
                <p className="mt-1 text-xs text-gray-500">Manage your notification settings</p>
              </div>
            </div>
          </ComponentPreview>
        </StoryGrid>
      </StoryCard>

      <StoryCard title="Properties" description="Component API and configuration options">
        <PropertyTable
          properties={[
            {
              name: 'size',
              type: '"small" | "medium" | "large"',
              default: 'medium',
              description: 'Size affecting font size and line height of the label text',
            },
            {
              name: 'content',
              type: 'string',
              description: 'Text content to be displayed in the label',
            },
            {
              name: 'className',
              type: 'string',
              description: 'Additional CSS classes to apply to the label element',
            },
            {
              name: 'htmlFor',
              type: 'string',
              description: 'ID of the form element this label is associated with',
            },
          ]}
        />
      </StoryCard>
    </StoryShowcase>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test showcase title is rendered
    expect(canvas.getByText('Label Component')).toBeInTheDocument();

    // Test all sizes are rendered with correct classes
    expect(canvas.getByText('Small Label')).toHaveClass('base-label--small');
    expect(canvas.getByText('Medium Label')).toHaveClass('base-label--medium');
    expect(canvas.getByText('Large Label')).toHaveClass('base-label--large');

    // Test typography information is displayed
    expect(canvas.getByText('12px / 16px height')).toBeInTheDocument();
    expect(canvas.getByText('14px / 20px height')).toBeInTheDocument();
    expect(canvas.getByText('16px / 24px height')).toBeInTheDocument();

    // Test usage examples are shown
    expect(canvas.getByText('Email Address')).toBeInTheDocument();
    expect(canvas.getByText('Settings')).toBeInTheDocument();

    // Test status badge is shown
    expect(canvas.getByText('stable')).toBeInTheDocument();
  },
};
