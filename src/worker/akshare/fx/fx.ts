/**
 * @fileoverview fx AKShare接口定义
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
 * fx接口数据
 */
export const fxInterfaces: ApiInterface[] = [
  {
    moduleTitle: '外汇数据',
    moduleName: 'fx',
    title: '实时行情数据',
    name: 'sshqsj',
    api: 'forex_spot_em',
    targetUrl: 'https://quote.eastmoney.com/center/gridlist.html#forex_all',
    description: '东方财富网-行情中心-外汇市场-所有汇率-实时行情数据',
    remarks: '单次返回所有实时行情数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '序号',
        name: 'xh',
        type: 'int64',
        description: '',
        unit: '',
      },
      {
        title: '代码',
        name: 'dm',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '名称',
        name: 'mc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '最新价',
        name: 'zxj',
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
        title: '今开',
        name: 'jk',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '最高',
        name: 'zg',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '最低',
        name: 'zd',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '昨收',
        name: 'zs',
        type: 'float64',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '外汇数据',
    moduleName: 'fx',
    title: '历史行情数据',
    name: 'lshqsj',
    api: 'forex_hist_em',
    targetUrl: 'https://quote.eastmoney.com/cnyrate/EURCNYC.html',
    description: '东方财富网-行情中心-外汇市场-所有汇率-历史行情数据',
    remarks: '单次返回指定 symbol 的历史行情数据',
    inputParameters: [
      {
        title: 'symbol',
        name: 'symbol',
        type: 'str',
        description: 'symbol="USDCNH"; 品种代码；可以通过 ak.forex_spot_em() 来获取所有可获取历史行情数据的品种代码',
        defaultValue: 'USDCNH',
        isRequired: false,
      },
    ],
    outputParameters: [
      {
        title: '序号',
        name: 'xh',
        type: 'int64',
        description: '',
        unit: '',
      },
      {
        title: '代码',
        name: 'dm',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '名称',
        name: 'mc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '最新价',
        name: 'zxj',
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
        title: '今开',
        name: 'jk',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '最高',
        name: 'zg',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '最低',
        name: 'zd',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '昨收',
        name: 'zs',
        type: 'float64',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '外汇数据',
    moduleName: 'fx',
    title: '人民币牌价数据',
    name: 'rmbpjsj',
    api: 'currency_boc_sina',
    targetUrl:
      'https://biz.finance.sina.com.cn/forex/forex.php?startdate=2012-01-01&enddate=2021-06-14&money_code=EUR&type=0',
    description: '新浪财经-中行人民币牌价历史数据',
    remarks: '单次返回指定日期的所有历史数据',
    inputParameters: [
      {
        title: 'symbol',
        name: 'symbol',
        type: 'str',
        description:
          "symbol=\"美元\"; choice of {'美元', '英镑', '欧元', '澳门元', '泰国铢', '菲律宾比索', '港币', '瑞士法郎', '新加坡元', '瑞典克朗', '丹麦克朗', '挪威克朗', '日元', '加拿大元', '澳大利亚元', '新西兰元', '韩国元'}",
        defaultValue: '美元',
        choices: [
          '美元',
          '英镑',
          '欧元',
          '澳门元',
          '泰国铢',
          '菲律宾比索',
          '港币',
          '瑞士法郎',
          '新加坡元',
          '瑞典克朗',
          '丹麦克朗',
          '挪威克朗',
          '日元',
          '加拿大元',
          '澳大利亚元',
          '新西兰元',
          '韩国元',
        ],
        isRequired: false,
      },
      {
        title: 'start_date',
        name: 'start_date',
        type: 'str',
        description: 'start_date="20230304"; 开始日期和结束日期之间的间隔要超过 6 个月',
        defaultValue: '20230304',
        isRequired: false,
      },
      {
        title: 'end_date',
        name: 'end_date',
        type: 'str',
        description: 'end_date="20231110"; 开始日期和结束日期之间的间隔要超过 6 个月',
        defaultValue: '20231110',
        isRequired: false,
      },
    ],
    outputParameters: [
      {
        title: '日期',
        name: 'rq',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '中行汇买价',
        name: 'zhhmj',
        type: 'float64',
        description: '注意单位: 元',
        unit: '元',
      },
      {
        title: '中行钞买价',
        name: 'zhcmj',
        type: 'float64',
        description: '注意单位: 元',
        unit: '元',
      },
      {
        title: '中行钞卖价/汇卖价',
        name: 'zhcmj/hmj',
        type: 'float64',
        description: '注意单位: 元',
        unit: '元',
      },
      {
        title: '央行中间价',
        name: 'yxzjj',
        type: 'float64',
        description: '注意单位: 元',
        unit: '元',
      },
    ],
  },
  {
    moduleTitle: '外汇数据',
    moduleName: 'fx',
    title: '人民币汇率中间价',
    name: 'rmbhlzjj',
    api: 'currency_boc_safe',
    targetUrl: 'https://www.safe.gov.cn/safe/rmbhlzjj/index.html',
    description: '外汇管理局-人民币汇率中间价',
    remarks: '单次返回所有历史数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '日期',
        name: 'rq',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '美元',
        name: 'my',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '欧元',
        name: 'oy',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '日元',
        name: 'ry',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '港元',
        name: 'gy',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '英镑',
        name: 'yb',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '林吉特',
        name: 'ljt',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '卢布',
        name: 'lb',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '澳元',
        name: 'ay',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '加元',
        name: 'jy',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '新西兰元',
        name: 'xxly',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '新加坡元',
        name: 'xjpy',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '瑞士法郎',
        name: 'rsfl',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '兰特',
        name: 'lt',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '韩元',
        name: 'hy',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '迪拉姆',
        name: 'dlm',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '里亚尔',
        name: 'lye',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '福林',
        name: 'fl',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '兹罗提',
        name: 'zlt',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '丹麦克朗',
        name: 'dmkl',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '瑞典克朗',
        name: 'rdkl',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '挪威克朗',
        name: 'nwkl',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '里拉',
        name: 'll',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '比索',
        name: 'bs',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: '泰铢',
        name: 'tz',
        type: 'float64',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '外汇数据',
    moduleName: 'fx',
    title: '人民币外汇即期报价',
    name: 'rmbwhjqbj',
    api: 'fx_spot_quote',
    targetUrl: 'http://www.chinamoney.com.cn/chinese/mkdatapfx/',
    description: '人民币外汇即期报价',
    remarks: '单次返回实时行情数据',
    inputParameters: [],
    outputParameters: [],
  },
  {
    moduleTitle: '外汇数据',
    moduleName: 'fx',
    title: '人民币外汇远掉报价',
    name: 'rmbwhydbj',
    api: 'fx_swap_quote',
    targetUrl: 'http://www.chinamoney.com.cn/chinese/mkdatapfx/',
    description: '人民币外汇远掉报价',
    remarks: '单次返回实时行情数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '货币对',
        name: 'hbd',
        type: 'object',
        description: 'e.g., "USD/CNY"',
        unit: '',
      },
      {
        title: '1周',
        name: '1z',
        type: 'object',
        description: 'e.g., "11.50/12.00"',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '外汇数据',
    moduleName: 'fx',
    title: '外币对即期报价',
    name: 'wbdjqbj',
    api: 'fx_pair_quote',
    targetUrl: 'http://www.chinamoney.com.cn/chinese/mkdatapfx/',
    description: '外币对即期报价',
    remarks: '单次返回当前时点最近更新的即时数据',
    inputParameters: [],
    outputParameters: [
      {
        title: '货币对',
        name: 'hbd',
        type: 'object',
        description: 'e.g., "AUD/USD"',
        unit: '',
      },
      {
        title: '买报价',
        name: 'mbj',
        type: 'float64',
        description: 'e.g., "0.68460"',
        unit: '',
      },
      {
        title: '卖报价',
        name: 'mbj',
        type: 'float64',
        description: 'e.g., "0.68461"',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '外汇数据',
    moduleName: 'fx',
    title: '指定币种的所有货币对',
    name: 'zdbzdsyhbd',
    api: 'currency_pair_map',
    targetUrl: 'https://cn.investing.com/currencies/cny-jmd',
    description: '指定币种的所有能够获取到的货币对信息，历史数据可以调用 **ak.currency_history()** 获取',
    remarks: '单次返回指定币种的所有能获取数据的货币对',
    inputParameters: [
      {
        title: 'symbol',
        name: 'symbol',
        type: 'str',
        description:
          'symbol="人民币"; 此处提供中文的币种名称, 可以访问[网页](https://cn.investing.com/currencies/cny-jmd) 的页面下方查看',
        defaultValue: '人民币',
        isRequired: false,
      },
    ],
    outputParameters: [
      {
        title: 'name',
        name: 'name',
        type: 'object',
        description: '货币对中文简称',
        unit: '',
      },
      {
        title: 'code',
        name: 'code',
        type: 'float64',
        description: '货币对代码',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '外汇数据',
    moduleName: 'fx',
    title: '货币对-投机情绪报告',
    name: 'hbd_tjqxbg',
    api: 'macro_fx_sentiment',
    targetUrl: 'https://datacenter.jin10.com/reportType/dc_ssi_trends',
    description: '货币对-投机情绪报告',
    remarks: '单次返回指定日期所有品种的数据(所指定的日期必须在当前交易日之前的30个交易日内)',
    inputParameters: [
      {
        title: 'start_date',
        name: 'start_date',
        type: 'str',
        description: 'start_date="2020-04-07"; 所指定的日期必须在当前交易日之前的30个交易日内',
        defaultValue: '2020-04-07',
        isRequired: false,
      },
      {
        title: 'end_date',
        name: 'end_date',
        type: 'str',
        description: 'end_date="2020-04-07"; 与 start_date 一致',
        defaultValue: '2020-04-07',
        isRequired: false,
      },
    ],
    outputParameters: [
      {
        title: 'date',
        name: 'date',
        type: 'object',
        description: '间隔10分钟',
        unit: '',
      },
      {
        title: 'AUDJPY',
        name: 'AUDJPY',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: 'AUDUSD',
        name: 'AUDUSD',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: 'EURAUD',
        name: 'EURAUD',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: 'EURJPY',
        name: 'EURJPY',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: 'EURUSD',
        name: 'EURUSD',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: 'GBPJPY',
        name: 'GBPJPY',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: 'GBPUSD',
        name: 'GBPUSD',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: 'NZDUSD',
        name: 'NZDUSD',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: 'USDCAD',
        name: 'USDCAD',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: 'USDCHF',
        name: 'USDCHF',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: 'USDJPY',
        name: 'USDJPY',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: 'USDX',
        name: 'USDX',
        type: 'float64',
        description: '',
        unit: '',
      },
      {
        title: 'XAUUSD',
        name: 'XAUUSD',
        type: 'float64',
        description: '',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '外汇数据',
    moduleName: 'fx',
    title: '外汇行情报价',
    name: 'whhqbj',
    api: 'fx_quote_baidu',
    targetUrl: 'https://gushitong.baidu.com/top/foreign-common-%E5%B8%B8%E7%94%A8',
    description: '百度股市通-外汇-行情榜单',
    remarks: '单次返回指定 symbol 当前时点的行情报价',
    inputParameters: [
      {
        title: 'symbol',
        name: 'symbol',
        type: 'str',
        description: 'symbol="人民币"; choice of {"人民币", 美元"}',
        defaultValue: '人民币',
        choices: ['人民币', '美元'],
        isRequired: false,
      },
    ],
    outputParameters: [
      {
        title: '代码',
        name: 'dm',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '名称',
        name: 'mc',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '最新价',
        name: 'zxj',
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
    ],
  },
];

/**
 * 根据API名称获取接口定义
 * @param apiName API名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByApi(apiName: string): ApiInterface | undefined {
  return fxInterfaces.find((item) => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return fxInterfaces.find((item) => item.name === name);
}

export default fxInterfaces;
