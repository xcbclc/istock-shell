import { Controller, Method, Payload, CmdRoute, CmdRouteOptions, type TModelCreate } from '@istock/iswork';
import { UserService } from './user.service';

import type { UserModel } from './user.model';
import cmd from './user.cmd.json';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @CmdRoute(cmd.用户登录)
  @Method('login')
  async login(
    @CmdRouteOptions(cmd.用户登录.options.账号) username: string,
    @CmdRouteOptions(cmd.用户登录.options.密码) password: string
  ) {
    console.log(username, password);
    return await this.userService.login(username, password);
  }

  @Method('create')
  async create(@Payload() payload: TModelCreate<UserModel>) {
    return await this.userService.create(payload);
  }
}
