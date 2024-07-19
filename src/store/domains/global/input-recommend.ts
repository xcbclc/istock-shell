import { writable, type Writable } from 'svelte/store';
import { keyCommand } from '@istock/command-parser';
import type { CmdWindowContext } from '@/window/cmd-window-context';
import type { ERecommendType } from '@domains/global/recommend/recommend.service';
export { ERecommendType as EInputRecommendType } from '@domains/global/recommend/recommend.service';

export type TInputRecommendItem = { label: string; value: string; description: string };
export type TInputRecommend = {
  list: TInputRecommendItem[] | null;
  input: string;
  type: ERecommendType;
};

export interface IInputRecommend extends Writable<TInputRecommend> {
  recommend: (input: string) => Promise<void>;
}

export const getInputRecommend = (ctx: CmdWindowContext) => {
  const inputRecommend: IInputRecommend = Object.create(
    writable({
      list: null,
      input: '',
    })
  );
  // 命令输入推荐
  inputRecommend.recommend = async (input: string) => {
    input = input.trim();
    if (!input) return;
    const isCmdAlias = input?.[0] === keyCommand.alias.command;
    const { payload } = await ctx.workerMessage.send<TInputRecommend>(
      'global',
      isCmdAlias ? 'recommend.alias' : 'recommend.auto',
      { input }
    );
    if (payload) {
      inputRecommend.set(payload);
    }
  };
  return inputRecommend;
};
