import { Injectable, type TModelData } from '@istock/iswork';
import { HqbjModel } from './hqbj.model';

@Injectable()
export class HqbjService {
  async getStockBidAskEm(symbol: string) {
    return await HqbjModel.run<Array<TModelData<HqbjModel>>>('/stock_bid_ask_em', {
      method: 'get',
      query: {
        symbol,
      },
    });
  }
}
