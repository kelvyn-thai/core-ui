import { JSX, useMemo } from "react";
import clsx from "clsx";

import { Label } from "../@label";
import { Input } from "../@input";
import { Icon, SearchIcon } from "../@icon";
import { useClickOutside } from "../@hook";

import "./combobox.less";

export type ComboboxItem = {
  text: string;
  value: string;
  metadata?: any;
};

export type ComboboxProps = {
  placeholder?: string;
  label: string;
  items: ComboboxItem[];
  onSelectItem: (item: ComboboxItem) => void;
  selectedItem: ComboboxItem | null;
  keySearch: string;
  onChangeKeySearch: (value: string) => void;
  isLoading: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  className?: string;
  renderItem?: (item: ComboboxItem) => JSX.Element;
};

const Combobox = ({
  placeholder = "Type to search",
  label = "Autocomplete",
  keySearch,
  onChangeKeySearch,
  items,
  onSelectItem,
  selectedItem,
  isLoading,
  isMenuOpen,
  setIsMenuOpen,
  className,
  renderItem,
}: ComboboxProps): JSX.Element => {
  const wrapperRef = useClickOutside<HTMLDivElement>(() => {
    setIsMenuOpen(false);
  }, isMenuOpen);

  const search: string = useMemo(
    () => (typeof keySearch === "string" ? keySearch.trim() : ""),
    [keySearch],
  );

  const isEmptyData = useMemo(() => items.length === 0, [items]);

  const isEmptySearch = useMemo(() => search.length === 0, [search]);

  const renderMenu = () => {
    if (isLoading) {
      return (
        <Combobox.DropDownMenu>
          <Combobox.Message msg="Loading..." />
        </Combobox.DropDownMenu>
      );
    }
    if (isEmptyData && isEmptySearch) {
      return (
        <Combobox.DropDownMenu>
          <Combobox.Message msg="Data is empty!" />
        </Combobox.DropDownMenu>
      );
    }
    if (isEmptyData && !isEmptySearch) {
      return (
        <Combobox.DropDownMenu>
          <Combobox.Message msg={`No result matching '${search}'`} />
        </Combobox.DropDownMenu>
      );
    }

    return (
      <Combobox.DropDownMenu>
        <>
          {items.map((item) => {
            if (typeof renderItem === "function") {
              return renderItem(item);
            }

            const { value, text } = item;
            const isSelected = selectedItem?.value === value;

            return (
              <li
                role="option"
                className={clsx(
                  "base-dropdown-menu-item",
                  isSelected && "base-dropdown-menu-item--selected",
                )}
                key={item.value}
                onClick={() => onSelectItem(item)}
                aria-selected={isSelected}
              >
                {text}
              </li>
            );
          })}
        </>
      </Combobox.DropDownMenu>
    );
  };

  return (
    <div ref={wrapperRef} className={clsx("combobox-wrapper", className)}>
      <Label
        content={label}
        className="base-combobox-label"
        data-testid="label"
      />
      <div className={clsx("base-wrapper-input")}>
        <Input
          type="text"
          placeholder={placeholder}
          value={keySearch}
          onChange={(e) => onChangeKeySearch(e.target.value)}
          className="base-input"
          onFocus={() => setIsMenuOpen(true)}
          data-testid="input"
        />
        <Icon size="sm" className="input-icon">
          <SearchIcon />
        </Icon>
      </div>
      {isMenuOpen && renderMenu()}
    </div>
  );
};

export const ComboboxMessage = ({ msg }: { msg: string }) => (
  <li className={clsx("base-dropdown-menu-item--msg")}>{msg}</li>
);

export const ComboboxDropdownMenu = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <ul
      className="base-dropdown-menu"
      role="listbox"
      data-testid="dropdown-menu"
    >
      {children}
    </ul>
  );
};

Combobox.DropDownMenu = ComboboxDropdownMenu;
Combobox.Message = ComboboxMessage;
Combobox.displayName = "Combobox";

export default Combobox;
