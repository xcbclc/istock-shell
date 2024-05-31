import {
  Controller,
  Method,
  Payload,
  CmdRoute,
  Message,
  MessageHandler,
  Component,
  type TModelCreate,
  type IMessageHandler,
  type TControllerMethodComponentOutput,
} from '@istock/iswork';
import type { IDynamicFormField, IDynamicFormData } from '@istock/shell-ui';
import { UserService } from './user.service';
import type { UserModel } from './user.model';
import cmd from './user.cmd.json';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  #getFormFieldData(field: string): IDynamicFormField<'input'> {
    if (field === cmd.用户登录.options.账号.name) {
      return {
        componentName: 'ShInput',
        name: field,
        label: field,
        attributes: {
          type: 'text',
        },
        rules: [],
      };
    }
    if (field === cmd.用户登录.options.密码.name) {
      return {
        componentName: 'ShInput',
        name: field,
        label: field,
        attributes: {
          type: 'password',
        },
        rules: [],
      };
    }
    throw new Error(`未找到${field}该字段数据`);
  }

  @CmdRoute(cmd.用户登录)
  @Method('login')
  @Message()
  @Component()
  async login(
    @Payload() payload: { 账号?: string; 密码?: string; options: { 账号?: string; 密码?: string } },
    @MessageHandler() handler: IMessageHandler
  ) {
    const username = payload.账号 ?? payload.options?.账号;
    const password = payload.密码 ?? payload.options?.密码;
    const usernameFormField = this.#getFormFieldData(cmd.用户登录.options.账号.name);
    const passwordFormField = this.#getFormFieldData(cmd.用户登录.options.密码.name);
    const output: TControllerMethodComponentOutput<{ formData: IDynamicFormData }> = {
      component: 'ShDynamicForm',
      props: {
        formData: {
          fields: [],
          values: {
            [cmd.用户登录.options.账号.name]: username ?? '',
            [cmd.用户登录.options.密码.name]: password ?? '',
          },
        },
      },
    };
    if (!username || !password) {
      if (username && !password) {
        output.props.formData.fields = [passwordFormField];
        return handler.cmdReplace(output);
      }
      if (!username && password) {
        output.props.formData.fields = [usernameFormField];
        return handler.cmdReplace(output);
      }
      output.props.formData.fields = [usernameFormField, passwordFormField];
      return handler.cmdReplace(output);
    }
    const result = await this.userService.login(username, password);
    const loginOutput: TControllerMethodComponentOutput = {
      component: 'ShText',
      props: {
        texts: [{ type: result ? 'success' : 'danger', text: result ? '登录成功！' : '登录失败！' }],
      },
    };
    return handler.complete(handler.cmdReplace(loginOutput));
  }

  @Method('create')
  async create(@Payload() payload: TModelCreate<UserModel>) {
    return await this.userService.create(payload);
  }
}
