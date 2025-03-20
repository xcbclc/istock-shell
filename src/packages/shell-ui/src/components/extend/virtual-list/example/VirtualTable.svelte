<script lang="ts">
  import {
    ShVirtualList,
    ShTable,
    type VirtualListProps,
    type VirtualCoreRange,
    type TableThead,
  } from '@istock/shell-ui';

  type ListData = {
    id: string;
    [k: string]: any;
  };

  const list: ListData[] = $state(
    Array.from({ length: 10000 }).map((_, index) => {
      return {
        id: `${index + 1}`,
        名称: '贵州茅台',
        代码: 'SH600519',
        最新价: '1604.00',
        涨跌额: ' -31.71',
        涨跌幅: '-1.94%',
        总市值: '20149.41亿',
        成交量: '3.67万手',
        成交额: '   59.04亿',
      };
    })
  );

  const thead: TableThead = [
    { value: '编号', dataKey: 'id' },
    { value: '名称', dataKey: '名称' },
    { value: '代码', dataKey: '代码' },
    { value: '最新价', dataKey: '最新价' },
    { value: '涨跌额', dataKey: '涨跌额' },
    { value: '涨跌幅', dataKey: '涨跌幅' },
    { value: '总市值（亿）', dataKey: '总市值' },
    { value: '成交量（万手）', dataKey: '成交量' },
    { value: '成交额（亿）', dataKey: '成交额' },
  ];

  const tbody: ListData[] = $derived.by(() => {
    return list.slice(range?.start ?? 0, (range?.end ?? 0) + 1);
  });

  // 当前可视区域范围状态（用于跟踪渲染区间）
  let range: VirtualCoreRange | undefined = $state();

  // 虚拟列表组件实例引用（用于调用组件方法）
  let virtualList: ShVirtualList;

  // 可视区域变化回调（当用户滚动时触发）
  const onRangeChange = (newRange: VirtualCoreRange) => {
    range = newRange; // 更新当前可见范围
  };

  // 列表项尺寸变化回调（当元素尺寸变化时通知虚拟列表）
  const onItemResize = (node: HTMLElement, index: number) => {
    const id = tbody[index]?.id;
    virtualList?.onItemResize(node, id); // 调用虚拟列表的尺寸更新方法
  };
</script>

<ShVirtualList bind:this={virtualList} {list} {onRangeChange} thresholdTop={40} class="w-full max-h-100">
  {#if range}
    <ShTable {thead} {tbody} onRender={onItemResize} pinRows size="sm" />
  {/if}
</ShVirtualList>
