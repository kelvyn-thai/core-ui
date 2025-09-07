import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  staticDirs: ["../public"],
  env: (config) => ({
    ...config,
    NODE_ENV: 'test',
    MODE: 'test'
  }),
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@button': new URL('../src/@button', import.meta.url).pathname,
          '@combobox': new URL('../src/@combobox', import.meta.url).pathname,
          '@input': new URL('../src/@input', import.meta.url).pathname,
          '@label': new URL('../src/@label', import.meta.url).pathname,
          '@icons': new URL('../src/@icons', import.meta.url).pathname,
          '@hook': new URL('../src/@hook', import.meta.url).pathname,
          '@zustand': new URL('../src/@zustand', import.meta.url).pathname,
          '@utils': new URL('../src/@utils', import.meta.url).pathname,
          'src': new URL('../src', import.meta.url).pathname,
        }
      }
    });
  }
};
export default config;