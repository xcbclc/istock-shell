import { BaseModel, Model } from '@istock/iswork';

@Model('ai')
export class AiModel extends BaseModel {
  // 消息内容
  content!: string;
}
