import { type CmdWindowContext } from '@/window/cmd-window-context';
import { COPY, OTHER, type TAction } from '@/store/cmd/cmd-contextmenu';
import { type ICmdOutput } from '@/store/cmd/cmd-output/store';

/**
 * 右键菜单栏动作处理
 * @param ctx
 * @param action
 * @param block
 */
export const contextmenuAction = async (ctx: CmdWindowContext, action: TAction, block: ICmdOutput) => {
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
  if (action === OTHER.addCmdAlias) {
    const { addCmdAlias } = ctx.domainStore;
    addCmdAlias.openModal(`${block.id}`, block.input);
  }
};
