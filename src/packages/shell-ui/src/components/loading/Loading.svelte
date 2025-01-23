<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  const loadingVariantConfig = {
    base: 'loading',
    variants: {
      shape: {
        default: '',
        spinner: 'loading-spinner',
        dots: 'loading-dots',
        ring: 'loading-ring',
        ball: 'loading-ball',
        bars: 'loading-bars',
        infinity: 'loading-infinity',
      },
      size: {
        default: '',
        xs: 'loading-xs',
        sm: 'loading-sm',
        md: 'loading-md',
        lg: 'loading-lg',
        xl: 'loading-xl',
      },
      color: {
        default: '',
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        neutral: 'text-neutral',
        info: 'text-info',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error',
      },
    },
    defaultVariants: {},
  };
  export type TLoadingShape = keyof (typeof loadingVariantConfig)['variants']['shape'];
  export type TLoadingSize = keyof (typeof loadingVariantConfig)['variants']['size'];
  export type TLoadingColor = keyof (typeof loadingVariantConfig)['variants']['color'];
  export interface LoadingProps extends HTMLAttributes<HTMLSpanElement> {
    shape?: TLoadingShape;
    size?: TLoadingSize;
    color?: TLoadingColor;
    text?: string;
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock/util';
  const { shape, size, color, text, children, class: className = '', ...otherProps }: LoadingProps = $props(); // todo ButtonProps参数如何根据tag的值动态推算出元素的属性类型
  const loadingVariants = tv(loadingVariantConfig, {
    responsiveVariants: ['size'],
  });
  const loadingTextVariants = tv(
    {
      base: '',
      variants: {
        size: {
          default: '',
          xs: 'text-xs',
          sm: 'text-sm',
          md: 'text-md',
          lg: 'text-lg',
          xl: 'text-xl',
        },
        color: {
          default: '',
          primary: 'text-primary',
          secondary: 'text-secondary',
          accent: 'text-accent',
          neutral: 'text-neutral',
          info: 'text-info',
          success: 'text-success',
          warning: 'text-warning',
          error: 'text-error',
        },
      },
      defaultVariants: {},
    },
    {
      responsiveVariants: ['size'],
    }
  );
</script>

{#snippet loading(extrClassName: string)}
  <span class={[tuc(loadingVariants({ shape, size, color })), className, extrClassName]} {...otherProps}></span>
{/snippet}
{#if text ?? children}
  <div class="inline-flex items-center justify-center">
    <!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
    {@render loading('mr-2')}
    <span class={tuc(loadingTextVariants({ size, color }))}>
      {#if text}
        {text}
      {/if}
      {#if children}
        {@render children()}
      {/if}
    </span>
  </div>
{:else}
  <!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
  {@render loading('')}
{/if}

<style></style>
