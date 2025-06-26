import type { ModelData, ModelPartialData } from '@istock-shell/iswork';
import { StoreWindow, createStoreEffects, type StoreConfig } from '@/store';
import type { CmdWindow } from '@/window';
import type { CmdAliasModel } from '@domains/global/cmd-alias/cmd-alias.model';

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
  public list: CmdAliasStoreModel[] = $state([]);
  public editRecord: Record<string, boolean> = $state({});
  protected newTempId: string = $state('');
  public readonly hasAdd: boolean = $derived.by(() => Boolean(this.newTempId));
  public readonly formItems: CmdAliasStoreFormItem[] = [
    { name: 'cmd', label: '命令', field: { disabled: true } },
    { name: 'alias', label: '命令别名' },
    { name: 'description', label: '别名描述', field: { type: 'textarea' } },
  ];
  constructor(cmdWindow: CmdWindow, config: StoreConfig<CmdAliasStoreModel> = {}) {
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
    this.newTempId = '';
  }
  async addCmdAlias() {
    if (!this.form.cmd || !this.form.alias) return false;
    const payload = await this.create($state.snapshot(this.form));
    if (payload) {
      this.resetCmdAlias();
      return true;
    }
    return false;
  }

  async getList() {
    const { payload: list } = await this.cmdWindow.message.send<CmdAliasStoreModel[]>('global', 'cmdAlias.list', {});
    if (list) this.list = list;
  }
  async create(data: CmdAliasStoreCreateData) {
    if (!data.cmd || !data.alias) {
      return;
    }
    const { payload } = await this.cmdWindow.message.send<string | number | null>('global', 'cmdAlias.create', data);
    this.newTempId = '';
    return payload;
  }
  async update(model: CmdAliasStoreModel) {
    if (!model.id || !model.cmd || !model.alias) {
      return;
    }
    const { payload } = await this.cmdWindow.message.send('global', 'cmdAlias.update', model);
    return payload;
  }
  async delete(id: string) {
    if (id === this.newTempId) {
      this.list = this.list.filter((item) => item.id === id);
      return;
    }
    const { payload } = await this.cmdWindow.message.send<boolean>('global', 'cmdAlias.delete', id);
    return payload ?? false;
  }
}
