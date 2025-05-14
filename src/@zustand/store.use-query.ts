import { StoreApi, UseBoundStore } from "zustand";
import { createStore } from "./store";

export interface QueryStore<T extends any> {
  isPending: boolean;
  error: string | null;
  data: T | undefined;
  setPending: (isPending: boolean) => void;
  setError: (error: string | null) => void;
  setData: (data: T) => void;
  executeQueryFn: ({
    queryFn,
  }: {
    queryFn: () => Promise<T>;
    queryFnSuccess?: (response: T) => void;
    queryFnFail?: (error: unknown) => void;
  }) => Promise<T | undefined>;
}

export const createQueryStore = <T>(): UseBoundStore<
  StoreApi<QueryStore<T>>
> => {
  const [useStore] = createStore<QueryStore<T>>((set, get) => ({
    isPending: false,
    error: null,
    data: undefined,
    setPending(isPending) {
      set({ isPending });
    },
    setData(data) {
      set({ data });
    },
    setError(error) {
      set({ error });
    },
    async executeQueryFn({ queryFn, queryFnFail, queryFnSuccess }) {
      let response: T | undefined;

      const { setPending, setError, setData } = get();

      try {
        setPending(true);
        setError(null);

        response = await queryFn();

        setData(response);

        if (typeof queryFnSuccess === "function") {
          queryFnSuccess(response);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(JSON.stringify(error));
        }

        if (typeof queryFnFail === "function") {
          queryFnFail(error);
        }
      } finally {
        setPending(false);
      }

      return response;
    },
  }));

  return useStore;
};
