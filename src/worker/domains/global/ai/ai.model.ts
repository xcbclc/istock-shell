import { BaseModel, Model } from '@istock-shell/iswork';

export interface AiMessageContext {
  data: Array<{
    id: string | number;
    [key: string]: any;
  }>;
  type: string;
}

@Model('ai')
export class AiModel extends BaseModel {
  // 消息内容
  content!: string;
  user?: string;
  conversation_id?: string;
  context?: AiMessageContext;
}
