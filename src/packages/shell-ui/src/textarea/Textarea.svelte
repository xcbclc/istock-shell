<script lang="ts">
  export let label: string = '';
  export let value: string | number | null;
  export let attributes: Record<string, unknown> = {};
</script>

<label class="textarea">
  {#if label}<span class="label">{label}</span>{/if}
  <textarea bind:value {...attributes} on:input on:change on:focus on:blur />
</label>

<style lang="scss">
  .textarea {
    display: flex;
    align-content: center;
    align-items: center;
  }
  .label {
    padding-right: var(--gap-2x);
  }
  textarea {
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
