/**
 * @fileoverview hf AKShare接口定义
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
 * hf接口数据
 */
export const hfInterfaces: ApiInterface[] = [
  {
    moduleTitle: '高频数据',
    moduleName: 'hf',
    title: '标普 500 指数',
    name: 'bp_500_zs',
    api: 'hf_sp_500',
    targetUrl: 'https://github.com/FutureSharks/financial-data',
    description: '获取标普 500 指数的分钟数据, 由于数据量比较大, 需要等待, 由于服务器在国外, 建议使用代理访问',
    remarks: '',
    inputParameters: [
      {
        title: 'year',
        name: 'year',
        type: 'str',
        description: 'year="2017"; 只能获取 **2012-2018** 年的数据',
        defaultValue: '2017',
        isRequired: false,
      },
    ],
    outputParameters: [
      {
        title: 'date',
        name: 'date',
        type: 'object',
        description: '日期时间',
        unit: '',
      },
      {
        title: 'open',
        name: 'open',
        type: 'float64',
        description: '开盘价',
        unit: '',
      },
      {
        title: 'high',
        name: 'high',
        type: 'float64',
        description: '最高价',
        unit: '',
      },
      {
        title: 'low',
        name: 'low',
        type: 'float64',
        description: '最低价',
        unit: '',
      },
      {
        title: 'close',
        name: 'close',
        type: 'float64',
        description: '收盘价',
        unit: '',
      },
    ],
  },
];

/**
 * 根据API名称获取接口定义
 * @param apiName API名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByApi(apiName: string): ApiInterface | undefined {
  return hfInterfaces.find((item) => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return hfInterfaces.find((item) => item.name === name);
}

export default hfInterfaces;
