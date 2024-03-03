import { resolve } from 'path';
import { defineConfig, loadEnv, type PluginOption } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import typescript from '@rollup/plugin-typescript';
import eslint from 'vite-plugin-eslint';

const tsPlugin: PluginOption = typescript({
  include: ['src/worker/domains/**/*'],
}) as any;

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    base: './',
    plugins: [svelte(), tsPlugin, eslint()],
    worker: {
      plugins: () => [tsPlugin],
    },
    resolve: {
      alias: {
        '@root': __dirname,
        '@': resolve(__dirname, 'src'),
        '@domains': resolve(__dirname, 'src/worker/domains'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_PROXY ?? 'https://istock.red',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path,
        },
      },
    },
    build: {
      // minify: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('/node_modules/@antv/')) {
              return 'antv';
            }
            if (id.includes('/node_modules/')) {
              return 'lib';
            }
          },
        },
      },
    },
  });
};
