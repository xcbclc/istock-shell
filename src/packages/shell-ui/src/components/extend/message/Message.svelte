<script lang="ts" module>
  import type { AlertProps, ToastProps } from '../../index';

  export interface MessageProps extends Omit<ToastProps, 'alerts'> {
    message: string; // 消息内容
    duration?: number; // 显示持续时间（毫秒）
    onClose: () => void; // 关闭回调函数
    alertProps?: Partial<AlertProps>; // Alert 组件的可选配置
  }
</script>

<script lang="ts">
  import { tuc } from '@istock/util';
  import { ShAlert, ShToast } from '../../index';

  const {
    message, // 消息内容
    duration = 3000, // 默认显示 3 秒
    onClose, // 关闭回调
    alertProps = {}, // Alert 组件属性
    class: className = '',
    ...otherProps
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

<ShToast horizontal="center" vertical="top" {...otherProps} class={[tuc(['z-50 max-w-md']), className]}>
  <ShAlert {...alertProps} description={message} />
</ShToast>

<style></style>
