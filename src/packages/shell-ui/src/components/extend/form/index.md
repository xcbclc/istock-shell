---
title: Form 表单组件 | IStock Shell UI
description: Form表单组件提供强大的数据收集与验证功能，支持水平/垂直布局、1-5列栅格系统、丰富验证规则、多种表单控件、双向数据绑定、动态显示隐藏等特性，基于配置驱动设计，适用于用户注册、数据录入、系统设置、多字段验证等各种表单场景。
keywords:
  [
    Form表单组件,
    Svelte表单,
    表单验证,
    表单布局,
    数据收集,
    配置驱动表单,
    栅格表单,
    UI组件库,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    响应式表单,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Form 表单组件 <Badge type="tip">shell</Badge>

表单是用户界面中最重要的数据收集组件，用于用户信息录入、数据提交、配置设置等交互场景。IStock Shell UI 的 Form 组件采用配置驱动设计，提供了强大的布局系统、验证机制和丰富的表单控件，满足各种复杂的表单构建需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShForm } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的表单用法，通过配置驱动渲染：

```svelte
<script>
  import { ShForm } from '@istock-shell/ui';

  const formItems = [
    {
      name: 'username',
      label: '用户名',
      field: {
        type: 'input',
        placeholder: '请输入用户名',
        required: true,
      },
    },
    {
      name: 'email',
      label: '邮箱',
      field: {
        type: 'input',
        inputType: 'email',
        placeholder: '请输入邮箱地址',
      },
    },
  ];

  let values = $state({});
</script>

<ShForm {formItems} bind:values />
```

## 组件特性

- 🎨 **灵活布局**：支持水平/垂直布局模式，1-5列栅格系统，响应式适配
- 🔧 **配置驱动**：基于JSON配置生成表单，支持动态表单和条件显示
- ✅ **强大验证**：内置丰富验证规则（必填、长度、范围、正则、自定义函数）
- 🎭 **多种控件**：支持输入框、选择器、复选框、单选框、文本域、开关等控件
- 🔄 **双向绑定**：完整的数据双向绑定，实时同步表单状态
- 🎯 **事件系统**：提供表单提交、重置、值变更等完整事件回调
- 🏷️ **主题适配**：支持8种主题色彩和5种尺寸规格
- ♿ **无障碍友好**：遵循 WCAG 2.0 标准，支持键盘导航和屏幕阅读器

## 使用场景

| 场景       | 推荐配置                           | 说明                             |
| ---------- | ---------------------------------- | -------------------------------- |
| 用户注册   | `layout="vertical"` + 验证规则     | 用户注册、账号创建等信息收集     |
| 登录表单   | `cols=1` + `size="lg"`             | 用户登录、身份验证等简单表单     |
| 数据录入   | `cols=2-3` + 多种控件类型          | 客户信息、订单录入等复杂数据收集 |
| 系统设置   | `layout="horizontal"` + 开关控件   | 系统配置、用户偏好设置等         |
| 搜索筛选   | `layout="horizontal"` + `cols=4-5` | 数据筛选、高级搜索等查询表单     |
| 问卷调查   | 动态显示 + 多种控件                | 问卷表单、调研收集等动态表单     |
| 配置向导   | 分步表单 + 条件显示                | 安装向导、配置流程等多步骤表单   |
| 移动端表单 | `layout="vertical"` + `size="lg"`  | 移动设备上的表单，优化触摸体验   |

## 示例演示

<IStockShellUiExample src="./example/FormDefault.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/FormLayout.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/FormSize.svelte" layout="column"></IStockShellUiExample>
<IStockShellUiExample src="./example/FormValidate.svelte" layout="column"></IStockShellUiExample>

## API 参考

### Form API

#### Form 属性

| 属性名            | 类型                                                      | 默认值         | 说明                                         |
| ----------------- | --------------------------------------------------------- | -------------- | -------------------------------------------- |
| `formItems`       | [`FormItemConfig[]`](#formitemconfig)                     | `[]`           | 表单字段配置数组，用于配置驱动渲染表单项     |
| `values`          | `Record<string, any>`                                     | `{}`           | 表单值对象（双向绑定），存储所有字段的当前值 |
| `onChangeValues`  | `(values: Record<string, any>, isValid: boolean) => void` | -              | 表单值变更回调，传递完整表单值和验证状态     |
| `onChangeValue`   | `(name: string, value: any) => void`                      | -              | 单个字段值变更回调，传递字段名和新值         |
| `onSubmit`        | `(values: Record<string, any>) => void`                   | -              | 表单提交回调，传递完整的表单值对象           |
| `layout`          | [`FormLayout`](#formlayout)                               | `'horizontal'` | 表单布局方式，水平或垂直布局                 |
| `cols`            | [`FormCols`](#formcols)                                   | `1`            | 表单栅格列数，支持1-5列响应式布局            |
| `labelWidth`      | `string`                                                  | `'120px'`      | 标签宽度，仅在水平布局时生效                 |
| `labelPlacement`  | [`FormPlacement`](#formplacement)                         | `'end'`        | 标签对齐位置，支持左对齐、居中、右对齐       |
| `buttonPlacement` | [`FormButtonPlacement`](#formbuttonplacement)             | `'end'`        | 按钮对齐位置，支持左对齐、居中、右对齐       |
| `submitText`      | `string`                                                  | `'提交'`       | 提交按钮的显示文本                           |
| `resetText`       | `string`                                                  | `'重置'`       | 重置按钮的显示文本                           |
| `showReset`       | `boolean`                                                 | `true`         | 是否显示重置按钮                             |
| `showSubmit`      | `boolean`                                                 | `true`         | 是否显示提交按钮                             |
| `color`           | [`FormColor`](#formcolor)                                 | -              | 表单主题颜色，影响按钮和控件的颜色主题       |
| `size`            | [`FormSize`](#formsize)                                   | `'md'`         | 表单控件尺寸，统一设置所有控件的大小         |
| `variant`         | [`FormVariant`](#formvariant)                             | -              | 表单控件变体样式                             |
| `initValidate`    | `boolean`                                                 | `false`        | 是否在表单初始化时立即执行验证               |
| `className`       | `string`                                                  | -              | 自定义CSS类名                                |

#### Form 代码片段插入位置

- `children`：

```svelte
<form class="form">
  <!-- ...表单项渲染 code -->
  {@render children()}
  <!-- ...按钮区域 code -->
</form>
```

#### Form 事件

`Form` 继承自原生 HTML form 元素的事件，如：

- `submit` - 表单提交事件
- `reset` - 表单重置事件
- `change` - 表单值变更事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `click` - 点击事件
- `keydown` - 键盘按下事件
- `keyup` - 键盘释放事件

### FormItem API

#### FormItem 属性

| 属性名           | 类型                                                | 默认值  | 说明                                         |
| ---------------- | --------------------------------------------------- | ------- | -------------------------------------------- |
| `name`           | `string`                                            | -       | 字段名称（必填），用于数据绑定和验证         |
| `label`          | `string`                                            | -       | 标签文本，显示在表单项前面                   |
| `labelWidth`     | `string`                                            | -       | 标签宽度，优先于Form的labelWidth设置         |
| `labelPlacement` | [`FormItemLabelPlacement`](#formitemlabelplacement) | -       | 标签对齐位置，优先于Form的labelPlacement设置 |
| `layout`         | [`FormItemLayout`](#formitemlayout)                 | -       | 表单项布局，优先于Form的layout设置           |
| `touched`        | `boolean`                                           | `false` | 是否已触碰，用于验证状态管理                 |
| `field`          | [`FormItemField`](#formitemfield)                   | `{}`    | 表单字段详细配置                             |
| `required`       | `boolean`                                           | `false` | 是否必填，影响标签显示和验证                 |
| `color`          | [`FormItemColor`](#formitemcolor)                   | -       | 表单项颜色，优先于Form的color设置            |
| `size`           | [`FormItemSize`](#formitemsize)                     | -       | 表单项尺寸，优先于Form的size设置             |
| `variant`        | [`FormItemVariant`](#formitemvariant)               | -       | 表单项变体样式                               |
| `cols`           | [`FormItemCols`](#formitemcols)                     | `1`     | 占用列数（1-5），用于栅格布局                |
| `className`      | `string`                                            | -       | 自定义CSS类名                                |

#### FormItem 代码片段插入位置

- `children`：

```svelte
<div class="form-item">
  <!-- ...标签渲染 code -->
  <div class="form-item-content">
    {@render children()}
    <!-- ...错误信息和描述 code -->
  </div>
</div>
```

#### FormItem 事件

`FormItem` 继承自原生 HTML div 元素的事件，如：

- `click` - 点击事件
- `keydown` - 键盘按下事件
- `keyup` - 键盘释放事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `mouseenter` - 鼠标进入事件
- `mouseleave` - 鼠标离开事件

### 类型定义

#### 核心类型

##### FormItemConfig

表单项配置接口：

```typescript
interface FormItemConfig {
  name: string; // 字段名称（必填），用于数据绑定和验证
  label?: string; // 标签文本，显示在表单项前面
  labelWidth?: string; // 标签宽度，优先于Form的labelWidth设置
  labelPlacement?: FormItemLabelPlacement; // 标签对齐位置
  layout?: FormItemLayout; // 表单项布局，优先于Form的layout设置
  touched?: boolean; // 是否已触碰，用于验证状态管理
  field?: FormItemField; // 表单字段详细配置
  required?: boolean; // 是否必填，影响标签显示和验证
  color?: FormItemColor; // 表单项颜色，优先于Form的color设置
  size?: FormItemSize; // 表单项尺寸，优先于Form的size设置
  variant?: FormItemVariant; // 表单项变体样式
  cols?: FormItemCols; // 占用列数（1-5），用于栅格布局
  className?: string; // 自定义CSS类名
}
```

##### FormItemField

表单字段配置接口：

```typescript
interface FormItemField {
  type?: FormItemFieldType; // 字段类型，决定渲染的控件
  defaultValue?: any; // 默认值，表单初始化时使用
  placeholder?: string; // 占位文本，显示在空白控件中
  description?: string; // 字段描述，提供额外的帮助信息
  required?: boolean; // 是否必填，影响验证规则
  disabled?: boolean; // 是否禁用，禁用后不可编辑
  readonly?: boolean; // 是否只读，只读后不可编辑但可复制
  inputType?: FormInputType; // 输入框类型（仅input类型使用）
  options?: FormOption[]; // 选项列表（select/checkbox/radio类型使用）
  multiple?: boolean; // 是否多选（仅select类型使用）
  validator?: FormItemValidator; // 验证器配置
  hidden?: boolean | ((values: Record<string, any>) => boolean); // 动态隐藏条件
  error?: string; // 错误信息
  [key: string]: any; // 其他字段属性
}
```

##### FormItemValidator

表单验证器配置：

```typescript
interface FormItemValidator {
  required?: boolean; // 是否必填验证
  min?: number; // 最小值/长度限制
  max?: number; // 最大值/长度限制
  minLength?: number; // 最小字符长度（仅字符串）
  maxLength?: number; // 最大字符长度（仅字符串）
  pattern?: RegExp | string; // 正则表达式模式验证
  custom?: (value: any, values: Record<string, any>) => boolean | string | undefined; // 自定义验证函数
}
```

##### FormOption

表单选项配置：

```typescript
interface FormOption {
  label: string; // 显示文本
  value: any; // 选项值
  disabled?: boolean; // 是否禁用此选项
}
```

#### 枚举类型

##### FormLayout

```typescript
// 表单布局类型
type FormLayout = 'horizontal' | 'vertical';
```

##### FormCols

```typescript
// 表单栅格列数类型
type FormCols = 1 | 2 | 3 | 4 | 5;
```

##### FormButtonPlacement

```typescript
// 按钮对齐位置类型
type FormButtonPlacement = 'start' | 'center' | 'end';
```

##### FormPlacement

```typescript
// 对齐位置类型
type FormPlacement = 'start' | 'center' | 'end';
```

##### FormColor

```typescript
// 表单颜色类型
type FormColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';
```

##### FormSize

```typescript
// 表单尺寸类型
type FormSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

##### FormVariant

```typescript
// 表单变体类型
type FormVariant = string; // 根据具体实现定义
```

#### FormItem 类型

##### FormItemLayout

```typescript
// 表单项布局类型
type FormItemLayout = 'horizontal' | 'vertical';
```

##### FormItemCols

```typescript
// 表单项栅格列数类型
type FormItemCols = 1 | 2 | 3 | 4 | 5;
```

##### FormItemSize

```typescript
// 表单项尺寸类型
type FormItemSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

##### FormItemColor

```typescript
// 表单项颜色类型
type FormItemColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';
```

##### FormItemLabelPlacement

```typescript
// 表单项标签对齐位置类型
type FormItemLabelPlacement = 'start' | 'center' | 'end';
```

##### FormItemVariant

```typescript
// 表单项变体类型
type FormItemVariant = string; // 根据具体实现定义
```

##### FormItemFieldTypes

```typescript
// 支持的表单字段类型数组
const FormItemFieldTypes: FormItemFieldType[] = [
  'input',
  'select',
  'checkbox',
  'radio',
  'textarea',
  'toggle',
];
```

##### FormItemFieldType

```typescript
// 表单字段类型
type FormItemFieldType = 'input' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'toggle';
```

##### FormInputType

```typescript
// 输入框类型
type FormInputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
```

## 设计指南

### 布局原则

- **响应式设计**：使用栅格系统适配不同屏幕尺寸
- **视觉层次**：通过标签位置、字体大小建立清晰的信息层次
- **对齐规范**：保持标签和控件的对齐一致性
- **间距系统**：使用统一的间距规范，确保视觉舒适

### 验证设计

- **即时反馈**：在用户输入时提供实时验证反馈
- **错误提示**：使用清晰、具体的错误信息
- **视觉状态**：通过颜色、图标表达验证状态
- **用户引导**：提供帮助文本和示例格式

### 交互设计

- **键盘导航**：支持Tab键在表单项间切换
- **焦点管理**：合理管理焦点状态和顺序
- **提交流程**：提供清晰的提交和重置操作
- **加载状态**：在异步操作时显示适当的加载提示

### 无障碍支持

- 所有表单控件都支持键盘导航和屏幕阅读器
- 提供适当的 `aria-label` 和 `aria-describedby` 属性
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 使用语义化的 HTML 结构和标签关联
- 为必填字段提供明确的视觉和语义标识
- 验证错误信息与对应字段正确关联

## 最佳实践

### 表单设计

1. **逻辑分组**：将相关字段分组，使用栅格布局优化空间利用
2. **字段顺序**：按照用户的思维逻辑安排字段顺序
3. **必填标识**：为必填字段提供清晰的视觉标识
4. **帮助信息**：为复杂字段提供描述和示例

### 验证策略

1. **渐进验证**：从简单到复杂的验证规则设计
2. **友好提示**：使用积极、具体的错误信息
3. **实时反馈**：在用户输入时提供即时验证
4. **批量验证**：提交时进行完整的表单验证

### 性能优化

1. **懒加载**：大型表单使用分步加载策略
2. **防抖处理**：对验证和搜索功能使用防抖
3. **数据缓存**：合理缓存表单数据避免丢失
4. **异步处理**：长时间操作使用异步处理和进度提示

### 用户体验

1. **保存草稿**：为长表单提供自动保存功能
2. **进度提示**：多步骤表单显示当前进度
3. **错误恢复**：提供撤销和重做功能
4. **移动适配**：在移动设备上优化触摸体验

## 常见问题

### Q: 如何实现动态表单？

A: 使用响应式数据更新 `formItems` 配置：

```svelte
<script>
  let formItems = $state([
    {
      name: 'type',
      label: '类型',
      field: {
        type: 'select',
        options: [
          { label: '个人', value: 'personal' },
          { label: '企业', value: 'company' },
        ],
      },
    },
  ]);

  let values = $state({});

  // 根据类型动态添加字段
  $effect(() => {
    if (values.type === 'company') {
      formItems = [
        ...formItems,
        {
          name: 'companyName',
          label: '公司名称',
          field: { type: 'input', required: true },
        },
      ];
    }
  });
</script>

<ShForm {formItems} bind:values />
```

### Q: 如何实现自定义验证？

A: 使用 `validator.custom` 函数：

```svelte
<script>
  const formItems = [
    {
      name: 'password',
      label: '密码',
      field: {
        type: 'input',
        inputType: 'password',
        validator: {
          custom: (value) => {
            if (value.length < 8) return '密码长度至少8位';
            if (!/[A-Z]/.test(value)) return '密码必须包含大写字母';
            if (!/[0-9]/.test(value)) return '密码必须包含数字';
            return true;
          },
        },
      },
    },
  ];
</script>
```

### Q: 如何实现表单联动？

A: 使用 `hidden` 函数和 `onChangeValue` 回调：

```svelte
<script>
  const formItems = [
    {
      name: 'hasAddress',
      label: '是否有地址',
      field: { type: 'checkbox' },
    },
    {
      name: 'address',
      label: '详细地址',
      field: {
        type: 'textarea',
        hidden: (values) => !values.hasAddress,
      },
    },
  ];
</script>
```

### Q: 如何自定义表单样式？

A: 可以通过 `class` 属性添加自定义CSS类，或使用CSS变量覆盖默认样式：

```css
.custom-form {
  --form-label-color: #333;
  --form-input-border: 2px solid #ddd;
  --form-button-bg: #007bff;
}
```

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
