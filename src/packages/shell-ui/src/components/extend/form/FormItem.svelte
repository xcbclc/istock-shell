<!--
@component
ShFormItem 表单项组件

一个功能完整的表单项组件，用于渲染单个表单字段。
基于动态组件加载机制，支持多种输入控件类型和完整的验证功能。

功能特性：
- 支持多种输入控件类型（input、textarea、select、checkbox、radio等）
- 支持标签位置自定义（左侧、右侧、顶部、底部）
- 支持表单验证（必填、长度、范围、正则、自定义验证等）
- 支持错误信息展示
- 支持禁用和只读状态
- 支持自定义样式和布局
- 支持字段描述信息
- 支持栅格布局
- 动态组件加载和缓存
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShFormItem } from '@istock-shell/ui';

  let username = '';

  function handleFieldChange(name, value) {
    console.log('字段变更:', name, value);
  }

  function handleFieldBlur(name) {
    console.log('字段失焦:', name);
  }
</script>

<p>基础输入框</p>
<ShFormItem
  name="username"
  label="用户名"
  field={{
    type: 'input',
    placeholder: '请输入用户名',
    validator: {
      required: true,
      minLength: 3,
      maxLength: 20
    }
  }}
  bind:value={username}
  onFieldChange={handleFieldChange}
  onFieldBlur={handleFieldBlur}
  layout="horizontal"
  size="md"
/>

<p>垂直布局文本域</p>
<ShFormItem
  name="description"
  label="描述"
  field={{
    type: 'textarea',
    placeholder: '请输入描述信息',
    rows: 4
  }}
  layout="vertical"
  description="请详细描述相关信息"
/>

<p>自定义验证</p>
<ShFormItem
  name="email"
  label="邮箱"
  field={{
    type: 'input',
    inputType: 'email',
    validator: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      custom: (value) => {
        if (!value.endsWith('.com')) {
          return '邮箱必须以.com结尾';
        }
        return true;
      }
    }
  }}
  color="primary"
  labelPlacement="top"
/>
```
-->

<script lang="ts" module>
  import type { Component } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { InputType } from '../../../index';
  import {
    FormItemVariantConfig,
    FormItemLabelVariantConfig,
    FormItemFieldContentVariantConfig,
    FormItemFieldComponentVariantConfig,
  } from '../../../theme/config';

  // 导入主题配置
  const formItemVariantConfig = FormItemVariantConfig;
  const formItemFieldContentVariantConfig = FormItemFieldContentVariantConfig;
  const formItemLabelVariantConfig = FormItemLabelVariantConfig;
  const formItemFieldComponentVariantConfig = FormItemFieldComponentVariantConfig;

  // 组件缓存，用于异步加载表单控件组件
  const componentRecord: Record<string, Component<Record<string, any>>> = {};

  // 表单项列数类型
  export type FormItemCols = keyof (typeof FormItemVariantConfig)['variants']['cols'];
  // 表单项布局类型
  export type FormItemLayout = keyof (typeof formItemVariantConfig)['variants']['layout'];
  // 表单项大小类型
  export type FormItemSize = keyof (typeof formItemLabelVariantConfig)['variants']['size'];
  // 表单项颜色类型
  export type FormItemColor = keyof (typeof formItemLabelVariantConfig)['variants']['color'];
  // 表单项标签位置类型
  export type FormItemLabelPlacement =
    keyof (typeof formItemLabelVariantConfig)['variants']['placement'];

  // 支持的表单字段类型常量数组
  export const FormItemFieldTypes = [
    'input',
    'select',
    'checkbox',
    'radio',
    'textarea',
    'toggle',
  ] as const;
  // 表单字段类型
  export type FormItemFieldType = (typeof FormItemFieldTypes)[number];

  /**
   * 表单项验证器接口
   * @interface FormItemValidator
   * @property {boolean} [required] - 是否必填
   * @property {number} [min] - 最小值
   * @property {number} [max] - 最大值
   * @property {number} [minLength] - 最小长度
   * @property {number} [maxLength] - 最大长度
   * @property {RegExp|string} [pattern] - 正则表达式模式
   * @property {Function} [custom] - 自定义验证函数
   */
  export interface FormItemValidator {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp | string;
    custom?: (value: any, values: Record<string, any>) => boolean | string | undefined;
  }

  /**
   * 表单字段配置接口
   * @interface FormItemField
   * @property {FormItemFieldType} [type] - 字段类型
   * @property {any} [value] - 字段值
   * @property {string} [placeholder] - 占位文本
   * @property {string} [description] - 字段描述
   * @property {boolean} [required] - 是否必填
   * @property {boolean} [disabled] - 是否禁用
   * @property {boolean} [readonly] - 是否只读
   * @property {string} [error] - 错误信息
   * @property {InputType} [inputType] - 输入框类型
   * @property {Array<{label: string, value: any}>} [options] - 选项列表
   * @property {boolean} [multiple] - 是否多选
   * @property {FormItemValidator} [validator] - 验证器
   * @property {Function} [onChangeValue] - 值变更回调
   * @property {Function} [onFieldBlur] - 字段失焦回调
   */
  export interface FormItemField {
    type?: FormItemFieldType;
    value?: any;
    placeholder?: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    error?: string;
    inputType?: InputType;
    options?: Array<{ label: string; value: any }>;
    multiple?: boolean;
    validator?: FormItemValidator;
    onChangeValue?: (value?: any) => void;
    onFieldBlur?: (value?: any) => void;
    [k: string]: any;
  }

  /**
   * 表单项属性接口
   * @interface FormItemProps
   * @extends HTMLAttributes<HTMLDivElement>
   * @property {string} name - 字段名称，必填
   * @property {string} [label] - 标签文本
   * @property {string} [labelWidth] - 标签宽度
   * @property {FormItemLabelPlacement} [labelPlacement] - 标签位置
   * @property {FormItemLayout} [layout] - 表单项布局
   * @property {boolean} [touched] - 是否已触碰
   * @property {FormItemField} [field] - 字段配置
   * @property {boolean} [required] - 是否必填
   * @property {FormItemColor} [color] - 颜色
   * @property {FormItemSize} [size] - 大小
   * @property {string} [variant] - 变体
   * @property {FormItemCols} [cols] - 列数
   */
  export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
    name: string;
    label?: string;
    labelWidth?: string;
    labelPlacement?: FormItemLabelPlacement;
    layout?: FormItemLayout;
    touched?: boolean;
    field?: FormItemField;
    required?: boolean;
    color?: FormItemColor;
    size?: FormItemSize;
    variant?: string;
    cols?: FormItemCols;
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { isUndefined, tuc } from '@istock-shell/util';
  import { ShErrorInfo } from '../../index';

  const {
    /** 字段名称，用于标识表单项 */
    name,
    /** 标签文本，显示在表单项前的标签 */
    label,
    /** 标签宽度，自定义标签的宽度 */
    labelWidth,
    /** 标签位置，控制标签相对于字段的位置 */
    labelPlacement,
    /** 表单项布局方式，控制标签和字段的排列方式 */
    layout = 'vertical',
    /** 是否已触碰，用于控制验证错误的显示时机 */
    touched = false,
    /** 字段配置，定义表单项的类型和属性 */
    field,
    /** 是否必填，覆盖字段配置中的必填设置 */
    required = false,
    /** 颜色主题 */
    color,
    /** 尺寸大小 */
    size,
    /** 变体样式 */
    variant,
    /** 栅格列数，控制表单项占用的列数 */
    cols,
    /** 自定义CSS类名 */
    class: className = '',
    /** 子内容插槽，用于自定义表单项内容 */
    children,
    /** 其他HTML属性 */
    ...otherProps
  }: FormItemProps = $props();

  const formItemVariants = tv(formItemVariantConfig);

  const formItemLabelVariants = tv(formItemLabelVariantConfig);

  const formItemFieldContentVariants = tv(formItemFieldContentVariantConfig);

  const formItemFieldComponentVariants = tv(formItemFieldComponentVariantConfig);

  /**
   * 字段属性配置
   * 根据字段配置和组件属性生成最终的字段属性对象
   */
  const fieldProps = $derived.by(() => {
    const {
      type,
      value,
      placeholder,
      description,
      required,
      disabled,
      readonly,
      error,
      inputType,
      options,
      multiple,
      validator = {},
      onChangeValue,
      onFieldBlur,
      onblur,
      ...otherField
    } = field ?? {};
    const { custom, pattern, ...otherValidator } = validator;
    return {
      id: `field-${name}`,
      name,
      type: type === 'input' && inputType ? (inputType ?? 'text') : type,
      value,
      placeholder,
      required: isFieldRequired,
      disabled,
      readonly,
      options,
      multiple,
      color: touched && innerField.error ? 'error' : color,
      size,
      variant,
      onChangeValue,
      onblur: (e: Event) => {
        onblur?.(e);
        onFieldBlur?.(value);
      },
      ...otherField,
      ...otherValidator,
      validator: false, // 不走控件自动校验逻辑
    };
  });

  /**
   * 内部字段状态，确保字段类型始终有效
   * 如果未提供字段配置，则默认创建input类型
   */
  const innerField: FormItemField = $derived.by(() => {
    const newField = field ?? { type: 'input' };
    if (!newField.type) newField.type = 'input';
    return newField;
  });

  /**
   * 计算字段是否必填
   * 优先级：字段级别的required > 字段验证器的required > 表单项级别的required
   */
  const isFieldRequired = $derived.by((): boolean => {
    if (isUndefined(innerField.required) && isUndefined(innerField.validator?.required))
      return required;
    return Boolean(innerField.required) || Boolean(innerField.validator?.required);
  });

  /**
   * 是否显示错误信息
   * 条件：已触碰且存在错误信息
   */
  const shouldShowError = $derived.by((): boolean => {
    return touched && Boolean(innerField.error);
  });

  /**
   * 异步加载对应类型的表单控件组件
   * 支持按需加载，提高性能
   * 会缓存已加载的组件避免重复加载
   * @param {FormItemFieldType} type - 字段类型
   * @returns {Promise<Component<any>>} 异步返回对应的组件
   */
  const getAsyncComponent = async (type: FormItemFieldType): Promise<Component<any>> => {
    let component: Component<any>;
    if (componentRecord[type]) return componentRecord[type];
    switch (type) {
      case 'input':
        component = (await import(`../../data-input/input/index`)).default;
        break;
      case 'select':
        component = (await import(`../../data-input/select/index`)).default;
        break;
      case 'checkbox':
        component = (await import(`../../data-input/checkbox/index`)).default;
        break;
      case 'radio':
        component = (await import(`../../data-input/radio/index`)).default;
        break;
      case 'textarea':
        component = (await import(`../../data-input/textarea/index`)).default;
        break;
      case 'toggle':
        component = (await import(`../../data-input/toggle/index`)).default;
        break;
    }
    if (!component) throw new Error(`未找到${type}对应的组件`);
    componentRecord[type] = component;
    return component;
  };
</script>

<!-- 表单项容器 -->
<div
  class={[tuc(formItemVariants({ layout, size, cols, hasError: shouldShowError })), className]}
  {...otherProps}
>
  <!-- 标签部分 -->
  {#if label}
    <label
      for={`field-${name}`}
      class={tuc(
        formItemLabelVariants({
          layout,
          size,
          color,
          placement: labelPlacement,
          required: isFieldRequired,
          hasError: shouldShowError,
        })
      )}
      style={labelWidth ? `min-width: ${labelWidth}; width: ${labelWidth};` : ''}
    >
      <span>{label}</span>
    </label>
  {/if}

  <!-- 字段内容容器 -->
  <div class={tuc(formItemFieldContentVariants({ layout }))}>
    {#if children}
      <!-- 如果提供了自定义子内容，则渲染子内容 -->
      {@render children?.()}
    {:else}
      <!-- 根据字段类型异步加载并渲染对应的输入组件 -->
      {#if innerField.type && FormItemFieldTypes.includes(innerField.type)}
        {#await getAsyncComponent(innerField.type)}
          <div class={tuc('skeleton h-4 w-full')}></div>
        {:then Component}
          {#if Component}
            <div class={tuc(formItemFieldComponentVariants({ size, layout }))}>
              <Component {...fieldProps} />
            </div>
          {/if}
          <!-- 错误信息 -->
          {#if shouldShowError}
            <p class={tuc('text-error text-xs mt-1')}>{innerField.error}</p>
          {/if}
        {:catch error}
          <ShErrorInfo description={error.message} />
        {/await}
      {:else}
        <ShErrorInfo description={`未知的字段类型: ${innerField.type}`} />
      {/if}
      <!-- 字段描述 -->
      {#if innerField.description}
        <div class={tuc('form-field-description')}>{innerField.description}</div>
      {/if}
    {/if}
  </div>
</div>

<style>
  @reference "../../../style/daisyui.css";
  @layer components {
    :global(.form-item) {
      @apply flex flex-col w-full;
    }

    :global(.form-item-label) {
      @apply flex flex-row items-center;
      height: calc(var(--size-field, 0.25rem) * 10);
    }
    :global(.form-item-label-xs) {
      height: calc(var(--size-field, 0.25rem) * 6);
    }
    :global(.form-item-label-sm) {
      height: calc(var(--size-field, 0.25rem) * 8);
    }
    :global(.form-item-label-md) {
      height: calc(var(--size-field, 0.25rem) * 10);
    }
    :global(.form-item-label-lg) {
      height: calc(var(--size-field, 0.25rem) * 12);
    }
    :global(.form-item-label-xl) {
      height: calc(var(--size-field, 0.25rem) * 14);
    }
    :global(.form-item-label-vertical) {
      height: auto;
    }

    :global(.form-item-content) {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    :global(.form-item-component) {
      display: flex;
      align-items: center;
      min-height: calc(var(--size-field, 0.25rem) * 10);
    }
    :global(.form-item-component-xs) {
      min-height: calc(var(--size-field, 0.25rem) * 6);
    }
    :global(.form-item-component-sm) {
      min-height: calc(var(--size-field, 0.25rem) * 8);
    }
    :global(.form-item-component-md) {
      min-height: calc(var(--size-field, 0.25rem) * 10);
    }
    :global(.form-item-component-lg) {
      min-height: calc(var(--size-field, 0.25rem) * 12);
    }
    :global(.form-item-component-xl) {
      min-height: calc(var(--size-field, 0.25rem) * 14);
    }
    :global(.form-item-component-vertical) {
      min-height: auto;
    }

    :global(.form-field-description) {
      @apply text-xs text-base-content/60 mt-1 italic;
    }
  }
</style>
