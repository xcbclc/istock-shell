import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import tailwindcss from '@tailwindcss/vite';
import { createSvelteTypesPlugin } from './build-plugin/svelte-types-plugin';

// 获取所有组件的入口点
const getComponentEntries = () => {
  const entries: Record<string, string> = {};
  const componentsDir = resolve(__dirname, 'src/components');

  // 递归扫描组件目录，为每个具体组件生成独立入口
  const scanDirectory = (dir: string, categoryPrefix = '') => {
    const items = readdirSync(dir);

    items.forEach((item) => {
      const itemPath = join(dir, item);
      const stat = statSync(itemPath);

      if (
        stat.isDirectory() &&
        item !== 'example' &&
        item !== 'test' &&
        item !== 'svg' &&
        item !== 'core'
      ) {
        const indexPath = join(itemPath, 'index.ts');
        try {
          statSync(indexPath);
          // 检查是否是组件分类目录（action、data-input等）
          const isCategory = [
            'action',
            'data-input',
            'data-view',
            'feedback',
            'navigation',
            'extend',
          ].includes(item);

          if (isCategory) {
            // 如果是分类目录，继续扫描子目录
            scanDirectory(itemPath, item);
          } else {
            // 如果是具体组件目录，生成入口
            const entryName = categoryPrefix ? `${categoryPrefix}-${item}` : item;
            entries[entryName] = indexPath;
          }
        } catch {
          // 如果没有index.ts，继续扫描子目录
          scanDirectory(itemPath, categoryPrefix ? `${categoryPrefix}-${item}` : item);
        }
      }
    });
  };

  scanDirectory(componentsDir);

  // 添加主入口
  entries['index'] = resolve(__dirname, 'src/index.ts');

  // 添加示例组件工具的单独入口
  // entries['example'] = resolve(__dirname, 'src/example.ts');

  return entries;
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    svelte({
      compilerOptions: {
        dev: false,
      },
      emitCss: false, // 禁用CSS发射，让CSS内联到JS中
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
      entry: getComponentEntries(),
      name: 'IStockShellUI',
      formats: ['es'],
      fileName: (format, entryName) => {
        // 每个组件打包成独立的js文件
        return `${entryName}.js`;
      },
    },
    rollupOptions: {
      external: ['@antv/g2', 'highlight.js', 'marked', 'marked-highlight'],
      output: {
        // 抽取公共依赖为独立文件
        manualChunks: (id) => {
          // 抽取 svelte 相关依赖为公共chunk
          if (id.includes('node_modules/svelte')) {
            return 'vendor-svelte';
          }

          // 抽取图表库为公共chunk
          if (id.includes('@antv/g2')) {
            return 'vendor-chart';
          }

          // 抽取代码高亮库为公共chunk
          if (id.includes('highlight.js') || id.includes('marked')) {
            return 'vendor-highlight';
          }

          // 抽取其他第三方依赖为公共chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }

          // 抽取主题配置为公共chunk
          if (id.includes('theme/config')) {
            return 'shared-theme';
          }

          // 抽取工具函数为公共chunk
          if (id.includes('@istock-shell/util')) {
            return 'shared-utils';
          }
        },
        // 文件命名策略
        chunkFileNames: (chunkInfo) => {
          // SVG相关文件命名
          if (
            chunkInfo.facadeModuleId &&
            chunkInfo.facadeModuleId.includes('/svg/') &&
            chunkInfo.facadeModuleId.endsWith('.svg?raw')
          ) {
            const svgFileName =
              chunkInfo.facadeModuleId.split('/').pop()?.replace('.svg?raw', '') || 'unknown';
            return `assets/svg/${svgFileName}.js`;
          }

          // 公共依赖文件命名
          if (chunkInfo.name?.startsWith('vendor')) {
            return `shared/${chunkInfo.name}.js`;
          }

          if (chunkInfo.name?.startsWith('shared')) {
            return `shared/${chunkInfo.name}.js`;
          }

          return `chunks/[name].js`;
        },
        // 资源文件命名
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'index.css';
          }
          return 'assets/[name]-[hash][extname]';
        },
        // 每个组件独立打包，不使用动态导入内联
        inlineDynamicImports: false,
      },
    },
    // 禁用CSS代码分割，确保CSS内联到组件JS中
    cssCodeSplit: false,
    sourcemap: true,
    minify: true,
    // 优化构建性能
    target: 'es2020',
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
