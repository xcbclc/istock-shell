<!--
@component
统计项操作按钮组件，用于在统计项中添加交互操作。支持以下功能：
- 继承按钮组件属性
- 默认小尺寸按钮
- 支持所有按钮变体

用法示例:
```html
<ShStatAction
  text="查看详情"
  on:click={showDetails}
/>

<ShStatAction size="sm" variant="outline">
  <span>自定义按钮</span>
</ShStatAction>
```
-->

<script lang="ts" module>
  import type { ButtonProps } from '../../index';

  // 组件属性接口（继承按钮属性）
  export interface StatActionProps extends ButtonProps<'button'> {}
</script>

<script lang="ts">
  import { ShButton } from '../../index';

  const {
    size = 'xs', // 默认小尺寸
    ...otherProps // 其他按钮属性
  }: StatActionProps = $props();
</script>

<!-- 统计操作按钮 -->
<ShButton {size} {...otherProps} />

<style></style>
