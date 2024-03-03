import { CmdRoute, CmdRouteOptions, Controller, Method } from '@istock/iswork';
import { AKshareReturn } from '@/worker/common';
import { HqbjService } from './hqbj.service';
import { HqbjModel } from './hqbj.model';
import cmdJson from './hqbj.cmd';

@Controller({
  alias: 'hqbj',
  component: { name: 'ShTable' },
})
export class HqbjController {
  constructor(private readonly hqbjService: HqbjService) {}

  @CmdRoute(cmdJson.行情报价)
  @Method({
    alias: cmdJson.行情报价.cmd,
  })
  @AKshareReturn({
    Model: HqbjModel,
    caption: '东方财富-行情报价',
  })
  async getStockBidAskEm(@CmdRouteOptions(cmdJson.行情报价.options.股票代码) symbol: string) {
    return await this.hqbjService.getStockBidAskEm(symbol);
  }
}
