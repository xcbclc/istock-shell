import { type Writable, writable } from 'svelte/store';
import type { CmdWindowContext } from '@/window/cmd-window-context';

export type TPromptText = {
  text: string;
  type: string;
};
export type TDomain = {
  name: string;
  viewName: string;
};
export interface IPrompt {
  time: Date;
  username: string;
  app: string;
  domains: TDomain[];
  split: string;
}
export interface ICmdPromptWritable extends Writable<IPrompt> {}

export interface ICmdPromptTextsWritable extends Writable<TPromptText[]> {}

export const LOCAL_STORE_DOMAINS = 'local_store_domains';

export const getCmdDynamicPrompt = (ctx: CmdWindowContext) => {
  const storeDomains = sessionStorage.getItem(`${LOCAL_STORE_DOMAINS}_${ctx.windowId}`);
  const domains: TDomain[] = storeDomains ? JSON.parse(storeDomains) : [];
  const dynamicPrompt: ICmdPromptWritable = Object.create(
    writable<IPrompt>({
      time: new Date(),
      username: '',
      app: 'IS',
      domains,
      split: '$',
    })
  );

  return dynamicPrompt;
};

export const getCmdDynamicPromptTexts = (_ctx: CmdWindowContext) => {
  const dynamicPromptTexts: ICmdPromptTextsWritable = Object.create(writable<TPromptText[]>([]));
  return dynamicPromptTexts;
};
