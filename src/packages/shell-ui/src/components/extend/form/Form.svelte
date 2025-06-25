<!--
@component
ShForm 表单组件

一个功能完整的表单组件，用于构建复杂的表单界面，管理多个表单项。
基于原生 HTML form 元素构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持多种表单布局（水平、垂直）
- 支持栅格布局（1-5列）
- 支持表单验证（必填、长度、范围、正则、自定义验证等）
- 支持表单值的双向绑定
- 支持表单重置和提交
- 支持自定义按钮位置和文本
- 支持表单项的显示/隐藏控制
- 支持表单验证状态管理
- 支持表单值变更和提交事件回调
- 继承所有原生 form 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShForm } from '@istock-shell/ui';

  const formItems = [
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
  ];

  let formValues = {};

  function handleSubmit(values) {
    console.log('表单提交:', values);
  }

  function handleValueChange(name, value) {
    console.log('字段变更:', name, value);
  }
</script>

<p>基础表单</p>
<ShForm
  {formItems}
  bind:values={formValues}
  onSubmit={handleSubmit}
  layout="vertical"
  cols={2}
/>

<p>水平布局表单</p>
<ShForm
  {formItems}
  bind:values={formValues}
  onSubmit={handleSubmit}
  onChangeValue={handleValueChange}
  layout="horizontal"
  labelWidth="100px"
  buttonPlacement="center"
/>

<p>自定义按钮表单</p>
<ShForm
  {formItems}
  bind:values={formValues}
  onSubmit={handleSubmit}
  submitText="保存"
  resetText="清空"
  showReset={true}
  initValidate={true}
/>
```
-->

<script lang="ts" module>
  import type { HTMLFormAttributes } from 'svelte/elements';
  import { onMount } from 'svelte';
  import { tv } from 'tailwind-variants';
  import { tuc, isString, clone } from '@istock-shell/util';
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

  /**
   * 表单按钮位置类型（从主题配置中动态提取）
   * 支持的位置包括：start（开始）、center（居中）、end（结束）等
   * @typedef {keyof FormButtonVariantConfig['variants']['placement']} FormButtonPlacement
   */
  export type FormButtonPlacement = keyof (typeof FormButtonVariantConfig)['variants']['placement'];

  /**
   * 表单列数类型（从主题配置中动态提取）
   * 支持的列数包括：1、2、3、4、5等
   * @typedef {keyof FormVariantConfig['variants']['cols']} FormCols
   */
  export type FormCols = keyof (typeof formVariantConfig)['variants']['cols'];

  /**
   * 表单项配置接口
   * 继承自FormItemProps但排除touched属性，因为touched状态由表单组件内部管理
   * @interface FormItemConfig
   * @extends Omit<FormItemProps, 'touched'>
   */
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
    /** 表单字段配置数组，定义表单中的所有字段 */
    formItems = [],
    /** 表单值对象，支持双向绑定，存储所有字段的值 */
    values = $bindable({}),
    /** 表单值变更回调函数，当任意字段值变更时触发 */
    onChangeValues,
    /** 单个字段值变更回调函数，当特定字段值变更时触发 */
    onChangeValue,
    /** 表单提交回调函数，表单验证通过后触发 */
    onSubmit,
    /** 表单布局方式，控制标签和字段的排列方式 */
    layout = 'horizontal',
    /** 表单列数，控制表单的栅格布局 */
    cols = 1,
    /** 标签宽度，统一设置所有标签的宽度 */
    labelWidth = '120px',
    /** 标签位置，统一设置所有标签的对齐方式 */
    labelPlacement = 'end',
    /** 提交按钮文本 */
    submitText = '提交',
    /** 重置按钮文本 */
    resetText = '重置',
    /** 按钮位置，控制按钮区域的对齐方式 */
    buttonPlacement = 'end',
    /** 是否显示重置按钮 */
    showReset = true,
    /** 是否显示提交按钮 */
    showSubmit = true,
    /** 表单默认颜色主题 */
    color,
    /** 表单默认尺寸 */
    size = 'md',
    /** 表单默认变体 */
    variant,
    /** 是否在初始化时进行验证 */
    initValidate = false,
    /** 自定义CSS类名 */
    class: className = '',
    /** 子内容插槽，用于完全自定义表单内容 */
    children,
    /** 其他原生form元素属性 */
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

  // 表单状态管理
  /** 表单错误信息记录，键为字段名，值为错误消息 */
  const formErrors: Record<string, string> = $state({});
  /** 表单字段触碰状态记录，键为字段名，值为是否已触碰 */
  const formBlurs: Record<string, boolean> = $state({});
  /** 表单整体验证状态，true表示验证通过 */
  let formValidState: boolean = $state(true);
  /** 表单初始值记录，用于重置表单时恢复初始状态 */
  let initialValues: Record<string, any> = {};
  /** 表单项属性记录，缓存每个字段的属性对象 */
  const formItemPropRecord: Record<string, FormItemProps> = {};
  /** 表单项隐藏状态记录，键为字段名，值为是否隐藏 */
  const formItemHiddenRecord: Record<string, boolean> = $state({});

  /**
   * 组件挂载时初始化
   * 设置表单初始值，并根据配置决定是否进行初始验证
   */
  onMount(() => {
    const defaultFormValues = formItems.reduce<Record<string, any>>((acc, formItem) => {
      const { field = {}, name } = formItem;
      // 优先级：字段默认值 > 传入的values > null
      if (field.defaultValue !== undefined) {
        acc[name] = field.defaultValue;
      } else if (values[name] !== undefined) {
        acc[name] = values[name];
      } else {
        acc[name] = null;
      }
      return acc;
    }, {});

    // 保存初始值的深拷贝，用于表单重置
    initialValues = clone(defaultFormValues);

    // 如果启用初始验证且存在表单项，则进行初始验证
    if (initValidate && formItems.length > 0) {
      validateForm();
    }
  });

  /**
   * 响应式更新表单项属性
   * 当formItems变化时，重新生成每个表单项的属性对象
   */
  $effect(() => {
    formItems.forEach((formItem) => {
      getFormItemProps(clone(formItem));
    });
  });

  /**
   * 响应式更新表单项隐藏状态
   * 当formItems或values变化时，重新计算每个表单项的隐藏状态
   */
  $effect(() => {
    formItems.forEach((formItem) => {
      formItemHiddenRecord[formItem.name] = isFieldHidden(formItem, values);
    });
  });

  /**
   * 判断表单项是否应该隐藏
   * @param formItem - 表单项配置对象
   * @param values - 当前表单值对象
   * @returns 是否隐藏该表单项
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
