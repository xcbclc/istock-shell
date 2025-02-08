<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';

  const iconVariantConfig = {
    base: 'icon',
    variants: {
      size: {
        xs: 'icon-xs',
        sm: 'icon-sm',
        md: 'icon-md',
        lg: 'icon-lg',
        xl: 'icon-xl',
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
    },
    defaultVariants: {},
  };
  export type IconColor = keyof (typeof iconVariantConfig)['variants']['color'];
  export type IconSize = keyof (typeof iconVariantConfig)['variants']['size'];

  export interface IconProps extends HTMLAttributes<HTMLElement> {
    name?: string;
    color?: IconColor;
    size?: IconSize;
  }
</script>

<script lang="ts">
  import { tuc } from '@istock/util';
  import { tv } from 'tailwind-variants';
  const { name = '', color, size, class: className = '', children, ...otherProps }: IconProps = $props();
  const iconVariants = tv(iconVariantConfig, {
    responsiveVariants: ['size'],
  });
  const iconUrlRecord: Record<string, () => Promise<string>> = import.meta.glob<string>('./svg/**/*.svg', {
    import: 'default',
    eager: false,
    query: '?raw',
  });
  const iconNameRecord = Object.keys(iconUrlRecord).reduce<Record<string, () => Promise<string>>>((record, key) => {
    const k = key
      .split('/')
      .reverse()
      .find((k) => k.endsWith('.svg'));
    if (k) {
      record[k.replace('.svg', '')] = iconUrlRecord[key];
    }
    return record;
  }, {});
</script>

<i class={[tuc(iconVariants({ color, size })), 'inline-block', className]} {...otherProps}>
  {#if children}
    {@render children()}
  {:else}
    {#await iconNameRecord[name]?.() ?? '' then svg}
      <!--eslint-disable-next-line svelte/no-at-html-tags-->
      {@html svg}
    {/await}
  {/if}
</i>

<style>
  .icon {
    width: var(--text-base);
    height: var(--text-base);
    line-height: var(--text-base--line-height);
    &.icon-xs {
      width: var(--text-xs);
      height: var(--text-xs);
      line-height: var(--text-xs--line-height);
    }
    &.icon-sm {
      width: var(--text-sm);
      height: var(--text-sm);
      line-height: var(--text-sm--line-height);
    }
    &.icon-md {
    }
    &.icon-lg {
      width: var(--text-lg);
      height: var(--text-lg);
      line-height: var(--text-lg--line-height);
    }
    &.icon-xl {
      width: var(--text-xl);
      height: var(--text-xl);
      line-height: var(--text-xl--line-height);
    }
  }
</style>
