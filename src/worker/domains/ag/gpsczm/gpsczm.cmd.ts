import { getUnitOption, getYYYYMMDD, getYYYYMM } from '@/worker/common';

export default {
  上证股票市场总貌: {
    name: '上证股票市场总貌',
    cmd: 'szgpsczm',
    usage: 'szgpsczm',
    options: {
      单位: getUnitOption({
        default: '*:流通股本·亿，*:总市值·万亿，*:流通市值·万亿，*:总股本·亿',
      }),
    },
    source: {
      title: '上海证券交易所-股票数据总貌',
      url: 'http://www.sse.com.cn/market/stockdata/statistic/',
    },
    description: '上海证券交易所-股票数据总貌',
    remarks: '限量: 单次返回最近交易日的股票数据总貌(当前交易日的数据需要交易所收盘后统计)',
    example: 'szgpsczm -dw',
  },
  深证类别统计: {
    name: '深证类别统计',
    cmd: 'szlbtj',
    usage: 'szlbtj <-rq <日期>>',
    options: {
      日期: getYYYYMMDD({ optional: false }),
      单位: getUnitOption({
        default: '成交金额:*·亿，总市值:*·亿，流通市值:*·亿',
      }),
    },
    source: {
      title: '深圳证券交易所-市场总貌-证券类别统计',
      url: 'http://www.szse.cn/market/overview/index.html',
    },
    description: '深圳证券交易所-市场总貌-证券类别统计',
    remarks: '限量: 单次返回指定 date 的市场总貌数据-证券类别统计(当前交易日的数据需要交易所收盘后统计)',
    example: 'szlbtj -rq 20240424 -dw',
  },
  深证地区交易排序: {
    name: '深证地区交易排序',
    cmd: 'szdqjypx',
    usage: 'szdqjypx <-ny <年月>>',
    options: {
      年月: getYYYYMM({ optional: false }),
      单位: getUnitOption({
        default: '总交易额:*·千亿，股票交易额:*·千亿，基金交易额:*·千亿，债券交易额:*·千亿，占市场:*·%',
      }),
    },
    source: {
      title: '深圳证券交易所-市场总貌-地区交易排序',
      url: 'http://www.szse.cn/market/overview/index.html',
    },
    description: '深圳证券交易所-市场总貌-地区交易排序',
    remarks: '限量: 单次返回指定 date 的市场总貌数据-地区交易排序数据',
    example: 'szdqjypx -ny 202403 -dw',
  },
  深证股票行业成交: {
    name: '深证股票行业成交',
    cmd: 'szgphycj',
    usage: 'szgphycj [-ny <年月>] [-sjd <时间段>]',
    options: {
      年月: getYYYYMM(),
      单位: getUnitOption({
        default:
          '成交金额-人民币元:*·亿，成交股数-股数:*·亿，成交笔数-笔:*·千万，成交金额-占总计:*·%, 成交股数-占总计:*·%, 成交笔数-占总计:*·%',
      }),
      时间段: {
        name: '时间段',
        parameter: ['-sjd', '--时间段'],
        parameterType: ['string'],
        description: '时间段固定选项',
        default: '当年',
        optional: true,
        choices: ['当年', '当月'],
      },
    },
    source: {
      title: '深圳证券交易所-统计资料-股票行业成交数据',
      url: 'http://docs.static.szse.cn/www/market/periodical/month/W020220511355248518608.html',
    },
    description: '圳证券交易所-统计资料-股票行业成交数据',
    remarks: '限量: 单次返回指定 symbol 和 date 的统计资料-股票行业成交数据',
    example: 'szgphycj -sjd 当月 -dw',
  },
  上证每日概况: {
    name: '上证每日概况',
    cmd: 'szmrgk',
    usage: 'szmrgk <-rq <日期>>',
    options: {
      日期: getYYYYMMDD({ optional: false }),
      单位: getUnitOption({
        default: '*:市价总值·万亿,*:成交量·亿,*:成交金额·亿,*:流通市值·千亿',
      }),
    },
    source: {
      title: '上海证券交易所-数据-股票数据-成交概况-股票成交概况-每日股票情况',
      url: 'http://www.sse.com.cn/market/stockdata/overview/day/',
    },
    description: '上海证券交易所-数据-股票数据-成交概况-股票成交概况-每日股票情况',
    remarks:
      '限量: 单次返回指定日期的每日概况数据, 当前交易日数据需要在收盘后获取; 注意在 20211227（包含）之后输出格式变化',
    example: 'szmrgk -rq 20240424 -dw',
  },
};
