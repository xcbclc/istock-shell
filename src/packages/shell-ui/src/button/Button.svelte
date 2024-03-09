<!-- Button.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let type: 'default' | 'primary' | 'secondary' | 'danger' = 'default';
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let disabled = false;
  export let onClick: (() => void) | null = null;

  const dispatch = createEventDispatcher();
  const handleClick = () => {
    if (!disabled) {
      onClick && onClick();
      dispatch('click');
    }
  };

  $: classes = `
    button
    button-${type}
    button-${size}
    ${disabled ? 'button-disabled' : ''}
  `;
</script>

<button class={classes} on:click={handleClick} {disabled}>
  <slot />
</button>

<style lang="scss">
  .button {
    --color: #fff;
  }
  .button {
    display: inline-block;
    min-width: 4em;
    padding: var(--gap-zero2x) var(--gap-2x);
    border: 1px solid transparent;
    border-radius: var(--border-radius);
    color: var(--color);
    font-size: var(--font-size-default);
    font-weight: var(--font-weight);
    text-align: center;
    cursor: pointer;
    outline: none;
    transition: all var(--transition-duration) ease;
    opacity: 0.85;
    &:hover {
      opacity: 1;
    }
  }

  .button-default {
    color: var(--color-text-default);
    background-color: #fff;
    border-color: var(--color-text-default);
  }

  .button-primary {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }

  .button-secondary {
    background-color: var(--color-secondary);
    border-color: var(--color-secondary);
  }

  .button-danger {
    background-color: var(--color-primary-red);
    border-color: var(--color-primary-red);
  }

  .button-small {
    padding: var(--gap-zero2x) var(--gap-default);
    font-size: var(--font-size-sm);
  }

  .button-large {
    padding: var(--gap-default) var(--gap-4x);
    font-size: var(--font-size-xl);
  }

  .button-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
