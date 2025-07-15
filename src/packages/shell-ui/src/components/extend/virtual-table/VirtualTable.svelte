<!--
@component
ShVirtualTable 虚拟表格组件

一个高性能的虚拟表格组件，结合虚拟列表与表格渲染技术，专为大数据量表格的高效滚动渲染而设计。
基于虚拟化技术，仅渲染可视区域内的表格行，大幅提升大数据量表格场景下的渲染性能。

功能特性：
- 支持大数据集的高效虚拟化渲染，仅渲染可见区间的表格行
- 自动同步表头高度，支持固定表头功能
- 支持自定义表格属性与行渲染配置
- 提供可视区间变化监听，便于实现懒加载或数据联动
- 支持行尺寸自适应，通过onRender回调动态调整
- 继承所有表格组件的属性和功能
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShVirtualTable } from '@istock-shell/ui';

  const largeTableData = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `用户 ${i}`,
    email: `user${i}@example.com`,
    status: i % 2 === 0 ? '活跃' : '非活跃'
  }));

  const columns = [
    { key: 'name', title: '姓名', width: 120 },
    { key: 'email', title: '邮箱', width: 200 },
    { key: 'status', title: '状态', width: 100 }
  ];
</script>

<p>基础虚拟表格</p>
<ShVirtualTable
  tbody={largeTableData}
  columns={columns}
  size="md"
  pinRows={true}
/>

<p>自定义尺寸的虚拟表格</p>
<ShVirtualTable
  tbody={largeTableData}
  columns={columns}
  size="sm"
  pinRows={false}
  class="max-h-96"
/>
```
-->

<script lang="ts" module>
  import {
    ShVirtualList,
    ShTable,
    type TableProps,
    type VirtualCoreRange,
    type TableArea,
  } from '../../index';

  /**
   * 虚拟表格行数据项接口
   * 继承表格行的基础数据结构，要求每行数据必须包含唯一标识符
   * @typedef VirtualTableListItem
   */
  export interface VirtualTableListItem {
    /** 行数据的唯一标识符，用于虚拟列表的高效渲染和更新 */
    id: string;
    /** 其他任意属性，支持表格行的自定义数据字段 */
    [k: string]: any;
  }

  /**
   * 虚拟表格组件属性接口
   * 继承所有表格组件的属性，支持虚拟化渲染的大数据表格
   * @typedef {TableProps} VirtualTableProps
   */
  export interface VirtualTableProps extends TableProps {}
</script>

<script lang="ts">
  const {
    tbody = [], // 表格数据数组（默认空数组）
    size = 'sm', // 表格尺寸（默认小尺寸）
    pinRows = true, // 是否固定表头（默认启用）
    ...tableProps // 其他表格组件属性
  }: VirtualTableProps = $props();

  /** 当前可视区域范围状态，用于跟踪渲染区间 */
  let range: VirtualCoreRange = $state({
    start: 0,
    end: 0,
    totalHeight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  });

  /** 表头高度状态，用于虚拟列表头部占位，确保滚动时表头位置正确 */
  let headerSize: number = $state(0);

  /** 虚拟列表组件实例引用，用于调用组件方法如onItemResize */
  let virtualList: ShVirtualList;

  /** 规范化数据源，确保每一行都有唯一id，这是虚拟列表渲染的必要条件 */
  const list: VirtualTableListItem[] = $derived.by(() => {
    return tbody.map((item, index) => {
      // 检查数据项是否已包含id字段
      if (item && 'id' in item) return item as VirtualTableListItem;
      // 为没有id的数据项自动生成唯一标识符
      return { ...(item ?? {}), id: `${index + 1}` } satisfies VirtualTableListItem;
    });
  });

  /** 当前可见区间的tbody数据，用于表格渲染，仅包含可视区域内的行数据 */
  const rangeTbody = $derived.by(() => {
    // 根据可视区域范围切片原始数据，实现虚拟化渲染
    return tbody.slice(range.start, range.end + 1);
  });

  /**
   * 获取内容容器样式
   */
  const wrapStyle = $derived.by(() => {
    if (range && virtualList) {
      const height = `${range.totalHeight}px`;
      const padding = `${range.paddingTop}px 0 ${range.paddingBottom}px 0`;
      return `height: ${height}; padding: ${padding}`;
    }
    return '';
  });

  /**
   * 可视区域变化回调函数
   * 当用户滚动时触发，更新当前可见范围
   * @param newRange - 新的可视区域范围信息
   */
  const onRangeChange = (newRange: VirtualCoreRange) => {
    range = newRange; // 更新当前可见范围，触发表格重新渲染可见行
  };

  /**
   * 列表项尺寸变化回调函数
   * 当表格行高度变化时通知虚拟列表重新计算
   * @param node - 表格行DOM元素
   */
  const onItemResize = (node: HTMLElement) => {
    virtualList?.onItemResize(node); // 调用虚拟列表的尺寸更新方法
  };

  /**
   * 表头高度同步回调函数
   * 用于虚拟列表头部占位，确保固定表头正确显示
   * @param area - 表格区域类型
   * @param height - 区域高度
   */
  const onSyncAreaHeight = (area: TableArea, height: number) => {
    // 仅处理表头区域的高度变化
    if (area === 'header') {
      headerSize = height; // 更新表头高度，用于虚拟列表的头部占位计算
    }
  };
</script>

<!--
  组件结构说明：
  - 外层为虚拟列表组件 ShVirtualList，负责高效渲染和滚动管理
  - 内部通过 ShTable 渲染当前可见区间的表格行
  - 通过 onRangeChange、onRender、onSyncAreaHeight 实现联动与自适应
-->
<ShVirtualList bind:this={virtualList} {list} {onRangeChange} {headerSize} class="w-full max-h-160">
  <div class="virtual-main" style={wrapStyle}>
    <ShTable
      {...tableProps}
      tbody={rangeTbody}
      {size}
      {pinRows}
      onRender={onItemResize}
      {onSyncAreaHeight}
    />
  </div>
</ShVirtualList>
