<script lang="ts" module>
  import type { HTMLInputAttributes } from 'svelte/elements';

  const toggleVariantConfig = {
    base: 'toggle',
    variants: {
      size: {
        xs: 'toggle-xs',
        sm: 'toggle-sm',
        md: 'toggle-md',
        lg: 'toggle-lg',
        xl: 'toggle-xl',
      },
      color: {
        primary: 'toggle-primary',
        secondary: 'toggle-secondary',
        accent: 'toggle-accent',
        neutral: 'toggle-neutral',
        info: 'toggle-info',
        success: 'toggle-success',
        warning: 'toggle-warning',
        error: 'toggle-error',
      },
    },
    defaultVariants: {},
  };
  export type ToggleColor = keyof (typeof toggleVariantConfig)['variants']['color'];
  export type ToggleSize = keyof (typeof toggleVariantConfig)['variants']['size'];
  export type ToggleLabel = {
    position?: 'before' | 'after';
    class?: string;
  };
  export interface ToggleProps extends Omit<HTMLInputAttributes, 'size'> {
    color?: ToggleColor;
    size?: ToggleSize;
    label?: ToggleLabel;
    value?: boolean;
    onChangeValue?: (value: boolean) => void;
  }
</script>

<script lang="ts">
  import { tuc } from '@istock/util';
  import { tv } from 'tailwind-variants';

  let {
    value = $bindable(false),
    color,
    size,
    label,
    class: className = '',
    onChangeValue,
    children,
    ...otherProps
  }: ToggleProps = $props();
  const toggleVariants = tv(toggleVariantConfig, {
    responsiveVariants: ['size'],
  });
  $effect(() => {
    onChangeValue?.(value);
  });
</script>

{#if label ?? children}
  <label class={tuc(toggleVariants({ color, size }), label?.class ?? '')}>
    {#if label?.position === 'before'}
      {@render children?.()}
    {/if}
    <input bind:checked={value} type="checkbox" class={[className]} {...otherProps} />
    {#if !label?.position || label?.position === 'after'}
      {@render children?.()}
    {/if}
  </label>
{:else}
  <input
    bind:checked={value}
    type="checkbox"
    class={[tuc(toggleVariants({ color, size })), className]}
    {...otherProps}
  />
{/if}

<style></style>
