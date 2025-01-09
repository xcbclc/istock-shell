import { BaseModel, Model } from '@istock/iswork';

// 成都房产二手行情数据
@Model('cdfceshqsj')
export class CdfceshqsjModel extends BaseModel {
  时间!: string;
  数据类型!:
    | '新增挂牌均价'
    | '新增挂牌中位数'
    | '涨价房源占比'
    | '涨价房源幅度'
    | '成交均价'
    | '成交中位数'
    | '平均成交周期'
    | '降价房源占比'
    | '降价房源幅度'
    | '新增挂牌量'
    | '成交量'
    | '存量挂牌';

  值!: number;
  单位!: string;
  数据源!: '房小团' | '数据源';
}
