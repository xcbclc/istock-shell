import { BaseModel, Model } from '@istock/iswork';

@Model('lshqsj')
export class LshqsjModel extends BaseModel {
  '日期'!: string;
  '开盘'!: number;
  '收盘'!: number;
  '最高'!: number;
  '最低'!: number;
  '成交量'!: number;
  '成交额'!: number;
  '振幅'!: number;
  '涨跌幅'!: number;
  '涨跌额'!: number;
  '换手率'!: number;
}

@Model('lshqxl')
export class LshqxlModel extends BaseModel {
  date!: string; // 交易日
  open!: number; // 开盘价
  high!: number; // 最高价
  low!: number; // 最低价
  close!: number; // 收盘价
  volume!: number; // 成交量; 注意单位: 股
  amount!: number; //	成交额; 注意单位: 元
  outstanding_share!: number; // 注意单位: 股
  turnover!: number; // 换手率=成交量/流动股本
}

@Model('lshqtx')
export class LshqtxModel extends BaseModel {
  date!: string; // 交易日
  open!: number; // 开盘价
  close!: number; // 收盘价
  high!: number; // 最高价
  low!: number; // 最低价
  amount!: number; // 注意单位: 手
}

@Model('fssjxl')
export class FssjxlModel extends BaseModel {
  day!: string; // 交易日
  open!: number; // 开盘价
  close!: number; // 收盘价
  high!: number; // 最高价
  low!: number; // 最低价
  volume!: number;
}

@Model('fssjdc')
export class FssjdcModel extends BaseModel {
  时间!: string;
  开盘!: number;
  收盘!: number;
  最高!: number;
  最低!: number;
  成交量!: number; //	注意单位: 手
  成交额!: number;
  振幅!: number;
  涨跌幅!: number;
  涨跌额!: number;
  换手率!: number;
}

@Model('rnfssjdc')
export class RnfssjdcModel extends BaseModel {
  时间!: string;
  成交价!: number;
  手数!: number;
  买卖盘性质!: string;
}

@Model('rnfssjxl')
export class RnfssjxlModel extends BaseModel {
  symbol!: string;
  name!: string;
  ticktime!: string;
  price!: number;
  volume!: number; //	注意单位: 股
  prev_price!: number;
  kind!: string; // D 表示卖盘，表示 是买盘
}

@Model('pqsj')
export class PqsjlModel extends BaseModel {
  时间!: string;
  开盘!: number;
  收盘!: number;
  最高!: number;
  最低!: number;
  成交量!: number; //	注意单位: 手
  成交额!: number;
  最新价!: number;
}
