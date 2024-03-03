import { Controller, Method, CmdRoute, Payload, Component } from '@istock/iswork';
import type { TCmdRequest, TCmdTablePipeRequest } from '@/worker/common';
import { ChartService } from './chart.service';
import type {
  TPieOption,
  TPieArguments,
  TBarOption,
  TBarArguments,
  TLineOption,
  TLineArguments,
  TStockOption,
  TStockArguments,
} from './chart.cmd';
import { 饼图, 条形图, 折线图, 股票蜡烛图, getChartCommand, EChartType } from './chart.cmd';

type TViewChartPiePayload = TCmdTablePipeRequest<TPieOption, TPieArguments> | TCmdRequest<TPieOption, TPieArguments>;
type TViewChartBarPayload = TCmdTablePipeRequest<TBarOption, TBarArguments> | TCmdRequest<TBarOption, TBarArguments>;
type TViewChartLinePayload =
  | TCmdTablePipeRequest<TLineOption, TLineArguments>
  | TCmdRequest<TLineOption, TLineArguments>;
type TViewChartStockPayload =
  | TCmdTablePipeRequest<TStockOption, TStockArguments>
  | TCmdRequest<TStockOption, TStockArguments>;

@Controller('chart')
export class ChartController {
  constructor(private readonly chartService: ChartService) {}

  @CmdRoute(getChartCommand(饼图))
  @Method('viewPieChart')
  @Component('ShChart')
  async viewPieChart(@Payload() payload: TViewChartPiePayload) {
    const options = this.chartService.generateChartConfig<TPieOption>(
      payload.options,
      EChartType.Pie,
      payload?.previous?.output
    );
    return { options };
  }

  @CmdRoute(getChartCommand(条形图))
  @Method('viewBarChart')
  @Component('ShChart')
  async viewBarChart(@Payload() payload: TViewChartBarPayload) {
    const options = this.chartService.generateChartConfig<TBarOption>(
      payload.options,
      EChartType.Bar,
      payload?.previous?.output
    );
    return { options };
  }

  @CmdRoute(getChartCommand(折线图))
  @Method('viewLineChart')
  @Component('ShChart')
  async viewLineChart(@Payload() payload: TViewChartLinePayload) {
    const options = this.chartService.generateChartConfig<TLineOption>(
      payload.options,
      EChartType.Line,
      payload?.previous?.output
    );
    return { options };
  }

  @CmdRoute(getChartCommand(股票蜡烛图))
  @Method('viewStockChart')
  @Component('ShChart')
  async viewStockChart(@Payload() payload: TViewChartStockPayload) {
    const options = this.chartService.generateChartConfig<TStockOption>(
      payload.options,
      EChartType.Stock,
      payload?.previous?.output
    );
    return { options };
  }
}
