import { StateCreator, StoreApi, UseBoundStore } from 'zustand';
import { DevtoolsOptions, PersistOptions } from 'zustand/middleware';
export declare const createStore: <T>(initializer: StateCreator<T, [], [], T>, { devtoolsOptions, persistOptions, }?: {
    devtoolsOptions?: DevtoolsOptions;
    persistOptions?: PersistOptions<T, Partial<T>>;
}) => [UseBoundStore<StoreApi<T>>];
