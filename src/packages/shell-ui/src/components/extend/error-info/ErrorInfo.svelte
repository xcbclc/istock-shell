<!--
@component
ShErrorInfo 错误信息展示组件

一个专用于错误信息展示的组件，支持标题、描述和堆栈信息的结构化显示。
基于 ShText 组件构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持错误标题显示，使用粗体样式突出显示
- 提供错误描述信息展示
- 支持错误堆栈信息的逐行显示
- 统一使用错误颜色主题（error）
- 继承 TextBase 组件的所有样式属性
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShErrorInfo } from '@istock-shell/ui';

  const errorStack = [
    'Error: Something went wrong',
    '  at function1 (file1.js:10:5)',
    '  at function2 (file2.js:20:10)'
  ];
</script>

<p>基础错误信息</p>
<ShErrorInfo title="错误标题" description="错误描述信息" />

<p>带堆栈信息的错误</p>
<ShErrorInfo
  title="运行时错误"
  description="程序执行过程中发生了错误"
  stack={errorStack}
/>

<p>仅显示标题的错误</p>
<ShErrorInfo title="简单错误提示" />
```
-->
<script lang="ts" module>
  import type { TextBaseProps } from '../../index';

  /**
   * 错误信息组件属性接口
   * 继承 TextBase 组件的所有属性（除了 tag 属性），并扩展错误信息特有的功能属性
   * @typedef {Omit<TextBaseProps, 'tag'> & ErrorPropsExtension} ErrorProps
   */
  export interface ErrorProps extends Omit<TextBaseProps, 'tag'> {
    /** 错误标题，主要错误信息的标题文本 */
    title?: string;
    /** 错误描述，详细的错误说明信息 */
    description?: string;
    /** 错误堆栈信息数组，每个元素代表堆栈的一行 */
    stack?: string[];
  }
</script>

<script lang="ts">
  import { ShText } from '../../index';

  const {
    title, // 错误标题文本
    description, // 错误描述信息
    stack = [], // 错误堆栈信息数组（默认空数组）
    color, // 颜色主题（继承自TextBase，但组件内部强制使用error颜色）
    ...otherProps // 其他继承自TextBase的属性
  }: ErrorProps = $props();
</script>

<!--
  错误信息展示区域
  按照标题、描述、堆栈的顺序依次渲染错误信息
  所有文本都使用错误颜色主题（error）保持视觉一致性
-->
{#if title}
  <!--
    错误标题渲染
    使用粗体样式突出显示错误标题
    强制使用error颜色主题
  -->
  <ShText color="error" weight="bold" texts={[{ text: title }]} {...otherProps} />
{/if}

{#if description}
  <!--
    错误描述渲染
    显示详细的错误说明信息
    使用普通字重，保持可读性
  -->
  <ShText color="error" texts={[{ text: description }]} {...otherProps} />
{/if}

<!--
  错误堆栈信息渲染
  遍历堆栈数组，逐行显示堆栈信息
  每行堆栈信息都使用相同的错误颜色主题
-->
{#each stack as line}
  <ShText color="error" texts={[{ text: line }]} {...otherProps} />
{/each}
