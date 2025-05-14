<script lang="ts" module>
  import type { TControllerMethodCmdRouteOptions } from '@istock/iswork';
  export interface CmdOutputDocTableHeader {
    value: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  }
  export interface CmdOutputDocTableProps {
    headers: CmdOutputDocTableHeader[];
    options: TControllerMethodCmdRouteOptions[];
    type: 1 | 2;
  }
</script>

<script lang="ts">
  import { ShTable, ShTableRow, ShTableTh, ShTableTd } from '@istock/shell-ui';
  const { headers, options, type = 1 }: CmdOutputDocTableProps = $props();

  const getHeaderExtraClass = (headers: CmdOutputDocTableHeader) => {
    const sizeRecord: Record<string, string> = {
      xl: 'min-w-120',
      lg: 'min-w-80',
      md: 'min-w-48',
      sm: 'min-w-32',
      xs: 'min-w-24',
    };
    return sizeRecord[headers?.size] ?? '';
  };
</script>

<div class="overflow-x-auto">
  <ShTable>
    <thead>
      <ShTableRow>
        {#each headers as header}
          <ShTableTh scope="col" class={`${getHeaderExtraClass(header)}`}>
            {header.value}
          </ShTableTh>
        {/each}
      </ShTableRow>
    </thead>
    <tbody>
      {#each options as option}
        <ShTableRow>
          {#if type === 2}
            <ShTableTd class="align-top whitespace-nowrap font-mono text-sm text-secondary"
              >{option.parameter}</ShTableTd
            >
          {/if}
          <ShTableTd class="align-top whitespace-nowrap font-medium">{option.name}</ShTableTd>
          <ShTableTd class="align-top">
            {#each (option.description ?? '').split('\n') as des}
              <p class="mb-1">{des}</p>
            {/each}
          </ShTableTd>
          <ShTableTd class="align-top whitespace-nowrap text-sm text-accent">{option.parameterType}</ShTableTd>
          <ShTableTd class="align-top whitespace-nowrap text-center">
            {#if option.optional ?? true}
              <span class="badge badge-success badge-sm">是</span>
            {:else}
              <span class="badge badge-error badge-sm">否</span>
            {/if}
          </ShTableTd>
          <ShTableTd class="align-top whitespace-nowrap font-mono text-xs">{option.default ?? ''}</ShTableTd>
          <ShTableTd class="align-top whitespace-normal break-all font-mono text-xs">
            {option.choices ?? ''}
          </ShTableTd>
        </ShTableRow>
      {/each}
    </tbody>
  </ShTable>
</div>
