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

  const formItemVariantConfig = FormItemVariantConfig;
  const formItemFieldContentVariantConfig = FormItemFieldContentVariantConfig;
  const formItemLabelVariantConfig = FormItemLabelVariantConfig;
  const formItemFieldComponentVariantConfig = FormItemFieldComponentVariantConfig;

  const componentRecord: Record<string, Component<Record<string, any>>> = {};

  export type FormItemCols = keyof (typeof FormItemVariantConfig)['variants']['cols'];
  export type FormItemLayout = keyof (typeof formItemVariantConfig)['variants']['layout'];
  export type FormItemSize = keyof (typeof formItemLabelVariantConfig)['variants']['size'];
  export type FormItemColor = keyof (typeof formItemLabelVariantConfig)['variants']['color'];
  export type FormItemLabelPlacement = keyof (typeof formItemLabelVariantConfig)['variants']['placement'];

  export const FormItemFieldTypes = ['input', 'select', 'checkbox', 'radio', 'textarea', 'toggle'] as const;
  export type FormItemFieldType = (typeof FormItemFieldTypes)[number];

  export interface FormItemValidator {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp | string;
    custom?: (value: any, values: Record<string, any>) => boolean | string | undefined;
  }

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
  import { isUndefined, tuc } from '@istock/util';
  import { ShErrorInfo } from '../../index';

  const {
    name,
    label,
    labelWidth,
    labelPlacement,
    layout = 'vertical',
    touched = false,
    field,
    required = false,
    color,
    size,
    variant,
    cols,
    class: className = '',
    children,
    ...otherProps
  }: FormItemProps = $props();

  const formItemVariants = tv(formItemVariantConfig);

  const formItemLabelVariants = tv(formItemLabelVariantConfig);

  const formItemFieldContentVariants = tv(formItemFieldContentVariantConfig);

  const formItemFieldComponentVariants = tv(formItemFieldComponentVariantConfig);

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
    const { custom, ...otherValidator } = validator;
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

  const innerField: FormItemField = $derived.by(() => {
    const newField = field ?? { type: 'input' };
    if (!newField.type) newField.type = 'input';
    return newField;
  });

  const isFieldRequired = $derived.by((): boolean => {
    if (isUndefined(innerField.required) && isUndefined(innerField.validator?.required)) return required;
    return Boolean(innerField.required) || Boolean(innerField.validator?.required);
  });

  const shouldShowError = $derived.by((): boolean => {
    return touched && Boolean(innerField.error);
  });

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

<div class={[tuc(formItemVariants({ layout, size, cols, hasError: shouldShowError })), className]} {...otherProps}>
  <!-- 标签 -->
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

  <!-- 字段容器 -->
  <div class={tuc(formItemFieldContentVariants({ layout }))}>
    {#if children}
      {@render children?.()}
    {:else}
      <!-- 根据字段类型渲染不同的输入组件 -->
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
