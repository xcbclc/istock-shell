import { ScopeError } from '@istock-shell/util';
import {
  getInitPosition,
  ContextmenuStoreCopy,
  ContextmenuStoreOther,
  type ContextmenuStoreAction,
  type ContextmenuStoreModel,
  type ContextmenuStoreModels,
  type OutputStoreDataItem,
} from '@/store';
import { CmdWindowsManager, type CmdWindowContext } from '@/window';

export const contextmenuAction = async (
  ctx: CmdWindowContext,
  action: ContextmenuStoreAction,
  block: OutputStoreDataItem
) => {
  const prompt = block.promptTexts.map((item) => item.text).join(' ');
  if (action === ContextmenuStoreCopy.input) {
    await navigator.clipboard.writeText(block.input);
  }
  if (action === ContextmenuStoreCopy.prompt) {
    await navigator.clipboard.writeText(prompt);
  }
  if (action === ContextmenuStoreCopy.output) {
    await navigator.clipboard.writeText(JSON.stringify(block.output));
  }
  if (action === ContextmenuStoreCopy.all) {
    await navigator.clipboard.writeText(`${prompt} ${block.input}\n${JSON.stringify(block.output)}`);
  }
  if (action === ContextmenuStoreOther.addCmdAlias) {
    const { cmdAlias } = ctx.cmdWindow.store;
    cmdAlias.form.cmd = block.input;
    cmdAlias.modal.show = true;
  }
};

export const contextmenuHandleFactory = (ctx: CmdWindowContext) => {
  const { contextmenu } = ctx.store;
  contextmenu.hoverBlockIndex = -1;
  let isMouseInContextmenu = false;
  const handleMenuAction = async (action: ContextmenuStoreAction, block: OutputStoreDataItem) => {
    await contextmenuAction(ctx, action, block);
    contextmenu.position = getInitPosition();
  };
  const onMenuClick = async (contextmenuItem: ContextmenuStoreModel) => {
    const { output } = ctx.store;
    const block = output.list[contextmenu.hoverBlockIndex];
    if (!block) throw new ScopeError('iswork.handleBlockContextmenuFactory', '没有找到输出块信息');
    await handleMenuAction(contextmenuItem.action, block);
  };
  const onMenuShortcutKey = async (ev: KeyboardEvent) => {
    if (ctx.cmdWindow.isDemoMode) return;
    const { output } = ctx.store;
    const currentIndex = contextmenu.hoverBlockIndex;
    if (currentIndex === -1) return;
    const currentBlock = output.list[currentIndex];
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
        await handleMenuAction(contextMenuItem.action, currentBlock);
      }
    }
  };
  const onContextmenu = (ev: MouseEvent, index: number) => {
    if (ctx.cmdWindow.isDemoMode) return;
    ev.preventDefault();
    const windowElement = CmdWindowsManager.cmdWindowsManager.getWindowEl(ctx.windowId);
    const { x, y } = ev;
    contextmenu.hoverBlockIndex = index;
    contextmenu.position = {
      window: { width: windowElement.offsetWidth, height: windowElement.offsetHeight },
      offset: { x, y },
    };
    contextmenu.show = true;
  };

  const onSectionMouseEnter = (ev: MouseEvent, index: number) => {
    if (ctx.cmdWindow.isDemoMode) return;
    const element = ev.target as HTMLElement;
    // 如果从其他section移入到当前section，且当前有显示的菜单，则隐藏菜单
    if (contextmenu.show && contextmenu.hoverBlockIndex !== index && !isMouseInContextmenu) {
      contextmenu.show = false;
    }
    contextmenu.hoverBlockIndex = index;
    if (element) {
      element.focus({
        preventScroll: true,
      });
    }
  };

  const onSectionMouseLeave = (_ev: MouseEvent, index: number) => {
    if (ctx.cmdWindow.isDemoMode) return;
    setTimeout(() => {
      if (contextmenu.hoverBlockIndex === index && !isMouseInContextmenu) {
        contextmenu.show = false;
      }
    }, 0);
  };

  const onSectionClick = (_ev: MouseEvent, index: number) => {
    if (ctx.cmdWindow.isDemoMode) return;
    contextmenu.show = false;
    contextmenu.position = getInitPosition();
    contextmenu.hoverBlockIndex = index;
  };

  const onMainMouseLeave = () => {
    if (ctx.cmdWindow.isDemoMode) return;
    setTimeout(() => {
      if (!isMouseInContextmenu) {
        contextmenu.hoverBlockIndex = -1;
        contextmenu.position = getInitPosition();
        contextmenu.show = false;
      }
    }, 0);
  };

  const onContextmenuMouseStatus = (status: boolean) => {
    isMouseInContextmenu = status;
  };

  return {
    onMenuClick,
    onMenuShortcutKey,
    onContextmenu,
    onSectionMouseEnter,
    onSectionMouseLeave,
    onSectionClick,
    onMainMouseLeave,
    onContextmenuMouseStatus,
  };
};
