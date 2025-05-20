import { writable, type Writable } from 'svelte/store';
import type { CmdWindowContext } from '@/window/cmd-window-context';
import type { ThemeModel } from '@/worker/domains/global/setting/theme/theme.model';

export type TThemeConfigData = {
  id?: string;
  name: string;
  variables: Record<string, string>;
};
export type TThemeConfigUiModel = {
  data?: TThemeConfigData;
  lock: boolean; // 请求锁
};

export interface IThemeConfigUiModelWritable extends Writable<TThemeConfigUiModel> {
  createOrUpdate: (data: TThemeConfigData) => Promise<void>;
  delete: (id: string) => Promise<boolean>;
  getList: () => Promise<TThemeConfigData[]>;
}

export const getThemeConfig = (ctx: CmdWindowContext) => {
  const themeConfig: IThemeConfigUiModelWritable = Object.create(writable({ lock: false }));
  themeConfig.createOrUpdate = async (data) => {
    const { payload } = await ctx.workerMessage.send<ThemeModel>('setting', 'theme.createOrUpdate', data);
    themeConfig.update((config) => {
      config.data = payload;
      return config;
    });
  };
  themeConfig.delete = async (id) => {
    const { payload } = await ctx.workerMessage.send<boolean>('setting', 'theme.delete', id);
    if (payload) {
      themeConfig.update((config) => {
        config.data = undefined;
        return config;
      });
    }
    return payload ?? false;
  };
  themeConfig.getList = async () => {
    const { payload } = await ctx.workerMessage.send<ThemeModel[]>('setting', 'theme.list', {});
    let list: TThemeConfigData[] = [];
    if (payload) {
      list = payload.map((item) => {
        return {
          id: item.id,
          name: item.name,
          variables: item.variables,
        };
      });
    }
    themeConfig.update((config) => {
      config.data = list[0];
      return config;
    });
    return list;
  };
  return themeConfig;
};
