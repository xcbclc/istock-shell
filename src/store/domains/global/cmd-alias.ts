import { writable, get, type Writable } from 'svelte/store';
import { clone } from '@istock/util';
import type { CmdWindowContext } from '@/window/cmd-window-context';

export type TAddCmdAliasData = {
  modal: {
    title: string;
    visible: boolean;
  };
  form: {
    [k in 'cmd' | 'alias' | 'description']: {
      label: string;
      value: string;
    };
  } & { historyId: string };
};
export interface IAddCmdAliasWritable extends Writable<TAddCmdAliasData> {
  init: () => void;
  add: () => Promise<Boolean>;
  openModal: (historyId: string, cmd: string) => void;
}

/**
 * 获取添加命令别名store
 * @param ctx
 */
export const getAddCmdAlias = (ctx: CmdWindowContext) => {
  const initData: TAddCmdAliasData = {
    modal: {
      title: '添加命令别名',
      visible: false,
    },
    form: {
      historyId: '',
      cmd: {
        label: '命令',
        value: '',
      },
      alias: {
        label: '命令别名',
        value: '',
      },
      description: {
        label: '别名描述',
        value: '',
      },
    },
  };
  const addCmdAlias: IAddCmdAliasWritable = Object.create(writable(clone(initData)));
  addCmdAlias.init = () => {
    addCmdAlias.set(clone(initData));
  };
  addCmdAlias.openModal = (historyId, cmd) => {
    addCmdAlias.update((data) => {
      data.modal.visible = true;
      data.form.cmd.value = cmd;
      data.form.historyId = historyId;
      return data;
    });
  };
  addCmdAlias.add = async () => {
    const addCmdAliasData = get(addCmdAlias);
    const { payload } = await ctx.message.send<string | number | null>('global', 'cmdAlias.add', {
      historyId: addCmdAliasData.form.historyId,
      cmd: addCmdAliasData.form.cmd.value,
      alias: addCmdAliasData.form.alias.value,
      description: addCmdAliasData.form.description.value,
    });
    if (payload) {
      addCmdAlias.init();
      return true;
    }
    return false;
  };
  return addCmdAlias;
};
