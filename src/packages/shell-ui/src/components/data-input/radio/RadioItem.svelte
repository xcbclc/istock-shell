<script lang="ts" module>
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { RadioItemVariantConfig } from '../../../theme/config';

  const radioItemVariantConfig = RadioItemVariantConfig;
  export type RadioItemColor = keyof (typeof radioItemVariantConfig)['variants']['color'];
  // 定义单选按钮尺寸类型（从配置中提取）
  export type RadioItemSize = keyof (typeof radioItemVariantConfig)['variants']['size'];

  // 单选选项类型定义（泛型支持）
  export type RadioItemOption<T = any> = {
    label?: string; // 显示文本
    value: T; // 实际值
    disabled?: boolean; // 禁用状态
  };

  // 组件属性接口（继承并扩展HTML输入属性）
  export interface RadioItemProps<T = any> extends Omit<HTMLInputAttributes, 'size'> {
    color?: RadioItemColor; // 颜色主题
    size?: RadioItemSize; // 尺寸配置
    groupValue?: T; // 组选中值（用于双向绑定）
    option?: RadioItemOption<T>; // 关联选项数据
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock/util';

  let {
    color, // 颜色主题
    size, // 尺寸配置
    groupValue = $bindable(), // 双向绑定的组值
    option, // 关联选项
    children, // 子内容
    class: className = '', // 自定义类名
    ...otherProps // 其他原生属性
  }: RadioItemProps = $props();

  // 创建Tailwind变体样式生成器
  const radioVariants = tv(radioItemVariantConfig, {
    responsiveVariants: ['size'], // 响应式尺寸变体配置
  });
</script>

<!-- 单选按钮输入元素 -->
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
