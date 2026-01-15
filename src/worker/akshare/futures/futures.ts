/**
 * @fileoverview futures AKShare接口定义
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
 * futures接口数据
 */
export const futuresInterfaces: ApiInterface[] = [
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "期货交易费用参照表",
    "name": "qh_qhjyfyczb",
    "api": "futures_fees_info",
    "targetUrl": "http://openctp.cn/fees.html",
    "description": "openctp 期货交易费用参照表",
    "remarks": "单次返回所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "交易所",
        "name": "jys",
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
        "title": "合约名称",
        "name": "hymc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "品种代码",
        "name": "pzdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "品种名称",
        "name": "pzmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "合约乘数",
        "name": "hycs",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最小跳动",
        "name": "zxtd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "开仓费率（按金额）",
        "name": "kcfl（aje）",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "开仓费用（按手）",
        "name": "kcfy（as）",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "平仓费率（按金额）",
        "name": "pcfl（aje）",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "平仓费用（按手）",
        "name": "pcfy（as）",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "平今费率（按金额）",
        "name": "pjfl（aje）",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "平今费用（按手）",
        "name": "pjfy（as）",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "做多保证金率（按金额）",
        "name": "zdbzjl（aje）",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "做多保证金（按手）",
        "name": "zdbzj（as）",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "做空保证金率（按金额）",
        "name": "zkbzjl（aje）",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "做空保证金（按手）",
        "name": "zkbzj（as）",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "上日结算价",
        "name": "srjsj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "上日收盘价",
        "name": "srspj",
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
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "持仓量",
        "name": "ccl",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "1手开仓费用",
        "name": "1skcfy",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "1手平仓费用",
        "name": "1spcfy",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "1手平今费用",
        "name": "1spjfy",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "做多1手保证金",
        "name": "zd1sbzj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "做空1手保证金",
        "name": "zk1sbzj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "1Tick平仓盈亏",
        "name": "1Tickpcyk",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "2Tick平仓盈亏",
        "name": "2Tickpcyk",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "1Tick平仓收益率",
        "name": "1Tickpcsyl",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "2Tick平仓收益率",
        "name": "2Tickpcsyl",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "1Tick平今盈亏",
        "name": "1Tickpjyk",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "2Tick平今盈亏",
        "name": "2Tickpjyk",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "1Tick平今收益率",
        "name": "1Tickpjsyl",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "2Tick平今收益率",
        "name": "2Tickpjsyl",
        "type": "object",
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
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "期货手续费与保证金",
    "name": "qh_qhsxfybzj",
    "api": "futures_comm_info",
    "targetUrl": "https://www.9qihuo.com/qihuoshouxufei",
    "description": "九期网-期货手续费数据",
    "remarks": "单次返回指定 symbol 的所有数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"所有\"; choice of {\"所有\", \"上海期货交易所\", \"大连商品交易所\", \"郑州商品交易所\", \"上海国际能源交易中心\", \"中国金融期货交易所\", \"广州期货交易所\"}",
        "defaultValue": "所有",
        "choices": [
          "所有",
          "上海期货交易所",
          "大连商品交易所",
          "郑州商品交易所",
          "上海国际能源交易中心",
          "中国金融期货交易所",
          "广州期货交易所"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "交易所名称",
        "name": "jysmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "合约名称",
        "name": "hymc",
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
        "title": "现价",
        "name": "xj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨停板",
        "name": "ztb",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "跌停板",
        "name": "dtb",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "保证金-买开",
        "name": "bzj_mk",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "保证金-卖开",
        "name": "bzj_mk",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "保证金-每手",
        "name": "bzj_ms",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "手续费标准-开仓-万分之",
        "name": "sxfbz_kc_wfz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "手续费标准-开仓-元",
        "name": "sxfbz_kc_y",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "手续费标准-平昨-万分之",
        "name": "sxfbz_pz_wfz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "手续费标准-平昨-元",
        "name": "sxfbz_pz_y",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "手续费标准-平今-万分之",
        "name": "sxfbz_pj_wfz",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "手续费标准-平今-元",
        "name": "sxfbz_pj_y",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "每跳毛利",
        "name": "mtml",
        "type": "int64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "手续费",
        "name": "sxf",
        "type": "float64",
        "description": "注意: 开+平",
        "unit": ""
      },
      {
        "title": "每跳净利",
        "name": "mtjl",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "备注",
        "name": "bz",
        "type": "object",
        "description": "是否主力合约",
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
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "期货规则-交易日历表",
    "name": "qh_qhgz_jyrlb",
    "api": "futures_rule",
    "targetUrl": "https://www.gtjaqh.com/pc/calendar.html",
    "description": "国泰君安期货-交易日历数据表",
    "remarks": "单次返回指定交易日所有合约的交易日历数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20231205\"; 需要指定为交易日, 且是近期的日期",
        "defaultValue": "20231205",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "交易所",
        "name": "jys",
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
        "title": "代码",
        "name": "dm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易保证金比例",
        "name": "jybzjbl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "涨跌停板幅度",
        "name": "zdtbfd",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "合约乘数",
        "name": "hycs",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最小变动价位",
        "name": "zxbdjw",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "限价单每笔最大下单手数",
        "name": "xjdmbzdxdss",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "特殊合约参数调整",
        "name": "tshycstz",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "调整备注",
        "name": "tzbz",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "库存数据-99期货网",
    "name": "qh_kcsj_99qhw",
    "api": "futures_inventory_99",
    "targetUrl": "https://www.99qh.com/data/stockIn?productId=61",
    "description": "99 期货网-大宗商品库存数据",
    "remarks": "单次返回指定 symbol 的具体品种的期货库存数据, 仓单日报数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol='豆一'; 交易所对应的具体品种中文名称或者英文代码; 如：大连商品交易所的豆一; 具体品种查询：https://www.99qh.com/data/stockIn?productId=61",
        "defaultValue": "豆一",
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
        "description": "",
        "unit": ""
      },
      {
        "title": "库存",
        "name": "kc",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "库存数据-东方财富",
    "name": "qh_kcsj_dfcf",
    "api": "futures_inventory_em",
    "targetUrl": "http://data.eastmoney.com/ifdata/kcsj.html",
    "description": "东方财富网-期货数据-库存数据; 近 60 个交易日的期货库存日频率数据",
    "remarks": "返回指定交易所指定品种的期货库存数据, 仓单日报数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"A\"; 支持品种代码和中文名称，中文名称参见：https://data.eastmoney.com/ifdata/kcsj.html",
        "defaultValue": "A",
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
        "title": "库存",
        "name": "kc",
        "type": "int64",
        "description": "库存数据",
        "unit": ""
      },
      {
        "title": "增减",
        "name": "zj",
        "type": "float64",
        "description": "相对前一个交易日的增减",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "大连商品交易所",
    "name": "qh_dlspjys1",
    "api": "futures_dce_position_rank",
    "targetUrl": "http://www.dce.com.cn/dalianshangpin/xqsj/tjsj26/rtj/rcjccpm/index.html",
    "description": "大连商品交易所指定交易日的具体合约的持仓排名",
    "remarks": "单次返回所有合约的持仓排名数据, 返回以合约名字为键, 具体排名数据为值的字典",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20200511\"; 指定交易日, 该数据接口可以获取从 2000 年开始的数据, 20160104 由于交易所数据问题，返回为空可以调用 **futures_dce_position_rank_other** 来返回数据",
        "defaultValue": "20200511",
        "isRequired": false
      },
      {
        "title": "vars_list",
        "name": "vars_list",
        "type": "list",
        "description": "vars_list=cons.contract_symbols; 指定品种，比如：[\"C\", \"CS\"]",
        "isRequired": true
      }
    ],
    "outputParameters": [
      {
        "title": "long_open_interest",
        "name": "long_open_interest",
        "type": "object",
        "description": "持买单量",
        "unit": ""
      },
      {
        "title": "long_open_interest_chg",
        "name": "long_open_interest_chg",
        "type": "float64",
        "description": "持买单量-增减",
        "unit": ""
      },
      {
        "title": "long_party_name",
        "name": "long_party_name",
        "type": "object",
        "description": "会员简称",
        "unit": ""
      },
      {
        "title": "rank",
        "name": "rank",
        "type": "float64",
        "description": "名次",
        "unit": ""
      },
      {
        "title": "short_open_interest",
        "name": "short_open_interest",
        "type": "float64",
        "description": "持卖单量",
        "unit": ""
      },
      {
        "title": "short_open_interest_chg",
        "name": "short_open_interest_chg",
        "type": "float64",
        "description": "持买单量-增减",
        "unit": ""
      },
      {
        "title": "short_party_name",
        "name": "short_party_name",
        "type": "object",
        "description": "会员简称",
        "unit": ""
      },
      {
        "title": "vol",
        "name": "vol",
        "type": "float64",
        "description": "成交量",
        "unit": ""
      },
      {
        "title": "vol_chg",
        "name": "vol_chg",
        "type": "float64",
        "description": "成交量-增减",
        "unit": ""
      },
      {
        "title": "vol_party_name",
        "name": "vol_party_name",
        "type": "object",
        "description": "会员简称",
        "unit": ""
      },
      {
        "title": "symbol",
        "name": "symbol",
        "type": "object",
        "description": "具体合约",
        "unit": ""
      },
      {
        "title": "variety",
        "name": "variety",
        "type": "object",
        "description": "品种",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "广州期货交易所",
    "name": "qh_gzqhjys1",
    "api": "futures_gfex_position_rank",
    "targetUrl": "http://www.gfex.com.cn/gfex/rcjccpm/hqsj_tjsj.shtml",
    "description": "广州期货交易所-日成交持仓排名",
    "remarks": "单次返回所有合约的日成交持仓排名数据, 返回以合约名字为键, 具体排名数据为值的字典",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20231113\"; 指定交易日, 该数据接口可以获取从 20231110 开始的日成交持仓排名数据",
        "defaultValue": "20231113",
        "isRequired": false
      },
      {
        "title": "vars_list",
        "name": "vars_list",
        "type": "list",
        "description": "vars_list=None; 指定品种，比如：['SI', 'LC']",
        "defaultValue": null,
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "rank",
        "name": "rank",
        "type": "int64",
        "description": "名次",
        "unit": ""
      },
      {
        "title": "vol_party_name",
        "name": "vol_party_name",
        "type": "object",
        "description": "会员简称",
        "unit": ""
      },
      {
        "title": "vol",
        "name": "vol",
        "type": "int64",
        "description": "成交量",
        "unit": ""
      },
      {
        "title": "vol_chg",
        "name": "vol_chg",
        "type": "int64",
        "description": "成交量-增减",
        "unit": ""
      },
      {
        "title": "long_party_name",
        "name": "long_party_name",
        "type": "object",
        "description": "会员简称",
        "unit": ""
      },
      {
        "title": "long_open_interest",
        "name": "long_open_interest",
        "type": "int64",
        "description": "持买单量",
        "unit": ""
      },
      {
        "title": "long_open_interest_chg",
        "name": "long_open_interest_chg",
        "type": "int64",
        "description": "持买单量-增减",
        "unit": ""
      },
      {
        "title": "short_party_name",
        "name": "short_party_name",
        "type": "object",
        "description": "会员简称",
        "unit": ""
      },
      {
        "title": "short_open_interest",
        "name": "short_open_interest",
        "type": "int64",
        "description": "持卖单量",
        "unit": ""
      },
      {
        "title": "short_open_interest_chg",
        "name": "short_open_interest_chg",
        "type": "int64",
        "description": "持卖单量-增减",
        "unit": ""
      },
      {
        "title": "symbol",
        "name": "symbol",
        "type": "object",
        "description": "具体合约",
        "unit": ""
      },
      {
        "title": "variety",
        "name": "variety",
        "type": "object",
        "description": "品种",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "仓单日报-郑州商品交易所",
    "name": "qh_cdrb_zzspjys",
    "api": "futures_czce_warehouse_receipt",
    "targetUrl": "http://www.czce.com.cn/cn/jysj/cdrb/H770310index_1.htm",
    "description": "郑州商品交易所-交易数据-仓单日报",
    "remarks": "单次返回当前交易日的所有仓单日报数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20200702\"; 交易日",
        "defaultValue": "20200702",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "键值对字典",
        "name": "jzdzd",
        "type": "dict",
        "description": "键值对, 键为品种代码, 值为 pandas.DataFrame 格式的数据",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "仓单日报-大连商品交易所",
    "name": "qh_cdrb_dlspjys",
    "api": "futures_dce_warehouse_receipt",
    "targetUrl": "http://www.dce.com.cn/dalianshangpin/xqsj/tjsj26/rtj/cdrb/index.html",
    "description": "大连商品交易所-行情数据-统计数据-日统计-仓单日报",
    "remarks": "单次返回当前交易日的所有仓单日报数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20200702\"; 交易日",
        "defaultValue": "20200702",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "键值对字典",
        "name": "jzdzd",
        "type": "dict",
        "description": "键值对, 键为品种代码, 值为 pandas.DataFrame 格式的数据",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "仓单日报-上海期货交易所",
    "name": "qh_cdrb_shqhjys",
    "api": "futures_shfe_warehouse_receipt",
    "targetUrl": "https://tsite.shfe.com.cn/statements/dataview.html?paramid=dailystock&paramdate=20200703",
    "description": "提供上海期货交易所指定交割仓库期货仓单日报",
    "remarks": "单次返回当前交易日的所有仓单日报数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20200702\"; 交易日",
        "defaultValue": "20200702",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "键值对字典",
        "name": "jzdzd",
        "type": "dict",
        "description": "键值对, 键为品种代码, 值为 pandas.DataFrame 格式的数据",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "仓单日报-广州期货交易所",
    "name": "qh_cdrb_gzqhjys",
    "api": "futures_gfex_warehouse_receipt",
    "targetUrl": "http://www.gfex.com.cn/gfex/cdrb/hqsj_tjsj.shtml",
    "description": "广州期货交易所-行情数据-仓单日报",
    "remarks": "单次返回当前交易日的所有仓单日报数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240122\"; 交易日",
        "defaultValue": "20240122",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "键值对字典",
        "name": "jzdzd",
        "type": "dict",
        "description": "键值对, 键为品种代码, 值为 pandas.DataFrame 格式的数据",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "期转现-大商所",
    "name": "qh_qzx_dss",
    "api": "futures_to_spot_dce",
    "targetUrl": "http://www.dce.com.cn/dalianshangpin/xqsj/tjsj26/jgtj/qzxcx/index.html",
    "description": "大连商品交易所-期转现统计数据",
    "remarks": "单次返回指定交易日的期转现统计数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"202312\"; 交易年月",
        "defaultValue": "202312",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "合约代码",
        "name": "hydm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "期转现发生日期",
        "name": "qzxfsrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "期转现数量",
        "name": "qzxsl",
        "type": "int64",
        "description": "注意单位: 手",
        "unit": "手"
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "期转现-郑商所",
    "name": "qh_qzx_zss",
    "api": "futures_to_spot_czce",
    "targetUrl": "http://www.czce.com.cn/cn/jysj/qzxtj/H770311index_1.htm",
    "description": "郑州商品交易所-期转现统计数据",
    "remarks": "单次返回指定交易日的期转现统计数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20210112\"; 交易日",
        "defaultValue": "20210112",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "合约代码",
        "name": "hydm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "合约数量",
        "name": "hysl",
        "type": "int64",
        "description": "注意: 单边计算",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "期转现-上期所",
    "name": "qh_qzx_sqs",
    "api": "futures_to_spot_shfe",
    "targetUrl": "https://tsite.shfe.com.cn/statements/dataview.html?paramid=kx",
    "description": "上海期货交易所-期转现数据",
    "remarks": "单次返回指定交易月份的期转现数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"202312\"; 交易月份",
        "defaultValue": "202312",
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
        "title": "合约",
        "name": "hy",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交割量",
        "name": "jgl",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "期转现量",
        "name": "qzxl",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "交割统计-大商所",
    "name": "qh_jgtj_dss",
    "api": "futures_delivery_dce",
    "targetUrl": "http://www.dce.com.cn/dalianshangpin/xqsj/tjsj26/jgtj/jgsj/index.html",
    "description": "大连商品交易所-交割统计",
    "remarks": "单次返回指定交易月份的交割统计数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"202312\"; 交易月份",
        "defaultValue": "202312",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "品种",
        "name": "pz",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "合约",
        "name": "hy",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交割日期",
        "name": "jgrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交割量",
        "name": "jgl",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "交割金额",
        "name": "jgje",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "交割统计-郑商所",
    "name": "qh_jgtj_zss",
    "api": "futures_delivery_czce",
    "targetUrl": "http://www.czce.com.cn/cn/jysj/ydjgcx/H770316index_1.htm",
    "description": "郑州商品交易所-交割统计",
    "remarks": "单次返回指定交易月份的交割统计数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20210112\"; 交易日",
        "defaultValue": "20210112",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "品种",
        "name": "pz",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交割数量",
        "name": "jgsl",
        "type": "int64",
        "description": "按单边统计",
        "unit": ""
      },
      {
        "title": "交割额",
        "name": "jge",
        "type": "int64",
        "description": "注意单位: 元; 按单边统计",
        "unit": "元"
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "交割统计-上期所",
    "name": "qh_jgtj_sqs",
    "api": "futures_delivery_shfe",
    "targetUrl": "https://tsite.shfe.com.cn/statements/dataview.html?paramid=kx",
    "description": "上海期货交易所-交割统计",
    "remarks": "单次返回指定交易月份的交割统计数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"202312\"; 交易月份",
        "defaultValue": "202312",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "品种",
        "name": "pz",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交割量-本月",
        "name": "jgl_by",
        "type": "int64",
        "description": "注意单位: 手; 交割量单边计算; 交割数据统计期为上月 16 日到本月 15 日",
        "unit": "手"
      },
      {
        "title": "交割量-比重",
        "name": "jgl_bz",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "交割量-本年累计",
        "name": "jgl_bnlj",
        "type": "int64",
        "description": "注意单位: 手; 交割量单边计算; 交割数据统计期为上月 16 日到本月 15 日",
        "unit": "手"
      },
      {
        "title": "交割量-累计同比",
        "name": "jgl_ljtb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "交割配对-大商所",
    "name": "qh_jgpd_dss",
    "api": "futures_delivery_match_dce",
    "targetUrl": "http://www.dce.com.cn/dalianshangpin/xqsj/tjsj26/jgtj/jgsj/index.html",
    "description": "大连商品交易所-交割配对",
    "remarks": "单次返回指定品种的的交割配对数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"a\"; 交易品种",
        "defaultValue": "a",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "合约号",
        "name": "hyh",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "配对日期",
        "name": "pdrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "买会员号",
        "name": "mhyh",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "配对手数",
        "name": "pdss",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "卖会员号",
        "name": "mhyh",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交割结算价",
        "name": "jgjsj",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "交割配对-郑商所",
    "name": "qh_jgpd_zss",
    "api": "futures_delivery_match_czce",
    "targetUrl": "http://www.czce.com.cn/cn/jysj/jgpd/H770308index_1.htm",
    "description": "郑州商品交易所-交割配对",
    "remarks": "单次返回指定品种的的交割配对数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20210106\"; 交易日",
        "defaultValue": "20210106",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "卖方会员",
        "name": "mfhy",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "卖方会员-会员简称",
        "name": "mfhy_hyjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "买方会员",
        "name": "mfhy",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "买方会员-会员简称",
        "name": "mfhy_hyjc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交割量",
        "name": "jgl",
        "type": "float64",
        "description": "注意单位: 手(单边计算)",
        "unit": "手(单边计算)"
      },
      {
        "title": "配对日期",
        "name": "pdrq",
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
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "上海期货交易所",
    "name": "qh_shqhjys1",
    "api": "futures_stock_shfe_js",
    "targetUrl": "https://datacenter.jin10.com/reportType/dc_shfe_weekly_stock",
    "description": "金十财经-上海期货交易所指定交割仓库库存周报",
    "remarks": "单次返回指定 date 的库存周报数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240419\"; 库存周报只在每周的最后一个交易日公布数据",
        "defaultValue": "20240419",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "商品",
        "name": "sp",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "期货总量{随日期变动}",
        "name": "qhzl{srqbd}",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "期货总量{随日期变动}}",
        "name": "qhzl{srqbd}}",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "增减",
        "name": "zj",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "增减幅度",
        "name": "zjfd",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "成交持仓",
    "name": "qh_cjcc",
    "api": "futures_hold_pos_sina",
    "targetUrl": "https://vip.stock.finance.sina.com.cn/q/view/vFutures_Positions_cjcc.php",
    "description": "新浪财经-期货-成交持仓",
    "remarks": "单次返回指定合约的成交持仓数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"成交量\"; choice of {\"成交量\", \"多单持仓\", \"空单持仓\"}",
        "defaultValue": "成交量",
        "choices": [
          "成交量",
          "多单持仓",
          "空单持仓"
        ],
        "isRequired": false
      },
      {
        "title": "contract",
        "name": "contract",
        "type": "str",
        "description": "contract=\"OI2501\"; 只限于商品期货",
        "defaultValue": "OI2501",
        "isRequired": false
      },
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240223\"",
        "defaultValue": "20240223",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "名次",
        "name": "mc",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "会员简称",
        "name": "hyjc",
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
        "title": "比上交易增减",
        "name": "bsjyzj",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "现期图",
    "name": "qh_xqt",
    "api": "futures_spot_sys",
    "targetUrl": "https://www.100ppi.com/sf/792.html",
    "description": "生意社-商品与期货-现期图",
    "remarks": "单次返回指定品种的现期图数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"铜\"; 期货品种",
        "defaultValue": "铜",
        "isRequired": false
      },
      {
        "title": "contract",
        "name": "contract",
        "type": "str",
        "description": "indicator=\"市场价格\"; choice of {\"市场价格\", \"基差率\", \"主力基差\"}",
        "defaultValue": "市场价格",
        "choices": [
          "市场价格",
          "基差率",
          "主力基差"
        ],
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
        "title": "主力基差",
        "name": "zljc",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "上海期货交易所",
    "name": "qh_shqhjys2",
    "api": "futures_contract_info_shfe",
    "targetUrl": "https://tsite.shfe.com.cn/bourseService/businessdata/summaryinquiry/",
    "description": "上海期货交易所-交易所服务-业务数据-交易参数汇总查询",
    "remarks": "单次返回指定 date 的期货合约信息数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240513\"; 交易日",
        "defaultValue": "20240513",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "合约代码",
        "name": "hydm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "上市日",
        "name": "ssr",
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
        "title": "开始交割日",
        "name": "ksjgr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最后交割日",
        "name": "zhjgr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "挂牌基准价",
        "name": "gpjzj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易日",
        "name": "jyr",
        "type": "object",
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
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "上海国际能源交易中心",
    "name": "qh_shgjnyjyzx",
    "api": "futures_contract_info_ine",
    "targetUrl": "https://www.ine.cn/bourseService/summary/?name=currinstrumentprop",
    "description": "上海国际能源交易中心-业务指南-交易参数汇总(期货)",
    "remarks": "单次返回指定 date 的期货合约信息数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20241129\"; 交易日",
        "defaultValue": "20241129",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "合约代码",
        "name": "hydm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "上市日",
        "name": "ssr",
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
        "title": "开始交割日",
        "name": "ksjgr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最后交割日",
        "name": "zhjgr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "挂牌基准价",
        "name": "gpjzj",
        "type": "float64",
        "description": "",
        "unit": ""
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
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "大连商品交易所",
    "name": "qh_dlspjys2",
    "api": "futures_contract_info_dce",
    "targetUrl": "http://www.dce.com.cn/dalianshangpin/ywfw/ywcs/jycs/hyxxcx/index.html",
    "description": "大连商品交易所-业务/服务-业务参数-交易参数-合约信息查询",
    "remarks": "单次返回最近交易日的期货合约信息数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "品种",
        "name": "pz",
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
        "title": "交易单位",
        "name": "jydw",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最小变动价位",
        "name": "zxbdjw",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "开始交易日",
        "name": "ksjyr",
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
        "title": "最后交割日",
        "name": "zhjgr",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "郑州商品交易所",
    "name": "qh_zzspjys",
    "api": "futures_contract_info_czce",
    "targetUrl": "http://www.czce.com.cn/cn/jysj/cksj/H770322index_1.htm",
    "description": "郑州商品交易所-交易数据-参考数据",
    "remarks": "单次返回指定 date 的期货合约信息数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240228\"; 交易日",
        "defaultValue": "20240228",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "产品名称",
        "name": "cpmc",
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
        "title": "产品代码",
        "name": "cpdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "产品类型",
        "name": "cplx",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易所MIC编码",
        "name": "jysMICbm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易场所",
        "name": "jycs",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易时间节假日除外",
        "name": "jysjjjrcw",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易国家ISO编码",
        "name": "jygjISObm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易币种ISO编码",
        "name": "jybzISObm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "结算币种ISO编码",
        "name": "jsbzISObm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "到期时间待国家公布2025年节假日安排后进行调整",
        "name": "dqsjdgjgb2025njjraphjxtz",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "结算方式",
        "name": "jsfs",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "挂牌频率",
        "name": "gppl",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最小变动价位",
        "name": "zxbdjw",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最小变动价值",
        "name": "zxbdjz",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易单位",
        "name": "jydw",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "计量单位",
        "name": "jldw",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最大下单量",
        "name": "zdxdl",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日持仓限额期货公司会员不限仓",
        "name": "rccxeqhgshybxc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "大宗交易最小规模",
        "name": "dzjyzxgm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "是否受CESR监管",
        "name": "sfsCESRjg",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "是否为灵活合约",
        "name": "sfwlhhy",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "上市周期该产品的所有合约月份",
        "name": "sszqgcpdsyhyyf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交割通知日",
        "name": "jgtzr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "第一交易日",
        "name": "dyjyr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最后交易日待国家公布2025年节假日安排后进行调整",
        "name": "zhjyrdgjgb2025njjraphjxtz",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交割结算日",
        "name": "jgjsr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "月份代码",
        "name": "yfdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "年份代码",
        "name": "nfdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "最后交割日",
        "name": "zhjgr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "车（船）板最后交割日",
        "name": "c（c）bzhjgr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "合约交割月份本合约交割月份",
        "name": "hyjgyfbhyjgyf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易保证金率",
        "name": "jybzjl",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌停板",
        "name": "zdtb",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "费用币种ISO编码",
        "name": "fybzISObm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易手续费",
        "name": "jysxf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "手续费收取方式",
        "name": "sxfsqfs",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "交割手续费",
        "name": "jgsxf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "平今仓手续费",
        "name": "pjcsxf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易限额",
        "name": "jyxe",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "广州期货交易所",
    "name": "qh_gzqhjys2",
    "api": "futures_contract_info_gfex",
    "targetUrl": "http://www.gfex.com.cn/gfex/hyxx/ywcs.shtml",
    "description": "广州期货交易所-业务/服务-合约信息",
    "remarks": "单次返回最近交易日的期货合约信息数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "品种",
        "name": "pz",
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
        "title": "交易单位",
        "name": "jydw",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最小变动单位",
        "name": "zxbddw",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "开始交易日",
        "name": "ksjyr",
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
        "title": "最后交割日",
        "name": "zhjgr",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "中国金融期货交易所",
    "name": "qh_zgjrqhjys",
    "api": "futures_contract_info_cffex",
    "targetUrl": "http://www.gfex.com.cn/gfex/hyxx/ywcs.shtml",
    "description": "中国金融期货交易所-数据-交易参数",
    "remarks": "单次返回指定 date 的期货合约信息数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240228\"; 交易日",
        "defaultValue": "20240228",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "合约代码",
        "name": "hydm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "合约月份",
        "name": "hyyf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "挂盘基准价",
        "name": "gpjzj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "上市日",
        "name": "ssr",
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
        "title": "涨停板幅度",
        "name": "ztbfd",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "跌停板幅度",
        "name": "dtbfd",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨停板价位",
        "name": "ztbjw",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "跌停板价位",
        "name": "dtbjw",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "持仓限额",
        "name": "ccxe",
        "type": "int64",
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
        "title": "查询交易日",
        "name": "cxjyr",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "内盘-实时行情数据",
    "name": "qh_np_sshqsj",
    "api": "futures_zh_spot",
    "targetUrl": "https://finance.sina.com.cn/futuremarket/",
    "description": "新浪财经-期货页面的实时行情数据",
    "remarks": "单次返回当日可以订阅的所有期货品种数据",
    "inputParameters": [
      {
        "title": "subscribe_list",
        "name": "subscribe_list",
        "type": "str",
        "description": "需要订阅的合约代码; e.g., 按照示例获取",
        "isRequired": true
      },
      {
        "title": "market",
        "name": "market",
        "type": "str",
        "description": "market=\"CF\"; market=\"CF\": 商品期货, market=\"FF\": 金融期货",
        "defaultValue": "CF",
        "isRequired": false
      },
      {
        "title": "adjust",
        "name": "adjust",
        "type": "str",
        "description": "adjust='0'; adjust='1': 返回合约、交易所和最小变动单位的实时数据, 返回数据会变慢",
        "defaultValue": "0",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "object",
        "description": "品种",
        "unit": ""
      },
      {
        "title": "time",
        "name": "time",
        "type": "object",
        "description": "时间, e.g., 144050表示下午14点40分50秒",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "开盘",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "高",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "低",
        "unit": ""
      },
      {
        "title": "current_price",
        "name": "current_price",
        "type": "float64",
        "description": "当前价格(买价)",
        "unit": ""
      },
      {
        "title": "bid_price",
        "name": "bid_price",
        "type": "float64",
        "description": "买",
        "unit": ""
      },
      {
        "title": "ask_price",
        "name": "ask_price",
        "type": "float64",
        "description": "卖价",
        "unit": ""
      },
      {
        "title": "buy_vol",
        "name": "buy_vol",
        "type": "int64",
        "description": "买量",
        "unit": ""
      },
      {
        "title": "sell_vol",
        "name": "sell_vol",
        "type": "int64",
        "description": "卖量",
        "unit": ""
      },
      {
        "title": "hold",
        "name": "hold",
        "type": "float64",
        "description": "持仓量",
        "unit": ""
      },
      {
        "title": "volume",
        "name": "volume",
        "type": "int64",
        "description": "成交量",
        "unit": ""
      },
      {
        "title": "avg_price",
        "name": "avg_price",
        "type": "float64",
        "description": "均价",
        "unit": ""
      },
      {
        "title": "last_close",
        "name": "last_close",
        "type": "float64",
        "description": "上一个交易日的收盘价",
        "unit": ""
      },
      {
        "title": "last_settle_price",
        "name": "last_settle_price",
        "type": "float64",
        "description": "上一个交易日的结算价",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "内盘-实时行情数据(品种)",
    "name": "qh_np_sshqsj_pz",
    "api": "futures_zh_realtime",
    "targetUrl": "https://vip.stock.finance.sina.com.cn/quotes_service/view/qihuohangqing.html#titlePos_1",
    "description": "新浪财经-期货实时行情数据",
    "remarks": "单次返回指定 symbol 的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"白糖\", 品种名称；可以通过 ak.futures_symbol_mark() 获取所有品种命名表",
        "defaultValue": "白糖",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "object",
        "description": "合约代码",
        "unit": ""
      },
      {
        "title": "exchange",
        "name": "exchange",
        "type": "object",
        "description": "交易所",
        "unit": ""
      },
      {
        "title": "name",
        "name": "name",
        "type": "object",
        "description": "合约中文名称",
        "unit": ""
      },
      {
        "title": "trade",
        "name": "trade",
        "type": "float64",
        "description": "最新价",
        "unit": ""
      },
      {
        "title": "settlement",
        "name": "settlement",
        "type": "float64",
        "description": "动态结算",
        "unit": ""
      },
      {
        "title": "presettlement",
        "name": "presettlement",
        "type": "float64",
        "description": "昨日结算",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "今开",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "最高",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "最低",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "收盘",
        "unit": ""
      },
      {
        "title": "bidprice1",
        "name": "bidprice1",
        "type": "float64",
        "description": "买入",
        "unit": ""
      },
      {
        "title": "askprice1",
        "name": "askprice1",
        "type": "float64",
        "description": "卖出",
        "unit": ""
      },
      {
        "title": "bidvol1",
        "name": "bidvol1",
        "type": "int64",
        "description": "买量",
        "unit": ""
      },
      {
        "title": "askvol1",
        "name": "askvol1",
        "type": "int64",
        "description": "卖量",
        "unit": ""
      },
      {
        "title": "volume",
        "name": "volume",
        "type": "int64",
        "description": "成交量",
        "unit": ""
      },
      {
        "title": "position",
        "name": "position",
        "type": "int64",
        "description": "持仓量",
        "unit": ""
      },
      {
        "title": "ticktime",
        "name": "ticktime",
        "type": "object",
        "description": "时间",
        "unit": ""
      },
      {
        "title": "tradedate",
        "name": "tradedate",
        "type": "object",
        "description": "日期",
        "unit": ""
      },
      {
        "title": "preclose",
        "name": "preclose",
        "type": "float64",
        "description": "前收盘价",
        "unit": ""
      },
      {
        "title": "changepercent",
        "name": "changepercent",
        "type": "float64",
        "description": "涨跌幅",
        "unit": ""
      },
      {
        "title": "bid",
        "name": "bid",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "ask",
        "name": "ask",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "prevsettlement",
        "name": "prevsettlement",
        "type": "float64",
        "description": "前结算价",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "内盘-分时行情数据",
    "name": "qh_np_fshqsj",
    "api": "futures_zh_minute_sina",
    "targetUrl": "http://vip.stock.finance.sina.com.cn/quotes_service/view/qihuohangqing.html#titlePos_3",
    "description": "新浪财经-期货-分时数据",
    "remarks": "单次返回指定 symbol 和 period 的分时数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"IF2008\"; 具体合约(期货品种符号需要大写), 可以通过调用 ak.match_main_contract(symbol=\"cffex\") 接口获取, 或者访问网页获取",
        "defaultValue": "IF2008",
        "isRequired": false
      },
      {
        "title": "period",
        "name": "period",
        "type": "str",
        "description": "period=\"1\"; choice of {\"1\": \"1分钟\", \"5\": \"5分钟\", \"15\": \"15分钟\", \"30\": \"30分钟\", \"60\": \"60分钟\"}",
        "defaultValue": "1",
        "choices": [
          "1: 1分钟",
          "5: 5分钟",
          "15: 15分钟",
          "30: 30分钟",
          "60: 60分钟"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "datetime",
        "name": "datetime",
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
      },
      {
        "title": "hold",
        "name": "hold",
        "type": "int64",
        "description": "持仓量",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "内盘-历史行情数据-东财",
    "name": "qh_np_lshqsj_dc",
    "api": "futures_hist_em",
    "targetUrl": "https://qhweb.eastmoney.com/quote",
    "description": "东方财富网-期货行情-行情数据",
    "remarks": "单次返回指定 symbol 的所有数据; 只能获取当期合约;",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"热卷主连\"; 具体合约可以通过 ak.futures_hist_table_em() 获取所有当期能获取数据的合约表",
        "defaultValue": "热卷主连",
        "isRequired": false
      },
      {
        "title": "period",
        "name": "period",
        "type": "str",
        "description": "period=\"daily\"; choice of {\"daily\", \"weekly\", \"monthly\"}",
        "defaultValue": "daily",
        "choices": [
          "daily",
          "weekly",
          "monthly"
        ],
        "isRequired": false
      },
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"19900101\";",
        "defaultValue": "19900101",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"20500101\";",
        "defaultValue": "20500101",
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
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高",
        "name": "zg",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低",
        "name": "zd",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "收盘",
        "name": "sp",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌",
        "name": "zd",
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
        "title": "成交量",
        "name": "cjl",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "持仓量",
        "name": "ccl",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "内盘-历史行情数据-新浪",
    "name": "qh_np_lshqsj_xl",
    "api": "futures_zh_daily_sina",
    "targetUrl": "https://finance.sina.com.cn/futures/quotes/V2105.shtml",
    "description": "新浪财经-期货-日频数据",
    "remarks": "单次返回指定 symbol 的所有日频数据; 期货连续合约为 品种代码+0，比如螺纹钢连续合约为 RB0;",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"RB0\"; 具体合约可以通过 ak.match_main_contract(symbol=\"shfe\") 获取或者访问网页",
        "defaultValue": "RB0",
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
        "description": "开盘价",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "最高价",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "最低价",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "收盘价",
        "unit": ""
      },
      {
        "title": "volume",
        "name": "volume",
        "type": "int64",
        "description": "成交量",
        "unit": ""
      },
      {
        "title": "hold",
        "name": "hold",
        "type": "int64",
        "description": "持仓量",
        "unit": ""
      },
      {
        "title": "settle",
        "name": "settle",
        "type": "float64",
        "description": "结算价",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "内盘-历史行情数据-交易所",
    "name": "qh_np_lshqsj_jys",
    "api": "get_futures_daily",
    "targetUrl": "",
    "description": "提供各交易所各品种的网站的历史行情数据, 其中 20040625, 20070604, 20081226, 20090119 原网页数据缺失",
    "remarks": "单次返回指定时间段指定交易所的所有期货品种历史数据",
    "inputParameters": [
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"20200701\"",
        "defaultValue": "20200701",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"20200716\"",
        "defaultValue": "20200716",
        "isRequired": false
      },
      {
        "title": "market",
        "name": "market",
        "type": "str",
        "description": "market=\"DCE\"; choice of {\"CFFEX\", \"INE\", \"CZCE\", \"DCE\", \"SHFE\", \"GFEX\"}",
        "defaultValue": "DCE",
        "choices": [
          "CFFEX",
          "INE",
          "CZCE",
          "DCE",
          "SHFE",
          "GFEX"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "合约",
        "unit": ""
      },
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "交易日",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float",
        "description": "开盘价",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float",
        "description": "最高价",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float",
        "description": "最低价",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "str",
        "description": "收盘价",
        "unit": ""
      },
      {
        "title": "volume",
        "name": "volume",
        "type": "str",
        "description": "成交量",
        "unit": ""
      },
      {
        "title": "open_interest",
        "name": "open_interest",
        "type": "str",
        "description": "持仓量",
        "unit": ""
      },
      {
        "title": "turnover",
        "name": "turnover",
        "type": "float",
        "description": "成交额",
        "unit": ""
      },
      {
        "title": "settle",
        "name": "settle",
        "type": "float",
        "description": "结算价",
        "unit": ""
      },
      {
        "title": "pre_settle",
        "name": "pre_settle",
        "type": "float",
        "description": "前结算价",
        "unit": ""
      },
      {
        "title": "variety",
        "name": "variety",
        "type": "str",
        "description": "品种",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "外盘-品种代码表",
    "name": "qh_wp_pzdmb",
    "api": "futures_hq_subscribe_exchange_symbol",
    "targetUrl": "https://finance.sina.com.cn/money/future/hf.html",
    "description": "新浪财经-外盘商品期货品种代码表数据",
    "remarks": "单次返回当前交易日的订阅的所有期货品种的品种代码表数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "code",
        "name": "code",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "外盘-实时行情数据",
    "name": "qh_wp_sshqsj",
    "api": "futures_foreign_commodity_realtime",
    "targetUrl": "https://finance.sina.com.cn/money/future/hf.html",
    "description": "新浪财经-外盘商品期货数据",
    "remarks": "单次返回当前交易日的订阅的所有期货品种的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "list or str",
        "description": "需要订阅的合约代码; 调用 **ak.futures_hq_subscribe_exchange_symbol()** 获取字段及代码对应表",
        "isRequired": true
      }
    ],
    "outputParameters": [
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
        "title": "人民币报价",
        "name": "rmbbj",
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
        "title": "昨日结算价",
        "name": "zrjsj",
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
        "title": "买价",
        "name": "mj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "卖价",
        "name": "mj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "行情时间",
        "name": "hqsj",
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
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "外盘-实时行情数据-东财",
    "name": "qh_wp_sshqsj_dc",
    "api": "futures_global_spot_em",
    "targetUrl": "https://quote.eastmoney.com/center/gridlist.html#futures_global",
    "description": "东方财富网-行情中心-期货市场-国际期货-实时行情数据",
    "remarks": "单次返回所有期货品种的实时行情数据",
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
        "description": "注意单位: %",
        "unit": "%"
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
        "title": "昨结",
        "name": "zj",
        "type": "float64",
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
        "title": "买盘",
        "name": "mp",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "卖盘",
        "name": "mp",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "持仓量",
        "name": "ccl",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "外盘-历史行情数据-东财",
    "name": "qh_wp_lshqsj_dc",
    "api": "futures_global_hist_em",
    "targetUrl": "https://quote.eastmoney.com/globalfuture/HG25J.html",
    "description": "东方财富网-行情中心-期货市场-国际期货-历史行情数据",
    "remarks": "单次返回指定品种的历史数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"HG00Y\"; 品种代码；可以通过 ak.futures_global_spot_em() 来获取所有可获取历史行情数据的品种代码",
        "defaultValue": "HG00Y",
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
        "title": "开盘",
        "name": "kp",
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
        "title": "总量",
        "name": "zl",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨幅",
        "name": "zf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "持仓",
        "name": "cc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "日增",
        "name": "rz",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "外盘-历史行情数据-新浪",
    "name": "qh_wp_lshqsj_xl",
    "api": "futures_foreign_hist",
    "targetUrl": "https://finance.sina.com.cn/futuremarket/",
    "description": "新浪财经-期货外盘历史行情数据",
    "remarks": "单次返回指定品种的历史数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"ZSD\"; 外盘期货的 **symbol** 可以通过 **ak.hf_subscribe_exchange_symbol()** 获取",
        "defaultValue": "ZSD",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "交易日",
        "unit": ""
      },
      {
        "title": "open",
        "name": "open",
        "type": "float64",
        "description": "开盘价",
        "unit": ""
      },
      {
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "最高价",
        "unit": ""
      },
      {
        "title": "low",
        "name": "low",
        "type": "float64",
        "description": "最低价",
        "unit": ""
      },
      {
        "title": "close",
        "name": "close",
        "type": "float64",
        "description": "收盘价",
        "unit": ""
      },
      {
        "title": "volume",
        "name": "volume",
        "type": "int64",
        "description": "成交量",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "外盘-合约详情",
    "name": "qh_wp_hyxq",
    "api": "futures_foreign_detail",
    "targetUrl": "https://finance.sina.com.cn/futuremarket/",
    "description": "新浪财经-期货外盘期货合约详情",
    "remarks": "单次返回指定品种的合约详情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"ZSD\"; 外盘期货的 **symbol** 可以通过 **hf_subscribe_exchange_symbol** 获取",
        "defaultValue": "ZSD",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "交易品种",
        "name": "jypz",
        "type": "str",
        "description": "",
        "unit": ""
      },
      {
        "title": "最小变动价位",
        "name": "zxbdjw",
        "type": "str",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易时间",
        "name": "jysj",
        "type": "str",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易代码",
        "name": "jydm",
        "type": "str",
        "description": "",
        "unit": ""
      },
      {
        "title": "交易单位",
        "name": "jydw",
        "type": "str",
        "description": "",
        "unit": ""
      },
      {
        "title": "涨跌停板幅度",
        "name": "zdtbfd",
        "type": "str",
        "description": "",
        "unit": ""
      },
      {
        "title": "交割品级",
        "name": "jgpj",
        "type": "str",
        "description": "",
        "unit": ""
      },
      {
        "title": "上市交易所",
        "name": "ssjys",
        "type": "str",
        "description": "",
        "unit": ""
      },
      {
        "title": "报价单位",
        "name": "bjdw",
        "type": "str",
        "description": "",
        "unit": ""
      },
      {
        "title": "合约交割月份",
        "name": "hyjgyf",
        "type": "str",
        "description": "",
        "unit": ""
      },
      {
        "title": "交割地点",
        "name": "jgdd",
        "type": "str",
        "description": "",
        "unit": ""
      },
      {
        "title": "附加信息",
        "name": "fjxx",
        "type": "str",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "新加坡交易所期货",
    "name": "qh_xjpjysqh",
    "api": "futures_settlement_price_sgx",
    "targetUrl": "https://www.sgx.com/zh-hans/research-education/derivatives",
    "description": "新加坡交易所-衍生品-历史数据-历史结算价格; 数据于下个工作日新加坡时间下午 2 点起提供",
    "remarks": "单次获取指定交易日前一日的所有期货品种的结算价数据; 只能获取过去 60 个交易日内的数据; 由于国内网络限制, 请使用代理访问",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20231107\"; 交易日",
        "defaultValue": "20231107",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "DATE",
        "name": "DATE",
        "type": "int64",
        "description": "日期",
        "unit": ""
      },
      {
        "title": "COM",
        "name": "COM",
        "type": "object",
        "description": "品种代码",
        "unit": ""
      },
      {
        "title": "COM_MM",
        "name": "COM_MM",
        "type": "int64",
        "description": "品种到期月份",
        "unit": ""
      },
      {
        "title": "COM_YY",
        "name": "COM_YY",
        "type": "int64",
        "description": "品种年份",
        "unit": ""
      },
      {
        "title": "OPEN",
        "name": "OPEN",
        "type": "float64",
        "description": "开盘价",
        "unit": ""
      },
      {
        "title": "HIGH",
        "name": "HIGH",
        "type": "float64",
        "description": "最高价",
        "unit": ""
      },
      {
        "title": "LOW",
        "name": "LOW",
        "type": "float64",
        "description": "最低价",
        "unit": ""
      },
      {
        "title": "CLOSE",
        "name": "CLOSE",
        "type": "float64",
        "description": "收盘价",
        "unit": ""
      },
      {
        "title": "SETTLE",
        "name": "SETTLE",
        "type": "float64",
        "description": "结算价",
        "unit": ""
      },
      {
        "title": "VOLUME",
        "name": "VOLUME",
        "type": "int64",
        "description": "交易量",
        "unit": ""
      },
      {
        "title": "OINT",
        "name": "OINT",
        "type": "int64",
        "description": "未平仓合约",
        "unit": ""
      },
      {
        "title": "SERIES",
        "name": "SERIES",
        "type": "object",
        "description": "合约代码",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "期货连续合约",
    "name": "qh_qhlxhy",
    "api": "futures_main_sina",
    "targetUrl": "https://vip.stock.finance.sina.com.cn/quotes_service/view/qihuohangqing.html#titlePos_0",
    "description": "新浪财经-期货-主力连续合约历史数据",
    "remarks": "单次返回单个期货品种的主力连续合约的日频历史数据",
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
        "title": "开盘价",
        "name": "kpj",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最高价",
        "name": "zgj",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "最低价",
        "name": "zdj",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "收盘价",
        "name": "spj",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交量",
        "name": "cjl",
        "type": "int64",
        "description": "注意单位",
        "unit": ""
      },
      {
        "title": "持仓量",
        "name": "ccl",
        "type": "int64",
        "description": "注意单位",
        "unit": ""
      },
      {
        "title": "动态结算价",
        "name": "dtjsj",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "期货合约详情",
    "name": "qh_qhhyxq",
    "api": "futures_contract_detail",
    "targetUrl": "https://finance.sina.com.cn/futures/quotes/V2101.shtml",
    "description": "新浪财经-期货-期货合约详情数据",
    "remarks": "单次返回指定 symbol 的合约详情数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "item",
        "name": "item",
        "type": "object",
        "description": "合约具体的项目",
        "unit": ""
      },
      {
        "title": "value",
        "name": "value",
        "type": "object",
        "description": "合约具体的项目值",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "中证商品指数",
    "name": "qh_zzspzs",
    "api": "futures_index_ccidx",
    "targetUrl": "http://www.ccidx.com/index.html",
    "description": "中证商品指数",
    "remarks": "单次返回指定 symbol 的指数日频率数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"中证商品期货指数\"; choice of {\"中证商品期货指数\", \"中证商品期货价格指数\", }",
        "defaultValue": "中证商品期货指数",
        "choices": [
          "中证商品期货指数",
          "中证商品期货价格指数",
          ""
        ],
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
        "title": "指数代码",
        "name": "zsdm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "收盘点位",
        "name": "spdw",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "结算点位",
        "name": "jsdw",
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
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "中证商品指数-分时",
    "name": "qh_zzspzs_fs",
    "api": "futures_index_min_ccidx",
    "targetUrl": "http://www.ccidx.com/index.html",
    "description": "中证商品指数-分时数据",
    "remarks": "单次返回指定 symbol 的指数分时数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"中证监控油脂油料期货指数\"; choice of {\"中证商品期货指数\", \"中证商品期货价格指数\", \"中证监控油脂油料期货指数\", \"中证监控软商品期货指数\", \"中证监控能化期货指数\", \"中证监控钢铁期货指数\"}",
        "defaultValue": "中证监控油脂油料期货指数",
        "choices": [
          "中证商品期货指数",
          "中证商品期货价格指数",
          "中证监控油脂油料期货指数",
          "中证监控软商品期货指数",
          "中证监控能化期货指数",
          "中证监控钢铁期货指数"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "value",
        "name": "value",
        "type": "object",
        "description": "最新价",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "现货与股票",
    "name": "qh_xhygp",
    "api": "futures_spot_stock",
    "targetUrl": "https://data.eastmoney.com/ifdata/xhgp.html",
    "description": "东方财富网-数据中心-现货与股票",
    "remarks": "单次返回指定 indicator 的所有数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"能源\"; choice of {'能源', '化工', '塑料', '纺织', '有色', '钢铁', '建材', '农副'}",
        "defaultValue": "能源",
        "choices": [
          "能源",
          "化工",
          "塑料",
          "纺织",
          "有色",
          "钢铁",
          "建材",
          "农副"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "商品名称",
        "name": "spmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "近5月",
        "name": "j5y",
        "type": "float64",
        "description": "注意: 具体的日期",
        "unit": ""
      },
      {
        "title": "近4月",
        "name": "j4y",
        "type": "float64",
        "description": "注意: 具体的日期",
        "unit": ""
      },
      {
        "title": "近3月",
        "name": "j3y",
        "type": "float64",
        "description": "注意: 具体的日期",
        "unit": ""
      },
      {
        "title": "近2月",
        "name": "j2y",
        "type": "float64",
        "description": "注意: 具体的日期",
        "unit": ""
      },
      {
        "title": "近1月",
        "name": "j1y",
        "type": "float64",
        "description": "注意: 具体的日期",
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
        "title": "近半年涨跌幅",
        "name": "jbnzdf",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "生产商",
        "name": "scs",
        "type": "object",
        "description": "注意: 字符串组成",
        "unit": ""
      },
      {
        "title": "下游用户",
        "name": "xyyh",
        "type": "object",
        "description": "注意: 字符串组成",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "COMEX 库存数据",
    "name": "qh_comex_kcsj",
    "api": "futures_comex_inventory",
    "targetUrl": "https://data.eastmoney.com/pmetal/comex/by.html",
    "description": "东方财富网-数据中心-期货期权-COMEX 库存数据",
    "remarks": "单次返回指定 symbol 的所有历史数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"黄金\"; choice of {\"黄金\", \"白银\"}",
        "defaultValue": "黄金",
        "choices": [
          "黄金",
          "白银"
        ],
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
        "title": "日期",
        "name": "rq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "COMEX{symbol}库存量-吨",
        "name": "COMEX{symbol}kcl_d",
        "type": "float64",
        "description": "注意单位: 盎司",
        "unit": "盎司"
      },
      {
        "title": "COMEX{symbol}库存量-盎司",
        "name": "COMEX{symbol}kcl_as",
        "type": "float64",
        "description": "注意单位: 吨",
        "unit": "吨"
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "核心数据",
    "name": "qh_hxsj",
    "api": "futures_hog_core",
    "targetUrl": "https://zhujia.zhuwang.com.cn",
    "description": "玄田数据-核心数据",
    "remarks": "单次返回指定 symbol 的所有历史数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"外三元\"; choice of {\"外三元\", \"内三元\", \"土杂猪\"}",
        "defaultValue": "外三元",
        "choices": [
          "外三元",
          "内三元",
          "土杂猪"
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
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "成本维度",
    "name": "qh_cbwd",
    "api": "futures_hog_cost",
    "targetUrl": "https://zhujia.zhuwang.com.cn",
    "description": "玄田数据-成本维度",
    "remarks": "单次返回指定 symbol 的所有历史数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"玉米\"; choice of {\"玉米\", \"豆粕\", \"二元母猪价格\", \"仔猪价格\"}",
        "defaultValue": "玉米",
        "choices": [
          "玉米",
          "豆粕",
          "二元母猪价格",
          "仔猪价格"
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
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "供应维度",
    "name": "qh_gywd",
    "api": "futures_hog_supply",
    "targetUrl": "https://zhujia.zhuwang.com.cn",
    "description": "玄田数据-供应维度",
    "remarks": "单次返回指定 symbol 的所有历史数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"玉米\"; choice of {\"猪肉批发价\", \"储备冻猪肉\", \"饲料原料数据\", \"白条肉\", \"生猪产能\", \"育肥猪\", \"肉类价格指数\", \"猪粮比价\"}",
        "defaultValue": "玉米",
        "choices": [
          "猪肉批发价",
          "储备冻猪肉",
          "饲料原料数据",
          "白条肉",
          "生猪产能",
          "育肥猪",
          "肉类价格指数",
          "猪粮比价"
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
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "生猪市场价格指数",
    "name": "qh_szscjgzs",
    "api": "index_hog_spot_price",
    "targetUrl": "https://hqb.nxin.com/pigindex/index.shtml",
    "description": "行情宝-生猪市场价格指数",
    "remarks": "单次返回所有数据",
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
        "title": "指数",
        "name": "zs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "4个月均线",
        "name": "4gyjx",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "6个月均线",
        "name": "6gyjx",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "12个月均线",
        "name": "12gyjx",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "预售均价",
        "name": "ysjj",
        "type": "float64",
        "description": "注意单位: 元/公斤",
        "unit": "元/公斤"
      },
      {
        "title": "成交均价",
        "name": "cjjj",
        "type": "float64",
        "description": "注意单位: 元/公斤",
        "unit": "元/公斤"
      },
      {
        "title": "成交均重",
        "name": "cjjz",
        "type": "int64",
        "description": "注意单位: kg",
        "unit": "kg"
      }
    ]
  },
  {
    "moduleTitle": "期货数据",
    "moduleName": "futures",
    "title": "期货资讯",
    "name": "qh_qhzx",
    "api": "futures_news_shmet",
    "targetUrl": "https://www.shmet.com/newsFlash/newsFlash.html?searchKeyword=",
    "description": "上海金属网-快讯",
    "remarks": "指定 symbol 的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"全部\"; choice of {\"全部\", \"要闻\", \"VIP\", \"财经\", \"铜\", \"铝\", \"铅\", \"锌\", \"镍\", \"锡\", \"贵金属\", \"小金属\"}",
        "defaultValue": "全部",
        "choices": [
          "全部",
          "要闻",
          "VIP",
          "财经",
          "铜",
          "铝",
          "铅",
          "锌",
          "镍",
          "锡",
          "贵金属",
          "小金属"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "发布时间",
        "name": "fbsj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "内容",
        "name": "nr",
        "type": "object",
        "description": "",
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
  return futuresInterfaces.find(item => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return futuresInterfaces.find(item => item.name === name);
}

export default futuresInterfaces;
