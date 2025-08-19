/**
 * @fileoverview currency AKShare接口定义
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
 * currency接口数据
 */
export const currencyInterfaces: ApiInterface[] = [
  {
    "moduleTitle": "货币数据",
    "moduleName": "currency",
    "title": "货币报价最新数据",
    "name": "hbbjzxsj",
    "api": "currency_latest",
    "targetUrl": "https://currencyscoop.com/",
    "description": "货币报价最新数据",
    "remarks": "单次返回指定货币的最新报价数据",
    "inputParameters": [
      {
        "title": "base",
        "name": "base",
        "type": "str",
        "description": "base=\"USD\"",
        "defaultValue": "USD",
        "isRequired": false
      },
      {
        "title": "symbols",
        "name": "symbols",
        "type": "str",
        "description": "symbols=\"\"; 默认返回全部, 可以在此处设置 symbols=\"AUD\", 则返回 AUD 的数据; 可以在此处设置 symbols: str = \"AUD,CNY\", 则返回 AUD 和 CNY 的数据",
        "defaultValue": "",
        "isRequired": false
      },
      {
        "title": "api_key",
        "name": "api_key",
        "type": "str",
        "description": "api_key=\"此处输入 API\";",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "currency",
        "name": "currency",
        "type": "object",
        "description": "货币代码",
        "unit": ""
      },
      {
        "title": "date",
        "name": "date",
        "type": "datetime64[ns, UTC]",
        "description": "日期时间-注意时区",
        "unit": ""
      },
      {
        "title": "base",
        "name": "base",
        "type": "object",
        "description": "货币",
        "unit": ""
      },
      {
        "title": "rates",
        "name": "rates",
        "type": "float64",
        "description": "比率",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "货币数据",
    "moduleName": "currency",
    "title": "货币报价历史数据",
    "name": "hbbjlssj",
    "api": "currency_history",
    "targetUrl": "https://currencyscoop.com/",
    "description": "货币报价历史数据",
    "remarks": "单次返回指定货币在指定交易日的报价历史数据-免费账号每月限量访问 5000 次",
    "inputParameters": [
      {
        "title": "base",
        "name": "base",
        "type": "str",
        "description": "base=\"USD\"",
        "defaultValue": "USD",
        "isRequired": false
      },
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"2023-02-03\"",
        "defaultValue": "2023-02-03",
        "isRequired": false
      },
      {
        "title": "symbols",
        "name": "symbols",
        "type": "str",
        "description": "symbols=\"\"; 默认返回全部, 可以在此处设置 symbols=\"AUD\", 则返回 AUD 的数据; 可以在此处设置 symbols: str = \"AUD,CNY\", 则返回 AUD 和 CNY 的数据",
        "defaultValue": "",
        "isRequired": false
      },
      {
        "title": "api_key",
        "name": "api_key",
        "type": "str",
        "description": "api_key=\"此处输入 API\";",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "currency",
        "name": "currency",
        "type": "object",
        "description": "货币代码",
        "unit": ""
      },
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "日期",
        "unit": ""
      },
      {
        "title": "base",
        "name": "base",
        "type": "float64",
        "description": "货币",
        "unit": ""
      },
      {
        "title": "rates",
        "name": "rates",
        "type": "float64",
        "description": "比率",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "货币数据",
    "moduleName": "currency",
    "title": "货币报价时间序列数据",
    "name": "hbbjsjxlsj",
    "api": "currency_time_series",
    "targetUrl": "https://currencyscoop.com/",
    "description": "货币报价时间序列数据",
    "remarks": "单次返回指定货币在指定交易日到另一指定交易日的报价数据",
    "inputParameters": [
      {
        "title": "base",
        "name": "base",
        "type": "str",
        "description": "base=\"USD\"",
        "defaultValue": "USD",
        "isRequired": false
      },
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"2023-02-03\"",
        "defaultValue": "2023-02-03",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"2023-03-04\"",
        "defaultValue": "2023-03-04",
        "isRequired": false
      },
      {
        "title": "symbols",
        "name": "symbols",
        "type": "str",
        "description": "symbols=\"\"; 默认返回全部, 可以在此处设置 symbols=\"AUD\", 则返回 AUD 的数据; 可以在此处设置 symbols: str = \"AUD,CNY\", 则返回 AUD 和 CNY 的数据",
        "defaultValue": "",
        "isRequired": false
      },
      {
        "title": "api_key",
        "name": "api_key",
        "type": "str",
        "description": "api_key=\"此处输入 API\";",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "日期",
        "unit": ""
      },
      {
        "title": "...",
        "name": "...",
        "type": "float64",
        "description": "货币价格数据",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "货币数据",
    "moduleName": "currency",
    "title": "货币基础信息查询",
    "name": "hbjcxxcx",
    "api": "currency_currencies",
    "targetUrl": "https://currencyscoop.com/",
    "description": "所有货币的基础信息",
    "remarks": "单次返回指定所有货币基础信息",
    "inputParameters": [
      {
        "title": "c_type",
        "name": "c_type",
        "type": "str",
        "description": "c_type=\"fiat\"",
        "defaultValue": "fiat",
        "isRequired": false
      },
      {
        "title": "api_key",
        "name": "api_key",
        "type": "str",
        "description": "api_key=\"此处输入 API\";",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "id",
        "name": "id",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "name",
        "name": "name",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "short_code",
        "name": "short_code",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "code",
        "name": "code",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "precision",
        "name": "precision",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "subunit",
        "name": "subunit",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "symbol",
        "name": "symbol",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "symbol_first",
        "name": "symbol_first",
        "type": "bool",
        "description": "",
        "unit": ""
      },
      {
        "title": "decimal_mark",
        "name": "decimal_mark",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "thousands_separator",
        "name": "thousands_separator",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "货币数据",
    "moduleName": "currency",
    "title": "货币对价格转换",
    "name": "hbdjgzh",
    "api": "currency_convert",
    "targetUrl": "https://currencyscoop.com/",
    "description": "指定货币对指定货币数量的转换后价格",
    "remarks": "单次返回指定货币对的转换后价格",
    "inputParameters": [
      {
        "title": "base",
        "name": "base",
        "type": "str",
        "description": "base=\"USD\"; 基础货币",
        "defaultValue": "USD",
        "isRequired": false
      },
      {
        "title": "to",
        "name": "to",
        "type": "str",
        "description": "to=\"CNY\"; 需要转换到的货币",
        "defaultValue": "CNY",
        "isRequired": false
      },
      {
        "title": "amount",
        "name": "amount",
        "type": "str",
        "description": "amount=\"10000\"; 转换量",
        "defaultValue": "10000",
        "isRequired": false
      },
      {
        "title": "api_key",
        "name": "api_key",
        "type": "str",
        "description": "api_key=\"此处输入 API\";",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "item",
        "name": "item",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "value",
        "name": "value",
        "type": "object",
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
  return currencyInterfaces.find(item => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return currencyInterfaces.find(item => item.name === name);
}

export default currencyInterfaces;
