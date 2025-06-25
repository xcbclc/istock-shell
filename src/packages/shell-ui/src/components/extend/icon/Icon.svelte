<!--
@component
ShIcon 图标组件

一个功能丰富的图标组件，支持SVG图标动态加载、多种颜色主题和尺寸配置。
基于 Tailwind CSS 构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持动态加载SVG图标文件
- 提供多种颜色主题（primary, secondary, success, warning, error 等）
- 支持多种尺寸规格（xs, sm, md, lg, xl）或自定义数值尺寸
- 支持自定义图标内容插槽
- 继承所有原生 i 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShIcon } from '@istock-shell/ui';
</script>

<p>基础图标</p>
<ShIcon name="home" />

<p>带颜色和尺寸的图标</p>
<ShIcon name="user" color="primary" size="lg" />

<p>自定义数值尺寸的图标</p>
<ShIcon name="settings" size={24} />

<p>自定义内容图标</p>
<ShIcon color="secondary">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
  </svg>
</ShIcon>
```
-->
<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { IconVariantConfig } from '../../../theme/config';

  const iconVariantConfig = IconVariantConfig;

  /**
   * 图标颜色类型（从主题配置中动态提取）
   * 支持的颜色包括：primary（主要）、secondary（次要）、success（成功）、warning（警告）、error（错误）等
   * @typedef {keyof IconVariantConfig['variants']['color']} IconColor
   */
  export type IconColor = keyof (typeof iconVariantConfig)['variants']['color'];

  /**
   * 图标尺寸类型（从主题配置中动态提取）
   * 支持的尺寸包括：xs（超小）、sm（小）、md（中等）、lg（大）、xl（超大）等
   * @typedef {keyof IconVariantConfig['variants']['size']} IconSize
   */
  export type IconSize = keyof (typeof iconVariantConfig)['variants']['size'];

  /**
   * 图标组件属性接口
   * 继承所有原生 i 元素的 HTML 属性，并扩展图标特有的功能属性
   * @typedef {HTMLAttributes<HTMLElement> & IconPropsExtension} IconProps
   */
  export interface IconProps extends HTMLAttributes<HTMLElement> {
    /** 图标名称，对应svg文件名，用于动态加载对应的SVG图标文件 */
    name?: string;
    /** 图标颜色主题，控制图标的颜色样式 */
    color?: IconColor;
    /** 图标尺寸配置，支持预设尺寸或自定义数值（像素） */
    size?: IconSize | number;
  }
</script>

<script lang="ts">
  import { tuc, isNumber } from '@istock-shell/util';
  import { tv } from 'tailwind-variants';

  const {
    name = '', // 图标名称，默认为空字符串
    color, // 图标颜色主题（primary、secondary、success等）
    size, // 图标尺寸配置（预设尺寸或数值）
    class: className = '', // 自定义CSS类名（默认空字符串）
    children, // 子内容插槽，用于自定义图标内容
    ...otherProps // 其他原生i元素属性
  }: IconProps = $props();

  // 创建图标样式变体生成器
  const iconVariants = tv(iconVariantConfig, {});

  /**
   * 动态导入SVG图标文件映射表（构建时处理）
   * 使用Vite的import.meta.glob功能，在构建时收集所有SVG文件
   * 配置说明：
   * - import: 'default' - 导入默认导出
   * - eager: false - 懒加载，按需导入
   * - query: '?raw' - 以原始文本形式导入SVG内容
   */
  const iconUrlRecord: Record<string, () => Promise<string>> = import.meta.glob<string>('./svg/**/*.svg', {
    import: 'default',
    eager: false,
    query: '?raw',
  });

  /**
   * 图标名称到加载函数的映射表
   * 将文件路径转换为图标名称，便于通过name属性快速查找对应的SVG文件
   * 处理逻辑：
   * 1. 遍历所有SVG文件路径
   * 2. 提取文件名（去除路径和扩展名）
   * 3. 建立名称到加载函数的映射关系
   */
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

<!--
  图标容器：基于原生i元素，应用样式变体和自定义类名，透传所有原生属性
  样式处理：
  - 应用主题配置的颜色和尺寸样式
  - 当size为数值时，通过内联样式设置具体像素值
  - 当size为预设值时，使用CSS类名控制尺寸
-->
<i
  class={[tuc(iconVariants({ color, size: isNumber(size) ? undefined : size })), 'inline-block', className]}
  {...otherProps}
  style:width={isNumber(size) ? `${size}px` : undefined}
  style:height={isNumber(size) ? `${size}px` : undefined}
>
  {#if children}
    <!--
      自定义内容渲染：当存在子内容插槽时，优先渲染自定义内容
      适用于需要自定义SVG内容或其他图标元素的场景
    -->
    {@render children()}
  {:else}
    <!--
      动态SVG图标加载：根据name属性异步加载对应的SVG文件
      加载流程：
      1. 通过iconNameRecord查找对应的加载函数
      2. 异步执行加载函数获取SVG内容
      3. 使用@html指令渲染原始SVG标记
      4. 如果找不到对应图标，则渲染空字符串
    -->
    {#await iconNameRecord[name]?.() ?? '' then svg}
      <!-- 渲染原始SVG内容：直接插入SVG标记到DOM中 -->
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
