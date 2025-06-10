---
title: List 列表组件 | IStock Shell UI
description: List列表组件提供强大的数据展示功能，支持图片/头像/图标展示、多操作按钮配置、自定义内容渲染、响应式布局等特性，基于数据驱动设计，适用于数据列表、导航菜单、内容展示、操作面板等各种交互场景。
keywords:
  [
    List列表组件,
    Svelte列表,
    数据展示组件,
    列表布局,
    数据驱动,
    UI组件库,
    交互组件,
    Web组件,
    用户界面,
    UX设计,
    响应式列表,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# List 列表组件

列表组件是用户界面中最重要的数据展示组件，用于展示结构化的数据集合和操作选项。IStock Shell UI 的 List 组件采用数据驱动设计，提供了灵活的配置系统和丰富的自定义选项，满足各种复杂的数据展示需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShList, ShListRow } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的列表用法，通过数据驱动渲染：

```svelte
<script>
  import { ShList } from '@istock-shell/ui';

  const listData = [
    { text: '列表项1', description: '描述信息1' },
    { text: '列表项2', description: '描述信息2' },
    { text: '列表项3', description: '描述信息3' },
  ];
</script>

<ShList list={listData} />
```

## 组件特性

- 🎨 **丰富展示**：支持图片、头像、图标等多种视觉元素，灵活配置展示样式
- 🔧 **操作系统**：支持多操作按钮配置，内置点击事件处理机制
- 🎭 **高度定制**：支持自定义内容渲染函数和操作区域渲染
- 🏷️ **数据驱动**：基于配置对象驱动，易于维护和动态更新
- ♿ **无障碍支持**：遵循 WCAG 2.0 标准，支持键盘导航和屏幕阅读器

## 使用场景

| 场景       | 推荐配置                       | 说明                         |
| ---------- | ------------------------------ | ---------------------------- |
| 数据列表   | `picture` + `actions` 配置     | 用户列表、商品列表、文章列表 |
| 导航菜单   | `icon` + `text` + 点击事件     | 侧边栏导航、功能菜单         |
| 内容展示   | `picture` + `description` 配置 | 新闻列表、产品展示、媒体库   |
| 操作面板   | 多 `actions` + 状态展示        | 管理后台、控制面板、工作台   |
| 联系人列表 | `avatar` + 联系信息 + 通信操作 | 通讯录、团队成员、客户列表   |
| 设置选项   | `icon` + 说明 + 开关操作       | 系统设置、偏好配置、权限管理 |
| 文件管理   | `icon` + 文件信息 + 文件操作   | 文件浏览器、资源管理器       |
| 消息列表   | `avatar` + 消息内容 + 时间戳   | 聊天记录、通知列表、评论区   |

## 示例演示

<IStockShellUiExample src="./example/ListDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ListRow.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ListColWrap.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ListRowEvent.svelte" layout="column"></IStockShellUiExample>

## API 参考

### 属性说明

#### List 属性

| 属性名         | 类型                              | 默认值 | 说明                                           |
| -------------- | --------------------------------- | ------ | ---------------------------------------------- |
| `list`         | [`ListRowProps[]`](#listrowprops) | `[]`   | 列表数据数组，用于数据驱动渲染列表项           |
| `prefixRender` | `() => ReturnType<Snippet<[]>>`   | -      | 前缀内容渲染函数，在列表开始位置插入自定义内容 |
| `suffixRender` | `() => ReturnType<Snippet<[]>>`   | -      | 后缀内容渲染函数，在列表结束位置插入自定义内容 |
| `class`        | `string`                          | `''`   | 自定义CSS类名                                  |

#### ListRow 属性

| 属性名          | 类型                                                              | 默认值 | 说明                                 |
| --------------- | ----------------------------------------------------------------- | ------ | ------------------------------------ |
| `text`          | `string`                                                          | -      | 列表项的主要文本内容                 |
| `description`   | `string`                                                          | -      | 列表项的描述文本信息                 |
| `picture`       | [`ListRowPicture`](#listrowpicture)                               | -      | 图片/图标配置对象                    |
| `actions`       | [`ListRowAction[]`](#listrowaction)                               | `[]`   | 操作按钮列表配置                     |
| `actionRender`  | `(action: ListRowAction) => ReturnType<Snippet<[ListRowAction]>>` | -      | 自定义操作按钮渲染函数               |
| `contentRender` | `() => ReturnType<Snippet<[]>>`                                   | -      | 自定义内容渲染函数                   |
| `onClickValue`  | `(row: ListRowProps, index: number) => void`                      | -      | 列表项点击回调函数，传递行数据和索引 |
| `onRender`      | `(node: HTMLElement) => void`                                     | -      | 元素渲染完成回调函数                 |
| `class`         | `string`                                                          | `''`   | 自定义CSS类名                        |

### 代码片段插入位置

- `List`的`prefixRender`、`children`、`suffixRender`位置：

```svelte
<ul class="list">
  {@render prefixRender?.()}
  {@render children()}
  {@render suffixRender?.()}
</ul>
```

- `ListRow`的`children`位置：

```svelte
<li class="list-row">
  {@render children()}
</li>
```

- `ListRow`的`contentRender`位置：

```svelte
<li class="list-row">
  <!-- ...图片/图标展示区域 code -->
  {@render contentRender?.()}
  <!-- ...操作按钮区域 code -->
</li>
```

- `ListRow`的`actionRender`位置：

```svelte
<li class="list-row">
  <!-- ...图片/图标展示区域 code -->
  <!-- ...主要内容区域 code -->
  {@render actionRender?.(action)}
</li>
```

### 事件

`List`和`ListRow`继承所有原生HTML元素事件，主要包括：

- `click` - 列表项点击事件
- `keydown` - 键盘按下事件
- `keyup` - 键盘释放事件

### 类型定义

#### ListRowProps

列表项属性接口：

```typescript
interface ListRowProps {
  text?: string; // 主要文本内容
  description?: string; // 描述文本内容
  picture?: ListRowPicture; // 图片/头像/图标配置
  actions?: ListRowAction[]; // 操作按钮配置数组
  actionRender?: ListRowActionRender; // 自定义操作区域渲染函数
  contentRender?: ListRowContentRender; // 自定义内容区域渲染函数
  onClickValue?: (row: ListRowProps, index: number) => void; // 点击回调函数
  onRender?: (node: HTMLElement) => void; // 渲染完成回调函数
}
```

#### ListRowPicture

图片/头像/图标配置：

```typescript
interface ListRowPicture {
  src?: string; // 图片地址URL
  alt?: string; // 图片替代文本
  shape?: 'circle' | 'square'; // 图片形状：圆形或方形
  size?: string; // 图片尺寸（CSS值）
  icon?: string; // 图标类名（替代图片使用）
}
```

#### ListRowAction

操作按钮配置：

```typescript
interface ListRowAction {
  name: string; // 按钮唯一标识符
  text?: string; // 按钮显示文本
  icon?: string; // 按钮图标类名
  color?: string; // 按钮主题颜色
  disabled?: boolean; // 是否禁用按钮
  onClickValue?: (name: string, action: ListRowAction) => void; // 按钮点击回调
}
```

## 设计指南

### 布局原则

- **一致性**：保持列表项的高度、间距和对齐方式一致
- **层次感**：通过字体大小、颜色深浅、间距建立清晰的信息层次
- **对齐规范**：主要内容左对齐，操作按钮右对齐，保持视觉平衡
- **间距系统**：使用统一的间距规范，确保视觉舒适和易读性

### 视觉设计

- **图片规范**：统一图片尺寸和圆角样式，保持视觉一致性
- **颜色使用**：合理使用主题色彩，重要操作使用强调色
- **字体层次**：标题、正文、辅助文本使用不同字重和大小
- **状态表达**：通过颜色、图标、文本清晰表达不同状态

### 交互设计

- **悬停效果**：鼠标悬停时显示背景色变化和操作按钮
- **点击反馈**：点击时提供即时的视觉和触觉反馈
- **加载状态**：异步操作时显示加载指示器，避免用户困惑
- **错误处理**：操作失败时提供明确的错误提示和恢复建议

### 无障碍支持

- 所有列表项都支持键盘导航（Tab、Enter、Space、方向键）
- 提供适当的 `aria-label` 和 `role` 属性
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 使用语义化的 HTML 结构（`<ul>`、`<li>`）
- 为操作按钮提供描述性文本和状态信息
- 支持屏幕阅读器和辅助技术

### 最佳实践

1. **数据结构**：保持数据结构的一致性，便于维护和扩展
2. **性能优化**：大数据量时使用虚拟滚动或分页加载
3. **响应式设计**：在不同设备上提供合适的交互体验
4. **状态管理**：合理管理列表的选中、加载、错误等状态
5. **事件处理**：统一的事件处理模式，避免重复代码
6. **样式定制**：使用CSS变量和类名进行样式定制
7. **无障碍性**：确保键盘导航和屏幕阅读器支持

## 常见问题

### Q: 如何自定义列表项样式？

A: 可以通过 `class` 属性添加自定义CSS类，或者使用CSS变量覆盖默认样式。

### Q: 如何实现列表项的选中状态？

A: 通过状态管理控制选中项，并使用条件样式类名实现视觉反馈。

### Q: 如何优化大数据量列表的性能？

A: 建议使用虚拟滚动、分页加载、图片懒加载等策略优化性能。

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
