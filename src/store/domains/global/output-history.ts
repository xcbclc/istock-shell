import { writable, type Writable } from 'svelte/store';
import type { CmdWindowContext } from '@/window/cmd-window-context';
import type { HistoryModel } from '@domains/global/history/history.model';

export interface IOutputHistory extends Writable<HistoryModel[]> {}

export const getOutputHistory = (_ctx: CmdWindowContext) => {
  const outputHistory: IOutputHistory = Object.create(writable([]));
  return outputHistory;
};
