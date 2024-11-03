<script lang="ts">
  type TOption = {
    label?: string;
    value: string | number;
    children?: TOption[];
    attributes?: Record<string, unknown>;
  };

  export let label = '';
  export let value: string | number | null;
  export let options: TOption[] = [];
  export let attributes: Record<string, unknown> = {};
</script>

<label>
  {label}
  <select bind:value {...attributes}>
    {#each options as option, index (index)}
      {#if option.children?.length}
        <optgroup label={option.label} {...option.attributes ?? {}}>
          {#each option.children as child, cIndex (cIndex)}
            <option value={child.value} {...child.attributes ?? {}}>
              {child.label ?? child.value}
            </option>
          {/each}
        </optgroup>
      {:else}
        <option value={option.value} {...option.attributes ?? {}}>
          {option.label ?? option.value}
        </option>
      {/if}
    {/each}
  </select>
</label>
