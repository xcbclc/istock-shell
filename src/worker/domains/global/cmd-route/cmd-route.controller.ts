import {
  Controller,
  Method,
  ApplicationContext,
  CmdRoute,
  CmdRouteOptions,
  CmdRouteArguments,
  Meta,
  Component,
} from '@istock/iswork';
import { CmdRouteService } from './cmd-route.service';
import cmdJson from './cmd-route.cmd.json';

@Controller('cmdRoute')
export class CmdRouteController {
  constructor(private readonly cmdRouteService: CmdRouteService) {}

  @Method('list')
  async getList(ctx: ApplicationContext) {
    const list = await this.cmdRouteService.getAllCmdRoute(ctx);
    return this.cmdRouteService.mergeSubcommands(list);
  }

  @CmdRoute(cmdJson.命令查找)
  @Method({
    alias: cmdJson.命令查找.cmd,
  })
  @Component('OutputDoc')
  async findDomainList(
    @Meta('domainName') domainName: string,
    @CmdRouteArguments(0) cmd: string,
    @CmdRouteOptions(cmdJson.命令查找.options.名称) cmdName: string
  ) {
    const cmdRoutes = await this.cmdRouteService.getDomainCmdRoute(domainName, {
      cmd,
      name: cmdName,
    });
    return {
      list: this.cmdRouteService.mergeSubcommands(cmdRoutes),
    };
  }
}
