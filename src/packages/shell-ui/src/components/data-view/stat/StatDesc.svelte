<!--
  @component ShStatDesc 统计项描述组件

  一个专门用于统计项描述展示的组件，基于 Tailwind CSS 构建。
  支持简单文本和复杂对象数组两种描述方式，提供丰富的样式配置和自定义内容支持。

  功能特性：
  - 支持简单字符串描述
  - 支持复杂对象数组描述，每个对象可配置独立样式
  - 提供多种文本样式配置（颜色、尺寸、对齐、粗细）
  - 支持工具提示（tooltip）功能
  - 支持完全自定义的描述内容渲染
  - 支持响应式设计和主题配置
  - 继承所有原生 div 元素属性
  - 完整的 TypeScript 类型安全
  - 无障碍访问支持

  示例用法：
  ```svelte
  <script lang="ts">
    import { ShStatDesc } from '@istock-shell/ui';
  </script>

  <p>简单文本描述</p>
  <ShStatDesc
    text="较上月增长 12%"
    color="success"
  />

  <p>复杂对象数组描述</p>
  <ShStatDesc
    text={[
      { title: '较上月', value: '增长', tooltip: '详细信息' },
      { title: '增长率', value: '12%' }
    ]}
  />

  <p>带工具提示的描述</p>
  <ShStatDesc
    text={[
      { title: '数据更新', value: '2024-01-15', tooltip: '点击查看详细信息' }
    ]}
    color="info"
  />

  <p>自定义描述内容</p>
  <ShStatDesc>
    <div class="flex items-center gap-2">
      <Icon name="trending-up" class="text-success" />
      <span class="text-success">上升趋势</span>
      <Badge variant="success" size="sm">+15%</Badge>
    </div>
  </ShStatDesc>

  <p>多行描述</p>
  <ShStatDesc
    text={[
      { title: '本周新增', value: '234 人' },
      { title: '活跃度', value: '提升 8.5%' }
    ]}
    align="center"
  />
  ```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { TextBaseProps } from '../../index';
  import { StatDescVariantConfig } from '../../../theme/config';

  const statDescVariantConfig = StatDescVariantConfig;

  /**
   * 统计项描述组件属性接口
   * 继承原生 div 元素的所有属性，并扩展描述展示相关的配置选项
   */
  export interface StatDescProps extends HTMLAttributes<HTMLDivElement> {
    /** 描述文本 */
    text?: string | Array<{ title: string; value: string | number; tooltip?: string }>;
    /** 文本颜色 */
    color?: TextBaseProps['color'];
    /** 文本尺寸 */
    size?: TextBaseProps['size'];
    /** 对齐方式 */
    align?: TextBaseProps['align'];
    /** 字体粗细 */
    weight?: TextBaseProps['weight'];
  }
</script>

<script lang="ts">
  import { tuc, isArray } from '@istock-shell/util';
  import { tv } from 'tailwind-variants';
  import { ShTooltip, ShIcon } from '../../index';

  const { text, color, size, align, weight, class: className = '', children, ...otherProps }: StatDescProps = $props();

  const statDescVariant = tv(statDescVariantConfig, {});
</script>

<!--
  统计项描述容器
  根据传入的描述内容类型渲染不同的展示形式
  - text 为字符串时：直接显示文本内容
  - text 为数组时：渲染为带工具提示的键值对列表
  - 无 text 时：显示自定义插槽内容
-->
<div class={[tuc(statDescVariant({ color, size, align, weight })), className]} {...otherProps}>
  {#if children}
    <!-- 优先渲染自定义内容 -->
    {@render children()}
  {:else if isArray(text)}
    {#each text as textItemProp}
      {@const { title, value, tooltip } = textItemProp}
      <div class={tuc('flex items-center justify-between gap-2')}>
        <h4 class={tuc('group')}>
          <span class={tuc('align-middle')}>{title}</span>
          <!-- 显示描述内容 -->
          {#if tooltip}
            <ShTooltip
              dataTip={tooltip}
              class={tuc('align-middle leading-1 invisible group-hover:visible cursor-pointer')}
            >
              <ShIcon name="info" />
            </ShTooltip>
          {/if}
        </h4>
        <span>{value}</span>
      </div>
    {/each}
  {:else}
    {text ?? ''}
  {/if}
</div>

<style></style>
