/**
 * @fileoverview macro AKShare接口定义
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
 * macro接口数据
 */
export const macroInterfaces: ApiInterface[] = [
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "中国宏观杠杆率",
    "name": "zghgggl",
    "api": "macro_cnbs",
    "targetUrl": "http://114.115.232.154:8080/",
    "description": "中国国家金融与发展实验室-中国宏观杠杆率数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "年份",
        "name": "nf",
        "type": "object",
        "description": "日期, 年-月",
        "unit": ""
      },
      {
        "title": "居民部门",
        "name": "jmbm",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "非金融企业部门",
        "name": "fjrqybm",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "政府部门",
        "name": "zfbm",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "中央政府",
        "name": "zyzf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "地方政府",
        "name": "dfzf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "实体经济部门",
        "name": "stjjbm",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "金融部门资产方",
        "name": "jrbmzcf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "金融部门负债方",
        "name": "jrbmfzf",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "企业商品价格指数",
    "name": "qyspjgzs",
    "api": "macro_china_qyspjg",
    "targetUrl": "http://data.eastmoney.com/cjsj/qyspjg.html",
    "description": "东方财富-经济数据一览-中国-企业商品价格指数, 数据区间从 20050101-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "总指数-指数值",
        "name": "zzs_zsz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "总指数-同比增长",
        "name": "zzs_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "总指数-环比增长",
        "name": "zzs_hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "农产品-指数值",
        "name": "ncp_zsz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "农产品-同比增长",
        "name": "ncp_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "农产品-环比增长",
        "name": "ncp_hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "矿产品-指数值",
        "name": "kcp_zsz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "矿产品-同比增长",
        "name": "kcp_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "矿产品-环比增长",
        "name": "kcp_hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "煤油电-指数值",
        "name": "myd_zsz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "煤油电-同比增长",
        "name": "myd_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "煤油电-环比增长",
        "name": "myd_hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "外商直接投资数据",
    "name": "wszjtzsj",
    "api": "macro_china_fdi",
    "targetUrl": "https://data.eastmoney.com/cjsj/fdi.html",
    "description": "东方财富-经济数据一览-中国-外商直接投资数据, 数据区间从 200801-202307",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "当月",
        "name": "dy",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "当月-同比增长",
        "name": "dy_tbzz",
        "type": "float64",
        "description": "注意单位: 美元",
        "unit": "美元"
      },
      {
        "title": "当月-环比增长",
        "name": "dy_hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "累计",
        "name": "lj",
        "type": "float64",
        "description": "注意单位: 美元",
        "unit": "美元"
      },
      {
        "title": "累计-同比增长",
        "name": "lj_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "LPR品种数据",
    "name": "lprpzsj",
    "api": "macro_china_lpr",
    "targetUrl": "https://data.eastmoney.com/cjsj/globalRateLPR.html",
    "description": "中国 LPR 品种数据, 数据区间从 19910421-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "TRADE_DATE",
        "name": "TRADE_DATE",
        "type": "object",
        "description": "日期",
        "unit": ""
      },
      {
        "title": "LPR1Y",
        "name": "LPR1Y",
        "type": "float64",
        "description": "LPR_1Y利率(%)",
        "unit": ""
      },
      {
        "title": "LPR5Y",
        "name": "LPR5Y",
        "type": "float64",
        "description": "LPR_5Y利率(%)",
        "unit": ""
      },
      {
        "title": "RATE_1",
        "name": "RATE_1",
        "type": "float64",
        "description": "短期贷款利率:6个月至1年(含)(%)",
        "unit": ""
      },
      {
        "title": "RATE_2",
        "name": "RATE_2",
        "type": "float64",
        "description": "中长期贷款利率:5年以上(%)",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "城镇调查失业率",
    "name": "czdcsyl",
    "api": "macro_china_urban_unemployment",
    "targetUrl": "https://data.stats.gov.cn/easyquery.htm?cn=A01&zb=A0203&sj=202304",
    "description": "国家统计局-月度数据-城镇调查失业率",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "年月",
        "unit": ""
      },
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
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "社会融资规模增量统计",
    "name": "shrzgmzltj",
    "api": "macro_china_shrzgm",
    "targetUrl": "http://data.mofcom.gov.cn/gnmy/shrzgm.shtml",
    "description": "商务数据中心-国内贸易-社会融资规模增量统计, 数据区间从 201501-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "年月",
        "unit": ""
      },
      {
        "title": "社会融资规模增量",
        "name": "shrzgmzl",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "其中-人民币贷款",
        "name": "qz_rmbdk",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "其中-委托贷款外币贷款",
        "name": "qz_wtdkwbdk",
        "type": "float64",
        "description": "注意单位: 折合人民币, 亿元",
        "unit": "折合人民币"
      },
      {
        "title": "其中-委托贷款",
        "name": "qz_wtdk",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "其中-信托贷款",
        "name": "qz_xtdk",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "其中-未贴现银行承兑汇票",
        "name": "qz_wtxyhcdhp",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "其中-企业债券",
        "name": "qz_qyzq",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "其中-非金融企业境内股票融资",
        "name": "qz_fjrqyjngprz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "中国 GDP 年率",
    "name": "zg_gdp_nl",
    "api": "macro_china_gdp_yearly",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_chinese_gdp_yoy",
    "description": "金十数据中心-中国 GDP 年率报告, 数据区间从 20110120-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "中国 CPI 年率报告",
    "name": "zg_cpi_nlbg",
    "api": "macro_china_cpi_yearly",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_chinese_cpi_yoy",
    "description": "中国年度 CPI 数据, 数据区间从 19860201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "中国 CPI 月率报告",
    "name": "zg_cpi_ylbg",
    "api": "macro_china_cpi_monthly",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_chinese_cpi_mom",
    "description": "中国月度 CPI 数据, 数据区间从 19960201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "中国 PPI 年率报告",
    "name": "zg_ppi_nlbg",
    "api": "macro_china_ppi_yearly",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_chinese_ppi_yoy",
    "description": "中国年度 PPI 数据, 数据区间从 19950801-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "以美元计算出口年率",
    "name": "ymyjscknl",
    "api": "macro_china_exports_yoy",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_chinese_exports_yoy",
    "description": "中国以美元计算出口年率报告, 数据区间从 19820201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "以美元计算进口年率",
    "name": "ymyjsjknl",
    "api": "macro_china_imports_yoy",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_chinese_imports_yoy",
    "description": "中国以美元计算进口年率报告, 数据区间从 19960201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "以美元计算贸易帐(亿美元)",
    "name": "ymyjsmyz_ymy",
    "api": "macro_china_trade_balance",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_chinese_trade_balance",
    "description": "中国以美元计算贸易帐报告, 数据区间从19810201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "工业增加值增长",
    "name": "gyzjzzz",
    "api": "macro_china_gyzjz",
    "targetUrl": "https://data.eastmoney.com/cjsj/gyzjz.html",
    "description": "东方财富-中国工业增加值增长, 数据区间从 2008 - 至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "同比增长",
        "name": "tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "累计增长",
        "name": "ljzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布时间",
        "name": "fbsj",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "规模以上工业增加值年率",
    "name": "gmysgyzjznl",
    "api": "macro_china_industrial_production_yoy",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_chinese_industrial_production_yoy",
    "description": "中国规模以上工业增加值年率报告, 数据区间从 19900301-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "官方制造业 PMI",
    "name": "gfzzy_pmi",
    "api": "macro_china_pmi_yearly",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_chinese_manufacturing_pmi",
    "description": "中国年度PMI数据, 数据区间从 20050201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "财新制造业PMI终值",
    "name": "cxzzypmizz",
    "api": "macro_china_cx_pmi_yearly",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_chinese_caixin_manufacturing_pmi",
    "description": "中国年度财新 PMI 数据, 数据区间从 20120120-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "财新服务业PMI",
    "name": "cxfwypmi",
    "api": "macro_china_cx_services_pmi_yearly",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_chinese_caixin_services_pmi",
    "description": "中国财新服务业 PMI 报告, 数据区间从 20120405-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "中国官方非制造业PMI",
    "name": "zggffzzypmi",
    "api": "macro_china_non_man_pmi",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_chinese_non_manufacturing_pmi",
    "description": "中国官方非制造业 PMI, 数据区间从 20160101-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "外汇储备(亿美元)",
    "name": "whcb_ymy",
    "api": "macro_china_fx_reserves_yearly",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_chinese_fx_reserves",
    "description": "中国年度外汇储备数据, 数据区间从 20140115-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "M2货币供应年率",
    "name": "m2hbgynl",
    "api": "macro_china_m2_yearly",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_chinese_m2_money_supply_yoy",
    "description": "中国年度 M2 数据, 数据区间从 19980201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "新房价指数",
    "name": "xfjzs",
    "api": "macro_china_new_house_price",
    "targetUrl": "http://data.eastmoney.com/cjsj/newhouse.html",
    "description": "中国新房价指数月度数据, 数据区间从 201101-至今",
    "remarks": "单次返回指定城市的所有历史数据",
    "inputParameters": [
      {
        "title": "city_first",
        "name": "city_first",
        "type": "str",
        "description": "city_first=\"北京\"; 城市列表见目标网站",
        "defaultValue": "北京",
        "isRequired": false
      },
      {
        "title": "city_second",
        "name": "city_second",
        "type": "str",
        "description": "city_second=\"上海\"; 城市列表见目标网站",
        "defaultValue": "上海",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "日期",
        "unit": ""
      },
      {
        "title": "城市",
        "name": "cs",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "新建商品住宅价格指数-环比",
        "name": "xjspzzjgzs_hb",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "新建商品住宅价格指数-同比",
        "name": "xjspzzjgzs_tb",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "新建商品住宅价格指数-定基",
        "name": "xjspzzjgzs_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "二手住宅价格指数-环比",
        "name": "eszzjgzs_hb",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "二手住宅价格指数-同比",
        "name": "eszzjgzs_tb",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "二手住宅价格指数-定基",
        "name": "eszzjgzs_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "企业景气及企业家信心指数",
    "name": "qyjqjqyjxxzs",
    "api": "macro_china_enterprise_boom_index",
    "targetUrl": "http://data.eastmoney.com/cjsj/qyjqzs.html",
    "description": "中国企业景气及企业家信心指数数据, 数据区间从 2005 一季度-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "季度",
        "name": "jd",
        "type": "object",
        "description": "日期",
        "unit": ""
      },
      {
        "title": "企业景气指数-指数",
        "name": "qyjqzs_zs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "企业景气指数-同比",
        "name": "qyjqzs_tb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "企业景气指数-环比",
        "name": "qyjqzs_hb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "企业家信心指数-指数",
        "name": "qyjxxzs_zs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "企业家信心指数-同比",
        "name": "qyjxxzs_tb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "企业家信心指数-环比",
        "name": "qyjxxzs_hb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "全国税收收入",
    "name": "qgsssr",
    "api": "macro_china_national_tax_receipts",
    "targetUrl": "http://data.eastmoney.com/cjsj/nationaltaxreceipts.aspx",
    "description": "中国全国税收收入数据, 数据区间从 2005 一季度-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "季度",
        "name": "jd",
        "type": "object",
        "description": "日期",
        "unit": ""
      },
      {
        "title": "税收收入合计",
        "name": "sssrhj",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "较上年同期",
        "name": "jsntq",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "季度环比",
        "name": "jdhb",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "银行理财产品发行数量",
    "name": "yhlccpfxsl",
    "api": "macro_china_bank_financing",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI01516267.html",
    "description": "银行理财产品发行数量, 数据区间从 2000 一月-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "原保险保费收入",
    "name": "ybxbfsr",
    "api": "macro_china_insurance_income",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMM00088870.html",
    "description": "原保险保费收入, 数据区间从 200407-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "手机出货量",
    "name": "sjchl",
    "api": "macro_china_mobile_number",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI00225823.html",
    "description": "手机出货量, 数据区间从 201201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "菜篮子产品批发价格指数",
    "name": "clzcppfjgzs",
    "api": "macro_china_vegetable_basket",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI00009275.html",
    "description": "菜篮子产品批发价格指数, 数据区间从 20050927-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "农产品批发价格总指数",
    "name": "ncppfjgzzs",
    "api": "macro_china_agricultural_product",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI00009274.html",
    "description": "农产品批发价格总指数, 数据区间从 20050927-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "农副指数",
    "name": "nfzs",
    "api": "macro_china_agricultural_index",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI00662543.html",
    "description": "农副指数数据, 数据区间从 20111205-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "能源指数",
    "name": "nyzs",
    "api": "macro_china_energy_index",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI00662539.html",
    "description": "能源指数数据, 数据区间从 20111205-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "大宗商品价格",
    "name": "dzspjg",
    "api": "macro_china_commodity_price_index",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI00662535.html",
    "description": "大宗商品价格数据, 数据区间从 20111205-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "费城半导体指数",
    "name": "fcbdtzs",
    "api": "macro_global_sox_index",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI00055562.html",
    "description": "费城半导体指数数据, 数据区间从 19940504-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "义乌小商品指数-电子元器件",
    "name": "ywxspzs_dzyqj",
    "api": "macro_china_yw_electronic_index",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI00055551.html",
    "description": "义乌小商品指数-电子元器件数据, 数据区间从 20060911-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "建材指数",
    "name": "jczs",
    "api": "macro_china_construction_index",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI00662541.html",
    "description": "建材指数数据, 数据区间从 20111205-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "建材价格指数",
    "name": "jcjgzs",
    "api": "macro_china_construction_price_index",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI00237146.html",
    "description": "建材价格指数数据, 数据区间从 20100615-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "物流景气指数",
    "name": "wljqzs",
    "api": "macro_china_lpi_index",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI00352262.html",
    "description": "物流景气指数数据, 数据区间从 20130701-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "原油运输指数",
    "name": "yyyszs",
    "api": "macro_china_bdti_index",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI00107668.html",
    "description": "原油运输指数数据, 数据区间从 20011227-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "超灵便型船运价指数",
    "name": "clbxcyjzs",
    "api": "macro_china_bsi_index",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI00107667.html",
    "description": "超灵便型船运价指数数据, 数据区间从 20060103-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "海岬型运费指数",
    "name": "hjxyfzs",
    "api": "macro_shipping_bci",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI00107666.html",
    "description": "海岬型运费指数, 数据区间从 19990430-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "波罗的海干散货指数",
    "name": "bldhgshzs",
    "api": "macro_shipping_bdi",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI00107664.html",
    "description": "波罗的海干散货指数, 数据区间从 19881019-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "巴拿马型运费指数",
    "name": "bnmxyfzs",
    "api": "macro_shipping_bpi",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI00107665.html",
    "description": "巴拿马型运费指数, 数据区间从 19981231-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "成品油运输指数",
    "name": "cpyyszs",
    "api": "macro_shipping_bcti",
    "targetUrl": "https://data.eastmoney.com/cjsj/hyzs_list_EMI00107669.html",
    "description": "成品油运输指数, 数据区间从 20011217-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
        "type": "int64",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "新增信贷数据",
    "name": "xzxdsj",
    "api": "macro_china_new_financial_credit",
    "targetUrl": "http://data.eastmoney.com/cjsj/xzxd.html",
    "description": "中国新增信贷数据数据, 数据区间从 200801 至今, 月度数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "当月",
        "name": "dy",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "当月-同比增长",
        "name": "dy_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "当月-环比增长",
        "name": "dy_hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "累计",
        "name": "lj",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "累计-同比增长",
        "name": "lj_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "居民消费价格指数",
    "name": "jmxfjgzs",
    "api": "macro_china_cpi",
    "targetUrl": "http://data.eastmoney.com/cjsj/cpi.html",
    "description": "中国居民消费价格指数, 数据区间从 200801 至今, 月度数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "全国-当月",
        "name": "qg_dy",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "全国-同比增长",
        "name": "qg_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "全国-环比增长",
        "name": "qg_hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "全国-累计",
        "name": "qg_lj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "城市-当月",
        "name": "cs_dy",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "城市-同比增长",
        "name": "cs_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "城市-环比增长",
        "name": "cs_hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "城市-累计",
        "name": "cs_lj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "农村-当月",
        "name": "nc_dy",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "农村-同比增长",
        "name": "nc_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "农村-环比增长",
        "name": "nc_hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "农村-累计",
        "name": "nc_lj",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "国内生产总值",
    "name": "gnsczz",
    "api": "macro_china_gdp",
    "targetUrl": "http://data.eastmoney.com/cjsj/gdp.html",
    "description": "中国国内生产总值, 数据区间从 200601 至今, 月度数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "季度",
        "name": "jd",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "国内生产总值-绝对值",
        "name": "gnsczz_jdz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "国内生产总值-同比增长",
        "name": "gnsczz_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "第一产业-绝对值",
        "name": "dycy_jdz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "第一产业-同比增长",
        "name": "dycy_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "第二产业-绝对值",
        "name": "decy_jdz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "第二产业-同比增长",
        "name": "decy_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "第三产业-绝对值",
        "name": "dscy_jdz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "第三产业-同比增长",
        "name": "dscy_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "工业品出厂价格指数",
    "name": "gypccjgzs",
    "api": "macro_china_ppi",
    "targetUrl": "http://data.eastmoney.com/cjsj/ppi.html",
    "description": "工业品出厂价格指数, 数据区间从 200601 至今, 月度数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "当月",
        "name": "dy",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "当月同比增长",
        "name": "dytbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "累计",
        "name": "lj",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "采购经理人指数",
    "name": "cgjlrzs",
    "api": "macro_china_pmi",
    "targetUrl": "http://data.eastmoney.com/cjsj/pmi.html",
    "description": "采购经理人指数, 数据区间从 200801 至今, 月度数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "制造业-指数",
        "name": "zzy_zs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "制造业-同比增长",
        "name": "zzy_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "非制造业-指数",
        "name": "fzzy_zs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "非制造业-同比增长",
        "name": "fzzy_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "中国城镇固定资产投资",
    "name": "zgczgdzctz",
    "api": "macro_china_gdzctz",
    "targetUrl": "http://data.eastmoney.com/cjsj/gdzctz.html",
    "description": "中国城镇固定资产投资, 数据区间从 200802 至今, 月度数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "当月",
        "name": "dy",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "同比增长",
        "name": "tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "环比增长",
        "name": "hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "自年初累计",
        "name": "znclj",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "海关进出口增减情况",
    "name": "hgjckzjqk",
    "api": "macro_china_hgjck",
    "targetUrl": "https://data.eastmoney.com/cjsj/hgjck.html",
    "description": "中国海关进出口增减情况一览表, 数据区间从 200801 至今, 月度数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "当月出口额-金额",
        "name": "dycke_je",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      },
      {
        "title": "当月出口额-同比增长",
        "name": "dycke_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "当月出口额-环比增长",
        "name": "dycke_hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "当月进口额-金额",
        "name": "dyjke_je",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      },
      {
        "title": "当月进口额-同比增长",
        "name": "dyjke_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "当月进口额-环比增长",
        "name": "dyjke_hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "累计出口额-金额",
        "name": "ljcke_je",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      },
      {
        "title": "累计出口额-同比增长",
        "name": "ljcke_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "累计进口额-金额",
        "name": "ljjke_je",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      },
      {
        "title": "累计进口额-同比增长",
        "name": "ljjke_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "财政收入",
    "name": "czsr",
    "api": "macro_china_czsr",
    "targetUrl": "http://data.eastmoney.com/cjsj/czsr.html",
    "description": "中国财政收入, 数据区间从 200801 至今, 月度数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "当月",
        "name": "dy",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "当月-同比增长",
        "name": "dy_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "当月-环比增长",
        "name": "dy_hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "累计",
        "name": "lj",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "累计-同比增长",
        "name": "lj_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "外汇贷款数据",
    "name": "whdksj",
    "api": "macro_china_whxd",
    "targetUrl": "http://data.eastmoney.com/cjsj/whxd.html",
    "description": "外汇贷款数据, 数据区间从 200802 至今, 月度数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "当月",
        "name": "dy",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      },
      {
        "title": "同比增长",
        "name": "tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "环比增长",
        "name": "hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "累计",
        "name": "lj",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "本外币存款",
    "name": "bwbck",
    "api": "macro_china_wbck",
    "targetUrl": "http://data.eastmoney.com/cjsj/wbck.html",
    "description": "本外币存款, 数据区间从 200802 至今, 月度数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "当月",
        "name": "dy",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "同比增长",
        "name": "tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "环比增长",
        "name": "hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "累计",
        "name": "lj",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "新债发行",
    "name": "xzfx",
    "api": "macro_china_bond_public",
    "targetUrl": "https://www.chinamoney.com.cn/chinese/xzjfx/",
    "description": "中国外汇交易中心暨全国银行间同业拆借中心-债券信息披露-新债发行; 近期债券发行数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "债券全称",
        "name": "zqqc",
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
        "title": "计息方式",
        "name": "jxfs",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "价格",
        "name": "jg",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "债券期限",
        "name": "zqqx",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "计划发行量",
        "name": "jhfxl",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "债券评级",
        "name": "zqpj",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "消费者信心指数",
    "name": "xfzxxzs",
    "api": "macro_china_xfzxx",
    "targetUrl": "https://data.eastmoney.com/cjsj/xfzxx.html",
    "description": "东方财富网-消费者信心指数",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "消费者信心指数-指数值",
        "name": "xfzxxzs_zsz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "消费者信心指数-同比增长",
        "name": "xfzxxzs_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "消费者信心指数-环比增长",
        "name": "xfzxxzs_hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "消费者满意指数-指数值",
        "name": "xfzmyzs_zsz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "消费者满意指数-同比增长",
        "name": "xfzmyzs_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "消费者满意指数-环比增长",
        "name": "xfzmyzs_hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "消费者预期指数-指数值",
        "name": "xfzyqzs_zsz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "消费者预期指数-同比增长",
        "name": "xfzyqzs_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "消费者预期指数-环比增长",
        "name": "xfzyqzs_hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "存款准备金率",
    "name": "ckzbjl",
    "api": "macro_china_reserve_requirement_ratio",
    "targetUrl": "https://data.eastmoney.com/cjsj/ckzbj.html",
    "description": "国家统计局-存款准备金率",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "公布时间",
        "name": "gbsj",
        "type": "object",
        "description": "XXXX年X月",
        "unit": ""
      },
      {
        "title": "生效时间",
        "name": "sxsj",
        "type": "object",
        "description": "XXXX年X月",
        "unit": ""
      },
      {
        "title": "大型金融机构-调整前",
        "name": "dxjrjg_tzq",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "大型金融机构-调整后",
        "name": "dxjrjg_tzh",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "大型金融机构-调整幅度",
        "name": "dxjrjg_tzfd",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "中小金融机构-调整前",
        "name": "zxjrjg_tzq",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "中小金融机构-调整后",
        "name": "zxjrjg_tzh",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "中小金融机构-调整幅度",
        "name": "zxjrjg_tzfd",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "消息公布次日指数涨跌-上证",
        "name": "xxgbcrzszd_sz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "消息公布次日指数涨跌-深证",
        "name": "xxgbcrzszd_sz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "备注",
        "name": "bz",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "社会消费品零售总额",
    "name": "shxfplsze",
    "api": "macro_china_consumer_goods_retail",
    "targetUrl": "http://data.eastmoney.com/cjsj/xfp.html",
    "description": "东方财富-经济数据-社会消费品零售总额",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "当月",
        "name": "dy",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "同比增长",
        "name": "tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "环比增长",
        "name": "hbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "累计",
        "name": "lj",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "累计-同比增长",
        "name": "lj_tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "全社会用电分类情况表",
    "name": "qshydflqkb",
    "api": "macro_china_society_electricity",
    "targetUrl": "http://finance.sina.com.cn/mac/#industry-6-0-31-1",
    "description": "国家统计局-全社会用电分类情况表",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "统计时间",
        "name": "tjsj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "全社会用电量",
        "name": "qshydl",
        "type": "float64",
        "description": "注意单位: 万千瓦时",
        "unit": "万千瓦时"
      },
      {
        "title": "全社会用电量同比",
        "name": "qshydltb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "各行业用电量合计",
        "name": "ghyydlhj",
        "type": "float64",
        "description": "注意单位: 万千瓦时",
        "unit": "万千瓦时"
      },
      {
        "title": "各行业用电量合计同比",
        "name": "ghyydlhjtb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "第一产业用电量",
        "name": "dycyydl",
        "type": "float64",
        "description": "注意单位: 万千瓦时",
        "unit": "万千瓦时"
      },
      {
        "title": "第一产业用电量同比",
        "name": "dycyydltb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "第二产业用电量",
        "name": "decyydl",
        "type": "float64",
        "description": "注意单位: 万千瓦时",
        "unit": "万千瓦时"
      },
      {
        "title": "第二产业用电量同比",
        "name": "decyydltb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "第三产业用电量",
        "name": "dscyydl",
        "type": "float64",
        "description": "注意单位: 万千瓦时",
        "unit": "万千瓦时"
      },
      {
        "title": "第三产业用电量同比",
        "name": "dscyydltb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "城乡居民生活用电量合计",
        "name": "cxjmshydlhj",
        "type": "float64",
        "description": "注意单位: 万千瓦时",
        "unit": "万千瓦时"
      },
      {
        "title": "城乡居民生活用电量合计同比",
        "name": "cxjmshydlhjtb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "城镇居民用电量",
        "name": "czjmydl",
        "type": "float64",
        "description": "注意单位: 万千瓦时",
        "unit": "万千瓦时"
      },
      {
        "title": "城镇居民用电量同比",
        "name": "czjmydltb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "乡村居民用电量",
        "name": "xcjmydl",
        "type": "float64",
        "description": "注意单位: 万千瓦时",
        "unit": "万千瓦时"
      },
      {
        "title": "乡村居民用电量同比",
        "name": "xcjmydltb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "全社会客货运输量",
    "name": "qshkhysl",
    "api": "macro_china_society_traffic_volume",
    "targetUrl": "http://finance.sina.com.cn/mac/#industry-10-0-31-1",
    "description": "国家统计局-全社会客货运输量-非累计",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "统计时间",
        "name": "tjsj",
        "type": "object",
        "description": "年月",
        "unit": ""
      },
      {
        "title": "统计对象",
        "name": "tjdx",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "货运量",
        "name": "hyl",
        "type": "float64",
        "description": "注意单位: 亿吨",
        "unit": "亿吨"
      },
      {
        "title": "货运量同比增长",
        "name": "hyltbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "货物周转量",
        "name": "hwzzl",
        "type": "float64",
        "description": "注意单位: 亿",
        "unit": "亿"
      },
      {
        "title": "公里货物周转量同比增长",
        "name": "glhwzzltbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "客运量",
        "name": "kyl",
        "type": "float64",
        "description": "注意单位: 亿人",
        "unit": "亿人"
      },
      {
        "title": "客运量同比增长",
        "name": "kyltbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "旅客周转量",
        "name": "lkzzl",
        "type": "float64",
        "description": "注意单位: 亿",
        "unit": "亿"
      },
      {
        "title": "公里旅客周转量同比增长",
        "name": "gllkzzltbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "沿海主要港口货物吞吐量",
        "name": "yhzygkhwttl",
        "type": "float64",
        "description": "注意单位: 亿吨",
        "unit": "亿吨"
      },
      {
        "title": "沿海主要港口货物吞吐量同比增长",
        "name": "yhzygkhwttltbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "其中:外贸货物吞吐量",
        "name": "qz:wmhwttl",
        "type": "float64",
        "description": "注意单位: 亿吨",
        "unit": "亿吨"
      },
      {
        "title": "其中:外贸货物吞吐量同比增长",
        "name": "qz:wmhwttltbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "民航总周转量",
        "name": "mhzzzl",
        "type": "float64",
        "description": "注意单位: 亿",
        "unit": "亿"
      },
      {
        "title": "公里民航总周转",
        "name": "glmhzzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "邮电业务基本情况",
    "name": "ydywjbqk",
    "api": "macro_china_postal_telecommunicational",
    "targetUrl": "http://finance.sina.com.cn/mac/#industry-11-0-31-1",
    "description": "国家统计局-邮电业务基本情况-非累计",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "统计时间",
        "name": "tjsj",
        "type": "str",
        "description": "年月",
        "unit": ""
      },
      {
        "title": "邮电业务总量",
        "name": "ydywzl",
        "type": "float",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "邮电业务总量同比增长",
        "name": "ydywzltbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "邮政业务总量",
        "name": "yzywzl",
        "type": "float",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "邮政业务总量同比增长",
        "name": "yzywzltbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "电信业务总量",
        "name": "dxywzl",
        "type": "float",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "电信业务总量同比增长",
        "name": "dxywzltbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "函件总数",
        "name": "hjzs",
        "type": "float",
        "description": "注意单位: 万件",
        "unit": "万件"
      },
      {
        "title": "函件总数同比增长",
        "name": "hjzstbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "包件",
        "name": "bj",
        "type": "float",
        "description": "注意单位: 万件",
        "unit": "万件"
      },
      {
        "title": "包件同比增长",
        "name": "bjtbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "特快专递",
        "name": "tkzd",
        "type": "float",
        "description": "注意单位: 万件",
        "unit": "万件"
      },
      {
        "title": "特快专递同比增长",
        "name": "tkzdtbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "汇票",
        "name": "hp",
        "type": "float",
        "description": "注意单位: 万张",
        "unit": "万张"
      },
      {
        "title": "汇票同比增长",
        "name": "hptbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "订销报纸累计数",
        "name": "dxbzljs",
        "type": "float",
        "description": "注意单位: 万份",
        "unit": "万份"
      },
      {
        "title": "订销报纸累计数同比增长",
        "name": "dxbzljstbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "订销杂志累计数",
        "name": "dxzzljs",
        "type": "float",
        "description": "注意单位: 万份",
        "unit": "万份"
      },
      {
        "title": "订销杂志累计数同比增长",
        "name": "dxzzljstbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "集邮业务",
        "name": "jyyw",
        "type": "float",
        "description": "注意单位: 万枚",
        "unit": "万枚"
      },
      {
        "title": "集邮业务同比增长",
        "name": "jyywtbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "邮政储蓄期末余额",
        "name": "yzcxqmye",
        "type": "float",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "邮政储蓄期末余额同比增长",
        "name": "yzcxqmyetbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "长途电话通话时长",
        "name": "ctdhthsc",
        "type": "float",
        "description": "注意单位: 万",
        "unit": "万"
      },
      {
        "title": "钟长途电话通话时长同比增长",
        "name": "zctdhthsctbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "本地电话期末用户数",
        "name": "bddhqmyhs",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "本地电话期末用户数同比增长",
        "name": "bddhqmyhstbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "城市电话用户数",
        "name": "csdhyhs",
        "type": "float",
        "description": "注意单位: 万户",
        "unit": "万户"
      },
      {
        "title": "城市电话用户数同比增长",
        "name": "csdhyhstbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "乡村电话用户数",
        "name": "xcdhyhs",
        "type": "float",
        "description": "注意单位: 万户",
        "unit": "万户"
      },
      {
        "title": "乡村电话用户数同比增长",
        "name": "xcdhyhstbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "无线寻呼用户数",
        "name": "wxxhyhs",
        "type": "float",
        "description": "注意单位: 万户",
        "unit": "万户"
      },
      {
        "title": "无线寻呼用户数同比增长",
        "name": "wxxhyhstbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "移动电话用户数",
        "name": "yddhyhs",
        "type": "float",
        "description": "注意单位: 万户",
        "unit": "万户"
      },
      {
        "title": "移动电话用户数同比增长",
        "name": "yddhyhstbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "固定电话用",
        "name": "gddhy",
        "type": "float",
        "description": "注意单位: 万户",
        "unit": "万户"
      },
      {
        "title": "固定电话用户数同比增长",
        "name": "gddhyhstbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "城市住宅电话用户",
        "name": "cszzdhyh",
        "type": "float",
        "description": "注意单位: 万户",
        "unit": "万户"
      },
      {
        "title": "城市住宅电话用户同比增长",
        "name": "cszzdhyhtbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "乡村住宅电话用户",
        "name": "xczzdhyh",
        "type": "float",
        "description": "注意单位: 万户",
        "unit": "万户"
      },
      {
        "title": "乡村住宅电话用户同比增长",
        "name": "xczzdhyhtbzz",
        "type": "float",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "国际旅游外汇收入构成",
    "name": "gjlywhsrgc",
    "api": "macro_china_international_tourism_fx",
    "targetUrl": "http://finance.sina.com.cn/mac/#industry-15-0-31-3",
    "description": "国家统计局-国际旅游外汇收入构成",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "统计年度",
        "name": "tjnd",
        "type": "object",
        "description": "年",
        "unit": ""
      },
      {
        "title": "指标",
        "name": "zb",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "数量",
        "name": "sl",
        "type": "float64",
        "description": "注意单位: 百万美元",
        "unit": "百万美元"
      },
      {
        "title": "比重",
        "name": "bz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "民航客座率及载运率",
    "name": "mhkzljzyl",
    "api": "macro_china_passenger_load_factor",
    "targetUrl": "http://finance.sina.com.cn/mac/#industry-20-0-31-1",
    "description": "国家统计局-民航客座率及载运率",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "统计年度",
        "name": "tjnd",
        "type": "object",
        "description": "年月",
        "unit": ""
      },
      {
        "title": "客座率",
        "name": "kzl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "载运率",
        "name": "zyl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "航贸运价指数",
    "name": "hmyjzs",
    "api": "macro_china_freight_index",
    "targetUrl": "http://finance.sina.com.cn/mac/#industry-22-0-31-2",
    "description": "新浪财经-中国宏观经济数据-航贸运价指数",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "截止日期",
        "name": "jzrq",
        "type": "object",
        "description": "年月",
        "unit": ""
      },
      {
        "title": "波罗的海好望角型船运价指数BCI",
        "name": "bldhhwjxcyjzsBCI",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "灵便型船综合运价指数BHMI",
        "name": "lbxczhyjzsBHMI",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "波罗的海超级大灵便型船BSI指数",
        "name": "bldhcjdlbxcBSIzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "波罗的海综合运价指数BDI",
        "name": "bldhzhyjzsBDI",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "HRCI国际集装箱租船指数",
        "name": "HRCIgjjzxzczs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "油轮运价指数成品油运价指数BCTI",
        "name": "ylyjzscpyyjzsBCTI",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "油轮运价指数原油运价指数BDTI",
        "name": "ylyjzsyyyjzsBDTI",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "央行货币当局资产负债",
    "name": "yhhbdjzcfz",
    "api": "macro_china_central_bank_balance",
    "targetUrl": "http://finance.sina.com.cn/mac/#fininfo-8-0-31-2",
    "description": "新浪财经-中国宏观经济数据-央行货币当局资产负债",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "统计时间",
        "name": "tjsj",
        "type": "object",
        "description": "年月",
        "unit": ""
      },
      {
        "title": "国外资产",
        "name": "gwzc",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "外汇",
        "name": "wh",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "货币黄金",
        "name": "hbhj",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "其他国外资产",
        "name": "qtgwzc",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "对政府债权",
        "name": "dzfzq",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "其中:中央政府",
        "name": "qz:zyzf",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "对其他存款性公司债权",
        "name": "dqtckxgszq",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "对其他金融性公司债权",
        "name": "dqtjrxgszq",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "对非货币金融机构债权",
        "name": "dfhbjrjgzq",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "对非金融性公司债权",
        "name": "dfjrxgszq",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "其他资产",
        "name": "qtzc",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "总资产",
        "name": "zzc",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "储备货币",
        "name": "cbhb",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "发行货币",
        "name": "fhhb",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "金融性公司存款",
        "name": "jrxgsck",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "其他存款性公司",
        "name": "qtckxgs",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "其他金融性公司",
        "name": "qtjrxgs",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "对金融机构负债",
        "name": "djrjgfz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "准备金存款",
        "name": "zbjck",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "非金融性公司存款",
        "name": "fjrxgsck",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "活期存款",
        "name": "hqck",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "债券",
        "name": "zq",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "国外负债",
        "name": "gwfz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "政府存款",
        "name": "zfck",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "自有资金",
        "name": "zyzj",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "其他负债",
        "name": "qtfz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "总负债",
        "name": "zfz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "保险业经营情况",
    "name": "bxyjyqk",
    "api": "macro_china_insurance",
    "targetUrl": "http://finance.sina.com.cn/mac/#fininfo-19-0-31-3",
    "description": "新浪财经-中国宏观经济数据-保险业经营情况",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "统计时间",
        "name": "tjsj",
        "type": "object",
        "description": "年月",
        "unit": ""
      },
      {
        "title": "省市地区",
        "name": "ssdq",
        "type": "object",
        "description": "地区",
        "unit": ""
      },
      {
        "title": "原保险保费收入",
        "name": "ybxbfsr",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "财产险保费收入",
        "name": "ccxbfsr",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "人身险保费收入",
        "name": "rsxbfsr",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "人身险-寿险保费收入",
        "name": "rsx_sxbfsr",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "人身险-健康险保费收入",
        "name": "rsx_jkxbfsr",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "人身险-意外险保费收入",
        "name": "rsx_ywxbfsr",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "养老保险公司企业年金缴费",
        "name": "ylbxgsqynjjf",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "原保险赔付支出",
        "name": "ybxpfzc",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "财产险保费赔付支出",
        "name": "ccxbfpfzc",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "人身险保费赔付支出",
        "name": "rsxbfpfzc",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "人身险-寿险赔付支出",
        "name": "rsx_sxpfzc",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "人身险-健康险赔付支出",
        "name": "rsx_jkxpfzc",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "人身险-意外险赔付支出",
        "name": "rsx_ywxpfzc",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "业务及管理费",
        "name": "ywjglf",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "银行存款",
        "name": "yhck",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "投资",
        "name": "tz",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "资产总额",
        "name": "zcze",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "养老保险公司企业年金受托管理资产",
        "name": "ylbxgsqynjstglzc",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      },
      {
        "title": "养老保险公司企业年金投资管理资产",
        "name": "ylbxgsqynjtzglzc",
        "type": "float64",
        "description": "注意单位: 万元",
        "unit": "万元"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "货币供应量",
    "name": "hbgyl",
    "api": "macro_china_supply_of_money",
    "targetUrl": "http://finance.sina.com.cn/mac/#fininfo-1-0-31-1",
    "description": "新浪财经-中国宏观经济数据-货币供应量",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "统计时间",
        "name": "tjsj",
        "type": "object",
        "description": "年月",
        "unit": ""
      },
      {
        "title": "货币和准货币（广义货币M2）",
        "name": "hbhzhb（gyhbM2）",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "货币和准货币（广义货币M2）同比增长",
        "name": "hbhzhb（gyhbM2）tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "货币(狭义货币M1)",
        "name": "hb_xyhbM1",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "货币(狭义货币M1)同比增长",
        "name": "hb_xyhbM1tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "流通中现金(M0)",
        "name": "ltzxj_M0",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "流通中现金(M0)同比增长",
        "name": "ltzxj_M0tbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "活期存款",
        "name": "hqck",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "活期存款同比增长",
        "name": "hqcktbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "准货币",
        "name": "zhb",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "准货币同比增长",
        "name": "zhbtbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "定期存款",
        "name": "dqck",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "定期存款同比增长",
        "name": "dqcktbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "储蓄存款出",
        "name": "cxckc",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "储蓄存款同比增长",
        "name": "cxcktbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "其他存款",
        "name": "qtck",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "其他存款同比增长",
        "name": "qtcktbzz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "FR007利率互换曲线历史数据",
    "name": "fr007llhhqxlssj",
    "api": "macro_china_swap_rate",
    "targetUrl": "https://www.chinamoney.com.cn/chinese/bkcurvfxhis/?cfgItemType=72&curveType=FR007",
    "description": "国家统计局-FR007利率互换曲线历史数据",
    "remarks": "单次返回所有历史数据, 该接口只能获取近一年的数据的数据，其中每次只能获取一个月的数据",
    "inputParameters": [
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"20231128\"；注意时间间隔",
        "defaultValue": "20231128",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"20231130\"",
        "defaultValue": "20231130",
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
        "title": "曲线名称",
        "name": "qxmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "时刻",
        "name": "sk",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "价格类型",
        "name": "jglx",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "1M",
        "name": "1M",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "3M",
        "name": "3M",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "6M",
        "name": "6M",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "9M",
        "name": "9M",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "1Y",
        "name": "1Y",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "2Y",
        "name": "2Y",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "3Y",
        "name": "3Y",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "4Y",
        "name": "4Y",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "5Y",
        "name": "5Y",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "7Y",
        "name": "7Y",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "10Y",
        "name": "10Y",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "央行黄金和外汇储备",
    "name": "yxhjhwhcb",
    "api": "macro_china_foreign_exchange_gold",
    "targetUrl": "http://finance.sina.com.cn/mac/#fininfo-5-0-31-2",
    "description": "国家统计局-央行黄金和外汇储备, 比东财接口数据时间长",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "统计时间",
        "name": "tjsj",
        "type": "object",
        "description": "年月",
        "unit": ""
      },
      {
        "title": "黄金储备",
        "name": "hjcb",
        "type": "float64",
        "description": "注意单位: 万盎司",
        "unit": "万盎司"
      },
      {
        "title": "国家外汇储备",
        "name": "gjwhcb",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "商品零售价格指数",
    "name": "splsjgzs",
    "api": "macro_china_retail_price_index",
    "targetUrl": "http://finance.sina.com.cn/mac/#price-12-0-31-1",
    "description": "国家统计局-商品零售价格指数",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "统计月份",
        "name": "tjyf",
        "type": "object",
        "description": "年月",
        "unit": ""
      },
      {
        "title": "居民消费项目",
        "name": "jmxfxm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "零售商品价格指数",
        "name": "lsspjgzs",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "国房景气指数",
    "name": "gfjqzs",
    "api": "macro_china_real_estate",
    "targetUrl": "http://data.eastmoney.com/cjsj/hyzs_list_EMM00121987.html",
    "description": "国家统计局-国房景气指数",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最新值",
        "name": "zxz",
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
        "title": "近3月涨跌幅",
        "name": "j3yzdf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "近6月涨跌幅",
        "name": "j6yzdf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "近1年涨跌幅",
        "name": "j1nzdf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "近2年涨跌幅",
        "name": "j2nzdf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "近3年涨跌幅",
        "name": "j3nzdf",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "外汇和黄金储备",
    "name": "whhhjcb",
    "api": "macro_china_fx_gold",
    "targetUrl": "http://data.eastmoney.com/cjsj/hjwh.html",
    "description": "中国外汇和黄金储备, 数据区间从 200801 至今, 月度数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "年度和月份",
        "unit": ""
      },
      {
        "title": "黄金储备-数值",
        "name": "hjcb_sz",
        "type": "float64",
        "description": "注意单位: 万盎司",
        "unit": "万盎司"
      },
      {
        "title": "黄金储备-同比",
        "name": "hjcb_tb",
        "type": "float64",
        "description": "注意单位: 万盎司",
        "unit": "万盎司"
      },
      {
        "title": "黄金储备-环比",
        "name": "hjcb_hb",
        "type": "float64",
        "description": "注意单位: 万盎司",
        "unit": "万盎司"
      },
      {
        "title": "国家外汇储备-数值",
        "name": "gjwhcb_sz",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      },
      {
        "title": "国家外汇储备-同比",
        "name": "gjwhcb_tb",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      },
      {
        "title": "国家外汇储备-环比",
        "name": "gjwhcb_hb",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "中国货币供应量",
    "name": "zghbgyl",
    "api": "macro_china_money_supply",
    "targetUrl": "http://data.eastmoney.com/cjsj/hbgyl.html",
    "description": "东方财富-经济数据-中国宏观-中国货币供应量; 数据区间从 200801 至今, 月度数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "年度和月份",
        "unit": ""
      },
      {
        "title": "货币和准货币(M2)-数量(亿元)",
        "name": "hbhzhb_M2_sl_yy",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "货币和准货币(M2)-同比增长",
        "name": "hbhzhb_M2_tbzz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "货币和准货币(M2)-环比增长",
        "name": "hbhzhb_M2_hbzz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "货币(M1)-数量(亿元)",
        "name": "hb_M1_sl_yy",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "货币(M1)-同比增长",
        "name": "hb_M1_tbzz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "货币(M1)-环比增长",
        "name": "hb_M1_hbzz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "流通中的现金(M0)-数量(亿元)",
        "name": "ltzdxj_M0_sl_yy",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "流通中的现金(M0)-同比增长",
        "name": "ltzdxj_M0_tbzz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "流通中的现金(M0)-环比增长",
        "name": "ltzdxj_M0_hbzz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "全国股票交易统计表",
    "name": "qggpjytjb",
    "api": "macro_china_stock_market_cap",
    "targetUrl": "http://data.eastmoney.com/cjsj/gpjytj.html",
    "description": "全国股票交易统计表, 数据区间从 200801 至今, 月度数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "数据日期",
        "name": "sjrq",
        "type": "object",
        "description": "年度和月份",
        "unit": ""
      },
      {
        "title": "发行总股本-上海",
        "name": "fxzgb_sh",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "发行总股本-深圳",
        "name": "fxzgb_sz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "市价总值-上海",
        "name": "sjzz_sh",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "市价总值-深圳",
        "name": "sjzz_sz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "成交金额-上海",
        "name": "cjje_sh",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "成交金额-深圳",
        "name": "cjje_sz",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "成交量-上海",
        "name": "cjl_sh",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量-深圳",
        "name": "cjl_sz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "A股最高综合股价指数-上海",
        "name": "Agzgzhgjzs_sh",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "A股最高综合股价指数-深圳",
        "name": "Agzgzhgjzs_sz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "A股最低综合股价指数-上海",
        "name": "Agzdzhgjzs_sh",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "A股最低综合股价指数-深圳",
        "name": "Agzdzhgjzs_sz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "上海银行业同业拆借报告",
    "name": "shyhytycjbg",
    "api": "macro_china_shibor_all",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_shibor",
    "description": "上海银行业同业拆借报告, 数据区间从 20170317-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "O/N-定价",
        "name": "O/N_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "O/N-涨跌幅",
        "name": "O/N_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "1W-定价",
        "name": "1W_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "1W-涨跌幅",
        "name": "1W_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "2W-定价",
        "name": "2W_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "2W-涨跌幅",
        "name": "2W_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "1M-定价",
        "name": "1M_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "1M-涨跌幅",
        "name": "1M_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "3M-定价",
        "name": "3M_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "3M-涨跌幅",
        "name": "3M_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "6M-定价",
        "name": "6M_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "6M-涨跌幅",
        "name": "6M_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "9M-定价",
        "name": "9M_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "9M-涨跌幅",
        "name": "9M_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "1Y-定价",
        "name": "1Y_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "1Y-涨跌幅",
        "name": "1Y_zdf",
        "type": "float",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "ON-定价",
        "name": "ON_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "ON-涨跌幅",
        "name": "ON_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "2M-定价",
        "name": "2M_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "2M-涨跌幅",
        "name": "2M_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "人民币香港银行同业拆息",
    "name": "rmbxgyhtycx",
    "api": "macro_china_hk_market_info",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_hk_market_info",
    "description": "香港同业拆借报告, 数据区间从 20170320-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "日期",
        "unit": ""
      },
      {
        "title": "O/N-定价",
        "name": "O/N_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "O/N-涨跌幅",
        "name": "O/N_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "1W-定价",
        "name": "1W_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "1W-涨跌幅",
        "name": "1W_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "2W-定价",
        "name": "2W_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "2W-涨跌幅",
        "name": "2W_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "1M-定价",
        "name": "1M_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "1M-涨跌幅",
        "name": "1M_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "3M-定价",
        "name": "3M_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "3M-涨跌幅",
        "name": "3M_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "6M-定价",
        "name": "6M_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "6M-涨跌幅",
        "name": "6M_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "9M-定价",
        "name": "9M_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "9M-涨跌幅",
        "name": "9M_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "1Y-定价",
        "name": "1Y_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "1Y-涨跌幅",
        "name": "1Y_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "ON-定价",
        "name": "ON_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "ON-涨跌幅",
        "name": "ON_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "2M-定价",
        "name": "2M_dj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "2M-涨跌幅",
        "name": "2M_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "中国日度沿海六大电库存",
    "name": "zgrdyhlddkc",
    "api": "macro_china_daily_energy",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_qihuo_energy_report",
    "description": "中国日度沿海六大电库存数据, 数据区间从20160101-至今, 不再更新, 只能获得历史数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "沿海六大电库存",
        "name": "yhlddkc",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "日耗",
        "name": "rh",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "存煤可用天数",
        "name": "cmkyts",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "人民币汇率中间价报告",
    "name": "rmbhlzjjbg",
    "api": "macro_china_rmb",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_rmb_data",
    "description": "中国人民币汇率中间价报告, 数据区间从 20170103-20210513",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "日期",
        "unit": ""
      },
      {
        "title": "美元/人民币\\_中间价",
        "name": "my/rmb\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "美元/人民币\\_涨跌幅",
        "name": "my/rmb\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "欧元/人民币\\_中间价",
        "name": "oy/rmb\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "欧元/人民币\\_涨跌幅",
        "name": "oy/rmb\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "100日元/人民币\\_中间价",
        "name": "100ry/rmb\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "100日元/人民币\\_涨跌幅",
        "name": "100ry/rmb\\_zdf",
        "type": "float64",
        "description": "单位: 点对",
        "unit": ""
      },
      {
        "title": "港元/人民币\\_中间价",
        "name": "gy/rmb\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "港元/人民币\\_涨跌幅",
        "name": "gy/rmb\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "英镑/人民币\\_中间价",
        "name": "yb/rmb\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "英镑/人民币\\_涨跌幅",
        "name": "yb/rmb\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "澳元/人民币\\_中间价",
        "name": "ay/rmb\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "澳元/人民币\\_涨跌幅",
        "name": "ay/rmb\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "新西兰元/人民币\\_中间价",
        "name": "xxly/rmb\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "新西兰元/人民币\\_涨跌幅",
        "name": "xxly/rmb\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "新加坡元/人民币\\_中间价",
        "name": "xjpy/rmb\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "新加坡元/人民币\\_涨跌幅",
        "name": "xjpy/rmb\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "瑞郎/人民币\\_中间价",
        "name": "rl/rmb\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "瑞郎/人民币\\_涨跌幅",
        "name": "rl/rmb\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "加元/人民币\\_中间价",
        "name": "jy/rmb\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "加元/人民币\\_涨跌幅",
        "name": "jy/rmb\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "人民币/马来西亚林吉特\\_中间价",
        "name": "rmb/mlxyljt\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "人民币/马来西亚林吉特\\_涨跌幅",
        "name": "rmb/mlxyljt\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "人民币/俄罗斯卢布\\_中间价",
        "name": "rmb/elslb\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "人民币/俄罗斯卢布\\_涨跌幅",
        "name": "rmb/elslb\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "人民币/南非兰特\\_中间价",
        "name": "rmb/nflt\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "人民币/南非兰特\\_涨跌幅",
        "name": "rmb/nflt\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "人民币/韩元\\_中间价",
        "name": "rmb/hy\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "人民币/韩元\\_涨跌幅",
        "name": "rmb/hy\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "人民币/阿联酋迪拉姆\\_中间价",
        "name": "rmb/alqdlm\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "人民币/阿联酋迪拉姆\\_涨跌幅",
        "name": "rmb/alqdlm\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "人民币/沙特里亚尔\\_中间价",
        "name": "rmb/stlye\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "人民币/沙特里亚尔\\_涨跌幅",
        "name": "rmb/stlye\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "人民币/匈牙利福林\\_中间价",
        "name": "rmb/xylfl\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "人民币/匈牙利福林\\_涨跌幅",
        "name": "rmb/xylfl\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "人民币/波兰兹罗提\\_中间价",
        "name": "rmb/blzlt\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "人民币/波兰兹罗提\\_涨跌幅",
        "name": "rmb/blzlt\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "人民币/丹麦克朗\\_中间价",
        "name": "rmb/dmkl\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "人民币/丹麦克朗\\_涨跌幅",
        "name": "rmb/dmkl\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "人民币/瑞典克朗\\_中间价",
        "name": "rmb/rdkl\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "人民币/瑞典克朗\\_涨跌幅",
        "name": "rmb/rdkl\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "人民币/丹麦克朗\\_中间价",
        "name": "rmb/dmkl\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "人民币/丹麦克朗\\_涨跌幅",
        "name": "rmb/dmkl\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "人民币/挪威克朗\\_中间价",
        "name": "rmb/nwkl\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "人民币/挪威克朗\\_涨跌幅",
        "name": "rmb/nwkl\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "人民币/土耳其里拉\\_中间价",
        "name": "rmb/teqll\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "人民币/土耳其里拉\\_涨跌幅",
        "name": "rmb/teqll\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "人民币/墨西哥比索\\_中间价",
        "name": "rmb/mxgbs\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "人民币/墨西哥比索\\_涨跌幅",
        "name": "rmb/mxgbs\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      },
      {
        "title": "人民币/泰铢\\_中间价",
        "name": "rmb/tz\\_zjj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "人民币/泰铢\\_涨跌幅",
        "name": "rmb/tz\\_zdf",
        "type": "float64",
        "description": "单位: 点",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "深圳融资融券报告",
    "name": "szrzrqbg",
    "api": "macro_china_market_margin_sz",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_market_margin_sz",
    "description": "深圳融资融券报告, 数据区间从 20100331-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "融资买入额",
        "name": "rzmre",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "融资余额",
        "name": "rzye",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "融券卖出量",
        "name": "rqmcl",
        "type": "float64",
        "description": "注意单位: 股",
        "unit": "股"
      },
      {
        "title": "融券余量",
        "name": "rqyl",
        "type": "float64",
        "description": "注意单位: 股",
        "unit": "股"
      },
      {
        "title": "融券余额",
        "name": "rqye",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "融资融券余额",
        "name": "rzrqye",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "上海融资融券报告",
    "name": "shrzrqbg",
    "api": "macro_china_market_margin_sh",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_market_margin_sse",
    "description": "上海融资融券报告, 数据区间从 20100331-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "日期",
        "unit": ""
      },
      {
        "title": "融资余额",
        "name": "rzye",
        "type": "int64",
        "description": "注意单位：元",
        "unit": ""
      },
      {
        "title": "融资买入额",
        "name": "rzmre",
        "type": "int64",
        "description": "注意单位：元",
        "unit": ""
      },
      {
        "title": "融券余量",
        "name": "rqyl",
        "type": "int64",
        "description": "注意单位：股",
        "unit": ""
      },
      {
        "title": "融券余额",
        "name": "rqye",
        "type": "int64",
        "description": "注意单位：元",
        "unit": ""
      },
      {
        "title": "融券卖出量",
        "name": "rqmcl",
        "type": "int64",
        "description": "注意单位：股",
        "unit": ""
      },
      {
        "title": "融资融券余额",
        "name": "rzrqye",
        "type": "int64",
        "description": "注意单位：元",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "上海黄金交易所报告",
    "name": "shhjjysbg",
    "api": "macro_china_au_report",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_sge_report",
    "description": "上海黄金交易所报告, 数据区间从 20140905-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "开盘价",
        "name": "kpj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高价",
        "name": "zgj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低价",
        "name": "zdj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "收盘价",
        "name": "spj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌",
        "name": "zd",
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
        "title": "加权平均价",
        "name": "jqpjj",
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
        "title": "成交金额",
        "name": "cjje",
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
        "title": "交收方向",
        "name": "jsfx",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交收量",
        "name": "jsl",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "国家统计局全国数据",
    "name": "gjtjjqgsj",
    "api": "macro_china_nbs_nation",
    "targetUrl": "https://data.stats.gov.cn/easyquery.htm",
    "description": "国家统计局全国数据通用接口，包括月度数据、季度数据、年度数据，具体指标见数据官网。",
    "remarks": "根据参数返回指定数据",
    "inputParameters": [
      {
        "title": "kind",
        "name": "kind",
        "type": "str",
        "description": "数据类别，包括：月度数据、季度数据、年度数据。",
        "isRequired": true
      },
      {
        "title": "path",
        "name": "path",
        "type": "str",
        "description": "数据路径， 需与kind参数匹配，具体见官网，多层级之间使用 > 连接 。<br> 示例：<br> 国民经济核算 > 支出法国内生产总值<br> 人口 > 总人口<br> 金融业 > 保险系统机构、人员数 > 保险系统机构数",
        "isRequired": true
      },
      {
        "title": "period",
        "name": "period",
        "type": "str",
        "description": "时间区间 <br/>参考格式如下(英文逗号分割，且不能有多余空格)：<br/> 月：201201,201205<br/> 季：2012A,2012B,2012C,2012D<br/> 年：2012,2013 <br> 至今：2013-<br> 最近：last10",
        "isRequired": true
      }
    ],
    "outputParameters": []
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "国家统计局地区数据",
    "name": "gjtjjdqsj",
    "api": "macro_china_nbs_region",
    "targetUrl": "https://data.stats.gov.cn/easyquery.htm",
    "description": "国家统计局地区数据通用接口，包括分省月度数据、分省季度数据、分省年度数据、主要城市月度价格、主要城市年度数据、港澳台月度数据、港澳台年度数据，具体指标见数据官网。",
    "remarks": "根据参数返回指定数据",
    "inputParameters": [
      {
        "title": "kind",
        "name": "kind",
        "type": "str",
        "description": "数据类别，包括：分省月度数据、分省季度数据、分省年度数据、主要城市月度价格、主要城市年度数据、港澳台月度数据、港澳台年度数据。",
        "isRequired": true
      },
      {
        "title": "path",
        "name": "path",
        "type": "str",
        "description": "数据路径， 需与kind匹配，具体见官网，多层级之间使用 > 连接 。<br> 示例：<br> 国民经济核算 > 地区生产总值<br> 财政 > 地方财政收入",
        "isRequired": true
      },
      {
        "title": "indicator",
        "name": "indicator",
        "type": "Union[str, None]",
        "description": "指定指标，表示在当前path下可选择的指标。在指定region参数的情况下，此参数可以设置为None，此时将获取指定地区下所有可选指标的值。indicator和region参数不能同时为None。",
        "isRequired": false
      },
      {
        "title": "region",
        "name": "region",
        "type": "Union[str, None]",
        "description": "指定地区，为可选指标。指定时表示仅获取当前地区下的数据。",
        "isRequired": false
      },
      {
        "title": "period",
        "name": "period",
        "type": "str",
        "description": "时间区间<br/>参考格式如下(英文逗号分割，且不能有多余空格)：<br/> 月：201201,201205<br/> 季：2012A,2012B,2012C,2012D<br/> 年：2012,2013 <br> 至今：2013-<br> 最近：last10",
        "isRequired": true
      }
    ],
    "outputParameters": []
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "股票筹资",
    "name": "gpcz",
    "api": "macro_stock_finance",
    "targetUrl": "https://data.10jqka.com.cn/macro/finance/",
    "description": "同花顺-数据中心-宏观数据-股票筹资",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "募集资金",
        "name": "mjzj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "首发募集资金",
        "name": "sfmjzj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "增发募集资金",
        "name": "zfmjzj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "配股募集资金",
        "name": "pgmjzj",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "新增人民币贷款",
    "name": "xzrmbdk",
    "api": "macro_rmb_loan",
    "targetUrl": "https://data.10jqka.com.cn/macro/loan/",
    "description": "同花顺-数据中心-宏观数据-新增人民币贷款",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "新增人民币贷款-总额",
        "name": "xzrmbdk_ze",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "新增人民币贷款-同比",
        "name": "xzrmbdk_tb",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "新增人民币贷款-环比",
        "name": "xzrmbdk_hb",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "累计人民币贷款-总额",
        "name": "ljrmbdk_ze",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "累计人民币贷款-同比",
        "name": "ljrmbdk_tb",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "人民币存款余额",
    "name": "rmbckye",
    "api": "macro_rmb_deposit",
    "targetUrl": "https://data.10jqka.com.cn/macro/rmb/",
    "description": "同花顺-数据中心-宏观数据-人民币存款余额",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "新增存款-数量",
        "name": "xzck_sl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "新增存款-同比",
        "name": "xzck_tb",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "新增存款-环比",
        "name": "xzck_hb",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "新增企业存款-数量",
        "name": "xzqyck_sl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "新增企业存款-同比",
        "name": "xzqyck_tb",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "新增企业存款-环比",
        "name": "xzqyck_hb",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "新增储蓄存款-数量",
        "name": "xzcxck_sl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "新增储蓄存款-同比",
        "name": "xzcxck_tb",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "新增储蓄存款-环比",
        "name": "xzcxck_hb",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "新增其他存款-数量",
        "name": "xzqtck_sl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "新增其他存款-同比",
        "name": "xzqtck_tb",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "新增其他存款-环比",
        "name": "xzqtck_hb",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "消费者物价指数",
    "name": "xfzwjzs",
    "api": "macro_china_hk_cpi",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_8_0.html",
    "description": "东方财富-经济数据一览-中国香港-消费者物价指数",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "消费者物价指数年率",
    "name": "xfzwjzsnl",
    "api": "macro_china_hk_cpi_ratio",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_8_1.html",
    "description": "东方财富-经济数据一览-中国香港-消费者物价指数年率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "失业率",
    "name": "syl",
    "api": "macro_china_hk_rate_of_unemployment",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_8_2.html",
    "description": "东方财富-经济数据一览-中国香港-失业率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "GDP",
    "name": "gdp",
    "api": "macro_china_hk_gbp",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_8_3.html",
    "description": "东方财富-经济数据一览-中国香港-香港 GDP",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 亿港元",
        "unit": "亿港元"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: 亿港元",
        "unit": "亿港元"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "GDP 同比",
    "name": "gdp_tb",
    "api": "macro_china_hk_gbp_ratio",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_8_4.html",
    "description": "东方财富-经济数据一览-中国香港-香港 GDP 同比",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "香港楼宇买卖合约数量",
    "name": "xglymmhysl",
    "api": "macro_china_hk_building_volume",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_8_5.html",
    "description": "东方财富-经济数据一览-中国香港-香港楼宇买卖合约数量",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "香港楼宇买卖合约成交金额",
    "name": "xglymmhycjje",
    "api": "macro_china_hk_building_amount",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_8_6.html",
    "description": "东方财富-经济数据一览-中国香港-香港楼宇买卖合约成交金额",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 亿港元",
        "unit": "亿港元"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: 亿港元",
        "unit": "亿港元"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "香港商品贸易差额年率",
    "name": "xgspmycenl",
    "api": "macro_china_hk_trade_diff_ratio",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_8_7.html",
    "description": "东方财富-经济数据一览-中国香港-香港商品贸易差额年率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "香港制造业 PPI 年率",
    "name": "xgzzy_ppi_nl",
    "api": "macro_china_hk_ppi",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_8_8.html",
    "description": "东方财富-经济数据一览-中国香港-香港制造业PPI年率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国GDP",
    "name": "mggdp",
    "api": "macro_usa_gdp_monthly",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_gdp",
    "description": "美国国内生产总值(GDP)报告, 数据区间从 20080228-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国CPI月率报告",
    "name": "mgcpiylbg",
    "api": "macro_usa_cpi_monthly",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_cpi",
    "description": "美国 CPI 月率报告, 数据区间从 19700101-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国CPI年率报告",
    "name": "mgcpinlbg",
    "api": "macro_usa_cpi_yoy",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_0_12.html",
    "description": "东方财富-经济数据一览-美国-CPI年率, 数据区间从2008-至今",
    "remarks": "单次返回所有历史数据",
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
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国核心CPI月率报告",
    "name": "mghxcpiylbg",
    "api": "macro_usa_core_cpi_monthly",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_core_cpi",
    "description": "美国核心 CPI 月率报告, 数据区间从 19700101-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国个人支出月率报告",
    "name": "mggrzcylbg",
    "api": "macro_usa_personal_spending",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_personal_spending",
    "description": "美国个人支出月率报告, 数据区间从 19700101-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国零售销售月率报告",
    "name": "mglsxsylbg",
    "api": "macro_usa_retail_sales",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_retail_sales",
    "description": "美国零售销售月率报告, 数据区间从 19920301-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国进口物价指数报告",
    "name": "mgjkwjzsbg",
    "api": "macro_usa_import_price",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_import_price",
    "description": "美国进口物价指数报告, 数据区间从 19890201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国出口价格指数报告",
    "name": "mgckjgzsbg",
    "api": "macro_usa_export_price",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_export_price",
    "description": "美国出口价格指数报告, 数据区间从 19890201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "LMCI",
    "name": "lmci",
    "api": "macro_usa_lmci",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_lmci",
    "description": "美联储劳动力市场状况指数报告, 数据区间从 20141006-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国失业率报告",
    "name": "mgsylbg",
    "api": "macro_usa_unemployment_rate",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_unemployment_rate",
    "description": "美国失业率报告, 数据区间从 19700101-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国挑战者企业裁员人数报告",
    "name": "mgtzzqycyrsbg",
    "api": "macro_usa_job_cuts",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_job_cuts",
    "description": "美国挑战者企业裁员人数报告, 数据区间从 19940201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: 万人",
        "unit": "万人"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: 万人",
        "unit": "万人"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 万人",
        "unit": "万人"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国非农就业人数报告",
    "name": "mgfnjyrsbg",
    "api": "macro_usa_non_farm",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_nonfarm_payrolls",
    "description": "美国非农就业人数报告, 数据区间从 19700102-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: 万人",
        "unit": "万人"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: 万人",
        "unit": "万人"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 万人",
        "unit": "万人"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国ADP就业人数报告",
    "name": "mgadpjyrsbg",
    "api": "macro_usa_adp_employment",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_adp_nonfarm_employment",
    "description": "美国 ADP 就业人数报告, 数据区间从 20010601-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: 万人",
        "unit": "万人"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: 万人",
        "unit": "万人"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 万人",
        "unit": "万人"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国核心PCE物价指数年率报告",
    "name": "mghxpcewjzsnlbg",
    "api": "macro_usa_core_pce_price",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_core_pce_price",
    "description": "美国核心 PCE 物价指数年率报告, 数据区间从 19700101-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国实际个人消费支出季率初值报告",
    "name": "mgsjgrxfzcjlczbg",
    "api": "macro_usa_real_consumer_spending",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_real_consumer_spending",
    "description": "美国实际个人消费支出季率初值报告, 数据区间从 20131107-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国贸易帐报告",
    "name": "mgmyzbg",
    "api": "macro_usa_trade_balance",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_trade_balance",
    "description": "美国贸易帐报告, 数据区间从 19700101-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国经常帐报告",
    "name": "mgjczbg",
    "api": "macro_usa_current_account",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_current_account",
    "description": "美国经常帐报告, 数据区间从 20080317-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 亿美元",
        "unit": "亿美元"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "贝克休斯钻井报告",
    "name": "bkxszjbg",
    "api": "macro_usa_rig_count",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_rig_count_summary",
    "description": "贝克休斯钻井报告, 数据区间从 19870717-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "钻井总数\\_钻井数",
        "name": "zjzs\\_zjs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "钻井总数\\_变化",
        "name": "zjzs\\_bh",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "美国石油钻井\\_钻井数",
        "name": "mgsyzj\\_zjs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "美国石油钻井\\_变化",
        "name": "mgsyzj\\_bh",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "混合钻井\\_钻井数",
        "name": "hhzj\\_zjs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "混合钻井\\_变化",
        "name": "hhzj\\_bh",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "美国天然气钻井\\_钻井数",
        "name": "mgtrqzj\\_zjs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "美国天然气钻井\\_变化",
        "name": "mgtrqzj\\_bh",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国生产者物价指数(PPI)报告",
    "name": "mgsczwjzs_ppibg",
    "api": "macro_usa_ppi",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_ppi",
    "description": "美国生产者物价指数(PPI)报告, 数据区间从 20080226-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国核心生产者物价指数(PPI)报告",
    "name": "mghxsczwjzs_ppibg",
    "api": "macro_usa_core_ppi",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_core_ppi",
    "description": "美国核心生产者物价指数(PPI)报告, 数据区间从 20080318-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国 API 原油库存报告",
    "name": "mg_api_yykcbg",
    "api": "macro_usa_api_crude_stock",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_api_crude_stock",
    "description": "美国 API 原油库存报告, 数据区间从 20120328-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: 万桶",
        "unit": "万桶"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: 万桶",
        "unit": "万桶"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 万桶",
        "unit": "万桶"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国Markit制造业PMI初值报告",
    "name": "mgmarkitzzypmiczbg",
    "api": "macro_usa_pmi",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_pmi",
    "description": "美国 Markit 制造业 PMI 初值报告, 数据区间从 20120601-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国ISM制造业PMI报告",
    "name": "mgismzzypmibg",
    "api": "macro_usa_ism_pmi",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_ism_pmi",
    "description": "美国 ISM 制造业 PMI 报告, 数据区间从 19700101-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国工业产出月率报告",
    "name": "mggyccylbg",
    "api": "macro_usa_industrial_production",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_industrial_production",
    "description": "美国工业产出月率报告, 数据区间从 19700101-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国耐用品订单月率报告",
    "name": "mgnypddylbg",
    "api": "macro_usa_durable_goods_orders",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_durable_goods_orders",
    "description": "美国耐用品订单月率报告, 数据区间从 20080227-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国工厂订单月率报告",
    "name": "mggcddylbg",
    "api": "macro_usa_factory_orders",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_factory_orders",
    "description": "美国工厂订单月率报告, 数据区间从 19920401-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国Markit服务业PMI初值报告",
    "name": "mgmarkitfwypmiczbg",
    "api": "macro_usa_services_pmi",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_services_pmi",
    "description": "美国Markit服务业PMI初值报告, 数据区间从 20120701-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国商业库存月率报告",
    "name": "mgsykcylbg",
    "api": "macro_usa_business_inventories",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_business_inventories",
    "description": "美国商业库存月率报告, 数据区间从 19920301-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国ISM非制造业PMI报告",
    "name": "mgismfzzypmibg",
    "api": "macro_usa_ism_non_pmi",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_ism_non_pmi",
    "description": "美国 ISM 非制造业 PMI 报告, 数据区间从 19970801-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国NAHB房产市场指数报告",
    "name": "mgnahbfcsczsbg",
    "api": "macro_usa_nahb_house_market_index",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_nahb_house_market_index",
    "description": "美国 NAHB 房产市场指数报告, 数据区间从 19850201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国新屋开工总数年化报告",
    "name": "mgxwkgzsnhbg",
    "api": "macro_usa_house_starts",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_house_starts",
    "description": "美国新屋开工总数年化报告, 数据区间从 19700101-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: 万户",
        "unit": "万户"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: 万户",
        "unit": "万户"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 万户",
        "unit": "万户"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国新屋销售总数年化报告",
    "name": "mgxwxszsnhbg",
    "api": "macro_usa_new_home_sales",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_new_home_sales",
    "description": "美国新屋销售总数年化报告, 数据区间从 19700101-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: 万户",
        "unit": "万户"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: 万户",
        "unit": "万户"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 万户",
        "unit": "万户"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国营建许可总数报告",
    "name": "mgyjxkzsbg",
    "api": "macro_usa_building_permits",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_building_permits",
    "description": "美国营建许可总数报告, 数据区间从 20080220-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: 万户",
        "unit": "万户"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: 万户",
        "unit": "万户"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 万户",
        "unit": "万户"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国成屋销售总数年化报告",
    "name": "mgcwxszsnhbg",
    "api": "macro_usa_exist_home_sales",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_exist_home_sales",
    "description": "美国成屋销售总数年化报告, 数据区间从 19700101-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: 万户",
        "unit": "万户"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: 万户",
        "unit": "万户"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 万户",
        "unit": "万户"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国FHFA房价指数月率报告",
    "name": "mgfhfafjzsylbg",
    "api": "macro_usa_house_price_index",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_house_price_index",
    "description": "美国 FHFA 房价指数月率报告, 数据区间从 19910301-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国S&P/CS20座大城市房价指数年率报告",
    "name": "mgs&p/cs20zdcsfjzsnlbg",
    "api": "macro_usa_spcs20",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_spcs20",
    "description": "美国S&P/CS20座大城市房价指数年率报告, 数据区间从 20010201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国成屋签约销售指数月率报告",
    "name": "mgcwqyxszsylbg",
    "api": "macro_usa_pending_home_sales",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_usa_pending_home_sales",
    "description": "美国成屋签约销售指数月率报告, 数据区间从 20010301-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "未决房屋销售月率",
    "name": "wjfwxsyl",
    "api": "macro_usa_phs",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_0_5.html",
    "description": "东方财富-经济数据一览-美国-未决房屋销售月率, 数据区间从 20080201-至今",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国谘商会消费者信心指数报告",
    "name": "mgzshxfzxxzsbg",
    "api": "macro_usa_cb_consumer_confidence",
    "targetUrl": "https://cdn.jin10.com/dc/reports/dc_usa_cb_consumer_confidence_all.js?v=1578576859",
    "description": "美国谘商会消费者信心指数报告, 数据区间从 19700101-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国NFIB小型企业信心指数报告",
    "name": "mgnfibxxqyxxzsbg",
    "api": "macro_usa_nfib_small_business",
    "targetUrl": "https://cdn.jin10.com/dc/reports/dc_usa_nfib_small_business_all.js?v=1578576631",
    "description": "美国NFIB小型企业信心指数报告, 数据区间从 19750201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国密歇根大学消费者信心指数初值报告",
    "name": "mgmxgdxxfzxxzsczbg",
    "api": "macro_usa_michigan_consumer_sentiment",
    "targetUrl": "https://cdn.jin10.com/dc/reports/dc_usa_michigan_consumer_sentiment_all.js?v=1578576228",
    "description": "美国密歇根大学消费者信心指数初值报告, 数据区间从 19700301-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国EIA原油库存报告",
    "name": "mgeiayykcbg",
    "api": "macro_usa_eia_crude_rate",
    "targetUrl": "https://cdn.jin10.com/dc/reports/dc_usa_michigan_consumer_sentiment_all.js?v=1578576228",
    "description": "美国EIA原油库存报告, 数据区间从 19950801-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: 万桶",
        "unit": "万桶"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: 万桶",
        "unit": "万桶"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 万桶",
        "unit": "万桶"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国初请失业金人数报告",
    "name": "mgcqsyjrsbg",
    "api": "macro_usa_initial_jobless",
    "targetUrl": "https://cdn.jin10.com/dc/reports/dc_usa_michigan_consumer_sentiment_all.js?v=1578576228",
    "description": "美国初请失业金人数报告, 数据区间从 19700101-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: 万人",
        "unit": "万人"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: 万人",
        "unit": "万人"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 万人",
        "unit": "万人"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "美国原油产量报告",
    "name": "mgyyclbg",
    "api": "macro_usa_crude_inner",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_eia_crude_oil_produce",
    "description": "美国原油产量报告, 数据区间从 19830107-至今, 每周三公布(美国节假日除外), 美国能源信息署(EIA)",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "美国国内原油总量-产量",
        "name": "mggnyyzl_cl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "美国国内原油总量-变化",
        "name": "mggnyyzl_bh",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "美国本土48州原油产量-产量",
        "name": "mgbt48zyycl_cl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "美国本土48州原油产量-变化",
        "name": "mgbt48zyycl_bh",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "美国阿拉斯加州原油产量-产量",
        "name": "mgalsjzyycl_cl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "美国阿拉斯加州原油产量-变化",
        "name": "mgalsjzyycl_bh",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "欧元区季度GDP年率报告",
    "name": "oyqjdgdpnlbg",
    "api": "macro_euro_gdp_yoy",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_eurozone_gdp_yoy",
    "description": "欧元区季度 GDP 年率报告, 数据区间从 20131114-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "欧元区CPI月率报告",
    "name": "oyqcpiylbg",
    "api": "macro_euro_cpi_mom",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_eurozone_cpi_mom",
    "description": "欧元区 CPI 月率报告, 数据区间从 19900301-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "欧元区CPI年率报告",
    "name": "oyqcpinlbg",
    "api": "macro_euro_cpi_yoy",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_eurozone_cpi_yoy",
    "description": "欧元区 CPI 年率报告, 数据区间从 19910201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "欧元区PPI月率报告",
    "name": "oyqppiylbg",
    "api": "macro_euro_ppi_mom",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_eurozone_ppi_mom",
    "description": "欧元区 PPI 月率报告, 数据区间从 19810301-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "欧元区零售销售月率报告",
    "name": "oyqlsxsylbg",
    "api": "macro_euro_retail_sales_mom",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_eurozone_retail_sales_mom",
    "description": "欧元区零售销售月率报告, 数据区间从 20000301-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "欧元区季调后就业人数季率报告",
    "name": "oyqjthjyrsjlbg",
    "api": "macro_euro_employment_change_qoq",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_eurozone_employment_change_qoq",
    "description": "欧元区季调后就业人数季率报告, 数据区间从 20083017-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "欧元区失业率报告",
    "name": "oyqsylbg",
    "api": "macro_euro_unemployment_rate_mom",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_eurozone_unemployment_rate_mom",
    "description": "欧元区失业率报告, 数据区间从 19980501-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "欧元区未季调贸易帐报告",
    "name": "oyqwjtmyzbg",
    "api": "macro_euro_trade_balance",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_eurozone_trade_balance_mom",
    "description": "欧元区未季调贸易帐报告, 数据区间从 19990201-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "欧元区经常帐报告",
    "name": "oyqjczbg",
    "api": "macro_euro_current_account_mom",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_eurozone_current_account_mom",
    "description": "欧元区经常帐报告, 数据区间从 20080221-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "欧元区工业产出月率报告",
    "name": "oyqgyccylbg",
    "api": "macro_euro_industrial_production_mom",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_eurozone_industrial_production_mom",
    "description": "欧元区工业产出月率报告, 数据区间从 19910301-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "欧元区制造业PMI初值报告",
    "name": "oyqzzypmiczbg",
    "api": "macro_euro_manufacturing_pmi",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_eurozone_manufacturing_pmi",
    "description": "欧元区制造业 PMI 初值报告, 数据区间从 20080222-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "欧元区服务业PMI终值报告",
    "name": "oyqfwypmizzbg",
    "api": "macro_euro_services_pmi",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_eurozone_services_pmi",
    "description": "欧元区服务业 PMI 终值报告, 数据区间从 20080222-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "欧元区ZEW经济景气指数报告",
    "name": "oyqzewjjjqzsbg",
    "api": "macro_euro_zew_economic_sentiment",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_eurozone_zew_economic_sentiment",
    "description": "欧元区 ZEW 经济景气指数报告, 数据区间从 20080212-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "欧元区Sentix投资者信心指数报告",
    "name": "oyqsentixtzzxxzsbg",
    "api": "macro_euro_sentix_investor_confidence",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_eurozone_sentix_investor_confidence",
    "description": "欧元区 Sentix 投资者信心指数报告, 数据区间从 20020801-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "预测值",
        "name": "ycz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "IFO商业景气指数",
    "name": "ifosyjqzs",
    "api": "macro_germany_ifo",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_1_0.html",
    "description": "东方财富-数据中心-经济数据一览-IFO商业景气指数",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "消费者物价指数月率终值",
    "name": "xfzwjzsylzz",
    "api": "macro_germany_cpi_monthly",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_1_1.html",
    "description": "东方财富-数据中心-经济数据一览-德国-消费者物价指数月率终值",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "消费者物价指数年率终值",
    "name": "xfzwjzsnlzz",
    "api": "macro_germany_cpi_yearly",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_1_2.html",
    "description": "东方财富-数据中心-经济数据一览-德国-消费者物价指数年率终值",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "贸易帐-季调后",
    "name": "myz_jth",
    "api": "macro_germany_trade_adjusted",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_1_3.html",
    "description": "东方财富-数据中心-经济数据一览-德国-贸易帐(季调后)",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "GDP",
    "name": "gdp",
    "api": "macro_germany_gdp",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_1_4.html",
    "description": "东方财富-数据中心-经济数据一览-德国-GDP",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "实际零售销售月率",
    "name": "sjlsxsyl",
    "api": "macro_germany_retail_sale_monthly",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_1_5.html",
    "description": "东方财富-数据中心-经济数据一览-德国-实际零售销售月率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "实际零售销售年率",
    "name": "sjlsxsnl",
    "api": "macro_germany_retail_sale_yearly",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_1_6.html",
    "description": "东方财富-数据中心-经济数据一览-德国-实际零售销售年率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "ZEW 经济景气指数",
    "name": "zew_jjjqzs",
    "api": "macro_germany_zew",
    "targetUrl": "https://data.eastmoney.com/cjsj/foreign_1_7.html",
    "description": "东方财富-数据中心-经济数据一览-德国-ZEW 经济景气指数",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "SVME 采购经理人指数",
    "name": "svme_cgjlrzs",
    "api": "macro_swiss_svme",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_2_0.html",
    "description": "东方财富-经济数据-瑞士-SVME采购经理人指数",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "贸易帐",
    "name": "myz",
    "api": "macro_swiss_trade",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_2_1.html",
    "description": "东方财富-经济数据-瑞士-贸易帐",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "消费者物价指数年率",
    "name": "xfzwjzsnl",
    "api": "macro_swiss_cpi_yearly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_2_2.html",
    "description": "东方财富-经济数据-瑞士-消费者物价指数年率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "GDP 季率",
    "name": "gdp_jl",
    "api": "macro_swiss_gdp_quarterly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_2_3.html",
    "description": "东方财富-经济数据-瑞士-GDP 季率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "GDP 年率",
    "name": "gdp_nl",
    "api": "macro_swiss_gbd_yearly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_2_4.html",
    "description": "东方财富-经济数据-瑞士-GDP 年率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "央行公布利率决议",
    "name": "yxgblljy",
    "api": "macro_swiss_gbd_bank_rate",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_2_5.html",
    "description": "东方财富-经济数据-瑞士-央行公布利率决议",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "央行公布利率决议",
    "name": "yxgblljy",
    "api": "macro_japan_bank_rate",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_3_0.html",
    "description": "东方财富-经济数据-日本-央行公布利率决议",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "全国消费者物价指数年率",
    "name": "qgxfzwjzsnl",
    "api": "macro_japan_cpi_yearly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_3_1.html",
    "description": "东方财富-经济数据-日本-全国消费者物价指数年率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "全国核心消费者物价指数年率",
    "name": "qghxxfzwjzsnl",
    "api": "macro_japan_core_cpi_yearly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_2_2.html",
    "description": "东方财富-经济数据-日本-全国核心消费者物价指数年率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "失业率",
    "name": "syl",
    "api": "macro_japan_unemployment_rate",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_2_3.html",
    "description": "东方财富-经济数据-日本-失业率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "领先指标终值",
    "name": "lxzbzz",
    "api": "macro_japan_head_indicator",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_3_4.html",
    "description": "东方财富-经济数据-日本-领先指标终值",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "Halifax 房价指数月率",
    "name": "halifax_fjzsyl",
    "api": "macro_uk_halifax_monthly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_4_0.html",
    "description": "东方财富-经济数据-英国-Halifax 房价指数月率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "Halifax 房价指数年率",
    "name": "halifax_fjzsnl",
    "api": "macro_uk_halifax_yearly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_4_1.html",
    "description": "东方财富-经济数据-英国-Halifax 房价指数年率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "贸易帐",
    "name": "myz",
    "api": "macro_uk_trade",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_4_2.html",
    "description": "东方财富-经济数据-英国-贸易帐",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "央行公布利率决议",
    "name": "yxgblljy",
    "api": "macro_uk_bank_rate",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_4_3.html",
    "description": "东方财富-经济数据-英国-央行公布利率决议",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "核心消费者物价指数年率",
    "name": "hxxfzwjzsnl",
    "api": "macro_uk_core_cpi_yearly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_4_4.html",
    "description": "东方财富-经济数据-英国-核心消费者物价指数年率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "核心消费者物价指数月率",
    "name": "hxxfzwjzsyl",
    "api": "macro_uk_core_cpi_monthly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_4_7.html",
    "description": "东方财富-经济数据-英国-核心消费者物价指数月率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "消费者物价指数年率",
    "name": "xfzwjzsnl",
    "api": "macro_uk_cpi_yearly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_4_6.html",
    "description": "东方财富-经济数据-英国-消费者物价指数年率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "消费者物价指数月率",
    "name": "xfzwjzsyl",
    "api": "macro_uk_cpi_monthly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_4_7.html",
    "description": "东方财富-经济数据-英国-消费者物价指数月率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "零售销售月率",
    "name": "lsxsyl",
    "api": "macro_uk_retail_monthly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_4_8.html",
    "description": "东方财富-经济数据-英国-零售销售月率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "零售销售年率",
    "name": "lsxsnl",
    "api": "macro_uk_retail_yearly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_4_9.html",
    "description": "东方财富-经济数据-英国-零售销售年率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "Rightmove 房价指数年率",
    "name": "rightmove_fjzsnl",
    "api": "macro_uk_rightmove_yearly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_4_10.html",
    "description": "东方财富-经济数据-英国-Rightmove 房价指数年率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "Rightmove 房价指数月率",
    "name": "rightmove_fjzsyl",
    "api": "macro_uk_rightmove_monthly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_4_11.html",
    "description": "东方财富-经济数据-英国-Rightmove 房价指数月率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "GDP 季率初值",
    "name": "gdp_jlcz",
    "api": "macro_uk_gdp_quarterly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_4_12.html",
    "description": "东方财富-经济数据-英国-GDP 季率初值",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "GDP 年率初值",
    "name": "gdp_nlcz",
    "api": "macro_uk_gdp_yearly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_4_13.html",
    "description": "东方财富-经济数据-英国-GDP 年率初值",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "失业率",
    "name": "syl",
    "api": "macro_uk_unemployment_rate",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_4_14.html",
    "description": "东方财富-经济数据-英国-失业率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "零售销售月率",
    "name": "lsxsyl",
    "api": "macro_australia_retail_rate_monthly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_5_0.html",
    "description": "东方财富-经济数据-澳大利亚-零售销售月率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "贸易帐",
    "name": "myz",
    "api": "macro_australia_trade",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_5_1.html",
    "description": "东方财富-经济数据-澳大利亚-贸易帐",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 亿澳元",
        "unit": "亿澳元"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: 亿澳元",
        "unit": "亿澳元"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "失业率",
    "name": "syl",
    "api": "macro_australia_unemployment_rate",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_5_2.html",
    "description": "东方财富-经济数据-澳大利亚-失业率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "生产者物价指数季率",
    "name": "sczwjzsjl",
    "api": "macro_australia_ppi_quarterly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_5_3.html",
    "description": "东方财富-经济数据-澳大利亚-生产者物价指数季率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "消费者物价指数季率",
    "name": "xfzwjzsjl",
    "api": "macro_australia_cpi_quarterly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_5_4.html",
    "description": "东方财富-经济数据-澳大利亚-消费者物价指数季率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "消费者物价指数年率",
    "name": "xfzwjzsnl",
    "api": "macro_australia_cpi_yearly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_5_5.html",
    "description": "东方财富-经济数据-澳大利亚-消费者物价指数年率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "央行公布利率决议",
    "name": "yxgblljy",
    "api": "macro_australia_bank_rate",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_5_6.html",
    "description": "东方财富-经济数据-澳大利亚-央行公布利率决议",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "新屋开工",
    "name": "xwkg",
    "api": "macro_canada_new_house_rate",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_7_0.html",
    "description": "东方财富-经济数据-加拿大-新屋开工",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 万",
        "unit": "万"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: 万",
        "unit": "万"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "失业率",
    "name": "syl",
    "api": "macro_canada_unemployment_rate",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_7_1.html",
    "description": "东方财富-经济数据-加拿大-失业率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "贸易帐",
    "name": "myz",
    "api": "macro_canada_trade",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_7_2.html",
    "description": "东方财富-经济数据-加拿大-贸易帐",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: 亿加元",
        "unit": "亿加元"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: 亿加元",
        "unit": "亿加元"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "零售销售月率",
    "name": "lsxsyl",
    "api": "macro_canada_retail_rate_monthly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_7_3.html",
    "description": "东方财富-经济数据-加拿大-零售销售月率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "央行公布利率决议",
    "name": "yxgblljy",
    "api": "macro_canada_bank_rate",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_7_4.html",
    "description": "东方财富-经济数据-加拿大-央行公布利率决议",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "核心消费者物价指数年率",
    "name": "hxxfzwjzsnl",
    "api": "macro_canada_core_cpi_yearly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_7_5.html",
    "description": "东方财富-经济数据-加拿大-核心消费者物价指数年率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "核心消费者物价指数月率",
    "name": "hxxfzwjzsyl",
    "api": "macro_canada_core_cpi_monthly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_7_6.html",
    "description": "东方财富-经济数据-加拿大-核心消费者物价指数月率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "消费者物价指数年率",
    "name": "xfzwjzsnl",
    "api": "macro_canada_cpi_yearly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_7_7.html",
    "description": "东方财富-经济数据-加拿大-消费者物价指数年率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "消费者物价指数月率",
    "name": "xfzwjzsyl",
    "api": "macro_canada_cpi_monthly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_7_8.html",
    "description": "东方财富-经济数据-加拿大-消费者物价指数月率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "GDP 月率",
    "name": "gdp_yl",
    "api": "macro_canada_gdp_monthly",
    "targetUrl": "http://data.eastmoney.com/cjsj/foreign_7_9.html",
    "description": "东方财富-经济数据-加拿大-GDP 月率",
    "remarks": "单次返回所有历史数据",
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
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "现值",
        "name": "xz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "发布日期",
        "name": "fbrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "全球最大黄金 ETF—SPDR Gold Trust 持仓报告",
    "name": "qqzdhj_etf—spdr_gold_trust_ccbg",
    "api": "macro_cons_gold",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_etf_gold",
    "description": "全球最大黄金 ETF—SPDR Gold Trust 持仓报告, 数据区间从 20041119-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "总库存",
        "name": "zkc",
        "type": "float64",
        "description": "注意单位: 吨",
        "unit": "吨"
      },
      {
        "title": "增持/减持",
        "name": "zc/jc",
        "type": "float64",
        "description": "注意单位: 吨",
        "unit": "吨"
      },
      {
        "title": "总价值",
        "name": "zjz",
        "type": "float64",
        "description": "注意单位: 美元",
        "unit": "美元"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "全球最大白银ETF--iShares Silver Trust持仓报告",
    "name": "qqzdbyetf__ishares_silver_trustccbg",
    "api": "macro_cons_silver",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_etf_sliver",
    "description": "全球最大白银 ETF--iShares Silver Trust 持仓报告, 数据区间从 20041202-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "总库存",
        "name": "zkc",
        "type": "float64",
        "description": "注意单位: 吨",
        "unit": "吨"
      },
      {
        "title": "增持/减持",
        "name": "zc/jc",
        "type": "float64",
        "description": "注意单位: 吨",
        "unit": "吨"
      },
      {
        "title": "总价值",
        "name": "zjz",
        "type": "float64",
        "description": "注意单位: 美元",
        "unit": "美元"
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "欧佩克报告",
    "name": "opkbg",
    "api": "macro_cons_opec_month",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_opec_report",
    "description": "欧佩克报告, 数据区间从 20170118-至今",
    "remarks": "单次返回所有历史数据, 以网页数据为准.",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "阿尔及利亚",
        "name": "aejly",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "安哥拉",
        "name": "agl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "厄瓜多尔",
        "name": "egde",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "加蓬",
        "name": "jp",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "伊朗",
        "name": "yl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "伊拉克",
        "name": "ylk",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "科威特",
        "name": "kwt",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "利比亚",
        "name": "lby",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "尼日利亚",
        "name": "nrly",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "沙特",
        "name": "st",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "阿联酋",
        "name": "alq",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "委内瑞拉",
        "name": "wnrl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "欧佩克产量",
        "name": "opkcl",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "持仓报告",
    "name": "ccbg",
    "api": "macro_euro_lme_holding",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_lme_traders_report",
    "description": "伦敦金属交易所(LME)-持仓报告, 数据区间从 20151022-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "铜-多头仓位",
        "name": "t_dtcw",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "...",
        "name": "...",
        "type": "object",
        "description": "...",
        "unit": ""
      },
      {
        "title": "铝-净仓位",
        "name": "l_jcw",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "库存报告",
    "name": "kcbg",
    "api": "macro_euro_lme_stock",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_lme_report",
    "description": "伦敦金属交易所(LME)-库存报告, 数据区间从 20140702-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "铜-库存",
        "name": "t_kc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "...",
        "name": "...",
        "type": "...",
        "description": "...",
        "unit": ""
      },
      {
        "title": "镍-注销仓单",
        "name": "n_zxcd",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "外汇类非商业持仓报告",
    "name": "whlfsyccbg",
    "api": "macro_usa_cftc_nc_holding",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_cftc_nc_report",
    "description": "美国商品期货交易委员会CFTC外汇类非商业持仓报告, 数据区间从 19830107-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "美元-多头仓位",
        "name": "my_dtcw",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "...",
        "name": "...",
        "type": "...",
        "description": "",
        "unit": ""
      },
      {
        "title": "澳元-净仓位",
        "name": "ay_jcw",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "商品类非商业持仓报告",
    "name": "splfsyccbg",
    "api": "macro_usa_cftc_c_holding",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_cftc_c_report",
    "description": "美国商品期货交易委员会CFTC商品类非商业持仓报告, 数据区间从 19830107-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "纽约原油-多头仓位",
        "name": "nyyy_dtcw",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "...",
        "name": "...",
        "type": "...",
        "description": "",
        "unit": ""
      },
      {
        "title": "玉米-净仓位",
        "name": "ym_jcw",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "外汇类商业持仓报告",
    "name": "whlsyccbg",
    "api": "macro_usa_cftc_merchant_currency_holding",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_cftc_merchant_currency",
    "description": "美国商品期货交易委员会CFTC外汇类商业持仓报告, 数据区间从 19860115-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "美元-多头仓位",
        "name": "my_dtcw",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "...",
        "name": "...",
        "type": "...",
        "description": "",
        "unit": ""
      },
      {
        "title": "澳元-净仓位",
        "name": "ay_jcw",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "商品类商业持仓报告",
    "name": "splsyccbg",
    "api": "macro_usa_cftc_merchant_goods_holding",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_cftc_merchant_goods",
    "description": "美国商品期货交易委员会 CFTC 商品类商业持仓报告, 数据区间从 19860115-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "纽约原油-多头仓位",
        "name": "nyyy_dtcw",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "...",
        "name": "...",
        "type": "...",
        "description": "",
        "unit": ""
      },
      {
        "title": "玉米-净仓位",
        "name": "ym_jcw",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "贵金属",
    "name": "gjs",
    "api": "macro_usa_cme_merchant_goods_holding",
    "targetUrl": "https://datacenter.jin10.com/org",
    "description": "CME-贵金属, 数据区间从 20180405-至今",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "日期",
        "name": "rq",
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
        "title": "成交量",
        "name": "cjl",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "宏观日历",
    "name": "hgrl",
    "api": "macro_info_ws",
    "targetUrl": "https://wallstreetcn.com/calendar",
    "description": "华尔街见闻-日历-宏观",
    "remarks": "单次返回指定 date 的数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240514\"",
        "defaultValue": "20240514",
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
        "title": "地区",
        "name": "dq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "事件",
        "name": "sj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "重要性",
        "name": "zyx",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "今值",
        "name": "jz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "预期",
        "name": "yq",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "链接",
        "name": "lj",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "宏观数据",
    "moduleName": "macro",
    "title": "全球宏观事件",
    "name": "qqhgsj",
    "api": "news_economic_baidu",
    "targetUrl": "https://gushitong.baidu.com/calendar",
    "description": "全球宏观指标重大事件",
    "remarks": "单次返回指定 date 的所有历史数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20241107\"",
        "defaultValue": "20241107",
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
        "title": "时间",
        "name": "sj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "地区",
        "name": "dq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "事件",
        "name": "sj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "公布",
        "name": "gb",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "预期",
        "name": "yq",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "前值",
        "name": "qz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "重要性",
        "name": "zyx",
        "type": "float64",
        "description": "数值越大越重要",
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
  return macroInterfaces.find(item => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return macroInterfaces.find(item => item.name === name);
}

export default macroInterfaces;
