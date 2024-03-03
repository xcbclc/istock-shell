import { CmdRoute, CmdRouteOptions, Controller, Method } from '@istock/iswork';
import { AKshareReturn } from '@/worker/common';
import { LsfbsjModel } from './lsfbsj.model';
import { LsfbsjService } from './lsfbsj.service';
import cmdJson from './lsfbsj.cmd';

@Controller({
  alias: 'lsfbsj', // 控制器别名
  component: { name: 'ShTable' }, // 控制器所有方法返回的数据用表格组件展示
})
export class LsfbsjController {
  // 依赖注入LsfbsjService服务
  constructor(private readonly lsfbsjService: LsfbsjService) {}

  @CmdRoute(cmdJson.历史分笔数据) // 定义命令路由
  @Method({
    alias: cmdJson.历史分笔数据.cmd, // 定义控制器方法别名
  })
  @AKshareReturn({
    Model: LsfbsjModel, // 对应数据模型，方便把接口数据解析成二维数组
    caption: cmdJson.历史分笔数据.source.title, // 表格显示标题
  })
  async stockZhATickTx(@CmdRouteOptions(cmdJson.历史分笔数据.options.股票代码) symbol: string) {
    return await this.lsfbsjService.stockZhATickTx(symbol);
  }
}
