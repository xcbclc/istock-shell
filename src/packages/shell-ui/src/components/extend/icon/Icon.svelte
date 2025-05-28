<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { IconVariantConfig } from '../../../theme/config';

  const iconVariantConfig = IconVariantConfig;

  // 定义图标颜色类型（从配置中提取）
  export type IconColor = keyof (typeof iconVariantConfig)['variants']['color'];
  // 定义图标尺寸类型（从配置中提取）
  export type IconSize = keyof (typeof iconVariantConfig)['variants']['size'];

  // 组件属性接口（继承HTML元素属性）
  export interface IconProps extends HTMLAttributes<HTMLElement> {
    name?: string; // 图标名称（对应svg文件名）
    color?: IconColor; // 颜色主题
    size?: IconSize | number; // 尺寸配置
  }
</script>

<script lang="ts">
  import { tuc, isNumber } from '@istock-shell/util';
  import { tv } from 'tailwind-variants';

  const {
    name = '', // 图标名称
    color, // 颜色主题
    size, // 尺寸配置
    class: className = '', // 自定义类名
    children, // 子内容
    ...otherProps // 其他原生属性
  }: IconProps = $props();

  // 创建图标样式变体生成器
  const iconVariants = tv(iconVariantConfig, {});
  // 动态导入SVG图标文件（构建时处理）
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

<!-- 图标容器 -->
<i
  class={[tuc(iconVariants({ color, size: isNumber(size) ? undefined : size })), 'inline-block', className]}
  {...otherProps}
  style:width={isNumber(size) ? `${size}px` : undefined}
  style:height={isNumber(size) ? `${size}px` : undefined}
>
  {#if children}
    <!-- 优先渲染子内容 -->
    {@render children()}
  {:else}
    <!-- 动态加载SVG图标 -->
    {#await iconNameRecord[name]?.() ?? '' then svg}
      <!-- 渲染原始SVG内容 -->
      <!--eslint-disable-next-line svelte/no-at-html-tags-->
      {@html svg}
    {/await}
  {/if}
</i>

<style>
  @layer components {
    :global(.icon) {
      width: var(--text-base);
      height: var(--text-base);
      line-height: var(--text-base--line-height);
    }
    :global(.icon-xs) {
      width: var(--text-xs);
      height: var(--text-xs);
      line-height: var(--text-xs--line-height);
    }

    :global(.icon-sm) {
      width: var(--text-sm);
      height: var(--text-sm);
      line-height: var(--text-sm--line-height);
    }

    :global(.icon-md) {
    }

    :global(.icon-lg) {
      width: var(--text-lg);
      height: var(--text-lg);
      line-height: var(--text-lg--line-height);
    }

    :global(.icon-xl) {
      width: var(--text-xl);
      height: var(--text-xl);
      line-height: var(--text-xl--line-height);
    }
  }
</style>
