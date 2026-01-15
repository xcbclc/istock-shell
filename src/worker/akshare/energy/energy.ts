/**
 * @fileoverview energy AKShare接口定义
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
 * energy接口数据
 */
export const energyInterfaces: ApiInterface[] = [
  {
    "moduleTitle": "能源数据",
    "moduleName": "energy",
    "title": "碳排放权-国内",
    "name": "ny_tpfq_gn",
    "api": "energy_carbon_domestic",
    "targetUrl": "http://www.tanjiaoyi.com/",
    "description": "碳交易网-行情信息",
    "remarks": "返回指定 symbol 的所有历史数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"湖北\"; choice of {'湖北', '上海', '北京', '重庆', '广东', '天津', '深圳', '福建'}",
        "defaultValue": "湖北",
        "choices": [
          "湖北",
          "上海",
          "北京",
          "重庆",
          "广东",
          "天津",
          "深圳",
          "福建"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "成交价",
        "name": "cjj",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
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
        "description": "",
        "unit": ""
      },
      {
        "title": "地点",
        "name": "dd",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "能源数据",
    "moduleName": "energy",
    "title": "碳排放权-北京",
    "name": "ny_tpfq_bj",
    "api": "energy_carbon_bj",
    "targetUrl": "https://www.bjets.com.cn/article/jyxx/",
    "description": "北京市碳排放权电子交易平台-北京市碳排放权公开交易行情",
    "remarks": "全部历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "成交量",
        "name": "cjl",
        "type": "int64",
        "description": "注意单位: 吨",
        "unit": "吨"
      },
      {
        "title": "成交均价",
        "name": "cjjj",
        "type": "float64",
        "description": "注意单位: 元/吨",
        "unit": "元/吨"
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "成交单位",
        "name": "cjdw",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "能源数据",
    "moduleName": "energy",
    "title": "碳排放权-深圳",
    "name": "ny_tpfq_sz",
    "api": "energy_carbon_sz",
    "targetUrl": "http://www.cerx.cn/dailynewsCN/index.htm",
    "description": "深圳碳排放交易所-国内碳情",
    "remarks": "全部历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "交易日期",
        "name": "jyrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "市场交易指数",
        "name": "scjyzs",
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
        "title": "成交均价",
        "name": "cjjj",
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
        "title": "成交量",
        "name": "cjl",
        "type": "int64",
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
    "moduleTitle": "能源数据",
    "moduleName": "energy",
    "title": "碳排放权-国际",
    "name": "ny_tpfq_gj",
    "api": "energy_carbon_eu",
    "targetUrl": "http://www.cerx.cn/dailynewsOuter/index.htm",
    "description": "深圳碳排放交易所-国际碳情",
    "remarks": "返回从 2018-03-13 至 2020-04-29 的所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "交易日期",
        "name": "jyrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "市场交易指数",
        "name": "scjyzs",
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
        "title": "成交均价",
        "name": "cjjj",
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
        "title": "成交量",
        "name": "cjl",
        "type": "int64",
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
    "moduleTitle": "能源数据",
    "moduleName": "energy",
    "title": "碳排放权-湖北",
    "name": "ny_tpfq_hb",
    "api": "energy_carbon_hb",
    "targetUrl": "http://www.cerx.cn/dailynewsOuter/index.htm",
    "description": "湖北碳排放权交易中心-碳排放权交易数据",
    "remarks": "返回从 2014-04-02 至今的所有历史数据",
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
        "title": "成交价",
        "name": "cjj",
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
        "title": "最新",
        "name": "zx",
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
      }
    ]
  },
  {
    "moduleTitle": "能源数据",
    "moduleName": "energy",
    "title": "碳排放权-广州",
    "name": "ny_tpfq_gz",
    "api": "energy_carbon_gz",
    "targetUrl": "http://www.cnemission.com/article/hqxx/",
    "description": "广州碳排放权交易中心-行情信息",
    "remarks": "该接口返回从 2013-12-19 至今的所有历史数据",
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
        "title": "品种",
        "name": "pz",
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
        "title": "收盘价",
        "name": "spj",
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
        "title": "成交数量",
        "name": "cjsl",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交金额",
        "name": "cjje",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "能源数据",
    "moduleName": "energy",
    "title": "汽柴油历史调价信息",
    "name": "ny_qcylstjxx",
    "api": "energy_oil_hist",
    "targetUrl": "https://data.eastmoney.com/cjsj/oil_default.html",
    "description": "东方财富-数据中心-中国油价-汽柴油历史调价信息",
    "remarks": "单次返回中国油价的所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "调整日期",
        "name": "tzrq",
        "type": "object",
        "description": "价格调整的日期",
        "unit": ""
      },
      {
        "title": "汽油价格",
        "name": "qyjg",
        "type": "int64",
        "description": "注意单位: 元/吨",
        "unit": "元/吨"
      },
      {
        "title": "柴油价格",
        "name": "cyjg",
        "type": "int64",
        "description": "注意单位: 元/吨",
        "unit": "元/吨"
      },
      {
        "title": "汽油涨幅",
        "name": "qyzf",
        "type": "float64",
        "description": "注意单位: 元/吨",
        "unit": "元/吨"
      },
      {
        "title": "柴油涨幅",
        "name": "cyzf",
        "type": "float64",
        "description": "注意单位: 元/吨",
        "unit": "元/吨"
      }
    ]
  },
  {
    "moduleTitle": "能源数据",
    "moduleName": "energy",
    "title": "地区油价",
    "name": "ny_dqyj",
    "api": "energy_oil_detail",
    "targetUrl": "https://data.eastmoney.com/cjsj/oil_default.html",
    "description": "东方财富-数据中心-中国油价-地区油价",
    "remarks": "返回指定调价日的全国各地区的油价的历史数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20200319\"; 此日期为调价日期, 通过调用 ak.energy_oil_hist() 可以获取历史调价日期",
        "defaultValue": "20200319",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "价格调整的日期",
        "unit": ""
      },
      {
        "title": "地区",
        "name": "dq",
        "type": "object",
        "description": "地区",
        "unit": ""
      },
      {
        "title": "V_0",
        "name": "V_0",
        "type": "float64",
        "description": "0#柴油价格(单位:元/升)",
        "unit": ""
      },
      {
        "title": "V_92",
        "name": "V_92",
        "type": "float64",
        "description": "92#汽油价格(单位:元/升)",
        "unit": ""
      },
      {
        "title": "V_95",
        "name": "V_95",
        "type": "float64",
        "description": "95#汽油价格(单位:元/升)",
        "unit": ""
      },
      {
        "title": "V_89",
        "name": "V_89",
        "type": "float64",
        "description": "89#汽油价格(单位:元/升)",
        "unit": ""
      },
      {
        "title": "ZDE_0",
        "name": "ZDE_0",
        "type": "float64",
        "description": "0#柴油涨幅(单位:元/升)",
        "unit": ""
      },
      {
        "title": "ZDE_92",
        "name": "ZDE_92",
        "type": "float64",
        "description": "92#汽油涨幅(单位:元/升)",
        "unit": ""
      },
      {
        "title": "ZDE_95",
        "name": "ZDE_95",
        "type": "float64",
        "description": "95#汽油涨幅(单位:元/升)",
        "unit": ""
      },
      {
        "title": "ZDE_89",
        "name": "ZDE_89",
        "type": "float64",
        "description": "89#汽油涨幅(单位:元/升)",
        "unit": ""
      },
      {
        "title": "QE_0",
        "name": "QE_0",
        "type": "float64",
        "description": "上一次调整时0#柴油价格(单位:元/升)",
        "unit": ""
      },
      {
        "title": "QE_92",
        "name": "QE_92",
        "type": "float64",
        "description": "上一次调整时92#汽油价格(单位:元/升)",
        "unit": ""
      },
      {
        "title": "QE_95",
        "name": "QE_95",
        "type": "float64",
        "description": "上一次调整时95#汽油价格(单位:元/升)",
        "unit": ""
      },
      {
        "title": "QE_89",
        "name": "QE_89",
        "type": "float64",
        "description": "上一次调整时89#汽油价格(单位:元/升)",
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
  return energyInterfaces.find(item => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return energyInterfaces.find(item => item.name === name);
}

export default energyInterfaces;
