import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import analyzer from 'vite-bundle-analyzer';
import checker from 'vite-plugin-checker';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  const isViteBundleAnalyzer = env.VITE_BUNDLE_ANALYER === 'true';
  const isDevelopment = mode === 'development';

  console.debug({ env });

  const basePlugins = [
    react(),
    dts({
      include: [
        'src/@button/**/*',
        'src/@combobox/**/*',
        'src/@input/**/*',
        'src/@label/**/*',
        'src/@icons/**/*',
        'src/@hook/**/*',
        'src/@zustand/**/*',
        'src/@utils/**/*',
        'src/index.ts',
      ],
      exclude: ['**/*.stories.*', '**/*.spec.*', '**/*.test.*'],
      outDir: 'lib',
    }),
  ];

  if (isViteBundleAnalyzer) {
    basePlugins.push(analyzer());
  }

  if (isDevelopment) {
    basePlugins.push(
      checker({
        typescript: true,
      }),
    );
  }

  return {
    plugins: basePlugins,
    publicDir: path.resolve(__dirname, './public'),
    cacheDir: path.resolve(__dirname, './node_modules/.vite'),
    resolve: {
      // alias: {
      //   '@button': path.resolve(__dirname, './src/@button'),
      //   '@combobox': path.resolve(__dirname, './src/@combobox'),
      //   '@input': path.resolve(__dirname, './src/@input'),
      //   '@label': path.resolve(__dirname, './src/@label'),
      //   '@icons': path.resolve(__dirname, './src/@icons'),
      //   '@hook': path.resolve(__dirname, './src/@hook'),
      //   '@zustand': path.resolve(__dirname, './src/@zustand'),
      //   '@utils': path.resolve(__dirname, './src/@utils'),
      //   src: path.resolve(__dirname, './src'),
      // },
      dedupe: [],
    },
    css: {
      transformer: 'lightningcss',
      devSourcemap: isDevelopment,
      lightningcss: {
        targets: browserslistToTargets(browserslist('>= 0.25%')),
      },
    },
    build: {
      cssMinify: 'lightningcss',
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'CoreUI',
        fileName: (format, entryName) => {
          console.debug({ format, entryName });
          return `index.${format}.js`;
        },
        formats: ['es', 'cjs'],
      },
      // rollupOptions: {
      //   external: ["react", "react-dom", "zustand", "clsx", "lodash"],
      //   output: {
      //     globals: {
      //       react: "React",
      //       "react-dom": "ReactDOM",
      //       zustand: "zustand",
      //       clsx: "clsx",
      //       lodash: "lodash",
      //     },
      //   },
      // },
      outDir: 'lib',
      emptyOutDir: true,
      copyPublicDir: false,
    },
  };
});
