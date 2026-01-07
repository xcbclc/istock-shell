/**
 * @fileoverview article AKShare接口定义
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
 * article接口数据
 */
export const articleInterfaces: ApiInterface[] = [
  {
    moduleTitle: '政策不确定性数据',
    moduleName: 'article',
    title: 'Oxford-Man',
    name: 'bdl_oxford_man',
    api: 'article_oman_rv',
    targetUrl: 'https://realized.oxford-man.ox.ac.uk/data/visualization',
    description: '获取 Oxford-Man 已实现波动率数据',
    remarks: '单次返回某个指数具体指标的所有历史数据',
    inputParameters: [],
    outputParameters: [
      {
        title: 'index',
        name: 'index',
        type: 'datetime.datetime',
        description: '日期',
        unit: '',
      },
      {
        title: 'data',
        name: 'data',
        type: 'float',
        description: '数据',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '政策不确定性数据',
    moduleName: 'article',
    title: 'Risk-Lab',
    name: 'bdl_risk_lab',
    api: 'article_rlab_rv',
    targetUrl: 'https://dachxiu.chicagobooth.edu/',
    description: '获取 Risk-Lab 已实现波动率数据',
    remarks: '单次返回某个指数所有历史数据',
    inputParameters: [
      {
        title: 'symbol',
        name: 'symbol',
        type: 'str',
        description: 'symbol="39693", 某个具体指数 help(article_rlab_rv)',
        defaultValue: '39693',
        isRequired: false,
      },
    ],
    outputParameters: [
      {
        title: 'index',
        name: 'index',
        type: 'datetime.datetime',
        description: '日期',
        unit: '',
      },
      {
        title: 'data',
        name: 'data',
        type: 'float',
        description: '数据',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '政策不确定性数据',
    moduleName: 'article',
    title: 'Current Research Returns',
    name: 'bdl_current_research_returns',
    api: 'article_ff_crr',
    targetUrl: 'https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html',
    description: '获取 Current Research Returns 多因子数据; 更多信息请访问目标地址',
    remarks: '单次返回所有历史数据',
    inputParameters: [],
    outputParameters: [
      {
        title: 'item',
        name: 'item',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: 'September 2019',
        name: 'September_2019',
        type: 'object',
        description: '动态日期',
        unit: '',
      },
      {
        title: 'Last 3 Months',
        name: 'Last_3_Months',
        type: 'object',
        description: '动态日期',
        unit: '',
      },
      {
        title: 'Last 12 Months',
        name: 'Last_12_Months',
        type: 'object',
        description: '动态日期',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '政策不确定性数据',
    moduleName: 'article',
    title: '国家和地区指数',
    name: 'bdl_gjhdqzs',
    api: 'article_epu_index',
    targetUrl: 'https://www.policyuncertainty.com/index.html',
    description: '国家或地区的经济政策不确定性(EPU)数据',
    remarks: '单次返回某个具体国家或地区的所有月度经济政策不确定性数据',
    inputParameters: [],
    outputParameters: [],
  },
];

/**
 * 根据API名称获取接口定义
 * @param apiName API名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByApi(apiName: string): ApiInterface | undefined {
  return articleInterfaces.find((item) => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return articleInterfaces.find((item) => item.name === name);
}

export default articleInterfaces;
