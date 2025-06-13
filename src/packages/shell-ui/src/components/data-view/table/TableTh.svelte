<!--
@component
ShTableTh 表格表头单元格组件

一个功能丰富的表格表头单元格组件，基于原生 HTML th 元素构建。
支持表头文本显示、数据字段关联和完全自定义的表头内容渲染。

功能特性：
- 基于原生 th 元素，保持最佳性能和语义化
- 支持表头显示值的自动渲染
- 支持数据字段键名关联，便于数据绑定
- 内置单位文本显示功能（继承自数据单元格）
- 支持完全自定义的表头内容
- 继承所有原生 th 元素属性
- 完整的 TypeScript 类型安全
- 灵活的表头展示方式

示例用法：
```svelte
<script lang="ts">
  import { ShTableTh } from '@istock-shell/ui';
</script>

<p>基础表头单元格</p>
<ShTableTh value="姓名" />

<p>带数据键的表头</p>
<ShTableTh
  value="用户名"
  dataKey="username"
/>

<p>带单位的表头</p>
<ShTableTh
  value="金额"
  unit={{ text: '元', show: true }}
/>

<p>自定义表头内容</p>
<ShTableTh class="text-center">
  <div class="flex items-center gap-2">
    <Icon name="user" />
    <span>用户信息</span>
  </div>
</ShTableTh>
```
-->
<script lang="ts" module>
  import type { HTMLThAttributes } from 'svelte/elements';

  /**
   * 表格表头单元格组件属性接口
   * 继承原生 th 元素的所有属性，并扩展表头单元格特有的功能和配置
   */
  export interface TableThProps extends HTMLThAttributes {
    /** 表头显示值，支持任意类型的数据作为表头文本 */
    value?: unknown;
    /** 关联数据字段键名，用于标识该表头对应的数据字段 */
    dataKey?: string;
    /** 单位配置对象，继承自数据单元格，用于在表头显示单位信息 */
    unit?: {
      /** 单位文本内容，如 '元'、'个'、'%' 等 */
      text?: string;
      /** 是否显示单位，控制单位文本的显示与隐藏 */
      show?: boolean;
    };
  }
</script>

<script lang="ts">
  let {
    /** 表头显示值，默认为空字符串 */
    value = '',
    /** 单位配置对象 */
    unit,
    /** 子内容插槽，用于完全自定义表头内容 */
    children,
    /** 其他透传给原生 th 元素的属性 */
    ...otherProps
  }: TableThProps = $props();
</script>

<!--
  表格表头单元格
  使用 th 元素作为表头单元格的根容器
  - {...otherProps}: 透传所有其他原生 th 属性
-->
<th {...otherProps}>
  {#if children}
    <!--
      自定义表头内容渲染
      当提供子内容时，完全由用户控制表头的结构和样式
      适用于需要复杂表头展示或特殊交互的场景
    -->
    {@render children()}
  {:else}
    <!--
      默认表头渲染
      自动显示 value 值并根据 unit 配置拼接单位文本
      单位格式：表头文本（单位），如 "金额（元）"
      使用空值合并运算符确保 value 为 null 或 undefined 时显示空字符串
    -->
    {value ?? ''}{unit?.show && unit?.text ? `（${unit.text}）` : ''}
  {/if}
</th>
