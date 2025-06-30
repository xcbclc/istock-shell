<!--
@component
ShTable 表格组件

一个功能完整的数据表格组件，基于原生 HTML table 元素构建。
支持多种数据格式、行选择、操作按钮、自定义渲染等丰富功能。
提供完整的表格结构（caption、colgroup、thead、tbody、tfoot）和响应式设计。

功能特性：
- 基于原生 table 元素，保持最佳性能和语义化
- 支持多种数据格式（对象数组、二维数组、嵌套结构）
- 支持行选择功能（单选/多选/全选）
- 支持自定义列配置和单元格渲染
- 支持操作按钮列和事件处理
- 支持表格标题、描述和空状态显示
- 支持表头、表体、表脚的完整结构
- 支持响应式设计和自适应布局
- 支持行点击事件和悬停效果
- 支持区域高度同步和滚动联动
- 继承所有原生 table 元素属性
- 完整的 TypeScript 类型安全
- 灵活的样式定制和主题支持

示例用法：
```svelte
<script lang="ts">
  import { ShTable } from '@istock-shell/ui';
</script>

<p>基础数据表格</p>
<ShTable
  data={[
    { name: '张三', age: 25, email: 'zhangsan@example.com' },
    { name: '李四', age: 30, email: 'lisi@example.com' }
  ]}
  cols={[
    { key: 'name', title: '姓名' },
    { key: 'age', title: '年龄' },
    { key: 'email', title: '邮箱' }
  ]}
/>

<p>带选择功能的表格</p>
<ShTable
  data={tableData}
  cols={columns}
  selection={true}
  bind:selected={selectedRows}
  rowKey="id"
  onRowSelectAll={handleSelectAll}
  onRowSelect={handleRowSelect}
/>

<p>带操作按钮的表格</p>
<ShTable
  data={tableData}
  cols={columns}
  buttons={[
    { text: '编辑', color: 'primary', onClickValue: handleEdit },
    { text: '删除', color: 'error', onClickValue: handleDelete }
  ]}
  buttonConfig={{ columnTitle: '操作' }}
/>

<p>完整功能表格</p>
<ShTable
  caption={{ title: '用户列表', description: '系统中的所有用户信息' }}
  data={tableData}
  cols={columns}
  selection={true}
  buttons={actionButtons}
  emptyText="暂无数据"
  size="md"
  hover={true}
  onRowClick={handleRowClick}
/>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes, HTMLColAttributes, HTMLTableAttributes } from 'svelte/elements';
  import type { Attachment } from 'svelte/attachments';
  import { TableVariantConfig, TableCaptionVariantConfig } from '../../../theme/config';
  import type {
    TableTrProps,
    TableTrTh,
    TableTrButtonConfig,
    TableTrButton,
  } from './TableRow.svelte';

  const tableVariantConfig = TableVariantConfig;
  const tableCaptionVariantConfig = TableCaptionVariantConfig;

  /**
   * 表格尺寸类型（从主题配置中动态提取）
   * 支持多种尺寸规格，影响表格的整体大小和间距
   * @typedef {keyof TableVariantConfig['variants']['size']} TableSize
   */
  export type TableSize = keyof (typeof tableVariantConfig)['variants']['size'];

  /**
   * 表格标题尺寸类型（从主题配置中动态提取）
   * 控制表格标题的字体大小和间距
   * @typedef {keyof TableCaptionVariantConfig['variants']['size']} TableCaptionSize
   */
  export type TableCaptionSize = keyof (typeof tableCaptionVariantConfig)['variants']['size'];

  /**
   * 表格数据列表类型定义
   * 支持多种数据结构：对象数组、行配置数组、混合格式
   * 提供灵活的数据输入方式，自动适配不同的数据源
   */
  export type TableDataList = Array<Record<string, any> | TableTrProps['list'] | TableTrProps>;

  /**
   * 列配置接口
   * 继承原生 col 元素的所有属性，用于定义表格列的宽度和样式
   * 通过 colgroup 元素应用到表格中
   */
  export interface TableCol extends HTMLColAttributes {}

  /**
   * 表头行配置接口
   * 继承原生 tr 元素的所有属性，并扩展表头特有的配置
   */
  export interface TableTheadTr extends HTMLAttributes<HTMLTableRowElement> {
    /** 表头单元格配置数组，定义每个表头单元格的属性和内容 */
    list: TableTrTh[];
  }

  /**
   * 表头配置类型
   * 支持简写格式（直接传入单元格数组）或完整格式（包含行属性的对象）
   */
  export type TableThead = TableTheadTr['list'] | TableTheadTr;

  /**
   * 表格区域类型
   * 用于标识表格的不同区域，支持高度监听和样式控制
   */
  export type TableArea = 'header' | 'footer';

  /**
   * 表格组件属性接口
   * 继承原生 table 元素的所有属性，并扩展表格特有的功能和配置
   */
  export interface TableProps extends HTMLTableAttributes {
    /** 表格标题，显示在表格顶部的 caption 元素中 */
    caption?: string;
    /** 表头配置，支持简写格式或完整的行配置对象 */
    thead?: TableThead;
    /** 表格主体数据，支持对象数组、行配置数组等多种格式 */
    tbody?: TableDataList;
    /** 表格脚注数据，格式与 tbody 相同，显示在表格底部 */
    tfoot?: TableDataList;
    /** 列配置数组，用于定义表格列的宽度和样式（colgroup） */
    cols?: TableCol[];
    /** 表格尺寸规格，影响整体大小和间距 */
    size?: TableSize;
    /** 是否固定行，需要配合 CSS 样式实现粘性定位效果 */
    pinRows?: boolean;
    /** 是否固定列，需要配合 CSS 样式实现粘性定位效果 */
    pinCols?: boolean;
    /** 是否启用斑马纹样式，交替显示不同背景色的行 */
    zebra?: boolean;
    /** 是否启用悬停高亮效果，鼠标悬停时高亮显示当前行 */
    hover?: boolean;
    /** 行操作按钮配置数组，在每行末尾显示操作按钮 */
    buttons?: TableTrButton[];
    /** 按钮列的全局配置，包括列标题和单元格类型 */
    buttonConfig?: TableTrButtonConfig;
    /** 是否启用行选择功能，显示复选框支持单选和多选 */
    selection?: boolean;
    /** 已选中的行数据数组，支持双向绑定 */
    selected?: unknown[];
    /** 行唯一标识键名或函数，用于确定行的唯一性和选择状态 */
    rowKey?: string | ((record: Record<string, any>) => string);
    /** 行渲染完成后的回调函数，接收 DOM 节点和行索引 */
    onRender?: (node: HTMLElement, index: number) => void;
    /** 行选择状态变更回调函数，提供详细的选择信息 */
    onRowSelect?: <T = any>(
      index: number,
      checked: boolean,
      selected: T[],
      rawSelected: TableDataList
    ) => void;
    /** 全选状态变更回调函数，当全选复选框状态改变时触发 */
    onRowSelectAll?: (checked: boolean) => void;
    /** 行点击事件回调函数，接收行数据和索引 */
    onRowClick?: (data: TableDataList['0'], index: number) => void;
    /** 表格区域高度变化监听回调，用于实现固定布局等功能 */
    onSyncAreaHeight?: (area: TableArea, height: number) => void;
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc, isArray, isFunction } from '@istock-shell/util';
  import ShTableRow from './TableRow.svelte';
  import { ShCheckbox, ShText } from '../../index';
  import ShTableTh from './TableTh.svelte';

  let {
    caption, // 表格标题文本
    thead = [], // 表头配置数据
    tbody = [], // 表格主体数据
    tfoot = [], // 表格脚注数据
    cols = [], // 列配置数组
    size, // 表格尺寸规格
    pinRows = false, // 是否固定行
    pinCols = false, // 是否固定列
    zebra = false, // 是否启用斑马纹
    hover = false, // 是否启用悬停效果
    rowKey, // 行唯一标识键
    selected = $bindable([]), // 选中行数据（双向绑定）
    selection = false, // 是否启用行选择
    buttons = [], // 行操作按钮配置
    buttonConfig = {}, // 按钮列全局配置
    onRender, // 行渲染回调
    onRowSelect, // 行选择回调
    onRowSelectAll, // 全选回调
    onRowClick, // 行点击回调
    onSyncAreaHeight, // 区域高度监听回调
    class: className = '', // 自定义CSS类名
    children, // 子内容插槽
    ...otherProps // 其他透传给原生 table 元素的属性
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

  /**
   * 表格样式变体配置
   * 使用 tailwind-variants 定义不同状态下的样式类
   */
  const tableVariant = tv(tableVariantConfig, {});
  const tableCaptionVariant = tv(tableCaptionVariantConfig, {});

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

  const captionAttachment: Attachment = (element: HTMLTableCaptionElement) => {
    onSyncAreaHeight?.('header', element.offsetHeight);
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
      <caption
        {@attach captionAttachment}
        class={tuc(['py-2 font-semibold', tableCaptionVariant({ size })])}>{caption}</caption
      >
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
      <ShTableRow
        type="thead"
        {selectionRender}
        {selection}
        {buttons}
        {buttonConfig}
        {...theadProps}
      />
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
