/**
 * @fileoverview others AKShare接口定义
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
 * others接口数据
 */
export const othersInterfaces: ApiInterface[] = [
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "乘联会-统计数据-总体市场",
    "name": "clh_tjsj_ztsc",
    "api": "car_market_total_cpca",
    "targetUrl": "http://data.cpcadata.com/TotalMarket",
    "description": "乘联会-统计数据-总体市场",
    "remarks": "单次返回指定 symbol 和 indicator 的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"狭义乘用车\"; choice of {\"狭义乘用车\", \"广义乘用车\"}",
        "defaultValue": "狭义乘用车",
        "choices": [
          "狭义乘用车",
          "广义乘用车"
        ],
        "isRequired": false
      },
      {
        "title": "indicator",
        "name": "indicator",
        "type": "str",
        "description": "indicator=\"产量\"; choice of {\"产量\", \"批发\", \"零售\", \"出口\"}",
        "defaultValue": "产量",
        "choices": [
          "产量",
          "批发",
          "零售",
          "出口"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "{前一个年份}年",
        "name": "{qygnf}n",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      },
      {
        "title": "{当前年份}年",
        "name": "{dqnf}n",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "乘联会-统计数据-厂商排名",
    "name": "clh_tjsj_cspm",
    "api": "car_market_man_rank_cpca",
    "targetUrl": "http://data.cpcadata.com/ManRank",
    "description": "乘联会-统计数据-厂商排名",
    "remarks": "单次返回指定 symbol 和 indicator 的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"狭义乘用车-单月\"; choice of {\"狭义乘用车-单月\", \"狭义乘用车-累计\", \"广义乘用车-单月\", \"广义乘用车-累计\"}",
        "defaultValue": "狭义乘用车-单月",
        "choices": [
          "狭义乘用车-单月",
          "狭义乘用车-累计",
          "广义乘用车-单月",
          "广义乘用车-累计"
        ],
        "isRequired": false
      },
      {
        "title": "indicator",
        "name": "indicator",
        "type": "str",
        "description": "indicator=\"批发\"; choice of {\"批发\", \"零售\"}",
        "defaultValue": "批发",
        "choices": [
          "批发",
          "零售"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "{前一个年份}年",
        "name": "{qygnf}n",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      },
      {
        "title": "{当前年份}年",
        "name": "{dqnf}n",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "乘联会-统计数据-车型大类",
    "name": "clh_tjsj_cxdl",
    "api": "car_market_cate_cpca",
    "targetUrl": "http://data.cpcadata.com/CategoryMarket",
    "description": "乘联会-统计数据-车型大类",
    "remarks": "单次返回指定 symbol 和 indicator 的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"轿车\"; choice of {\"轿车\", \"MPV\", \"SUV\", \"占比\"}",
        "defaultValue": "轿车",
        "choices": [
          "轿车",
          "MPV",
          "SUV",
          "占比"
        ],
        "isRequired": false
      },
      {
        "title": "indicator",
        "name": "indicator",
        "type": "str",
        "description": "indicator=\"批发\"; choice of {\"批发\", \"零售\"}",
        "defaultValue": "批发",
        "choices": [
          "批发",
          "零售"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "{前一个年份}年",
        "name": "{qygnf}n",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      },
      {
        "title": "{当前年份}年",
        "name": "{dqnf}n",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "乘联会-统计数据-国别细分市场",
    "name": "clh_tjsj_gbxfsc",
    "api": "car_market_country_cpca",
    "targetUrl": "http://data.cpcadata.com/CountryMarket",
    "description": "乘联会-统计数据-国别细分市场",
    "remarks": "单次返回指定 symbol 和 indicator 的数据",
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
        "title": "自主",
        "name": "zz",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      },
      {
        "title": "德系",
        "name": "dx",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      },
      {
        "title": "日系",
        "name": "rx",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      },
      {
        "title": "法系",
        "name": "fx",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      },
      {
        "title": "美系",
        "name": "mx",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      },
      {
        "title": "韩系",
        "name": "hx",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      },
      {
        "title": "其他欧系",
        "name": "qtox",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "乘联会-统计数据-级别细分市场",
    "name": "clh_tjsj_jbxfsc",
    "api": "car_market_segment_cpca",
    "targetUrl": "http://data.cpcadata.com/SegmentMarket",
    "description": "乘联会-统计数据-级别细分市场",
    "remarks": "单次返回指定 symbol 的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"轿车\"; choice of {\"轿车\", \"MPV\", \"SUV\"}",
        "defaultValue": "轿车",
        "choices": [
          "轿车",
          "MPV",
          "SUV"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "A00",
        "name": "A00",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      },
      {
        "title": "A0",
        "name": "A0",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      },
      {
        "title": "A",
        "name": "A",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      },
      {
        "title": "B",
        "name": "B",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      },
      {
        "title": "C",
        "name": "C",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "乘联会-统计数据-新能源细分市场",
    "name": "clh_tjsj_xnyxfsc",
    "api": "car_market_fuel_cpca",
    "targetUrl": "http://data.cpcadata.com/FuelMarket",
    "description": "乘联会-统计数据-车型大类",
    "remarks": "单次返回指定 symbol 的数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"整体市场\"; choice of {\"整体市场\", \"销量占比-PHEV-BEV\", \"销量占比-ICE-NEV\"}",
        "defaultValue": "整体市场",
        "choices": [
          "整体市场",
          "销量占比-PHEV-BEV",
          "销量占比-ICE-NEV"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "月份",
        "name": "yf",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "{前一个年份}年",
        "name": "{qygnf}n",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      },
      {
        "title": "{当前年份}年",
        "name": "{dqnf}n",
        "type": "float64",
        "description": "注意单位: 万辆",
        "unit": "万辆"
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "盖世研究院",
    "name": "gsyjy",
    "api": "car_sale_rank_gasgoo",
    "targetUrl": "https://i.gasgoo.com/data/ranking",
    "description": "盖世汽车资讯的汽车销量排行榜数据",
    "remarks": "单次返回指定 symbol 和 date 的汽车销量排行榜数据",
    "inputParameters": [
      {
        "title": "symbol",
        "name": "symbol",
        "type": "str",
        "description": "symbol=\"车型榜\"; choice of {\"车企榜\", \"品牌榜\", \"车型榜\"}",
        "defaultValue": "车型榜",
        "choices": [
          "车企榜",
          "品牌榜",
          "车型榜"
        ],
        "isRequired": false
      },
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"202104\"; 指定到月份即可",
        "defaultValue": "202104",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "厂商",
        "name": "cs",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "{当前年份}-{当前月份}",
        "name": "{dqnf}_{dqyf}",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "{当前月份}月同比",
        "name": "{dqyf}ytb",
        "type": "object",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "{当前月份}月环比",
        "name": "{dqyf}yhb",
        "type": "object",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "{年份}-1到{当前年份}",
        "name": "{nf}_1d{dqnf}",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "{前一年年份}-1到{当前年份}",
        "name": "{qynnf}_1d{dqnf}",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "{前二年年份}-1到{当前年份}",
        "name": "{qennf}_1d{dqnf}",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "新闻联播文字稿",
    "name": "xwlbwzg",
    "api": "news_cctv",
    "targetUrl": "https://tv.cctv.com/lm/xwlb",
    "description": "新闻联播文字稿, 数据区间从 20160330-至今",
    "remarks": "单次返回指定日期新闻联播文字稿数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240424\"; 20160330-至今",
        "defaultValue": "20240424",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "新闻日期",
        "unit": ""
      },
      {
        "title": "title",
        "name": "title",
        "type": "object",
        "description": "新闻标题",
        "unit": ""
      },
      {
        "title": "content",
        "name": "content",
        "type": "object",
        "description": "新闻内容",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "日出和日落-天",
    "name": "rchrl_t",
    "api": "sunrise_daily",
    "targetUrl": "https://www.timeanddate.com/sun/china/",
    "description": "中国各大城市-日出和日落时间, 数据区间从 19990101-至今, 推荐使用代理访问",
    "remarks": "单次返回指定日期和指定城市的数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240428\"",
        "defaultValue": "20240428",
        "isRequired": false
      },
      {
        "title": "city",
        "name": "city",
        "type": "str",
        "description": "city=\"beijing\"; 注意输入的城市的拼音",
        "defaultValue": "beijing",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "日期",
        "unit": ""
      },
      {
        "title": "Sunrise",
        "name": "Sunrise",
        "type": "object",
        "description": "日出",
        "unit": ""
      },
      {
        "title": "Sunset",
        "name": "Sunset",
        "type": "object",
        "description": "日落",
        "unit": ""
      },
      {
        "title": "Length",
        "name": "Length",
        "type": "object",
        "description": "Daylength-Length",
        "unit": ""
      },
      {
        "title": "Difference",
        "name": "Difference",
        "type": "object",
        "description": "Daylength-Difference",
        "unit": ""
      },
      {
        "title": "Start",
        "name": "Start",
        "type": "object",
        "description": "Astronomical Twilight-Start",
        "unit": ""
      },
      {
        "title": "End",
        "name": "End",
        "type": "object",
        "description": "Astronomical Twilight-End",
        "unit": ""
      },
      {
        "title": "Start.1",
        "name": "Start.1",
        "type": "object",
        "description": "Nautical Twilight-Start",
        "unit": ""
      },
      {
        "title": "End.1",
        "name": "End.1",
        "type": "object",
        "description": "Nautical Twilight-End",
        "unit": ""
      },
      {
        "title": "Start.2",
        "name": "Start.2",
        "type": "object",
        "description": "Civil Twilight-Start",
        "unit": ""
      },
      {
        "title": "End.2",
        "name": "End.2",
        "type": "object",
        "description": "Civil Twilight-End",
        "unit": ""
      },
      {
        "title": "Time",
        "name": "Time",
        "type": "object",
        "description": "Solar Noon-Time",
        "unit": ""
      },
      {
        "title": "Mil. km",
        "name": "Mil._km",
        "type": "object",
        "description": "Solar Noon-Mil. km",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "日出和日落-月",
    "name": "rchrl_y",
    "api": "sunrise_monthly",
    "targetUrl": "https://www.timeanddate.com/sun/china/",
    "description": "中国各大城市-日出和日落时间, 数据区间从 19990101-至今, 推荐使用代理访问",
    "remarks": "单次返回指定日期所在月份每天的数据, 如果是未来日期则为预测值",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240428\"",
        "defaultValue": "20240428",
        "isRequired": false
      },
      {
        "title": "city",
        "name": "city",
        "type": "str",
        "description": "city=\"beijing\"; 注意输入的城市的拼音",
        "defaultValue": "beijing",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "object",
        "description": "日期-索引; XXXX-XX 格式",
        "unit": ""
      },
      {
        "title": "feb",
        "name": "feb",
        "type": "object",
        "description": "月份简称-随月份变化",
        "unit": ""
      },
      {
        "title": "Sunrise",
        "name": "Sunrise",
        "type": "object",
        "description": "日出",
        "unit": ""
      },
      {
        "title": "Sunset",
        "name": "Sunset",
        "type": "object",
        "description": "日落",
        "unit": ""
      },
      {
        "title": "Length",
        "name": "Length",
        "type": "object",
        "description": "Daylength-Length",
        "unit": ""
      },
      {
        "title": "Difference",
        "name": "Difference",
        "type": "object",
        "description": "Daylength-Difference",
        "unit": ""
      },
      {
        "title": "Start",
        "name": "Start",
        "type": "object",
        "description": "Astronomical Twilight-Start",
        "unit": ""
      },
      {
        "title": "End",
        "name": "End",
        "type": "object",
        "description": "Astronomical Twilight-End",
        "unit": ""
      },
      {
        "title": "Start.1",
        "name": "Start.1",
        "type": "object",
        "description": "Nautical Twilight-Start",
        "unit": ""
      },
      {
        "title": "End.1",
        "name": "End.1",
        "type": "object",
        "description": "Nautical Twilight-End",
        "unit": ""
      },
      {
        "title": "Start.2",
        "name": "Start.2",
        "type": "object",
        "description": "Civil Twilight-Start",
        "unit": ""
      },
      {
        "title": "End.2",
        "name": "End.2",
        "type": "object",
        "description": "Civil Twilight-End",
        "unit": ""
      },
      {
        "title": "Time",
        "name": "Time",
        "type": "object",
        "description": "Solar Noon-Time",
        "unit": ""
      },
      {
        "title": "Mil. km",
        "name": "Mil._km",
        "type": "object",
        "description": "Solar Noon-Mil. km",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "近期空气质量",
    "name": "jqkqzl",
    "api": "air_quality_hebei",
    "targetUrl": "http://218.11.10.130:8080/#/application/home",
    "description": "河北省实时空气质量数据",
    "remarks": "单次返回所有城市数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "城市",
        "name": "cs",
        "type": "object",
        "description": "城市名称",
        "unit": ""
      },
      {
        "title": "区域",
        "name": "qy",
        "type": "object",
        "description": "城市下属行政区域",
        "unit": ""
      },
      {
        "title": "监测点",
        "name": "jcd",
        "type": "object",
        "description": "监测站点名称",
        "unit": ""
      },
      {
        "title": "时间",
        "name": "sj",
        "type": "object",
        "description": "监测时间",
        "unit": ""
      },
      {
        "title": "AQI",
        "name": "AQI",
        "type": "float64",
        "description": "空气质量指数",
        "unit": ""
      },
      {
        "title": "空气质量等级",
        "name": "kqzldj",
        "type": "object",
        "description": "空气质量级别(优、良等)",
        "unit": ""
      },
      {
        "title": "首要污染物",
        "name": "sywrw",
        "type": "object",
        "description": "主要污染物",
        "unit": ""
      },
      {
        "title": "经度",
        "name": "jd",
        "type": "float64",
        "description": "监测站点经度",
        "unit": ""
      },
      {
        "title": "纬度",
        "name": "wd",
        "type": "float64",
        "description": "监测站点纬度",
        "unit": ""
      },
      {
        "title": "PM10_IAQI",
        "name": "PM10_IAQI",
        "type": "float64",
        "description": "PM10空气质量分指数",
        "unit": ""
      },
      {
        "title": "PM10\\_浓度",
        "name": "PM10\\_nd",
        "type": "float64",
        "description": "PM10浓度值",
        "unit": ""
      },
      {
        "title": "PM2.5_IAQI",
        "name": "PM2.5_IAQI",
        "type": "float64",
        "description": "PM2.5空气质量分指数",
        "unit": ""
      },
      {
        "title": "PM2.5\\_浓度",
        "name": "PM2.5\\_nd",
        "type": "float64",
        "description": "PM2.5浓度值",
        "unit": ""
      },
      {
        "title": "一氧化碳\\_IAQI",
        "name": "yyht\\_IAQI",
        "type": "float64",
        "description": "CO空气质量分指数",
        "unit": ""
      },
      {
        "title": "一氧化碳\\_浓度",
        "name": "yyht\\_nd",
        "type": "float64",
        "description": "CO浓度值",
        "unit": ""
      },
      {
        "title": "二氧化氮\\_IAQI",
        "name": "eyhd\\_IAQI",
        "type": "float64",
        "description": "NO2空气质量分指数",
        "unit": ""
      },
      {
        "title": "二氧化氮\\_浓度",
        "name": "eyhd\\_nd",
        "type": "float64",
        "description": "NO2浓度值",
        "unit": ""
      },
      {
        "title": "二氧化硫\\_IAQI",
        "name": "eyhl\\_IAQI",
        "type": "float64",
        "description": "SO2空气质量分指数",
        "unit": ""
      },
      {
        "title": "二氧化硫\\_浓度",
        "name": "eyhl\\_nd",
        "type": "float64",
        "description": "SO2浓度值",
        "unit": ""
      },
      {
        "title": "臭氧1小时\\_IAQI",
        "name": "cy1xs\\_IAQI",
        "type": "float64",
        "description": "O3 1小时空气质量分指数",
        "unit": ""
      },
      {
        "title": "臭氧1小时\\_浓度",
        "name": "cy1xs\\_nd",
        "type": "float64",
        "description": "O3 1小时浓度值",
        "unit": ""
      },
      {
        "title": "臭氧8小时\\_IAQI",
        "name": "cy8xs\\_IAQI",
        "type": "float64",
        "description": "O3 8小时空气质量分指数",
        "unit": ""
      },
      {
        "title": "臭氧8小时\\_浓度",
        "name": "cy8xs\\_nd",
        "type": "float64",
        "description": "O3 8小时浓度值",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "城市列表",
    "name": "cslb",
    "api": "air_city_table",
    "targetUrl": "https://www.aqistudy.cn/",
    "description": "所有能获取空气质量数据的城市表",
    "remarks": "单次返回所有可以获取的城市表数据",
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
        "title": "省份",
        "name": "sf",
        "type": "object",
        "description": "",
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
        "title": "AQI",
        "name": "AQI",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "空气质量",
        "name": "kqzl",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "PM2.5浓度",
        "name": "PM2.5nd",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "首要污染物",
        "name": "sywrw",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "空气质量历史数据",
    "name": "kqzllssj",
    "api": "air_quality_hist",
    "targetUrl": "https://www.zq12369.com/",
    "description": "指定城市和数据频率下并且在指定时间段内的空气质量数据",
    "remarks": "单次返回所有的数据, 在提取一小时频率数据时请注意时间跨度不宜过长, 提取日频率数据的早年数据请分段提取",
    "inputParameters": [
      {
        "title": "city",
        "name": "city",
        "type": "str",
        "description": "city=\"北京\"; 调用 ak.air_city_table() 接口获取所有城市列表",
        "defaultValue": "北京",
        "isRequired": false
      },
      {
        "title": "period",
        "name": "period",
        "type": "str",
        "description": "period=\"day\"; \"hour\": 每小时一个数据, 由于数据量比较大, 下载较慢; \"day\": 每天一个数据; \"month\": 每个月一个数据",
        "defaultValue": "day",
        "isRequired": false
      },
      {
        "title": "start_date",
        "name": "start_date",
        "type": "str",
        "description": "start_date=\"20200320\"; 注意 **start_date** 和 **end_date** 跨度不宜过长",
        "defaultValue": "20200320",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "str",
        "description": "end_date=\"20200427\"; 注意 **start_date** 和 **end_date** 跨度不宜过长",
        "defaultValue": "20200427",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "time",
        "name": "time",
        "type": "object",
        "description": "日期时间索引",
        "unit": ""
      },
      {
        "title": "aqi",
        "name": "aqi",
        "type": "object",
        "description": "AQI",
        "unit": ""
      },
      {
        "title": "pm2_5",
        "name": "pm2_5",
        "type": "float64",
        "description": "PM2.5",
        "unit": ""
      },
      {
        "title": "pm10",
        "name": "pm10",
        "type": "object",
        "description": "PM10",
        "unit": ""
      },
      {
        "title": "co",
        "name": "co",
        "type": "float64",
        "description": "CO",
        "unit": ""
      },
      {
        "title": "no2",
        "name": "no2",
        "type": "object",
        "description": "NO2",
        "unit": ""
      },
      {
        "title": "o3",
        "name": "o3",
        "type": "object",
        "description": "O3",
        "unit": ""
      },
      {
        "title": "so2",
        "name": "so2",
        "type": "object",
        "description": "SO2",
        "unit": ""
      },
      {
        "title": "complexindex",
        "name": "complexindex",
        "type": "object",
        "description": "综合指数",
        "unit": ""
      },
      {
        "title": "rank",
        "name": "rank",
        "type": "object",
        "description": "排名",
        "unit": ""
      },
      {
        "title": "primary_pollutant",
        "name": "primary_pollutant",
        "type": "object",
        "description": "主要污染物",
        "unit": ""
      },
      {
        "title": "temp",
        "name": "temp",
        "type": "object",
        "description": "温度",
        "unit": ""
      },
      {
        "title": "humi",
        "name": "humi",
        "type": "object",
        "description": "湿度",
        "unit": ""
      },
      {
        "title": "windlevel",
        "name": "windlevel",
        "type": "object",
        "description": "风级",
        "unit": ""
      },
      {
        "title": "winddirection",
        "name": "winddirection",
        "type": "object",
        "description": "风向",
        "unit": ""
      },
      {
        "title": "weather",
        "name": "weather",
        "type": "object",
        "description": "天气",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "空气质量排名",
    "name": "kqzlpm",
    "api": "air_quality_rank",
    "targetUrl": "https://www.zq12369.com/environment.php",
    "description": "获取指定 date 时间点上所有城市(168个)的空气质量数据",
    "remarks": "单次返回所有的数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"\"; \"\": 当前时刻空气质量排名, 默认; \"20200312\": 当日空气质量排名; \"202003\": 当月空气质量排名; \"2019\": 当年空气质量排名;",
        "defaultValue": "",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "降序",
        "name": "jx",
        "type": "str",
        "description": "排名",
        "unit": ""
      },
      {
        "title": "省份",
        "name": "sf",
        "type": "str",
        "description": "",
        "unit": ""
      },
      {
        "title": "城市",
        "name": "cs",
        "type": "str",
        "description": "",
        "unit": ""
      },
      {
        "title": "AQI",
        "name": "AQI",
        "type": "float",
        "description": "",
        "unit": ""
      },
      {
        "title": "空气质量",
        "name": "kqzl",
        "type": "str",
        "description": "",
        "unit": ""
      },
      {
        "title": "PM2.5浓度",
        "name": "PM2.5nd",
        "type": "str",
        "description": "",
        "unit": ""
      },
      {
        "title": "首要污染物",
        "name": "sywrw",
        "type": "str",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "监测点空气质量",
    "name": "jcdkqzl",
    "api": "air_quality_watch_point",
    "targetUrl": "https://www.zq12369.com/environment.php",
    "description": "获取每个城市的所有空气质量监测点的数据",
    "remarks": "单次返回指定城市指定日期区间的所有监测点的空气质量数据",
    "inputParameters": [
      {
        "title": "city",
        "name": "city",
        "type": "object",
        "description": "city=\"杭州\"; 调用 ak.air_city_table() 接口获取所有城市列表",
        "defaultValue": "杭州",
        "isRequired": false
      },
      {
        "title": "start_date",
        "name": "start_date",
        "type": "object",
        "description": "start_date=\"2018-01-01\"",
        "defaultValue": "2018-01-01",
        "isRequired": false
      },
      {
        "title": "end_date",
        "name": "end_date",
        "type": "object",
        "description": "end_date=\"2020-04-27\"",
        "defaultValue": "2020-04-27",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "pointname",
        "name": "pointname",
        "type": "object",
        "description": "监测点名称",
        "unit": ""
      },
      {
        "title": "aqi",
        "name": "aqi",
        "type": "float64",
        "description": "AQI",
        "unit": ""
      },
      {
        "title": "pm2_5",
        "name": "pm2_5",
        "type": "float64",
        "description": "PM2.5",
        "unit": ""
      },
      {
        "title": "pm10",
        "name": "pm10",
        "type": "float64",
        "description": "PM10",
        "unit": ""
      },
      {
        "title": "no2",
        "name": "no2",
        "type": "float64",
        "description": "NO2",
        "unit": ""
      },
      {
        "title": "so2",
        "name": "so2",
        "type": "float64",
        "description": "SO2",
        "unit": ""
      },
      {
        "title": "o3",
        "name": "o3",
        "type": "float64",
        "description": "O3",
        "unit": ""
      },
      {
        "title": "co",
        "name": "co",
        "type": "float64",
        "description": "CO",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "财富排行榜-中文",
    "name": "cfpxb_zw",
    "api": "fortune_rank",
    "targetUrl": "https://www.fortunechina.com/fortune500/node_65.htm",
    "description": "指定年份财富世界 500 强公司排行榜",
    "remarks": "单次返回某一个年份的所有历史数据",
    "inputParameters": [
      {
        "title": "year",
        "name": "year",
        "type": "str",
        "description": "year=\"2023\"",
        "defaultValue": "2023",
        "isRequired": false
      }
    ],
    "outputParameters": []
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "福布斯中国榜单",
    "name": "fbszgbd",
    "api": "forbes_rank",
    "targetUrl": "https://www.forbeschina.com/lists",
    "description": "福布斯中国-榜单数据, 一共 87 个指标的数据可以获取",
    "remarks": "单次返回指定 symbol 的数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "排名",
        "name": "pm",
        "type": "str",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "新财富富豪榜",
    "name": "xcffhb",
    "api": "xincaifu_rank",
    "targetUrl": "http://www.xcf.cn/zhuanti/ztzz/hdzt1/500frb/index.html",
    "description": "新财富 500 富豪榜, 从 2003 年至今",
    "remarks": "单次返回指定年份的富豪榜数据",
    "inputParameters": [
      {
        "title": "year",
        "name": "year",
        "type": "str",
        "description": "year=\"2020\"; 从 2003 年至今",
        "defaultValue": "2020",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "排名",
        "name": "pm",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "财富",
        "name": "cf",
        "type": "float64",
        "description": "注意单位: 亿元",
        "unit": "亿元"
      },
      {
        "title": "姓名",
        "name": "xm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "主要公司",
        "name": "zygs",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "相关行业",
        "name": "xghy",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "公司总部",
        "name": "gszb",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "性别",
        "name": "xb",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "年龄",
        "name": "nl",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "年份",
        "name": "nf",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "胡润排行榜",
    "name": "hrpxb",
    "api": "hurun_rank",
    "targetUrl": "https://www.hurun.net/zh-CN/Rank/HsRankDetails?num=QWDD234E",
    "description": "胡润百富榜单；富豪榜系列，创业系列，500强系列，特色系列",
    "remarks": "单次返回指定 indicator 和 year 的榜单数据",
    "inputParameters": [
      {
        "title": "indicator",
        "name": "indicator",
        "type": "str",
        "description": "indicator=\"胡润百富榜\"; choice of {\"胡润百富榜\", \"胡润全球富豪榜\", \"胡润印度榜\", \"胡润全球独角兽榜\", \"全球瞪羚企业榜\", \"胡润Under30s创业领袖榜\", \"胡润世界500强\", \"胡润艺术榜\"}",
        "defaultValue": "胡润百富榜",
        "choices": [
          "胡润百富榜",
          "胡润全球富豪榜",
          "胡润印度榜",
          "胡润全球独角兽榜",
          "全球瞪羚企业榜",
          "胡润Under30s创业领袖榜",
          "胡润世界500强",
          "胡润艺术榜"
        ],
        "isRequired": false
      },
      {
        "title": "year",
        "name": "year",
        "type": "str",
        "description": "year=\"2020\"; choice of {\"胡润百富榜\": \"2014-至今\", \"胡润全球富豪榜\": \"2019-至今\", \"胡润印度榜\": \"2018-至今\", \"胡润全球独角兽榜\": \"2019-至今\", \"全球瞪羚企业榜\": \"2021-至今\", \"胡润Under30s创业领袖榜\": \"2019-至今\", \"胡润世界500强\": \"2020-至今\", \"胡润艺术榜\": \"2019-至今\"}",
        "defaultValue": "2020",
        "choices": [
          "胡润百富榜: 2014-至今",
          "胡润全球富豪榜: 2019-至今",
          "胡润印度榜: 2018-至今",
          "胡润全球独角兽榜: 2019-至今",
          "全球瞪羚企业榜: 2021-至今",
          "胡润Under30s创业领袖榜: 2019-至今",
          "胡润世界500强: 2020-至今",
          "胡润艺术榜: 2019-至今"
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "排名",
        "name": "pm",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "排名",
        "name": "pm",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "成交额",
        "name": "cje",
        "type": "float64",
        "description": "注意单位: 万",
        "unit": "万"
      },
      {
        "title": "姓名",
        "name": "xm",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "年龄",
        "name": "nl",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "艺术类别",
        "name": "yslb",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "实时票房",
    "name": "sspf",
    "api": "movie_boxoffice_realtime",
    "targetUrl": "https://ys.endata.cn/BoxOffice/Movie",
    "description": "当前时刻的实时电影票房数据, 每 5 分钟更新一次数据, 实时票房包含今天未开映场次已售出的票房",
    "remarks": "当前时刻的实时票房数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "排序",
        "name": "px",
        "type": "int64",
        "description": "票房排名",
        "unit": ""
      },
      {
        "title": "影片名称",
        "name": "ypmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "实时票房",
        "name": "sspf",
        "type": "float64",
        "description": "注意单位: 万",
        "unit": "万"
      },
      {
        "title": "票房占比",
        "name": "pfzb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "上映天数",
        "name": "syts",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "累计票房",
        "name": "ljpf",
        "type": "float64",
        "description": "注意单位: 万",
        "unit": "万"
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "单日票房",
    "name": "drpf",
    "api": "movie_boxoffice_daily",
    "targetUrl": "https://www.endata.com.cn/BoxOffice/BO/Day/index.html",
    "description": "指定日期的电影票房数据, 每日 10:30, 12:30更新日票房，16:30 同时补充前 7 日票房",
    "remarks": "只能指定最近的日期",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240219\"; 只能选择最近的日期",
        "defaultValue": "20240219",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "排序",
        "name": "px",
        "type": "int64",
        "description": "票房排名",
        "unit": ""
      },
      {
        "title": "影片名称",
        "name": "ypmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "单日票房",
        "name": "drpf",
        "type": "int64",
        "description": "注意单位: 万",
        "unit": "万"
      },
      {
        "title": "环比变化",
        "name": "hbbh",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "累计票房",
        "name": "ljpf",
        "type": "int64",
        "description": "注意单位: 万",
        "unit": "万"
      },
      {
        "title": "平均票价",
        "name": "pjpj",
        "type": "int64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "场均人次",
        "name": "cjrc",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "口碑指数",
        "name": "kbzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "上映天数",
        "name": "syts",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "单周票房",
    "name": "dzpf",
    "api": "movie_boxoffice_weekly",
    "targetUrl": "https://www.endata.com.cn/BoxOffice/BO/Week/oneWeek.html",
    "description": "指定日期所在完整周的票房数据, 影片周票房数据初始更新周期为每周二，下周二补充数据",
    "remarks": "指定日期所在完整周的票房数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240218\"; 指定日期所在周必须已经完整",
        "defaultValue": "20240218",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "排序",
        "name": "px",
        "type": "int64",
        "description": "票房排名",
        "unit": ""
      },
      {
        "title": "影片名称",
        "name": "ypmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "排名变化",
        "name": "pmbh",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "单周票房",
        "name": "dzpf",
        "type": "int64",
        "description": "注意单位: 万",
        "unit": "万"
      },
      {
        "title": "环比变化",
        "name": "hbbh",
        "type": "int64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "累计票房",
        "name": "ljpf",
        "type": "int64",
        "description": "注意单位: 万",
        "unit": "万"
      },
      {
        "title": "平均票价",
        "name": "pjpj",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "场均人次",
        "name": "cjrc",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "口碑指数",
        "name": "kbzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "上映天数",
        "name": "syts",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "单月票房",
    "name": "dypf",
    "api": "movie_boxoffice_monthly",
    "targetUrl": "https://www.endata.com.cn/BoxOffice/BO/Month/oneMonth.html",
    "description": "获取指定日期所在月份的票房数据, 每月5号更新上月票房，并补充之前两个月票房",
    "remarks": "指定日期所在月份的票房数据, 只能获取最近月份的数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20201019\"; 输入具体的日期即可",
        "defaultValue": "20201019",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "排序",
        "name": "px",
        "type": "int64",
        "description": "票房排名",
        "unit": ""
      },
      {
        "title": "影片名称",
        "name": "ypmc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "单月票房",
        "name": "dypf",
        "type": "int64",
        "description": "注意单位: 万",
        "unit": "万"
      },
      {
        "title": "月度占比",
        "name": "ydzb",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "平均票价",
        "name": "pjpj",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "场均人次",
        "name": "cjrc",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "上映日期",
        "name": "syrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "口碑指数",
        "name": "kbzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "月内天数",
        "name": "ynts",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "年度票房",
    "name": "ndpf",
    "api": "movie_boxoffice_yearly",
    "targetUrl": "https://www.endata.com.cn/BoxOffice/BO/Year/index.html",
    "description": "指定日期所在年度的票房数据",
    "remarks": "指定日期所在年度的票房数据, 只能获取最近年度的数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240218\"; 输入具体的日期即可",
        "defaultValue": "20240218",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "排序",
        "name": "px",
        "type": "int64",
        "description": "票房排名",
        "unit": ""
      },
      {
        "title": "影片名称",
        "name": "ypmc",
        "type": "object",
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
        "title": "总票房",
        "name": "zpf",
        "type": "int64",
        "description": "注意单位: 万",
        "unit": "万"
      },
      {
        "title": "平均票价",
        "name": "pjpj",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "场均人次",
        "name": "cjrc",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "国家及地区",
        "name": "gjjdq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "上映日期",
        "name": "syrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "年度首周票房",
    "name": "ndszpf",
    "api": "movie_boxoffice_yearly_first_week",
    "targetUrl": "https://www.endata.com.cn/BoxOffice/BO/Year/firstWeek.html",
    "description": "指定日期所在年度的年度首周票房数据",
    "remarks": "指定日期所在年度的年度首周票房数据, 只能获取最近年度的数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20201018\"; 输入具体的日期即可",
        "defaultValue": "20201018",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "排序",
        "name": "px",
        "type": "int64",
        "description": "票房排名",
        "unit": ""
      },
      {
        "title": "影片名称",
        "name": "ypmc",
        "type": "object",
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
        "title": "首周票房",
        "name": "szpf",
        "type": "int64",
        "description": "注意单位: 万",
        "unit": "万"
      },
      {
        "title": "占总票房比重",
        "name": "zzpfbz",
        "type": "int64",
        "description": "注意单位: %",
        "unit": "%"
      },
      {
        "title": "场均人次",
        "name": "cjrc",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "国家及地区",
        "name": "gjjdq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "上映日期",
        "name": "syrq",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "首周天数",
        "name": "szts",
        "type": "int64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "影院票房-日票房排行",
    "name": "yypf_rpfpx",
    "api": "movie_boxoffice_cinema_daily",
    "targetUrl": "https://www.endata.com.cn/BoxOffice/BO/Cinema/day.html",
    "description": "指定日期的每日各影院的票房数据",
    "remarks": "指定日期各影院的票房数据, 注意当前日期的数据需要第二日才可以获取",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240219\"; 输入具体的日期即可",
        "defaultValue": "20240219",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "排序",
        "name": "px",
        "type": "int64",
        "description": "票房排名",
        "unit": ""
      },
      {
        "title": "影院名称",
        "name": "yymc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "单日票房",
        "name": "drpf",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "单日场次",
        "name": "drcc",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "场均人次",
        "name": "cjrc",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "场均票价",
        "name": "cjpj",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "上座率",
        "name": "szl",
        "type": "float64",
        "description": "注意单位: %",
        "unit": "%"
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "影院票房-周票房排行",
    "name": "yypf_zpfpx",
    "api": "movie_boxoffice_cinema_weekly",
    "targetUrl": "https://www.endata.com.cn/BoxOffice/BO/Cinema/week.html",
    "description": "指定日期的完整周各影院的票房数据",
    "remarks": "指定日期的完整周各影院的票房数据, 注意当前日期的数据只能返回上周的数据",
    "inputParameters": [
      {
        "title": "date",
        "name": "date",
        "type": "str",
        "description": "date=\"20240219\"; 输入具体的日期即可",
        "defaultValue": "20240219",
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "排序",
        "name": "px",
        "type": "int64",
        "description": "票房排名",
        "unit": ""
      },
      {
        "title": "影院名称",
        "name": "yymc",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "当周票房",
        "name": "dzpf",
        "type": "float64",
        "description": "注意单位: 万",
        "unit": "万"
      },
      {
        "title": "单银幕票房",
        "name": "dympf",
        "type": "float64",
        "description": "注意单位: 元",
        "unit": "元"
      },
      {
        "title": "场均人次",
        "name": "cjrc",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "单日单厅票房",
        "name": "drdtpf",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "单日单厅场次",
        "name": "drdtcc",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "电视剧集",
    "name": "dsjj",
    "api": "video_tv",
    "targetUrl": "https://www.endata.com.cn/Video/index.html",
    "description": "艺恩-视频放映-电视剧集",
    "remarks": "返回前一日的电视剧播映数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "排序",
        "name": "px",
        "type": "int64",
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
        "title": "类型",
        "name": "lx",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "播映指数",
        "name": "byzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "媒体热度",
        "name": "mtrd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "用户热度",
        "name": "yhrd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "好评度",
        "name": "hpd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "观看度",
        "name": "gkd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "统计日期",
        "name": "tjrq",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "综艺节目",
    "name": "zyjm",
    "api": "video_variety_show",
    "targetUrl": "https://www.endata.com.cn/Video/index.html",
    "description": "艺恩-视频放映-综艺节目",
    "remarks": "返回前一日的综艺播映数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "排序",
        "name": "px",
        "type": "int64",
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
        "title": "类型",
        "name": "lx",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "播映指数",
        "name": "byzs",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "媒体热度",
        "name": "mtrd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "用户热度",
        "name": "yhrd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "好评度",
        "name": "hpd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "观看度",
        "name": "gkd",
        "type": "float64",
        "description": "",
        "unit": ""
      },
      {
        "title": "统计日期",
        "name": "tjrq",
        "type": "float64",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "艺人商业价值",
    "name": "yrsyjz",
    "api": "business_value_artist",
    "targetUrl": "https://www.endata.com.cn/Marketing/Artist/business.html",
    "description": "艺恩-艺人-艺人商业价值",
    "remarks": "返回当前的艺人商业价值数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "排名",
        "name": "pm",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "艺人",
        "name": "yr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "商业价值",
        "name": "syjz",
        "type": "float64",
        "description": "商业价值由专业度，关注度，预测热度加权汇总计算后得出，分值范围0~100，综合反映明星作品、代言表现、近期热度及舆情口碑。",
        "unit": ""
      },
      {
        "title": "专业热度",
        "name": "zyrd",
        "type": "float64",
        "description": "艺人专业热度主要表现艺人历史作品及品牌代言的效果情况，参与计算的指标维度包括历史主演电影票房表现，历史主演视频节目播映热度，电影作品豆瓣评分，作品相关微博内容评论正负向，历史代言品牌数量，品牌热度，艺人获奖数量。",
        "unit": ""
      },
      {
        "title": "关注热度",
        "name": "gzrd",
        "type": "float64",
        "description": "艺人关注热度主要表现艺人网络中的舆情声量，参与计算的指标维度包括百度搜索指数，百度新闻数量，今日头条新闻数，微博转发量，微博评论量，微博点赞量，微博粉丝数量，贴吧关注数量，微博话题数量。",
        "unit": ""
      },
      {
        "title": "预测热度",
        "name": "ycrd",
        "type": "float64",
        "description": "预测热度的数值反映明星的未来发展潜力，包括粉丝增长规模，作品口碑以及未来作品预测。",
        "unit": ""
      },
      {
        "title": "美誉度",
        "name": "myd",
        "type": "float64",
        "description": "根据艺人近三年参演电影、视频作品在豆瓣等平台的评分、微博正向评价，以及微博好评率等指标综合加权得出。",
        "unit": ""
      },
      {
        "title": "统计日期",
        "name": "tjrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "艺人流量价值",
    "name": "yrlljz",
    "api": "online_value_artist",
    "targetUrl": "https://www.endata.com.cn/Marketing/Artist/business.html",
    "description": "艺恩-艺人-艺人流量价值",
    "remarks": "返回当前的艺人流量价值数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "排名",
        "name": "pm",
        "type": "int64",
        "description": "",
        "unit": ""
      },
      {
        "title": "艺人",
        "name": "yr",
        "type": "object",
        "description": "",
        "unit": ""
      },
      {
        "title": "流量价值",
        "name": "lljz",
        "type": "float64",
        "description": "流量价值由专业度，关注度，预测热度，带货力加权汇总计算后得出，分值范围0~100，在商业价值的基础上增加了明星近期热度及带货力的权重。",
        "unit": ""
      },
      {
        "title": "专业热度",
        "name": "zyrd",
        "type": "float64",
        "description": "艺人专业热度主要表现艺人历史作品及品牌代言的效果情况，参与计算的指标维度包括历史主演电影票房表现，历史主演视频节目播映热度，电影作品豆瓣评分，作品相关微博内容评论正负向，历史代言品牌数量，品牌热度，艺人获奖数量。",
        "unit": ""
      },
      {
        "title": "关注热度",
        "name": "gzrd",
        "type": "float64",
        "description": "艺人关注热度主要表现艺人网络中的舆情声量，参与计算的指标维度包括百度搜索指数，百度新闻数量，今日头条新闻数，微博转发量，微博评论量，微博点赞量，微博粉丝数量，贴吧关注数量，微博话题数量。",
        "unit": ""
      },
      {
        "title": "预测热度",
        "name": "ycrd",
        "type": "float64",
        "description": "预测热度的数值反映明星的未来发展潜力，包括粉丝增长规模，作品口碑以及未来作品预测。",
        "unit": ""
      },
      {
        "title": "带货力",
        "name": "dhl",
        "type": "float64",
        "description": "带货力的数值代表艺人的带货号召力，包括艺人的铁杆粉丝规模，超话粉丝规模。",
        "unit": ""
      },
      {
        "title": "统计日期",
        "name": "tjrq",
        "type": "object",
        "description": "",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "生活成本",
    "name": "shcb",
    "api": "cost_living",
    "targetUrl": "https://expatistan.com/cost-of-living/index",
    "description": "世界各大城市生活成本数据",
    "remarks": "返回当前时点所有数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "rank",
        "name": "rank",
        "type": "object",
        "description": "排名",
        "unit": ""
      },
      {
        "title": "city",
        "name": "city",
        "type": "object",
        "description": "城市名称",
        "unit": ""
      },
      {
        "title": "index",
        "name": "index",
        "type": "int64",
        "description": "价格指数",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "微博舆情报告",
    "name": "wbyqbg",
    "api": "stock_js_weibo_report",
    "targetUrl": "https://datacenter.jin10.com/market",
    "description": "微博舆情报告中近期受关注的股票",
    "remarks": "单次返回指定时间内微博舆情报告中近期受关注的股票",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "name",
        "name": "name",
        "type": "str",
        "description": "股票名称",
        "unit": ""
      },
      {
        "title": "rate",
        "name": "rate",
        "type": "str",
        "description": "人气排行指数",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "彭博实时亿万富豪指数",
    "name": "pbssywfhzs",
    "api": "index_bloomberg_billionaires",
    "targetUrl": "https://www.bloomberg.com/billionaires/",
    "description": "彭博亿万富豪指数, 全球前 500 名; 该接口需要使用代理访问",
    "remarks": "单次返回所有数据彭博亿万富豪排名数据",
    "inputParameters": [],
    "outputParameters": [
      {
        "title": "rank",
        "name": "rank",
        "type": "str",
        "description": "Rank",
        "unit": ""
      },
      {
        "title": "name",
        "name": "name",
        "type": "str",
        "description": "Name",
        "unit": ""
      },
      {
        "title": "total_net_worth",
        "name": "total_net_worth",
        "type": "str",
        "description": "Total net worth",
        "unit": ""
      },
      {
        "title": "last_change",
        "name": "last_change",
        "type": "str",
        "description": "$ Last change",
        "unit": ""
      },
      {
        "title": "YTD_change",
        "name": "YTD_change",
        "type": "str",
        "description": "$ YTD change",
        "unit": ""
      },
      {
        "title": "country",
        "name": "country",
        "type": "str",
        "description": "Country",
        "unit": ""
      },
      {
        "title": "industry",
        "name": "industry",
        "type": "str",
        "description": "Industry",
        "unit": ""
      }
    ]
  },
  {
    "moduleTitle": "另类数据",
    "moduleName": "others",
    "title": "历史彭博亿万富豪指数",
    "name": "lspbywfhzs",
    "api": "index_bloomberg_billionaires_hist",
    "targetUrl": "https://stats.areppim.com/stats/links_billionairexlists.htm",
    "description": "按照年份查询彭博亿万富豪指数; 该接口需要使用代理访问",
    "remarks": "单次返回当年所有数据彭博亿万富豪排名数据",
    "inputParameters": [
      {
        "title": "year",
        "name": "year",
        "type": "str",
        "description": "year=\"2021\"; choice of {\"2021\", \"2019\", \"2018\", ...}",
        "defaultValue": "2021",
        "choices": [
          2021,
          2019,
          2018,
          "..."
        ],
        "isRequired": false
      }
    ],
    "outputParameters": [
      {
        "title": "rank",
        "name": "rank",
        "type": "str",
        "description": "Rank",
        "unit": ""
      },
      {
        "title": "name",
        "name": "name",
        "type": "str",
        "description": "Name",
        "unit": ""
      },
      {
        "title": "total_net_worth",
        "name": "total_net_worth",
        "type": "str",
        "description": "Total net worth",
        "unit": ""
      },
      {
        "title": "last_change",
        "name": "last_change",
        "type": "str",
        "description": "$ Last change",
        "unit": ""
      },
      {
        "title": "YTD_change",
        "name": "YTD_change",
        "type": "str",
        "description": "$ YTD change",
        "unit": ""
      },
      {
        "title": "country",
        "name": "country",
        "type": "str",
        "description": "Country",
        "unit": ""
      },
      {
        "title": "industry",
        "name": "industry",
        "type": "str",
        "description": "Industry",
        "unit": ""
      },
      {
        "title": "age",
        "name": "age",
        "type": "str",
        "description": "Age",
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
  return othersInterfaces.find(item => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return othersInterfaces.find(item => item.name === name);
}

export default othersInterfaces;
