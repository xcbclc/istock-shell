<script lang="ts" module>
  // 导入HTML输入属性类型和主题配置工具
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { CheckboxItemVariantConfig } from '../../../theme/config';

  // 获取CheckboxItem组件的主题配置
  const checkboxItemVariantConfig = CheckboxItemVariantConfig;

  // 定义颜色主题类型（从配置中提取可用颜色）
  export type CheckboxItemColor = keyof (typeof checkboxItemVariantConfig)['variants']['color'];

  // 定义尺寸类型（从配置中提取可用尺寸）
  export type CheckboxItemSize = keyof (typeof checkboxItemVariantConfig)['variants']['size'];

  // 复选框选项类型定义
  export type CheckboxItemOption<T = any> = {
    label?: string; // 显示文本
    value: T; // 实际值
    disabled?: boolean; // 禁用状态
  };

  // 组件属性接口
  export interface CheckboxItemProps<T = any> extends Omit<HTMLInputAttributes, 'size'> {
    color?: CheckboxItemColor; // 颜色主题
    size?: CheckboxItemSize; // 尺寸配置
    groupValue?: T[]; // 组选中值（用于双向绑定）
    option?: CheckboxItemOption<T>; // 关联选项数据
    indeterminate?: boolean; // 不确定状态
  }
</script>

<script lang="ts">
  // 导入样式处理工具
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  let {
    color, // 颜色主题
    size, // 尺寸配置
    groupValue = $bindable([]), // 双向绑定的组值（默认空数组）
    option, // 关联选项
    children, // 子内容
    class: className = '', // 自定义类名
    ...otherProps // 其他原生属性
  }: CheckboxItemProps = $props();

  // 创建Tailwind变体样式生成器
  const checkboxVariants = tv(checkboxItemVariantConfig, {});
</script>

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
