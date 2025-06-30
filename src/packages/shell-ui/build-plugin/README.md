# Build Tools

这个目录包含用于构建过程的工具和插件。

## svelte-types-plugin.ts

这是一个自定义的 Vite 插件，用于从 Svelte 组件中提取 TypeScript 类型定义并生成 `.d.ts` 文件。

### 功能特性

- 自动扫描 `src/components` 目录下的所有 `.svelte` 文件
- 提取 `<script lang="ts" module>` 块中的 `export type` 和 `export interface` 定义
- 生成格式化的 `.d.ts` 文件，确保正确的缩进
- 自动添加必要的 import 语句（如 `SvelteHTMLElements`、`HTMLAttributes` 等）
- 支持嵌套目录结构

### 使用方法

在 `vite.config.ts` 中导入并使用：

```typescript
import { createSvelteTypesPlugin } from './build/svelte-types-plugin';

export default defineConfig({
  plugins: [
    // 其他插件...
    createSvelteTypesPlugin(),
  ],
  // 其他配置...
});
```

### 输出

插件会在 `dist/src/components` 目录下生成对应的 `.svelte.d.ts` 文件，保持与源文件相同的目录结构。
