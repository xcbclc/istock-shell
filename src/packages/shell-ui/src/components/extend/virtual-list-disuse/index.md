---
title: VirtualList 虚拟列表组件 | IStock Shell UI
description: VirtualList虚拟列表组件提供高性能的大数据量渲染解决方案，支持垂直/水平滚动、动态尺寸检测、预渲染缓冲、自定义头尾部渲染、精确滚动定位等特性，基于虚拟化技术优化，适用于大数据列表、聊天记录、数据表格、无限滚动等高性能要求场景。
keywords:
  [
    VirtualList虚拟列表,
    虚拟滚动组件,
    Svelte虚拟列表,
    大数据渲染,
    性能优化组件,
    高性能列表,
    UI组件库,
    前端组件,
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

虚拟列表组件是用户界面中专为大数据量场景设计的高性能列表渲染解决方案。IStock Shell UI 的 VirtualList 组件采用虚拟化技术，只渲染可视区域内的列表项，大幅提升渲染性能和用户体验，支持万级数据的流畅滚动操作。

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

最简单的虚拟列表用法，适用于大数据量场景：

```svelte
<script>
  import { VirtualList } from '@istock-shell/ui';

  const largeDataList = Array.from({ length: 10000 }, (_, index) => ({
    id: index,
    name: `项目 ${index + 1}`,
    description: `这是第 ${index + 1} 个列表项的描述信息`,
  }));
</script>

<VirtualList
  list={largeDataList}
  estimateSize={60}
  mainItemRender={(item) => {
    return `
      <div class="p-4 border-b">
        <h3>${item.name}</h3>
        <p class="text-gray-600">${item.description}</p>
      </div>
    `;
  }}
/>
```

## 组件特性

- 🚀 **极致性能**：虚拟化渲染技术，支持万级数据流畅滚动，内存占用恒定
- 📏 **动态尺寸**：自动检测和适配列表项的动态高度/宽度变化，支持不等高列表项
- 🔄 **双向滚动**：支持垂直（vertical）和水平（horizontal）两种滚动方向
- 🎯 **精确定位**：提供索引定位和偏移量定位，支持精确滚动控制
- 🎨 **灵活定制**：支持自定义头部、尾部和列表项渲染函数，满足复杂UI需求
- 📊 **预渲染缓冲**：可配置上下缓冲区域，优化滚动体验和性能表现
- 🔗 **外部滚动**：支持关联外部滚动元素，实现复杂滚动联动效果
- ♿ **无障碍友好**：保持原生滚动行为，支持键盘导航和屏幕阅读器

## 使用场景

| 场景         | 推荐配置                                   | 说明                                   |
| ------------ | ------------------------------------------ | -------------------------------------- |
| 大数据列表   | `keeps={30}` + `estimateSize={50}`         | 商品列表、用户列表、数据表格等大量数据 |
| 聊天消息列表 | `direction="vertical"` + 动态高度检测      | 即时通讯、评论列表、消息记录           |
| 图片瀑布流   | `direction="vertical"` + 不等高配置        | 图片展示、作品集、媒体库               |
| 水平滚动卡片 | `direction="horizontal"` + 固定宽度        | 轮播图、产品展示、时间轴               |
| 无限滚动     | 配合 `onRangeChange` + 数据懒加载          | 社交媒体流、新闻列表、搜索结果         |
| 表格虚拟滚动 | `headerRender` + `footerRender` + 固定高度 | 数据表格、报表展示、统计面板           |
| 移动端长列表 | `thresholdTop/Bottom` + 触摸优化           | 移动应用、小程序、响应式页面           |
| 复杂列表项   | `mainItemRender` + 动态内容渲染            | 复合组件列表、卡片列表、富文本内容     |

## 示例演示

<IStockShellUiExample src="./example/VirtualListDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/VirtualTable.svelte"></IStockShellUiExample>

## API 参考

### 属性说明

| 属性名            | 类型                                               | 默认值       | 说明                                       |
| ----------------- | -------------------------------------------------- | ------------ | ------------------------------------------ |
| `list`            | `any[]`                                            | `[]`         | 数据源数组，虚拟列表渲染的数据集合         |
| `thresholdTop`    | `number`                                           | `0`          | 顶部预渲染阈值（像素），提前渲染顶部缓冲区 |
| `thresholdBottom` | `number`                                           | `0`          | 底部预渲染阈值（像素），提前渲染底部缓冲区 |
| `keeps`           | `number`                                           | `25`         | 保持渲染的最小项数，影响滚动性能和内存占用 |
| `direction`       | [`VirtualDirection`](#virtualdirection)            | `'vertical'` | 滚动方向，支持垂直和水平滚动               |
| `dataKey`         | `string \| ((item: any, index: number) => string)` | `'id'`       | 数据项唯一标识键或函数，用于优化渲染性能   |
| `headerSize`      | `number`                                           | `0`          | 头部固定区域高度（像素），不参与虚拟滚动   |
| `footerSize`      | `number`                                           | `0`          | 尾部固定区域高度（像素），不参与虚拟滚动   |
| `estimateSize`    | `number`                                           | `32`         | 列表项尺寸预估值（像素），用于初始化计算   |
| `shepherdElement` | `HTMLElement`                                      | -            | 关联的外部滚动元素，实现滚动联动           |
| `scrollToIndex`   | `number`                                           | -            | 初始滚动到指定索引位置                     |
| `scrollToOffset`  | `number`                                           | -            | 初始滚动到指定偏移量位置                   |
| `headerRender`    | `() => ReturnType<Snippet<[]>>`                    | -            | 头部固定内容渲染函数                       |
| `mainItemRender`  | `(item: any) => ReturnType<Snippet<[]>>`           | -            | 列表项内容渲染函数，自定义每个项的显示     |
| `footerRender`    | `() => ReturnType<Snippet<[]>>`                    | -            | 尾部固定内容渲染函数                       |
| `onRangeChange`   | `(range: VirtualCoreRange) => void`                | -            | 可视区域变化回调函数，监听滚动状态         |
| `class`           | `string`                                           | `''`         | 自定义CSS类名                              |

### 代码片段插入位置

- `children`：

```svelte
<div class="virtual-list">
  <div style={wrapperStyle}>
    <!-- 头部固定区域 -->
    {#if headerRender}
      {@render headerRender()}
    {/if}

    <!-- 主要内容区域 -->
    {#if mainItemRender}
      <!-- 虚拟列表项渲染 -->
    {:else}
      {@render children?.()}
    {/if}

    <!-- 尾部固定区域 -->
    {#if footerRender}
      {@render footerRender()}
    {/if}
  </div>
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

| 方法名              | 参数                              | 返回值                    | 说明                                 |
| ------------------- | --------------------------------- | ------------------------- | ------------------------------------ |
| `onItemResize`      | `(node: HTMLElement, id: string)` | `VirtualListResizeAction` | 列表项尺寸监听动作，用于动态尺寸检测 |
| `scrollToLastChild` | -                                 | `void`                    | 滚动到列表末尾                       |
| `scrollToElement`   | `selector: string`                | `void`                    | 滚动到指定CSS选择器的元素            |

### 类型定义

#### VirtualDirection

```typescript
// 虚拟列表滚动方向
enum VirtualDirection {
  vertical = 'vertical', // 垂直滚动
  horizontal = 'horizontal', // 水平滚动
}
```

#### VirtualCoreRange

```typescript
// 虚拟列表可视区域范围信息
interface VirtualCoreRange {
  offset: number; // 当前滚动偏移量（像素）
  start: number; // 可视区域起始索引
  end: number; // 可视区域结束索引
  padFront: number; // 前置填充高度（像素）
  padBehind: number; // 后置填充高度（像素）
  totalHeight: number; // 列表总高度（像素）
}
```

#### VirtualListResizeAction

```typescript
// 列表项尺寸监听动作接口
interface VirtualListResizeAction {
  (
    node: HTMLElement,
    id: string
  ): {
    update: (newId: string) => void; // 更新监听的元素ID
    destroy: () => void; // 销毁监听器
  };
}
```

## 设计指南

### 性能优化建议

- **合理配置 keeps**：根据容器高度和列表项高度计算最优值，通常为可视区域能容纳项数的1.5-2倍
- **精确预估尺寸**：`estimateSize` 越接近真实尺寸，初始化性能越好，减少滚动时的重新计算
- **稳定的数据标识**：确保 `dataKey` 返回唯一且稳定的标识，避免不必要的重新渲染
- **批量数据更新**：避免频繁的单项数据变更，使用批量更新提升性能
- **合理缓冲区设置**：根据用户滚动习惯调整 `thresholdTop` 和 `thresholdBottom`

### 尺寸处理建议

- **固定高度场景**：直接设置准确的 `estimateSize`，无需使用 `onItemResize`
- **动态高度场景**：必须使用 `onItemResize` 动作监听尺寸变化
- **混合高度场景**：设置平均高度作为 `estimateSize`，配合 `onItemResize` 优化
- **图片内容场景**：确保图片加载完成后触发尺寸更新

### 滚动体验优化

- **平滑滚动**：避免在 `mainItemRender` 中进行复杂计算或异步操作
- **预加载策略**：合理设置缓冲区，平衡性能和用户体验
- **响应式适配**：在不同设备上调整 `keeps` 和缓冲区大小
- **触摸优化**：移动端适当增加缓冲区，减少滚动时的卡顿

### 无障碍支持

- 保持原生滚动行为，支持键盘导航（方向键、Page Up/Down、Home/End）
- 为列表项提供适当的 `aria-label` 或 `aria-describedby` 属性
- 确保焦点管理正确，支持Tab键在列表项间导航
- 为动态加载的内容提供加载状态提示

### 最佳实践

1. **数据结构设计**：确保数据项包含稳定的唯一标识符
2. **渲染函数优化**：保持 `mainItemRender` 函数的纯净性和高效性
3. **内存管理**：及时清理不再使用的数据和事件监听器
4. **错误处理**：为异步数据加载和渲染错误提供降级方案
5. **测试覆盖**：在不同数据量和设备上测试滚动性能
6. **监控指标**：关注首屏渲染时间、滚动帧率和内存占用

## 常见问题

### Q: 滚动时出现白屏或闪烁？

A: 这通常是由于 `estimateSize` 与实际列表项尺寸差异过大导致的。解决方案：

- 测量实际列表项的平均高度，调整 `estimateSize` 值
- 适当增加 `keeps` 值，增加渲染的缓冲项数量
- 检查 `mainItemRender` 函数是否存在异步操作

### Q: 动态高度列表项渲染异常？

A: 动态高度场景需要特别处理：

- 必须使用 `onItemResize` 动作监听每个列表项的尺寸变化
- 确保 `dataKey` 返回稳定的唯一标识
- 避免在列表项内容变化时改变其唯一标识

### Q: 滚动性能不佳，出现卡顿？

A: 性能问题的常见原因和解决方案：

- 减少 `keeps` 值，降低同时渲染的DOM数量
- 优化 `mainItemRender` 函数，避免复杂计算和DOM操作
- 检查是否存在内存泄漏，及时清理事件监听器
- 考虑使用 `requestAnimationFrame` 优化动画效果

### Q: 如何实现无限滚动加载？

A: 结合 `onRangeChange` 回调实现：

```svelte
<script>
  let list = $state([]);
  let loading = $state(false);

  const handleRangeChange = async (range) => {
    // 当滚动接近底部时加载更多数据
    if (range.end >= list.length - 5 && !loading) {
      loading = true;
      const newData = await fetchMoreData();
      list = [...list, ...newData];
      loading = false;
    }
  };
</script>

<VirtualList {list} {onRangeChange} />
```

### Q: 如何处理列表项中的交互元素？

A: 在虚拟列表中处理交互元素需要注意：

- 使用事件委托而非直接绑定事件到每个列表项
- 确保交互状态与数据模型同步
- 避免在 `mainItemRender` 中创建复杂的事件处理逻辑

### Q: 水平滚动模式如何配置？

A: 设置 `direction="horizontal"` 并注意：

- `estimateSize` 表示列表项的宽度而非高度
- 容器需要设置固定宽度和 `overflow-x: auto`
- 列表项需要设置适当的宽度和 `display: inline-block` 或 `flex`

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
