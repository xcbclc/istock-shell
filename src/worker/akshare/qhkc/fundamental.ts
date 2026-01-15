/**
 * @fileoverview fundamental AKShare接口定义
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
 * fundamental接口数据
 */
export const fundamentalInterfaces: ApiInterface[] = [
  {
    "moduleTitle": "基本面",
    "moduleName": "fundamental",
    "title": "基差数据",
    "name": "jbm_jcsj",
    "api": "basis",
    "description": "基差数据接口",
    "inputParameters": [
      {
        "title": "variety",
        "name": "variety",
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
        "title": "spot",
        "name": "spot",
        "type": "float",
        "description": "现货价格",
        "unit": ""
      },
      {
        "title": "basis",
        "name": "basis",
        "type": "float",
        "description": "基差，基差 = 现货价格 - 期货价格",
        "unit": ""
      },
      {
        "title": "basis_rate",
        "name": "basis_rate",
        "type": "float",
        "description": "基差率，基差率 = (现货价格 - 期货价格) / 现货价格 x 100%",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "基本面",
    "moduleName": "fundamental",
    "title": "期限结构",
    "name": "jbm_qxjg",
    "api": "term_structure",
    "description": "期限结构接口",
    "inputParameters": [
      {
        "title": "variety",
        "name": "variety",
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
        "title": "code",
        "name": "code",
        "type": "string",
        "description": "合约代号",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float",
        "description": "收盘价",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "基本面",
    "moduleName": "fundamental",
    "title": "利润数据",
    "name": "jbm_lrsj",
    "api": "profit",
    "description": "利润数据接口",
    "inputParameters": [
      {
        "title": "variety",
        "name": "variety",
        "type": "品种编码",
        "description": "RB",
        "isRequired": true
      },
      {
        "title": "date",
        "name": "date",
        "type": "查询日期",
        "description": "2018-12-08",
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
        "title": "profit",
        "name": "profit",
        "type": "float",
        "description": "利润，折盘面价格",
        "unit": ""
      },
      {
        "title": "profit_rate",
        "name": "profit_rate",
        "type": "float",
        "description": "利润率",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "基本面",
    "moduleName": "fundamental",
    "title": "现货贸易商报价",
    "name": "jbm_xhmysbj",
    "api": "trader_prices",
    "description": "现货贸易商报价接口",
    "inputParameters": [
      {
        "title": "variety",
        "name": "variety",
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
        "title": "price",
        "name": "price",
        "type": "float",
        "description": "贸易商报价",
        "unit": ""
      },
      {
        "title": "band",
        "name": "band",
        "type": "string",
        "description": "品牌",
        "unit": ""
      },
      {
        "title": "model",
        "name": "model",
        "type": "string",
        "description": "型号、规格",
        "unit": ""
      },
      {
        "title": "unit",
        "name": "unit",
        "type": "string",
        "description": "单位",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "基本面",
    "moduleName": "fundamental",
    "title": "跨期套利数据",
    "name": "jbm_kqtlsj",
    "api": "intertemporal_arbitrage",
    "description": "跨期套利数据接口",
    "inputParameters": [
      {
        "title": "variety",
        "name": "variety",
        "type": "品种编码",
        "description": "RB",
        "isRequired": true
      },
      {
        "title": "code1",
        "name": "code1",
        "type": "合约月份1",
        "description": "01",
        "isRequired": true
      },
      {
        "title": "code2",
        "name": "code2",
        "type": "合约月份2",
        "description": "05",
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
        "title": "code1",
        "name": "code1",
        "type": "string",
        "description": "合约1",
        "unit": ""
      },
      {
        "title": "code2",
        "name": "code2",
        "type": "string",
        "description": "合约2",
        "unit": ""
      },
      {
        "title": "close1",
        "name": "close1",
        "type": "float",
        "description": "合约1价格",
        "unit": ""
      },
      {
        "title": "close2",
        "name": "close2",
        "type": "float",
        "description": "合约2价格",
        "unit": ""
      },
      {
        "title": "spread",
        "name": "spread",
        "type": "float",
        "description": "价差，合约1价格 - 合约2价格",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "基本面",
    "moduleName": "fundamental",
    "title": "自由价差数据",
    "name": "jbm_zyjcsj",
    "api": "free_spread",
    "description": "自由价差数据接口",
    "inputParameters": [
      {
        "title": "variety1",
        "name": "variety1",
        "type": "品种编码1",
        "description": "RB",
        "isRequired": true
      },
      {
        "title": "code1",
        "name": "code1",
        "type": "合约月份1",
        "description": "01",
        "isRequired": true
      },
      {
        "title": "variety2",
        "name": "variety2",
        "type": "品种编码2",
        "description": "HC",
        "isRequired": true
      },
      {
        "title": "code2",
        "name": "code2",
        "type": "合约月份2",
        "description": "01",
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
        "type": "string",
        "description": "查询日期",
        "unit": ""
      },
      {
        "title": "code1",
        "name": "code1",
        "type": "string",
        "description": "合约代号1",
        "unit": ""
      },
      {
        "title": "code2",
        "name": "code2",
        "type": "string",
        "description": "合约代号2",
        "unit": ""
      },
      {
        "title": "code1_close",
        "name": "code1_close",
        "type": "float",
        "description": "合约1价格",
        "unit": ""
      },
      {
        "title": "code2_close",
        "name": "code2_close",
        "type": "float",
        "description": "合约2价格",
        "unit": ""
      },
      {
        "title": "spread",
        "name": "spread",
        "type": "float",
        "description": "价差，合约1价格 - 合约2价格",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "基本面",
    "moduleName": "fundamental",
    "title": "自由价比数据",
    "name": "jbm_zyjbsj",
    "api": "free_ratio",
    "description": "自由价比数据接口",
    "inputParameters": [
      {
        "title": "variety1",
        "name": "variety1",
        "type": "品种编码1",
        "description": "RB",
        "isRequired": true
      },
      {
        "title": "code1",
        "name": "code1",
        "type": "合约月份1",
        "description": "01",
        "isRequired": true
      },
      {
        "title": "variety2",
        "name": "variety2",
        "type": "品种编码2",
        "description": "HC",
        "isRequired": true
      },
      {
        "title": "code2",
        "name": "code2",
        "type": "合约月份2",
        "description": "01",
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
        "type": "string",
        "description": "查询日期",
        "unit": ""
      },
      {
        "title": "code1",
        "name": "code1",
        "type": "string",
        "description": "合约代号1",
        "unit": ""
      },
      {
        "title": "code2",
        "name": "code2",
        "type": "string",
        "description": "合约代号2",
        "unit": ""
      },
      {
        "title": "code1_close",
        "name": "code1_close",
        "type": "float",
        "description": "合约1价格",
        "unit": ""
      },
      {
        "title": "code2_close",
        "name": "code2_close",
        "type": "float",
        "description": "合约2价格",
        "unit": ""
      },
      {
        "title": "ratio",
        "name": "ratio",
        "type": "float",
        "description": "价比，合约1价格 / 合约2价格",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "基本面",
    "moduleName": "fundamental",
    "title": "仓单数据",
    "name": "jbm_cdsj",
    "api": "warehouse_receipt",
    "description": "仓单数据接口",
    "inputParameters": [
      {
        "title": "variety",
        "name": "variety",
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
        "title": "total_vol",
        "name": "total_vol",
        "type": "float",
        "description": "仓单数据",
        "unit": ""
      },
      {
        "title": "total_chge",
        "name": "total_chge",
        "type": "float",
        "description": "仓单变化量",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "基本面",
    "moduleName": "fundamental",
    "title": "仓单汇总数据",
    "name": "jbm_cdhzsj",
    "api": "warehouse_receipt",
    "description": "仓单汇总数据接口",
    "inputParameters": [
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
        "title": "symbol",
        "name": "symbol",
        "type": "string",
        "description": "品种编码",
        "unit": ""
      },
      {
        "title": "total_vol",
        "name": "total_vol",
        "type": "float",
        "description": "仓单数据",
        "unit": ""
      },
      {
        "title": "total_chge",
        "name": "total_chge",
        "type": "float",
        "description": "仓单变化量",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "基本面",
    "moduleName": "fundamental",
    "title": "虚实盘比数据",
    "name": "jbm_xspbsj",
    "api": "virtual_real",
    "description": "虚实盘比数据接口",
    "inputParameters": [
      {
        "title": "variety",
        "name": "variety",
        "type": "品种编码",
        "description": "RB",
        "isRequired": true
      },
      {
        "title": "code",
        "name": "code",
        "type": "合约月份",
        "description": "10",
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
        "title": "code",
        "name": "code",
        "type": "string",
        "description": "合约代号",
        "unit": ""
      },
      {
        "title": "virtual",
        "name": "virtual",
        "type": "float",
        "description": "虚盘量",
        "unit": ""
      },
      {
        "title": "real",
        "name": "real",
        "type": "float",
        "description": "实盘量",
        "unit": ""
      },
      {
        "title": "rate",
        "name": "rate",
        "type": "float",
        "description": "虚实盘比",
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
  return fundamentalInterfaces.find(item => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return fundamentalInterfaces.find(item => item.name === name);
}

export default fundamentalInterfaces;
