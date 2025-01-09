import { CmdRoute, Controller, Method } from '@istock/iswork';
import { CdesfService } from './cdesf.service';
import cmdJson from './cdesf.cmd';

@Controller({
  alias: 'cdesf',
})
export class CdesfController {
  constructor(private readonly cdesfService: CdesfService) {}

  @CmdRoute(cmdJson.成都二手房)
  @Method({
    alias: cmdJson.成都二手房.cmd,
  })
  async getDataGrid() {
    const dataGrid = await this.cdesfService.getHouseDataGridData();
    return {
      output: [
        {
          component: 'ShDataGrid',
          props: {
            ...dataGrid,
          },
        },
        {
          component: 'ShText',
          props: {
            texts: [
              {
                type: 'warning',
                text: '注：主要展示数据来源于成都房小团，卡片中的“周新增挂牌量”和图表中的“周成交量/新增挂牌量走势”数据来自贝壳。数据仅提供参考，不构成任何建议。',
                tag: 'span',
              },
            ],
          },
        },
      ],
    };
  }
}
