import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { resolveConfig, cssConfig, dtsConfig, libConfig, rollupConfig, buildConfig } from './vite.shared';
import { analyzer } from 'vite-bundle-analyzer'


export default defineConfig((): UserConfig => {
  return {
    plugins: [
      react(),
      dts({
        ...dtsConfig,
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
      }),
      tailwindcss(),
      process.env.VITE_BUNDLE_ANALYZER ? analyzer() : undefined,
    ],

    resolve: resolveConfig,

    css: cssConfig,

    build: {
      ...buildConfig,
      cssCodeSplit: false,
      emptyOutDir: true,
      lib: {
        ...libConfig,
        entry: {
          index: path.resolve(__dirname, 'src/index.ts'),
          '@utils': path.resolve(__dirname, 'src/@utils/index.ts'),
          '@zustand': path.resolve(__dirname, 'src/@zustand/index.ts'),
          '@hook': path.resolve(__dirname, 'src/@hook/index.ts'),
        },
        fileName: (format, entryName) => {
          return entryName === 'index' ? `index.${format}.js` : `${entryName}/index.${format}.js`;
        },
      },
      rollupOptions: {
        ...rollupConfig,
        external: [...rollupConfig.external, "zustand"],
        output: {
          ...rollupConfig.output,
          globals: {
            ...rollupConfig.output.globals,
            zustand: "zustand",
          },
        },
      },
    },
  };
});
