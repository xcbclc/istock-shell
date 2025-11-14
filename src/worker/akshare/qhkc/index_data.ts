/**
 * @fileoverview index_data AKShare接口定义
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
 * index_data接口数据
 */
export const index_dataInterfaces: ApiInterface[] = [
  {
    moduleTitle: '指数',
    moduleName: 'index_data',
    title: '指数信息',
    name: 'zsxx',
    api: 'index_info',
    description: '指数信息接口',
    inputParameters: [
      {
        title: 'index_id',
        name: 'index_id',
        type: '指数id',
        description: 'index0070c0eb-93ba-2da9-6633-fa70cb90e959',
        isRequired: true,
      },
    ],
    outputParameters: [
      {
        title: 'name',
        name: 'name',
        type: 'string',
        description: '指数名称',
        unit: '',
      },
      {
        title: 'all_brokers',
        name: 'all_brokers',
        type: 'int',
        description: '是否包含所有席位，0:否，1:是',
        unit: '',
      },
      {
        title: 'created_time',
        name: 'created_time',
        type: 'datetime',
        description: '创建时间',
        unit: '',
      },
      {
        title: 'all_varieties',
        name: 'all_varieties',
        type: 'int',
        description: '是否包含所有品种，0:否，1:所有商品，2:所有股指，3:所有商品和股指',
        unit: '',
      },
      {
        title: 'status',
        name: 'status',
        type: 'int',
        description: '是否开放，0:不开放，1:开放',
        unit: '',
      },
      {
        title: 'nickname',
        name: 'nickname',
        type: 'string',
        description: '创建人昵称',
        unit: '',
      },
      {
        title: 'varieties',
        name: 'varieties',
        type: 'array',
        description: '包含品种的编码， all_varieties为0时返回',
        unit: '',
      },
      {
        title: 'brokers',
        name: 'brokers',
        type: 'array',
        description: '包含席位， all_brokers为0时返回',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '指数',
    moduleName: 'index_data',
    title: '指数权重数据',
    name: 'zsqzsj',
    api: 'index_weights',
    description: '指数权重数据接口',
    inputParameters: [
      {
        title: 'index_id',
        name: 'index_id',
        type: '指数id',
        description: 'index0070c0eb-93ba-2da9-6633-fa70cb90e959',
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
        title: 'variety',
        name: 'variety',
        type: 'string',
        description: '品种编码',
        unit: '',
      },
      {
        title: 'weight',
        name: 'weight',
        type: 'float',
        description: '权重值，百分数',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '指数',
    moduleName: 'index_data',
    title: '指数行情数据',
    name: 'zshqsj',
    api: 'index_quotes',
    description: '指数行情数据接口',
    inputParameters: [
      {
        title: 'index_id',
        name: 'index_id',
        type: '指数id',
        description: 'index0070c0eb-93ba-2da9-6633-fa70cb90e959',
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
        title: 'trans_date',
        name: 'trans_date',
        type: 'date',
        description: '日期',
        unit: '',
      },
      {
        title: 'volume',
        name: 'volume',
        type: 'int',
        description: '指数成交量',
        unit: '',
      },
      {
        title: 'openint',
        name: 'openint',
        type: 'int',
        description: '指数持仓量',
        unit: '',
      },
      {
        title: 'price',
        name: 'price',
        type: 'float',
        description: '指数价格',
        unit: '',
      },
      {
        title: 'bbr',
        name: 'bbr',
        type: 'float',
        description: '指数多空比',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '指数',
    moduleName: 'index_data',
    title: '指数沉淀资金数据',
    name: 'zscdzjsj',
    api: 'index_money',
    description: '指数沉淀资金数据接口',
    inputParameters: [
      {
        title: 'index_id',
        name: 'index_id',
        type: '指数id',
        description: 'index0070c0eb-93ba-2da9-6633-fa70cb90e959',
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
        title: 'trans_date',
        name: 'trans_date',
        type: 'date',
        description: '查询日期',
        unit: '',
      },
      {
        title: 'total_value',
        name: 'total_value',
        type: 'float',
        description: '指数沉淀资金，单位元',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '指数',
    moduleName: 'index_data',
    title: '公共指数列表',
    name: 'ggzslb',
    api: 'index_official',
    description: '公共指数列表接口',
    inputParameters: [],
    outputParameters: [
      {
        title: 'id',
        name: 'id',
        type: 'string',
        description: '指数id',
        unit: '',
      },
      {
        title: 'name',
        name: 'name',
        type: 'string',
        description: '指数名',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '指数',
    moduleName: 'index_data',
    title: '个人指数列表',
    name: 'grzslb',
    api: 'index_mine',
    description: '个人指数列表接口',
    inputParameters: [],
    outputParameters: [
      {
        title: 'id',
        name: 'id',
        type: 'string',
        description: '指数id',
        unit: '',
      },
      {
        title: 'name',
        name: 'name',
        type: 'string',
        description: '指数名',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '指数',
    moduleName: 'index_data',
    title: '指数资金动向',
    name: 'zszjdx',
    api: 'index_trend',
    description: '指数资金动向接口',
    inputParameters: [
      {
        title: 'index_id',
        name: 'index_id',
        type: '指数id',
        description: 'index0070c0eb-93ba-2da9-6633-fa70cb90e959',
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
        title: 'broker',
        name: 'broker',
        type: 'string',
        description: '席位',
        unit: '',
      },
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
        description: '净持仓资金变化，正数为流多，负数为流空，单位元',
        unit: '',
      },
    ],
    remarks: '',
    targetUrl: '',
  },
  {
    moduleTitle: '指数',
    moduleName: 'index_data',
    title: '指数的席位盈亏数据',
    name: 'zsdxwyksj',
    api: 'index_profit',
    description: '指数的席位盈亏数据接口',
    inputParameters: [
      {
        title: 'index_id',
        name: 'index_id',
        type: '指数id',
        description: 'index0070c0eb-93ba-2da9-6633-fa70cb90e959',
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
        description: '盈亏金额，正数为盈利，负数为亏损，单位元',
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
  return index_dataInterfaces.find((item) => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return index_dataInterfaces.find((item) => item.name === name);
}

export default index_dataInterfaces;
