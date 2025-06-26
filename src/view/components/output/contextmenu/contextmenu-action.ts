import { type CmdWindowContext } from '@/window';
import {
  ContextmenuStoreCopy,
  ContextmenuStoreOther,
  type ContextmenuStoreAction,
  type OutputStoreDataItem,
} from '@/store';

/**
 * 右键菜单栏动作处理
 * @param ctx
 * @param action
 * @param block
 */
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
