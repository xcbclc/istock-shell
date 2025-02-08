<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    label?: string;
    name?: string;
    children?: Snippet;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label = '', name = '', children }: Props = $props();
</script>

<section class="form-item">
  <div class="form-item-label">{label}</div>
  <div class="form-item-content">
    {@render children?.()}
  </div>
</section>

<style lang="scss">
  .form-item {
    display: flex;
    padding: var(--gap-default) 0;
    align-items: center;
  }

  .form-item-label {
    padding: var(--gap-zero2x);
  }

  .form-item-content {
    flex: auto;
  }
</style>
