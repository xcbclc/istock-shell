import {
  type ControllerMethodCmdRoute,
  type ControllerMethodCmdRouteMetadata,
  type ModelCreate,
  Domain,
  Global,
} from '@istock-shell/iswork';
import { transformStockName, akshareQuery, akshareCmdMap } from '@/worker/common';
import { CmdRouteService } from '@domains/global/cmd-route/cmd-route.service';
import { CmdRouteModel } from '@domains/global/cmd-route/cmd-route.model';
import { GgxxcxController } from './ggxxcx/ggxxcx.controller';
import { GgxxcxService } from './ggxxcx/ggxxcx.service';

const name = 'akshare';

@Global()
@Domain({
  name,
  viewName: name.toUpperCase(),
  controllers: [GgxxcxController],
  providers: [CmdRouteService, GgxxcxService],
  middlewares: [transformStockName, akshareQuery],
})
export class AkshareDomain {
  constructor(private readonly cmdRouteService: CmdRouteService) {
    const list: ControllerMethodCmdRoute[] = Array.from(akshareCmdMap.values());
    this.cmdRouteService.createMany(
      list.map((cmd): ModelCreate<CmdRouteModel> => {
        const subcommand = cmd.subcommand ? this.findSubcommand(cmd.subcommand) : undefined;
        return {
          id: CmdRouteModel.generateId.nextId(),
          name: cmd.name,
          cmd: cmd.cmd,
          usage: cmd.usage,
          shortDescription: cmd.shortDescription,
          description: cmd.description,
          subcommand,
          arguments: cmd.arguments,
          example: cmd.example,
          route: [name, cmd.cmd],
          domainName: name,
          domainViewName: name,
          options: Object.values(cmd.options ?? {}),
          rowStatus: 1,
        };
      })
    );
  }
  findSubcommand(subcommand: ControllerMethodCmdRoute): ControllerMethodCmdRouteMetadata {
    return {
      name: subcommand.name,
      cmd: subcommand.cmd,
      usage: subcommand.usage,
      shortDescription: subcommand.shortDescription,
      description: subcommand.description,
      options: subcommand.options ? Object.values(subcommand.options ?? {}) : [],
      subcommand: subcommand.subcommand ? this.findSubcommand(subcommand.subcommand) : undefined,
      arguments: subcommand.arguments,
      example: subcommand.example,
    };
  }
}
