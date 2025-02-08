<script lang="ts" module>
  type TTbodyTd = { value: unknown; unit?: { value: string; show: boolean }; style?: string };
  let tableCount: number = 0;
</script>

<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { ShVirtualList } from '../virtual-list/index';
  import { ShText } from '../text/index';

  tableCount++;
  interface Props {
    caption: string;
    thead?: Array<{ value: string; unit?: { value: string; show: boolean }; style?: string }>;
    tbody?: TTbodyTd[][];
    tfoot?: TTbodyTd[][];
    pageSize?: number;
  }

  const { caption, thead = [], tbody = [], tfoot = [], pageSize = 50 }: Props = $props();

  let tableWrapElement: HTMLElement | null = $state(null);
  const getColName = (index: number) => `table_${tableCount}_${index}`;
  const getDataKey = (_d: any, index: number) => `${index}`;

  onMount(() => {});

  onDestroy(() => {});
</script>

<div class="table-wrap" bind:this={tableWrapElement}>
  <ShVirtualList
    dataSources={tbody}
    scrollElement={tableWrapElement}
    slotHeaderSize={56}
    dataKey={getDataKey}
    {pageSize}
    keeps={30}
  >
    {#snippet custom({ currentList, startIndex, onItemResize })}
      <table>
        {#if caption}
          <caption>{caption}</caption>
        {/if}
        <colgroup>
          {#each thead as _th, index}
            <col name={getColName(index)} />
          {/each}
        </colgroup>
        <thead>
          <tr>
            {#each thead as th}
              <th scope="col" style={th.style ?? ''}
                >{th.value}{th.unit && th.unit.show && th.unit.value ? `(${th.unit.value})` : ''}</th
              >
            {/each}
          </tr><tr></tr>
        </thead>
        {#if currentList?.length}
          <tbody>
            {#each currentList as item, index (index)}
              <tr use:onItemResize={`${startIndex + index}`}>
                {#each item as td, i}
                  {#if i === 0}
                    <th scope="row" style={td.style ?? ''}>{td.value}</th>
                  {:else}
                    <td style={td.style ?? ''}>{td.value}</td>
                  {/if}
                {/each}
              </tr>
            {/each}
          </tbody>
        {/if}
        {#if !currentList?.length && !tfoot?.length}
          <tbody
            ><tr
              ><td colspan={thead.length}
                ><ShText texts={[{ text: '暂无数据', type: 'warning' }]} textAlign="center" /></td
              ></tr
            ></tbody
          >
        {/if}
        <tfoot>
          {#each tfoot as tr}
            <tr>
              {#each tr as td, i}
                {#if i === 0}
                  <th scope="row" style={td.style ?? ''}>{td}</th>
                {:else}
                  <td style={td.style ?? ''}>{td}</td>
                {/if}
              {/each}
            </tr>
          {/each}
        </tfoot>
      </table>
    {/snippet}
  </ShVirtualList>
</div>

<style lang="scss">
  :root {
    --ui-table-background-color: var(--color-background);
    --ui-table-color: var(--color-text-default);
    --ui-table-border-color: var(--color-text-default);
  }
  .table-wrap {
    margin-bottom: var(--gap-default);
    max-width: 100%;
    max-height: 500px;
    overflow: auto;
    overflow-anchor: none;
    scroll-behavior: smooth;
  }
  table {
    border-collapse: collapse;
    min-width: 50%;
    color: var(--ui-table-color);
  }
  caption {
    font-weight: bold;
    padding: 0.5em 0;
  }
  thead {
    position: sticky;
    top: -2px;
    background-color: var(--ui-table-background-color);
  }
  th {
    white-space: nowrap;
  }
  th,
  td {
    border: 1px solid var(--ui-table-border-color);
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
</style>
