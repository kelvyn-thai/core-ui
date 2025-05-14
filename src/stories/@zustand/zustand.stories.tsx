import type { StoryObj } from "@storybook/react";
import {
  createQueryStore,
  createStore,
  useShallow,
  createJSONStorage,
} from "@zustand/index";

const meta = {
  title: "Example/Zustand",
};

export default meta;

type Story = StoryObj<typeof meta>;

interface BearState {
  bears: number;
  trees: number;
  increase: (by: number) => void;
  plant: (by: number) => void;
}

const [useBearStore] = createStore<BearState>(
  (set) => ({
    bears: 0,
    trees: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by })),
    plant: (by) => set((state) => ({ trees: state.trees + by })),
  }),
  {
    devtoolsOptions: {
      enabled: true,
      name: Symbol("$BEAR_STORE").toString(),
      anonymousActionType: "[$BEAR_STORE] Manipulated",
      store: "$STORE",
    },
    persistOptions: {
      name: Symbol("$BEAR_STORE_STORAGE").toString(),
      storage: createJSONStorage(() => localStorage),
      partialize(state) {
        return {
          bears: state.bears,
        };
      },
      onRehydrateStorage(initialState) {
        console.log({ initialState });
        return (persistedState, error) => {
          if (error) {
            console.log("ERROR DURING REHYDRATE STORAGE");
          } else {
            console.log({ persistedState });
            console.log("HYDRATION SUCCESSFULLY");
          }
        };
      },
      version: 1,
    },
  },
);

export const Default: Story = {
  render: (args) => {
    const [bears, increase, trees, plant] = useBearStore(
      useShallow((s) => [s.bears, s.increase, s.trees, s.plant]),
    );

    return (
      <div>
        <p>Refresh to see bears state persisted</p>
        <p>Total bears: {bears}</p>
        <p>Total trees: {trees}</p>
        <button onClick={() => increase(1)}>Increase bears</button>
        <button onClick={() => plant(1)}>Increase trees</button>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
import {
  createQueryStore,
  createStore,
  useShallow,
  createJSONStorage,
} from "@zustand/index";

interface BearState {
  bears: number;
  trees: number;
  increase: (by: number) => void;
  plant: (by: number) => void;
}

const [useBearStore] = createStore<BearState>(
  (set) => ({
    bears: 0,
    trees: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by })),
    plant: (by) => set((state) => ({ trees: state.trees + by })),
  }),
  {
    devtoolsOptions: {
      enabled: true,
      name: Symbol("$BEAR_STORE").toString(),
      anonymousActionType: "[$BEAR_STORE] Manipulated",
      store: "$STORE",
    },
    persistOptions: {
      name: Symbol("$BEAR_STORE_STORAGE").toString(),
      storage: createJSONStorage(() => localStorage),
      partialize(state) {
        return {
          bears: state.bears,
        };
      },
      onRehydrateStorage(initialState) {
        console.log({ initialState });
        return (persistedState, error) => {
          if (error) {
            console.log("ERROR DURING REHYDRATE STORAGE");
          } else {
            console.log({ persistedState });
            console.log("HYDRATION SUCCESSFULLY");
          }
        };
      },
      version: 1,
    },
  },
);

 render: (args) => {
    const [bears, increase, trees, plant] = useBearStore(
      useShallow((s) => [s.bears, s.increase, s.trees, s.plant]),
    );

    return (
      <div>
        <p>Refresh to see bears state persisted</p>
        <p>Total bears: {bears}</p>
        <p>Total trees: {trees}</p>
        <button onClick={() => increase(1)}>Increase bears</button>
        <button onClick={() => plant(1)}>Increase trees</button>
      </div>
    );
  },

`,
      },
    },
  },
};

const delay = () => new Promise((resolve) => setTimeout(resolve, 2000));

interface Response {
  id: string;
  name: string;
  description: string;
}
const useQuery = createQueryStore<Response>();

export const QueryStore: Story = {
  render: (args) => {
    const { isPending, error, data, executeQueryFn, setData } = useQuery(
      useShallow((s) => s),
    );

    const handleSubmit = () => {
      executeQueryFn({
        queryFn: async () => {
          setData(null as unknown as Response);
          await delay();
          if (Math.random() > 0.5) {
            throw new Error("Something went wrong!");
          }
          return { id: "1", description: "", name: "" };
        },
        queryFnSuccess: (response) => {
          console.log({ response });
        },
        queryFnFail(error) {
          console.log({ error });
        },
      });
    };

    const renderData = () => {
      if (isPending) {
        return <div>....</div>;
      }
      if (error) {
        return <span>{error}</span>;
      }
      return <p>{JSON.stringify(data)}</p>;
    };

    return (
      <div>
        {renderData()} <button onClick={handleSubmit}>Click to query</button>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
import {
  createQueryStore,
  createStore,
  useShallow,
  createJSONStorage,
} from "@zustand/index";

const delay = () => new Promise((resolve) => setTimeout(resolve, 2000));

interface Response {
  id: string;
  name: string;
  description: string;
}
const useQuery = createQueryStore<Response>();


render(){
 const { isPending, error, data, executeQueryFn, setData } = useQuery(
      useShallow((s) => s),
    );

    const handleSubmit = () => {
      executeQueryFn({
        queryFn: async () => {
          setData(null as unknown as Response);
          await delay();
          if (Math.random() > 0.5) {
            throw new Error("Something went wrong!");
          }
          return { id: "1", description: "", name: "" };
        },
        queryFnSuccess: (response) => {
          console.log({ response });
        },
        queryFnFail(error) {
          console.log({ error });
        },
      });
    };

    const renderData = () => {
      if (isPending) {
        return <div>....</div>;
      }
      if (error) {
        return <span>{error}</span>;
      }
      return <p>{JSON.stringify(data)}</p>;
    };

    return (
      <div>
        {renderData()} <button onClick={handleSubmit}>Click to query</button>
      </div>
    );

}

`,
      },
    },
  },
};
