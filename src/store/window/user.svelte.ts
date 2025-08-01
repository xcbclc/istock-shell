import type { ModelData } from '@istock-shell/iswork';
import type { CmdWindow } from '@/window';
import type { UserModel } from '@domains/global/user/user.model';
import { StoreWindow, createStoreEffects, type StoreConfig } from '@/store';

export interface UserStoreModel extends ModelData<UserModel> {}

export interface UserStoreData extends Partial<ModelData<UserModel>> {
  username: string;
  nickname: string;
  avatar?: string;
  wxUserId?: string;
  accessToken?: string;
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

    // 监听微信登录成功消息
    window.addEventListener('message', (event) => {
      if (event.data.type === 'wx_login_success') {
        this.onWxLogin(event.data.user);
      }
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
  onLogin(data: UserStoreData | null) {
    if (!data) return;
    this.data = data;
    this.setLocalUser(data);
  }

  async onWxLogin(wxUserData: {
    userId: string;
    account: string;
    nickname?: string;
    avatar?: string;
    tokens?: {
      accessToken: string;
      refreshToken: string;
    };
  }) {
    // 根据微信用户信息创建或更新本地用户数据
    const userData: UserStoreData = {
      username: wxUserData.account,
      nickname: wxUserData.nickname || wxUserData.account,
      avatar: wxUserData.avatar,
      wxUserId: wxUserData.userId,
      accessToken: wxUserData.tokens?.accessToken,
    };

    // 检查是否已存在该用户
    const existingUser = await this.getDbModelByName(wxUserData.account);
    if (existingUser) {
      // 更新现有用户信息
      this.model = existingUser;
      this.data = Object.assign(userData, existingUser);
    } else {
      // 创建新用户
      try {
        const newUser = await this.cmdWindow.message.send('global', 'user.create', {
          username: wxUserData.account,
          nickname: wxUserData.nickname || wxUserData.account,
          phone: '', // 微信登录暂时不需要手机号
          password: '', // 微信登录不需要密码
          updateDate: new Date(),
          createDate: new Date(),
          rowStatus: 1,
        });
        if (newUser.payload) {
          this.model = newUser.payload;
          this.data = Object.assign(userData, newUser.payload);
        }
      } catch (error) {
        console.error('创建微信用户失败:', error);
        // 即使创建失败，也允许临时登录
        this.data = userData;
      }
    }

    this.setLocalUser(this.data);
    return this.data;
  }

  async checkWxLoginStatus(scene: string) {
    try {
      const { payload } = await this.cmdWindow.message.send('global', 'user.wxQrStatus', { scene });
      return payload;
    } catch (error) {
      console.error('检查微信登录状态失败:', error);
      throw error;
    }
  }
}
