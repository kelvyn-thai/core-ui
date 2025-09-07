import { delay } from '@utils/index';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useShallow, createQueryStore } from '@zustand/index';
import { randProductName, randUuid, randNumber } from '@ngneat/falso';

interface Response {
  id: string;
  name: string;
  description: string;
}

const useQuery = createQueryStore<Response>();

export const generateMockResponse = (): Response => ({
  id: randUuid(),
  name: randProductName(),
  description: `This product costs $${randNumber({ min: 10, max: 100 })}`,
});
const mockData: Response = generateMockResponse();

describe('@zustand/store.use-query', () => {
  it('should fetch and render data on successful query', async () => {
    const QueryComponent = () => {
      const { isPending, error, data, executeQueryFn } = useQuery(useShallow((s) => s));

      const handleSubmit = () => {
        executeQueryFn({
          queryFn: async () => {
            await delay(1000);
            return mockData;
          },
        });
      };

      return (
        <div>
          {isPending && <div data-testid="loading">....</div>}
          {error && <span data-testid="error">{error}</span>}
          {data && <p data-testid="data">{JSON.stringify(data)}</p>}
          <button data-testid="btn-query" onClick={handleSubmit}>
            Click to query
          </button>
        </div>
      );
    };

    render(<QueryComponent />);
    await userEvent.click(screen.getByTestId('btn-query'));

    expect(screen.getByTestId('loading')).toHaveTextContent('....');

    await waitFor(() => {
      expect(screen.getByTestId('data')).toHaveTextContent(JSON.stringify(mockData));
    });
  });

  it('should handle and render error when query fails', async () => {
    const QueryComponent = () => {
      const { isPending, error, data, executeQueryFn } = useQuery(useShallow((s) => s));

      const handleSubmit = () => {
        executeQueryFn({
          queryFn: async () => {
            await delay(1000);
            throw new Error('Something went wrong!');
          },
        });
      };

      return (
        <div>
          {isPending && <div data-testid="loading">....</div>}
          {error && <span data-testid="error">{error}</span>}
          {data && <p data-testid="data">{JSON.stringify(data)}</p>}
          <button data-testid="btn-query" onClick={handleSubmit}>
            Click to query
          </button>
        </div>
      );
    };

    render(<QueryComponent />);
    await userEvent.click(screen.getByTestId('btn-query'));

    expect(screen.getByTestId('loading')).toHaveTextContent('....');

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Something went wrong!');
    });
  });
});
