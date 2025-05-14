import { writable, type Writable } from 'svelte/store';
import type { CmdWindowContext } from '@/window/cmd-window-context';

export type TCookieModel = { id?: string; host: string; cookie: string; updateDate?: string; isEdit: boolean };
export type TCookieManageUiModel = {
  title: string;
  isOpen: boolean;
  list: TCookieModel[];
};
export interface ICookieManageUiModelWritable extends Writable<TCookieManageUiModel> {
  open: () => void;
  close: () => void;
  create: (data: TCookieModel) => Promise<void>;
  edit: (data: TCookieModel) => Promise<void>;
  delete: (id: string) => Promise<boolean>;
  getList: (query: { host?: string }) => Promise<TCookieModel[]>;
  updateEditState: (index: number, state: boolean) => void;
}

/**
 * 获取添加命令别名store
 * @param ctx
 */
export const getCookieManage = (ctx: CmdWindowContext) => {
  const cookieManage: ICookieManageUiModelWritable = Object.create(
    writable({ title: 'cookie管理', isOpen: false, list: [] })
  );
  cookieManage.open = () => {
    cookieManage.update((cookie) => {
      cookie.isOpen = true;
      return cookie;
    });
  };
  cookieManage.close = () => {
    cookieManage.update((cookie) => {
      cookie.isOpen = false;
      return cookie;
    });
  };
  cookieManage.getList = async (query) => {
    const { payload } = await ctx.workerMessage.send<TCookieModel[]>('setting', 'cookie.list', query);
    let list: TCookieModel[] = [];
    if (payload) {
      list = payload.map((item) => {
        const data: TCookieModel = { ...item, isEdit: false };
        return data;
      });
      cookieManage.update((cookie) => {
        cookie.list = list;
        return cookie;
      });
    }
    return list;
  };
  cookieManage.create = async (data) => {
    const { isEdit, ...newData } = data;
    await ctx.workerMessage.send('setting', 'cookie.create', newData);
  };
  cookieManage.edit = async (data) => {
    const { isEdit, ...newData } = data;
    await ctx.workerMessage.send('setting', 'cookie.update', newData);
  };
  cookieManage.delete = async (id) => {
    const { payload } = await ctx.workerMessage.send<boolean>('setting', 'cookie.delete', id);
    return payload ?? false;
  };
  cookieManage.updateEditState = (index, state = false) => {
    cookieManage.update((cookie: TCookieManageUiModel) => {
      cookie.list[index].isEdit = state;
      return cookie;
    });
  };
  return cookieManage;
};
