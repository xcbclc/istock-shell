import { Injectable } from '@istock-shell/iswork';
import { ScopeError } from '@istock-shell/util';
import { KzzsssjModel } from './kzzsssj.model';
import { ProxyService } from '@domains/global/setting/proxy/proxy.service';

@Injectable()
export class KzzsssjService {
  constructor(private readonly proxyService: ProxyService) {}
  async bondCbJsl() {
    const proxyData = await this.proxyService.findOneByName('jisilu');
    if (!proxyData) {
      throw new ScopeError(`KzzsssjService.bondCbJsl`, `未找到jisilu代理配置`);
    }
    const result = await KzzsssjModel.run<{ data: Array<Record<string, string>> }>('/webapi/cb/list/', {
      method: 'get',
      query: { _: Date.now() },
      headers: { 'xx-target': proxyData?.url, ...this.proxyService.addProxyHeaderPrefix(proxyData?.headers || {}), init: 1 },
    });
    return result.data.map((data) => {
      return {
        代码: data.bond_id,
        转债名称: data.bond_nm,
        现价: data.price,
        涨跌幅: data.increase_rt,
        正股代码: data.stock_id,
        正股名称: data.stock_nm,
        正股价: data.sprice,
        正股涨跌: data.sincrease_rt,
        正股PB: data.pb,
        转股价: data.convert_price,
        转股价值: data.convert_value,
        转股溢价率: data.premium_rt,
        双低: data.dblow,
        债券评级: data.rating_cd,
        回售触发价: data.put_convert_price,
        强赎触发价: data.force_redeem_price,
        转债流通市值占比: data.convert_amt_ratio,
        到期时间: data.maturity_dt,
        剩余年限: data.year_left,
        剩余规模: data.curr_iss_amt,
        成交额: data.volume,
        换手率: data.turnover_rt,
        到期税前收益: data.ytm_rt,
      };
    });
  }
}
