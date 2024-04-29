import { get, writable, type Writable } from 'svelte/store';
import { isArray, toLocaleDateString, stringify, parse } from '@istock/util';
import type { CmdWindowContext } from '@/window/cmd-window-context';
import type { IPrompt, TPromptText } from '../cmd-prompt';
import { getOutputErrorData, getCmdOutputLoading } from './default-output';
import { sendCmdExecutionFlow } from './execution-flow';
import { ECmdWindowContextMode } from '@/window/cmd-window-context';

export interface ICmdOutputData {
  component: string;
  props: Record<string, any>;
}

export interface ICmdOutput {
  id: string | number;
  promptTexts: TPromptText[];
  input: string;
  output: ICmdOutputData[];
  source?: string;
}
export interface ICmdOutputs {
  list: ICmdOutput[];
  historyIndex: number;
}

export interface ICmdOutputWritable extends Writable<ICmdOutputs> {
  sendCmd: (cmdStr: string) => Promise<void>;
  saveCmdToHistory: (cmdOutput: ICmdOutput, originPrompt: IPrompt) => Promise<void>;
  updateLastOutputData: (outputData: ICmdOutputData | ICmdOutputData[], source?: string) => void;
}

export const getCmdOutput = (ctx: CmdWindowContext) => {
  const cmdOutput: ICmdOutputWritable = Object.create(
    writable<ICmdOutputs>({
      list: [],
      historyIndex: -1,
    })
  );

  /**
   * 发送命令
   * @param input
   */
  cmdOutput.sendCmd = async (input: string) => {
    input = input.trim();
    if (!input) return;
    const originPrompt = get(ctx.cmdStore.cmdPrompt);
    const promptTexts = get(ctx.cmdStore.cmdPromptTexts);

    // 添加加载loading
    const lastOutput: ICmdOutput = getCmdOutputLoading(ctx.message.nextId(), input, promptTexts);
    cmdOutput.update((output) => {
      const list = output.list;
      list.push(lastOutput);
      output.list = list;
      output.historyIndex = -1; // 重置历史索引推荐
      return output;
    });

    try {
      await sendCmdExecutionFlow(ctx, cmdOutput, input);
    } catch (e) {
      console.error(e);
      const errorOutputData = getOutputErrorData(e as Error);
      cmdOutput.updateLastOutputData(errorOutputData, 'self');
    } finally {
      // 关闭加载loading
      cmdOutput.update((output) => {
        const lastOutput = output.list[output.list.length - 1];
        lastOutput.output.pop();
        output.list[output.list.length - 1] = lastOutput;
        return output;
      });
      // 异步保存历史记录
      await cmdOutput.saveCmdToHistory(lastOutput, originPrompt);
    }
  };

  /**
   * 保存当前命令到
   * @param cmdOutputData
   * @param originPrompt
   */
  cmdOutput.saveCmdToHistory = async (cmdOutputData: ICmdOutput, originPrompt: IPrompt) => {
    // 演示发起的命令不保存到历史记录
    if (ctx.mode === ECmdWindowContextMode.example) return;
    const { message } = ctx;
    const payload: ICmdOutput & { cmd: string; rowStatus: number; createDate: Date } = parse(stringify(cmdOutputData));
    payload.source = 'db';
    payload.cmd = ''; // todo 单命令需要保存方便搜索
    payload.promptTexts = payload.promptTexts.map((text) => {
      if (text.type === 'time') {
        text.text = toLocaleDateString(originPrompt.time, 'YYYY-MM-DD hh:mm:ss');
      }
      return text;
    });
    payload.rowStatus = 1;
    payload.createDate = new Date();
    await message.send('global', 'history.add', payload);
  };
  /**
   * 更新最后一个输出
   * @param outputData
   * @param source
   */
  cmdOutput.updateLastOutputData = (outputData: ICmdOutputData | ICmdOutputData[], source?: string) => {
    cmdOutput.update((output) => {
      const lastOutput = output.list[output.list.length - 1];
      const loading = lastOutput.output.pop();
      if (isArray(outputData)) {
        lastOutput.output = lastOutput.output.concat(outputData);
      } else {
        lastOutput.output.push(outputData);
      }
      if (loading) lastOutput.output.push(loading);
      if (source) lastOutput.source = source;
      output.list[output.list.length - 1] = lastOutput;
      return output;
    });
  };

  return cmdOutput;
};
