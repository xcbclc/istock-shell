<script lang="ts">
  type TOption = {
    label?: string;
    value: string | number;
    children?: TOption[];
    attribute?: Record<string, unknown>;
  };

  export let label = '';
  export let value: string | number | null;
  export let options: TOption[] = [];
  export let attribute: Record<string, unknown> = {};
</script>

<label>
  {label}
  <select bind:value {...attribute}>
    {#each options as option, index (index)}
      {#if option.children?.length}
        <optgroup label={option.label} {...option.attribute ?? {}}>
          {#each option.children as child, cIndex (cIndex)}
            <option value={child.value} {...child.attribute ?? {}}>
              {child.label ?? child.value}
            </option>
          {/each}
        </optgroup>
      {:else}
        <option value={option.value} {...option.attribute ?? {}}>
          {option.label ?? option.value}
        </option>
      {/if}
    {/each}
  </select>
</label>
