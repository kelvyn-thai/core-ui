import { StateCreator, StoreApi, UseBoundStore, Mutate } from "zustand";
import { DevtoolsOptions, PersistOptions } from "zustand/middleware";
export declare const createStore: <T>(initializer: StateCreator<T, [], any[], T>, { devtoolsOptions, persistOptions, }?: {
    devtoolsOptions?: DevtoolsOptions | undefined;
    persistOptions?: PersistOptions<T, Partial<T>> | undefined;
}) => [UseBoundStore<StoreApi<T>>];
