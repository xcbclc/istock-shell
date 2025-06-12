<!--
  @component ShTableRow 表格行组件

  一个功能丰富的表格行组件，基于原生 HTML tr 元素构建。
  支持行选择、自定义单元格渲染、操作按钮列和丰富的交互功能。
  适用于表头、表体和表脚的统一行渲染。

  功能特性：
  - 基于原生 tr 元素，保持最佳性能和语义化
  - 支持行选择功能（复选框单选/多选）
  - 支持自定义单元格内容渲染
  - 支持操作按钮列配置和事件处理
  - 支持行点击事件和悬停效果
  - 支持表头、表体、表脚的统一渲染
  - 支持行唯一标识和选择状态管理
  - 继承所有原生 tr 元素属性
  - 完整的 TypeScript 类型安全
  - 灵活的行数据展示方式

  示例用法：
  ```svelte
  <script lang="ts">
    import { ShTableRow } from '@istock-shell/ui';
  </script>

  <p>基础表格行</p>
  <ShTableRow
    list={[
      { value: '张三', dataKey: 'name' },
      { value: 25, dataKey: 'age' },
      { value: 'zhangsan@example.com', dataKey: 'email' }
    ]}
  />

  <p>带选择功能的行</p>
  <ShTableRow
    list={rowData}
    selection={true}
    bind:selected={selectedRows}
    rowKey="id"
    onRowSelectChange={handleRowSelect}
  />

  <p>带操作按钮的行</p>
  <ShTableRow
    list={rowData}
    buttons={[
      { text: '编辑', color: 'primary', onClickValue: handleEdit },
      { text: '删除', color: 'error', onClickValue: handleDelete }
    ]}
    buttonConfig={{ columnTitle: '操作' }}
  />

  <p>表头行</p>
  <ShTableRow
    type="thead"
    list={[
      { value: '姓名', dataKey: 'name' },
      { value: '年龄', dataKey: 'age' },
      { value: '邮箱', dataKey: 'email' }
    ]}
    selection={true}
    selectionRender={customSelectionRender}
  />
  ```
-->

<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { Action } from 'svelte/action';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ButtonProps } from '../../index';
  import type { TableThProps } from './TableTh.svelte';
  import type { TableTdProps } from './TableTd.svelte';

  /**
   * 表格行单元格联合类型
   * 支持表头单元格和数据单元格的统一配置，并可指定单元格标签类型
   */
  export type TableTrItem = (TableThProps | TableTdProps) & { tag?: 'th' | 'td' };

  /**
   * 表格行表头单元格扩展类型
   * 基于表头单元格属性，并支持自定义标签类型
   */
  export type TableTrTh = TableThProps & { tag?: 'th' | 'td' };

  /**
   * 表格行数据单元格扩展类型
   * 基于数据单元格属性，并支持自定义标签类型
   */
  export type TableTrTd = TableTdProps & { tag?: 'th' | 'td' };

  /**
   * 表格行按钮列配置接口
   * 定义操作按钮列的全局配置选项
   */
  export interface TableTrButtonConfig {
    /** 按钮列单元格类型，决定使用 th 还是 td 元素 */
    tag?: 'th' | 'td';
    /** 按钮列标题文本，显示在表头的操作列中 */
    columnTitle?: string;
  }

  /**
   * 表格行按钮属性类型
   * 继承按钮组件的所有属性，并扩展行级操作的特有功能
   */
  export type TableTrButton = ButtonProps<'button' | 'a'> & {
    /** 带值的点击回调函数，接收行数据和行索引 */
    onClickValue?: (value: any, index: number) => void;
  };

  /**
   * 表格行组件属性接口
   * 继承原生 tr 元素的所有属性，并扩展表格行特有的功能和配置
   */
  export interface TableTrProps extends HTMLAttributes<HTMLTableRowElement> {
    /** 默认单元格类型，当单元格未指定类型时使用 */
    tag?: 'th' | 'td';
    /** 行所属的表格区域，影响渲染逻辑和样式 */
    type?: 'thead' | 'tbody' | 'tfoot';
    /** 单元格配置列表，定义行中每个单元格的属性和内容 */
    list?: TableTrItem[];
    /** 是否启用悬停效果，鼠标悬停时高亮显示 */
    hover?: boolean;
    /** 行在数据源中的索引位置 */
    dataIndex?: number;
    /** 是否显示行选择复选框 */
    selection?: boolean;
    /** 已选中的行数据数组，支持双向绑定 */
    selected?: unknown[];
    /** 行唯一标识键名或函数，用于确定行的唯一性 */
    rowKey?: string | ((record: Record<string, any>) => string);
    /** 行数据值，支持多种数据格式 */
    rowValue?: Record<string, any> | TableTrProps['list'] | TableTrProps;
    /** 操作按钮配置数组，在行末尾显示操作按钮 */
    buttons?: TableTrButton[];
    /** 按钮列的全局配置选项 */
    buttonConfig?: TableTrButtonConfig;
    /** 自定义选择框渲染函数，用于完全自定义选择列的内容 */
    selectionRender?: () => ReturnType<Snippet<[]>>;
    /** 行渲染完成后的回调函数，接收 DOM 节点 */
    onRender?: (node: HTMLElement) => void;
    /** 行选择状态变更回调函数，当行的选择状态改变时触发 */
    onRowSelectChange?: (checked: boolean) => void;
  }
</script>

<script lang="ts">
  import { tuc, isFunction } from '@istock-shell/util';
  import ShTableTh from './TableTh.svelte';
  import ShTableTd from './TableTd.svelte';
  import { ShCheckbox, ShButton } from '../../index';

  let {
    /** 默认单元格类型 */
    tag,
    /** 行所属的表格区域 */
    type = 'tbody',
    /** 单元格配置列表 */
    list = [],
    /** 是否启用悬停效果 */
    hover = false,
    /** 是否显示行选择复选框 */
    selection = false,
    /** 已选中的行数据数组（双向绑定） */
    selected = $bindable([]),
    /** 行唯一标识键 */
    rowKey,
    /** 行数据值 */
    rowValue,
    /** 行索引位置 */
    dataIndex,
    /** 操作按钮配置数组 */
    buttons = [],
    /** 按钮列全局配置 */
    buttonConfig = {},
    /** 行渲染回调 */
    onRender,
    /** 行选择状态变更回调 */
    onRowSelectChange,
    /** 自定义选择框渲染函数 */
    selectionRender,
    /** 子内容插槽，用于完全自定义行内容 */
    children,
    /** 自定义CSS类名 */
    class: className = '',
    /** 其他透传给原生 tr 元素的属性 */
    ...otherProps
  }: TableTrProps = $props();
  /**
   * 行渲染动作函数
   * 当行元素挂载到 DOM 时触发，用于执行自定义的渲染逻辑
   */
  const render: Action<HTMLElement> = (node: HTMLElement) => {
    onRender?.(node);
  };

  /**
   * 计算当前行的唯一标识值（响应式派生状态）
   * 根据 rowKey 配置从单元格列表中提取唯一标识值
   * 用于行选择状态的判断和管理
   */
  const selectValue: unknown = $derived.by(() => {
    if (!rowKey) return list[0]?.value; // 无 rowKey 时取首个单元格值作为标识
    // 根据 rowKey 配置查找对应的单元格值
    return list.find((item) => item.dataKey === (isFunction(rowKey) ? rowKey({ list }) : rowKey))?.value;
  });

  /**
   * 处理行选择状态变更
   * 根据选择状态更新选中数组，并触发相应的回调函数
   * @param checked - 当前行是否被选中
   */
  const onRowSelectChangeHandle = (checked: boolean) => {
    if (checked && !selected.includes(selectValue)) {
      selected = [...selected, selectValue]; // 添加到选中数组
      onRowSelectChange?.(checked);
    }
    if (!checked && selected.includes(selectValue)) {
      selected = selected.filter((v) => v !== selectValue); // 从选中数组中移除
      onRowSelectChange?.(checked);
    }
  };
</script>

<!--
  表格行容器
  使用 tr 元素作为表格行的根容器
  - use:render: 应用行渲染动作
  - class: 合并悬停效果、选中状态和自定义样式类
  - {...otherProps}: 透传所有其他原生 tr 属性
-->
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
    <!--
      自定义行内容渲染
      当提供子内容时，完全由用户控制行的结构和布局
      适用于需要复杂行展示或特殊交互的场景
    -->
    {@render children()}
  {:else}
    <!-- 选择列渲染 -->
    {#if selection}
      {#if selectionRender}
        <!--
          自定义选择框渲染
          使用用户提供的自定义渲染函数
        -->
        {@render selectionRender()}
      {:else}
        <!--
          默认选择框渲染
          使用标准的复选框组件实现行选择功能
        -->
        <ShTableTh>
          <ShCheckbox
            value={selected.includes(selectValue) ? [true] : []}
            options={[{ label: '', value: true }]}
            onChangeValue={(value: any[]) => {
              onRowSelectChangeHandle(!!value[0]);
            }}
          />
        </ShTableTh>
      {/if}
    {/if}

    <!--
      动态渲染单元格
      根据单元格配置列表和类型自动选择合适的单元格组件
    -->
    {#each list as item}
      {@const useTh = item.tag ? item.tag === 'th' : tag === 'th'}
      {#if useTh || (!item.tag && !tag && type === 'thead')}
        <!-- 渲染表头单元格 -->
        <ShTableTh {...item} />
      {:else}
        <!-- 渲染数据单元格 -->
        <ShTableTd {...item} />
      {/if}
    {/each}

    <!--
      表头按钮列标题渲染
      当行类型为表头且配置了操作按钮时，渲染按钮列的标题
    -->
    {#if type === 'thead' && buttons?.length}
      {#if buttonConfig.tag === 'th'}
        <ShTableTh>
          {buttonConfig.columnTitle ?? ''}
        </ShTableTh>
      {:else}
        <ShTableTd>
          <ShTableTh>
            {buttonConfig.columnTitle ?? ''}
          </ShTableTh>
        </ShTableTd>
      {/if}
    {/if}

    <!--
      表格主体按钮列渲染
      当行类型为表体且配置了操作按钮时，渲染操作按钮组
    -->
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

<!--
  按钮组渲染代码片段
  用于渲染操作按钮列中的按钮组
  支持多个按钮的水平排列和事件处理
-->
{#snippet buttonsRender()}
  <div class={tuc('flex gap-2')}>
    {#each buttons as btn}
      {@const { onClickValue, onclick, ...otherBtn } = btn}
      <!--
        操作按钮渲染
        - size="xs": 使用超小尺寸适配表格行高
        - onclick: 合并原始点击事件和带值点击事件
        - {...otherBtn}: 透传其他按钮属性
      -->
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
