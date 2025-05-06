<!--
@component
表单组件，用于构建完整的表单界面，管理多个表单项。提供以下功能：
- 支持多种表单布局（水平、垂直）
- 支持栅格布局（1-5列）
- 支持表单验证（必填、长度、范围、正则、自定义验证等）
- 支持表单值的双向绑定
- 支持表单重置和提交
- 支持自定义按钮位置和文本
- 支持表单项的显示/隐藏控制
- 支持表单验证状态管理
- 支持表单值变更和提交事件回调

用法示例:
```html
<Form
  formItems={[
    {
      name: 'username',
      label: '用户名',
      field: {
        type: 'input',
        placeholder: '请输入用户名',
        validator: {
          required: true,
          minLength: 3,
          maxLength: 20
        }
      }
    },
    {
      name: 'password',
      label: '密码',
      field: {
        type: 'input',
        inputType: 'password',
        validator: {
          required: true,
          minLength: 6
        }
      }
    }
  ]}
  bind:values={formValues}
  onSubmit={handleSubmit}
  layout="vertical"
  cols={2}
/>
```
-->

<script lang="ts" module>
  import type { HTMLFormAttributes } from 'svelte/elements';
  import { onMount } from 'svelte';
  import { tv } from 'tailwind-variants';
  import { tuc, isString, clone } from '@istock/util';
  import type {
    FormItemProps,
    FormItemLayout,
    FormItemColor,
    FormItemSize,
    FormItemLabelPlacement,
    FormItemField,
  } from './FormItem.svelte';
  import { FormVariantConfig, FormButtonVariantConfig } from '../../../theme/config';
  import { ShButton } from '../../index';
  import FormItem from './FormItem.svelte';

  const formVariantConfig = FormVariantConfig;
  const formButtonVariantConfig = FormButtonVariantConfig;

  // 按钮位置类型
  export type FormButtonPlacement = keyof (typeof FormButtonVariantConfig)['variants']['placement'];

  // 表单列数类型
  export type FormCols = keyof (typeof formVariantConfig)['variants']['cols'];

  // 表单项配置接口，继承自FormItemProps但排除touched属性
  export interface FormItemConfig extends Omit<FormItemProps, 'touched'> {}

  /**
   * 表单组件属性接口
   * @interface FormProps
   * @extends HTMLFormAttributes
   * @property {FormItemConfig[]} [formItems] - 表单字段配置数组
   * @property {Record<string, any>} [values] - 表单值对象
   * @property {Function} [onChangeValues] - 表单值变更回调
   * @property {Function} [onChangeValue] - 单个字段值变更回调
   * @property {Function} [onSubmit] - 表单提交回调
   * @property {FormItemLayout} [layout] - 表单布局
   * @property {FormCols} [cols] - 表单的列数
   * @property {string} [labelWidth] - 标签宽度
   * @property {FormItemLabelPlacement} [labelPlacement] - 标签位置
   * @property {FormButtonPlacement} [buttonPlacement] - 按钮位置
   * @property {string} [submitText] - 提交按钮文本
   * @property {string} [resetText] - 重置按钮文本
   * @property {boolean} [showReset] - 是否显示重置按钮
   * @property {boolean} [showSubmit] - 是否显示提交按钮
   * @property {FormItemColor} [color] - 表单默认颜色主题
   * @property {FormItemSize} [size] - 表单默认尺寸
   * @property {string} [variant] - 表单默认变体
   * @property {boolean} [initValidate] - 是否在初始化时进行验证
   */
  export interface FormProps extends HTMLFormAttributes {
    formItems?: FormItemConfig[];
    values?: Record<string, any>;
    onChangeValues?: (values: Record<string, any>, isValid: boolean) => void;
    onChangeValue?: (name: string, value: any) => void;
    onSubmit?: (values: Record<string, any>) => void;
    layout?: FormItemLayout;
    cols?: FormCols;
    labelWidth?: string;
    labelPlacement?: FormItemLabelPlacement;
    buttonPlacement?: FormButtonPlacement;
    submitText?: string;
    resetText?: string;
    showReset?: boolean;
    showSubmit?: boolean;
    color?: FormItemColor;
    size?: FormItemSize;
    variant?: string;
    initValidate?: boolean;
  }
</script>

<script lang="ts">
  let {
    formItems = [],
    values = $bindable({}),
    onChangeValues,
    onChangeValue,
    onSubmit,
    layout = 'horizontal',
    cols = 1,
    labelWidth = '120px',
    labelPlacement = 'end',
    submitText = '提交',
    resetText = '重置',
    buttonPlacement = 'end',
    showReset = true,
    showSubmit = true,
    color,
    size = 'md',
    variant,
    initValidate = false,
    class: className = '',
    children,
    ...otherProps
  }: FormProps = $props();

  const formVariants = tv({
    base: formVariantConfig.base,
    variants: formVariantConfig.variants,
    defaultVariants: {
      ...formVariantConfig.defaultVariants,
      size: formVariantConfig.defaultVariants.size as any,
    },
  });

  const formButtonVariants = tv({
    base: formButtonVariantConfig.base,
    variants: formButtonVariantConfig.variants,
    defaultVariants: {
      ...formButtonVariantConfig.defaultVariants,
      size: formButtonVariantConfig.defaultVariants.size as any,
    },
  });

  // 表单错误信息记录
  const formErrors: Record<string, string> = $state({});
  // 表单字段触碰状态记录
  const formBlurs: Record<string, boolean> = $state({});
  // 表单整体验证状态
  let formValidState: boolean = $state(true);
  // 表单初始值记录
  let initialValues: Record<string, any> = {};
  // 表单项属性记录
  const formItemPropRecord: Record<string, FormItemProps> = {};
  // 表单项隐藏状态记录
  const formItemHiddenRecord: Record<string, boolean> = $state({});

  /**
   * 组件挂载时初始化
   * 设置表单初始值，并根据配置决定是否进行初始验证
   */
  onMount(() => {
    const defaultFormValues = formItems.reduce<Record<string, any>>((acc, formItem) => {
      const { field = {}, name } = formItem;
      if (field.defaultValue !== undefined) {
        acc[name] = field.defaultValue;
      } else if (values[name] !== undefined) {
        acc[name] = values[name];
      } else {
        acc[name] = null;
      }
      return acc;
    }, {});

    initialValues = clone(defaultFormValues);

    if (initValidate && formItems.length > 0) {
      validateForm();
    }
  });

  $effect(() => {
    formItems.forEach((formItem) => {
      getFormItemProps(clone(formItem));
    });
  });
  $effect(() => {
    formItems.forEach((formItem) => {
      formItemHiddenRecord[formItem.name] = isFieldHidden(formItem, values);
    });
  });

  /**
   * 判断字段是否隐藏
   * @param formItem 表单项配置
   * @returns 是否隐藏
   */
  const isFieldHidden = (formItem: FormItemConfig, values): boolean => {
    const { field = {} } = formItem;
    if (field.hidden === undefined) return false;
    if (typeof field.hidden === 'function') {
      try {
        return field.hidden(values);
      } catch (error) {
        console.error('字段隐藏条件计算错误:', error);
        return false;
      }
    }
    return field.hidden;
  };

  /**
   * 获取可见的表单项配置
   * @returns 过滤后的表单项配置数组
   */
  const getFormItems = (): FormItemConfig[] => {
    return formItems.filter((formItem) => !formItemHiddenRecord[formItem.name]);
  };

  /**
   * 获取表单项属性
   * 使用代理对象动态处理属性访问，支持默认值继承和动态计算
   * @param formItem 表单项配置
   * @returns 处理后的表单项属性
   */
  const getFormItemProps = (formItem: FormItemConfig): FormItemProps => {
    const name = formItem.name;
    const {
      field = {},
      layout: formItemLayout,
      labelWidth: formItemLabelWidth,
      color: formItemColor,
      size: formItemSize,
      variant: formItemVariant,
      ...otherFormItem
    } = formItem;
    const { value, error, onChangeValue: onFieldChangeValue, onFieldBlur, ...otherField } = field;

    // 创建基础字段对象
    const baseField: FormItemField = {
      onChangeValue: (value: any) => {
        onFormItemFieldChange(name, value);
        onFieldChangeValue?.(value);
      },
      onFieldBlur: (value: any) => {
        onFormItemFieldBlur(name);
        onFieldBlur?.(value);
      },
    };

    // 创建基础属性对象
    const baseProps: FormItemProps = {
      name: formItem.name,
      field: new Proxy(baseField, {
        get(target, prop, receiver) {
          // 如果目标对象已有该属性，直接返回
          if (prop in target) {
            return Reflect.get(target, prop, receiver);
          }
          // 根据属性名动态返回值
          switch (prop) {
            case 'value':
              return values[name];
            case 'error':
              return formErrors[name];
            default:
              if (prop in otherField) {
                return otherField[prop as keyof typeof otherField];
              }
              return undefined;
          }
        },
        // 检查属性是否存在
        has(target, prop) {
          return prop in target || ['value', 'error'].includes(prop as string) || prop in otherField;
        },
      }),
    };

    // 创建代理对象，以便动态处理属性访问
    const handler: ProxyHandler<FormItemProps> = {
      get(target, prop, receiver) {
        // 如果目标对象已有该属性，直接返回
        if (prop in target) {
          return Reflect.get(target, prop, receiver);
        }
        // 根据属性名动态返回值
        switch (prop) {
          case 'layout':
            return formItemLayout ?? layout;
          case 'labelWidth':
            return formItemLabelWidth ?? labelWidth;
          case 'labelPlacement':
            return labelPlacement;
          case 'color':
            return formItemColor ?? color;
          case 'size':
            return formItemSize ?? size;
          case 'variant':
            return formItemVariant ?? variant;
          case 'touched':
            return formBlurs[name];
          default:
            if (prop in otherFormItem) {
              return otherFormItem[prop as keyof typeof otherFormItem];
            }
            return undefined;
        }
      },

      // 检查属性是否存在
      has(target, prop) {
        return (
          prop in target ||
          ['layout', 'labelWidth', 'labelPlacement', 'color', 'size', 'variant', 'touched'].includes(prop as string) ||
          prop in otherFormItem
        );
      },
    };
    const newFormItemProp = new Proxy(baseProps, handler);
    const formItemProp = formItemPropRecord[formItem.name];
    if (!formItemProp) {
      formItemPropRecord[formItem.name] = newFormItemProp;
    }
    return formItemPropRecord[formItem.name];
  };

  /**
   * 验证表单
   * 遍历所有表单项进行验证，更新错误信息和验证状态
   * @returns 表单是否验证通过
   */
  const validateForm = (): boolean => {
    Object.keys(formErrors).forEach((key) => {
      formErrors[key] = '';
    });
    formItems.forEach((formItem) => {
      const { field = {} } = formItem;
      if (formItemHiddenRecord[formItem.name]) {
        return;
      }
      const fieldLabel = formItem.label || formItem.name;
      const name = formItem.name;
      const value = values[name];
      const validator = field.validator || {};

      if (!Object.keys(validator).length && !field.required) return;

      // 必填验证
      if ((validator.required || field.required) && (value === undefined || value === null || value === '')) {
        formErrors[name] = `${fieldLabel}不能为空`;
        return;
      }

      // 已有值时进行其他验证
      if (value !== undefined && value !== null && value !== '') {
        // 正则表达式验证
        if (validator.pattern) {
          const pattern = typeof validator.pattern === 'string' ? new RegExp(validator.pattern) : validator.pattern;

          if (!pattern.test(String(value))) {
            formErrors[name] = `${fieldLabel}格式不正确`;
            return;
          }
        }

        // 数值/长度验证
        if (typeof value === 'number' || typeof value === 'string') {
          const numValue = typeof value === 'number' ? value : value.length;

          // 最小值/长度验证
          if (validator.min !== undefined && numValue < validator.min) {
            formErrors[name] =
              `${fieldLabel}${typeof value === 'number' ? '不能小于' : '长度不能小于'} ${validator.min}`;
            return;
          }

          // 最大值/长度验证
          if (validator.max !== undefined && numValue > validator.max) {
            formErrors[name] =
              `${fieldLabel}${typeof value === 'number' ? '不能大于' : '长度不能大于'} ${validator.max}`;
            return;
          }
        }

        // 字符串长度验证
        if (typeof value === 'string') {
          // 最小长度验证
          if (validator.minLength !== undefined && value.length < validator.minLength) {
            formErrors[name] = `${fieldLabel}长度不能小于 ${validator.minLength}`;
            return;
          }

          // 最大长度验证
          if (validator.maxLength !== undefined && value.length > validator.maxLength) {
            formErrors[name] = `${fieldLabel}长度不能大于 ${validator.maxLength}`;
            return;
          }
        }

        // 自定义验证
        if (validator.custom) {
          try {
            const result = validator.custom(value, values);
            if (isString(result) || result === false) {
              formErrors[name] = isString(result) ? result : `${fieldLabel}验证失败`;
            }
          } catch (error: any) {
            console.error('自定义验证器错误:', error);
            formErrors[name] = error?.message || `${fieldLabel}验证出错`;
          }
        }
      }
    });
    const isValid = !Object.values(formErrors).some((v) => v);

    if (formValidState !== isValid) {
      formValidState = isValid;
    }

    return isValid;
  };

  /**
   * 处理表单项值变更
   * @param name 字段名
   * @param value 新值
   */
  const onFormItemFieldChange = (name: string, value: any) => {
    if (JSON.stringify(values[name]) === JSON.stringify(value)) {
      return;
    }
    values[name] = value;
    if (formBlurs[name]) setTimeout(() => validateForm(), 0);

    onChangeValue?.(name, value);
    onChangeValues?.(values, formValidState);
  };

  /**
   * 处理表单项失焦
   * @param name 字段名
   */
  const onFormItemFieldBlur = (name: string) => {
    // 仅当该字段未被标记为touched时才进行标记
    if (!formBlurs[name]) {
      formBlurs[name] = true;
    }
    validateForm();
  };

  /**
   * 处理表单提交
   * @param event 提交事件对象
   */
  const onFormSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    // 标记所有字段为已触碰
    formItems.forEach((formItem) => {
      if (!formItemHiddenRecord[formItem.name]) {
        formBlurs[formItem.name] = true;
      }
    });

    const isValid = validateForm();

    if (isValid && onSubmit) {
      onSubmit(clone(values)); // 传入值的副本，避免引用问题
    }
  };

  /**
   * 处理表单重置
   * 重置所有字段值、错误信息和触碰状态
   */
  const onFormReset = () => {
    const resetValues = clone(initialValues);

    Object.keys(values).forEach((key) => {
      values[key] = resetValues[key] !== undefined ? resetValues[key] : null;
    });

    Object.keys(formErrors).forEach((key) => {
      formErrors[key] = '';
    });

    Object.keys(formBlurs).forEach((key) => {
      formBlurs[key] = false;
    });

    formValidState = true;

    // 触发外部回调
    onChangeValues?.(values, true);
  };
</script>

<!-- 表单容器 -->
<form class={[tuc(formVariants({ layout, size, cols })), className]} {...otherProps} onsubmit={onFormSubmit}>
  {#if children}
    <!-- 如果提供了自定义子内容，则渲染子内容 -->
    {@render children?.()}
  {:else}
    <!-- 表单内容区 -->
    {#each getFormItems() as formItem (formItem.name)}
      {@const props = getFormItemProps(formItem)}
      <FormItem {...props} />
    {/each}

    <!-- 按钮区域 -->
    {#if showReset || showSubmit}
      <div
        class={tuc(
          formButtonVariants({ layout, size, cols: layout === 'vertical' ? cols : 0, placement: buttonPlacement })
        )}
      >
        {#if showReset}
          <ShButton {size} onclick={onFormReset} type="button">
            {resetText}
          </ShButton>
        {/if}
        {#if showSubmit}
          <ShButton {size} color={color ?? 'primary'} type="submit" disabled={!formValidState}>
            {submitText}
          </ShButton>
        {/if}
      </div>
    {/if}
  {/if}
</form>

<style>
  @reference "../../../style/daisyui.css";
  @layer components {
    :global(.form) {
      @apply grid;
    }
    :global(.form-button-area) {
      @apply flex;
    }
  }
</style>
