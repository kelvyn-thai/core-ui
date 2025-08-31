import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from '@storybook/test';
import { Icon, SearchIcon as BaseSearchIcon, TrashIcon as BaseTrashIcon, MapPinIcon as BaseMapPinIcon } from '@icons';
import { StoryShowcase, StoryCard, StoryGrid, ComponentPreview, PropertyTable, StatusBadge } from 'src/stories/shared';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icon wrapper component with multiple sizes following BEM methodology.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the icon',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'small',
    children: <BaseSearchIcon />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByRole('generic');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('base-icon', 'base-icon--small');
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: <BaseSearchIcon />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByRole('generic');

    expect(icon).toHaveClass('base-icon', 'base-icon--medium');
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: <BaseSearchIcon />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByRole('generic');

    expect(icon).toHaveClass('base-icon', 'base-icon--large');
  },
};

export const SearchIcon: Story = {
  args: {
    size: 'medium',
    children: <BaseSearchIcon />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByRole('generic');

    expect(icon).toBeInTheDocument();
  },
};

export const TrashIcon: Story = {
  args: {
    size: 'medium',
    children: <BaseTrashIcon />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByRole('generic');

    expect(icon).toBeInTheDocument();
  },
};

export const MapPinIcon: Story = {
  args: {
    size: 'medium',
    children: <BaseMapPinIcon />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByRole('generic');

    expect(icon).toBeInTheDocument();
  },
};

export const IconShowcase: Story = {
  render: () => (
    <StoryShowcase
      title="Icon Component"
      subtitle="Scalable icon wrapper with consistent sizing and styling for all interface icons"
    >
      <div className="mb-8 flex items-center justify-center gap-2">
        <StatusBadge status="stable" />
        <span className="text-sm text-gray-600">Production Ready</span>
      </div>

      <StoryCard title="Sizes" description="Three size options for different interface contexts" variant="showcase">
        <StoryGrid columns={3} gap="lg">
          <ComponentPreview name="Small" description="Compact UI elements and tight layouts">
            <div className="flex flex-col items-center gap-3">
              <Icon size="small">
                <BaseSearchIcon />
              </Icon>
              <span className="font-mono text-xs text-gray-600">16px × 16px</span>
            </div>
          </ComponentPreview>
          <ComponentPreview name="Medium" description="Default size for most interface elements">
            <div className="flex flex-col items-center gap-3">
              <Icon size="medium">
                <BaseSearchIcon />
              </Icon>
              <span className="font-mono text-xs text-gray-600">20px × 20px</span>
            </div>
          </ComponentPreview>
          <ComponentPreview name="Large" description="Prominent sections and hero areas">
            <div className="flex flex-col items-center gap-3">
              <Icon size="large">
                <BaseSearchIcon />
              </Icon>
              <span className="font-mono text-xs text-gray-600">24px × 24px</span>
            </div>
          </ComponentPreview>
        </StoryGrid>
      </StoryCard>

      <StoryCard title="Icon Library" description="Available icons in the design system" variant="showcase">
        <StoryGrid columns={3} gap="md">
          <ComponentPreview name="Search Icon" description="For search inputs and buttons">
            <div className="flex flex-col items-center gap-3">
              <Icon size="large">
                <BaseSearchIcon />
              </Icon>
              <code className="text-xs text-gray-600">SearchIcon</code>
            </div>
          </ComponentPreview>
          <ComponentPreview name="Trash Icon" description="For delete and remove actions">
            <div className="flex flex-col items-center gap-3">
              <Icon size="large">
                <BaseTrashIcon />
              </Icon>
              <code className="text-xs text-gray-600">TrashIcon</code>
            </div>
          </ComponentPreview>
          <ComponentPreview name="Map Pin Icon" description="For location and geography">
            <div className="flex flex-col items-center gap-3">
              <Icon size="large">
                <BaseMapPinIcon />
              </Icon>
              <code className="text-xs text-gray-600">MapPinIcon</code>
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
              description: 'Size of the icon affecting width and height dimensions',
            },
            {
              name: 'children',
              type: 'ReactNode',
              description: 'Icon component to be wrapped (SearchIcon, TrashIcon, etc.)',
            },
            {
              name: 'className',
              type: 'string',
              description: 'Additional CSS classes to apply to the icon wrapper',
            },
          ]}
        />
      </StoryCard>
    </StoryShowcase>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test showcase title is rendered
    expect(canvas.getByText('Icon Component')).toBeInTheDocument();

    // Test that size information is displayed
    expect(canvas.getByText('16px × 16px')).toBeInTheDocument();
    expect(canvas.getByText('20px × 20px')).toBeInTheDocument();
    expect(canvas.getByText('24px × 24px')).toBeInTheDocument();

    // Test icon library names are shown
    expect(canvas.getByText('SearchIcon')).toBeInTheDocument();
    expect(canvas.getByText('TrashIcon')).toBeInTheDocument();
    expect(canvas.getByText('MapPinIcon')).toBeInTheDocument();

    // Test status badge is shown
    expect(canvas.getByText('stable')).toBeInTheDocument();
  },
};
