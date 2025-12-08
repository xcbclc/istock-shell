import { ScopeError } from '@istock-shell/util';
import { keyCommand } from '@istock-shell/command-parser';
import {
  getInitPosition,
  ContextmenuStoreCopy,
  ContextmenuStoreOther,
  type ContextmenuStoreAction,
  type ContextmenuStoreModel,
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
    cmdAlias.openCmdAlias(block.input);
  }
  if (action === ContextmenuStoreOther.ai) {
    const { commandEditor } = ctx.store.input;
    if (!commandEditor) throw new ScopeError('iswork.handleBlockContextmenuFactory', '没有绑定命令编辑器');
    let input = commandEditor.input.trim();
    const tag = `#[${block.id},${block.input}]`;
    if (input.startsWith(keyCommand.ai.command)) {
      input += tag;
      commandEditor.handleCommandInput(input);
    } else {
      input = `${keyCommand.ai.command} ${tag}`;
      commandEditor.handleCommandInput(input);
    }
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
    const { shortcut } = ctx.cmdWindow.store;
    const currentIndex = contextmenu.hoverBlockIndex;
    if (currentIndex === -1) return;
    const currentBlock = output.list[currentIndex];

    // 检查右键菜单相关的快捷键
    if (shortcut.matchShortcut(ev, 'copyInput')) {
      ev.preventDefault();
      await handleMenuAction(ContextmenuStoreCopy.input, currentBlock);
      return;
    }

    if (shortcut.matchShortcut(ev, 'copyOutput')) {
      ev.preventDefault();
      await handleMenuAction(ContextmenuStoreCopy.output, currentBlock);
      return;
    }

    if (shortcut.matchShortcut(ev, 'copyPrompt')) {
      ev.preventDefault();
      await handleMenuAction(ContextmenuStoreCopy.prompt, currentBlock);
      return;
    }

    if (shortcut.matchShortcut(ev, 'copyAll')) {
      ev.preventDefault();
      await handleMenuAction(ContextmenuStoreCopy.all, currentBlock);
      return;
    }

    if (shortcut.matchShortcut(ev, 'addCmdAlias')) {
      ev.preventDefault();
      await handleMenuAction(ContextmenuStoreOther.addCmdAlias, currentBlock);
      return;
    }

    if (shortcut.matchShortcut(ev, 'ai')) {
      ev.preventDefault();
      await handleMenuAction(ContextmenuStoreOther.ai, currentBlock);
      return;
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
