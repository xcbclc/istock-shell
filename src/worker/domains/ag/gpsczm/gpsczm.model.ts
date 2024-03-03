import { BaseModel, Model } from '@istock/iswork';

@Model('szgpsczm')
export class SzgpsczmModel extends BaseModel {
  项目!: string;
  股票!: number;
  科创板!: number;
  主板!: number;
}

@Model('szlbtj')
export class SzlbtjModel extends BaseModel {
  证券类别!: string;
  数量!: number;
  成交金额!: number;
  总市值!: number;
  流通市值!: number;
}

@Model('szdqjypx')
export class SzdqjypxModel extends BaseModel {
  序号!: number;
  地区!: string;
  总交易额!: number;
  占市场!: number;
  股票交易额!: number;
  基金交易额!: number;
  债券交易额!: number;
}

@Model('szgphycj')
export class SzgphycjModel extends BaseModel {
  项目名称!: string;
  '项目名称-英文'!: string;
  交易天数!: number;
  '成交金额-人民币元'!: number;
  '成交金额-占总计'!: number;
  '成交股数-股数'!: number;
  '成交股数-占总计'!: number;
  '成交笔数-笔'!: number;
  '成交笔数-占总计'!: number;
}

@Model('szmrgk')
export class SzmrgkModel extends BaseModel {
  单日情况!: string;
  股票!: number;
  主板A!: number;
  主板B!: number;
  科创板!: number;
  股票回购!: number;
}
