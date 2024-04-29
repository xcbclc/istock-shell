export type TSiteInfo = {
  title: string;
  url: string;
  tag: string;
};

const 门户 = [
  {
    title: '新浪财经',
    url: 'http://finance.sina.com.cn/',
  },
  {
    title: '和讯网',
    url: 'http://www.hexun.com/',
  },
  {
    title: '网易财经',
    url: 'http://money.163.com/',
  },
  {
    title: '搜狐财经',
    url: 'http://business.sohu.com/',
  },
  {
    title: '凤凰财经',
    url: 'http://finance.ifeng.com/',
  },
  {
    title: '东方财富网',
    url: 'http://www.eastmoney.com/',
  },
  {
    title: '全景网',
    url: 'http://www.p5w.net/',
  },
  {
    title: '新华08',
    url: 'http://www.xinhua08.com/',
  },
  {
    title: '中财网',
    url: 'http://www.cfi.net.cn/',
  },
  {
    title: '腾讯财经',
    url: 'http://finance.qq.com/',
  },
  {
    title: '金融界',
    url: 'http://www.jrj.com.cn/',
  },
  {
    title: '中金在线',
    url: 'http://www.cnfol.com/',
  },
  {
    title: '阿斯达克',
    url: 'http://www.aastocks.com/',
  },
  {
    title: '证券之星',
    url: 'http://www.stockstar.com/',
  },
  {
    title: '新华网',
    url: 'http://xinhuanet.com/',
  },
  {
    title: '人民网',
    url: 'http://people.com.cn/',
  },
  {
    title: '投资界',
    url: 'http://www.pedaily.cn/',
  },
  {
    title: '投资中国',
    url: 'http://www.chinaventure.com.cn/',
  },
  {
    title: '同花顺',
    url: 'http://www.10jqka.com.cn/',
  },
  {
    title: '英为财情Investing.com',
    url: 'https://cn.investing.com/',
  },
].map((item): TSiteInfo => {
  return { ...item, tag: '门户' };
});

const 报纸 = [
  {
    title: '中国证券报',
    url: 'http://www.cs.com.cn/',
  },
  {
    title: '上海证券报',
    url: 'http://www.cnstock.com/',
  },
  {
    title: '证券时报',
    url: 'http://www.stcn.com/',
  },
  {
    title: '第一财经',
    url: 'http://www.yicai.com/',
  },
  {
    title: '经济观察报',
    url: 'http://www.eeo.com.cn/',
  },
  {
    title: '每日经济新闻',
    url: 'http://www.nbd.com.cn/',
  },
  {
    title: '中国经营报',
    url: 'http://www.cb.com.cn/',
  },
  {
    title: '期货日报',
    url: 'http://www.qhrb.com.cn/',
  },
].map((item): TSiteInfo => {
  return { ...item, tag: '报纸' };
});

const 杂志 = [
  {
    title: '财新网',
    url: 'http://www.caixin.com/',
  },
  {
    title: '财经网',
    url: 'http://www.caijing.com.cn/',
  },
  {
    title: '理财周刊',
    url: 'http://www.amoney.com.cn/',
  },
  {
    title: '新财富',
    url: 'http://www.xcf.cn/',
  },
  {
    title: '中国企业家',
    url: 'http://www.iceo.com.cn/',
  },
  {
    title: '环球企业家',
    url: 'http://www.gemag.com.cn/',
  },
  {
    title: '商业价值',
    url: 'http://content.businessvalue.com.cn/',
  },
  {
    title: '创业邦',
    url: 'http://www.cyzone.cn/',
  },
  {
    title: '创业家',
    url: 'http://www.chuangyejia.com/',
  },
  {
    title: '证券市场红周刊',
    url: 'http://www.hongzhoukan.com/',
  },
  {
    title: '第一财经周刊',
    url: 'http://www.cbnweek.com/',
  },
].map((item): TSiteInfo => {
  return { ...item, tag: '杂志' };
});

const 新媒体 = [
  {
    title: '华尔街见闻',
    url: 'http://wallstreetcn.com/',
  },
  {
    title: '虎嗅网',
    url: 'http://www.huxiu.com/',
  },
  {
    title: 'PingWest',
    url: 'http://www.pingwest.com/',
  },
  {
    title: '36氪',
    url: 'http://www.36kr.com/',
  },
  {
    title: 'DoNews',
    url: 'http://www.donews.com/',
  },
].map((item): TSiteInfo => {
  return { ...item, tag: '新媒体' };
});

const 官方 = [
  {
    title: '中国证监会',
    url: 'http://www.csrc.gov.cn/',
  },
  {
    title: '中国银保监会',
    url: 'http://www.cbirc.gov.cn/cn/view/pages/index/index.html',
  },
  {
    title: '深交所',
    url: 'http://www.szse.cn/',
  },
  {
    title: '上交所',
    url: 'http://www.sse.com.cn/',
  },
  {
    title: '港交所',
    url: 'http://www.hkex.com.hk/chi/index_c.htm',
  },
  {
    title: '国家统计局',
    url: 'http://www.stats.gov.cn/',
  },
  {
    title: '中国人民银行',
    url: 'http://www.pbc.gov.cn/',
  },
  {
    title: '发改委',
    url: 'http://www.sdpc.gov.cn/',
  },
  {
    title: '商务部',
    url: 'http://www.mofcom.gov.cn/',
  },
  {
    title: '中国海关',
    url: 'http://www.customs.gov.cn/',
  },
  {
    title: '国资委',
    url: 'http://www.sasac.gov.cn/',
  },
  {
    title: '住建部',
    url: 'http://www.mohurd.gov.cn/',
  },
  {
    title: '中证指数公司',
    url: 'http://www.csindex.com.cn/zh-CN',
  },
].map((item): TSiteInfo => {
  return { ...item, tag: '官方' };
});

const 债券 = [
  {
    title: '中国债券信息网',
    url: 'https://www.chinabond.com.cn/',
  },
  {
    title: '上证债券信息网',
    url: 'http://bond.sse.com.cn/fisp/index.html',
  },
  {
    title: '和讯债券',
    url: 'http://bond.hexun.com/',
  },
].map((item): TSiteInfo => {
  return { ...item, tag: '债券' };
});

const 理财 = [
  {
    title: '好买基金网',
    url: 'http://www.howbuy.com/',
  },
  {
    title: '私募排排网',
    url: 'http://www.simuwang.com/',
  },
  {
    title: '和讯理财',
    url: 'http://money.hexun.com/',
  },
  {
    title: '中国理财网',
    url: 'https://www.chinawealth.com.cn/zzlc/index.shtml',
  },
  {
    title: '和讯理财客',
    url: 'https://www.licaike.com/index?knownChannel=xueqiu',
  },
  {
    title: '格上理财',
    url: 'https://www.licai.com/',
  },
].map((item): TSiteInfo => {
  return { ...item, tag: '理财' };
});

const 期货 = [
  {
    title: '中金期货在线',
    url: 'http://futures.cnfol.com/',
  },
  {
    title: '和讯期货',
    url: 'http://futures.hexun.com/',
  },
  {
    title: '99期货',
    url: 'http://www.99qh.com/',
  },
  {
    title: '生意社',
    url: 'http://www.100ppi.com/',
  },
  {
    title: '股指期货',
    url: 'https://cn.investing.com/indices/indices-futures',
  },
].map((item): TSiteInfo => {
  return { ...item, tag: '期货' };
});

const 黄金 = [
  {
    title: '和讯黄金',
    url: 'http://gold.hexun.com/',
  },
  {
    title: '黄金网',
    url: 'http://gold.cnfol.com/',
  },
].map((item): TSiteInfo => {
  return { ...item, tag: '黄金' };
});

const 工具 = [
  {
    title: '巨潮资讯',
    url: 'http://www.cninfo.com.cn/',
  },
  {
    title: '雪球选股器',
    url: 'https://xueqiu.com/stock/screener',
  },
  {
    title: '可转债产品行情',
    url: 'https://xueqiu.com/hq/detail?market=CN&first_name=3&second_name=0&type=convert&source=convert',
  },
  {
    title: '回购产品行情',
    url: 'https://xueqiu.com/hq/detail?market=CN&first_name=3&second_name=3&type=repurchase&source=repurchase',
  },
  {
    title: '东方财富数据中心',
    url: 'http://data.eastmoney.com/cjsj/cpi.html',
  },
  {
    title: '国债收益率',
    url: 'https://cn.investing.com/rates-bonds/china-government-bonds',
  },
  {
    title: '资金流向',
    url: 'http://vip.stock.finance.sina.com.cn/moneyflow/',
  },
  {
    title: '新股申购：A股',
    url: 'https://xueqiu.com/hq/cnew?market=CN&first_name=0&second_name=4',
  },
  {
    title: '新股申购：美股',
    url: 'https://xueqiu.com/hq/detail?market=US&first_name=2&second_name=4&source=new_us&type=unlisted',
  },
  {
    title: '新股申购：港股',
    url: 'https://xueqiu.com/hq/detail?market=HK&first_name=1&second_name=2&type=unlisted&order=desc&orderBy=percent&source=new_hk',
  },
  {
    title: 'StockQ',
    url: 'http://stockq.cn/',
  },
  {
    title: '巨潮资讯',
    url: 'http://www.cninfo.com.cn/',
  },
  {
    title: '财经日历',
    url: 'http://www.fx678.com/indexs/index.shtml',
  },
  {
    title: '百度指数',
    url: 'http://index.baidu.com/',
  },
  {
    title: '解禁股查询',
    url: 'http://data.eastmoney.com/dxf/default.html',
  },
  {
    title: '货币基金产品行情',
    url: 'https://xueqiu.com/hq/detail?market=CN&first_name=4&second_name=1&parentType=1&type=12&source=fund_currency',
  },
].map((item): TSiteInfo => {
  return { ...item, tag: '工具' };
});

const 宏观数据 = [
  {
    title: 'GDP',
    url: 'http://value500.com/GDP.html',
  },
  {
    title: 'CPI/PPI',
    url: 'http://value500.com/CPI.asp',
  },
  {
    title: '国债收益率',
    url: 'https://cn.investing.com/rates-bonds/china-government-bonds',
  },
  {
    title: '东方财富数据中心',
    url: 'http://data.eastmoney.com/cjsj/cpi.html',
  },
].map((item): TSiteInfo => {
  return { ...item, tag: '宏观数据' };
});

const 市场数据 = [
  {
    title: '市场 、行业市盈率',
    url: 'http://www.cnindex.com.cn/syl.html',
  },
  {
    title: '大宗交易',
    url: 'http://stock.sohu.com/dazongjiaoyi/',
  },
  {
    title: '资金流向',
    url: 'https://vip.stock.finance.sina.com.cn/moneyflow/',
  },
  {
    title: '沪深内部交易',
    url: 'https://xueqiu.com/hq/insider?market=CN&first_name=0&second_name=7',
  },
  {
    title: '新股申购',
    url: 'https://xueqiu.com/hq/cnew?market=CN&first_name=0&second_name=4',
  },
  {
    title: '新基金发行',
    url: 'http://jingzhi.funds.hexun.com/dt/faxing.htm',
  },
  {
    title: 'StockQ',
    url: 'http://stockq.cn/',
  },
].map((item): TSiteInfo => {
  return { ...item, tag: '市场数据' };
});

const 研报 = [
  {
    title: '萝卜投研',
    url: 'https://robo.datayes.com/v2/selection',
  },
  {
    title: '迈博汇金',
    url: 'http://www.hibor.com.cn/',
  },
  {
    title: '股票报告网',
    url: 'https://www.nxny.com/',
  },
].map((item): TSiteInfo => {
  return { ...item, tag: '研报' };
});

const 选股器 = [
  {
    title: '雪球筛选器',
    url: 'https://xueqiu.com/stock/screener',
  },
  {
    title: '东方财富选股器',
    url: 'http://data.eastmoney.com/xuangu/',
  },
  {
    title: '中财网数据引擎',
    url: 'http://data.cfi.cn/cfidata.aspx',
  },
  {
    title: '可转债',
    url: 'https://xueqiu.com/hq/detail?market=CN&first_name=3&second_name=0&type=convert&source=convert',
  },
  {
    title: 'i问财',
    url: 'http://www.iwencai.com/',
  },
  {
    title: '英为财情选股器',
    url: 'https://cn.investing.com/stock-screener/',
  },
].map((item): TSiteInfo => {
  return { ...item, tag: '选股器' };
});

export default [
  ...门户,
  ...报纸,
  ...杂志,
  ...新媒体,
  ...官方,
  ...债券,
  ...理财,
  ...期货,
  ...黄金,
  ...工具,
  ...宏观数据,
  ...市场数据,
  ...研报,
  ...选股器,
];
