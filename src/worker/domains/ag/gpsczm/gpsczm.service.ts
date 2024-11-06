import { Injectable, type TModelData } from '@istock/iswork';
import { SzdqjypxModel, SzgpsczmModel, SzlbtjModel, SzgphycjModel, type SzmrgkModel } from './gpsczm.model';

@Injectable()
export class GpsczmService {
  async getStockSummary() {
    return await SzgpsczmModel.run<Array<TModelData<SzgpsczmModel>>>('/stock_sse_summary', {
      method: 'get',
    });
  }

  async getStockSzseSummary(date: string) {
    return await SzlbtjModel.run<Array<TModelData<SzlbtjModel>>>('/stock_szse_summary', {
      method: 'get',
      query: { date },
    });
  }

  async getStockSzseAreaSummary(date: string) {
    return await SzdqjypxModel.run<Array<TModelData<SzdqjypxModel>>>('/stock_szse_area_summary', {
      method: 'get',
      query: { date },
    });
  }

  async getStockSzseSectorSummary(query: { date?: string; symbol?: string }) {
    // 参数互斥
    if (query.date) {
      delete query.symbol;
    } else {
      delete query.date;
    }
    const list = await SzgphycjModel.run<Array<TModelData<SzgphycjModel>>>('/stock_szse_sector_summary', {
      method: 'get',
      query,
    });
    return list.sort((v1, v2) => {
      return v2['成交金额-人民币元'] - v1['成交金额-人民币元'];
    });
  }

  async getStockSseDealDaily(date: string) {
    return await SzgpsczmModel.run<Array<TModelData<SzmrgkModel>>>('/stock_sse_deal_daily', {
      method: 'get',
      query: { date },
    });
  }
}
