<!--
@component
ShStatAction 统计项操作按钮组件

一个专门用于统计项操作的按钮组件，基于 ShButton 组件构建。
继承所有按钮的属性和功能，并针对统计场景进行了优化配置。

功能特性：
- 继承 ShButton 组件的所有属性和功能
- 默认使用超小尺寸（xs）适配统计项布局
- 支持所有按钮变体和颜色主题
- 支持自定义按钮内容
- 完整的 TypeScript 类型安全

示例用法：
```svelte
<script lang="ts">
  import { ShStatAction } from '@istock-shell/ui';
</script>

<p>基础操作按钮</p>
<ShStatAction
  variant="outline"
  color="primary"
>
  查看详情
</ShStatAction>

<p>图标按钮</p>
<ShStatAction
  variant="ghost"
  size="sm"
  onclick={() => console.log('clicked')}
>
  <Icon name="external-link" />
</ShStatAction>

<p>带样式的操作按钮</p>
<ShStatAction
  variant="solid"
  color="success"
  class="rounded-full"
>
  下载报告
</ShStatAction>
```
-->

<script lang="ts" module>
  import type { ButtonProps } from '../../index';

  /**
   * 统计项操作按钮组件属性接口
   * 继承 ShButton 组件的所有属性和功能，专门用于统计项场景
   */
  export interface StatActionProps extends ButtonProps<'button'> {
    // 继承所有按钮属性，无需额外配置
  }
</script>

<script lang="ts">
  import { ShButton } from '../../index';

  let {
    /** 按钮尺寸，默认为超小尺寸以适配统计项布局 */
    size = 'xs',
    /** 其他透传给按钮组件的属性 */
    ...otherProps
  }: StatActionProps = $props();
</script>

<!--
  统计项操作按钮
  基于 ShButton 组件构建，提供统计场景下的默认配置
  - size: 默认使用 xs 尺寸适配统计项布局
  - {...otherProps}: 透传所有其他按钮属性和事件
-->
<ShButton {size} {...otherProps} />

<style></style>
