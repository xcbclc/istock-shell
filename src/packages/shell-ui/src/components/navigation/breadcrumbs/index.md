---
title: Breadcrumbs 面包屑导航组件 | IStock Shell UI
description: Breadcrumbs面包屑导航组件提供清晰的页面层次结构展示，支持2种尺寸规格、4种最大宽度配置、自定义分隔符、点击导航等特性，适用于网站导航、应用路径指示、层级结构展示等场景。
keywords:
  [
    Breadcrumbs面包屑导航,
    导航组件,
    Svelte导航,
    路径导航,
    层次结构,
    页面导航,
    UI组件库,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    响应式导航,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Breadcrumbs 面包屑导航组件

面包屑导航是一种重要的辅助导航模式，用于显示用户在网站或应用程序中的当前位置和路径层次。IStock Shell UI 的 Breadcrumbs 组件提供了清晰的视觉指引和便捷的导航功能，帮助用户理解页面结构并快速返回上级页面。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShBreadcrumbs, ShBreadcrumbItem } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的面包屑导航用法，适用于大多数场景：

```svelte
<script>
  import { ShBreadcrumbs } from '@istock-shell/ui';

  // 基本面包屑项数据
  const basicItems = [
    { text: 'Home', href: '#/' },
    { text: 'Documents', href: '#/documents' },
    { text: 'Add Document' },
  ];
</script>

<ShBreadcrumbs items={basicItems} />
```

## 组件特性

- 🧭 **清晰导航**：提供直观的页面层次结构展示和快速导航功能
- 📏 **多种尺寸**：5种尺寸规格（xs、sm、md、lg、xl）适应不同界面需求
- 📐 **宽度控制**：12种最大宽度配置（xs、sm、md、lg、xl、2xl、3xl、4xl、5xl、6xl、7xl、full）支持响应式布局
- 🔗 **灵活链接**：支持链接和非链接项混合使用
- ♿ **无障碍友好**：符合 WCAG 标准，支持键盘导航和屏幕阅读器
- 📱 **响应式设计**：自适应不同屏幕尺寸，移动端友好

## 使用场景

| 场景     | 推荐配置                   | 说明                           |
| -------- | -------------------------- | ------------------------------ |
| 网站导航 | 默认配置                   | 多层级网站的页面路径导航       |
| 电商分类 | `maxWidth="lg"` + 链接导航 | 商品分类浏览路径展示           |
| 文档系统 | `size="sm"` + 紧凑布局     | 文档目录结构导航               |
| 管理后台 | `maxWidth="xl"` + 功能导航 | 后台管理系统的功能模块导航     |
| 移动应用 | `size="sm"` + 响应式配置   | 移动端应用的页面层级导航       |
| 搜索结果 | 分类路径 + 筛选条件展示    | 搜索结果页面的分类路径指引     |
| 表单向导 | 步骤导航 + 进度指示        | 多步骤表单的当前位置和进度展示 |

## 示例演示

<IStockShellUiExample src="./example/BreadcrumbsDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/BreadcrumbsIcon.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/BreadcrumbsSizes.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/BreadcrumbsMaxWidth.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/BreadcrumbsEvent.svelte"></IStockShellUiExample>

## API 参考

### Breadcrumbs API

#### Breadcrumbs 属性

| 属性名        | 类型                                                 | 默认值 | 说明                           |
| ------------- | ---------------------------------------------------- | ------ | ------------------------------ |
| `items`       | [`BreadcrumbItemProps[]`](#breadcrumbitem-属性)      | `[]`   | 面包屑项列表，用于数据驱动渲染 |
| `size`        | [`BreadcrumbsSize`](#breadcrumbssize)                | `'md'` | 面包屑的尺寸大小               |
| `maxWidth`    | [`BreadcrumbsMaxWidth`](#breadcrumbsmaxwidth)        | -      | 面包屑容器的最大宽度限制       |
| `onItemClick` | `(item: BreadcrumbItemProps, index: number) => void` | -      | 面包屑项点击回调函数           |
| `class`       | `string`                                             | `''`   | 自定义CSS类名，用于扩展样式    |

#### Breadcrumbs 代码片段插入位置

- `children`：

```svelte
<div>
  <ul>
    <!-- ...code -->
    {@render children()}
    <!-- ...code -->
  </ul>
</div>
```

#### Breadcrumbs 事件

`Breadcrumbs`继承所有原生 HTML div 元素事件，如：

- `click` - 点击事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `keydown` - 键盘按下事件
- `keyup` - 键盘释放事件

### BreadcrumbItem API

#### BreadcrumbItem 属性

| 属性名        | 类型                                  | 默认值  | 说明                                     |
| ------------- | ------------------------------------- | ------- | ---------------------------------------- |
| `text`        | `string`                              | -       | 面包屑项显示文本内容                     |
| `href`        | `string`                              | -       | 链接地址，设置后该项将渲染为可点击的链接 |
| `current`     | `boolean`                             | `false` | 是否为当前页面，当前页面项会有特殊样式   |
| `disabled`    | `boolean`                             | `false` | 是否禁用该项，禁用后无法点击             |
| `size`        | [`BreadcrumbsSize`](#breadcrumbssize) | `'md'`  | 面包屑项尺寸规格                         |
| `linkAttr`    | `HTMLAnchorAttributes`                | -       | 内部链接元素的HTML属性配置               |
| `iconName`    | `string`                              | -       | 图标名称，使用ShIcon组件渲染             |
| `onItemClick` | `(item: BreadcrumbItemProps) => void` | -       | 点击事件回调函数                         |
| `iconRender`  | `() => ReturnType<Snippet<[]>>`       | -       | 自定义图标渲染函数                       |
| `class`       | `string`                              | `''`    | 自定义CSS类名                            |

#### BreadcrumbItem 代码片段插入位置

- `children`：

```svelte
<li>
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</li>
```

- `iconRender`：

```svelte
<li>
  {#if hasLink}
    <a>
      {@render iconRender()}
      <!-- ...code -->
    </a>
  {:else if iconRender || iconName}
    <span>
      {@render iconRender()}
      <!-- ...code -->
    </span>
  {:else}
    {@render iconRender()}
    <!-- ...code -->
  {/if}
</li>
```

#### BreadcrumbItem 事件

`BreadcrumbItem`继承所有原生 HTML li 元素事件，如：

- `click` - 点击事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `mouseenter` - 鼠标进入事件
- `mouseleave` - 鼠标离开事件

### 类型定义

#### BreadcrumbsSize

```typescript
// 面包屑导航尺寸类型
type BreadcrumbsSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

#### BreadcrumbsMaxWidth

```typescript
// 面包屑导航最大宽度类型
type BreadcrumbsMaxWidth =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'full';
```

## 设计指南

### 视觉设计

- **尺寸规格**：支持 xs、sm、md、lg、xl 五种尺寸，根据界面层级选择合适大小
- **宽度控制**：使用 `maxWidth` 属性（xs~7xl、full）防止内容溢出
- **状态样式**：链接状态使用主题色，当前页面 70% 透明度，禁用状态 50% 透明度
- **图标集成**：支持 `iconName` 和 `iconRender` 自定义图标，建议 16-20px 尺寸

### 交互设计

- **导航行为**：`href` 属性支持页面跳转，`onItemClick` 提供自定义逻辑
- **状态管理**：`current` 标识当前页面（不可点击），`disabled` 禁用交互
- **键盘支持**：Tab 键切换焦点，回车键激活，提供清晰的焦点指示
- **响应式**：小屏幕使用较小尺寸，空间不足时智能省略中间层级

### 可访问性

- **语义结构**：使用正确的 `<ul>`、`<li>` 元素和 ARIA 标签
- **屏幕阅读器**：支持逐项朗读，分隔符不被朗读，清晰传达状态信息
- **当前页面标识**：使用 `aria-current="page"` 标识当前位置

### 内容规范

- **文本长度**：单项文本建议不超过 20 个字符，保持简洁描述性
- **层级深度**：建议不超过 7 级，过深时采用省略策略（首页...当前页面）
- **动态更新**：根据用户导航实时更新面包屑内容

## 最佳实践

### 基本原则

- **层级控制**：建议不超过 7 级，过长路径采用省略策略
- **文本规范**：单项文本不超过 20 个字符，标签简洁明了
- **状态管理**：使用 `current` 标识当前页面，`disabled` 禁用无效项
- **响应式**：小屏幕使用较小尺寸，必要时隐藏中间层级

### 交互体验

- **导航逻辑**：`href` 支持页面跳转，`onItemClick` 处理自定义逻辑
- **视觉反馈**：提供清晰的悬停、焦点和加载状态
- **键盘支持**：Tab 键切换，回车键激活，支持无障碍访问
- **错误处理**：优雅处理无效链接和权限问题

### 性能优化

- **动态更新**：根据路由变化实时更新面包屑内容
- **渲染优化**：避免不必要的重新渲染，合理使用缓存
- **内存管理**：及时清理事件监听器和无用引用

## 常见问题

### Q: 如何自定义面包屑图标？

A: 可以通过多种方式添加自定义图标：

```svelte
<script lang="ts">
  import { ShBreadcrumbs, ShBreadcrumbItem } from '@istock-shell/ui';
</script>

<ShBreadcrumbs>
  <ShBreadcrumbItem>
    <a href="/" class="inline-flex items-center gap-2">
      {@render homeIcon()}
      首页
    </a>
  </ShBreadcrumbItem>
  <ShBreadcrumbItem>
    <a href="/products" class="inline-flex items-center gap-2">
      {@render productIcon()}
      产品
    </a>
  </ShBreadcrumbItem>
  <ShBreadcrumbItem current>
    <span class="inline-flex items-center gap-2">
      {@render detailIcon()}
      详情
    </span>
  </ShBreadcrumbItem>
</ShBreadcrumbs>

{#snippet homeIcon()}
  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
    />
  </svg>
{/snippet}

{#snippet productIcon()}
  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
    />
  </svg>
{/snippet}

{#snippet detailIcon()}
  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fill-rule="evenodd"
      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
      clip-rule="evenodd"
    />
  </svg>
{/snippet}
```

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
