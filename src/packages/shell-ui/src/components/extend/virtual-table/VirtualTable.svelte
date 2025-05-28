<!--
@component
虚拟表格组件，结合虚拟列表与表格渲染，适用于大数据量表格的高性能滚动渲染。
- 支持大数据集的高效渲染，仅渲染可见区间行
- 自动同步表头高度，支持固定表头
- 支持自定义表格属性与行渲染
- 可监听可视区间变化，便于懒加载或联动
- 支持行尺寸自适应（通过 onRender 回调）
- 用法示例：
```html
<VirtualTable
  tbody={largeTableData}
  size="md"
  pinRows={true}
  columns={columns}
/>
```
-->

<script lang="ts" module>
  // 引入依赖组件与类型
  import { ShVirtualList, ShTable, type TableProps, type VirtualCoreRange, type TableArea } from '../../index';
  // 虚拟表格行数据类型，要求有唯一 id
  export interface VirtualTableListItem {
    id: string;
    [k: string]: any;
  }
  export interface VirtualTableProps extends TableProps {}
</script>

<script lang="ts">
  const { tbody = [], size = 'sm', pinRows = true, ...tableProps }: VirtualTableProps = $props();

  // 当前可视区域范围状态（用于跟踪渲染区间）
  let range: VirtualCoreRange | undefined = $state();

  // 表头高度（用于虚拟列表头部占位）
  let headerSize: number = $state(0);

  // 虚拟列表组件实例引用（用于调用组件方法，如 onItemResize）
  let virtualList: ShVirtualList;

  // 规范化数据源，确保每一行都有唯一 id
  const list: VirtualTableListItem[] = $derived.by(() => {
    return tbody.map((item, index) => {
      if (item && 'id' in item) return item as VirtualTableListItem;
      return { ...(item ?? {}), id: `${index + 1}` } satisfies VirtualTableListItem;
    });
  });

  // 当前可见区间的 tbody 数据（用于表格渲染）
  const rangeTbody = $derived.by(() => {
    return tbody.slice(range?.start ?? 0, (range?.end ?? 0) + 1);
  });

  // 可视区域变化回调（当用户滚动时触发，更新 range）
  const onRangeChange = (newRange: VirtualCoreRange) => {
    range = newRange; // 更新当前可见范围
  };

  // 列表项尺寸变化回调（当元素尺寸变化时通知虚拟列表）
  const onItemResize = (node: HTMLElement, index: number) => {
    const id = list[index]?.id;
    virtualList?.onItemResize(node, id); // 调用虚拟列表的尺寸更新方法
  };

  // 表头高度同步回调（用于虚拟列表头部占位）
  const onSyncAreaHeight = (area: TableArea, height: number) => {
    if (area === 'header') {
      headerSize = height;
    }
  };
</script>

<!--
  组件结构说明：
  - 外层为虚拟列表组件 ShVirtualList，负责高效渲染和滚动管理
  - 内部通过 ShTable 渲染当前可见区间的表格行
  - 通过 onRangeChange、onRender、onSyncAreaHeight 实现联动与自适应
-->
<ShVirtualList bind:this={virtualList} {list} {onRangeChange} {headerSize} thresholdTop={40} class="w-full max-h-160">
  {#if range}
    <ShTable {...tableProps} tbody={rangeTbody} {size} {pinRows} onRender={onItemResize} {onSyncAreaHeight} />
  {/if}
</ShVirtualList>
