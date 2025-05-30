import { Injectable, type QueryParamsOptions, type ModelData } from '@istock-shell/iswork';
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
    } catch (e) {
      throw e;
    } finally {
      this.#isInit = true;
    }
  }

  async getSiteList(tag?: string): Promise<Array<ModelData<CjModel>>> {
    if (!this.#isInit) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      return await this.getSiteList(tag);
    }
    const query: QueryParamsOptions = {};
    if (tag) {
      query.filter = ['tag', 'eq', tag];
    }
    return await CjModel.query(query);
  }
}
