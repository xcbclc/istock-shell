import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import tailwindcss from '@tailwindcss/vite';
import { createSvelteTypesPlugin } from './build-plugin/svelte-types-plugin';

// 专门用于构建common文件的配置
export default defineConfig({
  plugins: [
    tailwindcss(),
    svelte({
      compilerOptions: {
        dev: false,
      },
      emitCss: true,
    }),
    dts({
      include: ['src/**/*'],
      exclude: ['src/**/*.md', 'docs/**/*'],
      tsconfigPath: './tsconfig.json',
      compilerOptions: {
        declaration: true,
        declarationMap: true,
        outDir: './dist',
      },
      entryRoot: 'src',
    }),
    createSvelteTypesPlugin(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'IStockShellUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `shell-ui.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['@antv/g2', 'highlight.js', 'marked', 'marked-highlight'],
      output: {
        // 不进行任何代码分割，将所有代码打包到一个文件中
        manualChunks: undefined,
        inlineDynamicImports: true,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'shell-ui.css';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    cssCodeSplit: false, // 禁用CSS代码分割
    emptyOutDir: false, // 打包前不删除清空dist目录文件
    sourcemap: true,
    minify: 'terser', // 使用terser进行代码压缩
    terserOptions: {
      compress: {
        drop_console: true, // 移除console语句
        drop_debugger: true, // 移除debugger语句
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // 移除指定的纯函数调用
        passes: 2, // 压缩遍数，提高压缩率
      },
      mangle: {
        toplevel: true, // 混淆顶级作用域的变量名
        safari10: true, // 兼容Safari 10
      },
      format: {
        comments: false, // 移除注释
      },
    },
    target: 'es2020',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
