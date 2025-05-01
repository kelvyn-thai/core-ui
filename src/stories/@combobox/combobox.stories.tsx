import type { Meta, StoryObj } from "@storybook/react";
import { Combobox, ComboboxItem, ComboboxProps } from "@combobox/index";
import "@combobox/combobox.less";
import { useEffect, useMemo, useState } from "react";
import { generateMockItems } from "./combobox.factories";
import { unstable_batchedUpdates } from "react-dom";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const meta = {
  title: "Example/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [isLoading, setIsLoading] = useState(true);
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
    isLoading: false,
  } as ComboboxProps,
};

export const WithRenderItem: Story = {
  render: (args) => <Combobox {...args} />,
  args: {
    label: "Customize render item",
    placeholder: "Search...",
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
    keySearch: "",
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
    label: "Loading Combo",
    placeholder: "Search...",
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
    label: "Empty data",
    placeholder: "Search...",
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
    const [keySearch, setKeySearch] = useState("zzz");
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

    return <Combobox {...props} />;
  },
  args: {
    label: "Empty Search Result",
    placeholder: "Type zzz to see empty search...",
    isLoading: false,
  } as ComboboxProps,
};
