<script lang="ts">
  export let caption: string;
  export let thead: Array<{ value: string; unit?: { value: string; show: boolean } }> = [];
  export let tbody: Array<Array<{ value: unknown; unit?: { value: string; show: boolean } }>> = [];
  export let tfoot: unknown[][] = [];
</script>

<div class="table-wrap">
  <table>
    {#if caption}
      <caption>{caption}</caption>
    {/if}
    <colgroup>
      <col />
    </colgroup>
    <thead>
      {#each thead as th}
        <th scope="col">{th.value}{th.unit && th.unit.show && th.unit.value ? `(${th.unit.value})` : ''}</th>
      {/each}
    </thead>
    <tbody>
      {#each tbody as tr}
        <tr>
          {#each tr as td, i}
            {#if i === 0}
              <th scope="row">{td.value}</th>
            {:else}
              <td>{td.value}</td>
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
    <tfoot>
      {#each tfoot as tr}
        <tr>
          {#each tr as td, i}
            {#if i === 0}
              <th scope="row">{td}</th>
            {:else}
              <td>{td}</td>
            {/if}
          {/each}
        </tr>
      {/each}
    </tfoot>
  </table>
</div>

<style lang="scss">
  :root {
    --ui-table-color: var(--color-text-default);
    --ui-table-border-color: var(--color-text-default);
  }
  .table-wrap {
    max-width: 100%;
    overflow-x: auto;
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
  th,
  td {
    border: 1px solid var(--ui-table-border-color);
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
</style>
