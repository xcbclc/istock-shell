/**
 * @fileoverview bank AKShare接口定义
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
 * bank接口数据
 */
export const bankInterfaces: ApiInterface[] = [
  {
    "moduleTitle": "银行数据",
    "moduleName": "bank",
    "title": "银保监分局本级行政处罚",
    "name": "ybjfjbjxzcf",
    "api": "bank_fjcf_table_detail",
    "targetUrl": "https://www.cbirc.gov.cn/cn/view/pages/ItemDetail.html?docId=881574&itemId=4115&generaltype=9",
    "description": "首页-政务信息-行政处罚-银保监分局本级-XXXX行政处罚信息公开表, 是信息公开表不是处罚决定书书",
    "remarks": "单次返回银保监分局本级行政处罚中的指定页数的所有表格数据",
    "inputParameters": [
      {
        "title": "page",
        "name": "page",
        "type": "int",
        "description": "page=5; 获取前 5 页数据, 并返回处理好后的数据框",
        "defaultValue": 5,
        "isRequired": false
      },
      {
        "title": "item",
        "name": "item",
        "type": "int",
        "description": "item=\"分局本级\"; choice of {\"机关\", \"本级\", \"分局本级\"}",
        "defaultValue": "分局本级",
        "choices": [
          "机关",
          "本级",
          "分局本级"
        ],
        "isRequired": false
      },
      {
        "title": "begin",
        "name": "begin",
        "type": "int",
        "description": "begin=1; 开始页面",
        "defaultValue": 1,
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "行政处罚决定书文号",
        "name": "xzcfjdswh",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "姓名",
        "name": "xm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "单位",
        "name": "dw",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "单位名称",
        "name": "dwmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "主要负责人姓名",
        "name": "zyfzrxm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "主要违法违规事实（案由）",
        "name": "zywfwgss（ay）",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "行政处罚依据",
        "name": "xzcfyj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "行政处罚决定",
        "name": "xzcfjd",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "作出处罚决定的机关名称",
        "name": "zccfjddjgmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "作出处罚决定的日期",
        "name": "zccfjddrq",
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
  return bankInterfaces.find(item => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return bankInterfaces.find(item => item.name === name);
}

export default bankInterfaces;
