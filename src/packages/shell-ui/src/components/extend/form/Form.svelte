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

  export type FormButtonPlacement = keyof (typeof FormButtonVariantConfig)['variants']['placement'];

  export type FormCols = keyof (typeof formVariantConfig)['variants']['cols'];

  export interface FormItemConfig extends Omit<FormItemProps, 'touched'> {}

  // 动态表单组件属性接口
  export interface FormProps extends HTMLFormAttributes {
    formItems?: FormItemConfig[]; // 表单字段配置数组
    values?: Record<string, any>; // 表单值对象
    onChangeValues?: (values: Record<string, any>, isValid: boolean) => void; // 表单值变更回调
    onChangeValue?: (name: string, value: any) => void;
    onSubmit?: (values: Record<string, any>) => void; // 表单提交回调
    layout?: FormItemLayout; // 表单布局
    cols?: FormCols; // 表单的列数（用于栅格布局）
    labelWidth?: string; // 标签宽度（仅用于水平布局）
    labelPlacement?: FormItemLabelPlacement;
    buttonPlacement?: FormButtonPlacement;
    submitText?: string; // 提交按钮文本
    resetText?: string; // 重置按钮文本
    showReset?: boolean; // 是否显示重置按钮
    showSubmit?: boolean; // 是否显示提交按钮
    color?: FormItemColor; // 表单默认颜色主题
    size?: FormItemSize; // 表单默认尺寸
    variant?: string; // 表单默认变体
    initValidate?: boolean;
  }
</script>

<script lang="ts">
  let {
    formItems = [], // 表单字段配置
    values = $bindable({}), // 双向绑定的表单值
    onChangeValues, // 表单值变更回调
    onChangeValue,
    onSubmit, // 表单提交回调
    layout = 'horizontal', // 默认垂直布局
    cols = 1, // 默认单列
    labelWidth = '120px', // 默认标签宽度
    labelPlacement = 'end',
    submitText = '提交', // 默认提交按钮文本
    resetText = '重置', // 默认重置按钮文本
    buttonPlacement = 'end',
    showReset = true, // 默认显示重置按钮
    showSubmit = true, // 默认显示提交按钮
    color, // 表单默认颜色主题
    size = 'md', // 表单默认尺寸
    variant, // 表单默认变体
    initValidate = false,
    class: className = '', // 自定义类名
    children,
    ...otherProps // 其他原生属性
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

  const formErrors: Record<string, string> = $state({});
  const formBlurs: Record<string, boolean> = $state({});
  let formValidState: boolean = $state(true);
  let initialValues: Record<string, any> = {};
  const formItemPropRecord: Record<string, FormItemProps> = {};

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

  const isFieldHidden = (formItem: FormItemConfig): boolean => {
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

  const getFormItems = (): FormItemConfig[] => {
    return formItems.filter((formItem) => !isFieldHidden(formItem));
  };

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

    // 创建基础对象
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
    const baseProps: FormItemProps = {
      name: formItem.name,
      field: new Proxy(baseField, {
        get(target, prop, receiver) {
          console.log('propprop', prop);
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
        console.log('prop', prop);
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
            if (prop === 'label') debugger;
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

  const validateForm = (): boolean => {
    Object.keys(formErrors).forEach((key) => {
      formErrors[key] = '';
    });

    formItems.forEach((formItem) => {
      const { field = {} } = formItem;
      if (isFieldHidden(formItem)) {
        return;
      }
      const fieldLabel = formItem.label || formItem.name;
      const name = formItem.name;
      const value = values[name];
      const validator = field.validator;

      if (!validator) return;

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

  const onFormItemFieldChange = (name: string, value: any) => {
    if (JSON.stringify(values[name]) === JSON.stringify(value)) {
      return;
    }
    values[name] = value;
    if (formBlurs[name]) setTimeout(() => validateForm(), 0);

    onChangeValue?.(name, value);
    onChangeValues?.(values, formValidState);
  };

  const onFormItemFieldBlur = (name: string) => {
    // 仅当该字段未被标记为touched时才进行标记
    if (!formBlurs[name]) {
      formBlurs[name] = true;
    }
    validateForm();
  };

  const onFormSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    // 标记所有字段为已触碰
    formItems.forEach((formItem) => {
      if (!isFieldHidden(formItem)) {
        formBlurs[formItem.name] = true;
      }
    });

    const isValid = validateForm();

    if (isValid && onSubmit) {
      onSubmit(clone(values)); // 传入值的副本，避免引用问题
    }
  };

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

<form class={[tuc(formVariants({ layout, size, cols })), className]} onsubmit={onFormSubmit} {...otherProps}>
  {#if children}
    {@render children?.()}
  {:else}
    <!-- 表单内容区 -->
    {#each getFormItems() as formItem (formItem.name)}
      {@const props = getFormItemProps(formItem)}
      <FormItem {...props} />
    {/each}

    <!-- 按钮区域 -->
    {#if showReset || showSubmit}
      <div class={tuc(formButtonVariants({ layout, size, placement: buttonPlacement }))}>
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
