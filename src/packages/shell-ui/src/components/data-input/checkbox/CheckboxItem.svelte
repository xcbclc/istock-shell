<!--
@component
ShCheckboxItem 复选框项组件

一个基础的复选框输入组件，作为复选框组的基本单元。
基于原生 HTML input[type="checkbox"] 元素构建，提供完整的类型安全和样式定制。

功能特性：
- 支持多种颜色主题和尺寸规格
- 支持组选择模式的双向数据绑定
- 支持不确定状态（indeterminate）
- 继承所有原生 input 元素属性
- 完整的 TypeScript 类型安全
- 基于 Tailwind CSS 的响应式样式
- 支持自定义样式类名

示例用法：
```svelte
<p>基础复选框项</p>
<ShCheckboxItem
  bind:groupValue={selectedValues}
  value="option1"
/>

<p>带颜色和尺寸的复选框项</p>
<ShCheckboxItem
  color="primary"
  size="lg"
  bind:groupValue={groupValues}
  value="large-option"
/>

<p>不确定状态的复选框项</p>
<ShCheckboxItem
  indeterminate={true}
  bind:groupValue={mixedValues}
  value="mixed-option"
/>

<p>禁用状态的复选框项</p>
<ShCheckboxItem
  disabled
  bind:groupValue={disabledValues}
  value="disabled-option"
/>
```
-->
<script lang="ts" module>
  // 导入HTML输入属性类型和主题配置工具
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { CheckboxItemVariantConfig } from '../../../theme/config';

  // 获取CheckboxItem组件的主题配置
  const checkboxItemVariantConfig = CheckboxItemVariantConfig;

  /**
   * 复选框项颜色类型（从主题配置中动态提取）
   * 支持多种预设颜色主题
   * @typedef {keyof CheckboxItemVariantConfig['variants']['color']} CheckboxItemColor
   */
  export type CheckboxItemColor = keyof (typeof checkboxItemVariantConfig)['variants']['color'];

  /**
   * 复选框项尺寸类型（从主题配置中动态提取）
   * 支持多种预设尺寸规格
   * @typedef {keyof CheckboxItemVariantConfig['variants']['size']} CheckboxItemSize
   */
  export type CheckboxItemSize = keyof (typeof checkboxItemVariantConfig)['variants']['size'];

  /**
   * 复选框选项数据类型定义
   * 用于描述单个复选框选项的完整信息
   * @template T - 选项值的类型，默认为 any
   */
  export type CheckboxItemOption<T = any> = {
    /** 选项显示文本，用于标签展示 */
    label?: string;
    /** 选项的实际值，用于数据绑定和识别 */
    value: T;
    /** 选项的禁用状态 @default false */
    disabled?: boolean;
  };

  /**
   * 复选框项组件属性接口
   * 继承原生 input 元素的所有属性，并扩展复选框特有功能
   * 排除了原生的 size 属性以避免冲突
   * @template T - 选项值的类型，默认为 any
   */
  export interface CheckboxItemProps<T = any> extends Omit<HTMLInputAttributes, 'size'> {
    /** 复选框颜色主题，支持多种预设颜色 */
    color?: CheckboxItemColor;
    /** 复选框尺寸规格，从小到大多种选择 */
    size?: CheckboxItemSize;
    /** 组选中值数组，用于双向绑定和多选管理 @default [] */
    groupValue?: T[];
    /** 关联的选项数据对象，包含标签和值信息 */
    option?: CheckboxItemOption<T>;
    /** 不确定状态，用于表示部分选中的情况 @default false */
    indeterminate?: boolean;
  }
</script>

<script lang="ts">
  // 导入样式处理工具
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  let {
    /** 复选框颜色主题 */
    color,
    /** 复选框尺寸规格 */
    size,
    /** 双向绑定的组选中值数组，用于多选管理 */
    groupValue = $bindable([]),
    /** 关联的选项数据对象 */
    option,
    /** 子内容插槽（通常不使用，因为是input元素） */
    children,
    /** 自定义CSS类名，用于进一步定制样式 */
    class: className = '',
    /** 其他透传给原生input元素的属性 */
    ...otherProps
  }: CheckboxItemProps = $props();

  /**
   * 创建复选框的Tailwind变体样式生成器
   * 基于配置生成响应式样式类名
   */
  const checkboxVariants = tv(checkboxItemVariantConfig, {});
</script>

<!--
  复选框输入元素
  基于原生 HTML input[type="checkbox"] 元素
  支持组选择模式的双向数据绑定和完整的样式定制
-->
<input
  type="checkbox"
  class={[
    tuc(
      checkboxVariants({
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
