import { CmdRoute, CmdRouteOptions, Controller, Method } from '@istock/iswork';
import { AKshareReturn } from '@/worker/common';
import { KzzsssjModel } from './kzzsssj.model';
import { KzzsssjService } from './kzzsssj.service';
import cmdJson from './kzzsssj.cmd';

@Controller({
  alias: 'kzzsssj', // 控制器别名
  component: { name: 'ShTable' }, // 控制器所有方法返回的数据用表格组件展示
})
export class KzzsssjController {
  // 依赖注入KzzsssjService服务
  constructor(private readonly kzzsssjService: KzzsssjService) {}

  @CmdRoute(cmdJson.可转债实时数据) // 定义命令路由
  @Method({
    alias: cmdJson.可转债实时数据.cmd, // 定义控制器方法别名
  })
  @AKshareReturn({
    Model: KzzsssjModel, // 对应数据模型，方便把接口数据解析成二维数组
    caption: cmdJson.可转债实时数据.source.title, // 表格显示标题
  })
  async bondCbJsl(@CmdRouteOptions(cmdJson.可转债实时数据.options.cookie) cookie?: string) {
    return await this.kzzsssjService.bondCbJsl(cookie);
  }
}
