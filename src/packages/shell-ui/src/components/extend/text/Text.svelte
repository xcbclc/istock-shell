<!--
@component
ShText 文本渲染组件

一个功能丰富的文本渲染组件，支持多种样式变体、批量文本渲染和链接功能。
基于 Tailwind CSS 构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持多种文本颜色主题（primary, secondary, success, warning, error 等）
- 提供多种字体尺寸规格（xs, sm, md, lg, xl 等）
- 支持多种文本对齐方式（left, center, right, justify）
- 支持多种字体粗细（thin, normal, medium, bold, black 等）
- 支持多种HTML标签（p, span, a, i, em, strong）
- 支持批量文本项渲染，每个文本项可独立配置样式
- 支持链接功能，可配置链接地址和打开方式
- 继承所有原生HTML元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShText } from '@istock-shell/ui';

  const textItems = [
    { text: '标题文本', size: 'lg', weight: 'bold', color: 'primary' },
    { text: '普通文本', size: 'md', color: 'secondary' },
    { text: '链接文本', tag: 'a', href: 'https://example.com', target: '_blank' }
  ];
</script>

<p>单个文本渲染</p>
<ShText color="primary" size="lg" weight="bold">重要文本</ShText>

<p>批量文本渲染</p>
<ShText texts={textItems} />

<p>链接文本</p>
<ShText
  tag="a"
  href="https://example.com"
  target="_blank"
  color="primary"
>
  访问链接
</ShText>
```
-->
<script lang="ts" module>
  import type { HTMLBaseAttributes } from 'svelte/elements';
  import { TextVariantConfig } from '../../../theme/config';

  const textVariantConfig = TextVariantConfig;

  /**
   * 文本支持的HTML标签类型
   * 包含常用的文本标签，支持不同的语义化需求
   * @typedef {'p' | 'span' | 'a' | 'i' | 'em' | 'strong'} TextTag
   */
  export type TextTag = 'p' | 'span' | 'a' | 'i' | 'em' | 'strong';

  /**
   * 文本颜色类型（从主题配置中动态提取）
   * 支持的颜色包括：primary（主要）、secondary（次要）、success（成功）、warning（警告）、error（错误）等
   * @typedef {keyof TextVariantConfig['variants']['color']} TextColor
   */
  export type TextColor = keyof (typeof textVariantConfig)['variants']['color'];

  /**
   * 文本尺寸类型（从主题配置中动态提取）
   * 支持的尺寸包括：xs（超小）、sm（小）、md（中等）、lg（大）、xl（超大）等
   * @typedef {keyof TextVariantConfig['variants']['size']} TextSize
   */
  export type TextSize = keyof (typeof textVariantConfig)['variants']['size'];

  /**
   * 文本对齐方式类型（从主题配置中动态提取）
   * 支持的对齐方式包括：left（左对齐）、center（居中）、right（右对齐）、justify（两端对齐）等
   * @typedef {keyof TextVariantConfig['variants']['align']} TextAlign
   */
  export type TextAlign = keyof (typeof textVariantConfig)['variants']['align'];

  /**
   * 字体粗细类型（从主题配置中动态提取）
   * 支持的粗细包括：thin（细）、normal（正常）、medium（中等）、bold（粗体）、black（超粗）等
   * @typedef {keyof TextVariantConfig['variants']['weight']} TextWeight
   */
  export type TextWeight = keyof (typeof textVariantConfig)['variants']['weight'];

  /**
   * 链接打开方式类型
   * 定义链接在何种窗口或框架中打开
   * @typedef {'_self' | '_blank' | '_parent' | '_top'} TextTarget
   */
  export type TextTarget = '_self' | '_blank' | '_parent' | '_top';

  /**
   * 文本基础属性接口
   * 定义文本组件的核心样式属性，可被其他接口继承
   * @typedef TextBaseProps
   */
  export interface TextBaseProps {
    /** 文本颜色主题，控制文本的颜色样式 */
    color?: TextColor;
    /** 字体尺寸规格，控制文本的大小 */
    size?: TextSize;
    /** 文本对齐方式，控制文本的水平对齐 */
    align?: TextAlign;
    /** 使用的HTML标签类型，影响语义化和默认样式 */
    tag?: TextTag;
    /** 字体粗细程度，控制文本的粗细效果 */
    weight?: TextWeight;
  }

  /**
   * 单个文本项属性接口
   * 继承基础属性，并扩展文本内容和链接功能
   * @typedef {TextBaseProps & TextItemPropsExtension} TextItemProps
   */
  export interface TextItemProps extends TextBaseProps {
    /** 文本内容字符串，要显示的实际文本 */
    text?: string;
    /** 链接地址，当标签为a时生效，定义跳转目标 */
    href?: string;
    /** 链接打开方式，控制链接在何种窗口中打开 */
    target?: TextTarget;
  }

  /**
   * 文本组件主属性接口
   * 继承HTML基础属性（排除color冲突），并扩展文本特有的功能属性
   * @typedef {Omit<HTMLBaseAttributes, 'color'> & TextBaseProps & TextPropsExtension} TextProps
   */
  export interface TextProps extends Omit<HTMLBaseAttributes, 'color'>, TextBaseProps {
    /** 多文本项配置数组，用于批量渲染多个文本元素 */
    texts?: TextItemProps[];
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  const {
    color, // 全局文本颜色主题，应用于所有文本项（除非单独指定）
    size, // 全局字体尺寸规格，应用于所有文本项（除非单独指定）
    align, // 全局文本对齐方式，应用于所有文本项（除非单独指定）
    weight, // 全局字体粗细程度，应用于所有文本项（除非单独指定）
    tag = 'p', // 默认HTML标签类型（默认为p段落标签）
    texts = [], // 文本项配置数组，用于批量渲染（默认空数组）
    children, // 子内容插槽，用于自定义文本内容
    class: className = '', // 自定义CSS类名（默认空字符串）
    ...otherProps // 其他原生HTML元素属性
  }: TextProps = $props();

  // 创建文本样式变体生成器
  const textVariants = tv(textVariantConfig, {});
</script>

<!--
  批量文本渲染：遍历texts数组，为每个文本项创建独立的文本元素
  支持每个文本项独立配置样式属性，同时继承全局配置作为默认值
-->
{#each texts as item, index (index)}
  <!--
    动态文本元素生成：使用svelte:element动态创建指定标签的文本元素
    标签优先级：文本项标签 > 全局标签 > 默认p标签
    样式优先级：文本项样式 > 全局样式 > 主题默认样式
  -->
  <svelte:element
    this={item.tag ?? tag}
    class={[
      tuc(
        textVariants({
          color: item.color ?? color,
          size: item.size ?? size,
          align: item.align ?? align,
          weight: item.weight ?? weight,
        })
      ),
      className,
    ]}
    href={item.href}
    target={item.target ?? (tag === 'a' ? '_blank' : undefined)}
    {...otherProps}
  >
    <!-- 子内容插槽渲染：优先渲染通过插槽传入的自定义内容 -->
    {@render children?.()}
    <!-- 文本内容渲染：显示文本项的text属性内容 -->
    {item.text}
  </svelte:element>
{/each}

<style></style>
