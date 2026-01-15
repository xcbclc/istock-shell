/**
 * @fileoverview index AKShare接口定义
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
  defaultValue?: any;
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
 * index接口数据
 */
export const indexInterfaces: ApiInterface[] = [
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "实时行情数据-东财",
    "name": "zssj_sshqsj_dc1",
    "api": "stock_zh_index_spot_em",
    "targetUrl": "https://quote.eastmoney.com/center/gridlist.html#index_sz",
    "description": "东方财富网-行情中心-沪深京指数",
    "remarks": "单次返回所有指数的实时行情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"上证系列指数\"；choice of {\"沪深重要指数\", \"上证系列指数\", \"深证系列指数\", \"指数成份\", \"中证系列指数\"}",
        "defaultValue": "上证系列指数",
        "choices": [
          "沪深重要指数",
          "上证系列指数",
          "深证系列指数",
          "指数成份",
          "中证系列指数"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "序号",
        "name": "xh",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "代码",
        "name": "dm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "名称",
        "name": "mc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新价",
        "name": "zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌额",
        "name": "zde",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "振幅",
        "name": "zf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "最高",
        "name": "zg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低",
        "name": "zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "今开",
        "name": "jk",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "昨收",
        "name": "zs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "量比",
        "name": "lb",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "实时行情数据-新浪",
    "name": "zssj_sshqsj_xl1",
    "api": "stock_zh_index_spot_sina",
    "targetUrl": "https://vip.stock.finance.sina.com.cn/mkt/#hs_s",
    "description": "新浪财经-中国股票指数数据",
    "remarks": "单次返回所有指数的实时行情数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "代码",
        "name": "dm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "名称",
        "name": "mc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新价",
        "name": "zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌额",
        "name": "zde",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "昨收",
        "name": "zs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "今开",
        "name": "jk",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高",
        "name": "zg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低",
        "name": "zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "注意单位: 手",
        "unit": "手"
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "历史行情数据-新浪",
    "name": "zssj_lshqsj_xl1",
    "api": "stock_zh_index_daily",
    "targetUrl": "https://finance.sina.com.cn/realstock/company/sz399552/nc.shtml(示例)",
    "description": "股票指数的历史数据按日频率更新",
    "remarks": "单次返回指定 symbol 的所有历史行情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"sz399552\"",
        "defaultValue": "sz399552",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "新浪的数据开始时间, 不是该指数的上市时间",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "volume",
        "name": "volume",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "历史行情数据-腾讯",
    "name": "zssj_lshqsj_tx",
    "api": "stock_zh_index_daily_tx",
    "targetUrl": "https://gu.qq.com/sh000919/zs",
    "description": "股票指数(或者股票)历史行情数据",
    "remarks": "单次返回具体某个股票指数(或者股票)的所有历史行情数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "腾讯的数据开始时间, 不是证券上市时间",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "amount",
        "name": "amount",
        "type": "float64",
        "description": "注意单位: 手",
        "unit": "手"
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "历史行情数据-东方财富",
    "name": "zssj_lshqsj_dfcf",
    "api": "stock_zh_index_daily_em",
    "targetUrl": "http://quote.eastmoney.com/center/hszs.html",
    "description": "东方财富股票指数数据, 历史数据按日频率更新",
    "remarks": "单次返回具体指数的所有历史行情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"sz399552\"; 支持 sz: 深交所, sh: 上交所, csi: 中证指数 + id(000905)",
        "defaultValue": "sz399552",
        "isRequired": false
      },
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"19900101\"",
        "defaultValue": "19900101",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"20500101\"",
        "defaultValue": "20500101",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "东方财富的数据开始时间, 不是证券上市时间",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "volume",
        "name": "volume",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "amount",
        "name": "amount",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "历史行情数据-通用",
    "name": "zssj_lshqsj_ty",
    "api": "index_zh_a_hist",
    "targetUrl": "http://quote.eastmoney.com/center/hszs.html",
    "description": "东方财富网-中国股票指数-行情数据",
    "remarks": "单次返回具体指数指定 period 从 start_date 到 end_date 的之间的近期数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"399282\"; 指数代码，此处不用市场标识",
        "defaultValue": "399282",
        "isRequired": false
      },
      {
        "title": "period",
        "name": "period",
        "type": "str",
        "description": "period=\"daily\"; choice of {'daily', 'weekly', 'monthly'}",
        "defaultValue": "daily",
        "choices": [
          "daily",
          "weekly",
          "monthly"
        ],
        "isRequired": false
      },
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"19700101\"; 开始日期",
        "defaultValue": "19700101",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"22220101\"; 结束时间",
        "defaultValue": "22220101",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "交易日",
        "unit": ""
      },
      {
        "title": "开盘",
        "name": "kp",
        "type": "float64",
        "description": "开盘价",
        "unit": ""
      },
      {
        "title": "收盘",
        "name": "sp",
        "type": "float64",
        "description": "收盘价",
        "unit": ""
      },
      {
        "title": "最高",
        "name": "zg",
        "type": "float64",
        "description": "最高价",
        "unit": ""
      },
      {
        "title": "最低",
        "name": "zd",
        "type": "float64",
        "description": "最低价",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "int32",
        "description": "注意单位: 手",
        "unit": "手"
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "振幅",
        "name": "zf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "涨跌额",
        "name": "zde",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "换手率",
        "name": "hsl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "分时行情数据",
    "name": "zssj_fshqsj",
    "api": "index_zh_a_hist_min_em",
    "targetUrl": "https://quote.eastmoney.com/center/hszs.html",
    "description": "东方财富网-指数数据-分时行情",
    "remarks": "单次返回具体指数指定 period 从 start_date 到 end_date 的之间的近期数据，该接口不能返回所有历史数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"399006\"; 指数代码，此处不用市场标识",
        "defaultValue": "399006",
        "isRequired": false
      },
      {
        "title": "period",
        "name": "period",
        "type": "str",
        "description": "period=\"1\"; choice of {'1', '5', '15', '30', '60'}, 其中 1 分钟数据只能返回当前的, 其余只能返回近期的数据",
        "defaultValue": "1",
        "choices": [
          1,
          5,
          15,
          30,
          60
        ],
        "isRequired": false
      },
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"1979-09-01 09:32:00\"; 开始日期时间",
        "defaultValue": "1979-09-01 09:32:00",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"2222-01-01 09:32:00\"; 结束时间时间",
        "defaultValue": "2222-01-01 09:32:00",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "时间",
        "name": "sj",
        "type": "object",
        "description": "交易日",
        "unit": ""
      },
      {
        "title": "开盘",
        "name": "kp",
        "type": "float64",
        "description": "开盘价",
        "unit": ""
      },
      {
        "title": "收盘",
        "name": "sp",
        "type": "float64",
        "description": "收盘价",
        "unit": ""
      },
      {
        "title": "最高",
        "name": "zg",
        "type": "float64",
        "description": "最高价",
        "unit": ""
      },
      {
        "title": "最低",
        "name": "zd",
        "type": "float64",
        "description": "最低价",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "int64",
        "description": "注意单位: 手",
        "unit": "手"
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "均价",
        "name": "jj",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "实时行情数据-新浪",
    "name": "zssj_sshqsj_xl2",
    "api": "stock_hk_index_spot_sina",
    "targetUrl": "https://vip.stock.finance.sina.com.cn/mkt/#zs_hk",
    "description": "新浪财经-行情中心-港股指数",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "代码",
        "name": "dm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "名称",
        "name": "mc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新价",
        "name": "zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌额",
        "name": "zde",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "昨收",
        "name": "zs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "今开",
        "name": "jk",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高",
        "name": "zg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低",
        "name": "zd",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "历史行情数据-新浪",
    "name": "zssj_lshqsj_xl2",
    "api": "stock_hk_index_daily_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/hkstock/quotes/CES100.html",
    "description": "新浪财经-港股指数-历史行情数据",
    "remarks": "单次返回指定 symbol 的所有数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"CES100\"",
        "defaultValue": "CES100",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "volume",
        "name": "volume",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "实时行情数据-东财",
    "name": "zssj_sshqsj_dc2",
    "api": "stock_hk_index_spot_em",
    "targetUrl": "https://quote.eastmoney.com/center/gridlist.html#hk_index",
    "description": "东方财富网-行情中心-港股-指数实时行情",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "序号",
        "name": "xh",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "内部编号",
        "name": "nbbh",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "代码",
        "name": "dm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "名称",
        "name": "mc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新价",
        "name": "zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌额",
        "name": "zde",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "今开",
        "name": "jk",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高",
        "name": "zg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低",
        "name": "zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "昨收",
        "name": "zs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "注意单位: 港元",
        "unit": "港元"
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "历史行情数据-东财",
    "name": "zssj_lshqsj_dc",
    "api": "stock_hk_index_daily_em",
    "targetUrl": "https://quote.eastmoney.com/gb/zsHSTECF2L.html",
    "description": "东方财富网-港股-股票指数数据",
    "remarks": "单次返回指定 symbol 的所有数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"HSTECF2L\"; 可以通过 ak.stock_hk_index_spot_em() 获取",
        "defaultValue": "HSTECF2L",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "latest",
        "name": "latest",
        "type": "float64",
        "description": "最新价",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "指数行情",
    "name": "zssj_zshq1",
    "api": "index_us_stock_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/usstock/quotes/.IXIC.html",
    "description": "新浪财经-美股指数行情",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\".INX\"; choice of {\".IXIC\", \".DJI\", \".INX\", \".NDX\"}",
        "defaultValue": ".INX",
        "choices": [
          ".IXIC",
          ".DJI",
          ".INX",
          ".NDX"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "volume",
        "name": "volume",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "amount",
        "name": "amount",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "全球指数-实时行情数据",
    "name": "zssj_qqzs_sshqsj",
    "api": "index_global_spot_em",
    "targetUrl": "https://quote.eastmoney.com/center/gridlist.html#global_qtzs",
    "description": "东方财富网-行情中心-全球指数-实时行情数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "序号",
        "name": "xh",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "代码",
        "name": "dm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "名称",
        "name": "mc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新价",
        "name": "zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌额",
        "name": "zde",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "开盘价",
        "name": "kpj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高价",
        "name": "zgj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低价",
        "name": "zdj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "昨收价",
        "name": "zsj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "振幅",
        "name": "zf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新行情时间",
        "name": "zxhqsj",
        "type": "object",
        "description": "注意是指数所在地的时间",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "全球指数-历史行情数据-东财",
    "name": "zssj_qqzs_lshqsj_dc",
    "api": "index_global_hist_em",
    "targetUrl": "https://quote.eastmoney.com/gb/zsUDI.html",
    "description": "东方财富网-行情中心-全球指数-历史行情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"美元指数\"; 可以通过 ak.index_global_spot_em() 获取",
        "defaultValue": "美元指数",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "代码",
        "name": "dm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "名称",
        "name": "mc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今开",
        "name": "jk",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新价",
        "name": "zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高",
        "name": "zg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低",
        "name": "zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "振幅",
        "name": "zf",
        "type": "float64",
        "description": "主要单位: %",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "全球指数-历史行情数据-新浪",
    "name": "zssj_qqzs_lshqsj_xl",
    "api": "index_global_hist_sina",
    "targetUrl": "https://finance.sina.com.cn/stock/globalindex/quotes/UKX",
    "description": "新浪财经-行情中心-环球市场-历史行情",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"瑞士股票指数\"; 可以通过 ak.index_global_name_table() 获取",
        "defaultValue": "瑞士股票指数",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "volume",
        "name": "volume",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "最新成份",
    "name": "zssj_zxcf",
    "api": "index_stock_cons",
    "targetUrl": "http://vip.stock.finance.sina.com.cn/corp/view/vII_NewestComponent.php?page=1&indexid=399639",
    "description": "指定指数的最新成份股票信息, 注意该接口返回的数据有部分是重复会导致数据缺失, 可以调用 **ak.index_stock_cons_sina()** 获取主流指数数据, 或调用**ak.index_stock_cons_csindex()**获取中证指数网提供的成分数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "品种代码",
        "name": "pzdm",
        "type": "object",
        "description": "股票代码",
        "unit": ""
      },
      {
        "title": "品种名称",
        "name": "pzmc",
        "type": "object",
        "description": "股票名称",
        "unit": ""
      },
      {
        "title": "纳入日期",
        "name": "nrrq",
        "type": "object",
        "description": "成份股纳入日期",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "中证指数成份股",
    "name": "zssj_zzzscfg",
    "api": "index_stock_cons_csindex",
    "targetUrl": "http://www.csindex.com.cn/zh-CN/indices/index-detail/000300",
    "description": "中证指数网站-成份股目录",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"000300\"; 指数代码",
        "defaultValue": "000300",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数代码",
        "name": "zsdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数名称",
        "name": "zsmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数英文名称",
        "name": "zsywmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "成分券代码",
        "name": "cfqdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "成分券名称",
        "name": "cfqmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "成分券英文名称",
        "name": "cfqywmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易所",
        "name": "jys",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易所英文名称",
        "name": "jysywmc",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "中证指数成份股权重",
    "name": "zssj_zzzscfgqz",
    "api": "index_stock_cons_weight_csindex",
    "targetUrl": "http://www.csindex.com.cn/zh-CN/indices/index-detail/000300",
    "description": "中证指数网站-成份股权重",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"000300\"; 指数代码",
        "defaultValue": "000300",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数代码",
        "name": "zsdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数名称",
        "name": "zsmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数英文名称",
        "name": "zsywmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "成分券代码",
        "name": "cfqdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "成分券名称",
        "name": "cfqmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "成分券英文名称",
        "name": "cfqywmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易所",
        "name": "jys",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易所英文名称",
        "name": "jysywmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "权重",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "全部指数",
    "name": "zssj_qbzs",
    "api": "index_all_cni",
    "targetUrl": "http://www.cnindex.com.cn/zh_indices/sese/index.html?act_menu=1&index_type=-1",
    "description": "国证指数-最近交易日的所有指数的代码和基本信息",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "指数代码",
        "name": "zsdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数简称",
        "name": "zsjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "样本数",
        "name": "ybs",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "收盘点位",
        "name": "spdw",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "PE滚动",
        "name": "PEgd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "注意单位: 债券指数成交量单位为亿张，非债券指数成交量单位为万手",
        "unit": "债券指数成交量单位为亿张"
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "总市值",
        "name": "zsz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "自由流通市值",
        "name": "zyltsz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "指数行情",
    "name": "zssj_zshq2",
    "api": "index_hist_cni",
    "targetUrl": "http://www.cnindex.com.cn/module/index-detail.html?act_menu=1&indexCode=399001",
    "description": "国证指数-具体指数的日频率行情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"399005\"; 从 ak.index_all_cni() 接口获取指数代码",
        "defaultValue": "399005",
        "isRequired": false
      },
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"20230114\"",
        "defaultValue": "20230114",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"20240114\"",
        "defaultValue": "20240114",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "开盘价",
        "name": "kpj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高价",
        "name": "zgj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低价",
        "name": "zdj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "收盘价",
        "name": "spj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "注意单位: 万手",
        "unit": "万手"
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "指数样本详情",
    "name": "zssj_zsybxq",
    "api": "index_detail_cni",
    "targetUrl": "http://www.cnindex.com.cn/module/index-detail.html?act_menu=1&indexCode=399001",
    "description": "国证指数-指数样本详情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol='399001'; 从 **ak.index_all_cni()** 接口获取指数代码",
        "defaultValue": "399001",
        "isRequired": false
      },
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date='202404'; 指定年月",
        "defaultValue": "202404",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "样本代码",
        "name": "ybdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "样本简称",
        "name": "ybjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "所属行业",
        "name": "sshy",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "自由流通市值",
        "name": "zyltsz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "总市值",
        "name": "zsz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "权重",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "历史样本",
    "name": "zssj_lsyb",
    "api": "index_detail_hist_cni",
    "targetUrl": "http://www.cnindex.com.cn/module/index-detail.html?act_menu=1&indexCode=399001",
    "description": "国证指数-历史样本数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol='399005'; 从 **ak.index_all_cni()** 接口获取指数代码",
        "defaultValue": "399005",
        "isRequired": false
      },
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date='202201', 默认空返回所有数据; date=\"202201\", 则返回 2022 年 1 月的全部数据",
        "defaultValue": "202201",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "样本代码",
        "name": "ybdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "样本简称",
        "name": "ybjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "所属行业",
        "name": "sshy",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "自由流通市值",
        "name": "zyltsz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "总市值",
        "name": "zsz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "权重",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "历史调样",
    "name": "zssj_lsty",
    "api": "index_detail_hist_adjust_cni",
    "targetUrl": "http://www.cnindex.com.cn/module/index-detail.html?act_menu=1&indexCode=399001",
    "description": "国证指数-样本详情-历史调样",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol='399005'; 从 **ak.index_all_cni()** 接口获取指数代码",
        "defaultValue": "399005",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "开始日期",
        "name": "ksrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "结束日期",
        "name": "jsrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "样本代码",
        "name": "ybdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "样本简称",
        "name": "ybjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "所属行业",
        "name": "sshy",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "调整类型",
        "name": "tzlx",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "50ETF 期权波动率指数",
    "name": "zssj_50etf_qqbdlzs",
    "api": "index_option_50etf_qvix",
    "targetUrl": "http://1.optbbs.com/s/vix.shtml?50ETF",
    "description": "50ETF 期权波动率指数 QVIX; 又称中国版的恐慌指数",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "50ETF 期权波动率指数-分时",
    "name": "zssj_50etf_qqbdlzs_fs",
    "api": "index_option_50etf_min_qvix",
    "targetUrl": "http://1.optbbs.com/s/vix.shtml?50ETF",
    "description": "50ETF 期权波动率指数-分时",
    "remarks": "单次返回最近交易日的分时数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "time",
        "name": "time",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "qvix",
        "name": "qvix",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "300ETF 期权波动率指数",
    "name": "zssj_300etf_qqbdlzs",
    "api": "index_option_300etf_qvix",
    "targetUrl": "https://1.optbbs.com/s/vix.shtml?300ETF",
    "description": "300ETF 期权波动率指数 QVIX",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "300ETF 期权波动率指数-分时",
    "name": "zssj_300etf_qqbdlzs_fs",
    "api": "index_option_300etf_min_qvix",
    "targetUrl": "https://1.optbbs.com/s/vix.shtml?300ETF",
    "description": "300ETF 期权波动率指数-分时",
    "remarks": "单次返回最近交易日的分时数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "time",
        "name": "time",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "qvix",
        "name": "qvix",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "500ETF 期权波动率指数",
    "name": "zssj_500etf_qqbdlzs",
    "api": "index_option_500etf_qvix",
    "targetUrl": "http://1.optbbs.com/s/vix.shtml?500ETF",
    "description": "500ETF 期权波动率指数 QVIX",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "500ETF 期权波动率指数-分时",
    "name": "zssj_500etf_qqbdlzs_fs",
    "api": "index_option_500etf_min_qvix",
    "targetUrl": "http://1.optbbs.com/s/vix.shtml?500ETF",
    "description": "500ETF 期权波动率指数-分时",
    "remarks": "单次返回最近交易日的分时数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "time",
        "name": "time",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "qvix",
        "name": "qvix",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "创业板 期权波动率指数",
    "name": "zssj_cyb_qqbdlzs",
    "api": "index_option_cyb_qvix",
    "targetUrl": "http://1.optbbs.com/s/vix.shtml?CYB",
    "description": "创业板 期权波动率指数 QVIX",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "创业板 期权波动率指数-分时",
    "name": "zssj_cyb_qqbdlzs_fs",
    "api": "index_option_cyb_min_qvix",
    "targetUrl": "http://1.optbbs.com/s/vix.shtml?CYB",
    "description": "创业板 期权波动率指数-分时",
    "remarks": "单次返回最近交易日的分时数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "time",
        "name": "time",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "qvix",
        "name": "qvix",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "科创板 期权波动率指数",
    "name": "zssj_kcb_qqbdlzs",
    "api": "index_option_kcb_qvix",
    "targetUrl": "http://1.optbbs.com/s/vix.shtml?KCB",
    "description": "科创板 期权波动率指数 QVIX",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "科创板 期权波动率指数-分时",
    "name": "zssj_kcb_qqbdlzs_fs",
    "api": "index_option_kcb_min_qvix",
    "targetUrl": "http://1.optbbs.com/s/vix.shtml?KCB",
    "description": "科创板 期权波动率指数-分时",
    "remarks": "单次返回最近交易日的分时数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "time",
        "name": "time",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "qvix",
        "name": "qvix",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "深证100ETF 期权波动率指数",
    "name": "zssj_sz100etf_qqbdlzs",
    "api": "index_option_100etf_qvix",
    "targetUrl": "http://1.optbbs.com/s/vix.shtml?100ETF",
    "description": "深证100ETF 期权波动率指数 QVIX",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "深证100ETF 期权波动率指数-分时",
    "name": "zssj_sz100etf_qqbdlzs_fs",
    "api": "index_option_100etf_min_qvix",
    "targetUrl": "http://1.optbbs.com/s/vix.shtml?100ETF",
    "description": "深证100ETF 期权波动率指数-分时",
    "remarks": "单次返回最近交易日的分时数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "time",
        "name": "time",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "qvix",
        "name": "qvix",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "中证300股指 期权波动率指数",
    "name": "zssj_zz300gz_qqbdlzs",
    "api": "index_option_300index_qvix",
    "targetUrl": "http://1.optbbs.com/s/vix.shtml?Index",
    "description": "中证300股指 期权波动率指数 QVIX",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "中证300股指 期权波动率指数-分时",
    "name": "zssj_zz300gz_qqbdlzs_fs",
    "api": "index_option_300index_min_qvix",
    "targetUrl": "http://1.optbbs.com/s/vix.shtml?Index",
    "description": "中证300股指 期权波动率指数-分时",
    "remarks": "单次返回最近交易日的分时数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "time",
        "name": "time",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "qvix",
        "name": "qvix",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "中证1000股指 期权波动率指数",
    "name": "zssj_zz1000gz_qqbdlzs",
    "api": "index_option_1000index_qvix",
    "targetUrl": "http://1.optbbs.com/s/vix.shtml?Index1000",
    "description": "中证1000股指 期权波动率指数 QVIX",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "中证1000股指 期权波动率指数-分时",
    "name": "zssj_zz1000gz_qqbdlzs_fs",
    "api": "index_option_1000index_min_qvix",
    "targetUrl": "http://1.optbbs.com/s/vix.shtml?Index1000",
    "description": "中证1000股指 期权波动率指数-分时",
    "remarks": "单次返回最近交易日的分时数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "time",
        "name": "time",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "qvix",
        "name": "qvix",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "上证50股指 期权波动率指数",
    "name": "zssj_sz50gz_qqbdlzs",
    "api": "index_option_50index_qvix",
    "targetUrl": "http://1.optbbs.com/s/vix.shtml?50index",
    "description": "上证50股指 期权波动率指数 QVIX",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "上证50股指 期权波动率指数-分时",
    "name": "zssj_sz50gz_qqbdlzs_fs",
    "api": "index_option_50index_min_qvix",
    "targetUrl": "http://1.optbbs.com/s/vix.shtml?50index",
    "description": "上证50股指 期权波动率指数-分时",
    "remarks": "单次返回最近交易日的分时数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "time",
        "name": "time",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "qvix",
        "name": "qvix",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "申万一级行业信息",
    "name": "zssj_swyjhyxx",
    "api": "sw_index_first_info",
    "targetUrl": "https://legulegu.com/stockdata/sw-industry-overview#level1",
    "description": "申万一级行业信息",
    "inputParameters": [],
    "outputParameters": [],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "申万二级行业信息",
    "name": "zssj_swejhyxx",
    "api": "sw_index_second_info",
    "targetUrl": "https://legulegu.com/stockdata/sw-industry-overview#level1",
    "description": "申万二级行业信息",
    "inputParameters": [],
    "outputParameters": [],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "申万三级行业信息",
    "name": "zssj_swsjhyxx",
    "api": "sw_index_third_info",
    "targetUrl": "https://legulegu.com/stockdata/sw-industry-overview#level1",
    "description": "申万三级行业信息",
    "inputParameters": [],
    "outputParameters": [],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "申万三级行业成份",
    "name": "zssj_swsjhycf",
    "api": "sw_index_third_cons",
    "targetUrl": "https://legulegu.com/stockdata/index-composition?industryCode=851921.SI",
    "description": "申万三级行业成份",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"850111.SI\"; 行业代码; 可以通过 ak.sw_index_third_info() 获取所有行业代码",
        "defaultValue": "850111.SI",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "股息率",
        "name": "gxl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "市值",
        "name": "sz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "归母净利润同比增长(09-30)",
        "name": "gmjlrtbzz_09_30",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "归母净利润同比增长(06-30)",
        "name": "gmjlrtbzz_06_30",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "营业收入同比增长(09-30)",
        "name": "yysrtbzz_09_30",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "营业收入同比增长(06-30)",
        "name": "yysrtbzz_06_30",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "商品现货价格指数",
    "name": "zssj_spxhjgzs",
    "api": "spot_goods",
    "targetUrl": "http://finance.sina.com.cn/futuremarket/spotprice.shtml#titlePos_0",
    "description": "新浪财经-商品现货价格指数",
    "inputParameters": [],
    "outputParameters": [],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "义乌小商品指数",
    "name": "zssj_ywxspzs",
    "api": "index_yw",
    "targetUrl": "https://www.ywindex.com/Home/Product/index/",
    "description": "指定 symbol 的义乌小商品指数的近期历史数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"周价格指数\"; choice of {\"周价格指数\", \"月价格指数\", \"月景气指数\"}",
        "defaultValue": "周价格指数",
        "choices": [
          "周价格指数",
          "月价格指数",
          "月景气指数"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "期数",
        "name": "qs",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "景气指数",
        "name": "jqzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "规模指数",
        "name": "gmzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "效益指数",
        "name": "xyzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "市场信心指数",
        "name": "scxxzs",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "柯桥纺织品指数",
    "name": "zssj_kqfzpzs",
    "api": "index_kq_fz",
    "targetUrl": "http://www.kqindex.cn/flzs/jiage",
    "description": "指定 symbol 的柯桥纺织品指数的所有历史数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"价格指数\"; choice of {'价格指数', '景气指数', '外贸指数'}",
        "defaultValue": "价格指数",
        "choices": [
          "价格指数",
          "景气指数",
          "外贸指数"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "期次",
        "name": "qc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "价格指数",
        "name": "jgzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "价格指数-涨跌幅",
        "name": "jgzs_zdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "景气指数",
        "name": "jqzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "景气指数-涨跌幅",
        "name": "jqzs_zdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "柯桥时尚指数",
    "name": "zssj_kqsszs",
    "api": "index_kq_fashion",
    "targetUrl": "http://ss.kqindex.cn:9559/rinder_web_kqsszs/index/index_page.do",
    "description": "指定 symbol 的柯桥时尚指数的所有数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"柯桥时尚指数\"; choice of {'柯桥时尚指数', '时尚创意指数', '时尚设计人才数', '新花型推出数', '创意产品成交数', '创意企业数量', '时尚活跃度指数', '电商运行数', '时尚平台拓展数', '新产品销售额占比', '企业合作占比', '品牌传播费用', '时尚推广度指数', '国际交流合作次数', '企业参展次数', '外商驻点数量变化', '时尚评价指数'}",
        "defaultValue": "柯桥时尚指数",
        "choices": [
          "柯桥时尚指数",
          "时尚创意指数",
          "时尚设计人才数",
          "新花型推出数",
          "创意产品成交数",
          "创意企业数量",
          "时尚活跃度指数",
          "电商运行数",
          "时尚平台拓展数",
          "新产品销售额占比",
          "企业合作占比",
          "品牌传播费用",
          "时尚推广度指数",
          "国际交流合作次数",
          "企业参展次数",
          "外商驻点数量变化",
          "时尚评价指数"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数",
        "name": "zs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌值",
        "name": "zdz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "中国食糖指数",
    "name": "zssj_zgstzs",
    "api": "index_sugar_msweet",
    "targetUrl": "http://www.msweet.com.cn/mtkj/sjzx13/index.html",
    "description": "沐甜科技数据中心-中国食糖指数",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "综合价格",
        "name": "zhjg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "原糖价格",
        "name": "ytjg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现货价格",
        "name": "xhjg",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "配额内进口糖估算指数",
    "name": "zssj_penjktgszs",
    "api": "index_inner_quote_sugar_msweet",
    "targetUrl": "http://www.msweet.com.cn/mtkj/sjzx13/index.html",
    "description": "沐甜科技数据中心-配额内进口糖估算指数",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "利润空间",
        "name": "lrkj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "泰国糖",
        "name": "tgt",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "泰国MA5",
        "name": "tgMA5",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "巴西MA5",
        "name": "bxMA5",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "利润MA5",
        "name": "lrMA5",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "巴西MA10",
        "name": "bxMA10",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "巴西糖",
        "name": "bxt",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "柳州现货价",
        "name": "lzxhj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "广州现货价",
        "name": "gzxhj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "泰国MA10",
        "name": "tgMA10",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "利润MA30",
        "name": "lrMA30",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "利润MA10",
        "name": "lrMA10",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "配额外进口糖估算指数",
    "name": "zssj_pewjktgszs",
    "api": "index_outer_quote_sugar_msweet",
    "targetUrl": "http://www.msweet.com.cn/mtkj/sjzx13/index.html",
    "description": "沐甜科技数据中心-配额外进口糖估算指数",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "巴西糖进口成本",
        "name": "bxtjkcb",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "泰国糖进口利润空间",
        "name": "tgtjklrkj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "巴西糖进口利润空间",
        "name": "bxtjklrkj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "泰国糖进口成本",
        "name": "tgtjkcb",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "日照现货价",
        "name": "rzxhj",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "排污权指数",
    "name": "zssj_pwqzs",
    "api": "index_eri",
    "targetUrl": "https://zs.zjpwq.net/",
    "description": "浙江省排污权交易指数的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"月度\"; choice of {\"月度\", \"季度\"}",
        "defaultValue": "月度",
        "choices": [
          "月度",
          "季度"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "注意单位: 吨",
        "unit": "吨"
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "集装箱指数",
    "name": "zssj_jzxzs",
    "api": "drewry_wci_index",
    "targetUrl": "https://infogram.com/world-container-index-1h17493095xl4zj",
    "description": "Drewry 集装箱指数的数据",
    "remarks": "返回指定 symbol 的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"composite\"; choice of {\"composite\", \"shanghai-rotterdam\", \"rotterdam-shanghai\", \"shanghai-los angeles\", \"los angeles-shanghai\", \"shanghai-genoa\", \"new york-rotterdam\", \"rotterdam-new york\"}",
        "defaultValue": "composite",
        "choices": [
          "composite",
          "shanghai-rotterdam",
          "rotterdam-shanghai",
          "shanghai-los angeles",
          "los angeles-shanghai",
          "shanghai-genoa",
          "new york-rotterdam",
          "rotterdam-new york"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": []
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "中国公路物流运价指数",
    "name": "zssj_zgglwlyjzs",
    "api": "index_price_cflp",
    "targetUrl": "http://index.0256.cn/expx.htm",
    "description": "获取指定 symbol 的中国公路物流运价指数的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"周指数\"; choice of {\"周指数\", \"月指数\", \"季度指数\", \"年度指数\"}",
        "defaultValue": "周指数",
        "choices": [
          "周指数",
          "月指数",
          "季度指数",
          "年度指数"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "定基指数",
        "name": "djzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "环比指数",
        "name": "hbzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "同比指数",
        "name": "tbzs",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "中国公路物流运量指数",
    "name": "zssj_zgglwlylzs",
    "api": "index_volume_cflp",
    "targetUrl": "http://index.0256.cn/expx.htm",
    "description": "指定 symbol 的中国公路物流运量指数的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"周指数\"; choice of {\"月指数\", \"季度指数\", \"年度指数\"}",
        "defaultValue": "周指数",
        "choices": [
          "月指数",
          "季度指数",
          "年度指数"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "定基指数",
        "name": "djzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "环比指数",
        "name": "hbzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "同比指数",
        "name": "tbzs",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "中证指数",
    "name": "zssj_zzzs",
    "api": "stock_zh_index_hist_csindex",
    "targetUrl": "https://www.csindex.com.cn/zh-CN/indices/index-detail/H30374#/indices/family/detail?indexCode=H30374",
    "description": "中证指数日频率的数据",
    "remarks": "该接口返回指定 symbol 的 start_date 和 end_date 的指数日频率数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"000928\"; 指数代码",
        "defaultValue": "000928",
        "isRequired": false
      },
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"20180526\"",
        "defaultValue": "20180526",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"20240604\"",
        "defaultValue": "20240604",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数代码",
        "name": "zsdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数中文全称",
        "name": "zszwqc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数中文简称",
        "name": "zszwjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数英文全称",
        "name": "zsywqc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数英文简称",
        "name": "zsywjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "开盘",
        "name": "kp",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高",
        "name": "zg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低",
        "name": "zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "收盘",
        "name": "sp",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌",
        "name": "zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "注意单位: 万手",
        "unit": "万手"
      },
      {
        "title": "成交金额",
        "name": "cjje",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "样本数量",
        "name": "ybsl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "滚动市盈率",
        "name": "gdsyl",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "综合 PMI",
    "name": "zssj_zh_pmi",
    "api": "index_pmi_com_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/pmi",
    "description": "财新数据-指数报告-财新中国 PMI-综合 PMI",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "综合PMI",
        "name": "zhPMI",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化值",
        "name": "bhz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "制造业 PMI",
    "name": "zssj_zzy_pmi",
    "api": "index_pmi_man_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/pmi",
    "description": "财新数据-指数报告-财新中国 PMI-制造业 PMI",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "制造业PMI",
        "name": "zzyPMI",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化值",
        "name": "bhz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "服务业 PMI",
    "name": "zssj_fwy_pmi",
    "api": "index_pmi_ser_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/pmi",
    "description": "财新数据-指数报告-财新中国 PMI-服务业 PMI",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "服务业PMI",
        "name": "fwyPMI",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化值",
        "name": "bhz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "数字经济指数",
    "name": "zssj_szjjzs",
    "api": "index_dei_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/dei",
    "description": "财新指数-数字经济指数",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "数字经济指数",
        "name": "szjjzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化值",
        "name": "bhz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "产业指数",
    "name": "zssj_cyzs",
    "api": "index_ii_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/dei",
    "description": "财新指数-产业指数",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "产业指数",
        "name": "cyzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化值",
        "name": "bhz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "溢出指数",
    "name": "zssj_yczs",
    "api": "index_si_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/dei",
    "description": "财新指数-溢出指数",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "溢出指数",
        "name": "yczs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化值",
        "name": "bhz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "融合指数",
    "name": "zssj_rhzs",
    "api": "index_fi_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/dei",
    "description": "财新指数-融合指数",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "融合指数",
        "name": "rhzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化值",
        "name": "bhz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "基础指数",
    "name": "zssj_jczs",
    "api": "index_bi_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/dei",
    "description": "财新指数-基础指数",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "基础指数",
        "name": "jczs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化值",
        "name": "bhz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "中国新经济指数",
    "name": "zssj_zgxjjzs",
    "api": "index_nei_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/nei",
    "description": "财新指数-中国新经济指数",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "中国新经济指数",
        "name": "zgxjjzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化值",
        "name": "bhz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "劳动力投入指数",
    "name": "zssj_ldltrzs",
    "api": "index_li_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/nei",
    "description": "财新指数-劳动力投入指数",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "劳动力投入指数",
        "name": "ldltrzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化值",
        "name": "bhz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "资本投入指数",
    "name": "zssj_zbtrzs",
    "api": "index_ci_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/nei",
    "description": "财新指数-资本投入指数",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "资本投入指数",
        "name": "zbtrzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化值",
        "name": "bhz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "科技投入指数",
    "name": "zssj_kjtrzs",
    "api": "index_ti_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/nei",
    "description": "财新指数-科技投入指数",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "科技投入指数",
        "name": "kjtrzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化值",
        "name": "bhz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "新经济行业入职平均工资水平",
    "name": "zssj_xjjhyrzpjgzsp",
    "api": "index_neaw_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/nei",
    "description": "财新指数-新经济行业入职平均工资水平",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "新经济行业入职平均工资水平",
        "name": "xjjhyrzpjgzsp",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化值",
        "name": "bhz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "新经济入职工资溢价水平",
    "name": "zssj_xjjrzgzyjsp",
    "api": "index_awpr_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/nei",
    "description": "财新指数-新经济入职工资溢价水平",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "新经济入职工资溢价水平",
        "name": "xjjrzgzyjsp",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化值",
        "name": "bhz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "大宗商品指数",
    "name": "zssj_dzspzs",
    "api": "index_cci_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/nei",
    "description": "财新指数-大宗商品指数",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "大宗商品指数",
        "name": "dzspzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化值",
        "name": "bhz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "高质量因子",
    "name": "zssj_gzlyz",
    "api": "index_qli_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/qli",
    "description": "财新指数-高质量因子",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "高质量因子指数",
        "name": "gzlyzzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化幅度",
        "name": "bhfd",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "AI策略指数",
    "name": "zssj_aiclzs",
    "api": "index_ai_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/ai",
    "description": "财新指数-AI策略指数",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "AI策略指数",
        "name": "AIclzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化幅度",
        "name": "bhfd",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "基石经济指数",
    "name": "zssj_jsjjzs",
    "api": "index_bei_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/bei",
    "description": "财新指数-基石经济指数",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "基石经济指数",
        "name": "jsjjzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化幅度",
        "name": "bhfd",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "新动能指数",
    "name": "zssj_xdnzs",
    "api": "index_neei_cx",
    "targetUrl": "https://yun.ccxe.com.cn/indices/neei",
    "description": "财新指数-新动能指数",
    "remarks": "该接口返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "新动能指数",
        "name": "xdnzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "变化幅度",
        "name": "bhfd",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "指数估值-中证",
    "name": "zssj_zsgz_zz",
    "api": "stock_zh_index_value_csindex",
    "targetUrl": "https://www.csindex.com.cn/zh-CN/indices/index-detail/H30374#/indices/family/detail?indexCode=H30374",
    "description": "中证指数-指数估值数据",
    "remarks": "该接口返回指定的指数的估值数据, 该接口只能返回近期的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"H30374\"; 指数代码",
        "defaultValue": "H30374",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数代码",
        "name": "zsdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数中文全称",
        "name": "zszwqc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数中文简称",
        "name": "zszwjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数英文全称",
        "name": "zsywqc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数英文简称",
        "name": "zsywjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "市盈率1",
        "name": "syl1",
        "type": "float64",
        "description": "注意: （总股本）P/E1",
        "unit": ""
      },
      {
        "title": "市盈率2",
        "name": "syl2",
        "type": "float64",
        "description": "注意: （计算用股本）P/E2",
        "unit": ""
      },
      {
        "title": "股息率1",
        "name": "gxl1",
        "type": "float64",
        "description": "注意: （总股本）D/P1",
        "unit": ""
      },
      {
        "title": "股息率2",
        "name": "gxl2",
        "type": "float64",
        "description": "注意: （计算用股本）D/P2",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "基金指数实时行情",
    "name": "zssj_jjzssshq",
    "api": "index_realtime_fund_sw",
    "targetUrl": "https://www.swsresearch.com/institute_sw/allIndex/releasedIndex",
    "description": "申万宏源研究-申万指数-指数发布-基金指数-实时行情",
    "remarks": "该接口返回指定 symbol 的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"基础一级\"; choice of {\"基础一级\", \"基础二级\", \"基础三级\", \"特色指数\"}",
        "defaultValue": "基础一级",
        "choices": [
          "基础一级",
          "基础二级",
          "基础三级",
          "特色指数"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "指数代码",
        "name": "zsdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数名称",
        "name": "zsmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "昨收盘",
        "name": "zsp",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "日涨跌幅",
        "name": "rzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "年涨跌幅",
        "name": "nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "基金指数历史行情",
    "name": "zssj_jjzslshq",
    "api": "index_hist_fund_sw",
    "targetUrl": "https://www.swsresearch.com/institute_sw/allIndex/releasedIndex/fundDetail?code=807100",
    "description": "申万宏源研究-申万指数-指数发布-基金指数-历史行情",
    "remarks": "该接口返回指定 symbol 的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"807200\"; 基金指数代码",
        "defaultValue": "807200",
        "isRequired": false
      },
      {
        "title": "period",
        "name": "period",
        "type": "str",
        "description": "period=\"day\"; choice of {\"day\", \"week\", \"month\"}",
        "defaultValue": "day",
        "choices": [
          "day",
          "week",
          "month"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "收盘指数",
        "name": "spzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "开盘指数",
        "name": "kpzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高指数",
        "name": "zgzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低指数",
        "name": "zdzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "申万指数实时行情",
    "name": "zssj_swzssshq",
    "api": "index_realtime_sw",
    "targetUrl": "https://www.swsresearch.com/institute_sw/allIndex/releasedIndex",
    "description": "申万宏源研究-指数系列; 注意其中大类风格指数和金创指数的字段",
    "remarks": "该接口返回指定 symbol 的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"市场表征\"; choice of {\"市场表征\", \"一级行业\", \"二级行业\", \"风格指数\", \"大类风格指数\", \"金创指数\"}",
        "defaultValue": "市场表征",
        "choices": [
          "市场表征",
          "一级行业",
          "二级行业",
          "风格指数",
          "大类风格指数",
          "金创指数"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "指数代码",
        "name": "zsdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数名称",
        "name": "zsmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "昨收盘",
        "name": "zsp",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "今开盘",
        "name": "jkp",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新价",
        "name": "zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "注意: 百万元",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "注意: 百万股",
        "unit": ""
      },
      {
        "title": "最高价",
        "name": "zgj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低价",
        "name": "zdj",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "申万指数历史行情",
    "name": "zssj_swzslshq",
    "api": "index_hist_sw",
    "targetUrl": "https://www.swsresearch.com//institute_sw/allIndex/releasedIndex/releasedetail?code=801002&name=申万中小",
    "description": "申万宏源研究-指数发布-指数详情-指数历史数据",
    "remarks": "该接口返回指定 symbol 和 period 的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"801030\"; 指数代码",
        "defaultValue": "801030",
        "isRequired": false
      },
      {
        "title": "period",
        "name": "period",
        "type": "str",
        "description": "period=\"day\"; choice of {\"day\", \"week\", \"month\"}",
        "defaultValue": "day",
        "choices": [
          "day",
          "week",
          "month"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "代码",
        "name": "dm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "收盘",
        "name": "sp",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "开盘",
        "name": "kp",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高",
        "name": "zg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低",
        "name": "zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "申万指数分时行情",
    "name": "zssj_swzsfshq",
    "api": "index_min_sw",
    "targetUrl": "https://www.swsresearch.com//institute_sw/allIndex/releasedIndex/releasedetail?code=801001&name=申万中小",
    "description": "申万宏源研究-指数发布-指数详情-指数分时数据",
    "remarks": "该接口返回指定 symbol 的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"801030\"; 指数代码",
        "defaultValue": "801030",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "代码",
        "name": "dm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "名称",
        "name": "mc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "价格",
        "name": "jg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "时间",
        "name": "sj",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "申万指数成分股",
    "name": "zssj_swzscfg",
    "api": "index_component_sw",
    "targetUrl": "https://www.swsresearch.com//institute_sw/allIndex/releasedIndex/releasedetail?code=801001&name=申万中小",
    "description": "申万宏源研究-指数发布-指数详情-成分股",
    "remarks": "该接口返回指定 symbol 的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"801001\"; 指数代码",
        "defaultValue": "801001",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "序号",
        "name": "xh",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "证券代码",
        "name": "zqdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "证券名称",
        "name": "zqmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新权重",
        "name": "zxqz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "计入日期",
        "name": "jrrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "申万指数分析-日报表",
    "name": "zssj_swzsfx_rbb",
    "api": "index_analysis_daily_sw",
    "targetUrl": "https://www.swsresearch.com//institute_sw/allIndex/analysisIndex",
    "description": "申万宏源研究-指数分析-日报表",
    "remarks": "该接口返回指定参数的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"市场表征\"; choice of {\"市场表征\", \"一级行业\", \"二级行业\", \"风格指数\"}",
        "defaultValue": "市场表征",
        "choices": [
          "市场表征",
          "一级行业",
          "二级行业",
          "风格指数"
        ],
        "isRequired": false
      },
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"20221103\"",
        "defaultValue": "20221103",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"20221103\"",
        "defaultValue": "20221103",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "指数代码",
        "name": "zsdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数名称",
        "name": "zsmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "收盘指数",
        "name": "spzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "注意单位: 亿股",
        "unit": "亿股"
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "换手率",
        "name": "hsl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "市盈率",
        "name": "syl",
        "type": "float64",
        "description": "注意单位: 倍",
        "unit": "倍"
      },
      {
        "title": "市净率",
        "name": "sjl",
        "type": "float64",
        "description": "注意单位: 倍",
        "unit": "倍"
      },
      {
        "title": "均价",
        "name": "jj",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "成交额占比",
        "name": "cjezb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "流通市值",
        "name": "ltsz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "平均流通市值",
        "name": "pjltsz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "股息率",
        "name": "gxl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "申万指数分析-周报表",
    "name": "zssj_swzsfx_zbb",
    "api": "index_analysis_weekly_sw",
    "targetUrl": "https://www.swsresearch.com//institute_sw/allIndex/analysisIndex",
    "description": "申万宏源研究-指数分析-周报表",
    "remarks": "该接口返回指定参数的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"市场表征\"; choice of {\"市场表征\", \"一级行业\", \"二级行业\", \"风格指数\"}",
        "defaultValue": "市场表征",
        "choices": [
          "市场表征",
          "一级行业",
          "二级行业",
          "风格指数"
        ],
        "isRequired": false
      },
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "start_date=\"20221104\"; 通过调用 ak.index_analysis_week_month_sw(date=\"week\") 接口获取",
        "defaultValue": "20221104",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "指数代码",
        "name": "zsdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数名称",
        "name": "zsmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "收盘指数",
        "name": "spzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "注意单位: 亿股",
        "unit": "亿股"
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "换手率",
        "name": "hsl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "市盈率",
        "name": "syl",
        "type": "float64",
        "description": "注意单位: 倍",
        "unit": "倍"
      },
      {
        "title": "市净率",
        "name": "sjl",
        "type": "float64",
        "description": "注意单位: 倍",
        "unit": "倍"
      },
      {
        "title": "均价",
        "name": "jj",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "成交额占比",
        "name": "cjezb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "流通市值",
        "name": "ltsz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "平均流通市值",
        "name": "pjltsz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "股息率",
        "name": "gxl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "申万指数分析-月报表",
    "name": "zssj_swzsfx_ybb",
    "api": "index_analysis_monthly_sw",
    "targetUrl": "https://www.swsresearch.com/institute_sw/allIndex/analysisIndex",
    "description": "申万宏源研究-指数分析-月报表",
    "remarks": "该接口返回指定参数的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"市场表征\"; choice of {\"市场表征\", \"一级行业\", \"二级行业\", \"风格指数\"}",
        "defaultValue": "市场表征",
        "choices": [
          "市场表征",
          "一级行业",
          "二级行业",
          "风格指数"
        ],
        "isRequired": false
      },
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "start_date=\"20221031\"; 通过调用 ak.index_analysis_week_month_sw(date=\"month\") 接口获取",
        "defaultValue": "20221031",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "指数代码",
        "name": "zsdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "指数名称",
        "name": "zsmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "收盘指数",
        "name": "spzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "注意单位: 亿股",
        "unit": "亿股"
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "换手率",
        "name": "hsl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "市盈率",
        "name": "syl",
        "type": "float64",
        "description": "注意单位: 倍",
        "unit": "倍"
      },
      {
        "title": "市净率",
        "name": "sjl",
        "type": "float64",
        "description": "注意单位: 倍",
        "unit": "倍"
      },
      {
        "title": "均价",
        "name": "jj",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "成交额占比",
        "name": "cjezb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "流通市值",
        "name": "ltsz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "平均流通市值",
        "name": "pjltsz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "股息率",
        "name": "gxl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "指数数据",
    "moduleName": "index",
    "title": "A 股新闻情绪指数",
    "name": "zssj_a_gxwqxzs",
    "api": "index_news_sentiment_scope",
    "targetUrl": "https://www.chinascope.com/reasearch.html",
    "description": "数库-A股新闻情绪指数",
    "remarks": "该接口返回近一年的 A 股新闻情绪指数数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "市场情绪指数",
        "name": "scqxzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "沪深300指数",
        "name": "hs300zs",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  }
];

/**
 * 根据API名称获取接口定义
 * @param apiName API名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByApi(apiName: string): ApiInterface | undefined {
  return indexInterfaces.find(item => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return indexInterfaces.find(item => item.name === name);
}

export default indexInterfaces;
