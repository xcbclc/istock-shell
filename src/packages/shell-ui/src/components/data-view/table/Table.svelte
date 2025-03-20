<!--
@component
表格组件，用于展示结构化数据。支持以下功能：
- 多种表格尺寸配置
- 固定行列、斑马纹、悬停高亮等样式控制
- 表头、表体、表脚的分区配置
- 列宽配置（colgroup支持）
- 行选择功能（单选/全选）
- 自定义操作按钮配置
- 行点击事件处理
- 空数据状态提示
- 服务端渲染支持（onRender回调）

用法示例:
```html
<ShTable
  thead={[
    { label: "姓名", dataKey: "name" },
    { label: "年龄", dataKey: "age" }
  ]}
  tbody={[
    { name: "张三", age: 25 },
    { name: "李四", age: 30 }
  ]}
  size="md"
  zebra
  hover
  selection
  onRowClick={(row) => console.log(row)}
/>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes, HTMLColAttributes, HTMLTableAttributes } from 'svelte/elements';
  import { TableVariantConfig } from '../../../theme/config';
  import type { TableTrProps, TableTrTh, TableTrButtonConfig, TableTrButton } from './TableRow.svelte';

  const tableVariantConfig = TableVariantConfig;

  /* 表格尺寸类型定义（继承自主题配置） */
  export type TableSize = keyof (typeof tableVariantConfig)['variants']['size'];

  /* 表格数据格式（支持多种数据结构） */
  export type TableDataList = Array<Record<string, any> | TableTrProps['list'] | TableTrProps>;

  /* 列配置接口（继承col元素属性） */
  export interface TableCol extends HTMLColAttributes {}

  /* 表头行配置接口 */
  export interface TableTheadTr extends HTMLAttributes<HTMLTableRowElement> {
    list: TableTrTh[]; // 表头单元格配置数组
  }

  export type TableThead = TableTheadTr['list'] | TableTheadTr;

  /* 表格主配置接口（继承table元素属性） */
  export interface TableProps extends HTMLTableAttributes {
    caption?: string; // 表格标题
    thead?: TableThead; // 表头配置（支持简写格式）
    tbody?: TableDataList; // 表格主体数据
    tfoot?: TableDataList; // 表格脚注数据
    cols?: TableCol[]; // 列配置（用于colgroup）
    size?: TableSize; // 表格尺寸
    pinRows?: boolean; // 固定行（需要配合样式使用）
    pinCols?: boolean; // 固定列（需要配合样式使用）
    zebra?: boolean; // 斑马纹样式
    hover?: boolean; // 悬停高亮
    buttons?: TableTrButton[]; // 行操作按钮配置
    buttonConfig?: TableTrButtonConfig; // 按钮全局配置
    selection?: boolean; // 启用行选择
    selected?: unknown[]; // 已选中的行数据
    rowKey?: string | ((record: Record<string, any>) => string); // 行唯一标识取值key
    onRender?: (node: HTMLElement, index: number) => void; // 行渲染回调
    onRowSelect?: <T = any>(index: number, checked: boolean, selected: T[], rawSelected: TableDataList) => void; // 行选择回调
    onRowSelectAll?: (checked: boolean) => void; // 全选回调
    onRowClick?: (data: TableDataList['0'], index: number) => void; // 行点击回调
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc, isArray, isFunction } from '@istock/util';
  import ShTableRow from './TableRow.svelte';
  import { ShCheckbox, ShText } from '../../index';
  import ShTableTh from './TableTh.svelte';

  let {
    caption,
    thead = [],
    tbody = [],
    tfoot = [],
    cols = [],
    size,
    pinRows = false,
    pinCols = false,
    zebra = false,
    hover = false,
    rowKey,
    selected = $bindable([]),
    selection = false,
    buttons = [],
    buttonConfig = {},
    onRender,
    onRowSelect,
    onRowSelectAll,
    onRowClick,
    class: className = '',
    children,
    ...otherProps
  }: TableProps = $props();

  // 派生表头属性（统一处理简写格式）
  const theadProps: TableTheadTr = $derived.by(() => {
    if ('list' in thead) return thead; // 已经是完整格式直接返回
    return { list: thead }; // 简写格式转换为标准格式
  });

  // 派生表体属性（处理多种数据格式）
  const tbodyProps: TableTrProps[] = $derived.by(() => {
    return tbody.map((tb = []) => {
      if ('list' in tb && isArray(tb.list)) {
        return tb;
      } // 已经是标准格式直接返回
      if (isArray(tb)) return { list: tb }; // 数组格式转换为标准格式

      // 对象格式自动映射到表头配置
      return {
        list: theadProps.list.map((item) => ({
          value: item.dataKey ? (tb as Record<string, any>)[item.dataKey] : undefined,
          dataKey: item.dataKey,
        })),
      };
    });
  });

  const tfootProps: TableTrProps[] = $derived.by(() => {
    return tfoot.map((tf = []) => {
      if ('list' in tf && isArray(tf.list)) {
        return tf;
      }
      if (isArray(tf)) {
        return { list: tf };
      }
      return {
        list: theadProps.list.map((item) => {
          return {
            value: item.dataKey ? (tf as Record<string, any>)[item.dataKey] : undefined,
          };
        }),
      };
    });
  });

  const tableVariant = tv(tableVariantConfig, {
    responsiveVariants: ['size'], // 响应式尺寸变体
  });

  // 全选状态数组（用于控制表头复选框）
  let selectAllRow = $state<boolean[]>([]);

  /**
   * 处理全选/全不选操作
   * @param checked - 是否选中全选复选框
   */
  const onRowSelectAllChangeHandle = (checked: boolean) => {
    // 当选中全选且当前选中数量不等于数据总数时
    if (checked && selected.length !== tbodyProps.length) {
      // 映射所有行数据生成选中值数组
      selected = tbodyProps.map((item) => {
        if (!item.list) item.list = [];
        if (!rowKey) return item.list[0]?.value;
        // 动态获取行唯一标识（支持函数式rowKey）
        const rowKeyStr = isFunction(rowKey) ? rowKey({ list: item.list }) : rowKey;
        // 查找匹配dataKey的单元格值
        return item.list.find((item) => item.dataKey === rowKeyStr)?.value;
      });
      // 触发全选回调（选中状态为true）
      onRowSelectAll?.(true);
    }
    // 当取消全选且当前有选中项时
    if (!checked && selected.length) {
      selected = []; // 清空选中数组
      onRowSelectAll?.(false); // 触发全选回调（选中状态为false）
    }
  };

  /**
   * 处理单行选择状态变化
   * @param index - 当前行索引
   * @param checked - 当前行是否选中
   */
  const onRowSelectChangeHandle = (index: number, checked: boolean) => {
    // 同步全选复选框状态
    if (selected.length === tbodyProps.length) {
      if (!selectAllRow[0]) selectAllRow = [true]; // 全部选中时设置全选状态
    } else {
      if (selectAllRow[0]) selectAllRow = []; // 非全选时清除全选状态
    }

    // 生成原始选中行数据（用于回调参数）
    const rawSelectedRows = tbodyProps
      .map((item) => {
        if (!item.list) item.list = [];
        let value: any;
        if (rowKey) {
          // 动态获取行唯一标识
          const rowKeyStr = isFunction(rowKey) ? rowKey({ list: item.list }) : rowKey;
          value = item.list.find((item) => item.dataKey === rowKeyStr)?.value;
        } else {
          value = item.list[0]?.value; // 默认取第一个单元格值
        }
        // 返回匹配选中值的索引
        return selected.includes(value) ? index : null;
      })
      .filter((t) => t !== null) // 过滤无效索引
      .map((i) => tbody[i]); // 转换为原始数据

    // 触发行选择回调
    onRowSelect?.(index, checked, selected, rawSelectedRows);
  };
</script>

<!-- 表格容器 -->
<table class={[tuc(tableVariant({ size, pinRows, pinCols, zebra })), className]} {...otherProps}>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children()}
  {:else}
    <!-- 渲染表格标题 -->
    {#if caption}
      <caption>{caption}</caption>
    {/if}

    <!-- 渲染列配置 -->
    {#if cols.length}
      <colgroup>
        {#each cols as col}
          <col {...col} />
        {/each}
      </colgroup>
    {/if}
  {/if}

  <!-- 表头区域 -->
  {#if theadProps.list.length}
    <thead>
      <!-- 选择列渲染片段 -->
      {#snippet selectionRender()}
        <ShTableTh>
          <ShCheckbox
            bind:value={selectAllRow}
            options={[{ label: '', value: true }]}
            indeterminate={selected.length > 0 && selected.length < tbodyProps.length}
            onclick={() => {
              onRowSelectAllChangeHandle(!selectAllRow[0]);
            }}
          />
        </ShTableTh>
      {/snippet}

      <!-- 表头行组件 -->
      <ShTableRow type="thead" {selectionRender} {selection} {buttons} {buttonConfig} {...theadProps} />
    </thead>
  {/if}

  <!-- 表体区域 -->
  {#if tbodyProps.length}
    <tbody>
      {#each tbodyProps as tbProps, tIndex}
        {@const { onclick, ...otherTbProps } = tbProps}
        <ShTableRow
          dataIndex={tIndex}
          onRender={(node) => {
            onRender?.(node, tIndex);
          }}
          onRowSelectChange={(checked) => {
            onRowSelectChangeHandle(tIndex, checked);
          }}
          rowValue={tbody[tIndex]}
          {hover}
          {rowKey}
          bind:selected
          {selection}
          {buttons}
          {buttonConfig}
          {...otherTbProps}
          onclick={(event) => {
            onclick?.(event);
            onRowClick?.(tbody[tIndex], tIndex);
          }}
        />
      {/each}
    </tbody>
  {/if}

  <!-- 空数据状态 -->
  {#if !children && !tbodyProps.length}
    <tbody>
      <tr>
        <td colspan={theadProps.list?.length ?? 0}>
          <ShText texts={[{ text: '暂无数据', color: 'info' }]} align="center" />
        </td>
      </tr>
    </tbody>
  {/if}

  <!-- 表脚区域 -->
  {#if tfootProps.length}
    <tfoot>
      {#each tfootProps as tfProps}
        <ShTableRow {...tfProps} />
      {/each}
    </tfoot>
  {/if}
</table>
