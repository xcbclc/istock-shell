<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  const inputVariantConfig = {
    base: 'input',
    variants: {
      size: {
        xs: 'input-xs',
        sm: 'input-sm',
        md: 'input-md',
        lg: 'input-lg',
        xl: 'input-xl',
      },
      color: {
        primary: 'input-primary',
        secondary: 'input-secondary',
        accent: 'input-accent',
        neutral: 'input-neutral',
        info: 'input-info',
        success: 'input-success',
        warning: 'input-warning',
        error: 'input-error',
      },
      variant: {
        ghost: 'input-ghost',
      },
      validator: {
        true: 'validator',
      },
    },
    defaultVariants: {},
  };
  export type TInputColor = keyof (typeof inputVariantConfig)['variants']['color'];
  export type TInputSize = keyof (typeof inputVariantConfig)['variants']['size'];
  export type TInputVariant = keyof (typeof inputVariantConfig)['variants']['variant'];

  export type TInputType =
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'date'
    | 'datetime-local'
    | 'week'
    | 'month'
    | 'tel'
    | 'url'
    | 'search'
    | 'time';

  interface IInputBaseProps {
    color?: TInputColor;
    size?: TInputSize;
    variant?: TInputVariant;
    validator?: boolean;
    prefixRender?: (opt: InputRenderOption) => ReturnType<Snippet<[InputRenderOption]>>;
    suffixRender?: (opt: InputRenderOption) => ReturnType<Snippet<[InputRenderOption]>>;
  }

  type InputPropsUnion =
    | (Omit<HTMLInputAttributes, 'size' | 'type' | 'value'> &
        IInputBaseProps & {
          type: 'number';
          value?: number;
          onChangeValue?: (value?: number) => void;
        })
    | (Omit<HTMLInputAttributes, 'size' | 'type' | 'value'> &
        IInputBaseProps & {
          type?: Exclude<TInputType, 'number'>;
          value?: string;
          onChangeValue?: (value?: string) => void;
        });

  export type InputProps = InputPropsUnion;

  export interface InputRenderOption {
    color?: TInputColor;
    size?: TInputSize;
    variant?: TInputVariant;
  }
</script>

<script lang="ts">
  import { tuc } from '@istock/util';
  import { tv } from 'tailwind-variants';

  let {
    value = $bindable(),
    type = 'text',
    color,
    size,
    variant,
    validator = true,
    class: className = '',
    prefixRender,
    suffixRender,
    onChangeValue,
    ...otherProps
  }: InputProps = $props();
  const inputVariants = tv(inputVariantConfig, {
    responsiveVariants: ['size'],
  });
  $effect(() => {
    if (type === 'number') {
      onChangeValue?.(value === undefined ? undefined : Number(value));
    } else {
      onChangeValue?.(value);
    }
  });
</script>

{#if prefixRender ?? suffixRender}
  <label class={[tuc(inputVariants({ color, size, variant, validator })), className]}>
    {@render prefixRender?.({ color, size, variant })}
    <input bind:value {type} {...otherProps} />
    {@render suffixRender?.({ color, size, variant })}
  </label>
{:else}
  <input
    bind:value
    class={[tuc(inputVariants({ color, size, variant, validator })), className]}
    {type}
    {...otherProps}
  />
{/if}

<style></style>
