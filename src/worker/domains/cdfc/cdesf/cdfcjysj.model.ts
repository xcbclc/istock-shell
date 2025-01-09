import { BaseModel, Model } from '@istock/iswork';

// 成都房产交易数据
@Model('cdfcjysj')
export class CdfcjysjModel extends BaseModel {
  时间!: string;
  类型!: '新房' | '二手房';
  区域类型!: '全市' | '中心城区' | '郊区新城';
  套!: number;
  面积!: number;
}
