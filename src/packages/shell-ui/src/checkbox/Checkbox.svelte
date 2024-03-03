<script lang="ts">
  export let label: string = '';
  export let value: string | number | null;
  export let group: Array<string | number | null> = [];
  export let attribute = {
    checked: group.includes(value),
  };

  const onChange = (event: Event) => {
    const { target } = event;
    if (target instanceof HTMLInputElement) {
      if (target.checked) {
        if (group.includes(target.value)) return;
        group = [...group, target.value];
      } else {
        group = group.filter((v) => v !== target.value);
      }
    }
  };
</script>

<label>
  <input
    bind:checked={attribute.checked}
    {value}
    {...attribute}
    on:input
    on:change={onChange}
    on:change
    on:focus
    on:blur
    type="checkbox"
  />
  {label}
</label>
