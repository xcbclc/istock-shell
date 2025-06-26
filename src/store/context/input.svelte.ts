import type { Token } from '@istock-shell/command-parser';
import type { CmdWindowContext } from '@/window';
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
  constructor(ctx: CmdWindowContext, config: StoreConfig<InputStoreModel> = {}) {
    super(ctx, config);
    this.storeEffect = createStoreEffects({});
  }
  protected async init() {}
  async nodeUpdate(nodes: InputStoreNodes, isEdit: boolean = false) {
    this.data.inputNodes = nodes;
    if (isEdit) this.data.editInputNodes = nodes;
  }
  async merge(tokenValue: string) {
    const { payload } = await this.ctx.message.send<InputStoreNodes>('input', 'input.merge', {
      tokenValue,
      tokens: this.data.inputNodes,
    });
    if (payload) {
      this.data.inputNodes = payload;
    }
  }
  async sendCmd(input: string) {
    const { shellInfo } = this.ctx.cmdWindow.store;
    if (!shellInfo.readState) {
      shellInfo.readState = true;
    }
    if (!this.canInput) return;
    this.canInput = false;
    try {
      await this.ctx.store.output.sendCmd(input);
    } catch (e) {
      throw e;
    } finally {
      this.canInput = true;
    }
  }
}
