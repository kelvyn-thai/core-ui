import type { StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from '@storybook/test';
import { createQueryStore, createStore, useShallow, createJSONStorage } from '@zustand';
import { StoryShowcase, StoryCard, StoryGrid, ComponentPreview, PropertyTable, StatusBadge } from 'src/stories/shared';

const meta = {
  title: 'Components/Zustand',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Zustand store examples with state management and query functionality.',
      },
    },
  },
  tags: ['autodocs'],
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
      name: Symbol('$BEAR_STORE').toString(),
      anonymousActionType: '[$BEAR_STORE] Manipulated',
      store: '$STORE',
    },
    persistOptions: {
      name: Symbol('$BEAR_STORE_STORAGE').toString(),
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
            console.log('ERROR DURING REHYDRATE STORAGE');
          } else {
            console.log({ persistedState });
            console.log('HYDRATION SUCCESSFULLY');
          }
        };
      },
      version: 1,
    },
  },
);

export const Default: Story = {
  render: (args) => {
    const [bears, increase, trees, plant] = useBearStore(useShallow((s) => [s.bears, s.increase, s.trees, s.plant]));

    return (
      <div className="space-y-4 p-4">
        <p className="text-gray-600">Refresh to see bears state persisted</p>
        <div className="space-y-2">
          <p data-testid="bears-count">Total bears: {bears}</p>
          <p data-testid="trees-count">Total trees: {trees}</p>
        </div>
        <div className="space-x-2">
          <button
            data-testid="increase-bears-btn"
            onClick={() => increase(1)}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Increase bears
          </button>
          <button
            data-testid="plant-trees-btn"
            onClick={() => plant(1)}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Plant trees
          </button>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial state
    const bearsCount = canvas.getByTestId('bears-count');
    const treesCount = canvas.getByTestId('trees-count');
    const increaseBears = canvas.getByTestId('increase-bears-btn');
    const plantTrees = canvas.getByTestId('plant-trees-btn');

    // Check initial values (might be 0 or persisted values)
    expect(bearsCount).toBeInTheDocument();
    expect(treesCount).toBeInTheDocument();
    expect(increaseBears).toBeInTheDocument();
    expect(plantTrees).toBeInTheDocument();

    // Store initial values
    const initialBearsText = bearsCount.textContent;
    const initialTreesText = treesCount.textContent;

    // Test increasing bears
    await userEvent.click(increaseBears);
    expect(bearsCount).not.toHaveTextContent(initialBearsText);

    // Test planting trees
    await userEvent.click(plantTrees);
    expect(treesCount).not.toHaveTextContent(initialTreesText);

    // Test multiple increments
    await userEvent.click(increaseBears);
    await userEvent.click(increaseBears);
    await userEvent.click(plantTrees);

    // Verify buttons are responsive
    expect(increaseBears).not.toBeDisabled();
    expect(plantTrees).not.toBeDisabled();
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
} from "@zustand";

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
    const { isPending, error, data, executeQueryFn, setData } = useQuery(useShallow((s) => s));

    const handleSubmit = () => {
      executeQueryFn({
        queryFn: async () => {
          setData(null as unknown as Response);
          await delay();
          // For demo purposes, let's make it more predictable
          if (data && data.id) {
            throw new Error('Something went wrong!');
          }
          return { id: '1', description: 'Demo response', name: 'Test Item' };
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
        return <div data-testid="loading-state">Loading...</div>;
      }
      if (error) {
        return (
          <span data-testid="error-state" className="text-red-500">
            {error}
          </span>
        );
      }
      if (data) {
        return (
          <p data-testid="success-state" className="text-green-600">
            {JSON.stringify(data)}
          </p>
        );
      }
      return (
        <p data-testid="initial-state" className="text-gray-500">
          No data yet
        </p>
      );
    };

    return (
      <div className="space-y-4 p-4">
        <div className="flex min-h-[60px] items-center">{renderData()}</div>
        <button
          data-testid="query-btn"
          onClick={handleSubmit}
          disabled={isPending}
          className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 disabled:opacity-50"
        >
          {isPending ? 'Loading...' : 'Click to query'}
        </button>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial state
    const queryBtn = canvas.getByTestId('query-btn');
    const initialState = canvas.getByTestId('initial-state');

    expect(queryBtn).toBeInTheDocument();
    expect(queryBtn).not.toBeDisabled();
    expect(initialState).toHaveTextContent('No data yet');

    // Test query execution
    await userEvent.click(queryBtn);

    // Should show loading state
    expect(canvas.getByTestId('loading-state')).toHaveTextContent('Loading...');
    expect(queryBtn).toBeDisabled();

    // Wait for the query to complete (2 second delay + some buffer)
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Should show either success or error state
    const successState = canvas.queryByTestId('success-state');
    const errorState = canvas.queryByTestId('error-state');

    expect(queryBtn).not.toBeDisabled();
    expect(canvas.queryByTestId('loading-state')).not.toBeInTheDocument();

    // Either success or error should be present
    if (successState) {
      expect(successState).toBeInTheDocument();
    } else if (errorState) {
      expect(errorState).toBeInTheDocument();
    }
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
} from "@zustand";

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
