import { keyCommand } from '@istock-shell/command-parser';
import { type CommandEditor, CommandEditorActionTypes } from '@istock-shell/editor';
import type { CmdWindowContext } from '@/window';
import { RecommendType, type RecommendDataItem, type RecommendData } from '@domains/global/recommend/recommend.service';
import { createStoreEffects, StoreContext, type StoreConfig, type InputStoreNodes } from '@/store';

export const RecommendStoreType = RecommendType;
export interface RecommendStoreModel extends RecommendDataItem {}
export type RecommendStoreList = RecommendStoreModel[];
export interface RecommendStoreData extends RecommendData {}
export class Recommend extends StoreContext<RecommendStoreModel> {
  public data: RecommendStoreData = $state({
    list: [],
    input: '',
    type: RecommendType.cmd,
  });
  constructor(ctx: CmdWindowContext, config: StoreConfig<RecommendStoreModel> = {}) {
    super(ctx, config);
    this.storeEffect = createStoreEffects({});
  }
  protected async init() {}
  protected async suggestion(input: string) {
    input = input.trim();
    if (!input) return;
    const isCmdAlias = input.startsWith(keyCommand.alias.command);
    const { payload } = await this.ctx.message.send<RecommendStoreData>(
      'global',
      isCmdAlias ? 'recommend.alias' : 'recommend.auto',
      { input }
    );
    if (payload) {
      this.data = payload;
    }
  }
  async onInputRecommendCmd(action: CommandEditorActionTypes, target: CommandEditor) {
    const { input, output } = this.ctx.store;
    let inputText = target.input;
    if ([CommandEditorActionTypes.Up, CommandEditorActionTypes.Down].includes(action)) {
      let inputNodes!: InputStoreNodes;
      let { historyIndex, list } = output;
      if (historyIndex === -1) {
        // 初始值
        historyIndex = list.length;
      }
      if (action === CommandEditorActionTypes.Up) historyIndex--;
      if (action === CommandEditorActionTypes.Down) historyIndex++;
      if (historyIndex >= list.length) {
        const { editInputNodes } = input.data;
        inputNodes = editInputNodes;
        historyIndex = list.length;
      }
      if (historyIndex < 0) {
        historyIndex = 0;
      }
      if (inputNodes === undefined) {
        const item = list[historyIndex];
        if (item) inputText = item.input;
      }
      if (inputText) {
        target.handleCommandInput(inputText, inputText);
        output.historyIndex = historyIndex;
      }
    }
    if (action === CommandEditorActionTypes.Auto) {
      await this.suggestion(inputText);
    }
  }
}
