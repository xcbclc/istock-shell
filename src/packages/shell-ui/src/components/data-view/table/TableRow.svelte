<!--
@component
表格行组件，处理行级逻辑：
- 选择状态管理
- 按钮操作集成
- 单元格类型自动判断
- 悬停交互处理
-->

<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { Action } from 'svelte/action';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ButtonProps } from '../../index';
  import type { TableThProps } from './TableTh.svelte';
  import type { TableTdProps } from './TableTd.svelte';

  export type TableTrItem = (TableThProps | TableTdProps) & { tag?: 'th' | 'td' }; // 单元格联合类型（表头/数据）
  export type TableTrTh = TableThProps & { tag?: 'th' | 'td' }; // 表头单元格扩展类型
  export type TableTrTd = TableTdProps & { tag?: 'th' | 'td' }; // 数据单元格扩展类型

  // 按钮配置接口
  export interface TableTrButtonConfig {
    tag?: 'th' | 'td'; // 按钮列单元格类型
    columnTitle?: string; // 按钮列标题
  }

  // 行按钮属性（继承按钮属性并扩展）
  export type TableTrButton = ButtonProps<'button' | 'a'> & {
    onClickValue?: (value: any, index: number) => void; // 带值的点击回调
  };

  // 行组件属性接口
  export interface TableTrProps extends HTMLAttributes<HTMLTableRowElement> {
    tag?: 'th' | 'td'; // 默认单元格类型
    type?: 'thead' | 'tbody' | 'tfoot'; // 行所属表格区域
    list?: TableTrItem[]; // 单元格配置列表
    hover?: boolean; // 悬停效果开关
    dataIndex?: number; // 行索引位置
    selection?: boolean; // 是否显示选择框
    selected?: unknown[]; // 绑定选中状态数组
    rowKey?: string | ((record: Record<string, any>) => string); // 行唯一标识键
    rowValue?: Record<string, any> | TableTrProps['list'] | TableTrProps; // 行数据值
    buttons?: TableTrButton[]; // 操作按钮配置数组
    buttonConfig?: TableTrButtonConfig; // 按钮列全局配置
    selectionRender?: () => ReturnType<Snippet<[]>>; // 自定义选择框渲染
    onRender?: (node: HTMLElement) => void; // 行渲染回调
    onRowSelectChange?: (checked: boolean) => void; // 行选择状态变更回调
  }
</script>

<script lang="ts">
  import { tuc, isFunction } from '@istock-shell/util';
  import ShTableTh from './TableTh.svelte';
  import ShTableTd from './TableTd.svelte';
  import { ShCheckbox, ShButton } from '../../index';

  let {
    tag,
    type = 'tbody',
    list = [],
    hover,
    selection = false,
    selected = $bindable([]),
    rowKey,
    rowValue,
    dataIndex,
    buttons = [],
    buttonConfig = {},
    onRender,
    onRowSelectChange,
    selectionRender,
    children,
    class: className = '',
    ...otherProps
  }: TableTrProps = $props();
  const render: Action<HTMLElement> = (node: HTMLElement) => {
    onRender?.(node);
  };

  // 计算当前行唯一标识值（响应式派生状态）
  const selectValue: unknown = $derived.by(() => {
    if (!rowKey) return list[0]?.value; // 无rowKey时取首单元格值
    return list.find((item) => item.dataKey === (isFunction(rowKey) ? rowKey({ list }) : rowKey))?.value; // 根据rowKey配置查找对应值
  });

  // 处理行选择状态变更
  const onRowSelectChangeHandle = (checked: boolean) => {
    if (checked && !selected.includes(selectValue)) {
      selected = [...selected, selectValue]; // 添加选中项
      onRowSelectChange?.(checked);
    }
    if (!checked && selected.includes(selectValue)) {
      selected = selected.filter((v) => v !== selectValue); // 移除选中项
      onRowSelectChange?.(checked);
    }
  };
</script>

<tr
  use:render
  {...otherProps}
  class={[
    hover ? tuc('hover:bg-base-300') : '',
    selectValue && selected.includes(selectValue) ? tuc('bg-base-300') : '',
    className,
  ]}
>
  {#if children}
    {@render children()}
  {:else}
    <!-- 选择列渲染 -->
    {#if selection}
      {#if selectionRender}
        {@render selectionRender()} <!-- 自定义选择框 -->
      {:else}
        <ShTableTh>
          <ShCheckbox
            value={selected.includes(selectValue) ? [true] : []}
            options={[{ label: '', value: true }]}
            onChangeValue={(value) => {
              onRowSelectChangeHandle(!!value[0]);
            }}
          />
        </ShTableTh>
      {/if}
    {/if}

    <!-- 动态渲染单元格 -->
    {#each list as item}
      {@const useTh = item.tag ? item.tag === 'th' : tag === 'th'}
      {#if useTh || (!item.tag && !tag && type === 'thead')}
        <ShTableTh {...item} /> <!-- 表头单元格 -->
      {:else}
        <ShTableTd {...item} /> <!-- 数据单元格 -->
      {/if}
    {/each}

    <!-- 表头按钮列标题 -->
    {#if type === 'thead' && buttons?.length}
      {#if buttonConfig.tag === 'th'}
        <ShTableTh>
          {buttonConfig.columnTitle ?? ''}
          <!-- 显示配置的列标题 -->
        </ShTableTh>
      {:else}
        <ShTableTd>
          <ShTableTh>
            {buttonConfig.columnTitle ?? ''}
            <!-- 嵌套表头显示 -->
          </ShTableTh>
        </ShTableTd>
      {/if}
    {/if}

    <!-- 表格主体按钮列 -->
    {#if type === 'tbody' && buttons?.length}
      {#if buttonConfig.tag === 'th'}
        <ShTableTh>
          <!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
          {@render buttonsRender()}
        </ShTableTh>
      {:else}
        <ShTableTd>
          <!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
          {@render buttonsRender()}
        </ShTableTd>
      {/if}
    {/if}
  {/if}
</tr>

<!-- 按钮组渲染代码片段 -->
{#snippet buttonsRender()}
  <div class={tuc('flex gap-2')}>
    {#each buttons as btn}
      {@const { onClickValue, onclick, ...otherBtn } = btn}
      <ShButton
        size="xs"
        {...otherBtn}
        onclick={(
          event: Event &
            MouseEvent & { currentTarget: EventTarget & HTMLButtonElement } & {
              currentTarget: EventTarget & HTMLAnchorElement;
            }
        ) => {
          onclick?.(event);
          onClickValue?.(rowValue, dataIndex ?? 0);
        }}
      />
    {/each}
  </div>
{/snippet}
