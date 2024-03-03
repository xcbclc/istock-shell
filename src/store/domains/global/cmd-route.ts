import { writable, type Writable, get } from 'svelte/store';
import type { CmdWindowContext } from '@/window/cmd-window-context';
import type { TResponseCmdRoute } from '@domains/global/cmd-route/cmd-route.service';

export type TCmdRoute = TResponseCmdRoute;

export interface ICmdRouteWritable extends Writable<TCmdRoute[]> {
  // 获取地址相关信息
  getCmdpAddressInfo: (
    cmds: string[],
    currentDomainNames: string[]
  ) => { domainPath: string; executePath: string } | undefined;
}

let cmdRoute: ICmdRouteWritable;

export function getCmdRoute(_ctx: CmdWindowContext) {
  if (cmdRoute) return cmdRoute;
  cmdRoute = Object.create(writable([]));
  cmdRoute.getCmdpAddressInfo = (cmds: string[], domainNames: string[]) => {
    domainNames.push('global');
    const cmdRouteList = get(cmdRoute);
    const findRoute = (list: TCmdRoute[] | TCmdRoute['subcommand'], cmd: string) => {
      if (!list) return;
      return list.find((route) => route.cmd === cmd && domainNames.includes(route.domainName));
    };
    let route: TCmdRoute | Required<TCmdRoute>['subcommand'][number] | undefined;
    let cmd = cmds.shift();
    if (!cmd) return;
    route = findRoute(cmdRouteList, cmd); // 查找首个命令
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
  };
  return cmdRoute;
}
