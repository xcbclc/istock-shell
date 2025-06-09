<!--
  ShInput 输入框组件

  一个功能丰富的输入框组件，支持多种输入类型、样式变体和前后缀渲染。
  基于原生 HTML input 元素构建，提供完整的类型安全和响应式支持。

  功能特性：
  - 支持多种输入类型（文本、密码、邮箱、数字、日期等）
  - 提供多种颜色主题和尺寸规格
  - 支持多种样式变体（边框、填充、轮廓等）
  - 内置验证状态指示
  - 支持前缀和后缀自定义渲染
  - 支持双向数据绑定
  - 数字类型自动转换和回调
  - TypeScript 类型安全

  示例用法：
  ```svelte
  <p>基础文本输入框</p>
  <ShInput type="text" bind:value={textValue} placeholder="请输入文本" />

  <p>带颜色主题的输入框</p>
  <ShInput
    type="email"
    color="primary"
    size="lg"
    bind:value={emailValue}
    placeholder="请输入邮箱"
  />

  <p>数字输入框带回调</p>
  <ShInput
    type="number"
    variant="bordered"
    bind:value={numberValue}
    onChangeValue={handleNumberChange}
    placeholder="请输入数字"
  />

  <p>带前后缀的输入框</p>
  <ShInput
    type="text"
    bind:value={searchValue}
    prefixRender={({ color, size }) => `<Icon name="search" {color} {size} />`}
    suffixRender={({ color, size }) => `<Button {color} {size}>搜索</Button>`}
  />

  <p>验证状态输入框</p>
  <ShInput
    type="password"
    color="error"
    validator={false}
    bind:value={passwordValue}
    placeholder="密码格式不正确"
  />
  ```
-->
<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { InputVariantConfig } from '../../../theme/config';

  /**
   * 获取输入框组件主题配置
   * 从主题系统中导入输入框的样式配置
   */
  const inputVariantConfig = InputVariantConfig;

  /**
   * 输入框颜色主题类型（从主题配置中动态提取）
   * 支持多种预设颜色主题
   * @typedef {keyof InputVariantConfig['variants']['color']} InputColor
   */
  export type InputColor = keyof (typeof inputVariantConfig)['variants']['color'];

  /**
   * 输入框尺寸类型（从主题配置中动态提取）
   * 支持多种尺寸规格
   * @typedef {keyof InputVariantConfig['variants']['size']} InputSize
   */
  export type InputSize = keyof (typeof inputVariantConfig)['variants']['size'];

  /**
   * 输入框样式变体类型（从主题配置中动态提取）
   * 支持多种视觉样式变体
   * @typedef {keyof InputVariantConfig['variants']['variant']} InputVariant
   */
  export type InputVariant = keyof (typeof inputVariantConfig)['variants']['variant'];

  /**
   * 支持的输入类型集合
   * 涵盖常用的 HTML input 类型，确保类型安全和功能完整性
   * @typedef {string} InputType
   */
  export type InputType =
    | 'text' // 文本输入
    | 'password' // 密码输入
    | 'email' // 邮箱输入
    | 'number' // 数字输入
    | 'date' // 日期选择
    | 'datetime-local' // 本地日期时间
    | 'week' // 周选择
    | 'month' // 月份选择
    | 'tel' // 电话号码
    | 'url' // URL 地址
    | 'search' // 搜索输入
    | 'time'; // 时间选择

  /**
   * 输入框组件属性接口
   * 继承原生 input 元素的所有属性，并扩展输入框特有的功能和配置
   * 排除与组件自定义属性冲突的原生属性（size, value, color）
   */
  export interface InputProps extends Omit<HTMLInputAttributes, 'size' | 'value' | 'color'> {
    /** 输入框类型，限制为支持的类型集合 */
    type: InputType;
    /** 输入框的值，支持双向绑定 */
    value?: any;
    /** 值变更回调函数，数字类型会自动转换为 number */
    onChangeValue?: (value?: any) => void;
    /** 颜色主题，影响输入框的视觉样式 */
    color?: InputColor;
    /** 尺寸规格，控制输入框的大小 */
    size?: InputSize;
    /** 样式变体，提供不同的视觉效果 */
    variant?: InputVariant;
    /** 验证状态指示，控制验证样式的显示 @default true */
    validator?: boolean;
    /** 前缀渲染函数，用于在输入框前添加自定义内容 */
    prefixRender?: (opt: InputRenderOption) => ReturnType<Snippet<[InputRenderOption]>>;
    /** 后缀渲染函数，用于在输入框后添加自定义内容 */
    suffixRender?: (opt: InputRenderOption) => ReturnType<Snippet<[InputRenderOption]>>;
  }

  /**
   * 输入框渲染选项接口
   * 用于前后缀渲染函数的参数，提供当前输入框的样式配置
   * 确保前后缀内容与输入框样式保持一致
   */
  export interface InputRenderOption {
    /** 当前输入框的颜色主题 */
    color?: InputColor;
    /** 当前输入框的尺寸配置 */
    size?: InputSize;
    /** 当前输入框的样式变体 */
    variant?: InputVariant;
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';
  import { tv } from 'tailwind-variants';

  let {
    value = $bindable(), // 双向绑定的输入值，支持任意类型
    type = 'text', // 输入框类型，默认为文本输入
    color, // 颜色主题配置
    size, // 尺寸规格配置
    variant, // 样式变体配置
    validator = true, // 验证状态指示，默认启用验证样式
    class: className = '', // 自定义CSS类名
    prefixRender, // 前缀内容渲染函数
    suffixRender, // 后缀内容渲染函数
    onChangeValue, // 值变更时的回调函数
    ...otherProps // 其他原生 input 元素属性
  }: InputProps = $props();

  /**
   * 创建输入框的Tailwind变体样式生成器
   * 基于配置生成响应式样式类名
   */
  const inputVariants = tv(inputVariantConfig);

  /**
   * 监听值变化并触发回调
   * 对数字类型进行特殊处理，自动转换为 number 类型
   * 确保类型安全和数据一致性
   */
  $effect(() => {
    if (type === 'number') {
      // 数字类型：转换为 number 或保持 undefined
      onChangeValue?.(value === undefined ? undefined : Number(value));
    } else {
      // 其他类型：直接传递原始值
      onChangeValue?.(value);
    }
  });
</script>

<!--
  输入框渲染逻辑
  根据是否提供前后缀渲染函数，选择不同的渲染模式
  确保样式一致性和功能完整性
-->
{#if prefixRender ?? suffixRender}
  <!--
    带前后缀的输入框布局
    使用 label 元素包装，支持前缀和后缀内容的自定义渲染
    适用于搜索框、金额输入、单位显示等场景
  -->
  <label class={[tuc(inputVariants({ color, size, variant, validator })), className]}>
    <!-- 前缀内容渲染区域 -->
    {@render prefixRender?.({ color, size, variant })}
    <!-- 核心输入元素，支持双向数据绑定 -->
    <input bind:value {type} {...otherProps} />
    <!-- 后缀内容渲染区域 -->
    {@render suffixRender?.({ color, size, variant })}
  </label>
{:else}
  <!--
    基础输入框
    直接渲染 input 元素，适用于简单的文本输入场景
    基于原生 HTML input 元素，支持所有标准属性和事件
  -->
  <input
    bind:value
    class={[tuc(inputVariants({ color, size, variant, validator })), className]}
    {type}
    {...otherProps}
  />
{/if}

<style></style>
