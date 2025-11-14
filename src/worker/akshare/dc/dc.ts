/**
 * @fileoverview dc AKShare接口定义
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
 * dc接口数据
 */
export const dcInterfaces: ApiInterface[] = [
  {
    moduleTitle: '加密货币数据',
    moduleName: 'dc',
    title: '实时数据',
    name: 'sssj',
    api: 'crypto_js_spot',
    targetUrl: 'https://datacenter.jin10.com/reportType/dc_bitcoin_current',
    description: '加密货币实时行情',
    remarks: '单次返回主流加密货币当前时点行情数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '市场',
        name: 'sc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '交易品种',
        name: 'jypz',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '最近报价',
        name: 'zjbj',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '涨跌额',
        name: 'zde',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '涨跌幅',
        name: 'zdf',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '24小时最高',
        name: '24xszg',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '24小时最低',
        name: '24xszd',
        type: 'float64',
        description: '注意货币币种',
        unit: '',
      },
      {
        title: '24小时成交量',
        name: '24xscjl',
        type: 'float64',
        description: '注意货币币种',
        unit: '',
      },
      {
        title: '更新时间',
        name: 'gxsj',
        type: 'float64',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '加密货币数据',
    moduleName: 'dc',
    title: '比特币持仓报告',
    name: 'btbccbg',
    api: 'crypto_bitcoin_hold_report',
    targetUrl: 'https://datacenter.jin10.com/dc_report?name=bitcoint',
    description: '比特币持仓报告',
    remarks: '单次返回当前时点的比特币持仓报告数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '代码',
        name: 'dm',
        type: 'object',
        description: '日期时间-索引',
        unit: '',
      },
      {
        title: '公司名称-英文',
        name: 'gsmc_yw',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '公司名称-中文',
        name: 'gsmc_zw',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '国家/地区',
        name: 'gj/dq',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '市值',
        name: 'sz',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '比特币占市值比重',
        name: 'btbzszbz',
        type: 'float64',
        description: '注意单位: %',
        unit: '%',
      },
      {
        title: '持仓成本',
        name: 'cccb',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '持仓占比',
        name: 'cczb',
        type: 'float64',
        description: '注意单位: %',
        unit: '%',
      },
      {
        title: '持仓量',
        name: 'ccl',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '当日持仓市值',
        name: 'drccsz',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '查询日期',
        name: 'cxrq',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '公告链接',
        name: 'gglj',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '分类',
        name: 'fl',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '倍数',
        name: 'bs',
        type: 'float64',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '加密货币数据',
    moduleName: 'dc',
    title: 'CME-成交量报告',
    name: 'cme_cjlbg',
    api: 'crypto_bitcoin_cme',
    targetUrl: 'https://datacenter.jin10.com/reportType/dc_cme_btc_report',
    description: '芝加哥商业交易所-比特币成交量报告',
    remarks: '单次返回指定交易日的比特币成交量报告数据',
    inputParameters: [
      {
        title: 'date',
        name: 'date',
        type: 'str',
        description: 'date="20230830"',
        defaultValue: '20230830',
        isRequired: false,
      },
    ],
    outputParameters: [
      {
        title: '商品',
        name: 'sp',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '类型',
        name: 'lx',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '电子交易合约',
        name: 'dzjyhy',
        type: 'int64',
        description: '',
        unit: '',
      },
      {
        title: '场内成交合约',
        name: 'cncjhy',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '场外成交合约',
        name: 'cwcjhy',
        type: 'int64',
        description: '',
        unit: '',
      },
      {
        title: '成交量',
        name: 'cjl',
        type: 'int64',
        description: '',
        unit: '',
      },
      {
        title: '未平仓合约',
        name: 'wpchy',
        type: 'int64',
        description: '',
        unit: '',
      },
      {
        title: '持仓变化',
        name: 'ccbh',
        type: 'int64',
        description: '',
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
  return dcInterfaces.find((item) => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return dcInterfaces.find((item) => item.name === name);
}

export default dcInterfaces;
