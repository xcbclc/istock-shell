<!--
@component
日历通知提示组件，用于显示日历相关的提示信息。

特点：
- 支持延迟显示和自动隐藏
- 可自定义提示类型和样式
- 基于ShAlert组件实现
- 响应式状态管理

用法示例:
```html
<ShICalendarNotify
  show={true}
  title="操作成功"
  type="success"
  duration={3}
  delay={0.5}
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
