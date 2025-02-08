<script lang="ts" module>
  import type { HTMLInputAttributes } from 'svelte/elements';
  const radioItemVariantConfig = {
    base: 'radio',
    variants: {
      size: {
        xs: 'radio-xs',
        sm: 'radio-sm',
        md: 'radio-md',
        lg: 'radio-lg',
        xl: 'radio-xl',
      },
      color: {
        primary: 'radio-primary',
        secondary: 'radio-secondary',
        accent: 'radio-accent',
        neutral: 'radio-neutral',
        info: 'radio-info',
        success: 'radio-success',
        warning: 'radio-warning',
        error: 'radio-error',
      },
    },
    defaultVariants: {},
  };
  export type TRadioItemColor = keyof (typeof radioItemVariantConfig)['variants']['color'];
  export type TRadioItemSize = keyof (typeof radioItemVariantConfig)['variants']['size'];
  export type TRadioItemOption<T = any> = {
    label?: string | number | boolean;
    value: T;
    disabled?: boolean;
  };
  export interface RadioItemProps<T = any> extends Omit<HTMLInputAttributes, 'size'> {
    color?: TRadioItemColor;
    size?: TRadioItemSize;
    groupValue?: T;
    option?: TRadioItemOption<T>;
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock/util';
  let {
    color,
    size,
    groupValue = $bindable(),
    option,
    children,
    class: className = '',
    ...otherProps
  }: RadioItemProps = $props();
  const radioVariants = tv(radioItemVariantConfig, {
    responsiveVariants: ['size'],
  });
</script>

<input
  type="radio"
  class={[
    tuc(
      radioVariants({
        color,
        size,
      })
    ),
    className,
  ]}
  bind:group={groupValue}
  {...otherProps}
/>

<style></style>
