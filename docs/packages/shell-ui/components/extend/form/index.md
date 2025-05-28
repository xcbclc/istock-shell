---
title: Form 表单组件
description: 功能强大的表单组件，支持多布局模式、栅格系统、表单验证和自定义控件，为用户提供便捷的数据收集解决方案。
keywords: [表单组件, 表单验证, 表单布局, 数据收集, Svelte表单]
aside: false
editLink: false
outline: [2, 3]
---

## Form 表单组件 <Badge type="tip">shell</Badge>

**强大易用的表单处理系统，提供完整的数据收集与验证解决方案。**

## 使用场景

- 用户注册与登录界面
- 数据录入与信息收集
- 系统设置与表单配置
- 多字段验证表单
- 动态表单生成
- 需要表单布局灵活控制的场景

## 功能特性

- 支持水平与垂直两种布局方式
- 灵活的栅格系统（1-5列）配置
- 内置丰富的表单验证规则（必填、长度、范围、正则、自定义）
- 支持多种表单控件类型（输入框、选择框、复选框、单选框、文本域、开关等）
- 支持表单值的双向绑定
- 提供表单提交与重置功能
- 支持表单项的动态显示/隐藏
- 表单验证状态实时反馈
- 支持表单项标签位置自定义

## 示例演示

### 基础表单示例

通过`formItems`配置实现：

- 支持多种表单控件（输入框/选择器/复选框/单选框/文本域/开关）
- 自动绑定表单值与验证状态
- 内置字段描述与提示信息
- 统一的表单提交与重置处理
- 适用于用户信息收集场景

::: raw
<IStockShellUiExample src="./extend/form/example/FormDefault.svelte" layout="column"></IStockShellUiExample>
:::

### 表单布局与栅格

结合`layout`和`cols`属性实现：

- 支持水平和垂直两种布局方式
- 多列栅格系统（1-5列自适应）
- 标签位置灵活配置（labelPlacement）
- 按钮位置自定义（buttonPlacement）
- 适用于复杂信息分组展示

::: raw
<IStockShellUiExample src="./extend/form/example/FormLayout.svelte" layout="column"></IStockShellUiExample>
:::

### 表单尺寸控制

使用`size`属性配置：

- 支持五种尺寸规格（xs/sm/md/lg/xl）
- 控件高度与文本大小同步调整
- 标签与字段间距自动适配
- 按钮尺寸联动变化
- 适用于不同密度信息展示需求

::: raw
<IStockShellUiExample src="./extend/form/example/FormSize.svelte" layout="column"></IStockShellUiExample>
:::

### 表单验证与联动

通过`validator`和动态表单项实现：

- 支持多种验证规则（必填/长度/范围/正则/自定义）
- 实时验证与提交验证双模式
- 适用于复杂业务表单与向导场景

::: raw
<IStockShellUiExample src="./extend/form/example/FormValidate.svelte" layout="column"></IStockShellUiExample>
:::

## API 参考

### 属性说明

| 参数            | 说明               | 类型                                                                                             | 默认值         |
| --------------- | ------------------ | ------------------------------------------------------------------------------------------------ | -------------- |
| formItems       | 表单字段配置数组   | [`FormItemConfig[]`](#formitemconfig)                                                            | `[]`           |
| values          | 表单值对象         | `Record<string, any>`                                                                            | `{}`           |
| onChangeValues  | 表单值变更回调     | `(values: Record<string, any>, isValid: boolean) => void`                                        | -              |
| onChangeValue   | 单个字段值变更回调 | `(name: string, value: any) => void`                                                             | -              |
| onSubmit        | 表单提交回调       | `(values: Record<string, any>) => void`                                                          | -              |
| layout          | 表单布局方式       | `'horizontal' \| 'vertical'`                                                                     | `'horizontal'` |
| cols            | 表单栅格列数       | `1 \| 2 \| 3 \| 4 \| 5`                                                                          | `1`            |
| labelWidth      | 标签宽度           | `string`                                                                                         | `'120px'`      |
| labelPlacement  | 标签位置           | `'start' \| 'center' \| 'end'`                                                                   | `'end'`        |
| buttonPlacement | 按钮位置           | `'start' \| 'center' \| 'end'`                                                                   | `'end'`        |
| submitText      | 提交按钮文本       | `string`                                                                                         | `'提交'`       |
| resetText       | 重置按钮文本       | `string`                                                                                         | `'重置'`       |
| showReset       | 是否显示重置按钮   | `boolean`                                                                                        | `true`         |
| showSubmit      | 是否显示提交按钮   | `boolean`                                                                                        | `true`         |
| color           | 表单主题颜色       | `primary` \| `secondary` \| `accent` \| `neutral` \| `info` \| `success` \| `warning` \| `error` | -              |
| size            | 表单控件尺寸       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                           | `'md'`         |
| initValidate    | 是否在初始化时验证 | `boolean`                                                                                        | `false`        |

### FormItemConfig

```typescript
/**
 * 表单项配置接口
 */
interface FormItemConfig {
  /** 字段名称（必填） */
  name: string;
  /** 标签文本 */
  label?: string;
  /** 标签宽度，优先于Form的labelWidth */
  labelWidth?: string;
  /** 标签位置 */
  labelPlacement?: 'start' | 'center' | 'end';
  /** 表单项布局，优先于Form的layout */
  layout?: 'horizontal' | 'vertical';
  /** 是否已触碰 */
  touched?: boolean;
  /** 表单字段配置 */
  field?: {
    /** 字段类型 */
    type?: 'input' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'toggle';
    /** 默认值 */
    defaultValue?: any;
    /** 占位文本 */
    placeholder?: string;
    /** 字段描述 */
    description?: string;
    /** 是否必填 */
    required?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否只读 */
    readonly?: boolean;
    /** 输入框类型（针对input类型） */
    inputType?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
    /** 选项列表（针对select/checkbox/radio类型） */
    options?: Array<{ label: string; value: any }>;
    /** 是否多选（针对select类型） */
    multiple?: boolean;
    /** 验证器配置 */
    validator?: {
      /** 是否必填 */
      required?: boolean;
      /** 最小值/长度 */
      min?: number;
      /** 最大值/长度 */
      max?: number;
      /** 最小长度（仅字符串） */
      minLength?: number;
      /** 最大长度（仅字符串） */
      maxLength?: number;
      /** 正则表达式模式 */
      pattern?: RegExp | string;
      /** 自定义验证函数 */
      custom?: (value: any, values: Record<string, any>) => boolean | string | undefined;
    };
    /** 字段动态隐藏条件 */
    hidden?: boolean | ((values: Record<string, any>) => boolean);
  };
  /** 是否必填 */
  required?: boolean;
  /** 表单项颜色，优先于Form的color */
  color?: string;
  /** 表单项尺寸，优先于Form的size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 列数1-5 */
  cols?: number;
}
```

## 最佳实践

- 使用栅格系统（cols属性）优化表单布局，提高空间利用率
- 为字段添加描述信息（description）增强用户理解
- 结合验证规则确保数据质量（validator属性）
- 使用hidden属性方法实现表单项的条件显示/隐藏
- 根据数据类型选择合适的表单控件类型
- 为关键操作提供明确的按钮文本（submitText/resetText）
