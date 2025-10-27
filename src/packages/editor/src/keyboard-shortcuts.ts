import { Extension } from '@tiptap/core';

export interface KeyboardShortcutsOption {
  Enter?: () => Boolean;
}

export const getKeyboardShortcuts = (option: KeyboardShortcutsOption) => {
  return Extension.create({
    name: 'keyboard',
    addKeyboardShortcuts() {
      return {
        Enter: () => true, // 阻止默认的回车行为
      };
    },
  });
};
