import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import path from 'path';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import tailwindcss from '@tailwindcss/vite';
import { resolveConfig } from './vite.shared';


export default defineConfig((): UserConfig => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      checker({
        typescript: true,
      })
    ],
    
    server: {
      port: 3000,
      open: true,
      host: '0.0.0.0' as const,
    },
    
    preview: {
      port: 3001,
      open: true,
    },
    
    resolve: resolveConfig,
    
    css: {
      transformer: 'lightningcss' as const,
      devSourcemap: true,
      lightningcss: {
        targets: browserslistToTargets(browserslist()),
      },
    },
    
    publicDir: path.resolve(__dirname, './public'),
    cacheDir: path.resolve(__dirname, './node_modules/.vite'),
  };
});
