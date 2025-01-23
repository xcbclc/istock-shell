<script lang="ts" module>
  import type {
    HTMLButtonAttributes,
    HTMLInputAttributes,
    HTMLLinkAttributes,
    HTMLBaseAttributes,
  } from 'svelte/elements';
  const buttonVariantConfig = {
    base: 'btn',
    variants: {
      color: {
        default: '',
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        neutral: 'btn-neutral',
        info: 'btn-info',
        success: 'btn-success',
        warning: 'btn-warning',
        error: 'btn-error',
      },
      size: {
        default: '',
        xs: 'btn-xs',
        sm: 'btn-sm',
        md: 'btn-md',
        lg: 'btn-lg',
        xl: 'btn-xl',
      },
      soft: {
        true: 'btn-soft',
      },
      outline: {
        true: 'btn-outline',
      },
      dash: {
        true: 'btn-dash',
      },
      active: {
        true: 'btn-active',
      },
      ghost: {
        true: 'btn-ghost',
      },
      link: {
        true: 'btn-link',
      },
      wide: {
        true: 'btn-wide',
      },
      disabled: {
        true: 'btn-disabled',
      },
      shape: {
        square: 'btn-square',
        circle: 'btn-circle',
      },
      block: {
        true: 'btn-block',
      },
    },
    defaultVariants: {},
  };
  export type TButtonTag = 'a' | 'button' | 'input' | 'div';
  export type TButtonColor = keyof (typeof buttonVariantConfig)['variants']['color'];
  export type TButtonSize = keyof (typeof buttonVariantConfig)['variants']['size'];
  export type TButtonAttributes<T extends TButtonTag> = T extends 'button'
    ? HTMLButtonAttributes
    : T extends 'input'
      ? HTMLInputAttributes
      : T extends 'a'
        ? HTMLLinkAttributes
        : HTMLBaseAttributes;
  export type ButtonProps<T extends TButtonTag> = Omit<TButtonAttributes<T>, 'size'> & {
    color?: TButtonColor;
    size?: TButtonSize;
    soft?: boolean;
    outline?: boolean;
    dash?: boolean;
    active?: boolean;
    ghost?: boolean;
    link?: boolean;
    wide?: boolean;
    tag?: TButtonTag;
    disabled?: boolean;
    shape?: 'square' | 'circle';
    block?: boolean;
    loading?: boolean;
  };
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock/util';
  import { ShLoading } from '../loading/index';
  const {
    color,
    size,
    soft,
    outline,
    dash,
    active,
    ghost,
    link,
    wide,
    tag = 'button',
    disabled,
    shape,
    block,
    loading,
    children,
    class: className = '',
    ...otherProps
  }: ButtonProps<'input'> = $props(); // todo ButtonProps参数如何根据tag的值动态推算出元素的属性类型
  const buttonVariants = tv(buttonVariantConfig, {
    responsiveVariants: ['size'],
  });
</script>

<svelte:element
  this={tag}
  {disabled}
  class={[
    tuc(buttonVariants({ color, size, soft, outline, dash, active, ghost, link, wide, disabled, shape, block })),
    className,
  ]}
  {...otherProps}
>
  {#if loading}
    <ShLoading {color} {size} />
  {/if}
  {@render children?.()}
</svelte:element>

<style></style>
