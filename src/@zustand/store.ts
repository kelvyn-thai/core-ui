import { create, StateCreator, StoreApi, UseBoundStore, Mutate } from "zustand";
import {
  DevtoolsOptions,
  PersistOptions,
  devtools,
  persist,
} from "zustand/middleware";

export const createStore = <T>(
  initializer: StateCreator<T, [], any[], T>,
  {
    devtoolsOptions,
    persistOptions,
  }: {
    devtoolsOptions?: DevtoolsOptions;
    persistOptions?: PersistOptions<T, Partial<T>>;
  } = {},
): [UseBoundStore<Mutate<StoreApi<T>, any[]>>] => {
  let storeInitializer = initializer;

  if (persistOptions?.name) {
    storeInitializer = persist(initializer, { ...persistOptions });
  }

  if (devtoolsOptions?.enabled) {
    storeInitializer = devtools(storeInitializer, {
      ...devtoolsOptions,
    });
  }

  const useStore = create<T>()(storeInitializer);

  return [useStore];
};
