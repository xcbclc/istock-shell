import { Injectable, type TModelData } from '@istock-shell/iswork';
import { isNumber, toLocaleDateString } from '@istock-shell/util';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { CdfcjysjModel } from './cdfcjysj.model';
import { CdfceshqsjModel } from './cdfceshqsj.model';
import { ChartService } from '../../global/chart/chart.service';
import { type TChartOptions } from '../../global/chart/chart.base.service';
import { EChartType } from '@domains/global/chart/chart.cmd';

type TCdfcjysjResponse = {
  records: Array<{
    fields: TModelData<CdfcjysjModel>;
  }>;
};

type TCdfceshqsjResponse = {
  records: Array<{
    fields: TModelData<CdfceshqsjModel>;
  }>;
};

type TTableQuery = {
  filter?: Record<string, any>;
  orderBy?: Array<Record<string, any>>;
};

type TDataGridCard = {
  title: string;
  value: string;
  desc: { text: Array<{ title: string; value: string; tooltip?: string }> };
};

@Injectable()
export class CdesfService {
  constructor(private readonly chartService: ChartService) {
    dayjs.extend(isoWeek);
  }

  /**
   * 获取数据单位
   * @param list
   * @private
   */
  #getListDataUnit(list: Array<TModelData<CdfceshqsjModel>>) {
    return list[0]?.单位 ?? '';
  }

  /**
   * 对比或环比转百分比
   * @param num1
   * @param num2
   * @private
   */
  #toPercentageFormat(num1: number | string, num2: number | string) {
    if (!num1 || !num2) return '-';
    if (!isNumber(num1) || !isNumber(num2)) return '-';
    return Number(((num1 / num2 - 1) * 100).toFixed(2)) + '%';
  }

  /**
   * 获取交易量数据
   * @param query
   * @param tableId
   */
  async getHouseTradeData(query: TTableQuery = {}, tableId: string = 'tblpAzrLGogn42iVjuq') {
    const response = await CdfcjysjModel.run<TCdfcjysjResponse>(`/api/table/${tableId}/record`, {
      method: 'get',
      query: {
        fieldKeyType: 'name',
        take: 1000,
        ...query,
      },
    });
    return response.records.map((record) => record.fields);
  }

  /**
   * 获取二手交易数据
   * @param query
   * @param tableId
   */
  async getOldHouseTradeData(query: TTableQuery = {}, tableId: string = 'tblVvH7U9z7UJn8v6E5') {
    const response = await CdfceshqsjModel.run<TCdfceshqsjResponse>(`/api/table/${tableId}/record`, {
      method: 'get',
      query: {
        fieldKeyType: 'name',
        take: 1000,
        ...query,
      },
    });
    return response.records.map((record) => record.fields);
  }

  /**
   * 获取整个大屏数据
   */
  async getHouseDataGridData() {
    const [monthTradeData, monthOldHouseTradeData, weekOldHouseTradeData]: [
      Array<TModelData<CdfcjysjModel>>,
      Array<TModelData<CdfceshqsjModel>>,
      Array<TModelData<CdfceshqsjModel>>,
    ] = await Promise.all([
      this.getHouseTradeData({
        filter: {
          conjunction: 'and',
          filterSet: [
            { fieldId: 'fldMBBgvSSurOxULC8b', operator: 'is', value: '二手房' },
            { fieldId: 'fldMMxxENoRejGm6l7G', operator: 'is', value: '全市' },
          ],
        },
        orderBy: [{ fieldId: 'fldvd5o55rIJD3RCQaJ', order: 'desc' }],
      }),
      this.getOldHouseTradeData({
        orderBy: [{ fieldId: 'fldyFiNVC3JNtbm87Cb', order: 'desc' }],
      }),
      this.getOldHouseTradeData(
        {
          orderBy: [{ fieldId: 'fldF3RiarNlFpB3sQsD', order: 'desc' }],
        },
        'tbl4q2BqKL2tq9pk1xD'
      ),
    ]);
    const cards = this.getHouseDataGridCards(monthTradeData, monthOldHouseTradeData, weekOldHouseTradeData);
    const charts = this.getHouseDataGridCharts(
      [...monthTradeData].reverse(),
      [...monthOldHouseTradeData].reverse(),
      [...weekOldHouseTradeData].reverse()
    );
    return {
      stats: cards,
      items: charts,
    };
  }

  /**
   * 获取卡片数据
   * @param monthTradeData
   * @param monthOldHouseTradeData
   * @param weekOldHouseTradeData
   */
  getHouseDataGridCards(
    monthTradeData: Array<TModelData<CdfcjysjModel>>,
    monthOldHouseTradeData: Array<TModelData<CdfceshqsjModel>>,
    weekOldHouseTradeData: Array<TModelData<CdfceshqsjModel>>
  ): TDataGridCard[] {
    /**
     * 价
     */
    const 月成交均价列表: Array<TModelData<CdfceshqsjModel>> = [];
    const 新增挂牌均价列表: Array<TModelData<CdfceshqsjModel>> = [];
    const 存量挂牌列表: Array<TModelData<CdfceshqsjModel>> = [];
    const 成交周期列表: Array<TModelData<CdfceshqsjModel>> = [];
    monthOldHouseTradeData.forEach((item) => {
      if (item.数据类型 === '成交均价') {
        月成交均价列表.push(item);
      }
      if (item.数据类型 === '新增挂牌均价') {
        新增挂牌均价列表.push(item);
      }
      if (item.数据类型 === '存量挂牌') {
        存量挂牌列表.push(item);
      }
      if (item.数据类型 === '平均成交周期') {
        成交周期列表.push(item);
      }
    });
    const 月成交均价 = 月成交均价列表[0]?.值 ?? '';
    const 上月成交均价 = 月成交均价列表[1]?.值 ?? '';
    const 去年该月成交均价 = 月成交均价列表[11]?.值 ?? '';
    const 月新增挂牌价 = 新增挂牌均价列表[0]?.值 ?? '';
    const 上月新增挂牌价 = 新增挂牌均价列表[1]?.值 ?? '';
    const 去年该月新增挂牌价 = 新增挂牌均价列表[11]?.值 ?? '';
    const 存量挂牌 = 存量挂牌列表[0]?.值 ?? '';
    const 上月存量挂牌 = 存量挂牌列表[1]?.值 ?? '';
    const 成交周期 = 成交周期列表[0]?.值 ?? '';
    const 价 = {
      月成交均价: 月成交均价 + this.#getListDataUnit(月成交均价列表),
      月新增挂牌价: 月新增挂牌价 + this.#getListDataUnit(新增挂牌均价列表),
      成挂比: Number((月成交均价 / 月新增挂牌价).toFixed(2)) + '',
      成交环比: this.#toPercentageFormat(月成交均价, 上月成交均价),
      成交同比: this.#toPercentageFormat(月成交均价, 去年该月成交均价),
      新增挂牌环比: this.#toPercentageFormat(月新增挂牌价, 上月新增挂牌价),
      新增挂牌同比: this.#toPercentageFormat(月新增挂牌价, 去年该月新增挂牌价),
    };

    /**
     * 量
     */
    const 月成交量列表 = monthTradeData;
    const 月成交量 = 月成交量列表[0]?.套 ?? '';
    const 去年该月成交量 = 月成交量列表[11]?.套 ?? '';

    const 周成交量列表 = weekOldHouseTradeData.filter((item) => item.数据类型 === '成交量' && item.数据源 === '房小团');
    const 周成交量 = 周成交量列表[0]?.值 ?? '';
    const 上周成交量 = 周成交量列表[1]?.值 ?? '';

    const 周新增挂牌量列表 = weekOldHouseTradeData.filter(
      (item) => item.数据类型 === '新增挂牌量' && item.数据源 === '贝壳'
    );
    const 周新增挂牌量 = 周新增挂牌量列表[0]?.值 ?? '';
    const 上周新增挂牌量 = 周新增挂牌量列表[1]?.值 ?? '';
    const 量 = {
      周成交量: 周成交量 + this.#getListDataUnit(周成交量列表),
      周成交环比: this.#toPercentageFormat(周成交量, 上周成交量),
      周新增挂牌量: 周新增挂牌量 + this.#getListDataUnit(周新增挂牌量列表),
      新增挂牌环比: this.#toPercentageFormat(周新增挂牌量, 上周新增挂牌量),
      月成交同比: this.#toPercentageFormat(月成交量, 去年该月成交量),
      存量挂牌量环比: this.#toPercentageFormat(存量挂牌, 上月存量挂牌),
    };

    const 周转 = {
      总挂牌量: 存量挂牌 + this.#getListDataUnit(存量挂牌列表),
      成交周期: 成交周期 + this.#getListDataUnit(成交周期列表),
    };

    const cards: TDataGridCard[] = [
      {
        title: '总挂牌量',
        value: 周转.总挂牌量,
        desc: {
          text: [
            { title: '成交周期', value: 周转.成交周期, tooltip: '从挂牌到成交所需的平均时间' },
            {
              title: '去化周期',
              value: Number(((存量挂牌 * 10000) / 月成交量).toFixed(2)) + '个月',
              tooltip: '以当前月成交量计算，消化全部挂牌房源所需时间',
            },
          ],
        },
      },
      {
        title: '成交均价',
        value: 价.月成交均价,
        desc: {
          text: [
            { title: '新增挂牌均价', value: 价.月新增挂牌价, tooltip: '本月新挂牌房源的平均价格' },
            { title: '成挂比', value: 价.成挂比, tooltip: '成交均价与新增挂牌均价的比值，反映市场活跃度' },
            { title: '成交均价环比', value: 价.成交环比, tooltip: '本月成交均价相较上月的变化百分比' },
            { title: '成交均价同比', value: 价.成交同比, tooltip: '本月成交均价相较去年同月的变化百分比' },
            { title: '新增挂牌环比', value: 价.新增挂牌环比, tooltip: '本月新增挂牌均价相较上月的变化百分比' },
            { title: '新增挂牌同比', value: 价.新增挂牌同比, tooltip: '本月新增挂牌均价相较去年同月的变化百分比' },
          ],
        },
      },
      {
        title: '周成交量',
        value: 量.周成交量,
        desc: {
          text: [
            { title: '周新增挂牌量', value: 量.周新增挂牌量, tooltip: '本周新挂牌房源数量，数据来源：贝壳' },
            { title: '周成交环比', value: 量.周成交环比, tooltip: '本周成交量相较上周的变化百分比' },
            { title: '月成交同比', value: 量.月成交同比, tooltip: '本月成交量相较去年同月的变化百分比' },
            { title: '周新增挂牌环比', value: 量.新增挂牌环比, tooltip: '本周新增挂牌量相较上周的变化百分比' },
            { title: '存量挂牌量环比', value: 量.存量挂牌量环比, tooltip: '本月存量挂牌量相较上月的变化百分比' },
          ],
        },
      },
      {
        title: '租金回报率',
        value: '2.36%',
        desc: {
          text: [
            { title: '首套商贷利率', value: '3.00%', tooltip: '当前市场主流首套商业贷款利率' },
            { title: '5年期以上公积金利率', value: '2.6%', tooltip: '当前市场5年期及以上公积金贷款利率' },
            { title: '10年期国债利率', value: '1.64%', tooltip: '当前10年期国债年化利率' },
            { title: '5年期定存利率', value: '1.30%', tooltip: '当前5年期定期存款挂牌利率' },
            { title: '4月CPI', value: '-0.1%', tooltip: '2025年4月中国居民消费价格同比涨跌幅' },
          ],
        },
      },
      {
        title: '当前人口(2024)',
        value: '2147.4万人',
        desc: {
          text: [
            {
              title: '预期人口(2035)',
              value: '2350万人',
              tooltip: '《成都市国土空间总体规划2021—2035年》预测2035年人口规模',
            },
            { title: '预期人口(远期)', value: '2600万人', tooltip: '远期人口预测上限，仅供参考' },
            { title: '新生人口(2024)', value: '16.81万人', tooltip: '2024年新出生人口数量' },
            { title: '净增人口(2024)', value: '7.1万人', tooltip: '2024年人口净增数量' },
          ],
        },
      },
    ];
    return cards;
  }

  /**
   * 获取图表数据
   * @param monthTradeData
   * @param monthOldHouseTradeData
   * @param weekOldHouseTradeData
   */
  getHouseDataGridCharts(
    monthTradeData: Array<TModelData<CdfcjysjModel>>,
    monthOldHouseTradeData: Array<TModelData<CdfceshqsjModel>>,
    weekOldHouseTradeData: Array<TModelData<CdfceshqsjModel>>
  ): TChartOptions[] {
    const colorRange = [
      this.chartService.themeConfig?.variables?.['--color-primary'] ?? '#c94400',
      this.chartService.themeConfig?.variables?.['--color-secondary'] ?? '#744f36',
    ];
    const lineChildren = [
      { type: 'line', encode: { shape: 'smooth' } },
      { type: 'point', encode: { shape: 'point' }, tooltip: false },
    ];
    const 月价格走势列表 = monthOldHouseTradeData
      .filter((item) => ['成交均价', '新增挂牌均价'].includes(item.数据类型))
      .map((item) => {
        if (item.时间) item.时间 = toLocaleDateString(new Date(item.时间), 'YYYYMM');
        return { 时间: item.时间, 价格: item.值, 数据类型: item.数据类型 };
      });
    const 月成交量列表 = monthTradeData.map((item) => {
      if (item.时间) item.时间 = toLocaleDateString(new Date(item.时间), 'YYYYMM');
      return { 时间: item.时间, 成交量: item.套, 数据类型: '成交量' };
    });
    const 涨价降价占比列表 = monthOldHouseTradeData
      .filter((item) => ['涨价房源占比', '降价房源占比'].includes(item.数据类型))
      .map((item) => {
        if (item.时间) item.时间 = toLocaleDateString(new Date(item.时间), 'YYYYMM');
        return { 时间: item.时间, 占比: item.值, 数据类型: item.数据类型 };
      });
    const 周成交量新增挂牌量列表 = weekOldHouseTradeData
      .filter((item) => ['新增挂牌量', '成交量'].includes(item.数据类型) && item.数据源 === '贝壳')
      .map((item) => {
        if (item.时间)
          /* item.时间 = [
            dayjs(item.时间).isoWeekYear(),
            dayjs(item.时间).isoWeek().toString().padStart(2, '0') + '周',
          ].join('-'); */
          item.时间 = `第${dayjs(item.时间).isoWeek().toString().padStart(2, '0')}周`;
        return { 时间: item.时间, 量: item.值, 数据类型: item.数据类型 };
      });

    const 月成交均价图表: TChartOptions = this.chartService.generateChartConfig(
      {
        数据: 月价格走势列表,
        横轴: '时间',
        纵轴: '价格',
        类别: '数据类型',
        配置: {
          title: {
            title: '月成交均价走势',
          },
          type: 'view',
          scale: { color: { range: colorRange } },
          height: 400,
          children: lineChildren,
        },
      },
      EChartType.Line
    );
    const 月成交量图表: TChartOptions = this.chartService.generateChartConfig(
      {
        数据: 月成交量列表,
        横轴: '时间',
        纵轴: '成交量',
        类别: '数据类型',
        配置: {
          title: {
            title: '月成交量走势',
          },
          type: 'view',
          scale: { color: { range: colorRange } },
          height: 400,
          children: lineChildren,
        },
      },
      EChartType.Line
    );
    const 涨价降价占比图表: TChartOptions = this.chartService.generateChartConfig(
      {
        数据: 涨价降价占比列表,
        横轴: '时间',
        纵轴: '占比',
        类别: '数据类型',
        配置: {
          title: {
            title: '挂牌涨价/降价房源占比',
          },
          type: 'view',
          scale: { color: { range: colorRange } },
          height: 400,
          children: lineChildren,
        },
      },
      EChartType.Line
    );
    const 周量走势图表: TChartOptions = this.chartService.generateChartConfig(
      {
        数据: 周成交量新增挂牌量列表,
        横轴: '时间',
        纵轴: '量',
        类别: '数据类型',
        配置: {
          title: {
            title: '周成交量/新增挂牌量走势',
            subtitle: '数据来源于贝壳',
          },
          type: 'view',
          scale: { color: { range: colorRange } },
          height: 400,
          children: lineChildren,
        },
      },
      EChartType.Line
    );
    return [
      { component: 'ShChart', options: 周量走势图表 },
      { component: 'ShChart', options: 月成交均价图表 },
      { component: 'ShChart', options: 月成交量图表 },
      { component: 'ShChart', options: 涨价降价占比图表 },
    ];
  }
}
