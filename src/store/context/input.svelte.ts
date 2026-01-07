import type { Token } from '@istock-shell/command-parser';
import type { CommandEditor, CommandEditorMentionData } from '@istock-shell/editor';
import type { CmdWindowContext, CmdWindowContextData } from '@/window';
import { createStoreEffects, type StoreConfig, StoreContext } from '@/store';

export interface InputStoreModel {}
export type InputStoreNode = {
  id?: number;
} & Token;
export type InputStoreNodes = InputStoreNode[];
export interface InputStoreData {
  inputNodes: InputStoreNodes;
  editInputNodes: InputStoreNodes;
}
export class Input extends StoreContext<InputStoreModel> {
  public data: InputStoreData = $state({
    inputNodes: [],
    editInputNodes: [],
  });
  public canInput: boolean = $state(true);
  public commandEditor: CommandEditor | null = null;
  constructor(ctx: CmdWindowContext, config: StoreConfig<InputStoreModel> = {}) {
    super(ctx, config);
    this.storeEffect = createStoreEffects({});
  }
  protected async init() {}
  /**
   * 绑定命令编辑器
   * @param commandEditor 命令编辑器实例
   */
  bindCommandEditor(commandEditor: CommandEditor) {
    this.commandEditor = commandEditor;
  }
  /**
   * 更新输入节点
   * @param nodes 输入节点
   * @param isEdit 是否是编辑状态
   */
  async nodeUpdate(nodes: InputStoreNodes, isEdit: boolean = false) {
    this.data.inputNodes = nodes;
    if (isEdit) this.data.editInputNodes = nodes;
  }
  /**
   * 合并输入节点
   * @param tokenValue 合并后的token值
   */
  async merge(tokenValue: string) {
    const { payload } = await this.ctx.message.send<InputStoreNodes>('input', 'input.merge', {
      tokenValue,
      tokens: this.data.inputNodes,
    });
    if (payload) {
      this.data.inputNodes = payload;
    }
  }
  /**
   * 发送命令
   * @param input 命令字符串
   * @param mentions 提及数据
   */
  async sendCmd(input: string, mentions: CommandEditorMentionData[] = []) {
    const { shellInfo } = this.ctx.cmdWindow.store;
    if (!shellInfo.readState) {
      shellInfo.readState = true;
    }
    if (!this.canInput) return;
    this.canInput = false;
    try {
      await this.ctx.store.output.sendCmd(input, this.getSendCmdContext(mentions));
    } catch (e) {
      throw e;
    } finally {
      this.canInput = true;
    }
  }
  /**
   * 获取发送命令上下文
   * @param mentions 提及数据
   * @returns 上下文数据
   */
  getSendCmdContext(mentions: CommandEditorMentionData[]): CmdWindowContextData {
    const { history } = this.ctx.store;
    return this.ctx.getContextData('mention', history.findListById(mentions.map((item) => item.id)));
  }
}
