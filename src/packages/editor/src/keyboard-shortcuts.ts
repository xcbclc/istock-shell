import { Extension } from '@tiptap/core';

/**
 * 命令编辑器键盘快捷键选项类型
 * @public
 */
export interface KeyboardShortcutsOption {
  Enter?: () => Boolean;
}

/**
 * 命令编辑器键盘快捷键扩展类型
 * @public
 */
export const getKeyboardShortcuts = (_option: KeyboardShortcutsOption) => {
  return Extension.create({
    name: 'keyboard',
    addKeyboardShortcuts() {
      return {
        Enter: () => true, // 阻止默认的回车行为
      };
    },
  });
};
