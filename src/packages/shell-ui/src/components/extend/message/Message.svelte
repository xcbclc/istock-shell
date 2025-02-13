<script lang="ts" module>
  import type { AlertProps } from '../../index';

  export interface MessageProps {
    message: string; // 消息内容
    duration?: number; // 显示持续时间（毫秒）
    onClose: () => void; // 关闭回调函数
    alertProps?: Partial<AlertProps>; // Alert 组件的可选配置
  }
</script>

<script lang="ts">
  import { fade } from 'svelte/transition';
  import { tuc } from '@istock/util';
  import { ShAlert } from '../../index';

  const {
    message, // 消息内容
    duration = 3000, // 默认显示 3 秒
    onClose, // 关闭回调
    alertProps = {}, // Alert 组件属性
  }: MessageProps = $props();

  // 自动关闭效果
  $effect(() => {
    if (duration > 0) {
      // 设置定时器，到时间后自动关闭
      setTimeout(() => {
        onClose();
      }, duration);
    }
  });
</script>

<div class={tuc(['fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md'])} transition:fade={{ duration: 500 }}>
  <ShAlert {...alertProps} description={message} />
</div>

<style></style>
