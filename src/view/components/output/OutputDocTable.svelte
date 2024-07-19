<script lang="ts">
  import type { TControllerMethodCmdRouteOptions } from '@istock/iswork';

  export let headers: Array<{ value: string; class?: string }> = [];
  export let options: TControllerMethodCmdRouteOptions[] = [];
  export let type: number = 1;
</script>

<table>
  <thead>
    {#each headers as header}
      <th scope="col" class={header.class ?? ''}>{header.value}</th>
    {/each}
  </thead>
  <tbody>
    {#each options as option}
      <tr>
        {#if type === 2}
          <td>{option.parameter}</td>
        {/if}
        <td>{option.name}</td>
        <td>
          {#each (option.description ?? '').split('\n') as des}
            {des}<br />
          {/each}
        </td>
        <td>{option.parameterType}</td>
        <td>{option.optional ?? true}</td>
        <td>{option.default ?? ''}</td>
        <td>{option.choices ?? ''}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style lang="scss">
  table {
    border-collapse: collapse;
    text-align: left;
    min-width: 960px;
  }
  th,
  td {
    vertical-align: top;
    border: 1px solid var(--doc-border-color);
    padding: 0.5em 1em;
  }
  th {
    font-weight: normal;
    white-space: nowrap;
  }
  th.is-least-sm,
  td.is-least-sm {
    min-width: 120px;
  }
  th.is-least-md,
  td.is-least-md {
    min-width: 240px;
  }
</style>
