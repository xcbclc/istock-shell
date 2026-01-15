/**
 * @fileoverview interest_rate AKShare接口定义
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
 * interest_rate接口数据
 */
export const interest_rateInterfaces: ApiInterface[] = [
  {
    "moduleTitle": "利率数据",
    "moduleName": "interest_rate",
    "title": "美联储利率决议报告",
    "name": "ll_mlclljybg",
    "api": "macro_bank_usa_interest_rate",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_interest_rate_decision",
    "description": "美联储利率决议报告, 数据区间从 19820927-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
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
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "利率数据",
    "moduleName": "interest_rate",
    "title": "欧洲央行决议报告",
    "name": "ll_ozyxjybg",
    "api": "macro_bank_euro_interest_rate",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_interest_rate_decision",
    "description": "欧洲央行决议报告, 数据区间从 19990101-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
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
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "利率数据",
    "moduleName": "interest_rate",
    "title": "新西兰联储决议报告",
    "name": "ll_xxllcjybg",
    "api": "macro_bank_newzealand_interest_rate",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_newzealand_interest_rate_decision",
    "description": "新西兰联储决议报告, 数据区间从 19990401-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
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
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "利率数据",
    "moduleName": "interest_rate",
    "title": "中国央行决议报告",
    "name": "ll_zgyxjybg",
    "api": "macro_bank_china_interest_rate",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_china_interest_rate_decision",
    "description": "中国央行决议报告, 数据区间从 19910105-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
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
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "利率数据",
    "moduleName": "interest_rate",
    "title": "瑞士央行利率决议报告",
    "name": "ll_rsyxlljybg",
    "api": "macro_bank_switzerland_interest_rate",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_switzerland_interest_rate_decision",
    "description": "瑞士央行利率决议报告, 数据区间从 20080313-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
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
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "利率数据",
    "moduleName": "interest_rate",
    "title": "英国央行决议报告",
    "name": "ll_ygyxjybg",
    "api": "macro_bank_english_interest_rate",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_english_interest_rate_decision",
    "description": "英国央行决议报告, 数据区间从 19700101-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
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
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "利率数据",
    "moduleName": "interest_rate",
    "title": "澳洲联储决议报告",
    "name": "ll_azlcjybg",
    "api": "macro_bank_australia_interest_rate",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_australia_interest_rate_decision",
    "description": "澳洲联储决议报告, 数据区间从 19800201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
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
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "利率数据",
    "moduleName": "interest_rate",
    "title": "日本利率决议报告",
    "name": "ll_rblljybg",
    "api": "macro_bank_japan_interest_rate",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_japan_interest_rate_decision",
    "description": "日本利率决议报告, 数据区间从 20080214-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
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
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "利率数据",
    "moduleName": "interest_rate",
    "title": "俄罗斯利率决议报告",
    "name": "ll_elslljybg",
    "api": "macro_bank_russia_interest_rate",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_russia_interest_rate_decision",
    "description": "俄罗斯利率决议报告, 数据区间从 20030601-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
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
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "利率数据",
    "moduleName": "interest_rate",
    "title": "印度利率决议报告",
    "name": "ll_ydlljybg",
    "api": "macro_bank_india_interest_rate",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_india_interest_rate_decision",
    "description": "印度利率决议报告, 数据区间从 20000801-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
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
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "利率数据",
    "moduleName": "interest_rate",
    "title": "巴西利率决议报告",
    "name": "ll_bxlljybg",
    "api": "macro_bank_brazil_interest_rate",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_brazil_interest_rate_decision",
    "description": "巴西利率决议报告, 数据区间从20080201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
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
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "利率数据",
    "moduleName": "interest_rate",
    "title": "银行间拆借利率",
    "name": "ll_yhjcjll",
    "api": "rate_interbank",
    "targetUrl": "https://data.eastmoney.com/shibor/shibor.aspx?m=sg&t=88&d=99333&cu=sgd&type=009065&p=79",
    "description": "东方财富-拆借利率一览-具体市场的具体品种的具体指标的拆借利率数据",
    "remarks": "返回所有历史数据",
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
        "title": "利率",
        "name": "ll",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "涨跌",
        "name": "zd",
        "type": "float64",
        "description": "注意单位: BP",
        "unit": "BP"
      }
    ]
  },
  {
    "moduleTitle": "利率数据",
    "moduleName": "interest_rate",
    "title": "回购定盘利率-历史",
    "name": "ll_hgdpll_ls",
    "api": "repo_rate_hist",
    "targetUrl": "https://www.chinamoney.com.cn/chinese/bkfrr/",
    "description": "回购定盘利率数据",
    "remarks": "单次返回指定日期间(一年)的所有历史数据",
    "inputParameters": [
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"20200930\"; 开始时间与结束时间需要在一年内",
        "defaultValue": "20200930",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"20201029\"; 开始时间与结束时间需要在一年内",
        "defaultValue": "20201029",
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
        "title": "FR001",
        "name": "FR001",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "FR007",
        "name": "FR007",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "FR014",
        "name": "FR014",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "FDR001",
        "name": "FDR001",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "FDR007",
        "name": "FDR007",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "FDR014",
        "name": "FDR014",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "利率数据",
    "moduleName": "interest_rate",
    "title": "回购定盘利率-近期",
    "name": "ll_hgdpll_jq",
    "api": "repo_rate_query",
    "targetUrl": "https://www.chinamoney.com.cn/chinese/bkfrr/",
    "description": "回购定盘利率数据",
    "remarks": "单次返回指定 symbol 的近期数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"回购定盘利率\"; choice of {\"回购定盘利率\", \"银银间回购定盘利率\"}",
        "defaultValue": "回购定盘利率",
        "choices": [
          "回购定盘利率",
          "银银间回购定盘利率"
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
        "title": "FR001",
        "name": "FR001",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "FR007",
        "name": "FR007",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "FR014",
        "name": "FR014",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
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
  return interest_rateInterfaces.find(item => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return interest_rateInterfaces.find(item => item.name === name);
}

export default interest_rateInterfaces;
