<!--
  ShList 列表组件

  一个灵活的列表容器组件，支持数据驱动渲染和自定义内容插槽。
  基于原生 HTML ul 元素构建，提供完整的类型安全和响应式支持。

  功能特性：
  - 支持数据驱动的列表项渲染
  - 提供前缀和后缀内容插槽
  - 支持自定义列表项内容
  - 继承所有原生 ul 元素的属性和事件
  - 完整的 TypeScript 类型安全
  - 响应式设计支持

  示例用法：
  ```svelte
  <script lang="ts">
    import { ShList } from '@istock-shell/ui';

    const listData = [
      { text: '列表项1', description: '描述信息1' },
      { text: '列表项2', description: '描述信息2' },
      { text: '列表项3', description: '描述信息3' }
    ];

    function handleRowClick(row, index) {
      console.log('点击了第', index + 1, '项:', row.text);
    }
  </script>

  <p>基础数据列表</p>
  <ShList list={listData} />

  <p>带点击事件的列表</p>
  <ShList
    list={listData.map(item => ({ ...item, onClickValue: handleRowClick }))}
  />

  <p>带前缀后缀的列表</p>
  <ShList
    list={listData}
    prefixRender={() => <li class="list-header">列表标题</li>}
    suffixRender={() => <li class="list-footer">列表底部</li>}
  />

  <p>自定义内容列表</p>
  <ShList>
    <li>自定义列表项1</li>
    <li>自定义列表项2</li>
    <li>自定义列表项3</li>
  </ShList>
  ```
-->
<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ListRowProps } from './ListRow.svelte';

  /**
   * 列表组件属性接口
   * 继承所有原生 ul 元素的 HTML 属性，并扩展列表特有的功能属性
   * @typedef {HTMLAttributes<HTMLUListElement> & ListPropsExtension} ListProps
   */
  export interface ListProps extends HTMLAttributes<HTMLUListElement> {
    /** 列表数据数组，用于数据驱动渲染列表项 */
    list?: ListRowProps[]; // 列表数据
    /** 前缀内容渲染函数，在列表开始位置插入自定义内容 */
    prefixRender?: () => ReturnType<Snippet<[]>>; // 前缀渲染函数
    /** 后缀内容渲染函数，在列表结束位置插入自定义内容 */
    suffixRender?: () => ReturnType<Snippet<[]>>; // 后缀渲染函数
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';
  import ShListRow from './ListRow.svelte';

  // 解构组件属性
  const {
    list = [], // 列表数据数组
    class: className = '', // 自定义CSS类名（默认空字符串）
    prefixRender, // 前缀内容渲染函数
    suffixRender, // 后缀内容渲染函数
    children, // 子内容插槽
    ...otherProps // 其他原生ul元素属性
  }: ListProps = $props();
</script>

<!-- 列表容器：基于原生ul元素，合并默认样式类和自定义类名，透传所有原生属性 -->
<ul class={[tuc('list'), className]} {...otherProps}>
  <!-- 前缀内容区域：在列表开始位置渲染自定义内容 -->
  {@render prefixRender?.()}

  {#if children}
    <!-- 自定义内容渲染：当没有列表数据时，渲染子内容插槽 -->
    {@render children()}
  {:else}
    <!-- 数据驱动渲染：遍历列表数据，为每个数据项创建列表行组件 -->
    {#each list as row, index}
      {@const { onclick, onClickValue, ...otherRowProps } = row}
      <!-- 列表项组件：处理点击事件并透传其他属性 -->
      <ShListRow
        onclick={(event: MouseEvent & { currentTarget: EventTarget & HTMLLIElement }) => {
          onclick?.(event); // 触发原始点击事件处理函数
          onClickValue?.(row, index); // 触发值变更回调，传递行数据和索引
        }}
        {...otherRowProps}
      ></ShListRow>
    {/each}
  {/if}

  <!-- 后缀内容区域：在列表结束位置渲染自定义内容 -->
  {@render suffixRender?.()}
</ul>
