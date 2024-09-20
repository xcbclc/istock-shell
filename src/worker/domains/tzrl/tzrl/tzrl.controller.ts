import { CmdRoute, CmdRouteOptions, Component, Controller, Method, type TModelData } from '@istock/iswork';
import { getStartAndEndOfWeek, toLocaleDateString } from '@istock/util';
import { TzrlService } from './tzrl.service';
import { type TzrlModel } from './tzrl.model';
import cmdJson from './tzrl.cmd';

@Controller({
  alias: 'tzrl',
})
export class TzrlController {
  constructor(private readonly tzrlService: TzrlService) {}

  @CmdRoute(cmdJson.投资日历)
  @Method({
    alias: cmdJson.投资日历.cmd,
  })
  @Component('ShCalendar')
  async getCalendar(
    @CmdRouteOptions(cmdJson.投资日历.options.lx)
    qtypeStr: string = 'newstock_apply,newbond_apply,newstock_onlist,newbond_onlist'
  ) {
    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(new Date());
    const qtypes = qtypeStr.split(',');
    const start = `${startOfWeek.getTime()}`;
    const end = `${endOfWeek.getTime()}`;
    const colors = this.tzrlService.getColor(qtypes.length);
    const promises = qtypes.map(async (qtype, index) => {
      const result = await this.tzrlService.findJisiluCalendar(
        {
          qtype,
          start: start.slice(0, start.length - 3),
          end: end.slice(0, end.length - 3),
        },
        colors[index]
      );
      return result;
    });
    const list = await Promise.all(promises);
    return {
      type: 'week',
      eventRecord: list.flat(1).reduce<Record<string, Array<TModelData<TzrlModel>>>>((record, item) => {
        const key = toLocaleDateString(new Date(item.start), 'YYYY-MM-DD');
        if (!record[key]) {
          record[key] = [];
        }
        record[key].push(item);
        return record;
      }, {}),
      tags: qtypes.map((type, index) => {
        return { tag: this.tzrlService.getJisiluTypeText(type), color: colors[index] };
      }),
    };
  }
}
