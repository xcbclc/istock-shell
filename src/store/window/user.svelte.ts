import type { ModelData } from '@istock-shell/iswork';
import type { CmdWindow } from '@/window/cmd-window.svelte';
import type { UserModel } from '@domains/global/user/user.model';
import { StoreWindow, createStoreEffects, type StoreConfig } from '@/store/base';

export interface UserStoreModel extends ModelData<UserModel> {}

export interface UserStoreData extends Partial<ModelData<UserModel>> {
  username: string;
  nickname: string;
}

export const LOCAL_STORE_USER_TOKEN = 'istock_local_store_user_token';

export class User extends StoreWindow<UserStoreModel> {
  readonly userToken: string = LOCAL_STORE_USER_TOKEN;
  public data: UserStoreData = $state({ username: '', nickname: '' });
  public readonly isGuest = $derived(() => this.data.username === 'guest');
  constructor(cmdWindow: CmdWindow, config: StoreConfig<UserStoreModel> = {}) {
    super(cmdWindow, config);
  }
  protected async init() {
    this.storeEffect = createStoreEffects({
      userDataChange: async () => {
        await this.setLocalUser($state.snapshot(this.data));
      },
    });
    let user = this.getLocalUser();
    if (user?.username) {
      this.data = user;
      const model = await this.getDbModelByName(user.username);
      if (model) {
        this.model = model;
        this.data = Object.assign(this.data, this.model);
      }
    }
    if (!user?.username && !this.model.username) {
      this.data = { username: 'guest', nickname: '访客' };
    }
  }
  protected async getDbModelByName(username: string): Promise<UserStoreModel | undefined> {
    const { payload } = await this.cmdWindow.message.send<UserStoreModel[]>('global', 'user.find', {
      filter: ['username', 'eq', username],
    });
    const [model] = payload ?? [];
    return model;
  }
  protected getLocalUser(): UserStoreData | undefined {
    const localUser = localStorage.getItem(this.userToken);
    if (!localUser) return;
    return JSON.parse(localUser);
  }
  protected setLocalUser(user: UserStoreData) {
    localStorage.setItem(this.userToken, JSON.stringify(user));
  }
}
