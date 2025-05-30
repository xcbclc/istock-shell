import { Injectable, type ModelData } from '@istock-shell/iswork';
import { ScopeError } from '@istock-shell/util';
import { SshqsjModel, SshqxlModel } from './sshqsj.model';
import { EDataType } from '@domains/ag/sshqsj/sshqsj.cmd';

@Injectable()
export class SshqsjService {
  async stockZhSpotEm(type: EDataType) {
    let path: string = '';
    switch (type) {
      case EDataType.QB:
        path = '/stock_zh_a_spot_em';
        break;
      case EDataType.HAG:
        path = '/stock_sh_a_spot_em';
        break;
      case EDataType.SAG:
        path = '/stock_sz_a_spot_em';
        break;
      case EDataType.JAG:
        path = '/stock_bj_a_spot_em';
        break;
      case EDataType.XG:
        path = '/stock_new_a_spot_em';
        break;
      case EDataType.CYB:
        path = '/stock_cy_a_spot_em';
        break;
      case EDataType.KCB:
        path = '/stock_kc_a_spot_em';
        break;
    }
    if (!path) throw new ScopeError(`ag.${this.constructor.name}`, '未找到对应请求地址');
    return await SshqsjModel.run<Array<ModelData<SshqsjModel>>>(path, {
      method: 'get',
    });
  }

  async stockZhASpot() {
    return await SshqxlModel.run<Array<ModelData<SshqxlModel>>>('/stock_zh_a_spot', {
      method: 'get',
    });
  }
}
