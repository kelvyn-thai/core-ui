import path from 'path';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import type { LibraryFormats } from 'vite';

export const resolveConfig = {
  alias: {
    '@button': path.resolve(__dirname, './src/@button'),
    '@combobox': path.resolve(__dirname, './src/@combobox'),
    '@input': path.resolve(__dirname, './src/@input'),
    '@label': path.resolve(__dirname, './src/@label'),
    '@icons': path.resolve(__dirname, './src/@icons'),
    '@hook': path.resolve(__dirname, './src/@hook'),
    '@zustand': path.resolve(__dirname, './src/@zustand'),
    '@utils': path.resolve(__dirname, './src/@utils'),
    src: path.resolve(__dirname, './src'),
  },
  dedupe: [],
};

export const cssConfig = {
  transformer: 'lightningcss' as const,
  lightningcss: {
    targets: browserslistToTargets(browserslist()),
  },
};

export const dtsConfig = {
  exclude: ['**/*.stories.*', '**/*.spec.*', '**/*.test.*'],
  outDir: 'lib',
};

export const libConfig = {
  name: 'CoreUI',
  formats: ['es', 'cjs'] as LibraryFormats[],
};

export const rollupConfig = {
  external: ["react", "react-dom", "react/jsx-runtime", "clsx"],
  output: {
    globals: {
      react: "React",
      "react-dom": "ReactDOM",
      "react/jsx-runtime": "jsxRuntime",
      clsx: "clsx",
    },
    manualChunks: undefined,
  },
  treeshake: {
    moduleSideEffects: false,
  },
};

export const buildConfig = {
  cssMinify: 'lightningcss' as const,
  outDir: 'lib',
  copyPublicDir: false,
};
