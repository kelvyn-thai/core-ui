import { JSX, useMemo } from 'react';
import clsx from 'clsx';

import { SearchIcon } from '../@icons';
import { useClickOutside } from '../@hook';

import './combobox.css';

export type ComboboxItem = {
  text: string;
  value: string;
  metadata?: Record<string, unknown>;
};

export type ComboboxProps = {
  placeholder?: string;
  label?: string;
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
  placeholder = 'Type to search',
  label,
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

  const search: string = useMemo(() => (typeof keySearch === 'string' ? keySearch.trim() : ''), [keySearch]);

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
            if (typeof renderItem === 'function') {
              return renderItem(item);
            }

            const { value, text } = item;
            const isSelected = selectedItem?.value === value;

            return (
              <li
                role="option"
                className={clsx('base-combobox__item', isSelected && 'base-combobox__item--selected')}
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
    <div ref={wrapperRef} className={clsx('base-combobox', className)}>
      {label && (
        <div className="base-combobox__label" data-testid="label">
          {label}
        </div>
      )}
      <div className="base-combobox__input-wrapper">
        <input
          type="text"
          placeholder={placeholder}
          value={keySearch}
          onChange={(e) => onChangeKeySearch(e.target.value)}
          className="base-combobox__input"
          onFocus={() => setIsMenuOpen(true)}
          data-testid="input"
        />
        <div className="base-combobox__icon">
          <SearchIcon />
        </div>
      </div>
      {isMenuOpen && renderMenu()}
    </div>
  );
};

export const ComboboxMessage = ({ msg }: { msg: string }) => <li className="base-combobox__message">{msg}</li>;

export const ComboboxDropdownMenu = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <ul className="base-combobox__dropdown" role="listbox" data-testid="dropdown-menu">
      {children}
    </ul>
  );
};

Combobox.DropDownMenu = ComboboxDropdownMenu;
Combobox.Message = ComboboxMessage;
Combobox.displayName = 'Combobox';

export default Combobox;
