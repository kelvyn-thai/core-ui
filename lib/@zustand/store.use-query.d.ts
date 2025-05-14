import { StoreApi, UseBoundStore } from "zustand";
export interface QueryStore<T extends any> {
    isPending: boolean;
    error: string | null;
    data: T | undefined;
    setPending: (isPending: boolean) => void;
    setError: (error: string | null) => void;
    setData: (data: T) => void;
    executeQueryFn: ({ queryFn, }: {
        queryFn: () => Promise<T>;
        queryFnSuccess?: (response: T) => void;
        queryFnFail?: (error: unknown) => void;
    }) => Promise<T | undefined>;
}
export declare const createQueryStore: <T>() => UseBoundStore<StoreApi<QueryStore<T>>>;
