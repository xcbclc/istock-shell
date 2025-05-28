import { CmdRoute, Controller, Method } from '@istock-shell/iswork';
import { TableReturn } from '@/worker/common';
import { KzzsssjModel } from './kzzsssj.model';
import { KzzsssjService } from './kzzsssj.service';
import cmdJson from './kzzsssj.cmd';

@Controller({
  alias: 'kzzsssj', // 控制器别名
  component: { name: 'ShVirtualTable' }, // 控制器所有方法返回的数据用表格组件展示
})
export class KzzsssjController {
  // 依赖注入KzzsssjService服务
  constructor(private readonly kzzsssjService: KzzsssjService) {}

  @CmdRoute(cmdJson.可转债实时数据) // 定义命令路由
  @Method({
    alias: cmdJson.可转债实时数据.cmd, // 定义控制器方法别名
  })
  @TableReturn({
    Model: KzzsssjModel, // 对应数据模型，方便把接口数据解析成二维数组
    caption: cmdJson.可转债实时数据.source.title, // 表格显示标题
    unit: '*:涨跌幅·%，*:正股涨跌·%，*:转股溢价率·%，*:转债流通市值占比·%，*:剩余规模·亿，*:成交额·万',
  })
  async bondCbJsl() {
    return await this.kzzsssjService.bondCbJsl();
  }
}
