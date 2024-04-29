import { Injectable, type TControllerMethodComponentOutput } from '@istock/iswork';
import { isNumber, ScopeError } from '@istock/util';
import type { TUiTableProps } from '@/worker/common';
import {
  EChartType,
  type TBarOption,
  type TLineOption,
  type TOption,
  type TPieOption,
  type TStockOption,
} from './chart.cmd';
import { ChartBaseService, type TChartOptions } from './chart.base.service';

export type TChartData = Array<Record<string, unknown>>;

@Injectable()
export class ChartService extends ChartBaseService {
  /**
   * 根据参数把二维表格数据转成指定图表
   * @param chatData
   * @param args
   * @param opt
   * @param extraConfig
   */
  generateChartConfig<Opt extends TOption>(
    opt: Opt,
    type: EChartType,
    preOutput?:
      | Array<TControllerMethodComponentOutput<TUiTableProps>>
      | Array<TControllerMethodComponentOutput<Record<string, unknown>>>
  ): TChartOptions {
    // 解析上一个命令的数据
    let data: TChartData | undefined = this.isUiTableOutput(preOutput) ? this.autoToChartData(preOutput) : opt.数据;
    if (!data) throw new ScopeError(`global.${this.constructor.name}`, `没获取到图表数据`);
    if (!type) throw new ScopeError(`global.${this.constructor.name}`, '请指定图表类型');
    let config: TChartOptions = {};
    // 先处理过滤数据
    if (opt.过滤) {
      data = this.filterConditionHandler(data, opt.过滤);
    }
    // 表格数据升维
    if (data && data.length === 1) {
      data = Object.entries(data[0])
        .filter(([_key, value]) => isNumber(value) || !Number.isNaN(Number(value)))
        .map(([key, value]) => {
          return {
            键: key,
            值: Number(value),
          };
        });
    }
    if (opt.纵轴 && type === EChartType.Pie) {
      config = this.getPieChartConfig(data, opt as TPieOption);
    }
    if (opt.横轴 && opt.纵轴 && type === EChartType.Bar) {
      config = this.getBarChartConfig(data, opt as TBarOption);
    }
    if (opt.横轴 && opt.纵轴 && type === EChartType.Line) {
      config = this.getLineChartConfig(data, opt as TLineOption);
    }
    if (opt.横轴 && opt.纵轴1 && opt.纵轴2 && type === EChartType.Stock) {
      config = this.getStockChartConfig(data, opt as TStockOption);
    }
    return { ...config, ...(opt.配置 ?? {}) };
  }
}
