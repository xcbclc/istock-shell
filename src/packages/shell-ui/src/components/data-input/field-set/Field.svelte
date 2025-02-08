<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { isString } from '@istock/util';
  export type FieldLabel = {
    title?: string;
    position?: 'before' | 'after';
  };
  export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
    label?: string | FieldLabel;
  }
</script>

<script lang="ts">
  const { label, children, class: className = '', ...otherProps }: FieldProps = $props();
</script>

<div class={['field', className]} {...otherProps}>
  {#if label && (isString(label) || label.position === 'before')}
    <label class="fieldset-label">{isString(label) ? label : label.title}</label>
  {/if}
  {@render children?.()}
  {#if label && !isString(label) && label.position === 'after'}
    <label class="fieldset-label">{isString(label) ? label : label.title}</label>
  {/if}
</div>

<style></style>
