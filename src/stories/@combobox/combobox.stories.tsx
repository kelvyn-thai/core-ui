import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fireEvent, userEvent, within } from '@storybook/test';
import { Combobox, ComboboxItem, ComboboxProps } from '@combobox';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { useEffect, useMemo, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import debounce from 'lodash/debounce';
import { generateMockItems } from './combobox.factories';
import { StoryShowcase, StoryCard, StoryGrid, ComponentPreview, PropertyTable, StatusBadge } from 'src/stories/shared';
import '@combobox/combobox.css';
import { Button } from '@button';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A searchable dropdown combobox component with BEM methodology and full keyboard navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    label: {
      control: 'text',
      description: 'Label for the combobox',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the combobox is in loading state',
    },
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleCombobox: Story = {
  args: {} as ComboboxProps,
  render: () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [items] = useState<ComboboxItem[]>([
      { text: 'Apple', value: 'apple' },
      { text: 'Banana', value: 'banana' },
      { text: 'Cherry', value: 'cherry' },
      { text: 'Date', value: 'date' },
      { text: 'Elderberry', value: 'elderberry' },
    ]);
    const [selectedItem, setSelectedItem] = useState<ComboboxItem | null>(null);
    const [keySearch, setKeySearch] = useState('');

    const filteredItems = useMemo(
      () => items.filter((item) => item.text.toLowerCase().includes(keySearch.toLowerCase())),
      [items, keySearch],
    );

    const props: ComboboxProps = {
      label: 'Choose a fruit',
      placeholder: 'Type to search fruits...',
      isLoading: false,
      items: filteredItems,
      selectedItem,
      keySearch,
      onChangeKeySearch: setKeySearch,
      onSelectItem: (item) => {
        setSelectedItem(item);
        setKeySearch(item.text);
        setIsMenuOpen(false);
      },
      isMenuOpen,
      setIsMenuOpen,
    };

    return (
      <div className="w-96 p-4">
        <Combobox {...props} />
        <div className="mt-4 text-sm text-gray-600" data-testid="selected-result">
          Selected: {selectedItem?.text || 'None'}
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial render
    const input = canvas.getByTestId('input');
    const label = canvas.getByTestId('label');

    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('base-combobox__input');
    expect(label).toHaveClass('base-combobox__label');
    expect(label).toHaveTextContent('Choose a fruit');

    // Test initial state - no selection
    const selectedResult = canvas.getByTestId('selected-result');
    expect(selectedResult).toHaveTextContent('Selected: None');

    // Test opening dropdown on focus
    await userEvent.click(input);
    expect(input).toHaveFocus();

    // Test dropdown appears with items
    const dropdown = canvas.getByTestId('dropdown-menu');
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveClass('base-combobox__dropdown');

    // Test items are rendered
    const appleItem = canvas.getByText('Apple');
    const bananaItem = canvas.getByText('Banana');
    expect(appleItem).toHaveClass('base-combobox__item');
    expect(bananaItem).toHaveClass('base-combobox__item');

    // Test selecting an item
    await userEvent.click(appleItem);
    expect(selectedResult).toHaveTextContent('Selected: Apple');
    expect(input).toHaveValue('Apple');

    // Test search functionality
    await userEvent.clear(input);
    await userEvent.type(input, 'ban');

    // Should show filtered results
    expect(canvas.getByText('Banana')).toBeInTheDocument();
    expect(canvas.queryByText('Apple')).not.toBeInTheDocument();

    // Test selecting filtered item
    await userEvent.click(canvas.getByText('Banana'));
    expect(selectedResult).toHaveTextContent('Selected: Banana');
    expect(input).toHaveValue('Banana');
  },
};

export const LoadingState: Story = {
  args: {} as ComboboxProps,
  render: () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [keySearch, setKeySearch] = useState('');

    const props: ComboboxProps = {
      label: 'Loading example',
      placeholder: 'Search while loading...',
      isLoading: true,
      items: [],
      selectedItem: null,
      keySearch,
      onChangeKeySearch: setKeySearch,
      onSelectItem: () => {},
      isMenuOpen,
      setIsMenuOpen,
    };

    return (
      <div className="w-96 p-4">
        <Combobox {...props} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByTestId('input');
    await userEvent.click(input);

    // Test loading state shows loading message
    const dropdown = canvas.getByTestId('dropdown-menu');
    expect(dropdown).toBeInTheDocument();
    expect(canvas.getByText('Loading...')).toBeInTheDocument();
    expect(canvas.getByText('Loading...')).toHaveClass('base-combobox__message');
  },
};

export const EmptyState: Story = {
  args: {} as ComboboxProps,
  render: () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [keySearch, setKeySearch] = useState('xyz');

    const props: ComboboxProps = {
      label: 'Empty results',
      placeholder: 'Search with no results...',
      isLoading: false,
      items: [], // No items to show empty state
      selectedItem: null,
      keySearch,
      onChangeKeySearch: setKeySearch,
      onSelectItem: () => {},
      isMenuOpen,
      setIsMenuOpen,
    };

    return (
      <div className="w-96 p-4">
        <Combobox {...props} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByTestId('input');
    await userEvent.click(input);

    // Test empty state shows no data message
    const dropdown = canvas.getByTestId('dropdown-menu');
    expect(dropdown).toBeInTheDocument();
    expect(canvas.getByText('No data')).toBeInTheDocument();
    expect(canvas.getByText('No data')).toHaveClass('base-combobox__message');
  },
};

export const Default: Story = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [items, setItems] = useState<ComboboxItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<ComboboxItem | null>(null);
    const [keySearch, setKeySearch] = useState('');

    const filteredItems = useMemo(
      () => items.filter((item) => item.text.toLowerCase().includes(keySearch.toLowerCase())),
      [items, keySearch],
    );

    useEffect(() => {
      const loadData = async () => {
        await delay(1000);
        setItems(generateMockItems(10));
        setIsLoading(false);
      };

      loadData();
    }, []);

    const props: ComboboxProps = {
      ...args,
      isLoading,
      items: filteredItems,
      selectedItem,
      keySearch,
      onChangeKeySearch: (value) => {
        setKeySearch(value);
      },
      onSelectItem: (item) => {
        setSelectedItem(item);
        setKeySearch(item.text);
        setIsMenuOpen(false);
      },
      isMenuOpen,
      setIsMenuOpen,
    };

    return (
      <div>
        <p>Selected: {selectedItem?.text}</p>
        <Combobox {...props} />
      </div>
    );
  },
  args: {
    label: 'Autocomplete',
    placeholder: 'Type to search...',
  } as ComboboxProps,
  parameters: {
    docs: {
      source: {
        code: ` const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [items, setItems] = useState<ComboboxItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<ComboboxItem | null>(null);
    const [keySearch, setKeySearch] = useState("");

    const filteredItems = useMemo(
      () =>
        items.filter((item) =>
          item.text.toLowerCase().includes(keySearch.toLowerCase()),
        ),
      [items, keySearch],
    );

    useEffect(() => {
      const loadData = async () => {
        await delay(1000);
        setItems(generateMockItems(10));
        setIsLoading(false);
      };

      loadData();
    }, []);

    const props: ComboboxProps = {
      label: 'Autocomplete',
      isLoading,
      items: filteredItems,
      selectedItem,
      keySearch,
      onChangeKeySearch: (value) => {
        setKeySearch(value);
      },
      onSelectItem: (item) => {
        setSelectedItem(item);
        setKeySearch(item.text);
        setIsMenuOpen(false);
      },
      isMenuOpen,
      setIsMenuOpen,
    };

    return (
      <div>
        <p>Selected: {selectedItem?.text}</p>
        <Combobox {...props} />
      </div>
    );
`,
      },
    },
  },
};

export const AsyncSearch: Story = {
  render: (args) => {
    const mockItemsRef = useRef(generateMockItems(10));
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [items, setItems] = useState<ComboboxItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<ComboboxItem | null>(null);
    const [keySearch, setKeySearch] = useState('');
    const [searchItems, setSearchItems] = useState<ComboboxItem[]>([]);

    const dataItems = useMemo(() => {
      const isSearching = !!keySearch && keySearch.length !== 0;

      if (isSearching) {
        return searchItems;
      }

      const totalItems = [...items];

      if (selectedItem !== null) {
        totalItems.push(selectedItem);
      }

      return Array.from(new Map([...totalItems].map((item) => [item.value, item])).values());
    }, [items, searchItems, selectedItem, keySearch]);

    const handleSearch = useMemo(() => {
      return debounce(async (value: string) => {
        if (value.trim().length === 0) {
          setItems(mockItemsRef.current);
          return;
        }
        setIsLoading(true);
        await delay(1000);
        setSearchItems(Math.random() > 0.5 ? generateMockItems(5) : []); // Mocked API response
        setIsLoading(false);
      }, 500);
    }, []);

    useEffect(() => {
      const loadData = async () => {
        await delay(1000);
        setItems(mockItemsRef.current);
        setIsLoading(false);
      };

      loadData();
    }, []);

    const props: ComboboxProps = {
      ...args,
      isLoading,
      items: [...dataItems],
      selectedItem,
      keySearch,
      onChangeKeySearch: async (value) => {
        setKeySearch(value);
        handleSearch(value);
      },
      onSelectItem: (item) => {
        setSelectedItem(item);
        setKeySearch(item.text);
        setIsMenuOpen(false);
      },
      isMenuOpen,
      setIsMenuOpen,
    };

    return (
      <div>
        <p>Selected: {selectedItem?.text}</p>
        <Combobox {...props} />
      </div>
    );
  },
  args: {
    isLoading: false,
  } as ComboboxProps,
  parameters: {
    docs: {
      source: {
        code: `   
    const mockItemsRef = useRef(generateMockItems(10));
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [items, setItems] = useState<ComboboxItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<ComboboxItem | null>(null);
    const [keySearch, setKeySearch] = useState("");
    const [searchItems, setSearchItems] = useState<ComboboxItem[]>([]);

    const dataItems = useMemo(() => {
      const isSearching = !!keySearch && keySearch.length !== 0;

      if (isSearching) {
        return searchItems;
      }

      const totalItems = [...items];

      if (selectedItem !== null) {
        totalItems.push(selectedItem);
      }

      return Array.from(
        new Map([...totalItems].map((item) => [item.value, item])).values(),
      );
    }, [items, searchItems, selectedItem, keySearch]);

    const handleSearch = useMemo(() => {
      return debounce(async (value: string) => {
        if (value.trim().length === 0) {
          setItems(mockItemsRef.current);
          return;
        }
        setIsLoading(true);
        await delay(1000);
        setSearchItems(Math.random() > 0.5 ? generateMockItems(5) : []); // Mocked API response
        setIsLoading(false);
      }, 500);
    }, []);

    useEffect(() => {
      const loadData = async () => {
        await delay(1000);
        setItems(mockItemsRef.current);
        setIsLoading(false);
      };

      loadData();
    }, []);

    const props: ComboboxProps = {
      ...args,
      isLoading,
      items: [...dataItems],
      selectedItem,
      keySearch,
      onChangeKeySearch: async (value) => {
        setKeySearch(value);
        handleSearch(value);
      },
      onSelectItem: (item) => {
        setSelectedItem(item);
        setKeySearch(item.text);
        setIsMenuOpen(false);
      },
      isMenuOpen,
      setIsMenuOpen,
    };

    return (
      <div>
        <p>Selected: {selectedItem?.text}</p>
        <Combobox {...props} />
      </div>
    );
  },
`,
      },
    },
  },
};

export const WithRenderItem: Story = {
  render: (args) => <Combobox {...args} />,
  args: {
    label: 'Customize render item',
    placeholder: 'Search...',
    isLoading: false,
    isMenuOpen: true,
    items: generateMockItems(5),
    renderItem: (item) => (
      <li className="base-dropdown-menu-item">
        #{item.value.slice(0, 4)}-{item.text}-{(item?.metadata as any)?.price || 0}$
      </li>
    ),
    setIsMenuOpen: () => {},
    selectedItem: null,
    keySearch: '',
    onChangeKeySearch: () => {},
    onSelectItem: () => {},
  },
  parameters: {
    docs: {
      source: {
        code: `
<Combobox
  label="Customize render item"
  placeholder="Search..."
  isMenuOpen={true}
  isLoading={false}
  items={[
    ...
  ]}
  renderItem={(item: ComboboxItem) => (
    <li className="base-dropdown-menu-item" key={item.value} onClick={() => onSelectItem(item)}>
      #{item.value.slice(0, 4)}-{item.text}-{item?.metadata?.price}$
    </li>
  )}
  selectedItem={null}
  keySearch=""
  onChangeKeySearch={() => {}}
  onSelectItem={(item: ComboboxItem) => {}}
  setIsMenuOpen={() => {}}
/>
        `,
      },
    },
  },
};

export const Loading: Story = {
  render: (args) => {
    return <Combobox {...args} />;
  },
  args: {
    label: 'Loading Combo',
    placeholder: 'Search...',
    isLoading: true,
    isMenuOpen: true,
    items: [] as ComboboxItem[],
    setIsMenuOpen(isOpen) {
      //
    },
  } as ComboboxProps,
};

export const EmptyData: Story = {
  render: (args) => {
    return <Combobox {...args} />;
  },
  args: {
    label: 'Empty data',
    placeholder: 'Search...',
    isLoading: false,
    items: [] as ComboboxItem[],
    isMenuOpen: true,
    setIsMenuOpen(isOpen) {
      //
    },
  } as ComboboxProps,
};

export const EmptySearchResult: Story = {
  render: (args) => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [items] = useState<ComboboxItem[]>(generateMockItems(5));
    const [keySearch, setKeySearch] = useState('zzzzzz');
    const [selectedItem, setSelectedItem] = useState<ComboboxItem>({
      text: 'None',
      value: 'none',
      metadata: {},
    });

    const filteredItems = useMemo(
      () => items.filter((item) => item.text.toLowerCase().includes(keySearch.toLowerCase())),
      [items, keySearch],
    );

    const props: ComboboxProps = {
      ...args,
      items: filteredItems,
      selectedItem,
      keySearch,
      onChangeKeySearch: setKeySearch,
      onSelectItem: (item) => {
        unstable_batchedUpdates(() => {
          setSelectedItem(item);
          setKeySearch(item.text);
          setIsMenuOpen(false);
        });
      },
      isMenuOpen,
      setIsMenuOpen,
    };

    return <Combobox {...props} />;
  },
  args: {
    label: 'Empty Search Result',
    placeholder: 'Type zzz to see empty search...',
    isLoading: false,
  } as ComboboxProps,
  parameters: {
    docs: {
      source: {
        code: `
const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [items] = useState<ComboboxItem[]>(generateMockItems(5));
    const [keySearch, setKeySearch] = useState("zzzzzz");
    const [selectedItem, setSelectedItem] = useState<ComboboxItem>({
      text: "None",
      value: "none",
      metadata: {},
    });

    const filteredItems = useMemo(
      () =>
        items.filter((item) =>
          item.text.toLowerCase().includes(keySearch.toLowerCase()),
        ),
      [items, keySearch],
    );

    const props: ComboboxProps = {
      ...args,
      items: filteredItems,
      selectedItem,
      keySearch,
      onChangeKeySearch: setKeySearch,
      onSelectItem: (item) => {
        unstable_batchedUpdates(() => {
          setSelectedItem(item);
          setKeySearch(item.text);
          setIsMenuOpen(false);
        });
      },
      isMenuOpen,
      setIsMenuOpen,
    };

    return <Combobox {...props} />;`,
      },
    },
  },
};

const comboboxSchema = z.object({
  fruit: z.object({
    text: z.string(),
    value: z.string(),
    metadata: z.any().optional(),
  }),
  search: z.string(),
});

type ComboboxFormSchema = z.infer<typeof comboboxSchema>;

export const WithReactHookForm: Story = {
  args: {} as ComboboxProps,
  render: () => {
    const { control, setValue, handleSubmit } = useForm<ComboboxFormSchema>({
      resolver: zodResolver(comboboxSchema),
      defaultValues: {
        fruit: { text: '', value: '', metadata: null },
        search: '',
      },
    });

    const [fruit, keySearch] = useWatch({
      control,
      name: ['fruit', 'search'],
    });

    const [items] = useState<ComboboxItem[]>(generateMockItems(8));
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const filteredItems = useMemo(
      () => items.filter((item) => item.text.toLowerCase().includes(keySearch.toLowerCase())),
      [items, keySearch],
    );

    const onSubmit = (data: ComboboxFormSchema) => {
      alert(`You selected: ${data.fruit.text}`);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="fruit"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Combobox
              label="Select Fruit"
              placeholder="Search fruits..."
              items={filteredItems}
              keySearch={keySearch}
              onChangeKeySearch={(v) => setValue('search', v)}
              selectedItem={value}
              onSelectItem={(item) => {
                onChange(item);
                setValue('search', item.text);
                setIsMenuOpen(false);
              }}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              isLoading={false}
            />
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates how to use the `Combobox` component as a controlled input with `react-hook-form` and `zod` schema validation. It integrates a searchable dropdown with form state and validation.',
      },
      source: {
        code: `
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  fruit: z.object({
    text: z.string(),
    value: z.string(),
    metadata: z.any().optional(),
  }),
  search: z.string(),
});

const { control, handleSubmit, setValue } = useForm({
  resolver: zodResolver(schema),
  defaultValues: {
    fruit: { text: "", value: "", metadata: null },
    search: "",
  },
});

  const { control, setValue, handleSubmit } = useForm<ComboboxFormSchema>({
      resolver: zodResolver(comboboxSchema),
      defaultValues: {
        fruit: { text: "", value: "", metadata: null },
        search: "",
      },
    });

    const [fruit, keySearch] = useWatch({
      control,
      name: ["fruit", "search"],
    });

    const [items] = useState<ComboboxItem[]>(generateMockItems(8));
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const filteredItems = useMemo(
      () =>
        items.filter((item) =>
          item.text.toLowerCase().includes(keySearch.toLowerCase()),
        ),
      [items, keySearch],
    );

    const onSubmit = (data: ComboboxFormSchema) => {
      alert('...');
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="fruit"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Combobox
              label="Select Fruit"
              placeholder="Search fruits..."
              items={filteredItems}
              keySearch={keySearch}
              onChangeKeySearch={(v) => setValue("search", v)}
              selectedItem={value}
              onSelectItem={(item) => {
                onChange(item);
                setValue("search", item.text);
                setIsMenuOpen(false);
              }}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              isLoading={false}
            />
          )}
        />
        <Button type="submit" label="Submit" />
      </form>
    );
        `,
      },
    },
  },
};
