import {
  CmdRoute,
  Controller,
  Method,
  CmdRouteArguments,
  Message,
  MessageHandler,
  type IMessageHandler,
  type TControllerMethodComponentOutput,
  ApplicationContext,
  Field,
} from '@istock/iswork';
import { AiService } from './ai.service';
import cmdJson from './ai.cmd';
import { isString, ScopeError } from '@istock/util';

@Controller({
  alias: 'ai',
})
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @CmdRoute(cmdJson.ai)
  @Method('send')
  @Message()
  async send(
    ctx: ApplicationContext,
    @Field('messageId') messageId: string | undefined,
    @CmdRouteArguments(0) content: string,
    @MessageHandler() handler: IMessageHandler
  ) {
    const cmdInfo = ctx.cmdp.getInfo();
    if (messageId) {
      const content = this.aiService.getMessageContent(messageId);
      if (!content) throw new ScopeError(`iswork.${this.constructor.name}`, '未找到消息内容');
      const messageAsyncGenerator = await this.aiService.send({ content });
      const output: TControllerMethodComponentOutput<{ content: string; options: Record<string, any> }> = {
        component: 'ShMarkdown',
        props: {
          content: '',
          options: {},
        },
      };
      const observer = handler.createObservable((observer) => {
        void (async () => {
          for await (const msg of messageAsyncGenerator) {
            output.props.content += msg.data ?? '';
            observer.next(handler.cmdReplace({ output: [output] }));
          }
          observer.complete();
        })();
        return { unsubscribe: () => {} };
      });
      // 返回消息observer对象
      return observer;
    }
    if (cmdInfo.meta?.messageId && isString(cmdInfo.meta.messageId)) {
      this.aiService.setMessageContent(cmdInfo.meta.messageId, content);
    }
    // 初步连接
    return {
      output: [
        {
          component: 'OutputEvent',
          props: {
            data: { messageId: cmdInfo.meta?.messageId },
            eventAddress: cmdInfo.address.replace('cmdp:', 'event:'),
          },
        },
      ],
    };
  }
}
