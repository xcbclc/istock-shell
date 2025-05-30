import {
  Controller,
  Method,
  Payload,
  CmdRoute,
  Message,
  MessageHandler,
  Cmdp,
  type ModelCreate,
  type IMessageHandler,
  type ControllerMethodComponentOutput,
  ApplicationContext,
  type OrmQuery,
} from '@istock-shell/iswork';
import type { FormItemConfig, FormProps } from '@istock-shell/ui';
import { UserService } from './user.service';
import type { UserModel } from './user.model';
import cmd from './user.cmd.json';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  #getFormFieldData(field: string): FormItemConfig {
    if (field === cmd.用户登录.options.账号.name) {
      return {
        name: field,
        label: field,
        field: {
          type: 'input',
          placeholder: '请输入账号',
          description: '仅支持账号和手机号登录',
          required: true,
        },
      };
    }
    if (field === cmd.用户登录.options.密码.name) {
      return {
        name: field,
        label: field,
        field: {
          type: 'input',
          inputType: 'password',
          placeholder: '请输入密码',
          description: '密码必须包含大小写字母和数字，至少8位',
          validator: {
            required: true,
            custom: (value: string) => {
              if (value && value.length < 8) return '密码至少8位';
              if (!/(?=.*[a-z])/.test(value)) return '密码必须包含小写字母';
              if (!/(?=.*[A-Z])/.test(value)) return '密码必须包含大写字母';
              if (!/(?=.*\d)/.test(value)) return '密码必须包含数字';
              return true;
            },
          },
        },
      };
    }
    throw new Error(`未找到${field}该字段数据`);
  }

  @CmdRoute(cmd.用户登录)
  @Method('login')
  @Message()
  async login(
    ctx: ApplicationContext,
    @Payload() payload: { 账号?: string; 密码?: string; options: { 账号?: string; 密码?: string } },
    @MessageHandler() handler: IMessageHandler
  ) {
    const cmdInfo = ctx.cmdp.getInfo();
    const username = payload.账号 ?? payload.options?.账号;
    const password = payload.密码 ?? payload.options?.密码;
    const usernameFormField = this.#getFormFieldData(cmd.用户登录.options.账号.name);
    const passwordFormField = this.#getFormFieldData(cmd.用户登录.options.密码.name);
    const output: ControllerMethodComponentOutput<FormProps> = {
      component: 'ShForm',
      props: {
        class: 'inline-grid px-4 py-2',
        layout: 'vertical',
        labelPlacement: 'start',
        buttonPlacement: 'center',
        size: 'sm',
        formItems: [],
        values: {
          [cmd.用户登录.options.账号.name]: username ?? '',
          [cmd.用户登录.options.密码.name]: password ?? '',
        },
      },
      messageId: `${cmdInfo.returnMeta?.messageId}`,
    };
    if (!username || !password) {
      if (username && !password) {
        output.props.formItems = [passwordFormField];
        return { output: handler.cmdReplace(output) };
      }
      if (!username && password) {
        output.props.formItems = [usernameFormField];
        return { output: handler.cmdReplace(output) };
      }
      output.props.formItems = [usernameFormField, passwordFormField];
      return { output: handler.cmdReplace(output) };
    }
    const result = await this.userService.login(username, password);
    const loginOutputs: ControllerMethodComponentOutput[] = [
      {
        component: 'ShText',
        props: {
          texts: [{ color: result ? 'success' : 'error', text: result ? '登录成功！' : '登录失败！' }],
        },
      },
      {
        component: 'CmdOutputEvent',
        props: {
          data: result,
          eventAddress: Cmdp.getAddressByInfo({
            ...cmdInfo,
            user: 'anonymous',
            controller: 'user',
            method: 'login',
          }).replace('cmdp:', 'event:'),
        },
      },
    ];
    return handler.complete(
      handler.cmdReplace({
        output: loginOutputs,
      })
    );
  }

  @Method('create')
  async create(@Payload() payload: ModelCreate<UserModel>) {
    return await this.userService.create(payload);
  }

  @Method('find')
  async find(@Payload() query: OrmQuery) {
    return await this.userService.find(query);
  }
}
