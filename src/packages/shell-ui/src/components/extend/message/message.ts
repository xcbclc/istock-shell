import { mount, unmount } from 'svelte';
import { isString } from '@istock-shell/util';
import type { AlertProps } from '../../index';
import Message from './Message.svelte';

// Message 组件的配置接口
interface MessageOptions extends Partial<AlertProps> {
  message: string; // 消息内容
  duration?: number; // 显示时长
}

// 全局消息容器引用
let messageContainer: HTMLDivElement | null = null;

/**
 * 创建或获取消息容器
 * @returns HTMLDivElement 消息容器元素
 */
function createContainer() {
  if (!messageContainer) {
    messageContainer = document.createElement('div');
    messageContainer.id = 'sh-message-container';
    messageContainer.setAttribute('popover', '');
    document.body.appendChild(messageContainer);
  }
  messageContainer.showPopover();
  return messageContainer;
}

/**
 * 显示消息的核心处理函数
 * @param options 消息配置项或消息字符串
 * @returns SvelteComponent 返回消息实例
 */
export function showMessageHandler(options: MessageOptions | string) {
  const container = createContainer();

  // 统一配置格式：字符串转换为对象
  const config = isString(options) ? { message: options } : options;

  // 创建并挂载消息组件
  const messageInstance = mount(Message, {
    target: container,
    props: {
      message: config.message,
      duration: config.duration ?? 3000, // 默认显示 3 秒
      alertProps: {
        type: config.type, // 默认类型为 info
        soft: config.soft, // 柔和样式
        outline: config.outline, // 轮廓样式
        dash: config.dash, // 虚线样式
      },
      // 关闭处理函数
      onClose: async () => {
        container.hidePopover();
        await unmount(messageInstance, { outro: true });
      },
    },
  });
  return messageInstance;
}

/**
 * 快捷方法：提供四种类型的消息显示
 * - alert: 普通提示
 * - info: 信息提示
 * - success: 成功提示
 * - warning: 警告提示
 * - error: 错误提示
 */
export const showMessage = {
  // 普通提示
  alert: (message: string, options?: Partial<MessageOptions>) =>
    showMessageHandler({
      ...options,
      message,
    }),
  // 信息提示
  info: (message: string, options?: Partial<MessageOptions>) =>
    showMessageHandler({
      ...options,
      message,
      type: 'info',
    }),

  // 成功提示
  success: (message: string, options?: Partial<MessageOptions>) =>
    showMessageHandler({ ...options, message, type: 'success' }),

  // 警告提示
  warning: (message: string, options?: Partial<MessageOptions>) =>
    showMessageHandler({ ...options, message, type: 'warning' }),

  // 错误提示
  error: (message: string, options?: Partial<MessageOptions>) =>
    showMessageHandler({ ...options, message, type: 'error' }),
};
