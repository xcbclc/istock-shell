<!--
@component
ShICalendarNotify 日历通知提示组件

一个专门用于显示日历相关提示信息的通知组件，支持智能的显示控制和自动隐藏功能。
基于 ShAlert 组件构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持延迟显示，可设置显示前的等待时间
- 支持自动隐藏，可设置显示持续时间
- 可自定义提示类型和样式（info、success、warning、error）
- 智能的定时器管理，避免内存泄漏
- 继承所有 ShAlert 组件的属性和功能
- 完整的 TypeScript 类型安全
- 响应式状态管理

示例用法：
```svelte
<script lang="ts">
  import { ShICalendarNotify } from '@istock-shell/ui';

  let showNotify = false;
  let notifyTitle = '';

  function showSuccessNotify() {
    notifyTitle = '操作成功';
    showNotify = true;
  }

  function showErrorNotify() {
    notifyTitle = '操作失败';
    showNotify = true;
  }
</script>

<p>基础通知</p>
<ShICalendarNotify
  bind:show={showNotify}
  title={notifyTitle}
  type="info"
/>

<p>延迟显示的成功通知</p>
<ShICalendarNotify
  bind:show={showNotify}
  title="操作成功"
  type="success"
  duration={3}
  delay={0.5}
/>

<p>自动隐藏的警告通知</p>
<ShICalendarNotify
  bind:show={showNotify}
  title="请注意"
  type="warning"
  duration={5}
  soft={true}
/>
```
-->

<script lang="ts" module>
  import { ShAlert, type AlertProps } from '../../../index';

  /**
   * 日历通知组件属性接口
   * @extends AlertProps - 继承Alert组件的所有属性
   */
  export interface ICalendarNotifyProps extends AlertProps {
    /** 是否显示通知 */
    show?: boolean;
    /** 通知显示持续时间（秒），0表示不自动隐藏 */
    duration?: number;
    /** 显示前的延迟时间（秒） */
    delay?: number;
  }
</script>

<script lang="ts">
  let {
    show = $bindable(false),
    duration = 0,
    delay = 0,
    type = 'info',
    soft = true,
    class: className = '',
    ...otherProps
  }: ICalendarNotifyProps = $props();

  let timer: number;
  $effect(() => {
    if (otherProps.title) {
      clearTimeout(timer);
      // 设置延迟显示定时器
      timer = setTimeout(
        () => {
          show = true;
          // 如果设置了显示持续时间，则自动隐藏
          if (duration) {
            timer = setTimeout(
              () => {
                show = false;
              },
              (duration ?? 0) * 1000 // 转换为毫秒
            );
          }
        },
        (delay ?? 0) * 1000 // 转换为毫秒
      );
    }
  });
</script>

{#if show}
  <ShAlert class={[className]} {type} {soft} {...otherProps} />
{/if}

<style></style>
