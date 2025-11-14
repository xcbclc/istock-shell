import { Injectable, type ModelData, type FetchSSEMessage } from '@istock-shell/iswork';
import { AiModel } from './ai.model';

@Injectable()
export class AiService {
  readonly #contentMap = new Map<string, ModelData<AiModel>>();
  setMessageContent(messageId: string, value: ModelData<AiModel>) {
    this.#contentMap.set(messageId, value);
  }

  getMessageContent(messageId: string) {
    return this.#contentMap.get(messageId);
  }

  deleteMessageContent(messageId: string) {
    this.#contentMap.delete(messageId);
  }

  // 命令服务方法
  async send(data: ModelData<AiModel>) {
    const messageAsyncGenerator = await AiModel.run<AsyncGenerator<FetchSSEMessage, void, unknown>>('/ai/chat/stream', {
      method: 'post',
      body: JSON.stringify(data),
    });
    return messageAsyncGenerator;
  }
}
