import type { Writable } from 'svelte/store';
import type { CmdWindowContext } from '@/window/cmd-window-context';
import {
  getCmdDynamicPrompt,
  getCmdDynamicPromptTexts,
  type ICmdPromptWritable,
  type ICmdPromptTextsWritable,
} from './cmd-prompt';
import { getCmdInput, type ICmdInputWritable } from './cmd-input';
import { getCmdOutput, type ICmdOutputWritable } from './cmd-output/store';
import { cmdInfo, type ICmdInfo, showCmdInfo } from './cmd-info';
import { getCmdContextmenu, type IContextmenuWritable } from './cmd-contextmenu';
import { getOutputViewComponentMap, type IOutputViewComponentMapWritable } from './cmd-output-component';

export type TCmdStore = {
  cmdPrompt: ICmdPromptWritable;
  cmdPromptTexts: ICmdPromptTextsWritable;
  cmdInput: ICmdInputWritable;
  cmdOutput: ICmdOutputWritable;
  showCmdInfo: Writable<boolean>;
  cmdInfo: ICmdInfo;
  cmdContextmenu: IContextmenuWritable;
  outputViewComponentMap: IOutputViewComponentMapWritable;
};

/**
 * 获取所有命令界面store 注意获取各store方法时ctx上下文还没完全创建完
 * @param ctx
 */
export function getCmdStore(ctx: CmdWindowContext): TCmdStore {
  const cmdPrompt = getCmdDynamicPrompt(ctx);
  const cmdPromptTexts = getCmdDynamicPromptTexts(ctx);
  const cmdInput = getCmdInput(ctx);
  const cmdOutput = getCmdOutput(ctx);
  const cmdContextmenu = getCmdContextmenu(ctx);
  const outputViewComponentMap = getOutputViewComponentMap(ctx);

  return {
    cmdPrompt,
    cmdPromptTexts,
    cmdInput,
    cmdOutput,
    cmdInfo,
    showCmdInfo,
    cmdContextmenu,
    outputViewComponentMap,
  };
}
