<!--
@component
ShFieldSet 字段集合组件

一个基于原生 fieldset 元素的字段分组容器组件，用于将相关的表单字段组织在一起。
提供可选的标题显示和完整的原生 fieldset 元素功能支持。

功能特性：
- 基于原生 HTML fieldset 元素构建
- 支持可选的字段集合标题（legend）
- 继承所有原生 fieldset 元素属性
- 支持自定义内容渲染
- 完整的 TypeScript 类型安全
- 语义化的表单字段分组

示例用法：
```svelte
<p>基础字段集合</p>
<ShFieldSet title="个人信息">
  <ShField label="姓名">
    <input type="text" placeholder="请输入姓名" />
  </ShField>
  <ShField label="邮箱">
    <input type="email" placeholder="请输入邮箱" />
  </ShField>
</ShFieldSet>

<p>无标题字段集合</p>
<ShFieldSet>
  <ShField label="用户名">
    <input type="text" placeholder="请输入用户名" />
  </ShField>
  <ShField label="密码">
    <input type="password" placeholder="请输入密码" />
  </ShField>
</ShFieldSet>

<p>带自定义样式的字段集合</p>
<ShFieldSet title="联系方式" class="border-2 border-blue-200">
  <ShField label="电话">
    <input type="tel" placeholder="请输入电话号码" />
  </ShField>
  <ShField label="地址">
    <textarea placeholder="请输入地址"></textarea>
  </ShField>
</ShFieldSet>
```
-->
<script lang="ts" module>
  // 导入Svelte的fieldset元素属性类型
  import type { HTMLFieldsetAttributes } from 'svelte/elements';

  /**
   * 字段集合组件属性接口
   * 继承所有原生 fieldset 元素的 HTML 属性，并扩展字段集合特有的配置
   */
  export interface FieldSetProps extends HTMLFieldsetAttributes {
    /** 字段集合标题，将显示为 legend 元素 */
    title?: string;
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';

  const {
    title = '', // 字段集合标题（默认为空字符串）
    children, // 子内容插槽
    class: className = '', // 自定义CSS类名
    ...otherProps // 其他原生 fieldset 元素属性
  }: FieldSetProps = $props();
</script>

<!-- 字段集合容器 -->
<fieldset
  class={[
    tuc('fieldset'), // 基础样式类
    className, // 自定义样式类
  ]}
  {...otherProps}
>
  {#if title}
    <!-- 标题区域 -->
    <legend class={tuc('fieldset-legend')}>
      {title}
    </legend>
  {/if}

  <!-- 渲染子内容（支持函数式children） -->
  {@render children?.()}
</fieldset>

<style></style>
