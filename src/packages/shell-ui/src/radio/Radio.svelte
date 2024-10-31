<script lang="ts">
  export let label: string = '';
  export let value: string | number | null;
  export let group: unknown;
  export let attributes: Record<string, unknown> = {};
</script>

<label>
  <input bind:group {value} {...attributes} on:input on:change on:focus on:blur type="radio" />
  {label}
</label>
