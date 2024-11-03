import { BaseModel, Model } from '@istock/iswork';

@Model('kzzsd')
export class KzzsdModel extends BaseModel {
  // 转债代码
  bond_id!: string;
  // 转债名称
  bond_nm!: string;
  // 转债现价
  price!: number;
  // 转股价值
  convert_value!: number;
  // 转股溢价率
  premium_rt!: number;
  // 双低值
  dblow!: number;
  // 评级
  rating_cd!: string;
  // 到期时间
  maturity_dt!: string;
  // 剩余年限
  year_left!: number;
  // 剩余规模（亿元）
  curr_iss_amt!: number;
  // 债券类型
  btype!: string;
  // 正股名称
  stock_nm!: string;
  // 正股价格
  sprice!: number;
  // 强赎价价格
  force_redeem_price!: number;
  // 标记状态
  status?: string[];
}
