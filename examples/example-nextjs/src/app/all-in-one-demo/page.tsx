'use client';

import { Layout } from "@/components";
import { useState, useEffect, ReactNode } from 'react';

// All-in-one: Import everything from main index
import { 
  Button, 
  Input, 
  Label, 
  Combobox, 
  ComboboxItem,
  Icon, 
  SearchIcon, 
  TrashIcon, 
  MapPinIcon,
  useClickOutside,
  delay,
  createStore,
  createQueryStore,
  useShallow,
} from '@core-ui';

// All-in-one: Import single main CSS file
import '@core-ui/core-ui.css';

// Zustand Store Setup
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const [useCounterStore] = createStore<CounterState>(
  (set) => ({
    count: 0,
    increment: () => set((state: CounterState) => ({ count: state.count + 1 })),
    decrement: () => set((state: CounterState) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
  }),
  {
    devtoolsOptions: {
      enabled: true,
      name: 'CounterStore',
    },
  }
);

// Query Store Setup
interface ApiData {
  id: string;
  message: string;
  timestamp: number;
}

const useApiQuery = createQueryStore<ApiData>();

export default function AllInOneDemo() {
  // Local component state
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState<ComboboxItem | null>(null);
  const [keySearch, setKeySearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Zustand store state
  const [count, increment, decrement, reset] = useCounterStore(
    useShallow((s: CounterState) => [s.count, s.increment, s.decrement, s.reset])
  );

  // Query store state
  const { isPending, error, data, executeQueryFn, setData } = useApiQuery(
    useShallow((s: any) => s)
  );

  // useClickOutside hook
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsDropdownOpen(false);
  }, isDropdownOpen);

  // Sample data
  const technologies = [
    { text: 'React', value: 'react', metadata: { type: 'library' } },
    { text: 'Next.js', value: 'nextjs', metadata: { type: 'framework' } },
    { text: 'TypeScript', value: 'typescript', metadata: { type: 'language' } },
    { text: 'Tailwind CSS', value: 'tailwind', metadata: { type: 'styling' } },
    { text: 'Zustand', value: 'zustand', metadata: { type: 'state' } },
    { text: 'Storybook', value: 'storybook', metadata: { type: 'tool' } },
  ];

  const filteredTechnologies = technologies.filter(item =>
    item.text.toLowerCase().includes(keySearch.toLowerCase())
  );

  // Simulate API call
  const handleApiCall = () => {
    executeQueryFn({
      queryFn: async () => {
        setData(null as unknown as ApiData);
        await delay(1500);
        
        if (Math.random() > 0.8) {
          throw new Error('Random API failure - try again!');
        }
        
        return {
          id: `api-${Date.now()}`,
          message: 'All-in-one import working perfectly!',
          timestamp: Date.now(),
        };
      },
        queryFnSuccess: (response: ApiData) => {
          console.log('API Success:', response);
        },
        queryFnFail: (error: Error) => {
          console.error('API Error:', error);
        },
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            📦 All-in-One Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            This page demonstrates importing everything from the main core-ui bundle. 
            Perfect for rapid development when you need most components and don't mind a larger bundle.
          </p>
        </div>

        {/* Import Information */}
        <div className="bg-purple-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-purple-900 mb-4">📦 What's Imported</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-purple-800 mb-2">Single Import:</h3>
              <div className="bg-purple-100 rounded p-3">
                <code className="text-sm text-purple-900">
                  import &#123; Button, Input, Label, ... &#125; from 'core-ui';
                </code>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-purple-800 mb-2">Single CSS:</h3>
              <div className="bg-purple-100 rounded p-3">
                <code className="text-sm text-purple-900">
                  import 'core-ui/style.css';
                </code>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-purple-100 rounded">
            <p className="text-sm text-purple-800">
              ⚡ <strong>Quick setup:</strong> Everything included in one import!
            </p>
          </div>
        </div>

        {/* Button Components */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Button Components</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="small" onClick={increment}>
                Primary ({count})
              </Button>
              <Button variant="secondary" size="medium" onClick={decrement}>
                Secondary
              </Button>
              <Button variant="destructive" size="large" onClick={reset}>
                Reset Counter
              </Button>
              <Button variant="outline" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                Toggle Dropdown
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Counter: {count} (powered by Zustand store)
            </p>
          </div>
        </div>

        {/* Input & Label Components */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Input & Label Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="main-input" content="Controlled Input" size="medium" />
              <Input
                id="main-input"
                type="text"
                placeholder="Type something..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                inputSize="medium"
              />
              <p className="text-sm text-gray-500 mt-1">
                Value: {inputValue || 'empty'}
              </p>
            </div>
            <div>
              <Label htmlFor="large-input" content="Large Input" size="large" />
              <Input
                id="large-input"
                type="email"
                placeholder="Enter email"
                inputSize="large"
              />
            </div>
          </div>
        </div>

        {/* Combobox Component */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Combobox</h2>
          <div className="max-w-md">
            <Combobox
              label="Select Technology"
              placeholder="Search technologies..."
              items={filteredTechnologies}
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
                <p className="text-blue-700">{selectedItem.text}</p>
                <p className="text-xs text-blue-600">
                  Type: {String(selectedItem.metadata?.type)}
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Custom Hooks</h2>
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {isDropdownOpen ? 'Close Dropdown' : 'Open Dropdown (useClickOutside)'}
            </Button>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute top-full mt-2 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 min-w-64 z-10"
              >
                <p className="text-sm text-gray-700 mb-2">
                  Click outside to close automatically!
                </p>
                <p className="text-xs text-gray-500">
                  Powered by useClickOutside hook
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Query Store Demo */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Async Query Store</h2>
          <div className="space-y-4">
            <div className="min-h-[100px] flex items-center">
              {isPending && (
                <div className="text-blue-600 flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  Loading API data...
                </div>
              )}
              {error && (
                <div className="text-red-600 bg-red-50 p-4 rounded-lg">
                  ❌ Error: {error}
                </div>
              )}
              {data && (
                <div className="text-green-600 bg-green-50 p-4 rounded-lg w-full">
                  <div className="text-sm">
                    <strong>✅ Success:</strong>
                    <br />
                    <strong>ID:</strong> {data.id}
                    <br />
                    <strong>Message:</strong> {data.message}
                    <br />
                    <strong>Timestamp:</strong> {new Date(data.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              )}
              {!isPending && !error && !data && (
                <div className="text-gray-500">
                  Click the button to simulate an API call
                </div>
              )}
            </div>
            <Button
              variant="primary"
              onClick={handleApiCall}
              disabled={isPending}
            >
              {isPending ? 'Fetching...' : 'Simulate API Call (with delay)'}
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-purple-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-purple-900 mb-4">⚡ All-in-One Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-purple-800 mb-2">Development Speed:</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Single import statement</li>
                <li>• No need to find individual components</li>
                <li>• Quick prototyping</li>
                <li>• Consistent styling out of the box</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-purple-800 mb-2">Full Feature Set:</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• All components available</li>
                <li>• All utilities and hooks</li>
                <li>• Complete state management</li>
                <li>• Unified design system</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">📝 Implementation Code</h2>
          <pre className="text-sm text-gray-300 overflow-x-auto">
{`// All-in-one imports
import { 
  Button, Input, Label, Combobox, Icon,
  useClickOutside, delay, createStore,
  // ... all components and utilities
} from 'core-ui';

// Single CSS import
import 'core-ui/style.css';

// Ready to use!
<Button variant="primary" onClick={handleClick}>
  Click me!
</Button>`}
          </pre>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-center">
          <a 
            href="/tree-shaking-demo" 
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium"
          >
            View Tree-Shaking Demo →
          </a>
          <a 
            href="/" 
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-medium"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </Layout>
  );
}
