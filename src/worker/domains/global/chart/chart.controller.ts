import { Controller, Method, CmdRoute, Payload, Component } from '@istock-shell/iswork';
import type { CmdRequest, CmdTablePipeRequest } from '@/worker/common';
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
import cmd, { EChartType } from './chart.cmd';

type TViewChartPiePayload = CmdTablePipeRequest<TPieOption, TPieArguments> | CmdRequest<TPieOption, TPieArguments>;
type TViewChartBarPayload = CmdTablePipeRequest<TBarOption, TBarArguments> | CmdRequest<TBarOption, TBarArguments>;
type TViewChartLinePayload =
  | CmdTablePipeRequest<TLineOption, TLineArguments>
  | CmdRequest<TLineOption, TLineArguments>;
type TViewChartStockPayload =
  | CmdTablePipeRequest<TStockOption, TStockArguments>
  | CmdRequest<TStockOption, TStockArguments>;

@Controller({
  alias: 'chart',
  viewName: '图表',
})
export class ChartController {
  constructor(private readonly chartService: ChartService) {}

  @CmdRoute(cmd.饼图)
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

  @CmdRoute(cmd.条形图)
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

  @CmdRoute(cmd.折线图)
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

  @CmdRoute(cmd.股票蜡烛图)
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
