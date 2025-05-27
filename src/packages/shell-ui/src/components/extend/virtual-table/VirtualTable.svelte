<script lang="ts" module>
  import { ShVirtualList, ShTable, type TableProps, type VirtualCoreRange, type TableArea } from '../../index';
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

  let headerSize: number = $state(0);

  // 虚拟列表组件实例引用（用于调用组件方法）
  let virtualList: ShVirtualList;

  const list: VirtualTableListItem[] = $derived.by(() => {
    return tbody.map((item, index) => {
      if (item && 'id' in item) return item as VirtualTableListItem;
      return { ...(item ?? {}), id: `${index + 1}` } satisfies VirtualTableListItem;
    });
  });

  const rangeTbody = $derived.by(() => {
    return tbody.slice(range?.start ?? 0, (range?.end ?? 0) + 1);
  });

  // 可视区域变化回调（当用户滚动时触发）
  const onRangeChange = (newRange: VirtualCoreRange) => {
    range = newRange; // 更新当前可见范围
  };

  // 列表项尺寸变化回调（当元素尺寸变化时通知虚拟列表）
  const onItemResize = (node: HTMLElement, index: number) => {
    const id = list[index]?.id;
    virtualList?.onItemResize(node, id); // 调用虚拟列表的尺寸更新方法
  };

  const onSyncAreaHeight = (area: TableArea, height: number) => {
    if (area === 'header') {
      headerSize = height;
    }
  };
</script>

<ShVirtualList bind:this={virtualList} {list} {onRangeChange} {headerSize} thresholdTop={40} class="w-full max-h-160">
  {#if range}
    <ShTable {...tableProps} tbody={rangeTbody} {size} {pinRows} onRender={onItemResize} {onSyncAreaHeight} />
  {/if}
</ShVirtualList>
