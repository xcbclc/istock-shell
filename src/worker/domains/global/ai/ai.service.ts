import { Injectable, type TModelData, type TFetchSSEMessage } from '@istock/iswork';
import { AiModel } from './ai.model';

@Injectable()
export class AiService {
  readonly #contentMap = new Map<string, string>();
  setMessageContent(messageId: string, value: string) {
    this.#contentMap.set(messageId, value);
  }

  getMessageContent(messageId: string) {
    return this.#contentMap.get(messageId);
  }

  deleteMessageContent(messageId: string) {
    this.#contentMap.delete(messageId);
  }

  // 命令服务方法
  async send(data: TModelData<AiModel>) {
    const messageAsyncGenerator = await AiModel.run<AsyncGenerator<TFetchSSEMessage, void, unknown>>('/ai/send', {
      method: 'post',
      body: JSON.stringify(data),
    });
    return messageAsyncGenerator;
  }
}
