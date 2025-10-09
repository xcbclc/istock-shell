import { Injectable, type ModelData } from '@istock-shell/iswork';
import { ScopeError } from '@istock-shell/util';
import { UserModel } from './user.model';

interface WxQrCodeResponse {
  qrId: string;
  qrCode: string;
  expireTime: number;
}

interface WxStatusResponse {
  status: 'pending' | 'scanned' | 'confirmed' | 'expired' | 'cancelled';
  userInfo?: {
    userId: string;
    account: string;
    nickname?: string;
    avatar?: string;
  };
  token?: string;
  message: string;
}

@Injectable()
export class UserService {
  constructor() {}
  // async login(username: string, password: string) {
  //   const query = UserModel.createQueryBuilder().setFilter(['username', 'eq', username]);
  //   const [user] = (await UserModel.query(query.getQueryData())) ?? [];
  //   return user?.password === password ? user : null;
  // }

  async getSelfInfo(token: string) {
    return await UserModel.run<ModelData<UserModel>>('/wx/user/self/info', {
      method: 'get',
      headers: { authorization: `Bearer ${token}` },
    });
  }

  async generateWxQrCode(): Promise<WxQrCodeResponse> {
    try {
      const response = await UserModel.run<WxQrCodeResponse>(`/wx/user/qr/generate`, {
        method: 'post',
        body: JSON.stringify({ width: 280 }),
      });
      return response;
    } catch (error) {
      throw new ScopeError(
        `domain.${this.constructor.name}`,
        `生成微信二维码失败: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async checkWxQrStatus(qrId: string): Promise<WxStatusResponse> {
    try {
      const response = await UserModel.run<WxStatusResponse>(`/wx/user/qr/status/${qrId}`, {
        method: 'get',
      });
      return response;
    } catch (error) {
      throw new ScopeError(
        `domain.${this.constructor.name}`,
        `检查微信扫码状态失败: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
