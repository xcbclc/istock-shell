import { ScopeError } from '@istock/util';
import {
  type TAction,
  type TContextmenuItems,
  type TContextmenuItem,
  type TContextmenuPosition,
} from '@/store/cmd/cmd-contextmenu';
import type { ICmdOutput } from '@/store/cmd/cmd-output/store';
import { CmdWindowsManager } from '@/window/cmd-windows-manager';
import type { CmdWindowContext } from '@/window/cmd-window-context';
import { contextmenuAction } from './contextmenu-action';

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
    await contextmenuAction(ctx, action, block);
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
      if (ev.altKey) shortcutKeys.push('alt');
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
  const handleBlockMouseEnter = (ev: MouseEvent, index: number) => {
    const element = ev.target as HTMLElement;
    if (isViewContextmenu) return;
    hoverBlockIndex = index;
    if (element) {
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
    handleBlockMouseEnter,
    handleOnClick,
  };
};
