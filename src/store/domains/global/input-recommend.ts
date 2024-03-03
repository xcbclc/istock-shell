import { writable, type Writable } from 'svelte/store';
import type { CmdWindowContext } from '@/window/cmd-window-context';

export type TInputRecommend = {
  list: Array<{ value: string; description: string }> | null;
  input: string;
};

export interface IInputRecommend extends Writable<TInputRecommend> {
  recommend: (input: string, domain: string[]) => Promise<void>;
}

export const getInputRecommend = (ctx: CmdWindowContext) => {
  const inputRecommend: IInputRecommend = Object.create(
    writable({
      list: null,
      input: '',
    })
  );
  // 命令输入推荐
  inputRecommend.recommend = async (input: string, domainNamePaths: string[]) => {
    const { payload } = await ctx.message.send<TInputRecommend>('global', 'recommend.auto', {
      input,
      domainNamePaths,
    });
    if (payload) {
      inputRecommend.set(payload);
    }
  };
  return inputRecommend;
};
