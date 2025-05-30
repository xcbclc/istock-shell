import { Injectable, type ModelCreate, type ModelUpdate, type OrmQuery } from '@istock-shell/iswork';
import { ScopeError } from '@istock-shell/util';
import { UserModel } from './user.model';

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
}
