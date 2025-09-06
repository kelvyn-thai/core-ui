import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { resolveConfig, cssConfig, dtsConfig, libConfig, rollupConfig, buildConfig } from './vite.shared';


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
        ],
      }),
      tailwindcss(),
    ],

    resolve: resolveConfig,

    css: cssConfig,

    build: {
      ...buildConfig,
      cssCodeSplit: true,
      emptyOutDir: false,
      lib: {
        ...libConfig,
        entry: {
          '@button': path.resolve(__dirname, 'src/@button/index.ts'),
          '@combobox': path.resolve(__dirname, 'src/@combobox/index.ts'),
          '@input': path.resolve(__dirname, 'src/@input/index.ts'),
          '@label': path.resolve(__dirname, 'src/@label/index.ts'),
          '@icons': path.resolve(__dirname, 'src/@icons/index.ts'),
        },
        fileName: (format, entryName) => {
          return format === 'es' ? `${entryName}/index.js` : `${entryName}/index.${format}.js`;
        },
      },
      rollupOptions: {
        ...rollupConfig,
        output: {
          ...rollupConfig.output,
          assetFileNames: (assetInfo) => {
            const fileName = assetInfo.names?.[0] || assetInfo.name || '';
            const ext = fileName.split('.').pop() || '';
            
            if (ext === 'css') {
              const nameWithoutExt = fileName.replace(`.${ext}`, '');
              return `${nameWithoutExt}/index.css`;
            }
            
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
  };
});
