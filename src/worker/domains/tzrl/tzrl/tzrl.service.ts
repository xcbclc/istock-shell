import { Injectable, type ModelData } from '@istock-shell/iswork';
import { generateColorPalette } from '@istock-shell/util';
import * as jisilu from './tzrl.jisilu';
import { TzrlModel } from './tzrl.model';

@Injectable()
export class TzrlService {
  readonly jisilu: typeof jisilu = jisilu;
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
    const list = await TzrlModel.run<Array<ModelData<TzrlModel>>>('/data/calendar/get_calendar_data/', {
      method: 'get',
      query: { ...query, _: Date.now() },
      headers: { 'x-target': this.jisilu.site },
    });
    return (list || []).map((item) => {
      if (item.url) item.url = [this.jisilu.site, item.url].join('');
      if (item.description) item.description = item.description.replaceAll('<br>', '\n');
      if (color) item.color = color;
      return item;
    });
  }
}
