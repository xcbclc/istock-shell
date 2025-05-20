import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { CmdRoute, CmdRouteOptions, Component, Controller, Method } from '@istock/iswork';
import { getStartAndEndOfWeek } from '@istock/util';
import { TzrlService } from './tzrl.service';
import cmdJson from './tzrl.cmd';

dayjs.extend(utc);

@Controller({
  alias: 'tzrl',
})
export class TzrlController {
  constructor(private readonly tzrlService: TzrlService) {}

  @CmdRoute(cmdJson.投资日历)
  @Method({
    alias: cmdJson.投资日历.cmd,
  })
  @Component('ShICalendar')
  async getCalendar(
    @CmdRouteOptions(cmdJson.投资日历.options.lx)
    qtypeStr: string = 'newstock_apply,newstock_onlist,kzzsg'
  ) {
    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(new Date());
    const qtypes = qtypeStr.split(',');
    const start = `${startOfWeek.getTime()}`;
    const end = `${endOfWeek.getTime()}`;
    const colors = this.tzrlService.getColor(qtypes.length);
    const promises = qtypes.map(async (qtype, index) => {
      let result = await this.tzrlService.findJisiluCalendar(
        {
          qtype: qtype === 'kzzsg' ? 'CNV' : qtype,
          start: start.slice(0, start.length - 3),
          end: end.slice(0, end.length - 3),
        },
        colors[index]
      );
      if (qtype === 'kzzsg') {
        result = result.filter(
          (item) => item.title && (item.title.includes('申购日') || item.title.includes('上市日'))
        );
      }
      return result.map((item) => {
        item.tag = this.tzrlService.getJisiluTypeText(qtype) ?? '';
        item.priority = this.tzrlService.getJisiluPriorityByType(qtype);
        return item;
      });
    });
    const list = await Promise.all(promises);
    return {
      currentView: 'week',
      onlyView: true,
      events: list.flat(1).map((item) => {
        return {
          uid: item.id,
          sequence: 1,
          summary: `${item.title}${item.tag ? '（' + item.tag + '）' : ''}`,
          description: item.description,
          dtStart: dayjs(item.start).format('YYYYMMDD'),
          dtStamp: dayjs().utc().format('YYYYMMDDTHHmmss') + 'Z',
          categories: [item.tag],
          url: item.url,
          priority: item.priority,
          extra: {
            代码: item.code,
          },
        };
      }),
    };
  }
}
