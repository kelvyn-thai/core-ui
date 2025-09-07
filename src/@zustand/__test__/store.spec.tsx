import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createStore, useShallow, createJSONStorage } from '@zustand/index';

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const [useBearStore] = createStore<BearState>((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));

interface BearPersistState extends BearState {
  trees: number;
  plantTrees: (by: number) => void;
}

const [useBearPersistStore] = createStore<BearPersistState>(
  (set) => ({
    bears: 0,
    trees: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by })),
    plantTrees: (by) => set((state) => ({ trees: state.trees + by })),
  }),
  {
    persistOptions: {
      name: '$BEAR_STORE',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ bears: state.bears }),
      version: 1,
    },
  },
);

describe('@zustand/store', () => {
  it('should increment bears in non-persisted store', async () => {
    const NonPersistedBearComponent = () => {
      const [bears, increase] = useBearStore(useShallow((s) => [s.bears, s.increase]));

      return (
        <div>
          <p data-testid="totalBears">Total bears: {bears}</p>
          <button data-testid="btnIncreaseBears" onClick={() => increase(1)}>
            Increase bears
          </button>
        </div>
      );
    };

    render(<NonPersistedBearComponent />);

    expect(screen.getByTestId('totalBears')).toHaveTextContent('Total bears: 0');

    await userEvent.click(screen.getByTestId('btnIncreaseBears'));

    expect(screen.getByTestId('totalBears')).toHaveTextContent('Total bears: 1');
  });

  it('should persist bears and ignore trees in localStorage', async () => {
    const PersistedBearComponent = () => {
      const [bears, increase, trees, plantTrees] = useBearPersistStore(
        useShallow((s) => [s.bears, s.increase, s.trees, s.plantTrees]),
      );

      return (
        <div>
          <p data-testid="totalBears">Total bears: {bears}</p>
          <p data-testid="totalTrees">Total trees: {trees}</p>
          <button data-testid="btnIncreaseBears" onClick={() => increase(1)}>
            Increase bears
          </button>
          <button data-testid="btnPlantTrees" onClick={() => plantTrees(1)}>
            Increase trees
          </button>
        </div>
      );
    };

    render(<PersistedBearComponent />);

    // Initial state
    expect(screen.getByTestId('totalBears')).toHaveTextContent('Total bears: 0');
    expect(screen.getByTestId('totalTrees')).toHaveTextContent('Total trees: 0');

    await userEvent.click(screen.getByTestId('btnIncreaseBears')); // persist
    await userEvent.click(screen.getByTestId('btnPlantTrees')); // not persisted

    expect(screen.getByTestId('totalBears')).toHaveTextContent('Total bears: 1');
    expect(screen.getByTestId('totalTrees')).toHaveTextContent('Total trees: 1');

    const persisted = JSON.parse(localStorage.getItem('$BEAR_STORE')!);
    expect(persisted).toEqual({
      state: { bears: 1 },
      version: 1,
    });
  });
});
