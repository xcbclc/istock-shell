<script lang="ts" module>
  import type { HTMLBaseAttributes } from 'svelte/elements';
  import { TextVariantConfig } from '../../../theme/config';

  const textVariantConfig = TextVariantConfig;
  // 定义支持的HTML标签类型
  export type TextTag = 'p' | 'span' | 'a' | 'i' | 'em' | 'strong';
  // 定义文本颜色类型（从配置中提取）
  export type TextColor = keyof (typeof textVariantConfig)['variants']['color'];
  // 定义文本尺寸类型（从配置中提取）
  export type TextSize = keyof (typeof textVariantConfig)['variants']['size'];
  // 定义文本对齐方式类型（从配置中提取）
  export type TextAlign = keyof (typeof textVariantConfig)['variants']['align'];
  // 定义字体粗细类型（从配置中提取）
  export type TextWeight = keyof (typeof textVariantConfig)['variants']['weight'];

  export type TextTarget = '_self' | '_blank' | '_parent' | '_top';

  // 文本基础属性接口
  export interface TextBaseProps {
    color?: TextColor; // 文本颜色
    size?: TextSize; // 字体尺寸
    align?: TextAlign; // 对齐方式
    tag?: TextTag; // 使用的HTML标签
    weight?: TextWeight; // 字体粗细
  }

  // 单个文本项属性接口
  export interface TextItemProps extends TextBaseProps {
    text?: string; // 文本内容
    href?: string; // 链接地址（当标签为a时生效）
    target?: TextTarget; // 链接打开方式
  }

  // 组件主属性接口（继承HTML基础属性）
  export interface TextProps extends Omit<HTMLBaseAttributes, 'color'>, TextBaseProps {
    texts?: TextItemProps[]; // 多文本项配置数组
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  const {
    color, // 全局颜色
    size, // 全局尺寸
    align, // 全局对齐
    weight, // 全局字重
    tag = 'p', // 默认使用p标签
    texts = [], // 文本项数组
    children, // 子内容
    class: className = '', // 自定义类名
    ...otherProps // 其他原生属性
  }: TextProps = $props();

  // 创建文本样式变体生成器
  const textVariants = tv(textVariantConfig, {});
</script>

{#each texts as item, index (index)}
  <!-- 动态生成文本元素 -->
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
    {@render children?.()}
    {item.text}
  </svelte:element>
{/each}

<style></style>
