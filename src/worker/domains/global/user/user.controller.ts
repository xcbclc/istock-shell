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

  @CmdRoute(cmd.用户登录)
  @Method('login')
  @Message()
  async login(
    ctx: ApplicationContext,
    @Payload()
    payload: {
      账号?: string;
      密码?: string;
      微信扫码?: boolean;
      options: { 账号?: string; 密码?: string; 微信扫码?: boolean };
    },
    @MessageHandler() handler: IMessageHandler
  ) {
    const cmdInfo = ctx.cmdp.getInfo();
    const username = payload.账号 ?? payload.options?.账号;
    const password = payload.密码 ?? payload.options?.密码;
    const wxLogin = payload.微信扫码 ?? payload.options?.微信扫码;

    // 如果选择微信扫码登录
    if (wxLogin) {
      return await this.handleWxLogin(ctx, handler);
    }
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

  private async handleWxLogin(ctx: ApplicationContext, handler: IMessageHandler) {
    const cmdInfo = ctx.cmdp.getInfo();
    const scene = this.userService.generateRandomScene();

    try {
      const qrData = await this.userService.generateWxQrCode(scene);

      const output: ControllerMethodComponentOutput = {
        component: 'ShHtml',
        props: {
          html: this.generateWxLoginHtml(scene, qrData.qrCode, qrData.expiresIn),
        },
        messageId: `${cmdInfo.returnMeta?.messageId}`,
      };

      return { output: handler.cmdReplace(output) };
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

  @Method('wxQrStatus')
  async wxQrStatus(@Payload() payload: { scene: string }, @MessageHandler() handler: IMessageHandler) {
    try {
      const statusData = await this.userService.checkWxQrStatus(payload.scene);
      return { payload: statusData };
    } catch (error) {
      throw error;
    }
  }

  private generateWxLoginHtml(scene: string, qrCode: string, expiresIn: number): string {
    return `
      <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
        <h3 style="margin-bottom: 20px; color: #333;">微信扫码登录</h3>
        <div id="qrContainer" style="margin-bottom: 20px;">
          <img id="qrCode" src="data:image/png;base64,${qrCode}" style="width: 200px; height: 200px; border: 1px solid #ddd; border-radius: 8px;" />
        </div>
        <div id="status" class="status waiting" style="margin-bottom: 15px; font-size: 14px;">等待扫码...</div>
        <div id="countdown" style="margin-bottom: 15px; font-size: 12px; color: #666;">剩余时间: ${expiresIn}秒</div>
        <div style="margin-bottom: 15px;">
          <button id="checkBtn" onclick="checkStatus()" style="margin-right: 10px; padding: 8px 16px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer;">检查状态</button>
          <button id="stopBtn" onclick="stopPolling()" style="padding: 8px 16px; background: #ff4d4f; color: white; border: none; border-radius: 4px; cursor: pointer;">停止</button>
        </div>
        <div id="userInfo" style="display: none; margin-top: 20px; padding: 15px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 6px; text-align: left;">
          <h4 style="margin-top: 0; color: #52c41a;">登录成功</h4>
          <div id="userDetails"></div>
        </div>
        
        <style>
          .status { font-weight: bold; }
          .status.waiting { color: #1890ff; }
          .status.success { color: #52c41a; }
          .status.error { color: #ff4d4f; }
          .status.expired { color: #faad14; }
          button:hover { opacity: 0.8; }
          button:disabled { opacity: 0.5; cursor: not-allowed; }
        </style>
        
        <script>
          const currentScene = '${scene}';
          let pollingInterval = null;
          let countdownInterval = null;
          let expiresAt = Date.now() + (${expiresIn} * 1000);
          
          async function checkStatus() {
             if (!currentScene) return;
             try {
               // 直接调用微信API检查状态
               const response = await fetch('http://localhost:5170/api/v1/wx/user/qr/status', {
                 method: 'POST',
                 headers: {
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({ scene: currentScene })
               });
               
               if (!response.ok) {
                 throw new Error(\`HTTP error! status: \${response.status}\`);
               }
               
               const data = await response.json();
               handleStatusUpdate(data);
               
               // 如果登录成功，通知父窗口
               if (data.status === 'success' && data.user) {
                 window.parent.postMessage({
                   type: 'wx_login_success',
                   data: data
                 }, '*');
                 
                 // 关闭当前窗口
                 window.close();
               }
             } catch (error) {
               console.error('检查状态失败:', error);
               updateStatus('检查状态失败: ' + error.message, 'error');
             }
           }
          
          function handleStatusUpdate(data) {
            switch (data.status) {
              case 'waiting':
                updateStatus('等待扫码...', 'waiting');
                break;
              case 'need_bind':
                updateStatus('需要绑定手机号，请在微信小程序中完成绑定', 'waiting');
                break;
              case 'success':
                updateStatus('登录成功！', 'success');
                showUserInfo(data);
                stopPolling();
                break;
              case 'expired':
                updateStatus('二维码已过期，请重新生成', 'expired');
                stopPolling();
                break;
              default:
                updateStatus('未知状态: ' + data.status, 'error');
            }
          }
          
          function updateStatus(message, type) {
            const statusEl = document.getElementById('status');
            statusEl.textContent = message;
            statusEl.className = \`status \${type}\`;
          }
          
          function showUserInfo(data) {
            if (data.user) {
              const userInfoEl = document.getElementById('userInfo');
              const userDetailsEl = document.getElementById('userDetails');
              userDetailsEl.innerHTML = \`
                <p><strong>用户ID:</strong> \${data.user.userId}</p>
                <p><strong>账号:</strong> \${data.user.account}</p>
                <p><strong>昵称:</strong> \${data.user.nickname || '未设置'}</p>
                <p><strong>头像:</strong> \${data.user.avatar ? '<img src="' + data.user.avatar + '" style="width: 50px; height: 50px; border-radius: 25px;"/>' : '未设置'}</p>
                <p><strong>Access Token:</strong> \${data.tokens ? data.tokens.accessToken.substring(0, 50) + '...' : '无'}</p>
              \`;
              userInfoEl.style.display = 'block';
            }
          }
          
          function startPolling() {
            pollingInterval = setInterval(checkStatus, 2000);
          }
          
          function stopPolling() {
            if (pollingInterval) {
              clearInterval(pollingInterval);
              pollingInterval = null;
            }
            if (countdownInterval) {
              clearInterval(countdownInterval);
              countdownInterval = null;
            }
            document.getElementById('checkBtn').disabled = false;
            document.getElementById('stopBtn').disabled = true;
          }
          
          function startCountdown() {
            countdownInterval = setInterval(() => {
              if (!expiresAt) return;
              
              const remaining = Math.max(0, expiresAt - Date.now());
              const seconds = Math.ceil(remaining / 1000);
              
              document.getElementById('countdown').textContent = \`剩余时间: \${seconds}秒\`;
              
              if (seconds <= 0) {
                updateStatus('二维码已过期', 'expired');
                stopPolling();
              }
            }, 1000);
          }
          
          // 自动开始轮询和倒计时
          startPolling();
          startCountdown();
        </script>
      </div>
    `;
  }
}
