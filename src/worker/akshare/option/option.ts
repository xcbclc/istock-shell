/**
 * @fileoverview option AKShare接口定义
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
 * option接口数据
 */
export const optionInterfaces: ApiInterface[] = [
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "行情数据",
    "name": "hqsj",
    "api": "option_finance_board",
    "targetUrl": "",
    "description": "上海证券交易所、深圳证券交易所、中国金融期货交易所的金融期权行情数据",
    "remarks": "单次返回当前交易日指定合约期权行情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"华泰柏瑞沪深300ETF期权\"; 合约名称: **期权基础信息-金融期权**",
        "defaultValue": "华泰柏瑞沪深300ETF期权",
        "isRequired": false
      },
      {
        "title": "end_month",
        "name": "end_month",
        "type": "str",
        "description": "end_month=\"2306\"; 合约到期月份: 2023 年 6 月, 只能获取近期合约的数据",
        "defaultValue": "2306",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "日期时间",
        "unit": ""
      },
      {
        "title": "数量",
        "name": "sl",
        "type": "int64",
        "description": "当前总的合约数量",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "风险指标-上海证券交易所",
    "name": "fxzb_shzqjys",
    "api": "option_risk_indicator_sse",
    "targetUrl": "http://www.sse.com.cn/assortment/options/risk/",
    "description": "上海证券交易所-产品-股票期权-期权风险指标数据",
    "remarks": "单次返回指定 date 的数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240626\"; 交易日; 从 20150209 开始",
        "defaultValue": "20240626",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "TRADE_DATE",
        "name": "TRADE_DATE",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "SECURITY_ID",
        "name": "SECURITY_ID",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "CONTRACT_ID",
        "name": "CONTRACT_ID",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "CONTRACT_SYMBOL",
        "name": "CONTRACT_SYMBOL",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "DELTA_VALUE",
        "name": "DELTA_VALUE",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "THETA_VALUE",
        "name": "THETA_VALUE",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "GAMMA_VALUE",
        "name": "GAMMA_VALUE",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "VEGA_VALUE",
        "name": "VEGA_VALUE",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "RHO_VALUE",
        "name": "RHO_VALUE",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "IMPLC_VOLATLTY",
        "name": "IMPLC_VOLATLTY",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "每日统计-上海证券交易所",
    "name": "mrtj_shzqjys",
    "api": "option_daily_stats_sse",
    "targetUrl": "http://www.sse.com.cn/assortment/options/date/",
    "description": "上海证券交易所-产品-股票期权-每日统计",
    "remarks": "单次返回指定 date 的数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240626\"; 交易日",
        "defaultValue": "20240626",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "合约标的代码",
        "name": "hybddm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "合约标的名称",
        "name": "hybdmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "合约数量",
        "name": "hysl",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "总成交额",
        "name": "zcje",
        "type": "int64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "总成交量",
        "name": "zcjl",
        "type": "int64",
        "description": "注意单位: 张",
        "unit": "张"
      },
      {
        "title": "认购成交量",
        "name": "rgcjl",
        "type": "int64",
        "description": "注意单位: 张",
        "unit": "张"
      },
      {
        "title": "认沽成交量",
        "name": "rgcjl",
        "type": "int64",
        "description": "注意单位: 张",
        "unit": "张"
      },
      {
        "title": "认沽/认购",
        "name": "rg/rg",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "未平仓合约总数",
        "name": "wpchyzs",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "未平仓认购合约数",
        "name": "wpcrghys",
        "type": "floaint64t64",
        "description": "",
        "unit": ""
      },
      {
        "title": "未平仓认沽合约数",
        "name": "wpcrghys",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "每日统计-深圳证券交易所",
    "name": "mrtj_szzqjys",
    "api": "option_daily_stats_szse",
    "targetUrl": "https://investor.szse.cn/market/option/day/index.html",
    "description": "深圳证券交易所-市场数据-期权数据-日度概况",
    "remarks": "单次返回指定 date 的数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240626\"; 交易日",
        "defaultValue": "20240626",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "合约标的代码",
        "name": "hybddm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "合约标的名称",
        "name": "hybdmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "int64",
        "description": "注意单位: 张",
        "unit": "张"
      },
      {
        "title": "认购成交量",
        "name": "rgcjl",
        "type": "int64",
        "description": "注意单位: 张",
        "unit": "张"
      },
      {
        "title": "认沽成交量",
        "name": "rgcjl",
        "type": "int64",
        "description": "注意单位: 张",
        "unit": "张"
      },
      {
        "title": "认沽/认购持仓比",
        "name": "rg/rgccb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "未平仓合约总数",
        "name": "wpchyzs",
        "type": "int64",
        "description": "注意单位: 张",
        "unit": "张"
      },
      {
        "title": "未平仓认购合约数",
        "name": "wpcrghys",
        "type": "int64",
        "description": "注意单位: 张",
        "unit": "张"
      },
      {
        "title": "未平仓认沽合约数",
        "name": "wpcrghys",
        "type": "int64",
        "description": "注意单位: 张",
        "unit": "张"
      },
      {
        "title": "交易日",
        "name": "jyr",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "上证50指数列表",
    "name": "sz50zslb",
    "api": "option_cffex_sz50_list_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsCffexDP.php/ho/cffex",
    "description": "中金所-上证50指数-所有合约, 返回的第一个合约为主力合约",
    "remarks": "单次返回所有合约",
    "inputParameters": [],
    "outputParameters": []
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "沪深300指数列表",
    "name": "hs300zslb",
    "api": "option_cffex_hs300_list_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsCffexDP.php",
    "description": "中金所-沪深300指数-所有合约, 返回的第一个合约为主力合约",
    "remarks": "单次返回所有合约",
    "inputParameters": [],
    "outputParameters": []
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "中证1000指数列表",
    "name": "zz1000zslb",
    "api": "option_cffex_zz1000_list_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsCffexDP.php",
    "description": "中金所-中证1000指数-所有合约, 返回的第一个合约为主力合约",
    "remarks": "单次返回所有合约",
    "inputParameters": [],
    "outputParameters": []
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "实时行情-上证50指数",
    "name": "sshq_sz50zs",
    "api": "option_cffex_sz50_spot_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsCffexDP.php/ho/cffex",
    "description": "新浪财经-中金所-上证50指数-指定合约-实时行情",
    "remarks": "单次返回指定合约的实时行情",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"ho2303\"",
        "defaultValue": "ho2303",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "看涨合约-买量",
        "name": "kzhy_ml",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-买价",
        "name": "kzhy_mj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-最新价",
        "name": "kzhy_zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-卖价",
        "name": "kzhy_mj",
        "type": "float",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-卖量",
        "name": "kzhy_ml",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-持仓量",
        "name": "kzhy_ccl",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-涨跌",
        "name": "kzhy_zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "行权价",
        "name": "xqj",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-标识",
        "name": "kzhy_bs",
        "type": "object",
        "description": "看涨合约代码",
        "unit": ""
      },
      {
        "title": "看跌合约-买量",
        "name": "kdhy_ml",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-买价",
        "name": "kdhy_mj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-最新价",
        "name": "kdhy_zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-卖价",
        "name": "kdhy_mj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-卖量",
        "name": "kdhy_ml",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-持仓量",
        "name": "kdhy_ccl",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-涨跌",
        "name": "kdhy_zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-标识",
        "name": "kdhy_bs",
        "type": "object",
        "description": "看跌合约代码",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "实时行情-沪深300指数",
    "name": "sshq_hs300zs",
    "api": "option_cffex_hs300_spot_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsCffexDP.php",
    "description": "新浪财经-中金所-沪深300指数-指定合约-实时行情",
    "remarks": "单次返回指定合约的实时行情",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"io2104\"",
        "defaultValue": "io2104",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "看涨合约-买量",
        "name": "kzhy_ml",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-买价",
        "name": "kzhy_mj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-最新价",
        "name": "kzhy_zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-卖价",
        "name": "kzhy_mj",
        "type": "float",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-卖量",
        "name": "kzhy_ml",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-持仓量",
        "name": "kzhy_ccl",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-涨跌",
        "name": "kzhy_zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "行权价",
        "name": "xqj",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-标识",
        "name": "kzhy_bs",
        "type": "object",
        "description": "看涨合约代码",
        "unit": ""
      },
      {
        "title": "看跌合约-买量",
        "name": "kdhy_ml",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-买价",
        "name": "kdhy_mj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-最新价",
        "name": "kdhy_zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-卖价",
        "name": "kdhy_mj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-卖量",
        "name": "kdhy_ml",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-持仓量",
        "name": "kdhy_ccl",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-涨跌",
        "name": "kdhy_zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-标识",
        "name": "kdhy_bs",
        "type": "object",
        "description": "看跌合约代码",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "实时行情-中证1000指数",
    "name": "sshq_zz1000zs",
    "api": "option_cffex_zz1000_spot_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsCffexDP.php",
    "description": "新浪财经-中金所-中证1000指数-指定合约-实时行情",
    "remarks": "单次返回指定合约的实时行情",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"mo2208\"",
        "defaultValue": "mo2208",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "看涨合约-买量",
        "name": "kzhy_ml",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-买价",
        "name": "kzhy_mj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-最新价",
        "name": "kzhy_zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-卖价",
        "name": "kzhy_mj",
        "type": "float",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-卖量",
        "name": "kzhy_ml",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-持仓量",
        "name": "kzhy_ccl",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-涨跌",
        "name": "kzhy_zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "行权价",
        "name": "xqj",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-标识",
        "name": "kzhy_bs",
        "type": "object",
        "description": "看涨合约代码",
        "unit": ""
      },
      {
        "title": "看跌合约-买量",
        "name": "kdhy_ml",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-买价",
        "name": "kdhy_mj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-最新价",
        "name": "kdhy_zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-卖价",
        "name": "kdhy_mj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-卖量",
        "name": "kdhy_ml",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-持仓量",
        "name": "kdhy_ccl",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-涨跌",
        "name": "kdhy_zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-标识",
        "name": "kdhy_bs",
        "type": "object",
        "description": "看跌合约代码",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "日频行情-上证50指数",
    "name": "rphq_sz50zs",
    "api": "option_cffex_sz50_daily_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsCffexDP.php/ho/cffex",
    "description": "中金所-上证50指数-指定合约-日频行情",
    "remarks": "单次返回指定合约的日频行情",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"ho2303P2350\"; 具体合约代码(包括看涨和看跌标识), 可以通过 ak.option_cffex_sz50_spot_sina 中的 call-标识 获取",
        "defaultValue": "ho2303P2350",
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
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "日频行情-沪深300指数",
    "name": "rphq_hs300zs",
    "api": "option_cffex_hs300_daily_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsCffexDP.php",
    "description": "中金所-沪深300指数-指定合约-日频行情",
    "remarks": "单次返回指定合约的日频行情",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"io2202P4350\"; 具体合约代码(包括看涨和看跌标识), 可以通过 ak.option_cffex_hs300_spot_sina 中的 call-标识 获取",
        "defaultValue": "io2202P4350",
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
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "日频行情-中证1000指数",
    "name": "rphq_zz1000zs",
    "api": "option_cffex_zz1000_daily_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsCffexDP.php",
    "description": "中金所-中证1000指数-指定合约-日频行情",
    "remarks": "单次返回指定合约的日频行情",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"mo2208P6200\"; 具体合约代码(包括看涨和看跌标识), 可以通过 ak.option_cffex_zz1000_spot_sina 中的 call-标识 获取",
        "defaultValue": "mo2208P6200",
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
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "合约到期月份列表",
    "name": "hydqyflb",
    "api": "option_sse_list_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsCffexDP.php",
    "description": "获取期权-上交所-50ETF-合约到期月份列表",
    "remarks": "单次返回指定品种的到期月份列表",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"50ETF\"; \"50ETF\" or \"300ETF\"",
        "defaultValue": "50ETF",
        "isRequired": false
      },
      {
        "title": "exchange",
        "name": "exchange",
        "type": "str",
        "description": "exchange=\"null\"",
        "defaultValue": "null",
        "isRequired": false
      }
    ],
    "outputParameters": []
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "合约到期月份列表",
    "name": "hydqyflb",
    "api": "option_sse_expire_day_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsCffexDP.php",
    "description": "获取指定到期月份指定品种的剩余到期时间",
    "remarks": "单次返回指定品种的品种的剩余到期时间",
    "inputParameters": [
      {
        "title": "trade_date",
        "name": "trade_date",
        "type": "str",
        "description": "trade_date=\"202002\";",
        "defaultValue": "202002",
        "isRequired": false
      },
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"50ETF\"; \"50ETF\" or \"300ETF\"",
        "defaultValue": "50ETF",
        "isRequired": false
      },
      {
        "title": "exchange",
        "name": "exchange",
        "type": "str",
        "description": "exchange=\"null\"",
        "defaultValue": "null",
        "isRequired": false
      }
    ],
    "outputParameters": []
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "所有合约的代码",
    "name": "syhyddm",
    "api": "option_sse_codes_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsCffexDP.php",
    "description": "新浪期权-看涨看跌合约合约的代码",
    "remarks": "单次返回指定 symbol 合约的代码",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"看涨期权\"; choice of {\"看涨期权\", \"看跌期权\"}",
        "defaultValue": "看涨期权",
        "choices": [
          "看涨期权",
          "看跌期权"
        ],
        "isRequired": false
      },
      {
        "title": "trade_date",
        "name": "trade_date",
        "type": "str",
        "description": "trade_date=\"202002\";",
        "defaultValue": "202002",
        "isRequired": false
      },
      {
        "title": "underlying",
        "name": "underlying",
        "type": "str",
        "description": "underlying=\"510300\"",
        "defaultValue": "510300",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "序号",
        "name": "xh",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "期权代码",
        "name": "qqdm",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "实时数据",
    "name": "sssj",
    "api": "option_sse_spot_price_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsCffexDP.php",
    "description": "期权实时数据",
    "remarks": "单次返回期权实时数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"10002273\"",
        "defaultValue": "10002273",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "字段",
        "name": "zd",
        "type": "str",
        "description": "",
        "unit": ""
      },
      {
        "title": "值",
        "name": "z",
        "type": "str",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "期权标的物的实时数据",
    "name": "qqbdwdsssj",
    "api": "option_sse_underlying_spot_price_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsCffexDP.php",
    "description": "获取期权标的物的实时数据",
    "remarks": "单次返回期权标的物的实时数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"sh510300\"",
        "defaultValue": "sh510300",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "字段",
        "name": "zd",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "值",
        "name": "z",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "期权希腊字母信息表",
    "name": "qqxlzmxxb",
    "api": "option_sse_greeks_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsCffexDP.php",
    "description": "新浪财经-期权希腊字母信息表",
    "remarks": "单次返回当前交易日的期权希腊字母信息表",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"10002273\"",
        "defaultValue": "10002273",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "字段",
        "name": "zd",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "值",
        "name": "z",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "期权行情分钟数据",
    "name": "qqhqfzsj",
    "api": "option_sse_minute_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsCffexDP.php",
    "description": "期权行情分钟数据, 只能返还当天的分钟数据",
    "remarks": "单次返回期权行情分钟数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"10002273\"",
        "defaultValue": "10002273",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "当前交易日",
        "unit": ""
      },
      {
        "title": "时间",
        "name": "sj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "价格",
        "name": "jg",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交",
        "name": "cj",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "持仓",
        "name": "cc",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "均价",
        "name": "jj",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "期权行情日数据",
    "name": "qqhqrsj",
    "api": "option_sse_daily_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsCffexDP.php",
    "description": "期权行情日数据",
    "remarks": "单次返回期权行情日数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"10002273\"",
        "defaultValue": "10002273",
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
        "title": "收盘",
        "name": "sp",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交",
        "name": "cj",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "期权行情分时数据-新浪",
    "name": "qqhqfssj_xl",
    "api": "option_finance_minute_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/option/quotes.html",
    "description": "新浪财经-金融期权-股票期权分时行情数据",
    "remarks": "单次返回指定期权的分时行情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"10002530\"; 通过 **ak.option_sse_codes_sina()** 获取",
        "defaultValue": "10002530",
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
        "title": "time",
        "name": "time",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "price",
        "name": "price",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "average_price",
        "name": "average_price",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "volume",
        "name": "volume",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "期权行情分时数据-东财",
    "name": "qqhqfssj_dc",
    "api": "option_minute_em",
    "targetUrl": "https://wap.eastmoney.com/quote/stock/151.cu2404P61000.html",
    "description": "东方财富网-行情中心-期权市场-分时行情",
    "remarks": "单次返回指定 symbol 的分时行情数据; 只能获取近期合约的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"MO2402-C-5400\"; 通过 **ak.option_current_em()** 获取",
        "defaultValue": "MO2402-C-5400",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "time",
        "name": "time",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "volume",
        "name": "volume",
        "type": "int64",
        "description": "注意单位: 手",
        "unit": "手"
      },
      {
        "title": "amount",
        "name": "amount",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "期权实时行情-东方财富",
    "name": "qqsshq_dfcf",
    "api": "option_current_em",
    "targetUrl": "https://quote.eastmoney.com/center/qqsc.html",
    "description": "东方财富网-行情中心-期权市场",
    "remarks": "单次返回全部合约的实时行情",
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
        "description": "注意单位: %",
        "unit": "%"
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
      },
      {
        "title": "持仓量",
        "name": "ccl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "行权价",
        "name": "xqj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "剩余日",
        "name": "syr",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "日增",
        "name": "rz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "昨结",
        "name": "zj",
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
        "title": "市场标识",
        "name": "scbs",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "期权龙虎榜-金融期权",
    "name": "qqlhb_jrqq",
    "api": "option_lhb_em",
    "targetUrl": "https://data.eastmoney.com/other/qqlhb.html",
    "description": "东方财富网-数据中心-期货期权-期权龙虎榜单-金融期权",
    "remarks": "单次返回指定 symbol, indicator 和 trade_date 的所有数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"510050\"; choice of {\"510050\", \"510300\", \"159919\"}",
        "defaultValue": "510050",
        "choices": [
          510050,
          510300,
          159919
        ],
        "isRequired": false
      },
      {
        "title": "indicator",
        "name": "indicator",
        "type": "str",
        "description": "indicator=\"期权交易情况-认沽交易量\"; choice of {\"期权交易情况-认沽交易量\",\"期权持仓情况-认沽持仓量\", \"期权交易情况-认购交易量\", \"期权持仓情况-认购持仓量\"}",
        "defaultValue": "期权交易情况-认沽交易量",
        "choices": [
          "期权交易情况-认沽交易量",
          "期权持仓情况-认沽持仓量",
          "期权交易情况-认购交易量",
          "期权持仓情况-认购持仓量"
        ],
        "isRequired": false
      },
      {
        "title": "trade_date",
        "name": "trade_date",
        "type": "str",
        "description": "trade_date=\"20220121\"",
        "defaultValue": "20220121",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "交易类型",
        "name": "jylx",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易日期",
        "name": "jyrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "证券代码",
        "name": "zqdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "标的名称",
        "name": "bdmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "名次",
        "name": "mc",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "机构",
        "name": "jg",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "XX量",
        "name": "XXl",
        "type": "float64",
        "description": "注意: 根据 indicator 而变化",
        "unit": ""
      },
      {
        "title": "增减",
        "name": "zj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "净XX量",
        "name": "jXXl",
        "type": "float64",
        "description": "注意: 根据 indicator 而变化",
        "unit": ""
      },
      {
        "title": "占总交易量比例",
        "name": "zzjylbl",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "期权价值分析-金融期权",
    "name": "qqjzfx_jrqq",
    "api": "option_value_analysis_em",
    "targetUrl": "https://data.eastmoney.com/other/valueAnal.html",
    "description": "东方财富网-数据中心-特色数据-期权价值分析",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "期权代码",
        "name": "qqdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "期权名称",
        "name": "qqmc",
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
        "title": "时间价值",
        "name": "sjjz",
        "type": "float64",
        "description": "注意: 指在期权剩余有效期内，合约标的价格变动有利于期权权利方的可能性。时间价值和内在价值共同构成期权的总价值。",
        "unit": ""
      },
      {
        "title": "内在价值",
        "name": "nzjz",
        "type": "float64",
        "description": "注意: 指假如期权立即履行时该期权的价值，只能为正数或者为零。内在价值与时间价值共同构成期权的总价值。",
        "unit": ""
      },
      {
        "title": "隐含波动率",
        "name": "yhbdl",
        "type": "float64",
        "description": "注意: 指期权市场投资者在进行期权交易时对未来波动率的认识，且该认识已反映在期权的定价过程中。",
        "unit": ""
      },
      {
        "title": "理论价格",
        "name": "lljg",
        "type": "float64",
        "description": "注意: 采用 Black-Scholes 期权定价模型，推导出的期权理论价格。",
        "unit": ""
      },
      {
        "title": "标的名称",
        "name": "bdmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "标的最新价",
        "name": "bdzxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "标的近一年波动率",
        "name": "bdjynbdl",
        "type": "float64",
        "description": "注意: 指一种衡量股票价格变化剧烈程度的指标，一般用百分数表示。股价波动率与认购期权、认沽期权价值均为正相关关系。",
        "unit": ""
      },
      {
        "title": "到期日",
        "name": "dqr",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "期权风险分析-金融期权",
    "name": "qqfxfx_jrqq",
    "api": "option_risk_analysis_em",
    "targetUrl": "https://data.eastmoney.com/other/riskanal.html",
    "description": "东方财富网-数据中心-特色数据-期权风险分析",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "期权代码",
        "name": "qqdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "期权名称",
        "name": "qqmc",
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
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "注意单位: %;",
        "unit": "%"
      },
      {
        "title": "杠杆比率",
        "name": "ggbl",
        "type": "float64",
        "description": "注意: 杠杆比率=标价价格÷期权价格，杠杆反映投资标的相对投资期权的成本比例。",
        "unit": ""
      },
      {
        "title": "实际杠杆比率",
        "name": "sjggbl",
        "type": "float64",
        "description": "注意: 实际杠杆比率=对冲值×杠杆比率，透过实际杠杆比率，投资者可知道当标的涨跌1%时，期权的理论价格会变动多少个百分点。",
        "unit": ""
      },
      {
        "title": "Delta",
        "name": "Delta",
        "type": "float64",
        "description": "注意: 指期权标的股票价格变化对期权价格的影响程度。Delta=期权价格变化/期权标的股票价格变化。股票价格与认购期权价值为正相关关系，与认沽期权价值为负相关关系。",
        "unit": ""
      },
      {
        "title": "Gamma",
        "name": "Gamma",
        "type": "float64",
        "description": "注意: 指期权标的股票价格变化对Delta值的影响程度。Gamma=Delta的变化／期权标的股票价格变化。",
        "unit": ""
      },
      {
        "title": "Vega",
        "name": "Vega",
        "type": "float64",
        "description": "注意: 指合约标的证券价格波动率变化对期权价值的影响程度。Vega=期权价值变化/波动率的变化。波动率与认购、认沽期权价值均为正相关关系。",
        "unit": ""
      },
      {
        "title": "Rho",
        "name": "Rho",
        "type": "float64",
        "description": "注意: 指无风险利率变化对期权价格的影响程度。Rho=期权价格的变化／无风险利率的变化。市场无风险利率与认购期权价值为正相关，与认沽期权为负相关。",
        "unit": ""
      },
      {
        "title": "Theta",
        "name": "Theta",
        "type": "float64",
        "description": "注意: 指到期时间变化对期权价值的影响程度。Theta=期权价值变化/到期时间变化。到期期限与认购、认沽期权价值均为正相关关系。",
        "unit": ""
      },
      {
        "title": "到期日",
        "name": "dqr",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "期权折溢价-金融期权",
    "name": "qqzyj_jrqq",
    "api": "option_premium_analysis_em",
    "targetUrl": "https://data.eastmoney.com/other/premium.html",
    "description": "东方财富网-数据中心-特色数据-期权折溢价",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "期权代码",
        "name": "qqdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "期权名称",
        "name": "qqmc",
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
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "注意单位: %;",
        "unit": "%"
      },
      {
        "title": "行权价",
        "name": "xqj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "折溢价率",
        "name": "zyjl",
        "type": "float64",
        "description": "注意: 折溢价反映的是投资者以现价买入某期权并持有至到期时，标的需要上升或下跌多少才能使这笔投资保本。",
        "unit": ""
      },
      {
        "title": "标的名称",
        "name": "bdmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "标的最新价",
        "name": "bdzxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "标的涨跌幅",
        "name": "bdzdf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "盈亏平衡价",
        "name": "ykphj",
        "type": "float64",
        "description": "注意: 指期权投资者实现投资收益为零时标的证券的价格。",
        "unit": ""
      },
      {
        "title": "到期日",
        "name": "dqr",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "当前合约",
    "name": "dqhy",
    "api": "option_commodity_contract_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsDP.php",
    "description": "新浪财经-商品期权当前在交易的合约",
    "remarks": "单次返回指定 symbol 的所有合约数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"玉米期权\"",
        "defaultValue": "玉米期权",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "序号",
        "name": "xh",
        "type": "str",
        "description": "",
        "unit": ""
      },
      {
        "title": "合约",
        "name": "hy",
        "type": "str",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "当前合约",
    "name": "dqhy",
    "api": "option_commodity_contract_table_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsDP.php",
    "description": "新浪财经-商品期权的 T 型报价表",
    "remarks": "单次返回指定 symbol 和 contract 的所有数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"玉米期权\"",
        "defaultValue": "玉米期权",
        "isRequired": false
      },
      {
        "title": "contract",
        "name": "contract",
        "type": "str",
        "description": "contract=\"au2204\"; 可以通过 ak.option_commodity_contract_sina() 接口获取",
        "defaultValue": "au2204",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "看涨合约-买量",
        "name": "kzhy_ml",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-买价",
        "name": "kzhy_mj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-最新价",
        "name": "kzhy_zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-卖价",
        "name": "kzhy_mj",
        "type": "float",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-卖量",
        "name": "kzhy_ml",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-持仓量",
        "name": "kzhy_ccl",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-涨跌",
        "name": "kzhy_zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "行权价",
        "name": "xqj",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看涨合约-看涨期权合约",
        "name": "kzhy_kzqqhy",
        "type": "object",
        "description": "看涨合约代码",
        "unit": ""
      },
      {
        "title": "看跌合约-买量",
        "name": "kdhy_ml",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-买价",
        "name": "kdhy_mj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-最新价",
        "name": "kdhy_zxj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-卖价",
        "name": "kdhy_mj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-卖量",
        "name": "kdhy_ml",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-持仓量",
        "name": "kdhy_ccl",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-涨跌",
        "name": "kdhy_zd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "看跌合约-看跌期权合约",
        "name": "kdhy_kdqqhy",
        "type": "object",
        "description": "看跌合约代码",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "历史行情",
    "name": "lshq",
    "api": "option_commodity_hist_sina",
    "targetUrl": "https://stock.finance.sina.com.cn/futures/view/optionsDP.php",
    "description": "新浪财经-商品期权的历史行情数据-日频率",
    "remarks": "单次返回指定合约的历史行情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"au2012C328\"; 可以通过 ak.option_commodity_contract_table_sina() 获取具体合约代码",
        "defaultValue": "au2012C328",
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
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "商品期权手续费",
    "name": "spqqsxf",
    "api": "option_comm_info",
    "targetUrl": "https://www.9qihuo.com/qiquanshouxufei",
    "description": "九期网-商品期权手续费数据",
    "remarks": "单次返回指定 symbol 的所有数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"工业硅期权\"; 可以通过 ak.option_comm_symbol() 所有 symbol",
        "defaultValue": "工业硅期权",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "期权品种",
        "name": "qqpz",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "现价",
        "name": "xj",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨/跌停板",
        "name": "z/dtb",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "类型",
        "name": "lx",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "权利金",
        "name": "qlj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "开仓",
        "name": "kc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "平昨",
        "name": "pz",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "平今",
        "name": "pj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "行权",
        "name": "xq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "每跳毛利/元",
        "name": "mtml/y",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "手续费(开+平)",
        "name": "sxf_k+p",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "每跳净利/元",
        "name": "mtjl/y",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "备注",
        "name": "bz",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易所",
        "name": "jys",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "手续费更新时间",
        "name": "sxfgxsj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "价格更新时间",
        "name": "jggxsj",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "商品期权保证金",
    "name": "spqqbzj",
    "api": "option_margin",
    "targetUrl": "https://www.iweiai.com/qiquan/yuanyou",
    "description": "唯爱期货-期权保证金",
    "remarks": "单次返回指定 symbol 的所有数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"原油\"; 可以通过 ak.option_margin_symbol() 所有 symbol",
        "defaultValue": "原油",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "合约标的",
        "name": "hybd",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "合约代码",
        "name": "hydm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "结算价",
        "name": "jsj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易乘数",
        "name": "jycs",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "买方权利金",
        "name": "mfqlj",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "卖方保证金",
        "name": "mfbzj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "手续费单位",
        "name": "sxfdw",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "开仓手续费",
        "name": "kcsxf",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "平今手续费",
        "name": "pjsxf",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "平昨手续费",
        "name": "pzsxf",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "手续费(开+平今)",
        "name": "sxf_k+pj",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "更新时间",
        "name": "gxsj",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "上海期货交易所",
    "name": "shqhjys",
    "api": "option_shfe_daily",
    "targetUrl": "https://www.shfe.com.cn/reports/tradedata/dailyandweeklydata/",
    "description": "上海期货交易所-商品期权数据",
    "remarks": "单次返回指定 symbol 和 trade_date 的期权行情数据, 只能获取 20200824 之后的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"铜期权\"; choice of {'原油期权', '铜期权', '铝期权', '锌期权', '铅期权', '螺纹钢期权', '镍期权', '锡期权', '氧化铝期权', '黄金期权', '白银期权', '丁二烯橡胶期权', '天胶期权'}",
        "defaultValue": "铜期权",
        "choices": [
          "原油期权",
          "铜期权",
          "铝期权",
          "锌期权",
          "铅期权",
          "螺纹钢期权",
          "镍期权",
          "锡期权",
          "氧化铝期权",
          "黄金期权",
          "白银期权",
          "丁二烯橡胶期权",
          "天胶期权"
        ],
        "isRequired": false
      },
      {
        "title": "trade_date",
        "name": "trade_date",
        "type": "str",
        "description": "trade_date=\"20191017\"",
        "defaultValue": "20191017",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "德尔塔",
        "name": "det",
        "type": "float64",
        "description": "Delta",
        "unit": ""
      },
      {
        "title": "名称",
        "name": "mc",
        "type": "类型",
        "description": "描述",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "注意单位：手",
        "unit": ""
      },
      {
        "title": "持仓量",
        "name": "ccl",
        "type": "float64",
        "description": "注意单位：手",
        "unit": ""
      },
      {
        "title": "持仓量变化",
        "name": "cclbh",
        "type": "float64",
        "description": "注意单位：手",
        "unit": ""
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "注意单位：手",
        "unit": ""
      },
      {
        "title": "行权量",
        "name": "xql",
        "type": "float64",
        "description": "注意单位：手",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "大连商品交易所",
    "name": "dlspjys",
    "api": "option_dce_daily",
    "targetUrl": "http://www.dce.com.cn/dalianshangpin/xqsj/tjsj26/rtj/rxq/index.html",
    "description": "大连商品交易所-商品期权数据",
    "remarks": "单次返回指定 symbol 和 trade_date 的期权行情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"玉米期权\"",
        "defaultValue": "玉米期权",
        "isRequired": false
      },
      {
        "title": "trade_date",
        "name": "trade_date",
        "type": "str",
        "description": "trade_date=\"20191017\"",
        "defaultValue": "20191017",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "名称",
        "name": "mc",
        "type": "类型",
        "description": "描述",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "郑州商品交易所",
    "name": "zzspjys",
    "api": "option_czce_daily",
    "targetUrl": "http://www.czce.com.cn/cn/jysj/mrhq/H770301index_1.htm",
    "description": "郑州商品交易所-商品期权数据",
    "remarks": "单次返回指定 symbol 和 trade_date 的期权行情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"白糖期权\"; 交易所上市的期权品种，最早上市的为 20170419 的白糖期权",
        "defaultValue": "白糖期权",
        "isRequired": false
      },
      {
        "title": "trade_date",
        "name": "trade_date",
        "type": "str",
        "description": "trade_date=\"20191017\"",
        "defaultValue": "20191017",
        "isRequired": false
      }
    ],
    "outputParameters": []
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "广州期货交易所",
    "name": "gzqhjys",
    "api": "option_gfex_daily",
    "targetUrl": "http://www.gfex.com.cn/gfex/rihq/hqsj_tjsj.shtml",
    "description": "广州期货交易所-商品期权数据",
    "remarks": "单次返回指定 symbol 和 trade_date 的期权行情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"工业硅\"; choice of {\"工业硅\", \"碳酸锂\"}",
        "defaultValue": "工业硅",
        "choices": [
          "工业硅",
          "碳酸锂"
        ],
        "isRequired": false
      },
      {
        "title": "trade_date",
        "name": "trade_date",
        "type": "str",
        "description": "trade_date=\"20230724\"; 交易日",
        "defaultValue": "20230724",
        "isRequired": false
      }
    ],
    "outputParameters": []
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "广州期货交易所-隐含波动参考值",
    "name": "gzqhjys_yhbdckz",
    "api": "option_gfex_vol_daily",
    "targetUrl": "http://www.gfex.com.cn/gfex/rihq/hqsj_tjsj.shtml",
    "description": "广州期货交易所-商品期权数据-隐含波动参考值",
    "remarks": "单次返回指定 symbol 和 trade_date 的期权行情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"工业硅\"; choice of {\"工业硅\", \"碳酸锂\"}",
        "defaultValue": "工业硅",
        "choices": [
          "工业硅",
          "碳酸锂"
        ],
        "isRequired": false
      },
      {
        "title": "trade_date",
        "name": "trade_date",
        "type": "str",
        "description": "trade_date=\"20230724\"",
        "defaultValue": "20230724",
        "isRequired": false
      }
    ],
    "outputParameters": []
  },
  {
    "moduleTitle": "期权数据",
    "moduleName": "option",
    "title": "历史数据",
    "name": "lssj",
    "api": "option_czce_hist",
    "targetUrl": "http://www.czce.com.cn/cn/jysj/lshqxz/H770319index_1.htm",
    "description": "郑州商品交易所的商品期权历史行情数据",
    "remarks": "单次返回指定年份指定品种期权历史行情数据",
    "inputParameters": [
      {
        "title": "year",
        "name": "year",
        "type": "str",
        "description": "year=\"2019\"; 指定年份",
        "defaultValue": "2019",
        "isRequired": false
      },
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"SR\"; choice of {\"白糖\": \"SR\", \"棉花\": \"CF\", \"PTA\": \"TA\", \"甲醇\": \"MA\", \"菜籽粕\": \"RM\", \"动力煤\": \"ZC\", \"菜籽油\": \"OI\", \"花生\": \"PK\", \"对二甲苯\": \"PX\", \"烧碱\": \"SH\", \"纯碱\": \"SA\", \"短纤\": \"PF\", \"锰硅\": \"SM\", \"硅铁\": \"SF\", \"尿素\": \"UR\", \"苹果\": \"AP\", \"红枣\": \"CJ\", \"玻璃\": \"FG\", \"瓶片\": \"PR\"}",
        "defaultValue": "SR",
        "choices": [
          "白糖: SR",
          "棉花: CF",
          "PTA: TA",
          "甲醇: MA",
          "菜籽粕: RM",
          "动力煤: ZC",
          "菜籽油: OI",
          "花生: PK",
          "对二甲苯: PX",
          "烧碱: SH",
          "纯碱: SA",
          "短纤: PF",
          "锰硅: SM",
          "硅铁: SF",
          "尿素: UR",
          "苹果: AP",
          "红枣: CJ",
          "玻璃: FG",
          "瓶片: PR"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": []
  }
];

/**
 * 根据API名称获取接口定义
 * @param apiName API名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByApi(apiName: string): ApiInterface | undefined {
  return optionInterfaces.find(item => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return optionInterfaces.find(item => item.name === name);
}

export default optionInterfaces;
