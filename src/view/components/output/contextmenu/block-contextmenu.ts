import { ScopeError } from '@istock-shell/util';
import type {
  ContextmenuStoreAction,
  ContextmenuStoreModel,
  ContextmenuStoreModels,
  ContextmenuStorePosition,
  OutputStoreDataItem,
  OutputStoreList,
} from '@/store';
import { CmdWindowsManager, type CmdWindowContext } from '@/window';
import { contextmenuAction } from './contextmenu-action';

export const handleBlockContextmenuFactory = (
  ctx: CmdWindowContext,
  windowId: number,
  updatePosition: (data: Partial<ContextmenuStorePosition>) => void
) => {
  let hoverBlockIndex: number = -1;
  let isViewContextmenu = false;
  const handleMouseStatus = (status: boolean) => {
    isViewContextmenu = status;
  };
  const handleMenuAction = async (action: ContextmenuStoreAction, block: OutputStoreDataItem) => {
    await contextmenuAction(ctx, action, block);
    updatePosition({ offset: { x: -1, y: -1 } });
  };
  const handleMenuClick = async (contextmenuItem: ContextmenuStoreModel, blocks: OutputStoreList) => {
    const block = blocks[hoverBlockIndex];
    if (!block) throw new ScopeError('iswork.handleBlockContextmenuFactory', '没有找到输出块信息');
    await handleMenuAction(contextmenuItem.action, block);
  };
  const handleMenuShortcutKey = async (ev: KeyboardEvent, block: OutputStoreDataItem) => {
    const { key } = ev;
    if (ev.ctrlKey) {
      const { contextmenu } = ctx.store;
      let allContextMenuItem: ContextmenuStoreModels = contextmenu.getAllMenu();
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
    const windowElement = CmdWindowsManager.cmdWindowsManager.getWindowEl(windowId);
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
      element.focus({
        preventScroll: true,
      });
    }
    updatePosition({ offset: { x: -1, y: -1 } });
  };

  const handleMouseleave = (_ev: MouseEvent, _index: number) => {
    hoverBlockIndex = -1;
  };

  const handleOnClick = (_ev: MouseEvent) => {
    updatePosition({ offset: { x: -1, y: -1 } });
  };

  const getCurrentIndex = () => hoverBlockIndex;

  return {
    handleMouseStatus,
    handleMenuClick,
    handleMenuShortcutKey,
    handleOpenBlockContextmenu,
    handleBlockMouseEnter,
    handleOnClick,
    handleMouseleave,
    getCurrentIndex,
  };
};
