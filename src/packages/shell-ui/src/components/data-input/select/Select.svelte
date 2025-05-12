<script lang="ts" module>
  import type { HTMLSelectAttributes } from 'svelte/elements';
  import { SelectVariantConfig } from '../../../theme/config';
  import type { SelectItemOption } from './SelectItem.svelte';

  const selectVariantConfig = SelectVariantConfig;
  // 定义选择框颜色主题类型（从配置中提取）
  export type SelectColor = keyof (typeof selectVariantConfig)['variants']['color'];
  // 定义选择框尺寸类型（从配置中提取）
  export type SelectSize = keyof (typeof selectVariantConfig)['variants']['size'];
  // 定义选择框变体类型（从配置中提取）
  export type SelectVariant = keyof (typeof selectVariantConfig)['variants']['variant'];

  // 基础属性接口（继承并扩展select元素属性）
  export interface BaseSelectProps extends Omit<HTMLSelectAttributes, 'size' | 'multiple'> {
    color?: SelectColor; // 颜色主题
    size?: SelectSize; // 尺寸配置
    variant?: SelectVariant; // 样式变体
    options?: SelectItemOption[]; // 选项数据源
    placeholder?: string; // 占位符文本
  }

  export type SelectProps = BaseSelectProps &
    (
      | {
          multiple?: true; // 多选模式
          value?: any[]; // 数组类型值
          onChangeValue?: <T>(value: T[], options?: Array<SelectItemOption<T>>) => void; // 多选回调
        }
      | {
          multiple?: false; // 单选模式
          value?: any; // 单值类型
          onChangeValue?: <T>(value: T, option?: SelectItemOption<T>) => void; // 单选回调
        }
    );
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc, findByKeyForValue } from '@istock/util';
  import ShSelectItem from './SelectItem.svelte';

  let {
    value = $bindable(), // 双向绑定的值
    color, // 颜色主题
    size, // 尺寸配置
    variant, // 样式变体
    placeholder, // 占位符
    options = [], // 选项列表
    onChangeValue, // 变更回调
    class: className = '', // 自定义类名
    ...otherProps // 其他原生属性
  }: SelectProps = $props();

  // 判断是否多选模式
  const multiple: boolean = otherProps.multiple ?? false;

  // 创建选择框样式生成器
  const selectVariants = tv(selectVariantConfig, {});

  // 扁平化选项列表（处理分组）
  const allOptions = $derived.by(() => {
    return options.reduce<SelectItemOption[]>((list, option) => {
      if (option?.children?.length) {
        list = [...list, ...option.children];
      }
      list.push(option);
      return list;
    }, []);
  });

  // 初始化多选值
  if (multiple && !value) {
    value = [];
  }

  // 值变化时触发onChangeValue回调
  $effect(() => {
    if (multiple) {
      // 多选模式处理
      const valArray = value as any[];
      onChangeValue?.(
        valArray,
        valArray.map((v) => findByKeyForValue(allOptions, v, 'value')).filter((v) => !!v)
      );
    } else {
      // 单选模式处理
      const valSingle = value;
      const option = findByKeyForValue(allOptions, valSingle, 'value');
      onChangeValue?.(valSingle, option);
    }
  });

  // 获取/设置选中值的方法（适配双向绑定）
  const getSelectedValue = () => value;
  const setSelectedValue = (newValue: any) => {
    if (multiple) {
      const valArray = value as any[];
      const [val] = newValue ?? [];
      if (valArray.includes(val)) {
        value = valArray.filter((v) => v !== val);
      } else {
        value = [...value, val];
      }
      return;
    }
    if (value === newValue) {
      value = undefined;
    } else {
      value = newValue;
    }
  };
</script>

<!-- 选择框容器 -->
<!-- eslint-disable no-sequences -->
<select
  bind:value={getSelectedValue, setSelectedValue}
  class={[tuc(selectVariants({ color, size, variant })), className]}
  {...otherProps}
>
  {#if placeholder}
    <!-- 占位符选项 -->
    <ShSelectItem
      option={{ label: placeholder, value: '', disabled: true }}
      selected={multiple ? !value.length : !value}
    />
  {/if}

  {#each options as option, index (index)}
    {#if option.children?.length}
      <!-- 选项分组 -->
      <optgroup label={`${option?.label || ''}`}>
        {#each option.children as child, cIndex (cIndex)}
          <ShSelectItem option={child} selected={multiple ? value.includes(child.value) : value === child.value} />
        {/each}
      </optgroup>
    {:else}
      <!-- 普通选项 -->
      <ShSelectItem {option} selected={multiple ? value.includes(option.value) : value === option.value} />
    {/if}
  {/each}
</select>

<style></style>
