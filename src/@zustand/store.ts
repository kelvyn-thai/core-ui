import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand';
import { DevtoolsOptions, PersistOptions, devtools, persist } from 'zustand/middleware';

export const createStore = <T>(
  initializer: StateCreator<T, [], [], T>,
  {
    devtoolsOptions,
    persistOptions,
  }: {
    devtoolsOptions?: DevtoolsOptions;
    persistOptions?: PersistOptions<T, Partial<T>>;
  } = {},
): [UseBoundStore<StoreApi<T>>] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let storeInitializer: any = initializer;

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
