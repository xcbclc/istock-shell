---
title: Dropdown 下拉菜单组件 | IStock Shell UI
description: Dropdown下拉菜单组件提供灵活的上下文操作菜单功能，支持点击和悬停触发、16种精确定位方式、自定义内容渲染，适用于导航菜单、操作列表、用户菜单等各种交互场景。
keywords:
  [
    Dropdown下拉菜单组件,
    Svelte下拉菜单,
    上下文菜单,
    操作菜单,
    导航菜单,
    UI组件库,
    交互组件,
    Web组件,
    用户界面,
    UX设计,
    响应式菜单,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Dropdown 下拉菜单组件

下拉菜单是用户界面中重要的交互组件，用于展示操作选项、导航链接或其他相关内容。IStock Shell UI 的 Dropdown
组件提供了灵活的定位系统和丰富的自定义选项，满足各种设计需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShDropdown } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的下拉菜单用法，适用于大多数场景：

```svelte
<script>
  import { ShDropdown } from '@istock-shell/ui';
</script>

<ShDropdown items={[{ text: '选项1' }, { text: '选项2' }]} triggerElement={{ text: '点击打开' }} />
```

## 组件特性

- 🎯 **精确定位**：16种定位方式（上下左右及其组合）支持各种布局需求
- 🖱️ **多种触发**：支持点击（click）和悬停（hover）两种触发模式
- 🎨 **高度定制**：支持自定义触发器、菜单内容和样式
- 🏷️ **标签灵活**：可使用 div 或 details 标签作为容器
- 📱 **响应式友好**：自动适应不同屏幕尺寸和设备
- ♿ **无障碍支持**：遵循 WCAG 2.0 标准，支持键盘导航

## 使用场景

| 场景       | 推荐配置                        | 说明                         |
| ---------- | ------------------------------- | ---------------------------- |
| 导航菜单   | `trigger="hover"` + `placement` | 网站主导航的二级菜单         |
| 操作菜单   | `placement="bottomEnd"`         | 表格行或卡片的操作按钮       |
| 用户菜单   | `placement="bottomEnd"`         | 用户头像点击后的个人操作菜单 |
| 选择器     | `items` 配置                    | 表单中的下拉选择控件         |
| 工具栏菜单 | `placement="bottom"`            | 工具栏中的更多操作选项       |
| 上下文菜单 | 动态 `placement`                | 右键菜单或长按菜单           |
| 帮助提示   | `trigger="hover"` + 自定义内容  | 悬停显示的帮助信息或提示     |
| 筛选菜单   | `open` 状态控制                 | 搜索或筛选条件的选择菜单     |

## 示例演示

<IStockShellUiExample src="./example/DropdownDefault.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownMethod1.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownMethod2.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownMethod3.svelte" demoStyle="padding: 100px 0" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownStart.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownEnd.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownCenter.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownTop.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownTopCenter.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownTopEnd.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownBottom.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownBottomCenter.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownBottomEnd.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownLeft.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownLeftCenter.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownLeftEnd.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownRight.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownRightEnd.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownRightCenter.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownHover.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownOpen.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>
<IStockShellUiExample src="./example/DropdownCustomize.svelte" demoStyle="padding: 100px 0"></IStockShellUiExample>

## API 参考

### 属性说明

#### Dropdown 组件属性

| 属性名                 | 类型                                                   | 默认值    | 说明                   |
| ---------------------- | ------------------------------------------------------ | --------- | ---------------------- |
| `placement`            | [`DropdownPlacement`](#dropdownplacement)              | `'start'` | 下拉菜单的弹出位置     |
| `items`                | [`DropdownMenuItemProps`](#dropdownmenuitem属性说明)[] | `[]`      | 菜单项配置列表         |
| `menu`                 | [`DropdownMenuProps`](#dropdownmenu属性说明)           | -         | 菜单容器的额外配置     |
| `open`                 | `boolean`                                              | `false`   | 是否强制展开菜单       |
| `trigger`              | [`DropdownTrigger`](#dropdowntrigger)                  | `'click'` | 触发方式               |
| `triggerElement`       | [`DropdownTriggerElement`](#dropdowntriggerelement)    | -         | 触发器按钮配置         |
| `triggerElementRender` | `() => ReturnType<Snippet<[]>>`                        | -         | 自定义触发元素渲染函数 |
| `tag`                  | `'div' \| 'details'`                                   | `'div'`   | 容器HTML标签类型       |
| `class`                | `string`                                               | -         | 自定义CSS类名          |

#### DropdownMenu 组件属性

| 属性名 | 类型                                                   | 默认值 | 说明       |
| ------ | ------------------------------------------------------ | ------ | ---------- |
| items  | [`DropdownMenuItemProps`](#dropdownmenuitem属性说明)[] | `[]`   | 菜单项文本 |

#### DropdownMenuItem 组件属性

| 属性名    | 类型                   | 默认值 | 说明            |
| --------- | ---------------------- | ------ | --------------- |
| text      | `string`               | -      | 触发器文本      |
| linkAttrs | `HTMLAnchorAttributes` | -      | 触发器a标签属性 |

### 代码片段插入位置

- `Dropdown`的`children`：

```svelte
<svelte:element this={tag}>
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</svelte:element>
```

- `DropdownMenu`的`children`：

```svelte
<ul>
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</ul>
```

- `DropdownMenuItem`的`children`：

```svelte
<li>
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</li>
```

## 类型定义

### DropdownPlacement

```typescript
// 下拉菜单定位类型
type DropdownPlacement =
  | 'start' // 左侧对齐
  | 'center' // 居中
  | 'end' // 右侧对齐
  | 'top' // 向上弹出
  | 'topCenter' // 向上居中弹出
  | 'topEnd' // 向上右侧弹出
  | 'bottom' // 向下弹出
  | 'bottomCenter' // 向下居中弹出
  | 'bottomEnd' // 向下右侧弹出
  | 'left' // 左侧弹出
  | 'leftCenter' // 左侧居中弹出
  | 'leftEnd' // 左侧底部弹出
  | 'right' // 右侧弹出
  | 'rightCenter' // 右侧居中弹出
  | 'rightEnd'; // 右侧底部弹出
```

### DropdownTrigger

```typescript
// 触发方式类型
type DropdownTrigger = 'click' | 'hover';
```

### DropdownTriggerElement

```typescript
// 触发器元素配置
export interface DropdownTriggerElement extends ButtonProps<'a'> {
  text?: string; // 触发器显示文本
}
```

## 设计指南

### 定位选择建议

- **start/end**：适用于水平对齐需求，常用于导航菜单
- **center**：适用于需要居中显示的重要操作菜单
- **top/bottom**：适用于垂直空间充足的场景
- **left/right**：适用于侧边栏或空间受限的布局
- **组合定位**：如 `bottomEnd`、`topCenter` 等，提供更精确的定位控制

### 触发方式选择

- **click（点击）**：适用于操作菜单、选择器等需要明确用户意图的场景
- **hover（悬停）**：适用于导航菜单、提示信息等快速访问的场景

### 内容组织原则

1. **逻辑分组**：相关操作放在一起，使用分隔线区分不同类型的操作
2. **重要性排序**：将最常用的操作放在顶部
3. **危险操作**：删除等危险操作放在底部，并使用醒目的样式
4. **简洁明了**：菜单项文本要简洁，避免过长的描述

### 无障碍支持

- 所有下拉菜单都支持键盘导航（Tab、Enter、Escape、方向键）
- 提供适当的 `aria-label` 和 `role` 属性
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 支持屏幕阅读器的语音提示
- 焦点管理：打开菜单时焦点移至菜单，关闭时返回触发器

## 最佳实践

### 性能优化

1. **懒加载**：对于复杂的菜单内容，考虑在首次打开时才渲染
2. **虚拟滚动**：对于包含大量菜单项的场景，使用虚拟滚动技术
3. **防抖处理**：对于悬停触发，添加适当的延迟避免频繁切换

### 响应式设计

1. **移动端适配**：在小屏幕设备上考虑使用全屏或底部弹出的方式
2. **触摸友好**：确保菜单项有足够的点击区域（至少44px）
3. **自适应定位**：根据可用空间自动调整菜单位置

### 用户体验

1. **视觉反馈**：提供清晰的悬停、激活状态样式
2. **动画效果**：使用适当的过渡动画增强用户体验
3. **一致性**：在同一应用中保持下拉菜单的样式和行为一致
4. **可预测性**：菜单的位置和行为应该符合用户预期

## 常见问题

### Q: 如何实现多级下拉菜单？

A: 可以在菜单项中嵌套另一个 `ShDropdown` 组件：

```svelte
<ShDropdown>
  <ShDropdownMenu>
    <li>
      <ShDropdown placement="right" trigger="hover">
        <!-- 子菜单内容 -->
      </ShDropdown>
    </li>
  </ShDropdownMenu>
</ShDropdown>
```

### Q: 如何控制菜单的打开和关闭状态？

A: 使用 `open` 属性进行状态控制，结合事件处理实现自定义逻辑：

```svelte
<script>
  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }
</script>

<ShDropdown {open} onclick={toggleMenu}>
  <!-- 菜单内容 -->
</ShDropdown>
```

### Q: 如何自定义菜单样式？

A: 可以通过 `class` 属性添加自定义CSS类，或者使用 `menu` 属性配置菜单容器：

```svelte
<ShDropdown class="custom-dropdown" menu={{ class: 'custom-menu bg-white shadow-lg' }}>
  <!-- 菜单内容 -->
</ShDropdown>
```

### Q: 如何在菜单项中添加图标？

A: 使用自定义内容渲染：

```svelte
<ShDropdown>
  <ShDropdownMenu>
    <li><a href="#">📁 文件夹</a></li>
    <li><a href="#">📄 文档</a></li>
    <li><a href="#">🗑️ 删除</a></li>
  </ShDropdownMenu>
</ShDropdown>
```

### Q: 如何处理菜单项的点击事件？

A: 可以在菜单项的 `linkAttrs` 中添加事件处理，或者使用自定义内容：

```svelte
<ShDropdown
  items={[
    {
      text: '编辑',
      linkAttrs: {
        href: '#',
        onclick: (e) => {
          e.preventDefault();
          handleEdit();
        },
      },
    },
  ]}
/>
```

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
