import { randProductName, randUuid, randNumber } from '@ngneat/falso';
import { ComboboxItem } from '@combobox';

export const generateMockItems = (count: number = 10): ComboboxItem[] => {
  return Array.from({ length: count }).map(() => ({
    text: randProductName(),
    value: randUuid(),
    metadata: {
      price: randNumber({ min: 10, max: 200, precision: 0.01 }).toFixed(2),
    },
  }));
};
