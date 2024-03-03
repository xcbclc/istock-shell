import { BaseModel, Model } from '@istock/iswork';

@Model('sshqsj')
export class SshqsjModel extends BaseModel {
  '序号'!: number;
  '代码'!: string;
  '名称'!: string;
  '最新价'!: number;
  '涨跌幅'!: number;
  '涨跌额'!: number;
  '成交量'!: number;
  '成交额'!: number;
  '振幅'!: number;
  '最高'!: number;
  '最低'!: number;
  '今开'!: number;
  '昨收'!: number;
  '量比'!: number;
  '换手率'!: number;
  '市盈率-动态'!: number;
  '市净率'!: number;
  '总市值'!: number;
  '流通市值'!: number;
  '涨速'!: number;
  '5分钟涨跌'!: number;
  '60日涨跌幅'!: number;
  '年初至今涨跌幅'!: number;
}

@Model('sshqxl')
export class SshqxlModel extends BaseModel {
  '代码'!: string;
  '名称'!: string;
  '最新价'!: number;
  '涨跌额'!: number;
  '涨跌幅'!: number;
  '买入'!: number;
  '卖出'!: number;
  '昨收'!: number;
  '今开'!: number;
  '最高'!: number;
  '最低'!: number;
  '成交量'!: number;
  '成交额'!: number;
  '时间戳'!: object;
}
