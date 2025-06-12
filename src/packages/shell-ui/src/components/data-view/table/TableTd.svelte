<!--
  @component ShTableTd 表格数据单元格组件

  一个功能丰富的表格数据单元格组件，基于原生 HTML td 元素构建。
  支持自动数据绑定、单位显示和完全自定义的内容渲染。

  功能特性：
  - 基于原生 td 元素，保持最佳性能和语义化
  - 支持自动数据键值绑定和显示
  - 内置单位文本显示功能
  - 支持完全自定义的单元格内容
  - 继承所有原生 td 元素属性
  - 完整的 TypeScript 类型安全
  - 灵活的数据展示方式

  示例用法：
  ```svelte
  <script lang="ts">
    import { ShTableTd } from '@istock-shell/ui';
  </script>

  <p>基础数据单元格</p>
  <ShTableTd value="张三" />

  <p>带单位的数据单元格</p>
  <ShTableTd
    value={1234}
    unit={{ text: '元', show: true }}
  />

  <p>自定义内容单元格</p>
  <ShTableTd class="text-center">
    <span class="badge badge-success">已完成</span>
  </ShTableTd>

  <p>数据键绑定单元格</p>
  <ShTableTd
    value={userData.name}
    dataKey="name"
  />
  ```
-->
<script lang="ts" module>
  import type { HTMLTdAttributes } from 'svelte/elements';

  /**
   * 表格数据单元格组件属性接口
   * 继承原生 td 元素的所有属性，并扩展数据单元格特有的功能和配置
   */
  export interface TableTdProps extends HTMLTdAttributes {
    /** 单元格显示值，支持任意类型的数据 */
    value?: unknown;
    /** 数据对象键名，用于自动从数据源中提取对应字段的值 */
    dataKey?: string;
    /** 单位配置对象，用于在数值后显示单位信息 */
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
    /** 单元格显示值 */
    value,
    /** 单位配置对象 */
    unit,
    /** 子内容插槽，用于完全自定义单元格内容 */
    children,
    /** 其他透传给原生 td 元素的属性 */
    ...otherProps
  }: TableTdProps = $props();
</script>

<!--
  表格数据单元格
  使用 td 元素作为数据单元格的根容器
  - {...otherProps}: 透传所有其他原生 td 属性
-->
<td {...otherProps}>
  {#if children}
    <!--
      自定义内容渲染
      当提供子内容时，完全由用户控制单元格的结构和样式
      适用于需要复杂数据展示或特殊交互的场景
    -->
    {@render children()}
  {:else}
    <!--
      默认数据渲染
      自动显示 value 值并根据 unit 配置拼接单位文本
      单位格式：值（单位），如 "1234（元）"
    -->
    {value}{unit?.show && unit?.text ? `（${unit.text}）` : ''}
  {/if}
</td>
