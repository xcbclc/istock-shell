---
title: Menu 菜单组件 | IStock Shell UI
description: Menu菜单组件提供强大的导航功能，支持多级嵌套、垂直/水平布局、5种尺寸规格、图标展示、工具提示、激活状态管理、两种切换模式等特性，适用于网站导航、侧边栏菜单、管理后台功能菜单等各种导航场景。
keywords:
  [
    Menu菜单组件,
    Svelte菜单,
    导航菜单,
    多级菜单,
    侧边栏菜单,
    响应式菜单,
    UI组件库,
    导航组件,
    Web组件,
    用户界面,
    UX设计,
    交互组件,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Menu 菜单组件

菜单是用户界面中最重要的导航组件，用于组织和展示应用程序的功能结构。IStock Shell UI 的 Menu 组件采用数据驱动设计，提供了灵活的配置系统和丰富的交互特性，满足各种复杂的导航需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShMenu, ShMenuItem } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的菜单用法，通过数据驱动渲染：

```svelte
<script>
  import { ShMenu } from '@istock-shell/ui';

  const menuItems = [
    { key: 'home', text: '首页', iconName: 'home' },
    { key: 'about', text: '关于', iconName: 'info' },
    { key: 'contact', text: '联系我们', iconName: 'phone' },
  ];

  function handleMenuClick(item) {
    console.log('点击菜单项:', item);
  }
</script>

<ShMenu items={menuItems} onMenuItemClick={handleMenuClick} />
```

## 组件特性

- 🎯 **数据驱动**：基于配置对象驱动，支持动态菜单结构和无限层级嵌套
- 🎨 **丰富展示**：支持图标、文本、工具提示等多种视觉元素组合
- 📐 **灵活布局**：支持垂直和水平两种布局方向，适应不同设计需求
- 📏 **多种尺寸**：5种尺寸规格（xs、sm、md、lg、xl）支持响应式适配
- 🔧 **交互模式**：两种子菜单展开模式（下拉菜单/详情展开）
- 🎭 **状态管理**：内置激活状态管理、折叠展开、禁用状态等完整功能
- ♿ **无障碍支持**：遵循 WCAG 2.0 标准，支持键盘导航和屏幕阅读器

## 使用场景

| 场景         | 推荐配置                         | 说明                             |
| ------------ | -------------------------------- | -------------------------------- |
| 网站主导航   | `layout="horizontal"` + 图标配置 | 网站顶部的主要导航菜单           |
| 侧边栏导航   | `layout="vertical"` + 多级嵌套   | 管理后台、应用程序的侧边栏导航   |
| 移动端菜单   | `size="lg"` + 触摸友好配置       | 移动设备的抽屉式菜单或底部导航   |
| 功能分组菜单 | 使用 `isTitle` 分组 + 子菜单     | 复杂应用的功能模块分组展示       |
| 工具栏菜单   | `size="sm"` + 图标优先           | 编辑器、设计工具的操作菜单       |
| 多级分类导航 | 深层嵌套 + `toggleType` 配置     | 电商分类、文档目录、文件系统导航 |
| 上下文菜单   | `tooltip` + 快捷操作             | 右键菜单、悬浮操作菜单           |
| 设置面板菜单 | 分组标题 + 状态展示              | 系统设置、用户偏好配置的导航界面 |

## 示例演示

<IStockShellUiExample src="./example/MenuDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/MenuResponsive.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/MenuIcon.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/MenuSizes.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/MenuStates.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/MenuCustom.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/MenuWithTitle.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/Submenu.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/MenuEvent.svelte"></IStockShellUiExample>

## API 参考

### Menu API

#### Menu 属性

| 属性名            | 类型                                | 默认值       | 说明                                             |
| ----------------- | ----------------------------------- | ------------ | ------------------------------------------------ |
| `isRoot`          | `boolean`                           | `true`       | 是否为根菜单，用于初始化上下文数据和激活状态管理 |
| `collapsed`       | `boolean`                           | `false`      | 菜单是否处于折叠状态，影响子菜单的显示           |
| `canToggle`       | `boolean`                           | `true`       | 是否允许切换折叠状态，控制菜单项的交互行为       |
| `items`           | [`MenuItemProps[]`](#menuitem-属性) | `[]`         | 菜单项数据列表，用于数据驱动渲染菜单结构         |
| `layout`          | [`MenuLayout`](#menulayout)         | `'vertical'` | 菜单布局方向，支持垂直和水平两种模式             |
| `size`            | [`MenuSize`](#menusize)             | `'md'`       | 菜单尺寸规格，影响菜单项的大小和间距             |
| `toggleType`      | `1 \| 2`                            | `1`          | 切换类型：1-下拉菜单模式，2-详情展开模式         |
| `onMenuItemClick` | `(item: MenuItemProps) => void`     | -            | 菜单项点击事件回调函数，传递被点击的菜单项数据   |
| `class`           | `string`                            | `''`         | 自定义CSS类名                                    |

#### Menu 代码片段插入位置

- `children`：

```svelte
<ul class="menu">
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</ul>
```

#### Menu 事件

`Menu`继承所有原生HTML元素事件，主要包括：

- `click` - 菜单项点击事件
- `keydown` - 键盘按下事件
- `keyup` - 键盘释放事件

### MenuItem API

#### MenuItem 属性

| 属性名            | 类型                                                               | 默认值  | 说明                                                       |
| ----------------- | ------------------------------------------------------------------ | ------- | ---------------------------------------------------------- |
| `key`             | `string`                                                           | -       | 菜单项唯一标识符，用于激活状态管理和路由导航               |
| `text`            | `string`                                                           | -       | 菜单项显示文本内容，支持纯文本显示                         |
| `isTitle`         | `boolean`                                                          | `false` | 是否为标题项，用于菜单分组和视觉分隔                       |
| `active`          | `boolean`                                                          | `false` | 是否处于激活状态，影响视觉样式和用户体验                   |
| `disabled`        | `boolean`                                                          | `false` | 是否禁用状态，禁用时不响应用户交互                         |
| `focus`           | `boolean`                                                          | `false` | 是否处于聚焦状态，影响键盘导航和样式                       |
| `collapsed`       | `boolean`                                                          | `false` | 子菜单是否折叠，控制子菜单的显示状态                       |
| `canToggle`       | `boolean`                                                          | `true`  | 是否允许切换折叠状态，控制子菜单的交互行为                 |
| `itemAttr`        | `HTMLAnchorAttributes`                                             | -       | 内部链接元素的HTML属性配置，支持href、target等链接属性     |
| `tooltip`         | `string \| TooltipProps`                                           | -       | 工具提示配置，支持字符串快捷配置或完整的TooltipProps对象   |
| `toggleType`      | `1 \| 2`                                                           | `1`     | 切换模式类型：1-下拉菜单模式，2-详情展开模式               |
| `subItem`         | [`MenuProps`](#menu-属性)                                          | -       | 子菜单配置对象，包含子菜单的完整属性和菜单项列表           |
| `iconName`        | `string`                                                           | -       | 图标名称，使用ShIcon组件渲染预定义图标                     |
| `onMenuItemClick` | `(item: MenuItemProps, key?: string, collapsed?: boolean) => void` | -       | 菜单项点击事件回调函数，传递菜单项数据、唯一标识和折叠状态 |
| `iconRender`      | `() => ReturnType<Snippet<[]>>`                                    | -       | 自定义图标渲染函数，用于渲染复杂或自定义的图标内容         |
| `class`           | `string`                                                           | `''`    | 自定义CSS类名                                              |

#### MenuItem 代码片段插入位置

- `children`：

```svelte
<li class="menu-item">
  {@render children()}
</li>
```

- `iconRender`：

```svelte
<li class="menu-item">
  <a class="menu-item-link">
    {@render iconRender?.()}
    <!-- ...其他内容 -->
  </a>
</li>
```

#### MenuItem 事件

`MenuItem`继承所有原生HTML元素事件，主要包括：

- `click` - 菜单项点击事件
- `keydown` - 键盘按下事件
- `keyup` - 键盘释放事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件

### 类型定义

#### MenuSize

```typescript
// 菜单尺寸类型
type MenuSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

#### MenuLayout

```typescript
// 菜单布局类型
type MenuLayout = 'vertical' | 'horizontal';
```

#### 切换模式说明

- **toggleType = 1**：下拉菜单模式，子菜单以下拉形式展示，适用于水平导航和紧凑布局
- **toggleType = 2**：详情展开模式，使用HTML details元素实现折叠展开，提供原生的无障碍支持

## 设计指南

### 布局原则

- **层次结构**：通过缩进、颜色、字体大小建立清晰的菜单层次
- **一致性**：保持菜单项的高度、间距和对齐方式一致
- **可扫描性**：使用适当的间距和分组，提高菜单的可读性
- **响应式设计**：在不同设备上提供合适的尺寸和交互方式

### 尺寸选择建议

- **xs**：紧凑型界面、嵌入式菜单
- **sm**：移动端菜单、工具栏菜单
- **md**：默认尺寸，适用于大多数桌面应用
- **lg**：触摸友好界面、大屏幕显示
- **xl**：演示模式、大型显示设备

### 交互设计

- **悬停效果**：鼠标悬停时显示背景色变化和工具提示
- **激活状态**：清晰标识当前激活的菜单项
- **展开动画**：子菜单展开时提供平滑的过渡动画
- **键盘导航**：支持Tab、方向键、Enter、Space等键盘操作

### 无障碍支持

- 所有菜单项都支持键盘导航（Tab、Enter、Space、方向键）
- 提供适当的 `aria-label` 和 `role` 属性
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 使用语义化的 HTML 结构（`<ul>`、`<li>`、`<a>`）
- 为子菜单提供 `aria-expanded` 状态信息
- 支持屏幕阅读器和辅助技术

### 最佳实践

1. **菜单结构**：保持菜单层级不超过3层，避免过深的嵌套
2. **标签设计**：使用简洁明了的菜单标签，避免过长的文本
3. **图标使用**：为重要菜单项添加图标，提高识别度
4. **状态管理**：合理管理菜单的激活、展开、禁用等状态
5. **性能优化**：大型菜单使用虚拟滚动或懒加载策略
6. **国际化**：考虑多语言环境下的文本长度和排版

## 常见问题

### Q: 如何实现菜单项的路由跳转？

A: 可以通过 `itemAttr` 属性配置链接属性，或在 `onMenuItemClick` 回调中处理路由逻辑：

```svelte
<script>
  const menuItems = [
    {
      key: 'home',
      text: '首页',
      itemAttr: { href: '/home' },
    },
  ];

  function handleMenuClick(item) {
    // 使用路由库进行导航
    router.push(item.key);
  }
</script>
```

### Q: 如何自定义菜单项样式？

A: 可以通过 `class` 属性添加自定义CSS类，或者使用CSS变量覆盖默认样式。

### Q: 如何实现菜单的权限控制？

A: 可以在数据层面过滤菜单项，或使用 `disabled` 属性禁用无权限的菜单项：

```svelte
<script>
  const menuItems = items.filter((item) => hasPermission(item.key));
</script>
```

### Q: 如何优化大型菜单的性能？

A: 建议使用虚拟滚动、懒加载、菜单项缓存等策略优化性能。

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
