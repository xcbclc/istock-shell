<script lang="ts">
  interface Props {
    label?: string;
    value: string | number | null;
    id?: any;
    options?: Array<{
      value: string | number;
      label?: string;
      attributes?: Record<string, unknown>;
    }>;
    attributes?: Record<string, unknown>;
  }

  let {
    label = '',
    value = $bindable(),
    id = `${Date.now()}_${(Math.random() * 10000).toFixed(0)}`,
    options = [],
    attributes = {},
  }: Props = $props();
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
