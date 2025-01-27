<script lang="ts" module>
  import type { HTMLInputAttributes } from 'svelte/elements';
  const checkboxItemVariantConfig = {
    base: 'checkbox',
    variants: {
      size: {
        xs: 'checkbox-xs',
        sm: 'checkbox-sm',
        md: 'checkbox-md',
        lg: 'checkbox-lg',
        xl: 'checkbox-xl',
      },
      color: {
        primary: 'checkbox-primary',
        secondary: 'checkbox-secondary',
        accent: 'checkbox-accent',
        neutral: 'checkbox-neutral',
        info: 'checkbox-info',
        success: 'checkbox-success',
        warning: 'checkbox-warning',
        error: 'checkbox-error',
      },
    },
    defaultVariants: {},
  };
  export type TCheckboxItemColor = keyof (typeof checkboxItemVariantConfig)['variants']['color'];
  export type TCheckboxItemSize = keyof (typeof checkboxItemVariantConfig)['variants']['size'];
  export type TCheckboxItemOption<T = any> = {
    label?: string | number | boolean;
    value: T;
    disabled?: boolean;
  };
  export interface CheckboxItemProps<T = any> extends Omit<HTMLInputAttributes, 'size'> {
    color?: TCheckboxItemColor;
    size?: TCheckboxItemSize;
    groupValue?: T[];
    option?: TCheckboxItemOption<T>;
    indeterminate?: boolean;
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock/util';
  let {
    color,
    size,
    groupValue = $bindable([]),
    option,
    children,
    class: className = '',
    ...otherProps
  }: CheckboxItemProps = $props();
  const checkboxVariants = tv(checkboxItemVariantConfig, {
    responsiveVariants: ['size'],
  });
</script>

<input
  type="checkbox"
  class={[
    tuc(
      checkboxVariants({
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
