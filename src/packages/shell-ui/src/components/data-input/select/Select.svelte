<!--
  ShSelect 选择框组件

  一个功能丰富的选择框组件，支持单选、多选、分组选项和多种样式配置。
  基于原生 HTML select 元素构建，提供完整的类型安全和响应式支持。

  功能特性：
  - 支持单选和多选两种模式
  - 支持多种颜色主题和尺寸规格
  - 支持选项分组显示（optgroup）
  - 可配置选项数据源，快速生成选择列表
  - 支持占位符文本显示
  - 支持双向数据绑定，轻松获取和设置选中值
  - 提供值变更回调函数
  - 完整的响应式设计支持
  - TypeScript 类型安全

  示例用法：
  ```svelte
  <script lang="ts">
    import { ShSelect } from '@istock-shell/ui';

    let selectedValue = $state('');
    let multipleValues = $state([]);

    const options = [
      { label: '选项一', value: 'option1' },
      { label: '选项二', value: 'option2' },
      {
        label: '分组选项',
        value: 'group',
        children: [
          { label: '子选项1', value: 'child1' },
          { label: '子选项2', value: 'child2' }
        ]
      }
    ];

    function handleValueChange(value, option) {
      console.log('选中值:', value, '选项:', option);
    }
  </script>

  <p>基础单选选择框</p>
  <ShSelect
    options={options}
    bind:value={selectedValue}
    placeholder="请选择选项"
    onChangeValue={handleValueChange}
  />

  <p>多选选择框</p>
  <ShSelect
    options={options}
    bind:value={multipleValues}
    multiple
    size="lg"
  />

  <p>带样式变体的选择框</p>
  <ShSelect
    options={options}
    bind:value={selectedValue}
    color="primary"
    variant="bordered"
  />
  ```
-->
<script lang="ts" module>
  import type { HTMLSelectAttributes } from 'svelte/elements';
  import { SelectVariantConfig } from '../../../theme/config';
  import type { SelectItemOption } from './SelectItem.svelte';

  const selectVariantConfig = SelectVariantConfig;

  /**
   * 选择框颜色类型（从主题配置中动态提取）
   * 支持多种预设颜色主题
   * @typedef {keyof SelectVariantConfig['variants']['color']} SelectColor
   */
  export type SelectColor = keyof (typeof selectVariantConfig)['variants']['color'];

  /**
   * 选择框尺寸类型（从主题配置中动态提取）
   * 支持多种尺寸规格
   * @typedef {keyof SelectVariantConfig['variants']['size']} SelectSize
   */
  export type SelectSize = keyof (typeof selectVariantConfig)['variants']['size'];

  /**
   * 选择框样式变体类型（从主题配置中动态提取）
   * 支持多种视觉样式变体
   * @typedef {keyof SelectVariantConfig['variants']['variant']} SelectVariant
   */
  export type SelectVariant = keyof (typeof selectVariantConfig)['variants']['variant'];

  /**
   * 基础选择框属性接口
   * 继承原生 select 元素的所有属性，并排除与组件冲突的属性
   */
  export interface BaseSelectProps extends Omit<HTMLSelectAttributes, 'size' | 'multiple'> {
    /** 颜色主题，支持多种预设颜色 */
    color?: SelectColor;
    /** 尺寸规格，从小到大多种选择 */
    size?: SelectSize;
    /** 样式变体，支持不同的视觉效果 */
    variant?: SelectVariant;
    /** 选项数据源，支持分组和嵌套结构 */
    options?: SelectItemOption[];
    /** 占位符文本，在未选择时显示 */
    placeholder?: string;
  }

  /**
   * 选择框组件属性类型定义
   * 使用联合类型区分单选和多选模式，确保类型安全
   */
  export type SelectProps = BaseSelectProps &
    (
      | {
          /** 多选模式标识 */
          multiple?: true;
          /** 多选模式下的值（数组类型） */
          value?: any[];
          /** 多选模式下的值变更回调函数 */
          onChangeValue?: <T>(value: T[], options?: Array<SelectItemOption<T>>) => void;
        }
      | {
          /** 单选模式标识 */
          multiple?: false;
          /** 单选模式下的值（单一类型） */
          value?: any;
          /** 单选模式下的值变更回调函数 */
          onChangeValue?: <T>(value: T, option?: SelectItemOption<T>) => void;
        }
    );
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc, findByKeyForValue } from '@istock-shell/util';
  import ShSelectItem from './SelectItem.svelte';

  let {
    value = $bindable(), // 双向绑定的当前选中值
    color, // 颜色主题配置
    size = 'md', // 尺寸规格配置
    variant, // 样式变体配置
    placeholder, // 占位符文本
    options = [], // 选项数据列表
    onChangeValue, // 值变更时的回调函数
    class: className = '', // 自定义CSS类名
    ...otherProps // 其他透传给原生select元素的属性
  }: SelectProps = $props();

  // 判断是否为多选模式
  const multiple: boolean = otherProps.multiple ?? false;

  /**
   * 创建选择框的Tailwind变体样式生成器
   * 基于配置生成响应式样式类名
   */
  const selectVariants = tv(selectVariantConfig, {});

  /**
   * 扁平化选项列表，处理分组选项
   * 将包含children的分组选项展开为一维数组，便于查找和匹配
   */
  const allOptions = $derived.by(() => {
    return options.reduce<SelectItemOption[]>((list, option) => {
      if (option?.children?.length) {
        list = [...list, ...option.children];
      }
      list.push(option);
      return list;
    }, []);
  });

  // 初始化多选模式的值为空数组
  if (multiple && !value) {
    value = [];
  }

  /**
   * 监听值变化并触发回调函数
   * 根据单选/多选模式调用不同的回调签名
   */
  $effect(() => {
    if (multiple) {
      // 多选模式：传递值数组和对应的选项对象数组
      const valArray = value;
      onChangeValue?.(
        valArray,
        valArray.map((item: any) => findByKeyForValue(allOptions, item, 'value')).filter((v: any) => !!v)
      );
    } else {
      // 单选模式：传递单个值和对应的选项对象
      const valSingle = value;
      const option = findByKeyForValue<any>(allOptions, valSingle, 'value');
      onChangeValue?.(valSingle, option);
    }
  });

  /**
   * 获取当前选中值的方法
   * 用于双向绑定的getter函数
   */
  const getSelectedValue = () => value;

  /**
   * 设置选中值的方法
   * 用于双向绑定的setter函数，处理单选和多选的不同逻辑
   */
  const setSelectedValue = (newValue: any) => {
    if (multiple) {
      // 多选模式：切换选项的选中状态
      const valArray = value as any[];
      const [val] = newValue ?? [];
      if (valArray.includes(val)) {
        value = valArray.filter((v) => v !== val);
      } else {
        value = [...value, val];
      }
      return;
    }
    // 单选模式：设置或清除选中值
    if (value === newValue) {
      value = undefined;
    } else {
      value = newValue;
    }
  };
</script>

<!--
  选择框主容器
  使用原生 select 元素，支持单选和多选模式
  通过双向绑定实现值的获取和设置
-->
<!-- eslint-disable no-sequences -->
<select
  bind:value={getSelectedValue, setSelectedValue}
  class={[tuc(selectVariants({ color, size, variant })), className]}
  {...otherProps}
>
  {#if placeholder}
    <!--
      占位符选项
      当设置了占位符时显示，作为禁用的默认选项
      在多选模式下，当没有选中任何值时显示为选中状态
      在单选模式下，当值为空时显示为选中状态
    -->
    <ShSelectItem
      option={{ label: placeholder, value: '', disabled: true }}
      selected={multiple ? !value.length : !value}
    />
  {/if}

  {#each options as option, index (index)}
    {#if option.children?.length}
      <!--
        选项分组渲染
        当选项包含 children 属性时，使用 optgroup 元素进行分组
        分组标签使用选项的 label 属性
      -->
      <optgroup label={`${option?.label || ''}`}>
        {#each option.children as child, cIndex (cIndex)}
          <!--
            分组内的子选项
            根据单选/多选模式判断选中状态
          -->
          <ShSelectItem option={child} selected={multiple ? value.includes(child.value) : value === child.value} />
        {/each}
      </optgroup>
    {:else}
      <!--
        普通选项渲染
        没有子选项的常规选项
        根据单选/多选模式判断选中状态
      -->
      <ShSelectItem {option} selected={multiple ? value.includes(option.value) : value === option.value} />
    {/if}
  {/each}
</select>

<style></style>
