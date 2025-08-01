import { Injectable, type ModelCreate, type ModelUpdate, type OrmQuery } from '@istock-shell/iswork';
import { ScopeError } from '@istock-shell/util';
import { UserModel } from './user.model';

interface WxQrCodeResponse {
  qrCode: string;
  expiresIn: number;
}

interface WxStatusResponse {
  status: 'waiting' | 'need_bind' | 'success' | 'expired';
  user?: {
    userId: string;
    account: string;
    nickname?: string;
    avatar?: string;
  };
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
}

@Injectable()
export class UserService {
  constructor() {
    this.initUser().catch((e) => {
      if (e instanceof Error) throw e;
      throw new ScopeError(`domain.${this.constructor.name}`, e?.message ?? '初始化用户错误');
    });
  }

  async initUser() {
    const users = await this.find();
    if (users.length > 0) return;
    await this.create({
      id: UserModel.generateId.nextId(),
      username: 'daoyou',
      password: 'Dy123123',
      phone: '18888888888',
      nickname: '星辰编程理财',
      updateDate: new Date(),
      createDate: new Date(),
      rowStatus: 1,
    });
  }

  async login(username: string, password: string) {
    const query = UserModel.createQueryBuilder().setFilter(['username', 'eq', username]);
    const [user] = (await UserModel.query(query.getQueryData())) ?? [];
    return user?.password === password ? user : null;
  }

  async create(data: ModelCreate<UserModel>) {
    return await UserModel.createOne(data);
  }

  async update(data: ModelUpdate<UserModel>) {
    return await UserModel.updateById(data.id, data);
  }

  async find(query: OrmQuery = {}) {
    return await UserModel.query(query);
  }

  async generateWxQrCode(scene: string): Promise<WxQrCodeResponse> {
    const API_BASE = 'http://localhost:5170/api/v1';
    try {
      const response = await fetch(`${API_BASE}/wx/user/qr/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scene }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new ScopeError(
        `domain.${this.constructor.name}`,
        `生成微信二维码失败: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async checkWxQrStatus(scene: string): Promise<WxStatusResponse> {
    const API_BASE = 'http://localhost:5170/api/v1';
    try {
      const response = await fetch(`${API_BASE}/wx/user/qr/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scene }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new ScopeError(
        `domain.${this.constructor.name}`,
        `检查微信扫码状态失败: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  generateRandomScene(): string {
    return 'login_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
