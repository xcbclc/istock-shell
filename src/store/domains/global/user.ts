import { writable, type Writable, get } from 'svelte/store';
import type { TModelData } from '@istock/iswork';
import type { CmdWindowContext } from '@/window/cmd-window-context';
import type { UserModel } from '@domains/global/user/user.model';

export interface IStoreUser extends TModelData<UserModel> {}

export interface IUserWritable extends Writable<IStoreUser> {
  initUserInfo(): Promise<void>;
  getUserInfo(): IStoreUser | Partial<IStoreUser>;
}

export const LOCAL_STORE_USER_TOKEN = 'istock_local_store_user_token';

export const getUser = (ctx: CmdWindowContext) => {
  const defaultUserInfo = { username: 'guest', nickname: '访客' };
  const user: IUserWritable = Object.create(writable({}));
  user.initUserInfo = async () => {
    const localUser = localStorage.getItem(LOCAL_STORE_USER_TOKEN);
    let username: string | undefined;
    if (localUser) {
      username = JSON.parse(localUser)?.username;
    }
    let userInfo: Partial<IStoreUser> = defaultUserInfo;
    if (username) {
      const { payload: userList } = await ctx.workerMessage.send<TModelData<UserModel>[]>('global', 'user.find', {
        filter: ['username', 'eq', username],
      });
      if (userList && userList.length) {
        userInfo = userList[0];
      }
    }
    user.update((userData: IStoreUser) => {
      userData = Object.assign(userData, userInfo);
      return userData;
    });
  };
  user.getUserInfo = () => {
    const userInfo = get(user);
    return userInfo.id ? userInfo : defaultUserInfo;
  };
  return user;
};
