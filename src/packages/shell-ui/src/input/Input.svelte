<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { HTMLProps } from 'svelte/svelte-html';
  export let label: string = '';
  export let value: string | number | null;
  export let attributes: HTMLProps<'input', HTMLAttributes<any>> = {};

  const dispatch = createEventDispatcher();

  const onInput = () => {
    dispatch('input', value);
    dispatch('change', value);
  };
  const onChange = () => {
    dispatch('change', value);
  };
  const onFocus = () => {
    dispatch('focus', value);
  };
  const onBlur = () => {
    dispatch('blur', value);
  };
</script>

<label class="input">
  {#if label}<span class="label">{label}</span>{/if}
  <input {...attributes} bind:value on:input={onInput} on:change={onChange} on:focus={onFocus} on:blur={onBlur} />
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
