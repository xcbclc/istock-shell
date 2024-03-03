import { CmdRoute, CmdRouteArguments, Controller, Method } from '@istock/iswork';
import { AKshareReturn } from '@/worker/common';
import { SshqsjService } from './sshqsj.service';
import { SshqsjModel, SshqxlModel } from './sshqsj.model';
import cmdJson, { EDataType } from './sshqsj.cmd';

@Controller({
  alias: 'sshqsj',
  component: { name: 'ShTable' },
})
export class SshqsjController {
  constructor(private readonly sshqsjService: SshqsjService) {}

  @CmdRoute(cmdJson.实时行情数据)
  @Method({
    alias: cmdJson.实时行情数据.cmd,
  })
  @AKshareReturn({
    Model: SshqsjModel,
    caption: '实时行情数据-东财',
  })
  async stockZhSpotEm(@CmdRouteArguments(0) type: EDataType) {
    return await this.sshqsjService.stockZhSpotEm(type);
  }

  @CmdRoute(cmdJson.实时行情新浪)
  @Method({
    alias: cmdJson.实时行情新浪.cmd,
  })
  @AKshareReturn({
    Model: SshqxlModel,
    caption: '实时行情数据-新浪',
  })
  async stockZhASpot() {
    return await this.sshqsjService.stockZhASpot();
  }
}
