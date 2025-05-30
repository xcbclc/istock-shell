import { Injectable, type ModelData } from '@istock-shell/iswork';
import { GgxxcxModel } from './ggxxcx.model';

@Injectable()
export class GgxxcxService {
  async getStockIndividualInfoEm(symbol: string) {
    return await GgxxcxModel.run<Array<ModelData<GgxxcxModel>>>('/stock_individual_info_em', {
      method: 'get',
      query: {
        symbol,
      },
    });
  }
}
