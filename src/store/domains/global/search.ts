import { writable, type Writable } from 'svelte/store';
import type { CmdWindowContext } from '@/window/cmd-window-context';

export type TSearchListItem = {
  title: string;
  action: string;
  actionArgs?: any[];
  description?: string;
};
export type TSearchList = Array<{ category: string; title: string; list: TSearchListItem[] }>;
export type TSearchUiModel = {
  isOpen: boolean;
  searchList: TSearchList;
};

export interface ISearchWritable extends Writable<TSearchUiModel> {
  /**
   * 打开搜索面板
   */
  open: () => void;
  /**
   * 关闭搜索面板
   */
  close: () => void;
  /**
   * 根据搜索结果执行动作
   * @param searchItem
   */
  runAction: (searchItem: TSearchListItem) => void;
}

/**
 * 获取搜索ui相关操作对象
 * @param _ctx
 */
export const getSearch = (ctx: CmdWindowContext) => {
  const search: ISearchWritable = Object.create(
    writable({
      isOpen: false,
    })
  );
  search.open = () => {
    search.update((data) => {
      data.isOpen = true;
      return data;
    });
  };
  search.close = () => {
    search.update((data) => {
      data.isOpen = false;
      return data;
    });
  };
  search.runAction = (searchItem: TSearchListItem) => {
    if (searchItem.action === 'setting.cookie') {
      const { cookieManage } = ctx.domainStore;
      cookieManage.open();
    }
  };
  return search;
};
