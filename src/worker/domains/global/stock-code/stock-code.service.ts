import { Injectable, type TModelData } from '@istock/iswork';
import { StockCodeModel } from './stock-code.model';

@Injectable()
export class StockCodeService {
  #list: Array<TModelData<StockCodeModel>> = [];
  async getStockCodeList() {
    if (this.#list.length) return this.#list;
    const list = await StockCodeModel.run<Array<{ 代码: string; 名称: string }>>('/stock_zh_a_spot_em', {
      method: 'get',
    });
    this.#list = list.map((item) => {
      return {
        id: StockCodeModel.generateId.nextId(),
        code: item.代码,
        name: item.名称,
      };
    });
    return this.#list;
  }
}
