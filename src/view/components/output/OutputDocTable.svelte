<script lang="ts">
  import type { TControllerMethodCmdRouteOptions } from '@istock/iswork';

  export let headers: string[] = [];
  export let options: TControllerMethodCmdRouteOptions[] = [];
  export let type: number = 1;
</script>

<table>
  <thead>
    {#each headers as header}
      <th scope="col">{header}</th>
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
</style>
