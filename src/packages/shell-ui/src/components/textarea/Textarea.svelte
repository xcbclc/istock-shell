<script lang="ts" module>
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  const textareaVariantConfig = {
    base: 'textarea',
    variants: {
      size: {
        xs: 'textarea-xs',
        sm: 'textarea-sm',
        md: 'textarea-md',
        lg: 'textarea-lg',
        xl: 'textarea-xl',
      },
      color: {
        primary: 'textarea-primary',
        secondary: 'textarea-secondary',
        accent: 'textarea-accent',
        neutral: 'textarea-neutral',
        info: 'textarea-info',
        success: 'textarea-success',
        warning: 'textarea-warning',
        error: 'textarea-error',
      },
      variant: {
        ghost: 'textarea-ghost',
      },
    },
    defaultVariants: {},
  };
  export type TTextareaColor = keyof (typeof textareaVariantConfig)['variants']['color'];
  export type TTextareaSize = keyof (typeof textareaVariantConfig)['variants']['size'];
  export type TTextareaVariant = keyof (typeof textareaVariantConfig)['variants']['variant'];

  export interface TextareaProps extends Omit<HTMLTextareaAttributes, 'size'> {
    color?: TTextareaColor;
    size?: TTextareaSize;
    variant?: TTextareaVariant;
    value?: string;
    onChangeValue?: (value?: string) => void;
  }
</script>

<script lang="ts">
  import { tuc } from '@istock/util';
  import { tv } from 'tailwind-variants';

  let {
    value = $bindable(),
    color,
    size,
    variant,
    class: className = '',
    onChangeValue,
    ...otherProps
  }: TextareaProps = $props();
  const textareaVariants = tv(textareaVariantConfig, {
    responsiveVariants: ['size'],
  });
  $effect(() => {
    onChangeValue?.(value);
  });
</script>

<textarea bind:value class={[tuc(textareaVariants({ color, size, variant })), className]} {...otherProps}></textarea>

<style></style>
