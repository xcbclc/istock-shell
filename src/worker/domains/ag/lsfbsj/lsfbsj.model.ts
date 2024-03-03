import { BaseModel, Model } from '@istock/iswork';

@Model('lsfbsj')
export class LsfbsjModel extends BaseModel {
  成交时间!: string;
  成交价格!: number; // 注意单位: 元
  价格变动!: number; // 注意单位: 元
  成交量!: number; // 注意单位: 手
  成交额!: number; // 注意单位: 元
  性质!: string; // 买卖盘标记
}
