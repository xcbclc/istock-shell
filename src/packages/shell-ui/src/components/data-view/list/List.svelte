<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ListRowProps } from './ListRow.svelte';

  // 列表组件属性接口（继承ul元素属性）
  export interface ListProps extends HTMLAttributes<HTMLUListElement> {
    list?: ListRowProps[]; // 列表数据
    prefixRender?: () => ReturnType<Snippet<[]>>; // 前缀渲染函数
    suffixRender?: () => ReturnType<Snippet<[]>>; // 后缀渲染函数
  }
</script>

<script lang="ts">
  import { tuc } from '@istock/util';
  import ShListRow from './ListRow.svelte';

  const {
    list, // 列表数据
    class: className = '', // 自定义类名
    prefixRender, // 前缀渲染函数
    suffixRender, // 后缀渲染函数
    children, // 子内容
    ...otherProps // 其他原生属性
  }: ListProps = $props();
</script>

<!-- 列表容器 -->
<ul class={[tuc('list'), className]} {...otherProps}>
  <!-- 渲染前缀内容 -->
  {@render prefixRender?.()}

  {#if list}
    <!-- 遍历渲染列表项 -->
    {#each list as row, index}
      {@const { onclick, onClickValue, ...otherRowProps } = row}
      <ShListRow
        onclick={(event: MouseEvent & { currentTarget: EventTarget & HTMLLIElement }) => {
          onclick?.(event); // 触发行点击事件
          onClickValue?.(row, index); // 触发值变更回调
        }}
        {...otherRowProps}
      ></ShListRow>
    {/each}
  {:else}
    <!-- 无数据时渲染子内容 -->
    {@render children?.()}
  {/if}

  <!-- 渲染后缀内容 -->
  {@render suffixRender?.()}
</ul>
