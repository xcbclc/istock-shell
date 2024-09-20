import { Injectable, type TModelData } from '@istock/iswork';
import { generateColorPalette } from '@istock/util';
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

  async findJisiluCalendar(query: { qtype: string; start: string; end: string }, color?: string) {
    const list = await TzrlModel.run<Array<TModelData<TzrlModel>>>('/data/calendar/get_calendar_data/', {
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
