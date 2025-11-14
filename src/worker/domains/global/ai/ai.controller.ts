import {
  CmdRoute,
  Controller,
  Method,
  CmdRouteArguments,
  Message,
  MessageHandler,
  type IMessageHandler,
  type ControllerMethodComponentOutput,
  ApplicationContext,
  Field,
} from '@istock-shell/iswork';
import { AiService } from './ai.service';
import type { AiModel } from './ai.model';
import cmdJson from './ai.cmd';
import { isString, ScopeError } from '@istock-shell/util';

interface AiMessageContext {
  data: AiModel['context'];
  type: string;
};

function splitJsonObjects(input: string): string[] {
  if (!input) return [];
  const results: string[] = [];
  let depth = 0;
  let inString = false;
  let escape = false;
  let start = -1;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (inString) {
      if (escape) {
        escape = false;
      } else if (ch === '\\') {
        escape = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === '{') {
      if (depth === 0) start = i;
      depth++;
      continue;
    }
    if (ch === '}') {
      depth--;
      if (depth === 0 && start !== -1) {
        results.push(input.slice(start, i + 1));
        start = -1;
      }
      continue;
    }
  }
  return results;
}

function extractContentFromConcatenatedJson(input: string): string {
  const chunks = splitJsonObjects(input);
  if (chunks.length === 0) {
    try {
      const data = JSON.parse(input);
      return data?.content ?? '';
    } catch {
      return input ?? '';
    }
  }
  let merged = '';
  for (const chunk of chunks) {
    try {
      const data = JSON.parse(chunk);
      merged += data?.content ?? '';
    } catch {
      merged += chunk;
    }
  }
  return merged;
}

@Controller({
  alias: 'ai',
  viewName: 'AI',
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
    @MessageHandler() handler: IMessageHandler,
    @Field('context') context?: AiMessageContext,
  ) {
    const cmdInfo = ctx.cmdp.getInfo();
    if (messageId) {
      const msgData = this.aiService.getMessageContent(messageId);
      if (!msgData) throw new ScopeError(`iswork.${this.constructor.name}`, '未找到消息内容');
      const messageAsyncGenerator = await this.aiService.send(msgData);
      const output: ControllerMethodComponentOutput<{ content: string; options: Record<string, any> }> = {
        component: 'ShMarkdown',
        props: {
          content: '',
          options: {},
        },
      };
      const observer = handler.createObservable((observer) => {
        void (async () => {
          for await (const msg of messageAsyncGenerator) {
            let content = '';
            try {
              content = extractContentFromConcatenatedJson(msg.data ?? '');
            } catch (error) {
              console.log('error', error);
              content = msg.data ?? '';
            }
            output.props.content += content;
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
      this.aiService.setMessageContent(cmdInfo.meta.messageId, { content, context: context?.data ?? [] });
    }
    // 初步连接
    return {
      output: [
        {
          component: 'CmdOutputEvent',
          props: {
            data: { messageId: cmdInfo.meta?.messageId },
            eventAddress: cmdInfo.address.replace('cmdp:', 'event:'),
          },
        },
      ],
    };
  }
}
