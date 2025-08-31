import type { Preview } from '@storybook/react-vite';

// Set test environment for Storybook
if (typeof window !== 'undefined') {
    // @ts-ignore - Set environment variables for testing
    window.__STORYBOOK_ENV__ = 'test';
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;