---
title: 常见问题 | IStock Shell UI
description: IStock Shell UI 常见问题解答，包括安装问题、使用问题、样式问题、性能问题、兼容性问题等的解决方案和最佳实践。
keywords: [IStock Shell UI FAQ, 常见问题, 问题解决, 故障排除, 使用指南, 最佳实践]
---

# 常见问题

本页面收集了 IStock Shell UI 使用过程中的常见问题和解决方案。如果你遇到的问题不在此列表中，请在 [GitHub Issues](https://github.com/your-org/istock-shell/issues) 中提交问题。

## 📦 安装相关

### Q: 安装时出现依赖冲突怎么办？

**A:** 这通常是由于 Node.js 版本或包管理器版本不兼容导致的。

```bash
# 1. 检查 Node.js 版本（需要 >= 18.0.0）
node --version

# 2. 清理缓存
pnpm store prune
# 或者
npm cache clean --force

# 3. 删除 node_modules 和 lock 文件
rm -rf node_modules
rm pnpm-lock.yaml  # 或 package-lock.json

# 4. 重新安装
pnpm install
```

### Q: 为什么推荐使用 pnpm？

**A:** pnpm 具有以下优势：

- **节省磁盘空间**: 使用硬链接避免重复安装
- **安装速度快**: 并行安装和缓存机制
- **严格依赖**: 避免幽灵依赖问题
- **Monorepo 支持**: 更好的工作空间支持

```bash
# 安装 pnpm
npm install -g pnpm

# 或使用 Corepack（Node.js 16.13+）
corepack enable
corepack prepare pnpm@latest --activate
```

### Q: 在 Yarn 或 npm 环境下如何使用？

**A:** 虽然推荐 pnpm，但也支持其他包管理器：

```bash
# 使用 npm
npm install @istock-shell/ui

# 使用 Yarn
yarn add @istock-shell/ui

# 注意：可能需要手动安装 peer dependencies
npm install svelte @istock-shell/util
```

## 🎨 样式相关

### Q: 组件样式没有生效怎么办？

**A:** 请检查以下几个方面：

1. **确保导入了样式文件**：

```javascript
// 在你的主入口文件中
import '@istock-shell/ui/dist/style.css';
```

2. **检查 Tailwind CSS 配置**：

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@istock-shell/ui/**/*.{js,svelte,ts}',
  ],
  // ...
};
```

3. **确保 DaisyUI 配置正确**：

```javascript
// tailwind.config.js
module.exports = {
  // ...
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'], // 或你需要的主题
  },
};
```

### Q: 如何自定义组件样式？

**A:** 有多种方式自定义样式：

1. **使用 CSS 变量**：

```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
}
```

2. **使用 Tailwind 类**：

```svelte
<ShButton class="bg-blue-500 hover:bg-blue-600">自定义按钮</ShButton>
```

3. **全局样式覆盖**：

```css
/* 在你的全局样式文件中 */
.btn-custom {
  @apply bg-gradient-to-r from-purple-500 to-pink-500;
  @apply text-white font-bold;
}
```

### Q: 深色模式不工作怎么办？

**A:** 检查主题配置：

```javascript
// 1. 确保 HTML 有正确的 data-theme 属性
document.documentElement.setAttribute('data-theme', 'dark');

// 2. 或者使用 DaisyUI 的主题切换
const themes = ['light', 'dark'];
let currentTheme = 0;

function toggleTheme() {
  currentTheme = (currentTheme + 1) % themes.length;
  document.documentElement.setAttribute('data-theme', themes[currentTheme]);
}
```

## 🔧 使用相关

### Q: 组件的 TypeScript 类型提示不工作？

**A:** 确保 TypeScript 配置正确：

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*", "node_modules/@istock-shell/ui/**/*"]
}
```

### Q: 如何在 SvelteKit 中使用？

**A:** SvelteKit 集成步骤：

1. **安装依赖**：

```bash
pnpm add @istock-shell/ui
pnpm add -D @tailwindcss/vite daisyui tailwindcss
```

2. **配置 Vite**：

```javascript
// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default {
  plugins: [sveltekit(), tailwindcss()],
};
```

3. **配置样式**：

```css
/* src/app.css */
@import '@istock-shell/ui/dist/style.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. **在布局中导入**：

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import '../app.css';
</script>

<main>
  <slot />
</main>
```

### Q: 如何处理服务端渲染 (SSR)？

**A:** IStock Shell UI 支持 SSR，但需要注意：

1. **避免浏览器特定的 API**：

```svelte
<script>
  import { browser } from '$app/environment';

  let theme = 'light';

  // 只在浏览器环境中执行
  if (browser) {
    theme = localStorage.getItem('theme') || 'light';
  }
</script>
```

2. **使用 onMount 进行客户端初始化**：

```svelte
<script>
  import { onMount } from 'svelte';

  onMount(() => {
    // 客户端初始化逻辑
    initializeTheme();
  });
</script>
```

### Q: 组件事件处理不工作？

**A:** 检查事件绑定方式：

```svelte
<script>
  function handleClick(event) {
    console.log('按钮被点击', event);
  }
</script>

<!-- 正确的事件绑定 -->
<ShButton onclick={handleClick}>点击我</ShButton>

<!-- 或使用 on:click -->
<ShButton on:click={handleClick}>点击我</ShButton>
```

## ⚡ 性能相关

### Q: 组件库体积太大怎么办？

**A:** 使用按需导入减少打包体积：

```javascript
// 推荐：按需导入
import { ShButton, ShInput } from '@istock-shell/ui';

// 避免：全量导入
import * as UI from '@istock-shell/ui';
```

配置打包工具进行 Tree Shaking：

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      external: ['svelte'],
      output: {
        manualChunks: {
          'ui-core': ['@istock-shell/ui'],
        },
      },
    },
  },
};
```

### Q: 大数据量表格性能问题？

**A:** 使用虚拟化表格组件：

```svelte
<script>
  import { ShVirtualTable } from '@istock-shell/ui';

  // 大数据量使用虚拟表格
  const largeData = Array.from({ length: 100000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    value: Math.random(),
  }));
</script>

<ShVirtualTable data={largeData} {columns} height={400} itemHeight={40} />
```

### Q: 组件渲染性能优化？

**A:** 使用以下优化技巧：

```svelte
<script>
  // 1. 使用 key 优化列表渲染
  export let items = [];

  // 2. 避免在模板中进行复杂计算
  $: processedItems = items.map(processItem);

  // 3. 使用 createEventDispatcher
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<!-- 使用 key 优化 -->
{#each processedItems as item (item.id)}
  <div>{item.name}</div>
{/each}
```

## 🌐 兼容性相关

### Q: 支持哪些浏览器版本？

**A:** IStock Shell UI 支持以下浏览器：

- **Chrome**: >= 90
- **Firefox**: >= 88
- **Safari**: >= 14
- **Edge**: >= 90

对于旧版浏览器，可能需要额外的 polyfill：

```javascript
// 添加必要的 polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

### Q: 在 React 项目中可以使用吗？

**A:** IStock Shell UI 是基于 Svelte 的，不能直接在 React 中使用。但可以考虑：

1. **使用 Web Components 包装**
2. **参考设计系统创建 React 版本**
3. **使用类似的 React 组件库**

### Q: 移动端适配问题？

**A:** 组件库已经考虑了移动端适配：

```css
/* 响应式设计已内置 */
.btn {
  @apply px-4 py-2;
}

@media (max-width: 768px) {
  .btn {
    @apply px-3 py-1.5 text-sm;
  }
}
```

如需额外的移动端优化：

```svelte
<script>
  import { onMount } from 'svelte';

  let isMobile = false;

  onMount(() => {
    isMobile = window.innerWidth < 768;

    const handleResize = () => {
      isMobile = window.innerWidth < 768;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
</script>

<ShButton size={isMobile ? 'sm' : 'md'}>响应式按钮</ShButton>
```

## 🔍 调试相关

### Q: 如何调试组件问题？

**A:** 使用以下调试方法：

1. **开启 Svelte 开发工具**：

```javascript
// 在开发环境中
if (process.env.NODE_ENV === 'development') {
  console.log('组件 props:', $$props);
}
```

2. **使用浏览器开发者工具**：

- 检查元素的 CSS 类
- 查看计算后的样式
- 检查 JavaScript 控制台错误

3. **添加调试样式**：

```css
/* 临时调试样式 */
.debug * {
  outline: 1px solid red !important;
}
```

### Q: 样式冲突如何解决？

**A:** 解决样式冲突的方法：

1. **检查 CSS 优先级**：

```css
/* 使用更具体的选择器 */
.my-app .btn-primary {
  background-color: #custom-color !important;
}
```

2. **使用 CSS Modules 或 scoped 样式**：

```svelte
<style>
  /* 组件级样式，自动作用域隔离 */
  .button {
    background: blue;
  }
</style>
```

3. **重置或规范化 CSS**：

```css
/* 在组件库样式之前导入 */
@import 'normalize.css';
@import '@istock-shell/ui/dist/style.css';
```

## 📱 集成相关

### Q: 如何与状态管理库集成？

**A:** 与常见状态管理库的集成：

**Svelte Stores**：

```javascript
// stores.js
import { writable } from 'svelte/store';

export const theme = writable('light');
export const user = writable(null);
```

```svelte
<script>
  import { theme } from './stores.js';
  import { ShButton } from '@istock-shell/ui';

  function toggleTheme() {
    theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }
</script>

<ShButton onclick={toggleTheme}>
  当前主题: {$theme}
</ShButton>
```

**Pinia (Vue)**：

```javascript
// 如果在 Vue 项目中使用 Web Components
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({ theme: 'light' }),
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
    },
  },
});
```

### Q: 如何与表单验证库集成？

**A:** 与验证库的集成示例：

```svelte
<script>
  import { ShInput, ShButton, ShAlert } from '@istock-shell/ui';
  import * as yup from 'yup';

  const schema = yup.object({
    email: yup.string().email('邮箱格式不正确').required('邮箱必填'),
    password: yup.string().min(6, '密码至少6位').required('密码必填'),
  });

  let formData = { email: '', password: '' };
  let errors = {};

  async function validateField(field, value) {
    try {
      await schema.validateAt(field, { [field]: value });
      errors[field] = '';
    } catch (error) {
      errors[field] = error.message;
    }
    errors = { ...errors };
  }

  async function handleSubmit() {
    try {
      await schema.validate(formData, { abortEarly: false });
      // 提交表单
    } catch (error) {
      // 处理验证错误
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <ShInput
    bind:value={formData.email}
    label="邮箱"
    type="email"
    error={!!errors.email}
    on:blur={() => validateField('email', formData.email)}
  />
  {#if errors.email}
    <ShAlert color="error" size="sm">{errors.email}</ShAlert>
  {/if}

  <ShButton type="submit">提交</ShButton>
</form>
```

## 🚀 部署相关

### Q: 生产环境构建问题？

**A:** 生产环境构建优化：

```javascript
// vite.config.js
export default {
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['svelte'],
          ui: ['@istock-shell/ui'],
        },
      },
    },
  },
};
```

### Q: CDN 部署问题？

**A:** 使用 CDN 的注意事项：

```html
<!-- 确保正确的资源路径 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@istock-shell/ui@latest/dist/style.css" />
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@istock-shell/ui@latest/dist/index.js"
></script>
```

## 🆘 获取帮助

### 问题反馈渠道

1. **GitHub Issues**: [提交 Bug 或功能请求](https://github.com/your-org/istock-shell/issues)
2. **讨论区**: [GitHub Discussions](https://github.com/your-org/istock-shell/discussions)
3. **文档**: [查看完整文档](https://istock-shell-ui.dev)

### 提交问题的最佳实践

1. **搜索已有问题**: 避免重复提交
2. **提供复现步骤**: 详细的复现步骤
3. **环境信息**: Node.js、浏览器、操作系统版本
4. **代码示例**: 最小化的复现代码
5. **错误信息**: 完整的错误堆栈

### 问题模板

````markdown
## 问题描述

简要描述遇到的问题...

## 复现步骤

1. 执行 xxx
2. 点击 xxx
3. 看到错误 xxx

## 期望行为

描述期望的正确行为...

## 实际行为

描述实际发生的行为...

## 环境信息

- OS: [e.g. macOS 12.0]
- Browser: [e.g. Chrome 95.0]
- Node.js: [e.g. 18.0.0]
- @istock-shell/ui: [e.g. 0.1.4]

## 代码示例

```svelte
// 最小化的复现代码
```
````

## 错误信息

```
// 完整的错误堆栈
```

```

---

<p class="text-center text-gray-500 mt-8">
  💡 没有找到你的问题？欢迎在 <a href="https://github.com/your-org/istock-shell/issues" class="text-primary hover:underline">GitHub Issues</a> 中提交新问题。
</p>
```
