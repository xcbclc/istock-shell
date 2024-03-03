import { Injectable, type TModelData } from '@istock/iswork';
import { type EAdjust } from '@/worker/common';
import {
  LshqsjModel,
  LshqxlModel,
  LshqtxModel,
  FssjxlModel,
  FssjdcModel,
  RnfssjdcModel,
  PqsjlModel,
} from './lshqsj.model';
import { type EMinutePeriod, type EPeriod } from './lshqsj.cmd';

export type TStockZhAQuery = {
  symbol: string;
  period?: EPeriod;
  start_date?: string;
  end_date?: string;
  adjust?: EAdjust;
};
export type TStockZhAMinuteQuery = {
  symbol: string;
  period?: EMinutePeriod;
  start_date?: string;
  end_date?: string;
  adjust?: EAdjust;
};

@Injectable()
export class LshqsjService {
  async stockZhAHist(query: TStockZhAQuery) {
    return await LshqsjModel.run<Array<TModelData<LshqsjModel>>>('/stock_zh_a_hist', {
      method: 'get',
      query,
    });
  }

  async stockZhADaily(query: TStockZhAQuery) {
    return await LshqxlModel.run<Array<TModelData<LshqxlModel>>>('/stock_zh_a_daily', {
      method: 'get',
      query,
    });
  }

  async stockZhAHistTx(query: TStockZhAQuery) {
    return await LshqtxModel.run<Array<TModelData<LshqtxModel>>>('/stock_zh_a_hist_tx', {
      method: 'get',
      query,
    });
  }

  async stockZhAMinute(query: TStockZhAMinuteQuery) {
    return await FssjxlModel.run<Array<TModelData<FssjxlModel>>>('/stock_zh_a_minute', {
      method: 'get',
      query,
    });
  }

  async stockZhAHistMinEm(query: TStockZhAMinuteQuery) {
    return await FssjdcModel.run<Array<TModelData<FssjdcModel>>>('/stock_zh_a_hist_min_em', {
      method: 'get',
      query,
    });
  }

  async stockIntradayEm(symbol: string) {
    return await RnfssjdcModel.run<Array<TModelData<RnfssjdcModel>>>('/stock_intraday_em', {
      method: 'get',
      query: { symbol },
    });
  }

  async stockZhAHistPreMinEm(symbol: string) {
    return await PqsjlModel.run<Array<TModelData<PqsjlModel>>>('/stock_zh_a_hist_pre_min_em', {
      method: 'get',
      query: { symbol },
    });
  }
}
