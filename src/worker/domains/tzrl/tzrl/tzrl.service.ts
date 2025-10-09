import { Injectable, type ModelData } from '@istock-shell/iswork';
import { generateColorPalette, ScopeError } from '@istock-shell/util';
import * as jisilu from './tzrl.jisilu';
import { TzrlModel } from './tzrl.model';
import { ProxyService } from '@domains/global/setting/proxy/proxy.service';

@Injectable()
export class TzrlService {
  jisilu: typeof jisilu = jisilu;
  constructor ( private readonly proxyService: ProxyService,) {
  }
  async getProxyInfo () {
    const proxyData = await this.proxyService.findOneByName('jisilu');
    if (!proxyData) {
      throw new ScopeError(`TzrlService.findJisiluCalendar`, `未找到jisilu代理配置`);
    }
    return proxyData;
  }
  getColor(count: number) {
    return generateColorPalette(count);
  }

  getJisiluTypeText(type: string) {
    return this.jisilu.typeRecord[type];
  }

  getJisiluPriorityByType(type: string) {
    return this.jisilu.priorityRecord[type];
  }

  async findJisiluCalendar(query: { qtype: string; start: string; end: string }, color?: string) {
    const proxyData = await this.getProxyInfo();
    const list = await TzrlModel.run<Array<ModelData<TzrlModel>>>('/data/calendar/get_calendar_data/', {
      method: 'get',
      query: { ...query, _: Date.now() },
      headers: { 'xx-target': proxyData?.url, ...this.proxyService.addProxyHeaderPrefix(proxyData?.headers || {}) },
    });
    return (list || []).map((item) => {
      if (item.url) item.url = [proxyData.url, item.url].join('');
      if (item.description) item.description = item.description.replaceAll('<br>', '\n');
      if (color) item.color = color;
      return item;
    });
  }
}
