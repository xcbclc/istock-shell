/**
 * @fileoverview bond AKShare接口定义
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
 * bond接口数据
 */
export const bondInterfaces: ApiInterface[] = [
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "债券查询",
    "name": "zq_zqcx",
    "api": "bond_info_cm",
    "targetUrl": "https://www.chinamoney.com.cn/chinese/scsjzqxx/",
    "description": "中国外汇交易中心暨全国银行间同业拆借中心-数据-债券信息-信息查询",
    "inputParameters": [
      {
        "title": "bond_name",
        "name": "bond_name",
        "type": "str",
        "description": "bond_name=\"\"; 默认为空",
        "defaultValue": "",
        "isRequired": false
      },
      {
        "title": "bond_code",
        "name": "bond_code",
        "type": "str",
        "description": "bond_code=\"\"; 默认为空",
        "defaultValue": "",
        "isRequired": false
      },
      {
        "title": "bond_issue",
        "name": "bond_issue",
        "type": "str",
        "description": "bond_issue=\"\"; 默认为空, 通过 ak.bond_info_cm_query() 查询相关参数",
        "defaultValue": "",
        "isRequired": false
      },
      {
        "title": "bond_type",
        "name": "bond_type",
        "type": "str",
        "description": "bond_type=\"\"; 默认为空, 通过 ak.bond_info_cm_query() 查询相关参数",
        "defaultValue": "",
        "isRequired": false
      },
      {
        "title": "coupon_type",
        "name": "coupon_type",
        "type": "str",
        "description": "coupon_type=\"\"; 默认为空, 通过 ak.bond_info_cm_query() 查询相关参数",
        "defaultValue": "",
        "isRequired": false
      },
      {
        "title": "issue_year",
        "name": "issue_year",
        "type": "str",
        "description": "issue_year=\"\"; 默认为空",
        "defaultValue": "",
        "isRequired": false
      },
      {
        "title": "underwriter",
        "name": "underwriter",
        "type": "str",
        "description": "underwriter=\"\"; 默认为空, 通过 ak.bond_info_cm_query() 查询相关参数",
        "defaultValue": "",
        "isRequired": false
      },
      {
        "title": "grade",
        "name": "grade",
        "type": "str",
        "description": "grade=\"\"; 默认为空",
        "defaultValue": "",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "债券简称",
        "name": "zqjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "债券代码",
        "name": "zqdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行人/受托机构",
        "name": "fxr/stjg",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "债券类型",
        "name": "zqlx",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行日期",
        "name": "fxrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新债项评级",
        "name": "zxzxpj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "查询代码",
        "name": "cxdm",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "债券基础信息",
    "name": "zq_zqjcxx",
    "api": "bond_info_detail_cm",
    "targetUrl": "https://www.chinamoney.com.cn/chinese/zqjc/?bondDefinedCode=egfjh08154",
    "description": "中国外汇交易中心暨全国银行间同业拆借中心-数据-债券信息-信息查询-债券详情",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"19万林投资CP001\"; 通过 ak.bond_info_cm() 查询 债券简称",
        "defaultValue": "19万林投资CP001",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "name",
        "name": "name",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "value",
        "name": "value",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "债券现券市场概览",
    "name": "zq_zqxqscgl",
    "api": "bond_cash_summary_sse",
    "targetUrl": "https://bond.sse.com.cn/data/statistics/overview/bondow/",
    "description": "上登债券信息网-市场数据-市场统计-市场概览-债券现券市场概览",
    "remarks": "单次返回指定交易日的债券现券市场概览数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date='20200111'",
        "defaultValue": "20200111",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "债券现货",
        "name": "zqxh",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "托管只数",
        "name": "tgzs",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "托管市值",
        "name": "tgsz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "托管面值",
        "name": "tgmz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "数据日期",
        "name": "sjrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "债券成交概览",
    "name": "zq_zqcjgl",
    "api": "bond_deal_summary_sse",
    "targetUrl": "http://bond.sse.com.cn/data/statistics/overview/turnover/",
    "description": "上登债券信息网-市场数据-市场统计-市场概览-债券成交概览",
    "remarks": "单次返回指定交易日的债券成交概览数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date='20200104'",
        "defaultValue": "20200104",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "债券类型",
        "name": "zqlx",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "当日成交笔数",
        "name": "drcjbs",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "当日成交金额",
        "name": "drcjje",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "当年成交笔数",
        "name": "dncjbs",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "当年成交金额",
        "name": "dncjje",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "数据日期",
        "name": "sjrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "银行间市场债券发行基础数据",
    "name": "zq_yhjsczqfxjcsj",
    "api": "bond_debt_nafmii",
    "targetUrl": "http://zhuce.nafmii.org.cn/fans/publicQuery/manager",
    "description": "中国银行间市场交易商协会-非金融企业债务融资工具注册信息系统",
    "remarks": "单次获取指定 page 页面数据的 50 条数据",
    "inputParameters": [
      {
        "title": "page",
        "name": "page",
        "type": "str",
        "description": "page=\"1\", 需要获取第 page 页",
        "defaultValue": "1",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "债券名称",
        "name": "zqmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "品种",
        "name": "pz",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "注册或备案",
        "name": "zchba",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "金额",
        "name": "je",
        "type": "float64",
        "description": "注意单位：亿元",
        "unit": ""
      },
      {
        "title": "注册通知书文号",
        "name": "zctzswh",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "更新日期",
        "name": "gxrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "项目状态",
        "name": "xmzt",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "现券市场做市报价",
    "name": "zq_xqsczsbj",
    "api": "bond_spot_quote",
    "targetUrl": "https://www.chinamoney.com.cn/chinese/mkdatabond/",
    "description": "中国外汇交易中心暨全国银行间同业拆借中心-市场数据-市场行情-债券市场行情-现券市场做市报价",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "买入净价",
        "name": "mrjj",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "卖出净价",
        "name": "mcjj",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "买入收益率",
        "name": "mrsyl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "卖出收益率",
        "name": "mcsyl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "现券市场成交行情",
    "name": "zq_xqsccjhq",
    "api": "bond_spot_deal",
    "targetUrl": "https://www.chinamoney.com.cn/chinese/mkdatabond/",
    "description": "中国外汇交易中心暨全国银行间同业拆借中心-市场数据-市场行情-债券市场行情-现券市场成交行情",
    "remarks": "单次返回所有即期数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "债券简称",
        "name": "zqjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交净价",
        "name": "cjjj",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "最新收益率",
        "name": "zxsyl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "涨跌",
        "name": "zd",
        "type": "float64",
        "description": "注意单位: BP",
        "unit": "BP"
      },
      {
        "title": "加权收益率",
        "name": "jqsyl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "交易量",
        "name": "jyl",
        "type": "float64",
        "description": "注意单位: 亿",
        "unit": "亿"
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "国债及其他债券收益率曲线",
    "name": "zq_gzjqtzqsylqx",
    "api": "bond_china_yield",
    "targetUrl": "https://yield.chinabond.com.cn/cbweb-pbc-web/pbc/historyQuery?startDate=2019-02-07&endDate=2020-02-04&gjqx=0&qxId=ycqx&locale=cn_ZH",
    "description": "中国债券信息网-国债及其他债券收益率曲线",
    "remarks": "单次返回所有指定日期间 start_date 到 end_date 需要小于一年的所有数据",
    "inputParameters": [
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"20190204\", 指定开始日期; start_date 到 end_date 需要小于一年",
        "defaultValue": "20190204",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"20200204\", 指定结束日期; start_date 到 end_date 需要小于一年",
        "defaultValue": "20200204",
        "isRequired": false
      }
    ],
    "outputParameters": []
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "实时行情数据",
    "name": "zq_sshqsj1",
    "api": "bond_zh_hs_spot",
    "targetUrl": "https://vip.stock.finance.sina.com.cn/mkt/#hs_z",
    "description": "新浪财经-债券-沪深债券-实时行情数据",
    "remarks": "单次返回所有沪深债券的实时行情数据",
    "inputParameters": [
      {
        "title": "start_page",
        "name": "start_page",
        "type": "str",
        "description": "start_page=\"1\"; 开始获取的页面，每页 80 条数据",
        "defaultValue": "1",
        "isRequired": false
      },
      {
        "title": "end_page",
        "name": "end_page",
        "type": "str",
        "description": "end_page=\"10\"; 结束获取的页面，每页 80 条数据",
        "defaultValue": "10",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "代码",
        "name": "dm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "名称",
        "name": "mc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新价",
        "name": "zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌额",
        "name": "zde",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "买入",
        "name": "mr",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "卖出",
        "name": "mc",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "昨收",
        "name": "zs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "今开",
        "name": "jk",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高",
        "name": "zg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低",
        "name": "zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "int64",
        "description": "注意单位: 手",
        "unit": "手"
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "int64",
        "description": "注意单位: 万",
        "unit": "万"
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "历史行情数据",
    "name": "zq_lshqsj",
    "api": "bond_zh_hs_daily",
    "targetUrl": "https://money.finance.sina.com.cn/bond/quotes/sh019315.html",
    "description": "新浪财经-债券-沪深债券-历史行情数据, 历史数据按日频率更新",
    "remarks": "单次返回具体某个沪深转债的所有历史行情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"sh010107\"",
        "defaultValue": "sh010107",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "volume",
        "name": "volume",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "可转债-详情资料",
    "name": "zq_kzz_xqzl",
    "api": "bond_cb_profile_sina",
    "targetUrl": "https://money.finance.sina.com.cn/bond/info/sz128039.html",
    "description": "新浪财经-债券-可转债-详情资料",
    "remarks": "单次返回指定 symbol 的可转债-详情资料数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"sz128039\"; 带市场标识的转债代码",
        "defaultValue": "sz128039",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "item",
        "name": "item",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "value",
        "name": "value",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "可转债-债券概况",
    "name": "zq_kzz_zqgk",
    "api": "bond_cb_summary_sina",
    "targetUrl": "https://money.finance.sina.com.cn/bond/quotes/sh155255.html",
    "description": "新浪财经-债券-可转债-债券概况",
    "remarks": "单次返回指定 symbol 的可转债-债券概况数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"sh155255\"; 带市场标识的转债代码",
        "defaultValue": "sh155255",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "item",
        "name": "item",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "value",
        "name": "value",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "实时行情数据",
    "name": "zq_sshqsj2",
    "api": "bond_zh_hs_cov_spot",
    "targetUrl": "https://vip.stock.finance.sina.com.cn/mkt/#hskzz_z",
    "description": "新浪财经-沪深可转债数据",
    "remarks": "单次返回所有沪深可转债的实时行情数据",
    "inputParameters": [],
    "outputParameters": []
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "历史行情数据-日频",
    "name": "zq_lshqsj_rp",
    "api": "bond_zh_hs_cov_daily",
    "targetUrl": "https://biz.finance.sina.com.cn/suggest/lookup_n.php?q=sh110048",
    "description": "新浪财经-历史行情数据，日频率更新, 新上的标的需要次日更新数据",
    "remarks": "单次返回具体某个沪深可转债的所有历史行情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"sh113542\"",
        "defaultValue": "sh113542",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "volume",
        "name": "volume",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "历史行情数据-分时",
    "name": "zq_lshqsj_fs",
    "api": "bond_zh_hs_cov_min",
    "targetUrl": "https://quote.eastmoney.com/concept/sz128039.html",
    "description": "东方财富网-可转债-分时行情",
    "remarks": "单次返回指定可转债、指定频率、复权调整和时间区间的分时数据, 其中 1 分钟数据只返回近 1 个交易日数据且不复权; 其余 period 只能获取近期的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol='sz123106'; 转债代码",
        "defaultValue": "sz123106",
        "isRequired": false
      },
      {
        "title": "period",
        "name": "period",
        "type": "str",
        "description": "period='5'; choice of {'1', '5', '15', '30', '60'}; 其中 1 分钟数据返回近 1 个交易日数据且不复权",
        "defaultValue": "5",
        "choices": [
          1,
          5,
          15,
          30,
          60
        ],
        "isRequired": false
      },
      {
        "title": "adjust",
        "name": "adjust",
        "type": "str",
        "description": "adjust=''; choice of {'', 'qfq', 'hfq'}; '': 不复权, 'qfq': 前复权, 'hfq': 后复权, 其中 1 分钟数据返回近 1 个交易日数据且不复权",
        "defaultValue": "",
        "choices": [
          "",
          "qfq",
          "hfq"
        ],
        "isRequired": false
      },
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"1979-09-01 09:32:00\"; 日期时间; 默认返回所有数据",
        "defaultValue": "1979-09-01 09:32:00",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"2222-01-01 09:32:00\"; 日期时间; 默认返回所有数据",
        "defaultValue": "2222-01-01 09:32:00",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "时间",
        "name": "sj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "开盘",
        "name": "kp",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "收盘",
        "name": "sp",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高",
        "name": "zg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低",
        "name": "zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "涨跌额",
        "name": "zde",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "注意单位: 手",
        "unit": "手"
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "振幅",
        "name": "zf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "换手率",
        "name": "hsl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "历史行情数据-盘前分时",
    "name": "zq_lshqsj_pqfs",
    "api": "bond_zh_hs_cov_pre_min",
    "targetUrl": "https://quote.eastmoney.com/concept/sz128039.html",
    "description": "东方财富网-可转债-分时行情-盘前分时",
    "remarks": "单次返回指定可转债在最近一个交易日的盘前分时数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "时间",
        "name": "sj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "开盘",
        "name": "kp",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "收盘",
        "name": "sp",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高",
        "name": "zg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低",
        "name": "zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "注意单位: 手",
        "unit": "手"
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新价",
        "name": "zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "可转债数据一览表",
    "name": "zq_kzzsjylb",
    "api": "bond_zh_cov",
    "targetUrl": "https://data.eastmoney.com/kzz/default.html",
    "description": "东方财富网-数据中心-新股数据-可转债数据一览表",
    "remarks": "单次返回当前交易时刻的所有可转债数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "债券代码",
        "name": "zqdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "债券简称",
        "name": "zqjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "申购日期",
        "name": "sgrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "申购代码",
        "name": "sgdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "申购上限",
        "name": "sgsx",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "正股代码",
        "name": "zgdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "正股简称",
        "name": "zgjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "正股价",
        "name": "zgj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "转股价",
        "name": "zgj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "转股价值",
        "name": "zgjz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "债现价",
        "name": "zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "转股溢价率",
        "name": "zgyjl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "原股东配售-股权登记日",
        "name": "ygdps_gqdjr",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "原股东配售-每股配售额",
        "name": "ygdps_mgpse",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行规模",
        "name": "fhgm",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "中签号发布日",
        "name": "zqhfbr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "中签率",
        "name": "zql",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "上市时间",
        "name": "sssj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "信用评级",
        "name": "xypj",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "可转债详情",
    "name": "zq_kzzxq",
    "api": "bond_zh_cov_info",
    "targetUrl": "https://data.eastmoney.com/kzz/detail/123121.html",
    "description": "东方财富网-数据中心-新股数据-可转债详情",
    "remarks": "单次返回指定 symbol 的可转债详情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"123121\"; 可转债代码",
        "defaultValue": "123121",
        "isRequired": false
      },
      {
        "title": "indicator",
        "name": "indicator",
        "type": "str",
        "description": "indicator=\"基本信息\"; choice of {\"基本信息\", \"中签号\", \"筹资用途\", \"重要日期\"}, 其中 \"可转债重要条款\" 在 \"基本信息中\"",
        "defaultValue": "基本信息",
        "choices": [
          "基本信息",
          "中签号",
          "筹资用途",
          "重要日期"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "债券代码",
        "name": "zqdm",
        "type": "object",
        "description": "返回 67 个字段",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "可转债详情-同花顺",
    "name": "zq_kzzxq_ths",
    "api": "bond_zh_cov_info_ths",
    "targetUrl": "https://data.10jqka.com.cn/ipo/bond/",
    "description": "同花顺-数据中心-可转债",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "债券代码",
        "name": "zqdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "债券简称",
        "name": "zqjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "申购日期",
        "name": "sgrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "申购代码",
        "name": "sgdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "原股东配售码",
        "name": "ygdpsm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "每股获配额",
        "name": "mghpe",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "计划发行量",
        "name": "jhfxl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "实际发行量",
        "name": "sjfxl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "中签公布日",
        "name": "zqgbr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "中签号",
        "name": "zqh",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "上市日期",
        "name": "ssrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "正股代码",
        "name": "zgdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "正股简称",
        "name": "zgjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "转股价格",
        "name": "zgjg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "到期时间",
        "name": "dqsj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "中签率",
        "name": "zql",
        "type": "object",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "可转债比价表",
    "name": "zq_kzzbjb",
    "api": "bond_cov_comparison",
    "targetUrl": "https://quote.eastmoney.com/center/fullscreenlist.html#convertible_comparison",
    "description": "东方财富网-行情中心-债券市场-可转债比价表",
    "remarks": "单次返回当前交易时刻的所有可转债比价数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "序号",
        "name": "xh",
        "type": "int32",
        "description": "",
        "unit": ""
      },
      {
        "title": "转债代码",
        "name": "zzdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "转债名称",
        "name": "zzmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "转债最新价",
        "name": "zzzxj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "转债涨跌幅",
        "name": "zzzdf",
        "type": "object",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "正股代码",
        "name": "zgdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "正股名称",
        "name": "zgmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "正股最新价",
        "name": "zgzxj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "正股涨跌幅",
        "name": "zgzdf",
        "type": "object",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "转股价",
        "name": "zgj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "转股价值",
        "name": "zgjz",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "转股溢价率",
        "name": "zgyjl",
        "type": "object",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "纯债溢价率",
        "name": "czyjl",
        "type": "object",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "回售触发价",
        "name": "hscfj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "强赎触发价",
        "name": "qscfj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "到期赎回价",
        "name": "dqshj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "纯债价值",
        "name": "czjz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "开始转股日",
        "name": "kszgr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "上市日期",
        "name": "ssrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "申购日期",
        "name": "sgrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "可转债价值分析",
    "name": "zq_kzzjzfx",
    "api": "bond_zh_cov_value_analysis",
    "targetUrl": "https://data.eastmoney.com/kzz/detail/113527.html",
    "description": "东方财富网-行情中心-新股数据-可转债数据-可转债价值分析",
    "remarks": "单次返回所有可转债价值分析数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"113527\"; 可转债代码",
        "defaultValue": "113527",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "收盘价",
        "name": "spj",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "纯债价值",
        "name": "czjz",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "转股价值",
        "name": "zgjz",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "纯债溢价率",
        "name": "czyjl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "转股溢价率",
        "name": "zgyjl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "可转债溢价率分析",
    "name": "zq_kzzyjlfx",
    "api": "bond_zh_cov_value_analysis",
    "targetUrl": "https://data.eastmoney.com/kzz/detail/113527.html",
    "description": "东方财富网-行情中心-新股数据-可转债数据-可转债溢价率分析",
    "remarks": "单次返回所有可转债溢价率分析数据；此接口同 bond_zh_cov_value_analysis",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"113527\"; 可转债代码",
        "defaultValue": "113527",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "收盘价",
        "name": "spj",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "纯债价值",
        "name": "czjz",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "转股价值",
        "name": "zgjz",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "纯债溢价率",
        "name": "czyjl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "转股溢价率",
        "name": "zgyjl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "上证质押式回购",
    "name": "zq_szzyshg1",
    "api": "bond_sh_buy_back_em",
    "targetUrl": "https://quote.eastmoney.com/center/gridlist.html#bond_sh_buyback",
    "description": "东方财富网-行情中心-债券市场-上证质押式回购",
    "remarks": "单次返回所有行情数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "序号",
        "name": "xh",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "代码",
        "name": "dm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "名称",
        "name": "mc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新价",
        "name": "zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌额",
        "name": "zde",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "今开",
        "name": "jk",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高",
        "name": "zg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低",
        "name": "zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "昨收",
        "name": "zs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "深证质押式回购",
    "name": "zq_szzyshg2",
    "api": "bond_sz_buy_back_em",
    "targetUrl": "https://quote.eastmoney.com/center/gridlist.html#bond_sz_buyback",
    "description": "东方财富网-行情中心-债券市场-深证质押式回购",
    "remarks": "单次返回所有行情数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "序号",
        "name": "xh",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "代码",
        "name": "dm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "名称",
        "name": "mc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新价",
        "name": "zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌额",
        "name": "zde",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "今开",
        "name": "jk",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高",
        "name": "zg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低",
        "name": "zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "昨收",
        "name": "zs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "质押式回购历史数据",
    "name": "zq_zyshglssj",
    "api": "bond_buy_back_hist_em",
    "targetUrl": "https://quote.eastmoney.com/center/gridlist.html#bond_sh_buyback",
    "description": "东方财富网-行情中心-债券市场-质押式回购-历史数据",
    "remarks": "单次返回所有历史行情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"204001\"; 质押式回购代码",
        "defaultValue": "204001",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "开盘",
        "name": "kp",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "收盘",
        "name": "sp",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高",
        "name": "zg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低",
        "name": "zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "可转债实时数据-集思录",
    "name": "zq_kzzsssj_jsl",
    "api": "bond_cb_jsl",
    "targetUrl": "https://www.jisilu.cn/data/cbnew/#cb",
    "description": "集思录可转债实时数据，包含行情数据（涨跌幅，成交量和换手率等）及可转债基本信息（转股价，溢价率和到期收益率等）",
    "remarks": "单次返回当前交易时刻的所有数据",
    "inputParameters": [
      {
        "title": "cookie",
        "name": "cookie",
        "type": "str",
        "description": "cookie=''; 此处输入您的集思录 cookie 就可以获取完整数据，否则只能返回前 30 条",
        "defaultValue": "",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "代码",
        "name": "dm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "转债名称",
        "name": "zzmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "现价",
        "name": "xj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "正股代码",
        "name": "zgdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "正股名称",
        "name": "zgmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "正股价",
        "name": "zgj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "正股涨跌",
        "name": "zgzd",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "正股PB",
        "name": "zgPB",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "转股价",
        "name": "zgj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "转股价值",
        "name": "zgjz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "转股溢价率",
        "name": "zgyjl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "债券评级",
        "name": "zqpj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "回售触发价",
        "name": "hscfj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "强赎触发价",
        "name": "qscfj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "转债占比",
        "name": "zzzb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "到期时间",
        "name": "dqsj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "剩余年限",
        "name": "synx",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "剩余规模",
        "name": "sygm",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "换手率",
        "name": "hsl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "到期税前收益",
        "name": "dqsqsy",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "双低",
        "name": "sd",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "可转债强赎",
    "name": "zq_kzzqs",
    "api": "bond_cb_redeem_jsl",
    "targetUrl": "https://www.jisilu.cn/data/cbnew/#redeem",
    "description": "集思录可转债-强赎",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "代码",
        "name": "dm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "名称",
        "name": "mc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "现价",
        "name": "xj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "正股代码",
        "name": "zgdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "正股名称",
        "name": "zgmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "规模",
        "name": "gm",
        "type": "float64",
        "description": "注意单位: 亿",
        "unit": "亿"
      },
      {
        "title": "剩余规模",
        "name": "sygm",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "转股起始日",
        "name": "zgqsr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最后交易日",
        "name": "zhjyr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "到期日",
        "name": "dqr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "转股价",
        "name": "zgj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "强赎触发比",
        "name": "qscfb",
        "type": "int64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "强赎触发价",
        "name": "qscfj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "正股价",
        "name": "zgj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "强赎价",
        "name": "qsj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "强赎天计数",
        "name": "qstjs",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "强赎条款",
        "name": "qstk",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "强赎状态",
        "name": "qszt",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "集思录可转债等权指数",
    "name": "zq_jslkzzdqzs",
    "api": "bond_cb_index_jsl",
    "targetUrl": "https://www.jisilu.cn/web/data/cb/index",
    "description": "可转债-集思录可转债等权指数",
    "remarks": "单次返回所有历史数据数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "price_dt",
        "name": "price_dt",
        "type": "object",
        "description": "日期",
        "unit": ""
      },
      {
        "title": "price",
        "name": "price",
        "type": "float64",
        "description": "指数",
        "unit": ""
      },
      {
        "title": "amount",
        "name": "amount",
        "type": "float64",
        "description": "剩余规模(亿元)",
        "unit": ""
      },
      {
        "title": "volume",
        "name": "volume",
        "type": "float64",
        "description": "成交额(亿元)",
        "unit": ""
      },
      {
        "title": "count",
        "name": "count",
        "type": "int64",
        "description": "数量",
        "unit": ""
      },
      {
        "title": "increase_val",
        "name": "increase_val",
        "type": "float64",
        "description": "涨跌",
        "unit": ""
      },
      {
        "title": "increase_rt",
        "name": "increase_rt",
        "type": "float64",
        "description": "涨幅",
        "unit": ""
      },
      {
        "title": "avg_price",
        "name": "avg_price",
        "type": "float64",
        "description": "平均价格(元)",
        "unit": ""
      },
      {
        "title": "mid_price",
        "name": "mid_price",
        "type": "float64",
        "description": "中位数价格(元)",
        "unit": ""
      },
      {
        "title": "mid_convert_value",
        "name": "mid_convert_value",
        "type": "float64",
        "description": "中位数转股价值",
        "unit": ""
      },
      {
        "title": "avg_dblow",
        "name": "avg_dblow",
        "type": "float64",
        "description": "平均双底",
        "unit": ""
      },
      {
        "title": "avg_premium_rt",
        "name": "avg_premium_rt",
        "type": "float64",
        "description": "平均溢价率",
        "unit": ""
      },
      {
        "title": "mid_premium_rt",
        "name": "mid_premium_rt",
        "type": "float64",
        "description": "中位数溢价率",
        "unit": ""
      },
      {
        "title": "avg_ytm_rt",
        "name": "avg_ytm_rt",
        "type": "float64",
        "description": "平均收益率",
        "unit": ""
      },
      {
        "title": "turnover_rt",
        "name": "turnover_rt",
        "type": "float64",
        "description": "换手率",
        "unit": ""
      },
      {
        "title": "price_90",
        "name": "price_90",
        "type": "int64",
        "description": ">90",
        "unit": ""
      },
      {
        "title": "price_90_100",
        "name": "price_90_100",
        "type": "int64",
        "description": "90~100",
        "unit": ""
      },
      {
        "title": "price_100_110",
        "name": "price_100_110",
        "type": "int64",
        "description": "100~110",
        "unit": ""
      },
      {
        "title": "price_110_120",
        "name": "price_110_120",
        "type": "int64",
        "description": "110~120",
        "unit": ""
      },
      {
        "title": "price_120_130",
        "name": "price_120_130",
        "type": "int64",
        "description": "120~130",
        "unit": ""
      },
      {
        "title": "price_130",
        "name": "price_130",
        "type": "int64",
        "description": ">130",
        "unit": ""
      },
      {
        "title": "increase_rt_90",
        "name": "increase_rt_90",
        "type": "float64",
        "description": ">90涨幅",
        "unit": ""
      },
      {
        "title": "increase_rt_90_100",
        "name": "increase_rt_90_100",
        "type": "float64",
        "description": "90~100涨幅",
        "unit": ""
      },
      {
        "title": "increase_rt_100_110",
        "name": "increase_rt_100_110",
        "type": "float64",
        "description": "100~110涨幅",
        "unit": ""
      },
      {
        "title": "increase_rt_110_120",
        "name": "increase_rt_110_120",
        "type": "float64",
        "description": "110~120涨幅",
        "unit": ""
      },
      {
        "title": "increase_rt_120_130",
        "name": "increase_rt_120_130",
        "type": "float64",
        "description": "120~130涨幅",
        "unit": ""
      },
      {
        "title": "increase_rt_130",
        "name": "increase_rt_130",
        "type": "float64",
        "description": ">130涨幅",
        "unit": ""
      },
      {
        "title": "idx_price",
        "name": "idx_price",
        "type": "float64",
        "description": "沪深300指数",
        "unit": ""
      },
      {
        "title": "idx_increase_rt",
        "name": "idx_increase_rt",
        "type": "float64",
        "description": "沪深300指数涨幅",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "可转债转股价格调整记录-集思录",
    "name": "zq_kzzzgjgdzjl_jsl",
    "api": "bond_cb_adj_logs_jsl",
    "targetUrl": "https://app.jisilu.cn/data/cbnew/#cb; 点击带红色星号的转股价会弹出转股价调整记录",
    "description": "集思录-单个可转债的转股价格-调整记录",
    "remarks": "返回当前时刻该可转债的所有转股价格调整记录",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"128013\"; 可转债代码",
        "defaultValue": "128013",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "转债名称",
        "name": "zzmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "股东大会日",
        "name": "gddhr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "下修前转股价",
        "name": "xxqzgj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "下修后转股价",
        "name": "xxhzgj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "新转股价生效日期",
        "name": "xzgjsxrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "下修底价",
        "name": "xxdj",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "收盘收益率曲线历史数据",
    "name": "zq_spsylqxlssj",
    "api": "bond_china_close_return",
    "targetUrl": "https://www.chinamoney.com.cn/chinese/bkcurvclosedyhis/?bondType=CYCC000&reference=1",
    "description": "收盘收益率曲线历史数据, 该接口只能获取近 3 个月的数据，且每次获取的数据不超过 1 个月",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"政策性金融债(进出口行)\"; 通过网页查询或调用 **ak.bond_china_close_return_map()** 获取",
        "defaultValue": "政策性金融债(进出口行)",
        "isRequired": false
      },
      {
        "title": "period",
        "name": "period",
        "type": "str",
        "description": "period: str = \"1\"; 期限间隔, choice of {'0.1', '0.5', '1'}",
        "defaultValue": "1",
        "choices": [
          0.1,
          0.5,
          1
        ],
        "isRequired": false
      },
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"20231101\"; 结束日期, 结束日期和开始日期不要超过 1 个月",
        "defaultValue": "20231101",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"20231101\"; 结束日期, 结束日期和开始日期不要超过 1 个月",
        "defaultValue": "20231101",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "期限",
        "name": "qx",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "到期收益率",
        "name": "dqsyl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "即期收益率",
        "name": "jqsyl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "远期收益率",
        "name": "yqsyl",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "中美国债收益率",
    "name": "zq_zmgzsyl",
    "api": "bond_zh_us_rate",
    "targetUrl": "https://data.eastmoney.com/cjsj/zmgzsyl.html",
    "description": "东方财富网-数据中心-经济数据-中美国债收益率历史数据",
    "remarks": "返回 start_date 开始后的所有交易日的数据; 数据从 19901219 开始",
    "inputParameters": [
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"19901219\"",
        "defaultValue": "19901219",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "中国国债收益率2年",
        "name": "zggzsyl2n",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "中国国债收益率5年",
        "name": "zggzsyl5n",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "中国国债收益率10年",
        "name": "zggzsyl10n",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "中国国债收益率30年",
        "name": "zggzsyl30n",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "中国国债收益率10年-2年",
        "name": "zggzsyl10n_2n",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "中国GDP年增率",
        "name": "zgGDPnzl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "美国国债收益率2年",
        "name": "mggzsyl2n",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "美国国债收益率5年",
        "name": "mggzsyl5n",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "美国国债收益率10年",
        "name": "mggzsyl10n",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "美国国债收益率30年",
        "name": "mggzsyl30n",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "美国国债收益率10年-2年",
        "name": "mggzsyl10n_2n",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "美国GDP年增率",
        "name": "mgGDPnzl",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "国债发行",
    "name": "zq_gzfx",
    "api": "bond_treasure_issue_cninfo",
    "targetUrl": "https://webapi.cninfo.com.cn/#/thematicStatistics",
    "description": "巨潮资讯-数据中心-专题统计-债券报表-债券发行-国债发行",
    "inputParameters": [
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"20210911\"",
        "defaultValue": "20210911",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"20211110\"",
        "defaultValue": "20211110",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "债券代码",
        "name": "zqdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "债券简称",
        "name": "zqjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行起始日",
        "name": "fxqsr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行终止日",
        "name": "fxzzr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "计划发行总量",
        "name": "jhfxzl",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "实际发行总量",
        "name": "sjfxzl",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "发行价格",
        "name": "fxjg",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "单位面值",
        "name": "dwmz",
        "type": "int64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "缴款日",
        "name": "jkr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "增发次数",
        "name": "zfcs",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易市场",
        "name": "jysc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行方式",
        "name": "fxfs",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行对象",
        "name": "fxdx",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "公告日期",
        "name": "ggrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "债券名称",
        "name": "zqmc",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "地方债发行",
    "name": "zq_dfzfx",
    "api": "bond_local_government_issue_cninfo",
    "targetUrl": "https://webapi.cninfo.com.cn/#/thematicStatistics",
    "description": "巨潮资讯-数据中心-专题统计-债券报表-债券发行-地方债发行",
    "inputParameters": [
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"20210911\"",
        "defaultValue": "20210911",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"20211110\"",
        "defaultValue": "20211110",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "债券代码",
        "name": "zqdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "债券简称",
        "name": "zqjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行起始日",
        "name": "fxqsr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行终止日",
        "name": "fxzzr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "计划发行总量",
        "name": "jhfxzl",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "实际发行总量",
        "name": "sjfxzl",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "发行价格",
        "name": "fxjg",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "单位面值",
        "name": "dwmz",
        "type": "int64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "缴款日",
        "name": "jkr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "增发次数",
        "name": "zfcs",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易市场",
        "name": "jysc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行方式",
        "name": "fxfs",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行对象",
        "name": "fxdx",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "公告日期",
        "name": "ggrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "债券名称",
        "name": "zqmc",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "企业债发行",
    "name": "zq_qyzfx",
    "api": "bond_corporate_issue_cninfo",
    "targetUrl": "https://webapi.cninfo.com.cn/#/thematicStatistics",
    "description": "巨潮资讯-数据中心-专题统计-债券报表-债券发行-企业债发行",
    "inputParameters": [
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"20210911\"",
        "defaultValue": "20210911",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"20211110\"",
        "defaultValue": "20211110",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "债券代码",
        "name": "zqdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "债券简称",
        "name": "zqjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "公告日期",
        "name": "ggrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易所网上发行起始日",
        "name": "jyswsfxqsr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易所网上发行终止日",
        "name": "jyswsfxzzr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "计划发行总量",
        "name": "jhfxzl",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "实际发行总量",
        "name": "sjfxzl",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "发行面值",
        "name": "fxmz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行价格",
        "name": "fxjg",
        "type": "int64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "发行方式",
        "name": "fxfs",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行对象",
        "name": "fxdx",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行范围",
        "name": "fxfw",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "承销方式",
        "name": "cxfs",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最小认购单位",
        "name": "zxrgdw",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "募资用途说明",
        "name": "mzytsm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低认购额",
        "name": "zdrge",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "债券名称",
        "name": "zqmc",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "可转债发行",
    "name": "zq_kzzfx",
    "api": "bond_cov_issue_cninfo",
    "targetUrl": "https://webapi.cninfo.com.cn/#/thematicStatistics",
    "description": "巨潮资讯-数据中心-专题统计-债券报表-债券发行-可转债发行",
    "inputParameters": [
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"20210913\"",
        "defaultValue": "20210913",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"20211112\"",
        "defaultValue": "20211112",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "债券代码",
        "name": "zqdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "债券简称",
        "name": "zqjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "公告日期",
        "name": "ggrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行起始日",
        "name": "fxqsr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行终止日",
        "name": "fxzzr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "计划发行总量",
        "name": "jhfxzl",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "实际发行总量",
        "name": "sjfxzl",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "发行面值",
        "name": "fxmz",
        "type": "int64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "发行价格",
        "name": "fxjg",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "发行方式",
        "name": "fxfs",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行对象",
        "name": "fxdx",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "发行范围",
        "name": "fxfw",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "承销方式",
        "name": "cxfs",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "募资用途说明",
        "name": "mzytsm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "初始转股价格",
        "name": "cszgjg",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "转股开始日期",
        "name": "zgksrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "转股终止日期",
        "name": "zgzzrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "网上申购日期",
        "name": "wssgrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "网上申购代码",
        "name": "wssgdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "网上申购简称",
        "name": "wssgjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "网上申购数量上限",
        "name": "wssgslsx",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "网上申购数量下限",
        "name": "wssgslxx",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "网上申购单位",
        "name": "wssgdw",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "网上申购中签结果公告日及退款日",
        "name": "wssgzqjgggrjtkr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "优先申购日",
        "name": "yxsgr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "配售价格",
        "name": "psjg",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "债权登记日",
        "name": "zqdjr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "优先申购缴款日",
        "name": "yxsgjkr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "转股代码",
        "name": "zgdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易市场",
        "name": "jysc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "债券名称",
        "name": "zqmc",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "可转债转股",
    "name": "zq_kzzzg",
    "api": "bond_cov_stock_issue_cninfo",
    "targetUrl": "https://webapi.cninfo.com.cn/#/thematicStatistics",
    "description": "巨潮资讯-数据中心-专题统计-债券报表-债券发行-可转债转股",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "债券代码",
        "name": "zqdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "债券简称",
        "name": "zqjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "公告日期",
        "name": "ggrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "转股代码",
        "name": "zgdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "转股简称",
        "name": "zgjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "转股价格",
        "name": "zgjg",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "自愿转换期起始日",
        "name": "zyzhqqsr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "自愿转换期终止日",
        "name": "zyzhqzzr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "标的股票",
        "name": "bdgp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "债券名称",
        "name": "zqmc",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "新综合指数",
    "name": "zq_xzhzs",
    "api": "bond_new_composite_index_cbond",
    "targetUrl": "https://yield.chinabond.com.cn/cbweb-mn/indices/single_index_query",
    "description": "中国债券信息网-中债指数-中债指数族系-总指数-综合类指数-中债-新综合指数",
    "inputParameters": [
      {
        "title": "indicator",
        "name": "indicator",
        "type": "str",
        "description": "indicator=\"财富\"; choice of {\"全价\", \"净价\", \"财富\", \"平均市值法久期\", \"平均现金流法久期\", \"平均市值法凸性\", \"平均现金流法凸性\", \"平均现金流法到期收益率\", \"平均市值法到期收益率\", \"平均基点价值\", \"平均待偿期\", \"平均派息率\", \"指数上日总市值\", \"财富指数涨跌幅\", \"全价指数涨跌幅\", \"净价指数涨跌幅\", \"现券结算量\"}",
        "defaultValue": "财富",
        "choices": [
          "全价",
          "净价",
          "财富",
          "平均市值法久期",
          "平均现金流法久期",
          "平均市值法凸性",
          "平均现金流法凸性",
          "平均现金流法到期收益率",
          "平均市值法到期收益率",
          "平均基点价值",
          "平均待偿期",
          "平均派息率",
          "指数上日总市值",
          "财富指数涨跌幅",
          "全价指数涨跌幅",
          "净价指数涨跌幅",
          "现券结算量"
        ],
        "isRequired": false
      },
      {
        "title": "period",
        "name": "period",
        "type": "str",
        "description": "period=\"总值\"; choice of {\"总值\", \"1年以下\", \"1-3年\", \"3-5年\", \"5-7年\", \"7-10年\", \"10年以上\", \"0-3个月\", \"3-6个月\", \"6-9个月\", \"9-12个月\", \"0-6个月\", \"6-12个月\"}",
        "defaultValue": "总值",
        "choices": [
          "总值",
          "1年以下",
          "1-3年",
          "3-5年",
          "5-7年",
          "7-10年",
          "10年以上",
          "0-3个月",
          "3-6个月",
          "6-9个月",
          "9-12个月",
          "0-6个月",
          "6-12个月"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "value",
        "name": "value",
        "type": "float64",
        "description": "注意单位",
        "unit": ""
      }
    ],
    "remarks": ""
  },
  {
    "moduleTitle": "债券数据",
    "moduleName": "bond",
    "title": "综合指数",
    "name": "zq_zhzs",
    "api": "bond_composite_index_cbond",
    "targetUrl": "https://yield.chinabond.com.cn/cbweb-mn/indices/single_index_query",
    "description": "中国债券信息网-中债指数-中债指数族系-总指数-综合类指数-中债-综合指数",
    "remarks": "",
    "inputParameters": [
      {
        "title": "indicator",
        "name": "indicator",
        "type": "str",
        "description": "indicator=\"财富\"; choice of {\"全价\", \"净价\", \"财富\", \"平均市值法久期\", \"平均现金流法久期\", \"平均市值法凸性\", \"平均现金流法凸性\", \"平均现金流法到期收益率\", \"平均市值法到期收益率\", \"平均基点价值\", \"平均待偿期\", \"平均派息率\", \"指数上日总市值\", \"财富指数涨跌幅\", \"全价指数涨跌幅\", \"净价指数涨跌幅\", \"现券结算量\"}",
        "defaultValue": "财富",
        "choices": [
          "全价",
          "净价",
          "财富",
          "平均市值法久期",
          "平均现金流法久期",
          "平均市值法凸性",
          "平均现金流法凸性",
          "平均现金流法到期收益率",
          "平均市值法到期收益率",
          "平均基点价值",
          "平均待偿期",
          "平均派息率",
          "指数上日总市值",
          "财富指数涨跌幅",
          "全价指数涨跌幅",
          "净价指数涨跌幅",
          "现券结算量"
        ],
        "isRequired": false
      },
      {
        "title": "period",
        "name": "period",
        "type": "str",
        "description": "period=\"总值\"; choice of {\"总值\", \"1年以下\", \"1-3年\", \"3-5年\", \"5-7年\", \"7-10年\", \"10年以上\", \"0-3个月\", \"3-6个月\", \"6-9个月\", \"9-12个月\", \"0-6个月\", \"6-12个月\"}",
        "defaultValue": "总值",
        "choices": [
          "总值",
          "1年以下",
          "1-3年",
          "3-5年",
          "5-7年",
          "7-10年",
          "10年以上",
          "0-3个月",
          "3-6个月",
          "6-9个月",
          "9-12个月",
          "0-6个月",
          "6-12个月"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "value",
        "name": "value",
        "type": "float64",
        "description": "注意单位",
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
  return bondInterfaces.find(item => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return bondInterfaces.find(item => item.name === name);
}

export default bondInterfaces;
