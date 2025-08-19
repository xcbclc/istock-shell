/**
 * @fileoverview commodity AKShare接口定义
 * 自动生成，请勿手动修改
 */

/**
 * 接口参数定义
 */
export interface Parameter {
  /** 参数标题 */
  title: string;
  /** 参数名称 */
  name: string;
  /** 参数类型 */
  type: string;
  /** 参数描述 */
  description: string;
}

/**
 * 输入接口参数定义
 */
export interface InputParameter extends Parameter {
  /** 是否必需 */
  isRequired: boolean;
  /** 默认值 */
  defaultValue?: string;
  /** 可选项 */
  choices?: string[];
}

/**
 * 输出接口参数定义
 */
export interface OutputParameter extends Parameter {
  /** 单位 */
  unit: string;
}

/**
 * 接口定义
 */
export interface ApiInterface {
  /** 所属文件标题 */
  moduleTitle: string;
  /** 所属文件名 */
  moduleName: string;
  /** 接口标题 */
  title: string;
  /** 接口名称 */
  name: string;
  /** API函数名 */
  api: string;
  /** 目标地址 */
  targetUrl: string;
  /** 接口描述 */
  description: string;
  /** 限量说明 */
  remarks: string;
  /** 输入参数 */
  inputParameters: InputParameter[];
  /** 输出参数 */
  outputParameters: OutputParameter[];
}

/**
 * commodity接口数据
 */
export const commodityInterfaces: ApiInterface[] = [
  {
    "moduleTitle": "商品",
    "moduleName": "commodity",
    "title": "合约持仓数据",
    "name": "hyccsj",
    "api": "variety_positions",
    "description": "合约持仓数据接口",
    "inputParameters": [
      {
        "title": "fields",
        "name": "fields",
        "type": "多头/空头",
        "description": "longs: 返回多头数据; shorts: 返回空头数据",
        "isRequired": true
      },
      {
        "title": "code",
        "name": "code",
        "type": "合约代号",
        "description": "rb1810",
        "isRequired": true
      },
      {
        "title": "date",
        "name": "date",
        "type": "查询日期",
        "description": "2018-08-08",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "longs",
        "name": "longs",
        "type": "array",
        "description": "多头龙虎榜",
        "unit": ""
      },
      {
        "title": "shorts",
        "name": "shorts",
        "type": "array",
        "description": "空头龙虎榜",
        "unit": ""
      },
      {
        "title": "broker",
        "name": "broker",
        "type": "string",
        "description": "席位",
        "unit": ""
      },
      {
        "title": "long",
        "name": "long",
        "type": "int",
        "description": "该席位多头持仓量",
        "unit": ""
      },
      {
        "title": "long_chge",
        "name": "long_chge",
        "type": "int",
        "description": "该席位多头持仓变化量",
        "unit": ""
      },
      {
        "title": "short",
        "name": "short",
        "type": "int",
        "description": "该席位空头持仓量",
        "unit": ""
      },
      {
        "title": "short_chge",
        "name": "short_chge",
        "type": "int",
        "description": "该席位空头持仓变化量",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "商品",
    "moduleName": "commodity",
    "title": "商品持仓数据",
    "name": "spccsj",
    "api": "```",
    "inputParameters": [],
    "outputParameters": [],
    "remarks": "",
    "targetUrl": "",
    "description": ""
  },
  {
    "moduleTitle": "商品",
    "moduleName": "commodity",
    "title": "商品净持仓数据",
    "name": "spjccsj",
    "api": "variety_net_positions",
    "description": "商品净持仓数据接口",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "查询品种编码",
        "description": "RB",
        "isRequired": true
      },
      {
        "title": "broker",
        "name": "broker",
        "type": "席位",
        "description": "永安期货",
        "isRequired": true
      },
      {
        "title": "date",
        "name": "date",
        "type": "查询日期",
        "description": "2018-08-08",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "trans_date",
        "name": "trans_date",
        "type": "date",
        "description": "查询日期",
        "unit": ""
      },
      {
        "title": "net_position",
        "name": "net_position",
        "type": "int",
        "description": "净持仓数据",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "商品",
    "moduleName": "commodity",
    "title": "合约行情数据",
    "name": "hyhqsj",
    "api": "variety_quotes",
    "description": "合约行情数据接口",
    "inputParameters": [
      {
        "title": "code",
        "name": "code",
        "type": "具体合约代号",
        "description": "rb1810",
        "isRequired": true
      },
      {
        "title": "date",
        "name": "date",
        "type": "查询日期",
        "description": "2018-08-08",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "open",
        "name": "open",
        "type": "float",
        "description": "开盘价",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float",
        "description": "收盘价",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float",
        "description": "最高价",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float",
        "description": "最低价",
        "unit": ""
      },
      {
        "title": "volume",
        "name": "volume",
        "type": "int",
        "description": "成交量",
        "unit": ""
      },
      {
        "title": "openint",
        "name": "openint",
        "type": "int",
        "description": "持仓量",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "商品",
    "moduleName": "commodity",
    "title": "商品沉淀资金数据",
    "name": "spcdzjsj",
    "api": "variety_money",
    "description": "商品沉淀资金数据接口",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "品种编码",
        "description": "RB",
        "isRequired": true
      },
      {
        "title": "date",
        "name": "date",
        "type": "查询日期",
        "description": "2018-08-08",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "trans_date",
        "name": "trans_date",
        "type": "date",
        "description": "查询日期",
        "unit": ""
      },
      {
        "title": "total_value",
        "name": "total_value",
        "type": "float",
        "description": "沉淀资金量，单位元",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "商品",
    "moduleName": "commodity",
    "title": "合约多空比数据",
    "name": "hydkbsj",
    "api": "variety_bbr",
    "description": "合约多空比数据接口",
    "inputParameters": [
      {
        "title": "code",
        "name": "code",
        "type": "具体合约代号",
        "description": "rb1810",
        "isRequired": true
      },
      {
        "title": "date",
        "name": "date",
        "type": "查询日期",
        "description": "2018-08-08",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "trans_date",
        "name": "trans_date",
        "type": "date",
        "description": "查询日期",
        "unit": ""
      },
      {
        "title": "bbr",
        "name": "bbr",
        "type": "float",
        "description": "多空比",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "商品",
    "moduleName": "commodity",
    "title": "合约净持仓保证金变化数据",
    "name": "hyjccbzjbhsj",
    "api": "variety_net_money_chge",
    "description": "合约净持仓保证金变化数据接口",
    "inputParameters": [
      {
        "title": "code",
        "name": "code",
        "type": "具体合约代号",
        "description": "rb1810",
        "isRequired": true
      },
      {
        "title": "date",
        "name": "date",
        "type": "查询日期",
        "description": "2018-08-08",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "broker",
        "name": "broker",
        "type": "string",
        "description": "席位",
        "unit": ""
      },
      {
        "title": "value",
        "name": "value",
        "type": "float",
        "description": "沉淀资金变化量，正数为向多，负数为向空，单位元",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "商品",
    "moduleName": "commodity",
    "title": "合约净持仓保证金数据",
    "name": "hyjccbzjsj",
    "api": "variety_net_money",
    "description": "合约净持仓保证金数据接口",
    "inputParameters": [
      {
        "title": "code",
        "name": "code",
        "type": "具体合约代号",
        "description": "rb1810",
        "isRequired": true
      },
      {
        "title": "date",
        "name": "date",
        "type": "查询日期",
        "description": "2018-08-08",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "broker",
        "name": "broker",
        "type": "string",
        "description": "席位",
        "unit": ""
      },
      {
        "title": "value",
        "name": "value",
        "type": "float",
        "description": "净持仓保证金数据，正数为净多，负数为净空，单位元",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "商品",
    "moduleName": "commodity",
    "title": "合约总持仓保证金数据",
    "name": "hyzccbzjsj",
    "api": "variety_total_money",
    "description": "合约总持仓保证金数据接口",
    "inputParameters": [
      {
        "title": "code",
        "name": "code",
        "type": "具体合约代号",
        "description": "rb1810",
        "isRequired": true
      },
      {
        "title": "date",
        "name": "date",
        "type": "查询日期",
        "description": "2018-08-08",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "broker",
        "name": "broker",
        "type": "string",
        "description": "席位",
        "unit": ""
      },
      {
        "title": "value",
        "name": "value",
        "type": "float",
        "description": "总持仓保证金数据，单位元",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "商品",
    "moduleName": "commodity",
    "title": "商品的席位盈亏数据",
    "name": "spdxwyksj",
    "api": "variety_profit",
    "description": "商品的席位盈亏数据接口",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "品种编码",
        "description": "RB",
        "isRequired": true
      },
      {
        "title": "start_date",
        "name": "start_date",
        "type": "查询开始日期",
        "description": "2018-02-08",
        "isRequired": true
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "查询结束日期",
        "description": "2018-08-08",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "broker",
        "name": "broker",
        "type": "string",
        "description": "席位",
        "unit": ""
      },
      {
        "title": "total_profit",
        "name": "total_profit",
        "type": "float",
        "description": "盈亏数据，单位元",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "商品",
    "moduleName": "commodity",
    "title": "自研指标数据",
    "name": "zyzbsj",
    "api": "variety_strategies",
    "description": "自研指标数据接口",
    "inputParameters": [
      {
        "title": "code",
        "name": "code",
        "type": "合约代号",
        "description": "rb1810",
        "isRequired": true
      },
      {
        "title": "date",
        "name": "date",
        "type": "查询日期",
        "description": "2018-08-08",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "trans_date",
        "name": "trans_date",
        "type": "date",
        "description": "查询日期",
        "unit": ""
      },
      {
        "title": "longhu",
        "name": "longhu",
        "type": "float",
        "description": "龙虎比",
        "unit": ""
      },
      {
        "title": "niuxiong",
        "name": "niuxiong",
        "type": "float",
        "description": "牛熊线",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "商品",
    "moduleName": "commodity",
    "title": "商品相关研报数据",
    "name": "spxgybsj",
    "api": "variety_reports",
    "description": "商品相关研报数据接口",
    "inputParameters": [
      {
        "title": "csymbolode",
        "name": "csymbolode",
        "type": "品种编码",
        "description": "RB",
        "isRequired": true
      },
      {
        "title": "date",
        "name": "date",
        "type": "查询日期",
        "description": "2018-08-08",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "title",
        "name": "title",
        "type": "string",
        "description": "研报标题",
        "unit": ""
      },
      {
        "title": "pub",
        "name": "pub",
        "type": "string",
        "description": "研报发布人",
        "unit": ""
      },
      {
        "title": "time",
        "name": "time",
        "type": "datetime",
        "description": "发布时间",
        "unit": ""
      },
      {
        "title": "url",
        "name": "url",
        "type": "string",
        "description": "研报地址",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "商品",
    "moduleName": "commodity",
    "title": "商品列表数据",
    "name": "splbsj",
    "api": "variety_all",
    "description": "商品列表数据接口",
    "inputParameters": [
      {
        "title": "csymbolode",
        "name": "csymbolode",
        "type": "品种编码",
        "description": "RB",
        "isRequired": true
      },
      {
        "title": "date",
        "name": "date",
        "type": "查询日期",
        "description": "2018-08-08",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "name",
        "name": "name",
        "type": "string",
        "description": "品种名称",
        "unit": ""
      },
      {
        "title": "symbol",
        "name": "symbol",
        "type": "string",
        "description": "品种编码",
        "unit": ""
      },
      {
        "title": "market",
        "name": "market",
        "type": "string",
        "description": "所在市场",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "商品",
    "moduleName": "commodity",
    "title": "合约索引",
    "name": "hysy",
    "api": "variety_list",
    "description": "合约索引数据接口",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "查询日期",
        "description": "2018-08-08",
        "isRequired": true
      }
    ],
    "outputParameters": [],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "商品",
    "moduleName": "commodity",
    "title": "非期货公司净持仓",
    "name": "fqhgsjcc",
    "api": "variety_no_futures",
    "description": "非期货公司净持仓数据接口",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "品种编码",
        "description": "RB",
        "isRequired": true
      },
      {
        "title": "date",
        "name": "date",
        "type": "查询日期",
        "description": "2018-08-08",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "trans_date",
        "name": "trans_date",
        "type": "date",
        "description": "查询日期",
        "unit": ""
      },
      {
        "title": "net_value",
        "name": "net_value",
        "type": "int",
        "description": "非期货公司净持仓数据",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  }
];

/**
 * 根据API名称获取接口定义
 * @param apiName API名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByApi(apiName: string): ApiInterface | undefined {
  return commodityInterfaces.find(item => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return commodityInterfaces.find(item => item.name === name);
}

export default commodityInterfaces;
