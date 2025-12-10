---
title: 开发指南 | IStock Shell UI
description: IStock Shell UI 开发指南，包括开发环境搭建、代码规范、组件开发流程、测试指南、贡献指南和发布流程等完整的开发文档。
keywords: [IStock Shell UI开发, 组件开发, 代码规范, 贡献指南, 开发环境, 测试指南]
---

# 开发指南

欢迎参与 IStock Shell UI 的开发！本指南将帮助你了解项目结构、开发流程和贡献方式。

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0 (推荐)
- **Git**: 最新版本

### 克隆项目

```bash
# 克隆仓库
git clone https://github.com/your-org/istock-shell.git
cd istock-shell

# 安装依赖
pnpm install

# 进入 UI 组件库目录
cd src/packages/shell-ui
```

### 开发环境搭建

```bash
# 安装项目依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建组件库
pnpm build

# 运行测试
pnpm test

# 代码格式化
pnpm format

# 代码检查
pnpm lint
```

## 📁 项目结构

```
src/packages/shell-ui/
├── src/                          # 源代码目录
│   ├── components/               # 组件目录
│   │   ├── action/              # 动作组件
│   │   │   ├── button/          # 按钮组件
│   │   │   │   ├── Button.svelte
│   │   │   │   ├── index.ts
│   │   │   │   ├── index.md
│   │   │   │   └── example/     # 示例文件
│   │   │   ├── dropdown/        # 下拉菜单
│   │   │   └── modal/           # 模态框
│   │   ├── data-input/          # 数据录入组件
│   │   ├── data-view/           # 数据展示组件
│   │   ├── feedback/            # 反馈组件
│   │   ├── navigation/          # 导航组件
│   │   ├── extend/              # 扩展组件
│   │   └── index.ts             # 组件导出
│   ├── theme/                   # 主题配置
│   │   ├── config.ts            # 主题配置
│   │   └── styles.css           # 样式文件
│   ├── utils/                   # 工具函数
│   └── index.ts                 # 主入口文件
├── docs/                        # 文档目录
│   ├── index.md                 # 入门文档
│   ├── installation.md          # 安装指南
│   ├── getting-started.md       # 快速上手
│   ├── components.md            # 组件指南
│   ├── theming.md              # 主题定制
│   └── development.md          # 开发指南
├── tests/                       # 测试文件
├── package.json                 # 包配置
├── vite.config.js              # Vite 配置
├── tailwind.config.js          # Tailwind 配置
├── tsconfig.json               # TypeScript 配置
└── README.md                   # 项目说明
```

## 🧩 组件开发

### 创建新组件

1. **确定组件分类**
   - `action`: 动作组件（按钮、下拉菜单等）
   - `data-input`: 数据录入组件（输入框、选择器等）
   - `data-view`: 数据展示组件（表格、列表等）
   - `feedback`: 反馈组件（提示、加载等）
   - `navigation`: 导航组件（菜单、面包屑等）
   - `extend`: 扩展组件（图表、编辑器等）

2. **创建组件目录结构**

```bash
# 以创建 Badge 组件为例
mkdir -p src/components/data-view/badge/example
cd src/components/data-view/badge
```

3. **创建组件文件**

```svelte
<!-- Badge.svelte -->
<script lang="ts">
  import type { BadgeColor, BadgeSize, BadgeVariant } from './types';

  export let color: BadgeColor = 'primary';
  export let size: BadgeSize = 'md';
  export let variant: BadgeVariant = 'solid';
  export let outline: boolean = false;
  export let dot: boolean = false;

  // 样式计算
  $: badgeClasses = [
    'badge',
    `badge-${color}`,
    `badge-${size}`,
    variant !== 'solid' && `badge-${variant}`,
    outline && 'badge-outline',
    dot && 'badge-dot',
  ]
    .filter(Boolean)
    .join(' ');
</script>

<span class={badgeClasses} {...$$restProps}>
  {#if dot}
    <span class="badge-dot-indicator"></span>
  {/if}
  <slot />
</span>

<style>
  .badge {
    @apply inline-flex items-center justify-center;
    @apply px-2 py-1 text-xs font-medium;
    @apply rounded-full border;
    @apply transition-colors duration-200;
  }

  /* 尺寸样式 */
  .badge-xs {
    @apply px-1.5 py-0.5 text-xs;
  }
  .badge-sm {
    @apply px-2 py-1 text-xs;
  }
  .badge-md {
    @apply px-2.5 py-1 text-sm;
  }
  .badge-lg {
    @apply px-3 py-1.5 text-sm;
  }
  .badge-xl {
    @apply px-4 py-2 text-base;
  }

  /* 颜色样式 */
  .badge-primary {
    @apply bg-primary text-primary-content border-primary;
  }

  .badge-secondary {
    @apply bg-secondary text-secondary-content border-secondary;
  }

  /* 变体样式 */
  .badge-outline {
    @apply bg-transparent;
  }

  .badge-soft {
    @apply bg-opacity-10 border-opacity-20;
  }

  /* 点状徽章 */
  .badge-dot {
    @apply relative pl-4;
  }

  .badge-dot-indicator {
    @apply absolute left-1 top-1/2 transform -translate-y-1/2;
    @apply w-2 h-2 rounded-full bg-current;
  }
</style>
```

4. **创建类型定义**

```typescript
// types.ts
export type BadgeColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type BadgeVariant = 'solid' | 'outline' | 'soft';

export interface BadgeProps {
  color?: BadgeColor;
  size?: BadgeSize;
  variant?: BadgeVariant;
  outline?: boolean;
  dot?: boolean;
  class?: string;
}
```

5. **创建导出文件**

```typescript
// index.ts
export { default as ShBadge } from './Badge.svelte';
export type * from './types';
```

6. **创建文档**

````markdown
<!-- index.md -->

# Badge 徽章

用于显示状态、标签或计数的小型标识组件。

## 特性

- 🎨 **多种颜色**: 支持8种语义化颜色
- 📏 **灵活尺寸**: 提供5种尺寸规格
- 🎭 **样式变体**: 实心、轮廓、柔和等样式
- 🔴 **点状徽章**: 支持点状指示器
- ♿ **无障碍**: 完整的无障碍支持

## 安装

```bash
pnpm add @istock-shell/ui
```
````

## 基础用法

```svelte
<script>
  import { ShBadge } from '@istock-shell/ui';
</script>

<ShBadge>默认徽章</ShBadge>
<ShBadge color="success">成功</ShBadge>
<ShBadge color="warning">警告</ShBadge>
<ShBadge color="error">错误</ShBadge>
```

## API

### Props

| 属性      | 类型           | 默认值      | 描述     |
| --------- | -------------- | ----------- | -------- |
| `color`   | `BadgeColor`   | `'primary'` | 徽章颜色 |
| `size`    | `BadgeSize`    | `'md'`      | 徽章尺寸 |
| `variant` | `BadgeVariant` | `'solid'`   | 样式变体 |
| `outline` | `boolean`      | `false`     | 轮廓样式 |
| `dot`     | `boolean`      | `false`     | 点状徽章 |

### Slots

| 名称      | 描述     |
| --------- | -------- |
| `default` | 徽章内容 |

````

7. **创建示例文件**

```svelte
<!-- example/BadgeDefault.svelte -->
<script>
  import { ShBadge } from '../index.js';
</script>

<div class="flex flex-wrap gap-2">
  <ShBadge>默认</ShBadge>
  <ShBadge color="primary">主要</ShBadge>
  <ShBadge color="secondary">次要</ShBadge>
  <ShBadge color="success">成功</ShBadge>
  <ShBadge color="warning">警告</ShBadge>
  <ShBadge color="error">错误</ShBadge>
</div>
````

8. **更新导出文件**

```typescript
// src/components/data-view/index.ts
export * from './badge';
export * from './kbd';
export * from './list';
export * from './stat';
export * from './table';
```

### 组件开发规范

#### 1. 命名规范

- **组件名**: 使用 PascalCase，如 `Button.svelte`
- **文件名**: 组件文件使用 PascalCase，其他文件使用 kebab-case
- **导出名**: 统一使用 `Sh` 前缀，如 `ShButton`
- **CSS 类名**: 使用 kebab-case，如 `btn-primary`

#### 2. Props 设计

```typescript
// 好的做法
export let color: 'primary' | 'secondary' = 'primary';
export let size: 'sm' | 'md' | 'lg' = 'md';
export let disabled: boolean = false;

// 避免的做法
export let style: string; // 过于宽泛
export let config: any; // 类型不明确
```

#### 3. 样式规范

```svelte
<style>
  /* 使用 Tailwind CSS 类 */
  .component {
    @apply flex items-center justify-center;
    @apply px-4 py-2 rounded-md;
    @apply transition-colors duration-200;
  }

  /* 组件特定样式 */
  .component-primary {
    @apply bg-primary text-primary-content;
  }

  /* 响应式样式 */
  @media (min-width: 768px) {
    .component {
      @apply px-6 py-3;
    }
  }
</style>
```

#### 4. 无障碍支持

```svelte
<script>
  export let ariaLabel: string | undefined = undefined;
  export let ariaDescribedBy: string | undefined = undefined;
</script>

<button aria-label={ariaLabel} aria-describedby={ariaDescribedBy} role="button" tabindex="0" {...$$restProps}>
  <slot />
</button>
```

## 🧪 测试指南

### 测试结构

```
tests/
├── unit/                    # 单元测试
│   ├── components/         # 组件测试
│   └── utils/              # 工具函数测试
├── integration/            # 集成测试
├── e2e/                    # 端到端测试
└── setup.ts               # 测试配置
```

### 组件测试示例

```typescript
// tests/unit/components/Button.test.ts
import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Button from '../../../src/components/action/button/Button.svelte';

describe('Button Component', () => {
  it('renders with default props', () => {
    const { getByRole } = render(Button, {
      props: { children: 'Click me' },
    });

    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('applies correct color class', () => {
    const { getByRole } = render(Button, {
      props: { color: 'primary', children: 'Primary Button' },
    });

    const button = getByRole('button');
    expect(button).toHaveClass('btn-primary');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const { getByRole } = render(Button, {
      props: { onclick: handleClick, children: 'Click me' },
    });

    const button = getByRole('button');
    await fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const { getByRole } = render(Button, {
      props: { disabled: true, children: 'Disabled Button' },
    });

    const button = getByRole('button');
    expect(button).toBeDisabled();
  });
});
```

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行特定测试文件
pnpm test Button.test.ts

# 运行测试并生成覆盖率报告
pnpm test:coverage

# 监听模式运行测试
pnpm test:watch
```

## 📝 代码规范

### ESLint 配置

```javascript
// .eslintrc.js
module.exports = {
  extends: ['@antfu', 'plugin:svelte/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    extraFileExtensions: ['.svelte'],
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
  rules: {
    // 自定义规则
    'svelte/no-unused-svelte-ignore': 'error',
    'svelte/no-useless-mustaches': 'error',
    'svelte/prefer-class-directive': 'error',
  },
};
```

### Prettier 配置

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-svelte"],
  "overrides": [
    {
      "files": "*.svelte",
      "options": {
        "parser": "svelte"
      }
    }
  ]
}
```

### 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
# 功能开发
git commit -m "feat(button): add loading state support"

# 问题修复
git commit -m "fix(input): resolve focus state issue"

# 文档更新
git commit -m "docs(readme): update installation guide"

# 样式调整
git commit -m "style(button): improve hover animation"

# 重构代码
git commit -m "refactor(theme): simplify color system"

# 性能优化
git commit -m "perf(table): optimize virtual scrolling"

# 测试相关
git commit -m "test(button): add unit tests for variants"
```

## 🔄 开发流程

### 1. 功能开发流程

```bash
# 1. 创建功能分支
git checkout -b feat/new-component

# 2. 开发组件
# - 创建组件文件
# - 编写测试
# - 更新文档

# 3. 运行测试和检查
pnpm test
pnpm lint
pnpm type-check

# 4. 提交代码
git add .
git commit -m "feat(component): add new component"

# 5. 推送分支
git push origin feat/new-component

# 6. 创建 Pull Request
```

### 2. 问题修复流程

```bash
# 1. 创建修复分支
git checkout -b fix/issue-description

# 2. 修复问题
# - 定位问题
# - 编写测试用例
# - 修复代码
# - 验证修复

# 3. 提交修复
git commit -m "fix(component): resolve specific issue"

# 4. 推送并创建 PR
git push origin fix/issue-description
```

### 3. 发布流程

```bash
# 1. 更新版本号
pnpm version patch  # 补丁版本
pnpm version minor  # 次要版本
pnpm version major  # 主要版本

# 2. 生成变更日志
pnpm changelog

# 3. 构建项目
pnpm build

# 4. 运行完整测试
pnpm test:all

# 5. 发布到 npm
pnpm publish

# 6. 推送标签
git push --tags
```

## 🤝 贡献指南

### 贡献类型

- 🐛 **Bug 修复**: 修复现有功能的问题
- ✨ **新功能**: 添加新的组件或功能
- 📚 **文档**: 改进文档和示例
- 🎨 **样式**: 改进 UI 和样式
- ♻️ **重构**: 代码重构和优化
- ⚡ **性能**: 性能优化
- 🧪 **测试**: 添加或改进测试

### 贡献步骤

1. **Fork 项目**

   ```bash
   # 在 GitHub 上 fork 项目
   git clone https://github.com/your-username/istock-shell.git
   ```

2. **创建分支**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **开发和测试**

   ```bash
   # 安装依赖
   pnpm install

   # 开发
   pnpm dev

   # 测试
   pnpm test
   ```

4. **提交代码**

   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

5. **推送分支**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **创建 Pull Request**
   - 在 GitHub 上创建 PR
   - 填写 PR 模板
   - 等待代码审查

### Pull Request 模板

```markdown
## 变更类型

- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 样式改进
- [ ] 重构
- [ ] 性能优化
- [ ] 测试

## 变更描述

简要描述你的变更内容...

## 测试

- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 手动测试通过

## 截图

如果有 UI 变更，请提供截图...

## 检查清单

- [ ] 代码遵循项目规范
- [ ] 添加了必要的测试
- [ ] 更新了相关文档
- [ ] 变更日志已更新
```

### 代码审查标准

1. **功能性**: 代码是否正确实现了预期功能
2. **可读性**: 代码是否清晰易懂
3. **性能**: 是否有性能问题
4. **安全性**: 是否存在安全隐患
5. **测试**: 是否有足够的测试覆盖
6. **文档**: 是否更新了相关文档

## 🔧 工具配置

### VS Code 配置

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "svelte.enable-ts-plugin": true,
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "files.associations": {
    "*.svelte": "svelte"
  }
}
```

### 推荐扩展

```json
// .vscode/extensions.json
{
  "recommendations": [
    "svelte.svelte-vscode",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

## 📊 性能优化

### 组件性能

```svelte
<script>
  import { createEventDispatcher, onMount } from 'svelte';

  // 使用 createEventDispatcher 而不是回调 props
  const dispatch = createEventDispatcher();

  // 避免在模板中使用复杂计算
  $: computedValue = expensiveComputation(data);

  // 使用 onMount 进行初始化
  onMount(() => {
    // 初始化逻辑
  });
</script>

<!-- 使用 key 优化列表渲染 -->
{#each items as item (item.id)}
  <div>{item.name}</div>
{/each}
```

### 构建优化

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'IStockShellUI',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['svelte'],
      output: {
        globals: {
          svelte: 'Svelte',
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
```

## 🐛 调试技巧

### 组件调试

```svelte
<script>
  import { dev } from '$app/environment';

  // 开发环境调试
  $: if (dev) {
    console.log('Component props:', { color, size, variant });
  }

  // 使用 Svelte 开发工具
  $: {
    if (typeof window !== 'undefined' && window.__SVELTE_DEVTOOLS_GLOBAL_HOOK__) {
      window.__SVELTE_DEVTOOLS_GLOBAL_HOOK__.onComponentUpdate({
        component: 'Button',
        props: { color, size, variant },
      });
    }
  }
</script>
```

### 样式调试

```css
/* 调试边框 */
.debug * {
  outline: 1px solid red;
}

/* 调试网格 */
.debug-grid {
  background-image:
    linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

## 📚 学习资源

### 官方文档

- [Svelte 官方文档](https://svelte.dev/docs)
- [SvelteKit 文档](https://kit.svelte.dev/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [DaisyUI 文档](https://daisyui.com/)

### 推荐阅读

- [Svelte 最佳实践](https://svelte.dev/docs/best-practices)
- [组件设计原则](https://component.gallery/)
- [无障碍设计指南](https://www.w3.org/WAI/WCAG21/quickref/)

---

<p class="text-center text-gray-500 mt-8">
  🚀 感谢你对 IStock Shell UI 的贡献！让我们一起构建更好的组件库。
</p>
