<script lang="ts">
  export let label: string = '';
  export let value: string | number | null;
  export let id = `${Date.now()}_${(Math.random() * 10000).toFixed(0)}`;
  export let options: Array<{
    value: string | number;
    label?: string;
    attribute?: Record<string, unknown>;
  }> = [];
  export let attribute: Record<string, unknown> = {};
</script>

<label>
  {label}
  <input list={id} bind:value />
  <datalist {id} {...attribute}>
    {#each options as option, index (index)}
      <option value={option.value} {...option.attribute ?? {}}>
        {option.label ?? option.value}
      </option>
    {/each}
  </datalist>
</label>
