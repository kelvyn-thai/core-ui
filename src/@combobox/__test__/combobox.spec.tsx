import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Combobox, ComboboxItem } from "@combobox/index";

describe("Combobox", () => {
  const items: ComboboxItem[] = [
    { text: "Apple", value: "apple" },
    { text: "Banana", value: "banana" },
  ];

  const setup = (props = {}) => {
    const onSelectItem = jest.fn();
    const onChangeKeySearch = jest.fn();

    render(
      <Combobox
        label="Fruits"
        placeholder="Search..."
        items={items}
        onSelectItem={onSelectItem}
        selectedItem={null}
        keySearch=""
        onChangeKeySearch={onChangeKeySearch}
        isLoading={false}
        isMenuOpen={true}
        setIsMenuOpen={jest.fn()}
        {...props}
      />,
    );

    return { onSelectItem, onChangeKeySearch };
  };

  it("should renders input and label", () => {
    setup();
    expect(screen.getByTestId("label")).toBeInTheDocument();
    expect(screen.getByTestId("input")).toBeInTheDocument();
  });

  it("should renders list items", () => {
    setup();
    items.forEach((item) =>
      expect(screen.getByText(item.text)).toBeInTheDocument(),
    );
  });

  it("should calls onSelectItem when item clicked", () => {
    const { onSelectItem } = setup();

    fireEvent.click(screen.getByText("Apple"));
    expect(onSelectItem).toHaveBeenCalledWith(items[0]);
  });

  it("should calls onChangeKeySearch when input is typed", () => {
    const { onChangeKeySearch } = setup();

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "Ap" } });
    expect(onChangeKeySearch).toHaveBeenCalledWith("Ap");
  });

  it("should shows loading message when isLoading is true", () => {
    setup({ isLoading: true });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should shows 'Data is empty!' when no items and no search", () => {
    setup({ items: [], keySearch: "" });
    expect(screen.getByText("Data is empty!")).toBeInTheDocument();
  });

  it("should shows 'No result' when no items but search is entered", () => {
    setup({ items: [], keySearch: "zoo" });
    expect(screen.getByText("No result matching 'zoo'")).toBeInTheDocument();
  });

  it("shold renders custom items via renderItem prop", () => {
    const mockItems: ComboboxItem[] = [
      { text: "Apple", value: "apple", metadata: { price: "10" } },
      { text: "Banana", value: "banana", metadata: { price: "20" } },
    ];
    const onSelectItem = jest.fn();

    render(
      <Combobox
        label="Fruits"
        placeholder="Search..."
        keySearch=""
        onChangeKeySearch={() => {}}
        items={mockItems}
        selectedItem={null}
        isLoading={false}
        isMenuOpen={true}
        setIsMenuOpen={() => {}}
        onSelectItem={onSelectItem}
        renderItem={(item) => (
          <li
            data-testid={`custom-${item.value}`}
            key={item.value}
            onClick={() => onSelectItem(item)}
          >
            #{item.value}-{item.text}-{item.metadata?.price}$
          </li>
        )}
      />,
    );

    // Check custom render output
    expect(screen.getByTestId("custom-apple")).toHaveTextContent(
      "#apple-Apple-10$",
    );
    expect(screen.getByTestId("custom-banana")).toHaveTextContent(
      "#banana-Banana-20$",
    );

    // Simulate click
    fireEvent.click(screen.getByTestId("custom-banana"));
    expect(onSelectItem).toHaveBeenCalled();
    expect(onSelectItem).toHaveBeenCalledWith(mockItems[1]);
  });
});
