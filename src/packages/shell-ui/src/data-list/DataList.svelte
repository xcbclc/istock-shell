<script lang="ts">
  export let label: string = '';
  export let value: string | number | null;
  export let id = `${Date.now()}_${(Math.random() * 10000).toFixed(0)}`;
  export let options: Array<{
    value: string | number;
    label?: string;
    attributes?: Record<string, unknown>;
  }> = [];
  export let attributes: Record<string, unknown> = {};
</script>

<label>
  {label}
  <input list={id} bind:value />
  <datalist {id} {...attributes}>
    {#each options as option, index (index)}
      <option value={option.value} {...option.attributes ?? {}}>
        {option.label ?? option.value}
      </option>
    {/each}
  </datalist>
</label>
