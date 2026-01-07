/**
 * @fileoverview qdii AKShare接口定义
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
 * qdii接口数据
 */
export const qdiiInterfaces: ApiInterface[] = [
  {
    moduleTitle: 'QDII 数据',
    moduleName: 'qdii',
    title: '欧美指数',
    name: 'qdii_omzs',
    api: 'qdii_e_index_jsl',
    targetUrl: 'https://www.jisilu.cn/data/qdii/#qdiia',
    description: '集思录-T+0 QDII-欧美市场-欧美指数',
    remarks: '单次返回所有数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '成交',
        name: 'cj',
        type: 'float64',
        description: '注意单位: 万元',
        unit: '万元',
      },
      {
        title: '场内份额',
        name: 'cnfe',
        type: 'int64',
        description: '注意单位: 万份',
        unit: '万份',
      },
      {
        title: '场内新增',
        name: 'cnxz',
        type: 'int64',
        description: '注意单位: 万份',
        unit: '万份',
      },
    ],
  },
  {
    moduleTitle: 'QDII 数据',
    moduleName: 'qdii',
    title: '欧美商品',
    name: 'qdii_omsp',
    api: 'qdii_e_comm_jsl',
    targetUrl: 'https://www.jisilu.cn/data/qdii/#qdiia',
    description: '集思录-T+0 QDII-欧美市场-欧美商品',
    remarks: '单次返回所有数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '成交',
        name: 'cj',
        type: 'float64',
        description: '注意单位: 万元',
        unit: '万元',
      },
      {
        title: '场内份额',
        name: 'cnfe',
        type: 'int64',
        description: '注意单位: 万份',
        unit: '万份',
      },
      {
        title: '场内新增',
        name: 'cnxz',
        type: 'int64',
        description: '注意单位: 万份',
        unit: '万份',
      },
    ],
  },
  {
    moduleTitle: 'QDII 数据',
    moduleName: 'qdii',
    title: '亚洲指数',
    name: 'qdii_yzzs',
    api: 'qdii_a_index_jsl',
    targetUrl: 'https://www.jisilu.cn/data/qdii/#qdiia',
    description: '集思录-T+0 QDII-亚洲市场-亚洲指数',
    remarks: '单次返回所有数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '成交',
        name: 'cj',
        type: 'float64',
        description: '注意单位: 万元',
        unit: '万元',
      },
      {
        title: '场内份额',
        name: 'cnfe',
        type: 'int64',
        description: '注意单位: 万份',
        unit: '万份',
      },
      {
        title: '场内新增',
        name: 'cnxz',
        type: 'int64',
        description: '注意单位: 万份',
        unit: '万份',
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
  return qdiiInterfaces.find((item) => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return qdiiInterfaces.find((item) => item.name === name);
}

export default qdiiInterfaces;
