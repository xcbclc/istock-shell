import { Injectable, type TModelData } from '@istock/iswork';
import { LsfbsjModel } from './lsfbsj.model';

@Injectable()
export class LsfbsjService {
  async stockZhATickTx(symbol: string) {
    return await LsfbsjModel.run<Array<TModelData<LsfbsjModel>>>('/stock_zh_a_tick_tx_js', {
      method: 'get',
      query: {
        symbol,
      },
    });
  }
}
