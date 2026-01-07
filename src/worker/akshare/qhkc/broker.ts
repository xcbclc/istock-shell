/**
 * @fileoverview broker AKShare接口定义
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
 * broker接口数据
 */
export const brokerInterfaces: ApiInterface[] = [
  {
    moduleTitle: '席位',
    moduleName: 'broker',
    title: '席位持仓数据',
    name: 'xw_xwccsj',
    api: 'broker_positions',
    description: '席位持仓数据接口',
    inputParameters: [
      {
        title: 'broker',
        name: 'broker',
        type: '席位',
        description: '永安期货',
        isRequired: true,
      },
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
        title: 'code',
        name: 'code',
        type: 'string',
        description: '合约代号',
        unit: '',
      },
      {
        title: 'long',
        name: 'long',
        type: 'int',
        description: '多头持仓',
        unit: '',
      },
      {
        title: 'short',
        name: 'short',
        type: 'int',
        description: '空头持仓',
        unit: '',
      },
      {
        title: 'long_chge',
        name: 'long_chge',
        type: 'int',
        description: '多头持仓变化量',
        unit: '',
      },
      {
        title: 'short_chge',
        name: 'short_chge',
        type: 'int',
        description: '空头持仓变化量',
        unit: '',
      },
      {
        title: 'symbol',
        name: 'symbol',
        type: 'string',
        description: '品种编码',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '席位',
    moduleName: 'broker',
    title: '席位盈亏数据',
    name: 'xw_xwyksj',
    api: 'broker_calendar',
    description: '席位盈亏数据接口',
    inputParameters: [
      {
        title: 'broker',
        name: 'broker',
        type: '席位',
        description: '永安期货',
        isRequired: true,
      },
      {
        title: 'start_date',
        name: 'start_date',
        type: '查询开始日期',
        description: '2018-07-08',
        isRequired: true,
      },
      {
        title: 'end_date',
        name: 'end_date',
        type: '查询结束日期',
        description: '2018-08-08',
        isRequired: true,
      },
    ],
    outputParameters: [
      {
        title: 'trans_date',
        name: 'trans_date',
        type: 'date',
        description: '查询日期',
        unit: '',
      },
      {
        title: 'profit',
        name: 'profit',
        type: 'float',
        description: '席位盈亏，单位元',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '席位',
    moduleName: 'broker',
    title: '席位每日大资金流动数据',
    name: 'xw_xwmrdzjldsj',
    api: 'broker_flow',
    description: '席位每日大资金流动数据接口',
    inputParameters: [
      {
        title: 'broker',
        name: 'broker',
        type: '席位',
        description: '永安期货',
        isRequired: true,
      },
      {
        title: 'date',
        name: 'date',
        type: '查询日期',
        description: '2018-08-08',
        isRequired: true,
      },
      {
        title: 'offset',
        name: 'offset',
        type: '查询阈值，大于这个值才返回',
        description: '1000000',
        isRequired: true,
      },
    ],
    outputParameters: [
      {
        title: 'variety',
        name: 'variety',
        type: 'string',
        description: '品种编码',
        unit: '',
      },
      {
        title: 'money',
        name: 'money',
        type: 'float',
        description: '保证金流动量，正数为流多，负数为流空，单位元',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '席位',
    moduleName: 'broker',
    title: '席位多空比数据',
    name: 'xw_xwdkbsj',
    api: 'broker_bbr',
    description: '席位多空比数据接口',
    inputParameters: [
      {
        title: 'broker',
        name: 'broker',
        type: '席位',
        description: '永安期货',
        isRequired: true,
      },
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
        title: 'bbr',
        name: 'bbr',
        type: 'float',
        description: '多空比',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '席位',
    moduleName: 'broker',
    title: '席位净持仓保证金变化数据',
    name: 'xw_xwjccbzjbhsj',
    api: 'broker_net_money_chge',
    description: '席位净持仓保证金变化数据接口',
    inputParameters: [
      {
        title: 'broker',
        name: 'broker',
        type: '席位',
        description: '永安期货',
        isRequired: true,
      },
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
        title: 'value',
        name: 'value',
        type: 'float',
        description: '净持仓保证金变化量，正数为流多，负数为流空，单位元',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '席位',
    moduleName: 'broker',
    title: '席位净持仓保证金数据',
    name: 'xw_xwjccbzjsj',
    api: 'broker_net_money',
    description: '席位净持仓保证金数据接口',
    inputParameters: [
      {
        title: 'broker',
        name: 'broker',
        type: '席位',
        description: '永安期货',
        isRequired: true,
      },
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
        title: 'value',
        name: 'value',
        type: 'float',
        description: '净持仓保证金，正数为净多，负数为净空，单位元',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '席位',
    moduleName: 'broker',
    title: '席位总持仓保证金数据',
    name: 'xw_xwzccbzjsj',
    api: 'broker_total_money',
    description: '席位总持仓保证金数据接口',
    inputParameters: [
      {
        title: 'broker',
        name: 'broker',
        type: '席位',
        description: '永安期货',
        isRequired: true,
      },
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
        title: 'value',
        name: 'value',
        type: 'float',
        description: '总持仓保证金，单位元',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '席位',
    moduleName: 'broker',
    title: '席位的商品盈亏数据',
    name: 'xw_xwdspyksj',
    api: 'broker_profit',
    description: '席位的商品盈亏数据接口',
    inputParameters: [
      {
        title: 'broker',
        name: 'broker',
        type: '席位',
        description: '永安期货',
        isRequired: true,
      },
      {
        title: 'start_date',
        name: 'start_date',
        type: '查询开始日期',
        description: '2018-07-08',
        isRequired: true,
      },
      {
        title: 'end_date',
        name: 'end_date',
        type: '查询结束日期',
        description: '2018-07-08',
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
        title: 'total_profit',
        name: 'total_profit',
        type: 'float',
        description: '盈亏数据，单位元',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '席位',
    moduleName: 'broker',
    title: '席位盈利排行',
    name: 'xw_xwylpx',
    api: 'broker_in_profit_list',
    description: '席位盈利排行数据接口',
    inputParameters: [
      {
        title: 'start_date',
        name: 'start_date',
        type: '查询开始日期',
        description: '2018-07-08',
        isRequired: true,
      },
      {
        title: 'end_date',
        name: 'end_date',
        type: '查询结束日期',
        description: '2018-07-08',
        isRequired: true,
      },
      {
        title: 'count',
        name: 'count',
        type: '返回数据条数',
        description: '10; 默认10条',
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
        title: 'profit',
        name: 'profit',
        type: 'float',
        description: '席位盈利金额，单位元',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '席位',
    moduleName: 'broker',
    title: '席位亏损排行',
    name: 'xw_xwkspx',
    api: 'broker_in_loss_list',
    description: '席位亏损排行数据接口',
    inputParameters: [
      {
        title: 'start_date',
        name: 'start_date',
        type: '查询开始日期',
        description: '2018-07-08',
        isRequired: true,
      },
      {
        title: 'end_date',
        name: 'end_date',
        type: '查询结束日期',
        description: '2018-07-08',
        isRequired: true,
      },
      {
        title: 'count',
        name: 'count',
        type: '返回数据条数',
        description: '10; 默认10条',
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
        title: 'profit',
        name: 'profit',
        type: 'float',
        description: '席位亏损金额，单位元',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '席位',
    moduleName: 'broker',
    title: '所有席位数据',
    name: 'xw_syxwsj',
    api: 'broker_all',
    description: '所有席位数据接口',
    inputParameters: [
      {
        title: 'offset_days',
        name: 'offset_days',
        type: '过滤阈值，N个交易日内上过龙虎榜',
        description: '默认为365，即一年内上过榜的席位',
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
        title: 'grade',
        name: 'grade',
        type: 'string',
        description: '盈利评级，最好为A，最差为E',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '席位',
    moduleName: 'broker',
    title: '建仓过程',
    name: 'xw_jcgc',
    api: 'broker_positions_process',
    description: '建仓过程数据接口',
    inputParameters: [
      {
        title: 'broker',
        name: 'broker',
        type: '席位',
        description: '永安期货',
        isRequired: true,
      },
      {
        title: 'code',
        name: 'code',
        type: '合约代号',
        description: 'rb1810',
        isRequired: true,
      },
      {
        title: 'start_date',
        name: 'start_date',
        type: '开始日期',
        description: '"2020-02-03"; 可选参数',
        isRequired: false,
      },
      {
        title: 'end_date',
        name: 'end_date',
        type: '结束日期',
        description: '"2020-06-03"; 可选参数',
        isRequired: false,
      },
    ],
    outputParameters: [
      {
        title: 'long',
        name: 'long',
        type: 'int',
        description: '多头持仓',
        unit: '',
      },
      {
        title: 'short',
        name: 'short',
        type: 'int',
        description: '空头持仓',
        unit: '',
      },
      {
        title: 'trans_date',
        name: 'trans_date',
        type: 'date',
        description: '日期',
        unit: '',
      },
      {
        title: 'code',
        name: 'code',
        type: 'string',
        description: '合约代号',
        unit: '',
      },
      {
        title: 'profit',
        name: 'profit',
        type: 'float',
        description: '当日盈亏金额，正数为盈利，负数为亏损，单位元',
        unit: '',
      },
      {
        title: 'net_hold',
        name: 'net_hold',
        type: 'int',
        description: '净持仓，多头持仓-空头持仓',
        unit: '',
      },
      {
        title: 'total_profit',
        name: 'total_profit',
        type: 'float',
        description: '累计盈亏金额，正数为盈利，负数为亏损，单位元',
        unit: '',
      },
      {
        title: 'cost',
        name: 'cost',
        type: 'float',
        description: '估算盈亏平衡价格',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '席位',
    moduleName: 'broker',
    title: '席位对对碰',
    name: 'xw_xwddp',
    api: 'broker_pk',
    description: '席位对对碰数据接口',
    inputParameters: [
      {
        title: 'broker1',
        name: 'broker1',
        type: '席位1',
        description: '永安期货',
        isRequired: true,
      },
      {
        title: 'broker2',
        name: 'broker2',
        type: '席位2',
        description: '兴证期货',
        isRequired: true,
      },
      {
        title: 'symbol',
        name: 'symbol',
        type: '品种编码',
        description: '螺纹钢',
        isRequired: true,
      },
    ],
    outputParameters: [
      {
        title: 'total_count',
        name: 'total_count',
        type: 'int',
        description: '统计数据量',
        unit: '',
      },
      {
        title: 'win_count',
        name: 'win_count',
        type: 'int',
        description: '席位1获胜次数',
        unit: '',
      },
      {
        title: 'recent_win_count',
        name: 'recent_win_count',
        type: 'int',
        description: '席位1最近10次获胜次数',
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
  return brokerInterfaces.find((item) => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return brokerInterfaces.find((item) => item.name === name);
}

export default brokerInterfaces;
