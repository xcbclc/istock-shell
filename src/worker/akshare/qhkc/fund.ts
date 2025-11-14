/**
 * @fileoverview fund AKShare接口定义
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
 * fund接口数据
 */
export const fundInterfaces: ApiInterface[] = [
  {
    moduleTitle: '资金',
    moduleName: 'fund',
    title: '每日净流多列表(商品)',
    name: 'mrjldlb_sp',
    api: 'commodity_flow_long',
    description: '每日净流多列表（商品）接口',
    inputParameters: [
      {
        title: 'date',
        name: 'date',
        type: '查询日期',
        description: '2018-08-08',
        isRequired: true,
      },
    ],
    outputParameters: [
      {
        title: 'broker',
        name: 'broker',
        type: 'string',
        description: '席位',
        unit: '',
      },
      {
        title: 'money',
        name: 'money',
        type: 'float',
        description: '流多资金，单位元',
        unit: '',
      },
      {
        title: 'variety',
        name: 'variety',
        type: 'string',
        description: '品种编码',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '资金',
    moduleName: 'fund',
    title: '每日净流空列表(商品)',
    name: 'mrjlklb_sp',
    api: 'commodity_flow_short',
    description: '每日净流空列表(商品)接口',
    inputParameters: [
      {
        title: 'date',
        name: 'date',
        type: '查询日期',
        description: '2018-08-08',
        isRequired: true,
      },
    ],
    outputParameters: [
      {
        title: 'broker',
        name: 'broker',
        type: 'string',
        description: '席位',
        unit: '',
      },
      {
        title: 'money',
        name: 'money',
        type: 'float',
        description: '流空资金，单位元',
        unit: '',
      },
      {
        title: 'variety',
        name: 'variety',
        type: 'string',
        description: '品种编码',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '资金',
    moduleName: 'fund',
    title: '每日净流多列表(指数)',
    name: 'mrjldlb_zs',
    api: 'stock_flow_long',
    description: '每日净流多列表(指数)接口',
    inputParameters: [
      {
        title: 'date',
        name: 'date',
        type: '查询日期',
        description: '2018-08-08',
        isRequired: true,
      },
    ],
    outputParameters: [
      {
        title: 'broker',
        name: 'broker',
        type: 'string',
        description: '席位',
        unit: '',
      },
      {
        title: 'money',
        name: 'money',
        type: 'float',
        description: '流多资金，单位元',
        unit: '',
      },
      {
        title: 'variety',
        name: 'variety',
        type: 'string',
        description: '品种编码',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '资金',
    moduleName: 'fund',
    title: '每日净流空列表(指数)',
    name: 'mrjlklb_zs',
    api: 'stock_flow_short',
    description: '每日净流空列表(指数)接口',
    inputParameters: [
      {
        title: 'date',
        name: 'date',
        type: '查询日期',
        description: '2018-08-08',
        isRequired: true,
      },
    ],
    outputParameters: [
      {
        title: 'broker',
        name: 'broker',
        type: 'string',
        description: '席位',
        unit: '',
      },
      {
        title: 'money',
        name: 'money',
        type: 'float',
        description: '流空资金，单位元',
        unit: '',
      },
      {
        title: 'variety',
        name: 'variety',
        type: 'string',
        description: '品种编码',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '资金',
    moduleName: 'fund',
    title: '每日商品保证金沉淀变化',
    name: 'mrspbzjcdbh',
    api: 'money_in_out',
    description: '每日商品保证金沉淀变化接口',
    inputParameters: [
      {
        title: 'date',
        name: 'date',
        type: '查询日期',
        description: '2018-08-08',
        isRequired: true,
      },
    ],
    outputParameters: [
      {
        title: 'symbol',
        name: 'symbol',
        type: 'string',
        description: '品种编码',
        unit: '',
      },
      {
        title: 'chge',
        name: 'chge',
        type: 'float',
        description: '品种沉淀资金变化，单位元',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
];

/**
 * 根据API名称获取接口定义
 * @param apiName API名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByApi(apiName: string): ApiInterface | undefined {
  return fundInterfaces.find((item) => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return fundInterfaces.find((item) => item.name === name);
}

export default fundInterfaces;
