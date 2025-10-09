import type { ModelData } from '@istock-shell/iswork';
import type { CmdWindow } from '@/window';
import type { UserModel } from '@domains/global/user/user.model';
import { StoreWindow, createStoreEffects, type StoreConfig } from '@/store';

export interface UserStoreModel extends ModelData<UserModel> {}

export interface UserStoreData extends Partial<ModelData<UserModel>> {
  userId: string;
  username: string;
  nickname: string;
  avatar?: string;
}

export interface UserStoreQrCodeGenerate {
  qrId: string;
  qrCode: string;
  expireTime: number;
}

export interface UserStoreQrLoginStatus {
  // 扫码状态: pending-等待扫码, scanned-已扫码待确认, confirmed-已确认, expired-已过期, cancelled-已取消
  status: 'pending' | 'scanned' | 'confirmed' | 'expired' | 'cancelled';
  token: string;
  message: string;
}

export const LOCAL_STORE_USER_TOKEN = 'istock_local_store_user_token';

export class User extends StoreWindow<UserStoreModel> {
  readonly userTokenKey: string = LOCAL_STORE_USER_TOKEN;
  private userToken: string = localStorage.getItem(LOCAL_STORE_USER_TOKEN) || '';
  public data: UserStoreData = $state({ userId: '', username: '', nickname: '' });
  public readonly isGuest = $derived(() => !this.data.userId && this.data.username === 'guest');
  public loginStatus: {
    status?: string;
    message?: string;
  } = $state({});
  private checkLoginTimeout: number | null = null;
  constructor(cmdWindow: CmdWindow, config: StoreConfig<UserStoreModel> = {}) {
    super(cmdWindow, config);
  }
  protected async init() {
    this.storeEffect = createStoreEffects({});
    const initData = { userId: '', username: 'guest', nickname: '访客' };
    try {
      if (this.userToken) {
        const model = await this.getSelfInfo();
        if (model) {
          this.model = model;
          this.data = {
            userId: model.userId,
            username: model.username,
            nickname: model.nickname,
            avatar: model.avatar,
          };
        }
      } else {
        this.data = initData;
      }
    } catch (_error) {
      this.data = initData;
    }
  }
  protected async getSelfInfo(): Promise<UserStoreModel | undefined> {
    const { payload } = await this.cmdWindow.message.send<UserStoreModel>('global', 'user.getSelfInfo', this.userToken);
    return payload;
  }

  async checkLogin(data: UserStoreQrCodeGenerate) {
    const result = await this.checkWxLoginStatus(data.qrId);
    if (!result) return;
    if (result.status === 'pending' || result.status === 'scanned') {
      this.checkLoginTimeout = window.setTimeout(() => this.checkLogin(data), 1000);
    }
    if (result.status === 'confirmed') {
      this.loginStatus = {
        message: result.message,
        status: 'success',
      };
      this.userToken = result.token;
      const model = await this.getSelfInfo();
      if (model) {
        this.model = model;
        this.data = {
          userId: model.userId,
          username: model.username,
          nickname: model.nickname,
          avatar: model.avatar,
        };
      }
    }
    if (result.status === 'expired' || result.status === 'cancelled') {
      this.loginStatus = {
        message: result.message,
        status: 'info',
      };
    }
  }

  async checkWxLoginStatus(qrId: string) {
    try {
      const { payload } = await this.cmdWindow.message.send<UserStoreQrLoginStatus>('global', 'user.wxQrStatus', qrId);
      return payload;
    } catch (error) {
      console.error('检查微信登录状态失败:', error);
      throw error;
    }
  }
  destroy() {
    this.checkLoginTimeout && clearTimeout(this.checkLoginTimeout);
    super.destroy();
  }
}
