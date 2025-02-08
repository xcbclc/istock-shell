<script lang="ts" module>
  import type { HTMLFieldsetAttributes } from 'svelte/elements';
  export interface FieldSetProps extends HTMLFieldsetAttributes {
    title?: string;
  }
</script>

<script lang="ts">
  const { title = '', children, class: className = '', ...otherProps }: FieldSetProps = $props();
</script>

<fieldset class={['fieldset', className]} {...otherProps}>
  {#if title}
    <legend class="fieldset-legend">{title}</legend>
  {/if}
  {@render children?.()}
</fieldset>

<style></style>
