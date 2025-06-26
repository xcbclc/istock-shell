import type { ModelData } from '@istock-shell/iswork';
import type { CmdWindowContext } from '@/window';
import type { CmdRouteModel } from '@domains/global/cmd-route/cmd-route.model';
import type { ResponseCmdRoute, ResponseSubCmdRouteItem } from '@domains/global/cmd-route/cmd-route.service';
import { createStoreEffects, type StoreConfig, StoreContext } from '@/store';

export interface CmdRouteStoreModel extends ModelData<CmdRouteModel> {}
export interface CmdRouteStoreSubData extends ResponseSubCmdRouteItem {}
export interface CmdRouteStoreData extends ResponseCmdRoute {
  subcommand?: CmdRouteStoreSubData[];
}
export type CmdRouteStoreList = CmdRouteStoreData[];
export class CmdRoute extends StoreContext<CmdRouteStoreModel> {
  public list: CmdRouteStoreList = $state([]);
  constructor(ctx: CmdWindowContext, config: StoreConfig<CmdRouteStoreModel> = {}) {
    super(ctx, config);
  }
  protected async init() {
    this.storeEffect = createStoreEffects({
      onListChange: () => {
        this.list.forEach((data) => {
          this.ctx.cmdWindow.cmdParser.addCommand({
            name: data.name, // 命令名称
            cmd: data.cmd, // 命令
            usage: data.usage, // 用法
            description: data.description, // 命令描述
            options: data.options, // 可选参数列表
            arguments: data.arguments,
            commands: data.subcommand,
          });
        });
      },
    });
    await this.getList();
  }
  async getList(): Promise<CmdRouteStoreList> {
    const { payload } = await this.ctx.message.send<CmdRouteStoreData[]>('global', 'cmdRoute.list', {});
    if (payload) {
      this.list.splice(this.list.length, 0, ...payload);
    }
    return payload ?? [];
  }
  getCmdpAddressInfo(cmds: string[], domainNames: string[]) {
    domainNames.push('global');
    const findRoute = (list: Array<ResponseCmdRoute | CmdRouteStoreSubData>, cmd: string) => {
      if (!list) return;
      return list.find((route) => route.cmd === cmd && domainNames.includes(route.domainName));
    };
    let route: CmdRouteStoreData | CmdRouteStoreSubData | undefined;
    let cmd = cmds.shift();
    if (!cmd) return;
    route = findRoute(this.list, cmd); // 查找首个命令
    while (cmds.length) {
      // 查找子命令
      cmd = cmds.shift();
      if (route?.subcommand?.length && cmd) {
        route = findRoute(route.subcommand, cmd);
      } else {
        break;
      }
    }
    if (!route) return;
    return {
      domainPath: [route.domainName].join('.'),
      executePath: route.route.join('.'),
    };
  }
}
