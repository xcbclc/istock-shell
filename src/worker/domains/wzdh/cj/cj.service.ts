import { Injectable, type IQueryParamsOptions, type TModelData } from '@istock/iswork';
import { CjModel } from './cj.model';

@Injectable()
export class CjService {
  #isInit: boolean = false;
  async initSiteList() {
    try {
      const { default: list } = await import('./data');
      const promises: Array<Promise<unknown>> = [];
      list.forEach((data) => {
        promises.push(CjModel.createOne({ id: CjModel.generateId.nextId(), ...data }));
      });
      await Promise.all(promises);
      // eslint-disable-next-line no-useless-catch
    } catch (e) {
      throw e;
    } finally {
      this.#isInit = true;
    }
  }

  async getSiteList(tag?: string): Promise<Array<TModelData<CjModel>>> {
    if (!this.#isInit) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      return await this.getSiteList(tag);
    }
    const query: IQueryParamsOptions = {};
    if (tag) {
      query.filter = ['tag', 'eq', tag];
    }
    return await CjModel.query(query);
  }
}
