import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import StylelintPlugin from 'vite-plugin-stylelint';

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(__dirname, 'config/env');
  loadEnv(mode, envDir);

  return {
    plugins: [
      react(),
      svgr(),
      tsconfigPaths(),
      StylelintPlugin({
        fix: true,
        cache: false,
      }),
    ].filter(Boolean),

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@styles': path.resolve(__dirname, 'src/shared/styles'),
      },
    },

    css: {
      modules: {
        generateScopedName: '[name]-[local]__[hash:8]',
      },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "@styles/abstracts/variables" as *;`,
        },
      },
    },

    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },

    envDir,
  };
});
