'use client';

import { useState, useEffect } from 'react';
import { Button } from '@core-ui/@button';
import { Input } from '@core-ui/@input';
import { Label } from '@core-ui/@label';
import { Combobox, type ComboboxItem } from '@core-ui/@combobox';
import { Icon, SearchIcon, TrashIcon, MapPinIcon } from '@core-ui/@icons';
import { useClickOutside } from '@core-ui/@hook';
import { delay } from '@core-ui/@utils';
import { createStore, createQueryStore, useShallow, createJSONStorage } from '@core-ui/@zustand';

// Import CSS files
import '@core-ui/@button/index.css';
import '@core-ui/@input/index.css';
import '@core-ui/@label/index.css';
import '@core-ui/@combobox/index.css';
import '@core-ui/@icons/index.css';

// Zustand Store Example (from Storybook)
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
      name: 'BearStore',
      anonymousActionType: '[BearStore] Manipulated',
      store: '$STORE',
    },
    persistOptions: {
      name: 'bear-store-storage',
      storage: createJSONStorage(() => localStorage),
      partialize(state) {
        return {
          bears: state.bears,
        };
      },
      onRehydrateStorage(initialState) {
        console.log('Storage rehydration:', { initialState });
        return (persistedState, error) => {
          if (error) {
            console.log('ERROR DURING REHYDRATE STORAGE');
          } else {
            console.log('HYDRATION SUCCESSFUL:', { persistedState });
          }
        };
      },
      version: 1,
    },
  },
);

// Query Store Example (from Storybook)
interface ApiResponse {
  id: string;
  name: string;
  description: string;
}

const useQuery = createQueryStore<ApiResponse>();

export default function ClientDemo() {
  // Component State
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState<ComboboxItem | null>(null);
  const [keySearch, setKeySearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Zustand Store State (with persistence)
  const [bears, increase, trees, plant] = useBearStore(
    useShallow((s) => [s.bears, s.increase, s.trees, s.plant])
  );

  // Query Store State
  const { isPending, error, data, executeQueryFn, setData } = useQuery(
    useShallow((s) => s)
  );

  // useClickOutside Hook Example
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsDropdownOpen(false);
  }, isDropdownOpen);

  // Combobox Data
  const comboBoxItems = [
    { text: 'React', value: 'react', metadata: { category: 'frontend' } },
    { text: 'Next.js', value: 'nextjs', metadata: { category: 'framework' } },
    { text: 'TypeScript', value: 'typescript', metadata: { category: 'language' } },
    { text: 'Tailwind CSS', value: 'tailwind', metadata: { category: 'styling' } },
    { text: 'Zustand', value: 'zustand', metadata: { category: 'state' } },
  ];

  const filteredItems = comboBoxItems.filter(item =>
    item.text.toLowerCase().includes(keySearch.toLowerCase())
  );

  // Query Function (simulating API call)
  const handleApiQuery = () => {
    executeQueryFn({
      queryFn: async () => {
        setData(null as unknown as ApiResponse);
        await delay(2000); // Using core-ui utils delay
        
        // Simulate random success/failure
        if (Math.random() > 0.7) {
          throw new Error('API request failed - try again!');
        }
        
        return {
          id: Date.now().toString(),
          name: 'API Response',
          description: 'Successfully fetched data from mock API',
        };
      },
      queryFnSuccess: (response) => {
        console.log('Query success:', { response });
      },
      queryFnFail: (error) => {
        console.error('Query failed:', { error });
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Core UI Components Demo
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Comprehensive showcase of all core-ui components with real-world functionality including 
          state management, hooks, utilities, and interactive features.
        </p>
      </div>

      {/* Interactive Buttons */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Button Components</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="primary" 
              size="small"
              onClick={() => setClickCount(prev => prev + 1)}
            >
              Click Counter ({clickCount})
            </Button>
            <Button 
              variant="secondary" 
              size="medium"
              onClick={() => setInputValue('Button clicked!')}
            >
              Update Input
            </Button>
            <Button 
              variant="destructive" 
              size="large"
              onClick={() => {
                setClickCount(0);
                setInputValue('');
                setSelectedItem(null);
                setKeySearch('');
              }}
            >
              Reset All
            </Button>
            <Button 
              variant="outline"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Toggle Dropdown
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            ✨ Try different button variants with real click handlers and state updates
          </p>
        </div>
      </div>

      {/* Input & Label Components */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Input & Label Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="demo-input" content="Controlled Input" size="medium" />
            <Input
              id="demo-input"
              type="text"
              placeholder="Type something..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              inputSize="medium"
            />
            <p className="text-sm text-gray-500 mt-1">
              Current value: {inputValue || 'empty'}
            </p>
          </div>
          <div>
            <Label htmlFor="large-input" content="Large Input" size="large" />
            <Input
              id="large-input"
              type="email"
              placeholder="Enter your email"
              inputSize="large"
            />
          </div>
        </div>
      </div>

      {/* Combobox Component */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Combobox Component</h2>
        <div className="max-w-md">
          <Combobox
            label="Select Technology"
            placeholder="Search technologies..."
            items={filteredItems}
            selectedItem={selectedItem}
            onSelectItem={setSelectedItem}
            keySearch={keySearch}
            onChangeKeySearch={setKeySearch}
            isLoading={false}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
          {selectedItem && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm font-medium text-blue-900">Selected:</p>
              <p className="text-blue-700">{String(selectedItem.text)}</p>
              <p className="text-xs text-blue-600">
                Category: {String(selectedItem.metadata?.category)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Icons Component */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Icon Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Icon size="large" className="text-blue-600 mb-2">
              <SearchIcon />
            </Icon>
            <p className="text-sm text-gray-600">Search Icon</p>
          </div>
          <div className="text-center">
            <Icon size="large" className="text-red-600 mb-2">
              <TrashIcon />
            </Icon>
            <p className="text-sm text-gray-600">Trash Icon</p>
          </div>
          <div className="text-center">
            <Icon size="large" className="text-green-600 mb-2">
              <MapPinIcon />
            </Icon>
            <p className="text-sm text-gray-600">Map Pin Icon</p>
          </div>
        </div>
      </div>

      {/* useClickOutside Hook Demo */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">useClickOutside Hook Demo</h2>
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {isDropdownOpen ? 'Close Dropdown' : 'Open Dropdown'}
          </Button>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full mt-2 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 min-w-64"
            >
              <p className="text-sm text-gray-700 mb-2">
                Click outside this dropdown to close it automatically!
              </p>
              <p className="text-xs text-gray-500">
                This uses the useClickOutside hook from @core-ui/@hook
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Zustand State Management Demo */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Zustand State Management</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-900 font-medium">🐻 Forest Ecosystem (Persisted State)</p>
            <p className="text-blue-800">Bears: {bears}</p>
            <p className="text-blue-800">Trees: {trees}</p>
            <p className="text-xs text-blue-600 mt-2">
              Refresh the page - bears count will persist in localStorage!
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={() => increase(1)}
            >
              Add Bear 🐻
            </Button>
            <Button
              variant="secondary"
              onClick={() => plant(1)}
            >
              Plant Tree 🌲
            </Button>
          </div>
        </div>
      </div>

      {/* Query Store Demo */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Query Store Demo</h2>
        <div className="space-y-4">
          <div className="min-h-[80px] flex items-center">
            {isPending && (
              <div className="text-blue-600">
                🔄 Loading API data...
              </div>
            )}
            {error && (
              <div className="text-red-600 bg-red-50 p-3 rounded">
                ❌ Error: {error}
              </div>
            )}
            {data && (
              <div className="text-green-600 bg-green-50 p-3 rounded">
                ✅ Success: {JSON.stringify(data, null, 2)}
              </div>
            )}
            {!isPending && !error && !data && (
              <div className="text-gray-500">
                No data yet - click the button to fetch!
              </div>
            )}
          </div>
          <Button
            variant="primary"
            onClick={handleApiQuery}
            disabled={isPending}
          >
            {isPending ? 'Fetching...' : 'Simulate API Call'}
          </Button>
        </div>
      </div>

      {/* Utils Demo */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Utils Functions</h2>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-purple-900 font-medium">Delay Utility</p>
            <p className="text-purple-800 text-sm">
              The API simulation above uses `delay(2000)` from @core-ui/@utils
            </p>
          </div>
          <Button
            variant="outline"
            onClick={async () => {
              setClickCount(prev => prev + 1);
              await delay(1000);
              setClickCount(prev => prev + 1);
            }}
          >
            Test Delay Function
          </Button>
        </div>
      </div>

      {/* Component Summary */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ All Core UI Components Working!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Basic Components:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✅ Button - All variants with event handlers</li>
              <li>✅ Input - Controlled inputs with validation</li>
              <li>✅ Label - Properly associated with inputs</li>
              <li>✅ Icons - SVG icons with different sizes</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Advanced Features:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✅ Combobox - Search, filter, selection</li>
              <li>✅ useClickOutside - Hook for dropdown behavior</li>
              <li>✅ Zustand - State management with persistence</li>
              <li>✅ Query Store - Async data fetching</li>
              <li>✅ Utils - Helper functions like delay</li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          💡 All components require 'use client' directive and work perfectly in Next.js client components!
        </p>
      </div>
    </div>
  );
}