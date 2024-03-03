import { ScopeError } from '@istock/util';
import {
  type TAction,
  type TContextmenuItems,
  type TContextmenuItem,
  type TContextmenuPosition,
  COPY,
} from '@/store/cmd/cmd-contextmenu';
import type { ICmdOutput } from '@/store/cmd/cmd-output/store';
import { CmdWindowsManager } from '@/window/cmd-windows-manager';
import type { CmdWindowContext } from '@/window/cmd-window-context';

export const handleBlockContextmenuFactory = (
  ctx: CmdWindowContext,
  windowId: number,
  updatePosition: (data: Partial<TContextmenuPosition>) => void
) => {
  let hoverBlockIndex: number = -1;
  let isViewContextmenu = false;
  const handleMouseStatus = (ev: CustomEvent) => {
    isViewContextmenu = ev.detail;
  };
  const handleMenuAction = async (action: TAction, block: ICmdOutput) => {
    const prompt = block.promptTexts.map((item) => item.text).join(' ');
    if (action === COPY.input) {
      await navigator.clipboard.writeText(block.input);
    }
    if (action === COPY.prompt) {
      await navigator.clipboard.writeText(prompt);
    }
    if (action === COPY.output) {
      await navigator.clipboard.writeText(JSON.stringify(block.output));
    }
    if (action === COPY.all) {
      await navigator.clipboard.writeText(`${prompt} ${block.input}\n${JSON.stringify(block.output)}`);
    }
    updatePosition({ offset: { x: -1, y: -1 } });
  };
  const handleMenuClick = async (ev: CustomEvent<TContextmenuItem>, blocks: ICmdOutput[]) => {
    const block = blocks[hoverBlockIndex];
    if (!block) throw new ScopeError('iswork.handleBlockContextmenuFactory', '没有找到输出块信息');
    const contextmenuItem = ev.detail;
    await handleMenuAction(contextmenuItem.action, block);
  };
  const handleMenuShortcutKey = async (ev: KeyboardEvent, block: ICmdOutput) => {
    const { key } = ev;
    if (ev.ctrlKey) {
      const { cmdContextmenu } = ctx.cmdStore;
      let allContextMenuItem: TContextmenuItems = [];
      if (cmdContextmenu.getAllMenuItem) {
        allContextMenuItem = cmdContextmenu.getAllMenuItem();
      }
      const shortcutKeys = ['ctrl'];
      if (ev.shiftKey) shortcutKeys.push('shift');
      shortcutKeys.push(key.toLowerCase());
      const shortcutKey = shortcutKeys.join('+');
      const contextMenuItem = allContextMenuItem.find((item) => item.shortcutKey === shortcutKey);
      if (contextMenuItem) {
        ev.preventDefault();
        await handleMenuAction(contextMenuItem.action, block);
      }
    }
  };
  const handleOpenBlockContextmenu = (ev: MouseEvent) => {
    ev.preventDefault();
    const windowElement = CmdWindowsManager.getInstance().getWindowEl(windowId);
    const { x, y } = ev;
    updatePosition({
      window: { width: windowElement.offsetWidth, height: windowElement.offsetHeight },
      offset: { x, y },
    });
  };
  const handleBlockMouseOver = (ev: MouseEvent, index: number) => {
    const element = ev.target as HTMLElement;
    if (isViewContextmenu) return;
    if (index === hoverBlockIndex) {
      if (element && document.activeElement !== element) {
        element.focus();
      }
      return;
    }
    hoverBlockIndex = index;
    if (element && document.activeElement !== element) {
      element.focus();
    }
    updatePosition({ offset: { x: -1, y: -1 } });
  };

  const handleOnClick = (_ev: MouseEvent) => {
    updatePosition({ offset: { x: -1, y: -1 } });
  };

  return {
    handleMouseStatus,
    handleMenuClick,
    handleMenuShortcutKey,
    handleOpenBlockContextmenu,
    handleBlockMouseOver,
    handleOnClick,
  };
};
