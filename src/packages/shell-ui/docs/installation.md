---
title: 安装指南 | IStock Shell UI
description: IStock Shell UI组件库的详细安装指南，包括环境要求、安装步骤、依赖配置、样式引入等完整说明，帮助开发者快速集成到项目中。
keywords: [IStock Shell UI安装, Svelte组件库安装, npm安装, pnpm安装, 环境配置, 依赖管理]
---

# 安装指南

本指南将帮助你在项目中正确安装和配置 IStock Shell UI 组件库。

## 📋 环境要求

在开始安装之前，请确保你的开发环境满足以下要求：

### Node.js 版本
- **Node.js**: >= 16.0.0
- **npm**: >= 7.0.0
- **pnpm**: >= 7.0.0 (推荐)
- **yarn**: >= 1.22.0

### 框架支持
- **Svelte**: >= 5.0.0
- **SvelteKit**: >= 2.0.0
- **Vite**: >= 4.0.0

### TypeScript (可选)
- **TypeScript**: >= 4.9.0

## 📦 安装方式

### 使用 pnpm (推荐)

```bash
pnpm add @istock-shell/ui
```

### 使用 npm

```bash
npm install @istock-shell/ui
```

### 使用 yarn

```bash
yarn add @istock-shell/ui
```

## 🔧 依赖说明

### 核心依赖
IStock Shell UI 依赖以下核心包：

```json
{
  "dependencies": {
    "svelte": "^5.32.1",
    "@antv/g2": "^5.3.3",
    "highlight.js": "^11.11.1",
    "marked": "^15.0.12",
    "marked-highlight": "^2.2.1"
  }
}
```

### 样式依赖
组件库使用 Tailwind CSS 和 DaisyUI 作为样式基础：

```json
{
  "devDependencies": {
    "@tailwindcss/vite": "4.1.7",
    "daisyui": "5.0.35",
    "tailwindcss": "4.1.7"
  }
}
```

## 🎨 样式配置

### 1. 引入组件样式

在你的主CSS文件中引入组件样式：

```css
/* src/app.css 或 src/main.css */
@import '@istock-shell/ui/src/index.css';
```

### 2. 配置 Tailwind CSS

如果你的项目还没有配置 Tailwind CSS，请按以下步骤配置：

#### 安装 Tailwind CSS

```bash
pnpm add -D tailwindcss @tailwindcss/vite daisyui
```

#### 创建 Tailwind 配置文件

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@istock-shell/ui/src/**/*.{js,svelte,ts}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter'
    ]
  }
};
```

#### 配置 Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    svelte(),
    tailwindcss()
  ]
});
```

### 3. 引入基础样式

在你的主CSS文件中添加 Tailwind 指令：

```css
/* src/app.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 引入 IStock Shell UI 样式 */
@import '@istock-shell/ui/src/index.css';
```

## 🚀 基础使用

### 1. 导入组件

```svelte
<script>
  // 按需导入组件
  import { ShButton, ShInput, ShAlert } from '@istock-shell/ui';
  
  // 或者导入特定组件
  import ShButton from '@istock-shell/ui/src/components/action/button/Button.svelte';
</script>
```

### 2. 使用组件

```svelte
<script>
  import { ShButton, ShInput } from '@istock-shell/ui';
  
  let inputValue = '';
  
  function handleClick() {
    console.log('按钮被点击了！');
  }
</script>

<!-- 输入框 -->
<ShInput 
  bind:value={inputValue}
  placeholder="请输入内容"
  color="primary"
/>

<!-- 按钮 -->
<ShButton 
  color="primary"
  size="lg"
  onclick={handleClick}
>
  提交
</ShButton>
```

## 🔧 TypeScript 配置

### 1. 类型定义

IStock Shell UI 提供完整的 TypeScript 类型定义，无需额外配置即可获得类型支持。

### 2. 组件类型导入

```typescript
// 导入组件类型
import type { ButtonProps, InputProps } from '@istock-shell/ui';

// 使用组件类型
interface MyComponentProps {
  buttonProps: ButtonProps<'button'>;
  inputProps: InputProps;
}
```

### 3. 事件类型

```typescript
import type { ComponentEvents } from 'svelte';
import type { ShButton } from '@istock-shell/ui';

// 获取组件事件类型
type ButtonEvents = ComponentEvents<ShButton>;
```

## 🎯 SvelteKit 集成

### 1. 安装和配置

在 SvelteKit 项目中使用 IStock Shell UI：

```bash
# 创建 SvelteKit 项目
npm create svelte@latest my-app
cd my-app
npm install

# 安装 IStock Shell UI
pnpm add @istock-shell/ui
```

### 2. 配置样式

在 `src/app.html` 中确保正确的样式加载顺序：

```html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

### 3. 全局样式配置

在 `src/app.css` 中配置全局样式：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import '@istock-shell/ui/src/index.css';

/* 自定义样式 */
body {
  font-family: 'Inter', sans-serif;
}
```

## 🔍 常见问题

### Q: 样式没有正确加载？

**A**: 请确保：
1. 正确引入了 `@istock-shell/ui/src/index.css`
2. Tailwind CSS 配置中包含了组件库的路径
3. 样式引入顺序正确（Tailwind 基础样式 → 组件样式）

### Q: TypeScript 类型错误？

**A**: 请确保：
1. TypeScript 版本 >= 4.9.0
2. Svelte 版本 >= 5.0.0
3. 正确导入组件类型

### Q: 组件无法正常显示？

**A**: 请检查：
1. 组件导入路径是否正确
2. 是否正确配置了 Tailwind CSS
3. 浏览器控制台是否有错误信息

### Q: 如何自定义主题？

**A**: 可以通过以下方式自定义主题：
1. 修改 DaisyUI 主题配置
2. 使用 CSS 变量覆盖默认样式
3. 参考 [主题定制指南](./theming.md)

## 📚 下一步

安装完成后，你可以：

- 查看 [快速上手指南](./getting-started.md) 学习基础用法
- 浏览 [组件文档](./components/) 了解所有可用组件
- 参考 [主题定制](./theming.md) 自定义样式
- 阅读 [最佳实践](./best-practices.md) 获取使用建议

## 🆘 获取帮助

如果在安装过程中遇到问题，可以：

- 查看 [GitHub Issues](https://github.com/istock-shell/ui/issues)
- 在 [GitHub Discussions](https://github.com/istock-shell/ui/discussions) 提问
- 查看 [故障排除指南](./troubleshooting.md)

---

<p class="text-center text-gray-500 mt-8">
  安装遇到问题？欢迎在 GitHub 上提交 Issue 或参与讨论！
</p>