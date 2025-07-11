---
title: VirtualList 虚拟列表组件 | IStock Shell UI
description: VirtualList虚拟列表组件提供高性能的大数据量渲染解决方案，支持动态高度计算、智能缓存、无限滚动、自适应尺寸等特性，基于现代虚拟化算法构建，适用于聊天记录、数据表格、商品列表等大数据量展示场景。
keywords:
  [
    VirtualList虚拟列表组件,
    Svelte虚拟列表,
    大数据渲染,
    性能优化组件,
    无限滚动,
    UI组件库,
    Web组件,
    用户界面,
    UX设计,
    响应式列表,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# VirtualList 虚拟列表组件 <Badge type="tip">shell</Badge>

虚拟列表是一种高性能的列表渲染技术，通过只渲染可视区域内的元素来优化大数据量场景下的性能表现。IStock Shell UI 的 VirtualList 组件基于现代虚拟化算法构建，提供了智能缓存、动态高度计算和流畅的滚动体验。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { VirtualList } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的虚拟列表用法，适用于大多数场景：

```svelte
<script>
  import { VirtualList } from '@istock-shell/ui';

  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    value: Math.random(),
  }));
</script>

<VirtualList list={items} estimateSize={50} keeps={20}>
  {#snippet itemRender(item, index)}
    <div class="p-4 border-b">
      <h3>{item.name}</h3>
      <p>Index: {index}, Value: {item.value.toFixed(2)}</p>
    </div>
  {/snippet}
</VirtualList>
```

## 组件特性

- 🚀 **极致性能**：虚拟化渲染技术，支持万级数据流畅滚动，内存占用恒定
- 📏 **动态尺寸**：自动检测和适配列表项的动态高度/宽度变化，支持不等高列表项自适应
- 🔄 **双向滚动**：支持垂直（vertical）和水平（horizontal）两种滚动方向
- 🎯 **精确定位**：提供索引定位和偏移量定位，支持精确滚动控制和多种对齐方式
- 🎨 **灵活定制**：支持自定义头部、尾部和列表项渲染函数，满足复杂UI需求
- 📊 **预渲染缓冲**：可配置上下缓冲区域，优化滚动体验和性能表现
- 🔗 **外部滚动**：支持关联外部滚动元素，实现复杂滚动联动效果
- 🔄 **无限滚动**：内置滚动到顶部/底部回调，轻松实现无限加载功能
- ♿ **无障碍友好**：保持原生滚动行为，支持键盘导航和屏幕阅读器

## 使用场景

| 场景       | 推荐配置                                     | 说明                                 |
| ---------- | -------------------------------------------- | ------------------------------------ |
| 聊天记录   | `onRangeChange` + 动态高度 + `keeps={25}`    | 消息列表展示，支持新消息自动滚动     |
| 数据表格   | `estimateSize={40}` + `keeps={30}`           | 大数据量表格展示，保持流畅滚动性能   |
| 商品列表   | `headerRender` + `footerRender` + 图片懒加载 | 电商商品展示，包含筛选头部和加载更多 |
| 无限滚动   | `onRangeChange` + 数据懒加载                 | 社交媒体信息流，双向无限加载         |
| 文件浏览器 | `mainItemRender` + 自定义图标                | 文件列表展示，支持不同文件类型渲染   |
| 搜索结果   | 动态 `list` 更新 + `scrollToIndex`           | 搜索结果展示，支持快速定位到指定项   |
| 移动端列表 | 小 `keeps` 值 + `thresholdTop/Bottom`        | 移动设备优化，减少内存占用提升性能   |
| 日志查看器 | `scrollToLastChild()` + 实时数据追加         | 实时日志展示，自动滚动到最新内容     |

## 示例演示

<IStockShellUiExample src="./example/VirtualListDefault.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/VirtualListRow.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/VirtualTable.svelte" layout="column"></IStockShellUiExample>

## API 参考

### 属性说明

| 属性名               | 类型                                                               | 默认值       | 说明                                   |
| -------------------- | ------------------------------------------------------------------ | ------------ | -------------------------------------- |
| `list`               | `Array<Record<string, any>>`                                       | `[]`         | 列表数据源数组                         |
| `thresholdTop`       | `number`                                                           | `0`          | 顶部阈值，距离顶部多少像素触发回调     |
| `thresholdBottom`    | `number`                                                           | `0`          | 底部阈值，距离底部多少像素触发回调     |
| `keeps`              | `number`                                                           | `25`         | 保持渲染的元素数量，影响性能和内存占用 |
| `direction`          | [`VirtualDirection`](#virtualdirection)                            | `'vertical'` | 滚动方向（当前仅支持垂直滚动）         |
| `dataKey`            | `string \| ((item: any, index: number) => string)`                 | `'id'`       | 数据项的唯一标识字段名或生成函数       |
| `headerSize`         | `number`                                                           | `0`          | 头部固定区域的尺寸（像素）             |
| `footerSize`         | `number`                                                           | `0`          | 尾部固定区域的尺寸（像素）             |
| `estimateSize`       | `number`                                                           | `32`         | 列表项的预估尺寸，用于初始化计算       |
| `scrollToIndex`      | `number`                                                           | -            | 滚动到指定索引位置                     |
| `scrollToOffset`     | `number`                                                           | -            | 滚动到指定偏移量位置（像素）           |
| `headerRender`       | `() => ReturnType<Snippet<[]>>`                                    | -            | 头部内容渲染函数                       |
| `itemRender`         | `(item: any, index: number) => ReturnType<Snippet<[any, number]>>` | -            | 列表项渲染函数                         |
| `itemChildrenRender` | `(item: any, index: number) => ReturnType<Snippet<[any, number]>>` | -            | 列表项子内容渲染函数（支持绝对定位）   |
| `footerRender`       | `() => ReturnType<Snippet<[]>>`                                    | -            | 尾部内容渲染函数                       |
| `onRangeChange`      | `(range: VirtualRange) => void`                                    | -            | 可见范围变化时的回调函数               |
| `onScrollToTop`      | `() => void`                                                       | -            | 滚动到顶部时的回调函数                 |
| `onScrollToBottom`   | `() => void`                                                       | -            | 滚动到底部时的回调函数                 |
| `class`              | `string`                                                           | -            | 自定义CSS类名                          |

### 代码片段插入位置

- `children`：

```svelte
<div class="virtual-list">
  {@render children?.()}
</div>
```

- `headerRender`：

```svelte
<div class="virtual-list">
  <!-- 头部区域 -->
  {@render headerRender?.()}
  <!-- ...其他内容 -->
</div>
```

- `itemRender`：

```svelte
{#each currentList as item, index (getItemKey(item, index))}
  {@render itemRender?.(item, range.start + index)}
{/each}
```

- `itemChildrenRender`：

```svelte
<div class="virtual-item absolute left-0 w-full" use:onItemResize>
  {@render itemChildrenRender?.(item, range.start + index)}
</div>
```

- `footerRender`：

```svelte
<div class="virtual-list">
  <!-- ...其他内容 -->
  <!-- 尾部区域 -->
  {@render footerRender?.()}
</div>
```

### 事件

继承所有原生HTML div元素事件，如：

- `scroll` - 滚动事件（内部处理，用于虚拟化计算）
- `wheel` - 鼠标滚轮事件
- `touchstart` - 触摸开始事件
- `touchmove` - 触摸移动事件
- `touchend` - 触摸结束事件

### 方法

| 方法名           | 参数                                                  | 返回值         | 说明                                 |
| ---------------- | ----------------------------------------------------- | -------------- | ------------------------------------ |
| `scrollToBottom` | -                                                     | `void`         | 滚动到列表底部                       |
| `scrollByIndex`  | `index: number, alignment?: 'start'\|'center'\|'end'` | `void`         | 滚动到指定索引位置，支持对齐方式     |
| `onItemResize`   | `node: HTMLElement`                                   | `ActionReturn` | 列表项尺寸监听动作，自动更新元素尺寸 |
| `getItemTop`     | `offsetIndex: number`                                 | `number`       | 获取列表项在容器中的顶部偏移量       |

### 类型定义

#### VirtualDirection

```typescript
// 虚拟列表滚动方向
type VirtualDirection = 'vertical' | 'horizontal';
```

#### VirtualRange

```typescript
// 虚拟列表渲染范围
interface VirtualRange {
  start: number; // 起始索引
  end: number; // 结束索引
  paddingTop: number; // 顶部填充高度
  paddingBottom: number; // 底部填充高度
  totalHeight: number; // 总高度
}
```

#### VirtualListResizeAction

```typescript
// 虚拟列表尺寸监听动作
type VirtualListResizeAction = (node: HTMLElement) => {
  update?: () => void;
  destroy?: () => void;
};
```

#### VirtualCoreOptions

```typescript
// 虚拟列表核心配置选项
interface VirtualCoreOptions {
  keeps: number; // 保持渲染的元素数量
  estimateSize: number; // 预估元素尺寸
  headerSize: number; // 头部区域尺寸
  footerSize: number; // 底部区域尺寸
  totalCount: number; // 总元素数量
  thresholdTop?: number; // 顶部阈值
  thresholdBottom?: number; // 底部阈值
  scrollDebounce?: number; // 滚动防抖间隔
}
```

## 设计指南

### 性能优化策略

- **合理设置 `keeps` 值**：根据容器高度和列表项高度计算最优的保持渲染数量，通常为可视区域能容纳项数的 1.5-2 倍
- **准确的 `estimateSize`**：提供接近真实的预估尺寸，减少滚动时的跳跃感和重新计算开销
- **使用稳定的 `dataKey`**：为每个列表项提供稳定的唯一标识，优化 Svelte 的 Diff 算法性能
- **避免频繁数据更新**：批量更新数据，使用 `$derived` 优化响应式计算，减少不必要的重渲染
- **合理缓冲区配置**：根据用户滚动习惯和设备性能调整 `thresholdTop` 和 `thresholdBottom`

### 尺寸处理策略

- **固定高度场景**：直接设置准确的 `estimateSize`，无需使用 `onItemResize` 动作
- **动态高度场景**：必须使用 `onItemResize` 动作监听每个列表项的尺寸变化
- **混合高度场景**：设置平均高度作为 `estimateSize`，配合 `onItemResize` 实现最佳性能
- **图片内容场景**：确保图片加载完成后触发尺寸更新，避免布局跳跃
- **响应式适配**：监听容器尺寸变化，及时更新虚拟列表的计算参数

### 滚动体验优化

- **保持原生滚动**：利用浏览器原生滚动机制，确保自然流畅的滚动手感
- **避免渲染阻塞**：在 `itemRender` 中避免复杂计算或异步操作，保持渲染函数的轻量化
- **预加载策略优化**：合理设置缓冲区大小，在性能和用户体验间找到最佳平衡点
- **设备适配优化**：在不同设备上调整 `keeps` 和缓冲区大小，移动端适当增加缓冲区
- **精确定位控制**：使用 `scrollByIndex` 实现精确的滚动定位，支持不同对齐方式

### 无障碍支持

- **键盘导航兼容**：保持原生滚动的键盘支持（方向键、Page Up/Down、Home/End）
- **语义化标签**：为列表项提供适当的 `aria-label` 或 `aria-describedby` 属性
- **焦点管理优化**：正确处理虚拟化场景下的焦点状态和Tab键导航
- **状态反馈机制**：为动态加载的内容提供加载状态提示和错误处理
- **屏幕阅读器友好**：确保列表项内容结构清晰，语义化标签使用正确

### 开发最佳实践

1. **数据结构设计**：确保数据项包含稳定的唯一标识符，使用扁平化结构避免深层嵌套
2. **渲染函数优化**：保持 `itemRender` 函数的纯净性和高效性，避免在渲染过程中产生副作用
3. **内存管理策略**：及时清理不再使用的数据引用和事件监听器，防止内存泄漏
4. **错误边界处理**：为异步数据加载和渲染错误提供优雅的降级方案
5. **性能监控体系**：关注首屏渲染时间、滚动帧率和内存占用等关键性能指标
6. **测试覆盖完整**：在不同数据量和设备上进行充分测试，特别关注滚动和尺寸计算逻辑
7. **开发调试支持**：利用浏览器开发工具监控虚拟化性能，及时发现和解决瓶颈问题

## 常见问题

### Q: 虚拟列表的性能优势体现在哪里？

A: 虚拟列表通过只渲染可视区域内的元素，大幅减少DOM节点数量和内存占用。对于万级数据，可以将渲染时间从秒级降低到毫秒级，滚动性能保持恒定不受数据量影响。

### Q: 如何处理动态高度的列表项？

A: 使用 `itemChildrenRender` 配合 `onItemResize` 动作，组件会自动检测和更新每个列表项的实际尺寸。确保在内容变化后能触发尺寸重新计算。

### Q: 滚动时出现跳跃现象怎么解决？

A: 通常是 `estimateSize` 与实际尺寸差异过大导致的。尽量提供准确的预估值，对于动态高度场景必须使用 `onItemResize` 进行实时尺寸检测。

### Q: 如何实现无限滚动加载？

A: 使用 `onScrollToTop` 和 `onScrollToBottom` 回调函数，当用户滚动到边界时自动触发数据加载，然后更新 `list` 属性即可。

### Q: 组件支持水平滚动吗？

A: 当前版本主要针对垂直滚动场景优化，虽然 `direction` 属性支持 `horizontal`，但建议优先使用垂直滚动以获得最佳性能。

### Q: 如何优化大数据量场景的性能？

A: 1) 根据容器高度合理设置 `keeps` 值；2) 使用稳定的 `dataKey` 函数；3) 保持渲染函数轻量化；4) 适当调整 `thresholdTop/Bottom` 缓冲区。

### Q: 列表项包含图片时如何避免布局问题？

A: 为图片设置固定尺寸或使用占位符，确保图片加载完成后能触发 `onItemResize` 更新。也可以预先计算图片尺寸并设置到 `estimateSize`。

### Q: 如何实现滚动到指定位置？

A: 使用 `scrollByIndex(index, alignment)` 方法可以滚动到指定索引位置，支持 `start`、`center`、`end` 三种对齐方式。也可以使用 `scrollToBottom()` 快速滚动到底部。

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
