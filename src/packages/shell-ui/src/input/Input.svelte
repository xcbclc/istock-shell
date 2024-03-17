<script lang="ts">
  export let label: string = '';
  export let value: string | number | null;
  export let attribute: Record<string, unknown> = {};
</script>

<label class="input">
  <span class="label">{label}</span>
  <input bind:value {...attribute} on:input on:change on:focus on:blur />
</label>

<style lang="scss">
  .input {
    display: flex;
    align-content: center;
    align-items: center;
  }
  .label {
    padding-right: var(--gap-2x);
  }
  input {
    flex: auto;
    background-color: transparent;
    border: 1px solid var(--border-color);
    color: var(--color-text-default);
    padding: var(--gap-default);
    border-radius: var(--border-radius);
    &:focus {
      border-color: var(--border-color);
      outline: unset;
    }
  }
</style>
