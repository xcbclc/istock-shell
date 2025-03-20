---
title: VirtualList 虚拟列表组件
description: 专为大数据量设计的虚拟滚动解决方案，实现万级数据流畅渲染，支持动态尺寸计算、可视区域跟踪和高效内存管理。
keywords: [虚拟列表组件,大数据渲染,滚动优化,Svelte虚拟列表,VirtualList API]
editLink: false
outline: [2, 3]
---

## VirtualList 虚拟列表 <Badge type="tip">shell</Badge>
**高性能滚动容器，实现海量数据的高效渲染与交互。**

## 使用场景
- 需要渲染1000+条数据的列表/表格时
- 移动端长列表性能优化
- 实时数据流展示
- 表格与复杂列表的滚动优化

## 功能特性
- 动态可视区域计算
- 自适应条目尺寸调整
- 智能缓冲区管理
- 精准滚动定位
- 可视区域变化事件通知

## 示例演示
<IStockShellUiExample src="./example/VirtualListDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/VirtualTable.svelte"></IStockShellUiExample>

## API 参考
### VirtualList属性说明
| 参数            | 说明                | 类型                                               | 默认值       |
|---------------|-------------------|--------------------------------------------------|-----------|
| list          | 数据源列表            | `any[]`                                          | []        |
| dataKey       | 项唯一标识键           | `string \| ((item: any) => string)`              | 'id'      |
| keeps         | 常驻DOM数量          | `number`                                         | 25        |
| thresholdTop  | 顶部预加载阈值（像素）      | `number`                                         | 0         |
| thresholdBottom | 底部预加载阈值（像素）     | `number`                                         | 0         |
| direction     | 滚动方向             | `'vertical' \| 'horizontal'`                     | 'vertical'|
| headerSize    | 头部固定区域高度        | `number`                                         | 0         |
| footerSize    | 尾部固定区域高度        | `number`                                         | 0         |
| estimateSize  | 预估条目尺寸（像素）       | `number`                                         | 32        |
| shepherdElement | 关联滚动元素         | `HTMLElement`                                    | -         |
| scrollToIndex | 滚动到指定索引         | `number`                                         | -         |
| scrollToOffset | 滚动到指定偏移量（像素）   | `number`                                         | -         |
| headerRender  | 头部固定区域渲染模板      | `() => SvelteSnippet`                            | -         |
| mainItemRender | 主项内容渲染模板       | `(item: any) => SvelteSnippet`                   | -         |
| footerRender  | 尾部固定区域渲染模板      | `() => SvelteSnippet`                            | -         |
| onRangeChange | 可视区域变化回调        | (range: [`VirtualRange`](#virtualrange)) => void | -         |

### VirtualRange
```typescript
interface VirtualRange {
  start: number;    // 可见起始索引
  end: number;      // 可见结束索引 
  padFront: number; // 前方填充空间（像素）
  padBehind: number;// 后方填充空间（像素）
}
```

## 最佳实践
1. 设置合理的`estimateSize`提升初始渲染性能
2. 使用`keeps`控制内存占用（建议值：可视条目数×2）
3. 动态数据使用`onItemResize`动作通知尺寸变化
4. 结合`scrollToIndex`实现精准定位
5. 固定元素使用独立渲染片段（header/footer）
