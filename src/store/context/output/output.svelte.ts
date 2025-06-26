import dayjs from 'dayjs';
import { isArray, clone } from '@istock-shell/util';
import {
  getOutputErrorData,
  getCmdOutputLoadingData,
  getCmdOutputInit,
  isCmdOutputLoadingData,
} from './default-output';
import { sendCmdExecutionFlow } from './execution-flow';

import type { CmdWindowContext } from '@/window';
import {
  createStoreEffects,
  StoreContext,
  type StoreConfig,
  type PromptStoreDataText,
  type PromptStoreData,
} from '@/store';

export interface OutputStoreComponentInfo {
  component: string;
  props: Record<string, any>;
  messageId: string;
}

export interface OutputStoreDataItem {
  id: string | number;
  promptTexts: PromptStoreDataText[];
  input: string; // 输入
  output: OutputStoreComponentInfo[];
  source?: string;
}
export type OutputStoreList = OutputStoreDataItem[];
export interface OutputStoreModel {}

export class Output extends StoreContext<OutputStoreModel> {
  public list: OutputStoreList = $state([]);
  public historyIndex: number = -1;
  constructor(ctx: CmdWindowContext, config: StoreConfig<OutputStoreModel> = {}) {
    super(ctx, config);
    this.storeEffect = createStoreEffects({});
  }
  protected async init() {}

  /**
   * 发送命令
   * @param input
   */
  async sendCmd(input: string) {
    input = input.trim();
    if (!input) return;
    const { prompt } = this.ctx.store;
    // 初始化命令数据
    const lastOutput: OutputStoreDataItem = getCmdOutputInit(this.ctx.cmdWindow.getNextId(), input, prompt.promptTexts);
    lastOutput.output = [getCmdOutputLoadingData()]; // 添加loading
    this.list.push(lastOutput);
    this.historyIndex = -1;

    try {
      await sendCmdExecutionFlow(this, input);
    } catch (e) {
      console.error(e);
      const errorOutputData = getOutputErrorData(e as Error);
      this.updateLastOutputData(errorOutputData, 'self');
    } finally {
      const lastIndex = this.list.length - 1;
      const lastOutput = this.list[lastIndex];
      // 关闭loading
      lastOutput.output = lastOutput.output.filter((data) => !isCmdOutputLoadingData(data));
      this.list[lastIndex] = lastOutput;
      lastOutput.source = 'db';
      await this.saveCmdToHistory(lastOutput, prompt.data);
    }
  }

  /**
   * 保存当前命令到
   * @param data
   * @param promptData
   */
  async saveCmdToHistory(data: OutputStoreDataItem, promptData: PromptStoreData) {
    // 演示发起的命令不保存到历史记录
    if (this.ctx.cmdWindow.isDemoMode) return;
    const payload: OutputStoreDataItem & { cmd?: string; rowStatus?: number; createDate?: Date } = clone(data);
    payload.source = 'db';
    payload.cmd = ''; // todo 单命令需要保存方便搜索
    payload.promptTexts = payload.promptTexts.map((text) => {
      if (text.type === 'time') {
        text.text = dayjs(promptData.time).format('YYYY-MM-DD HH:mm:ss');
      }
      return text;
    });
    payload.rowStatus = 1;
    payload.createDate = new Date();
    await this.ctx.message.send('global', 'history.add', payload);
  }

  /**
   * 替换更新最后一个输出
   * @param componentInfo
   * @param source
   */
  replaceLastOutputData(componentInfo: OutputStoreComponentInfo | OutputStoreComponentInfo[], source?: string) {
    const lastIndex = this.list.length - 1;
    const lastOutput = this.list[lastIndex];
    const loading = lastOutput.output.find((data) => isCmdOutputLoadingData(data));
    if (isArray(componentInfo)) {
      lastOutput.output = componentInfo;
    } else {
      lastOutput.output = [componentInfo];
    }
    if (loading) lastOutput.output.push(loading);
    if (source) lastOutput.source = source;
    this.list.splice(lastIndex, 1, lastOutput);
  }

  /**
   * 追加更新最后一个输出
   * @param componentInfo
   * @param source
   */
  updateLastOutputData(componentInfo: OutputStoreComponentInfo | OutputStoreComponentInfo[], source?: string) {
    const lastIndex = this.list.length - 1;
    const lastOutput = this.list[lastIndex];
    const loadingIndex = lastOutput.output.findIndex((data) => isCmdOutputLoadingData(data));
    let loading: OutputStoreComponentInfo | null = null;
    if (loadingIndex !== -1) {
      loading = lastOutput.output[loadingIndex];
      lastOutput.output.splice(loadingIndex, 1);
    }
    if (isArray(componentInfo)) {
      lastOutput.output = lastOutput.output.concat(componentInfo);
    } else {
      lastOutput.output.push(componentInfo);
    }
    if (loading) lastOutput.output.push(loading);
    if (source) lastOutput.source = source;
    this.list.splice(lastIndex, 1, lastOutput);
  }

  /**
   * 打开loading
   */
  openCmdLoading() {
    const lastIndex = this.list.length - 1;
    const lastOutput = this.list[lastIndex];
    const loading = lastOutput.output.find((data) => isCmdOutputLoadingData(data));
    if (!loading) {
      lastOutput.output.push(getCmdOutputLoadingData());
    }
    this.list.splice(lastIndex, 1, lastOutput);
  }

  /**
   * 关闭loading
   */
  closeCmdLoading() {
    const lastIndex = this.list.length - 1;
    const lastOutput = this.list[lastIndex];
    lastOutput.output = lastOutput.output.filter((data) => !isCmdOutputLoadingData(data));
    this.list.splice(lastIndex, 1, lastOutput);
  }

  async onSendAiMessage(data: { messageId: string }) {
    this.ctx.message.sendMessageToChannel(data.messageId, { messageId: data.messageId });
  }
}
