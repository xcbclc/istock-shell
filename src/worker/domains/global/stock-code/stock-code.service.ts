import { Injectable, type TModelData } from '@istock/iswork';
import { StockCodeModel } from './stock-code.model';
import { StockCodeResultModel } from './stock-code-result.model';

@Injectable()
export class StockCodeService {
  #list: Array<TModelData<StockCodeModel>> = [];
  async getStockCodeList() {
    if (this.#list.length) return this.#list;
    const localList = await StockCodeResultModel.query({ filter: ['rowStatus', 'eq', 1] });
    const [firstItem] = localList;
    if (firstItem && Date.now() - firstItem.updateDate.getTime() < 24 * 60 * 60 * 1000) {
      return localList.map((item) => {
        return {
          id: item.id,
          code: item.code,
          name: item.name,
        };
      });
    }
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
    await StockCodeResultModel.deleteMany({}); // 清空记录
    await StockCodeResultModel.createMany(
      this.#list.map((item) => {
        return { ...item, updateDate: new Date(), rowStatus: 1 };
      })
    );
    return this.#list;
  }
}
