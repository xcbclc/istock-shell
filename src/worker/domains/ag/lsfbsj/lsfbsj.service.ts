import { Injectable, type ModelData } from '@istock-shell/iswork';
import { LsfbsjModel } from './lsfbsj.model';

@Injectable()
export class LsfbsjService {
  async stockZhATickTx(symbol: string) {
    return await LsfbsjModel.run<Array<ModelData<LsfbsjModel>>>('/stock_zh_a_tick_tx_js', {
      method: 'get',
      query: {
        symbol,
      },
    });
  }
}
