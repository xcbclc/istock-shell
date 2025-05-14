import { writable, get, type Writable } from 'svelte/store';
import { clone } from '@istock/util';
import type { CmdWindowContext } from '@/window/cmd-window-context';

export type TAddCmdAliasField = 'historyId' | 'cmd' | 'alias' | 'description';
export type TAddCmdAliasData = {
  modal: {
    title: string;
    visible: boolean;
  };
  form: {
    [k in TAddCmdAliasField]: string;
  };
  formItems?: Array<{ name: string; label?: string; field?: { type?: 'input' | 'textarea'; disabled?: boolean } }>;
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
      cmd: '',
      alias: '',
      description: '',
    },
    formItems: [
      { name: 'cmd', label: '命令', field: { disabled: true } },
      { name: 'alias', label: '命令别名' },
      { name: 'description', label: '别名描述', field: { type: 'textarea' } },
    ],
  };
  const addCmdAlias: IAddCmdAliasWritable = Object.create(writable(clone(initData)));
  addCmdAlias.init = () => {
    addCmdAlias.set(clone(initData));
  };
  addCmdAlias.openModal = (historyId, cmd) => {
    addCmdAlias.update((data) => {
      data.modal.visible = true;
      data.form.cmd = cmd;
      data.form.historyId = historyId;
      return data;
    });
  };
  addCmdAlias.add = async () => {
    const addCmdAliasData = get(addCmdAlias);
    const { payload } = await ctx.workerMessage.send<string | number | null>(
      'global',
      'cmdAlias.add',
      addCmdAliasData.form
    );
    if (payload) {
      addCmdAlias.init();
      return true;
    }
    return false;
  };
  return addCmdAlias;
};
