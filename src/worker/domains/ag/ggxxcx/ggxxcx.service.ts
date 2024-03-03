import { Injectable, type TModelData } from '@istock/iswork';
import { GgxxcxModel } from './ggxxcx.model';

@Injectable()
export class GgxxcxService {
  async getStockIndividualInfoEm(symbol: string) {
    return await GgxxcxModel.run<Array<TModelData<GgxxcxModel>>>('/stock_individual_info_em', {
      method: 'get',
      query: {
        symbol,
      },
    });
  }
}
