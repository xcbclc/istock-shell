import { Injectable, type TModelData } from '@istock/iswork';
import { KzzsssjModel } from './kzzsssj.model';

@Injectable()
export class KzzsssjService {
  async bondCbJsl(cookie?: string) {
    const query: { cookie?: string } = {};
    if (cookie) query.cookie = cookie;
    return await KzzsssjModel.run<Array<TModelData<KzzsssjModel>>>('/bond_cb_jsl', {
      method: 'get',
      query,
    });
  }
}
