import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox, ComboboxItem, ComboboxProps } from '@combobox';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { useEffect, useMemo, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import debounce from 'lodash/debounce';
import { generateMockItems } from './combobox.factories';
import '@combobox/combobox.less';
import { Button } from '@button';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const meta = {
  title: 'Example/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

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
        #{item.value.slice(0, 4)}-${item.text}-{item?.metadata?.price!}$
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
