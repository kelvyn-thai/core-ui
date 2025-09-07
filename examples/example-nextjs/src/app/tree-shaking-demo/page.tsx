'use client';

import { Layout } from "@/components";
import { useState } from 'react';

// Tree-shaking: Import ONLY what you need from individual components
import { Button } from '@core-ui/@button';
import { Input } from '@core-ui/@input';
import { Label } from '@core-ui/@label';

// Tree-shaking: Using Tailwind classes instead of CSS imports for styling

export default function TreeShakingDemo() {
  // Component state for Button
  const [buttonClicks, setButtonClicks] = useState(0);
  const [selectedFramework, setSelectedFramework] = useState<string>('');
  
  // Component state for Input
  const [inputValue, setInputValue] = useState('');
  const [customInputValue, setCustomInputValue] = useState('');

  // Sample frameworks for selection
  const frameworks = ['React', 'Vue.js', 'Angular', 'Svelte'];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🌲 Tree-Shaking Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            This page demonstrates tree-shaking by importing only specific components and using Tailwind CSS for styling. 
            Perfect for reducing bundle size when you only need a few components.
          </p>
        </div>

        {/* Import Information */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">📦 What's Imported</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Components:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <code>@core-ui/@button</code> - Button</li>
                <li>• <code>@core-ui/@input</code> - Input</li>
                <li>• <code>@core-ui/@label</code> - Label</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Styling:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Tailwind CSS classes for styling</li>
                <li>• No CSS imports needed</li>
                <li>• Custom styling via className prop</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-100 rounded">
            <p className="text-sm text-blue-800">
              ✅ <strong>Bundle size optimized:</strong> Only imports what you actually use!
            </p>
          </div>
        </div>

        {/* Button Demo */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Button Component (Tailwind Styled)</h2>
          <div className="space-y-6">
            <div>
              <Label content="Framework Selection" />
              <div className="flex flex-wrap gap-2 mt-2">
                {frameworks.map((framework) => (
                  <Button
                    key={framework}
                    onClick={() => setSelectedFramework(framework)}
                    className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                      selectedFramework === framework
                        ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                    }`}
                  >
                    {framework}
                  </Button>
                ))}
              </div>
              {selectedFramework && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Selected Framework:</p>
                  <p className="text-blue-700 font-medium">{selectedFramework}</p>
                </div>
              )}
            </div>
            
            <div>
              <Label content="Click Counter" />
              <div className="flex items-center gap-4 mt-2">
                <Button
                  onClick={() => setButtonClicks(buttonClicks + 1)}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Click Me! ({buttonClicks})
                </Button>
                <Button
                  onClick={() => setButtonClicks(0)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Input Demo with Tailwind Styles */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Input Component (Tailwind Styled)</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="styled-input" content="Input with Tailwind Styles" />
              <div className="[&_input]:border-gray-300 [&_input]:rounded-lg [&_input]:px-4 [&_input]:py-2 [&_input]:text-gray-900 [&_input]:placeholder-gray-500
                          [&_input]:focus:border-blue-500 [&_input]:focus:ring-2 [&_input]:focus:ring-blue-200 [&_input]:transition-all [&_input]:duration-200
                          [&_input]:shadow-sm [&_input]:w-full">
                <Input
                  id="styled-input"
                  type="text"
                  placeholder="Using Tailwind CSS classes"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  inputSize="medium"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Value: {inputValue || 'empty'}
              </p>
            </div>
          </div>
        </div>

        {/* Input Demo with Custom Tailwind Styles */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Input Component (Custom Tailwind Styles)</h2>
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="custom-input"
                className="block text-sm font-medium text-purple-700 mb-2"
              >
                Custom Styled Input
              </label>
              <Input
                id="custom-input"
                type="text"
                placeholder="Custom styling example"
                value={customInputValue}
                onChange={(e) => setCustomInputValue(e.target.value)}
                className="!border-purple-300 !rounded-lg !px-4 !py-3 !text-purple-900 focus:!border-purple-500 focus:!ring-2 focus:!ring-purple-200"
              />
              <p className="text-sm text-purple-600 mt-1">
                💜 Custom purple theme applied via Tailwind className
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-green-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-green-900 mb-4">🎯 Tree-Shaking Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-green-800 mb-2">Performance:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Smaller bundle size</li>
                <li>• Faster loading times</li>
                <li>• Only load what you use</li>
                <li>• Better lighthouse scores</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-800 mb-2">Flexibility:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Override styles with Tailwind classes</li>
                <li>• Import only needed components</li>
                <li>• Better for custom design systems</li>
                <li>• No CSS file dependencies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">📝 Implementation Code</h2>
          <pre className="text-sm text-gray-300 overflow-x-auto">
{`// Tree-shaking imports
import { Button } from '@core-ui/@button';
import { Input } from '@core-ui/@input';
import { Label } from '@core-ui/@label';

// No CSS imports needed - using Tailwind classes directly
// Style components with Tailwind classes
<Button 
  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
  onClick={handleClick}
>
  Click Me
</Button>

// Or use custom Tailwind styles with !important
<Input 
  className="!border-purple-300 !rounded-lg !px-4 !py-3 !text-purple-900 focus:!border-purple-500 focus:!ring-2 focus:!ring-purple-200"
  // ... props
/>

// For advanced styling and customization examples,
// check out the Button Storybook stories:
// - Different button variants and sizes
// - Custom styling examples
// - Interactive button states`}
          </pre>
        </div>

        {/* Storybook Reference */}
        <div className="bg-indigo-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-indigo-900 mb-4">📚 Storybook Reference</h2>
          <p className="text-indigo-800 mb-4">
            For more advanced styling and customization examples, check out the Button Storybook stories:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <h3 className="font-semibold text-indigo-900 mb-2">🎨 Styling Examples</h3>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• <strong>Different Variants:</strong> Primary, secondary, outline</li>
                <li>• <strong>Size Options:</strong> Small, medium, large buttons</li>
                <li>• <strong>Color Themes:</strong> Custom color schemes</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <h3 className="font-semibold text-indigo-900 mb-2">🔧 Advanced Usage</h3>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• <strong>Interactive States:</strong> Hover, focus, disabled</li>
                <li>• <strong>Custom Styling:</strong> Tailwind class overrides</li>
                <li>• <strong>Icon Buttons:</strong> Buttons with icons</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-indigo-100 rounded">
            <p className="text-sm text-indigo-800">
              💡 <strong>Pro tip:</strong> Run <code className="bg-indigo-200 px-1 rounded">pnpm storybook</code> to explore all available examples and styling options!
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-center">
          <a 
            href="/all-in-one-demo" 
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium"
          >
            View All-in-One Demo →
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
