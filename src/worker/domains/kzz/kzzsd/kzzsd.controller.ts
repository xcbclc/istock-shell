import { CmdRoute, Controller, Method, CmdRouteOptions } from '@istock-shell/iswork';
import { KzzsdService } from './kzzsd.service';
import cmdJson from './kzzsd.cmd';

@Controller({
  alias: 'kzzsd',
})
export class KzzsdController {
  constructor(private readonly kzzsdService: KzzsdService) {}

  // 命令控制器方法
  @CmdRoute(cmdJson.可转债双低)
  @Method({
    alias: cmdJson.可转债双低.cmd,
  })
  async getCalendar(
    @CmdRouteOptions(cmdJson.可转债双低.options.sdtj) averageDblow: number = 150,
    @CmdRouteOptions(cmdJson.可转债双低.options.ldzq) cycle: number = 7
  ) {
    const data = await this.kzzsdService.dblowStrategy(averageDblow, cycle);
    return {
      output: [
        {
          component: 'ShTable',
          props: {
            ...data.table,
          },
        },
        {
          component: 'ShText',
          props: {
            texts: [
              ...data.texts,
              {
                color: 'info',
                text: '该策略来自集思录-yyb凌波-转债双低轮动+沪深300波动率策略（2024），对应访问地址：',
                tag: 'span',
              },
              {
                color: 'info',
                text: 'https://www.jisilu.cn/question/489447',
                href: 'https://www.jisilu.cn/question/489447',
                tag: 'a',
                target: '_blank',
              },
            ],
          },
        },
      ],
    };
  }
}
