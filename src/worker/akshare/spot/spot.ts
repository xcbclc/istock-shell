/**
 * @fileoverview spot AKShare接口定义
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
 * spot接口数据
 */
export const spotInterfaces: ApiInterface[] = [
  {
    "moduleTitle": "现货数据",
    "moduleName": "spot",
    "title": "99 现货走势",
    "name": "xh_99_xhzs",
    "api": "spot_price_qh",
    "targetUrl": "https://www.99qh.com/data/spotTrend",
    "description": "99 期货-数据-期现-现货走势",
    "remarks": "单次返回指定 symbol 的所有历史数据；由于数据源限制，只能获取个别品种",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"螺纹钢\"; 可以通过 ak.spot_price_table_qh() 获取品种表",
        "defaultValue": "螺纹钢",
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
        "title": "期货收盘价",
        "name": "qhspj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "现货价格",
        "name": "xhjg",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "现货数据",
    "moduleName": "spot",
    "title": "历史行情数据",
    "name": "xh_lshqsj",
    "api": "spot_hist_sge",
    "targetUrl": "https://www.sge.com.cn/sjzx/mrhq",
    "description": "上海黄金交易所-数据资讯-行情走势-历史数据",
    "remarks": "单次返回指定 symbol 的所有历史数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"Au99.99\"; 可以通过 ak.spot_symbol_table_sge() 获取品种表",
        "defaultValue": "Au99.99",
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
        "title": "close",
        "name": "close",
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
        "title": "high",
        "name": "high",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "现货数据",
    "moduleName": "spot",
    "title": "实时行情数据",
    "name": "xh_sshqsj",
    "api": "spot_quotations_sge",
    "targetUrl": "https://www.sge.com.cn/",
    "description": "上海黄金交易所-数据资讯-行情走势-实时数据",
    "remarks": "单次返回指定 symbol 的所有行情数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"Au99.99\"; 可以通过 ak.spot_symbol_table_sge() 获取品种表",
        "defaultValue": "Au99.99",
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
        "title": "时间",
        "name": "sj",
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
        "title": "更新时间",
        "name": "gxsj",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "现货数据",
    "moduleName": "spot",
    "title": "上海金基准价",
    "name": "xh_shjjzj",
    "api": "spot_golden_benchmark_sge",
    "targetUrl": "https://www.sge.com.cn/sjzx/jzj",
    "description": "上海黄金交易所-数据资讯-上海金基准价-历史数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "交易时间",
        "name": "jysj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "晚盘价",
        "name": "wpj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "早盘价",
        "name": "zpj",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "现货数据",
    "moduleName": "spot",
    "title": "上海银基准价",
    "name": "xh_shyjzj",
    "api": "spot_silver_benchmark_sge",
    "targetUrl": "https://www.sge.com.cn/sjzx/shyjzj",
    "description": "上海黄金交易所-数据资讯-上海银基准价-历史数据",
    "remarks": "单次返回所有历史数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "交易时间",
        "name": "jysj",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "晚盘价",
        "name": "wpj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "早盘价",
        "name": "zpj",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "现货数据",
    "moduleName": "spot",
    "title": "各省均价实时排行榜",
    "name": "xh_gsjjsspxb",
    "api": "spot_hog_soozhu",
    "targetUrl": "https://www.soozhu.com/price/data/center/",
    "description": "搜猪-生猪大数据-各省均价实时排行榜",
    "remarks": "单次返回所有实时数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "省份",
        "name": "sf",
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
        "title": "涨跌幅",
        "name": "zdf",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "现货数据",
    "moduleName": "spot",
    "title": "今年以来全国出栏均价走势",
    "name": "xh_jnylqgcljjzs",
    "api": "spot_hog_year_trend_soozhu",
    "targetUrl": "https://www.soozhu.com/price/data/center/",
    "description": "搜猪-生猪大数据-今年以来全国出栏均价走势",
    "remarks": "单次返回近一年所有历史数据",
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
        "title": "价格",
        "name": "jg",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "现货数据",
    "moduleName": "spot",
    "title": "全国瘦肉型肉猪",
    "name": "xh_qgsrxrz",
    "api": "spot_hog_lean_price_soozhu",
    "targetUrl": "https://www.soozhu.com/price/data/center/",
    "description": "搜猪-生猪大数据-全国瘦肉型肉猪",
    "remarks": "单次返回近半个月的历史数据",
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
        "title": "价格",
        "name": "jg",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "现货数据",
    "moduleName": "spot",
    "title": "全国三元仔猪",
    "name": "xh_qgsyzz",
    "api": "spot_hog_three_way_soozhu",
    "targetUrl": "https://www.soozhu.com/price/data/center/",
    "description": "搜猪-生猪大数据-全国三元仔猪",
    "remarks": "单次返回近半个月的历史数据",
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
        "title": "价格",
        "name": "jg",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "现货数据",
    "moduleName": "spot",
    "title": "全国后备二元母猪",
    "name": "xh_qghbeymz",
    "api": "spot_hog_crossbred_soozhu",
    "targetUrl": "https://www.soozhu.com/price/data/center/",
    "description": "搜猪-生猪大数据-全国后备二元母猪",
    "remarks": "单次返回近半个月的历史数据",
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
        "title": "价格",
        "name": "jg",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "现货数据",
    "moduleName": "spot",
    "title": "全国玉米价格走势",
    "name": "xh_qgymjgzs",
    "api": "spot_corn_price_soozhu",
    "targetUrl": "https://www.soozhu.com/price/data/center/",
    "description": "搜猪-生猪大数据-全国玉米价格走势",
    "remarks": "单次返回近半个月的历史数据",
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
        "title": "价格",
        "name": "jg",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "现货数据",
    "moduleName": "spot",
    "title": "全国豆粕价格走势",
    "name": "xh_qgdpjgzs",
    "api": "spot_soybean_price_soozhu",
    "targetUrl": "https://www.soozhu.com/price/data/center/",
    "description": "搜猪-生猪大数据-全国豆粕价格走势",
    "remarks": "单次返回近半个月的历史数据",
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
        "title": "价格",
        "name": "jg",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "现货数据",
    "moduleName": "spot",
    "title": "全国育肥猪合料（含自配料）半月走势",
    "name": "xh_qgyfzhl（hzpl）byzs",
    "api": "spot_mixed_feed_soozhu",
    "targetUrl": "https://www.soozhu.com/price/data/center/",
    "description": "搜猪-生猪大数据-全国育肥猪合料（含自配料）半月走势",
    "remarks": "单次返回近半个月的历史数据",
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
        "title": "价格",
        "name": "jg",
        "type": "float64",
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
  return spotInterfaces.find(item => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return spotInterfaces.find(item => item.name === name);
}

export default spotInterfaces;
