/**
 * @fileoverview nlp AKShare接口定义
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
 * nlp接口数据
 */
export const nlpInterfaces: ApiInterface[] = [
  {
    moduleTitle: '自然语言处理',
    moduleName: 'nlp',
    title: '知识图谱',
    name: 'zstp',
    api: 'nlp_ownthink',
    targetUrl: 'https://ownthink.com/',
    description: '思知-知识图谱的接口, 以此来查询知识图谱数据',
    remarks: '单次返回查询的数据结果',
    inputParameters: [
      {
        title: 'word',
        name: 'word',
        type: 'str',
        description: 'word="人工智能"',
        defaultValue: '人工智能',
        isRequired: false,
      },
      {
        title: 'indicator',
        name: 'indicator',
        type: 'str',
        description: 'indicator="entity"; Please refer **Indicator Info** table',
        defaultValue: 'entity',
        isRequired: false,
      },
      {
        title: 'fields',
        name: 'fields',
        type: 'type',
        description: 'description',
        isRequired: true,
      },
      {
        title: 'entity',
        name: 'entity',
        type: 'str',
        description: '实体名',
        isRequired: true,
      },
      {
        title: 'desc',
        name: 'desc',
        type: 'str',
        description: '实体简介',
        isRequired: true,
      },
      {
        title: 'tag',
        name: 'tag',
        type: 'list',
        description: '实体标签',
        isRequired: true,
      },
      {
        title: 'avg',
        name: 'avg',
        type: 'pandas.DataFrame',
        description: '实体属性值，第一列为实体的属性，第二列为实体属性所对应的值',
        isRequired: true,
      },
    ],
    outputParameters: [],
  },
  {
    moduleTitle: '自然语言处理',
    moduleName: 'nlp',
    title: '智能问答',
    name: 'znwd',
    api: 'nlp_answer',
    targetUrl: 'https://ownthink.com/robot.html',
    description: '思知-对话机器人的接口, 以此来进行智能问答',
    remarks: '单次返回查询的数据结果',
    inputParameters: [
      {
        title: 'question',
        name: 'question',
        type: 'str',
        description: 'question="姚明的身高"',
        defaultValue: '姚明的身高',
        isRequired: false,
      },
    ],
    outputParameters: [],
  },
];

/**
 * 根据API名称获取接口定义
 * @param apiName API名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByApi(apiName: string): ApiInterface | undefined {
  return nlpInterfaces.find((item) => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return nlpInterfaces.find((item) => item.name === name);
}

export default nlpInterfaces;
