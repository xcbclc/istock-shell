import { BaseModel, Model } from '@istock-shell/iswork';

@Model('ai')
export class AiModel extends BaseModel {
  // 消息内容
  content!: string;
  user?: string;
  conversation_id?: string;
  context?: Array<{
    id: string | number;
    [key: string]: any;
  }>;
}
