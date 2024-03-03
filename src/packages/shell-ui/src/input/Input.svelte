<script lang="ts">
  export let label: string = '';
  export let value: string | number | null;
  export let attribute: Record<string, unknown> = {};
</script>

<label>
  {label}
  <input bind:value {...attribute} on:input on:change on:focus on:blur />
</label>
