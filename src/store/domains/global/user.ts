import { writable, type Writable, get } from 'svelte/store';
import type { TModelData, TModelPartialData } from '@istock/iswork';
import type { CmdWindowContext } from '@/window/cmd-window-context';
import type { UserModel } from '@domains/global/user/user.model';

export interface IUserWritable extends Writable<TModelData<UserModel>> {
  getUserInfo: () => TModelData<UserModel> | TModelPartialData<UserModel>;
}

export const getUser = (_ctx: CmdWindowContext) => {
  const user: IUserWritable = Object.create(writable({}));
  user.getUserInfo = () => {
    const userInfo = get(user);
    return userInfo.id ? userInfo : { username: 'guest', nickname: '访客' };
  };
  return user;
};
