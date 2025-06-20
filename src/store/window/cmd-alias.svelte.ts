import type { ModelData, ModelPartialData } from '@istock-shell/iswork';
import { StoreWindow, createStoreEffects, type StoreConfig } from '@/store/base';
import type { CmdWindow } from '@/window/cmd-window.svelte';
import type { CmdAliasModel } from '@domains/global/cmd-alias/cmd-alias.model';
import type { SearchStoreModel } from '@/store/window/search.svelte';

export interface CmdAliasStoreModal {
  title: string;
  show: boolean;
}

export interface CmdAliasStoreFormItem {
  name: string;
  label?: string;
  field?: {
    type?: 'input' | 'textarea';
    disabled?: boolean;
  };
}

export interface CmdAliasStoreCreateData extends ModelPartialData<CmdAliasModel> {
  cmd: string;
  alias: string;
  description: string;
}

export interface CmdAliasStoreModel extends ModelData<CmdAliasModel> {}

export class CmdAlias extends StoreWindow<CmdAliasStoreModel> {
  public modal: CmdAliasStoreModal = $state({
    title: '添加命令别名',
    show: false,
  });
  public form: CmdAliasStoreCreateData = $state({
    cmd: '',
    alias: '',
    description: '',
  });
  public readonly formItems: CmdAliasStoreFormItem[] = [
    { name: 'cmd', label: '命令', field: { disabled: true } },
    { name: 'alias', label: '命令别名' },
    { name: 'description', label: '别名描述', field: { type: 'textarea' } },
  ];
  constructor(cmdWindow: CmdWindow, config: StoreConfig<SearchStoreModel> = {}) {
    super(cmdWindow, config);
  }
  protected async init() {
    this.storeEffect = createStoreEffects({});
  }
  openCmdAlias(cmd: string) {
    this.form.cmd = cmd;
    this.modal.show = true;
  }
  resetCmdAlias() {
    this.modal.show = false;
    this.form = {
      cmd: '',
      alias: '',
      description: '',
    };
  }
  async addCmdAlias() {
    if (!this.form.cmd || !this.form.alias) return false;
    const { payload } = await this.cmdWindow.message.send<string | number | null>(
      'global',
      'cmdAlias.add',
      $state.snapshot(this.form)
    );
    if (payload) {
      this.resetCmdAlias();
      return true;
    }
    return false;
  }
}
