import { Injectable, type ModelData } from '@istock-shell/iswork';
import { HqbjModel } from './hqbj.model';

@Injectable()
export class HqbjService {
  async getStockBidAskEm(symbol: string) {
    return await HqbjModel.run<Array<ModelData<HqbjModel>>>('/stock_bid_ask_em', {
      method: 'get',
      query: {
        symbol,
      },
    });
  }
}
