<!--
  ShRadioItem 单选按钮项组件

  一个基础的单选按钮项组件，用于构建单选按钮组。
  基于原生 HTML input[type="radio"] 元素构建，提供完整的类型安全和响应式支持。

  功能特性：
  - 支持多种颜色主题和尺寸规格
  - 支持双向数据绑定，轻松获取和设置选中值
  - 内置禁用状态处理
  - 完整的响应式设计支持
  - TypeScript 类型安全
  - 支持泛型值类型，适配各种数据类型

  示例用法：
  ```svelte
  <script lang="ts">
    import { ShRadioItem } from '@istock-shell/ui';

    let selectedValue = $state('option1');
  </script>

  <p>基础单选按钮</p>
  <ShRadioItem bind:groupValue={selectedValue} value="option1" />

  <p>带颜色主题的单选按钮</p>
  <ShRadioItem bind:groupValue={selectedValue} value="option2" color="primary" />

  <p>大尺寸单选按钮</p>
  <ShRadioItem bind:groupValue={selectedValue} value="option3" size="lg" />

  <p>禁用状态的单选按钮</p>
  <ShRadioItem bind:groupValue={selectedValue} value="option4" disabled />
  ```
-->
<script lang="ts" module>
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { RadioItemVariantConfig } from '../../../theme/config';

  const radioItemVariantConfig = RadioItemVariantConfig;

  /**
   * 单选按钮颜色类型（从主题配置中动态提取）
   * 支持多种预设颜色主题
   * @typedef {keyof RadioItemVariantConfig['variants']['color']} RadioItemColor
   */
  export type RadioItemColor = keyof (typeof radioItemVariantConfig)['variants']['color'];

  /**
   * 单选按钮尺寸类型（从主题配置中动态提取）
   * 支持多种预设尺寸规格
   * @typedef {keyof RadioItemVariantConfig['variants']['size']} RadioItemSize
   */
  export type RadioItemSize = keyof (typeof radioItemVariantConfig)['variants']['size'];

  /**
   * 单选选项数据接口
   * 用于定义单选按钮的选项数据结构，支持泛型值类型
   *
   * @template T - 选项值的类型，默认为 any
   */
  export type RadioItemOption<T = any> = {
    /** 选项显示文本 */
    label?: string;
    /** 选项实际值，支持任意类型 */
    value: T;
    /** 选项禁用状态 @default false */
    disabled?: boolean;
  };

  /**
   * 单选按钮项组件属性接口
   * 继承并扩展原生 HTML input 元素的属性，并添加单选按钮特有的配置
   *
   * @template T - 绑定值的类型，默认为 any
   */
  export interface RadioItemProps<T = any> extends Omit<HTMLInputAttributes, 'size'> {
    /** 颜色主题，支持多种预设颜色 */
    color?: RadioItemColor;
    /** 尺寸配置，支持多种预设尺寸 */
    size?: RadioItemSize;
    /** 组选中值，用于双向绑定当前选中的值 */
    groupValue?: T;
    /** 关联选项数据，包含标签、值和禁用状态等信息 */
    option?: RadioItemOption<T>;
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  let {
    color, // 颜色主题配置
    size, // 尺寸规格配置
    groupValue = $bindable(), // 双向绑定的组选中值
    option, // 关联的选项数据对象
    children, // 子内容插槽（通常不使用）
    class: className = '', // 自定义CSS类名
    ...otherProps // 其他透传给原生 input 元素的属性
  }: RadioItemProps = $props();

  /**
   * 创建单选按钮的Tailwind变体样式生成器
   * 基于配置生成响应式样式类名
   */
  const radioVariants = tv(radioItemVariantConfig, {});
</script>

<!--
  单选按钮输入元素
  基于原生 HTML input[type="radio"] 元素构建
  支持双向数据绑定和完整的样式定制
-->
<input
  type="radio"
  class={[
    tuc(
      radioVariants({
        color,
        size,
      })
    ),
    className,
  ]}
  bind:group={groupValue}
  {...otherProps}
/>

<style></style>
