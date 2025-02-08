<script lang="ts" module>
  import type { HTMLBaseAttributes } from 'svelte/elements';
  const textVariantConfig = {
    base: '',
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      color: {
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        neutral: 'text-neutral',
        info: 'text-info',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      weight: {
        light: 'font-light',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {},
  };
  export type TTextTag = 'p' | 'span' | 'a' | 'i' | 'em' | 'strong';
  export type TTextColor = keyof (typeof textVariantConfig)['variants']['color'];
  export type TTextSize = keyof (typeof textVariantConfig)['variants']['size'];
  export type TTextAlign = keyof (typeof textVariantConfig)['variants']['align'];
  export type TWeightAlign = keyof (typeof textVariantConfig)['variants']['weight'];
  export interface ITextBaseProps {
    color?: TTextColor;
    size?: TTextSize;
    align?: TTextAlign;
    tag?: TTextTag;
    weight?: TWeightAlign;
  }
  export interface ITextItemProps extends ITextBaseProps {
    text?: string;
    href?: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
  }
  export interface TextProps extends Omit<HTMLBaseAttributes, 'color'>, ITextBaseProps {
    texts?: ITextItemProps[];
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock/util';
  const {
    color,
    size,
    align,
    weight,
    tag = 'p',
    texts = [],
    children,
    class: className = '',
    ...otherProps
  }: TextProps = $props();
  const textVariants = tv(textVariantConfig, {
    responsiveVariants: ['size'],
  });
</script>

{#each texts as item, index (index)}
  <svelte:element
    this={item.tag ?? tag}
    class={[
      tuc(
        textVariants({
          color: item.color ?? color,
          size: item.size ?? size,
          align: item.align ?? align,
          weight: item.weight ?? weight ?? weight,
        })
      ),
      className,
    ]}
    href={item.href}
    target={item.target ?? (tag === 'a' ? '_blank' : undefined)}
    {...otherProps}
  >
    {@render children?.()}
    {item.text}
  </svelte:element>
{/each}

<style></style>
