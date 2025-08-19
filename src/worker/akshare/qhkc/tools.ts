/**
 * @fileoverview tools AKShare接口定义
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
 * tools接口数据
 */
export const toolsInterfaces: ApiInterface[] = [
  {
    "moduleTitle": "工具",
    "moduleName": "tools",
    "title": "龙虎牛熊多头合约池",
    "name": "lhnxdthyc",
    "api": "long_pool",
    "description": "龙虎牛熊多头合约池接口",
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
        "title": "code",
        "name": "code",
        "type": "string",
        "description": "合约代号",
        "unit": ""
      }
    ],
    "remarks": "",
    "targetUrl": ""
  },
  {
    "moduleTitle": "工具",
    "moduleName": "tools",
    "title": "龙虎牛熊空头合约池",
    "name": "lhnxkthyc",
    "api": "short_pool",
    "description": "龙虎牛熊空头合约池",
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
        "title": "code",
        "name": "code",
        "type": "string",
        "description": "合约代号",
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
  return toolsInterfaces.find(item => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return toolsInterfaces.find(item => item.name === name);
}

export default toolsInterfaces;
