import {
  Controller,
  Method,
  Payload,
  CmdRoute,
  Message,
  MessageHandler,
  Cmdp,
  type IMessageHandler,
  type ControllerMethodComponentOutput,
  ApplicationContext,
} from '@istock-shell/iswork';
import {
  // isPlainObject,
  isArray,
} from '@istock-shell/util';
// import type { FormItemConfig, FormProps } from '@istock-shell/ui';
import { UserService } from './user.service';
import cmd from './user.cmd';

@Controller({
  alias: 'user',
  viewName: '用户管理',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @CmdRoute(cmd.用户登录)
  @Method('login')
  @Message()
  async login(ctx: ApplicationContext, @MessageHandler() handler: IMessageHandler) {
    const cmdInfo = ctx.cmdp.getInfo();
    const args = isArray(cmdInfo.payload?.arguments) ? cmdInfo.payload.arguments : ['wx'];
    // 如果选择微信扫码登录
    if (args[0] === 'wx') {
      return await this.handleWxLogin(ctx, handler);
    }
    /*if (args[0] === 'yh') {
      return await this.handleUserNameLogin(ctx, handler);
    }*/
    return handler.complete(
      handler.cmdReplace({
        output: {
          component: 'ShText',
          props: {
            texts: [
              { color: 'error', text: `请选择正确的登录类型（${cmd.用户登录.arguments?.[0]?.choices?.join('、')}）` },
            ],
          },
        },
      })
    );
  }

  @Method('wxQrStatus')
  async wxQrStatus(@Payload() qId: string, @MessageHandler() _handler: IMessageHandler) {
    return await this.userService.checkWxQrStatus(qId);
  }

  @Method('getSelfInfo')
  async getSelfInfo(@Payload() token: string) {
    return await this.userService.getSelfInfo(token);
  }

  private async handleWxLogin(ctx: ApplicationContext, handler: IMessageHandler) {
    const cmdInfo = ctx.cmdp.getInfo();
    try {
      const qrData = await this.userService.generateWxQrCode();
      const outputs: ControllerMethodComponentOutput[] = [
        {
          component: 'CmdOutputImage',
          props: {
            images: [
              {
                src: qrData.qrCode,
                title: '微信登录二维码',
                description: `请使用微信扫描二维码登录，二维码将在5分钟后过期`,
                alt: '微信登录二维码',
              },
            ],
            mode: 'single',
            showTitle: true,
            showDescription: true,
            clickable: true,
          },
          messageId: `${cmdInfo.returnMeta?.messageId}`,
        },
        {
          component: 'CmdOutputEvent',
          props: {
            data: qrData,
            eventAddress: Cmdp.getAddressByInfo({
              ...cmdInfo,
              user: 'anonymous',
              controller: 'user',
              method: 'checkLogin',
            }).replace('cmdp:', 'event:'),
          },
          messageId: `${cmdInfo.returnMeta?.messageId}`,
        },
      ];
      return handler.complete(handler.cmdReplace({ output: outputs }));
    } catch (error) {
      const errorOutput: ControllerMethodComponentOutput = {
        component: 'ShText',
        props: {
          texts: [{ color: 'error', text: `微信登录失败: ${error instanceof Error ? error.message : String(error)}` }],
        },
      };
      return handler.complete(handler.cmdReplace({ output: errorOutput }));
    }
  }

  /*private async handleUserNameLogin(ctx: ApplicationContext, handler: IMessageHandler) {
    const cmdInfo = ctx.cmdp.getInfo();
    const {
      options = {},
      账号 = undefined,
      密码 = undefined,
    } = isPlainObject(cmdInfo.payload) ? cmdInfo.payload : { arguments: [], options: {} };
    const username = 账号 ?? options?.账号;
    const password = 密码 ?? options?.密码;

    const usernameFormField = this.getFormFieldData(cmd.用户登录.options.账号.name);
    const passwordFormField = this.getFormFieldData(cmd.用户登录.options.密码.name);
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


  private getFormFieldData(field: string): FormItemConfig {
    if (field === cmd.用户登录.options.账号.name) {
      return {
        name: field,
        label: field,
        field: {
          type: 'input',
          placeholder: '请输入账号，如：daoyou',
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
          placeholder: '请输入密码，如：Dy123123',
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
  */
}
