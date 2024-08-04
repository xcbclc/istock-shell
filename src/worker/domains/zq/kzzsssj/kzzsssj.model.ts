import { BaseModel, Model } from '@istock/iswork';

@Model('kzzsssj')
export class KzzsssjModel extends BaseModel {
  代码!: string;
  转债名称!: string;
  现价!: number;
  涨跌幅!: number; // 注意单位: %
  正股代码!: string;
  正股名称!: string;
  正股价!: number;
  正股涨跌!: number; // 注意单位: %
  正股PB!: number;
  转股价!: number;
  转股价值!: number;
  转股溢价率!: number; // 注意单位: %
  债券评级!: string;
  回售触发价!: number;
  强赎触发价!: number;
  转债占比!: number; // 注意单位: %
  到期时间!: string;
  剩余年限!: number;
  剩余规模!: number; // 注意单位: 亿元
  成交额!: number; // 注意单位: 万元
  换手率!: number; // 注意单位: %
  到期税前收益!: number; // 注意单位: %
  双低!: number;
}
