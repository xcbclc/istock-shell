import { CmdRoute, CmdRouteOptions, Controller, Method } from '@istock/iswork';
import { AKshareReturn } from '@/worker/common';
import { GgxxcxService } from './ggxxcx.service';
import { GgxxcxModel } from './ggxxcx.model';
import cmdJson from './ggxxcx.cmd';

@Controller({
  alias: 'ggxxcx',
  component: { name: 'ShTable' },
})
export class GgxxcxController {
  constructor(private readonly ggxxcxService: GgxxcxService) {}

  @CmdRoute(cmdJson.个股信息查询)
  @Method({
    alias: cmdJson.个股信息查询.cmd,
  })
  @AKshareReturn({
    Model: GgxxcxModel,
    caption: '东方财富-个股-股票信息',
  })
  async getStockIndividualInfoEm(@CmdRouteOptions(cmdJson.个股信息查询.options.股票代码) symbol: string) {
    return await this.ggxxcxService.getStockIndividualInfoEm(symbol);
  }
}
