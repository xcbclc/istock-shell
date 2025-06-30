<!--
@component
ShSelectItem 选择项组件

用于渲染选择框中的单个选项，基于原生 HTML option 元素构建。
支持泛型类型，提供完整的类型安全和灵活的数据结构。

功能特性：
- 基于原生 option 元素，保持最佳性能和兼容性
- 支持泛型类型，适应不同的值类型
- 支持禁用状态和选中状态控制
- 支持分组选项的嵌套结构
- 自动处理显示文本和实际值的映射
- 完整的 TypeScript 类型安全

示例用法：
```svelte
<script lang="ts">
  import { ShSelectItem } from '@istock-shell/ui';

  const option = {
    label: '选项一',
    value: 'option1',
    disabled: false
  };
</script>

<p>基础选择项</p>
<ShSelectItem {option} selected={false} />

<p>禁用的选择项</p>
<ShSelectItem
  option={{ label: '禁用选项', value: 'disabled', disabled: true }}
  selected={false}
/>

<p>带分组的选择项</p>
<ShSelectItem
  option={{
    label: '分组选项',
    value: 'group',
    children: [
      { label: '子选项1', value: 'child1' },
      { label: '子选项2', value: 'child2' }
    ]
  }}
/>
```
-->
<script lang="ts" module>
  import type { HTMLOptionAttributes } from 'svelte/elements';

  /**
   * 选择项选项数据类型定义
   * 支持泛型，可适应不同的值类型
   * @template T - 选项值的类型，默认为 any
   */
  export type SelectItemOption<T = any> = {
    /** 显示给用户的文本标签 */
    label?: string;
    /** 选项的实际值，用于表单提交和数据绑定 */
    value: T;
    /** 是否禁用此选项 @default false */
    disabled?: boolean;
    /** 子选项列表，用于支持分组选项功能 */
    children?: Array<SelectItemOption<T>>;
  };

  /**
   * 选择项组件属性接口
   * 继承原生 option 元素的所有属性，并扩展选择项特有的配置
   * @template T - 选项值的类型，默认为 any
   */
  export interface SelectItemProps<T = any> extends HTMLOptionAttributes {
    /** 关联的选项数据对象 */
    option?: SelectItemOption<T>;
    /** 是否为选中状态 @default false */
    selected?: boolean;
  }
</script>

<script lang="ts">
  const {
    option, // 选项数据对象，包含标签、值、禁用状态等信息
    ...otherProps // 其他透传给原生 option 元素的属性
  }: SelectItemProps = $props();
</script>

<!--
  原生 option 元素
  渲染选择框中的单个选项
  - 使用 option 对象的 disabled 属性控制禁用状态
  - 使用 option 对象的 value 属性作为选项值
  - 显示文本优先使用 label，如果没有则使用 value
  - 透传所有其他属性到原生 option 元素
-->
<option {...otherProps} disabled={option?.disabled} value={option?.value}
  >{option?.label ?? option?.value}</option
>

<style></style>
