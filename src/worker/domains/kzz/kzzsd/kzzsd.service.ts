import { Injectable, type TModelData } from '@istock/iswork';
import { CookieService } from '@domains/global/setting/cookie/cookie.service';
import { KzzsdModel } from './kzzsd.model';
import { KzzsdResultModel } from './kzzsd-result.model';
import { isArray, isString, ScopeError } from '@/packages/util';

@Injectable()
export class KzzsdService {
  readonly #site = 'https://www.jisilu.cn';
  constructor(private readonly cookieService: CookieService) {}

  /**
   * 获取集思录可转债列表数据
   */
  async findJisiluCbList() {
    // 获取集思录的cookie数据
    const cookieData = await this.cookieService.findOneByHost(this.#site);
    const jisiluData = await KzzsdModel.run<{
      data: Array<TModelData<KzzsdModel>>;
      prompt: string;
    }>('/webapi/cb/list/', {
      method: 'get',
      query: { _: Date.now() },
      headers: { 'x-target': this.#site, 'x-cookie': cookieData?.cookie || '', init: 1 },
    });
    if (jisiluData.prompt) {
      throw new ScopeError(`kzzsd.${this.constructor.name}`, jisiluData.prompt);
    }
    return jisiluData.data.filter((item) => {
      // 排除非可转债
      return ['C'].includes(item.btype);
    });
  }

  /**
   * 按照双低值从低到高排序
   * @param list 可转债列表
   */
  sortByDblow(list: Array<TModelData<KzzsdModel>>) {
    return list.sort((v1, v2) => {
      return v1.dblow - v2.dblow;
    });
  }

  /**
   * 可转债筛选策略
   * @param averageDblow 双低最大进入条件
   * @param cycle 轮动周期
   */
  async dblowStrategy(averageDblow: number, cycle: number) {
    const jisiluList = this.sortByDblow(await this.findJisiluCbList());
    const kzzsdResult = await KzzsdResultModel.query({ filter: ['rowStatus', 'eq', 1] });
    const jisiluListRecord = jisiluList.reduce<Record<string, TModelData<KzzsdModel>>>((record, item) => {
      record[item.bond_id] = item;
      return record;
    }, {});
    const lastResult: Array<TModelData<KzzsdModel>> = kzzsdResult
      .map((item) => {
        return jisiluListRecord[item.bond_id];
      })
      .filter((item) => item);
    const lastTime = kzzsdResult[0]?.updateDate?.getTime?.() || 0;
    const hasRunDblowStrategy = Boolean(lastResult.length);
    if (hasRunDblowStrategy && cycle * 24 * 60 * 60 * 1000 > Date.now() - lastTime) {
      // 已进入策略但并未到策略执行周期，直接返回上次策略执行结果
      return {
        table: this.toTableData(lastResult),
        texts: [
          {
            type: 'danger',
            text: '未到该策略执行周期',
          },
        ],
      };
    }
    // 未进入策略判断进入条件
    if (!hasRunDblowStrategy && this.assertDblowStrategy(jisiluList, averageDblow)) {
      return {
        table: this.toTableData([]),
        texts: [
          {
            type: 'danger',
            text: `市场上可转债双低均值大于等于${averageDblow}，不满足进入条件`,
          },
        ],
      };
    }
    // 获取排除条件后的结果
    const filterResult = this.filterList(jisiluList);
    let newResult: Array<TModelData<KzzsdModel>> = [];
    let text: string = '';
    if (jisiluList.length < 50 || filterResult.length < 5) {
      if (hasRunDblowStrategy) {
        await KzzsdResultModel.updateMany(
          kzzsdResult.map((item) => {
            item.rowStatus = 0;
            return item;
          })
        );
      }
      return {
        table: this.toTableData([]),
        texts: [
          {
            type: 'danger',
            text: '可转债总数50只以内或可选标的小于5时，不满足标的选择条件',
          },
        ],
      };
    } else if (jisiluList.length < 100) {
      // 可转债总数100只以内时，采用5只轮动
      newResult = hasRunDblowStrategy
        ? this.replaceDblow(jisiluList, filterResult, lastResult, 5)
        : filterResult.slice(0, 5);
      if (newResult.length < 5) {
        text = '可转债总数100只以内时，需要采用5只轮动，标的数量不满足轮动，已达到退出条件';
      }
    } else if (jisiluList.length < 200) {
      // 可转债总数200只以内时，采用10只轮动
      newResult = hasRunDblowStrategy
        ? this.replaceDblow(jisiluList, filterResult, lastResult, 10)
        : filterResult.slice(0, 10);
      if (newResult.length < 10) {
        text = '可转债总数200只以内时，需要采用10只轮动，标的数量不满足轮动，已达到退出条件';
      }
    } else if (jisiluList.length < 300) {
      // 可转债总数300只以内时，采用15只轮动
      newResult = hasRunDblowStrategy
        ? this.replaceDblow(jisiluList, filterResult, lastResult, 15)
        : filterResult.slice(0, 15);
      if (newResult.length < 15) {
        text = '可转债总数300只以内时，需要采用15只轮动，标的数量不满足轮动，已达到退出条件';
      }
    } else {
      // 可转债总数300只以上时，采用20只轮动
      newResult = hasRunDblowStrategy
        ? this.replaceDblow(jisiluList, filterResult, lastResult, 20)
        : filterResult.slice(0, 20);
      if (newResult.length < 20) {
        text = '可转债总数300只以上时，需要采用20只轮动，标的数量不满足轮动，已达到退出条件';
      }
    }
    await KzzsdResultModel.updateMany(
      kzzsdResult.map((item) => {
        item.rowStatus = 0;
        return item;
      })
    );
    await KzzsdResultModel.createMany(
      newResult.map((item) => {
        return {
          id: KzzsdResultModel.generateId.nextId(),
          bond_id: item.bond_id,
          updateDate: new Date(),
          rowStatus: 1,
        };
      })
    );
    if (text) {
      return {
        table: this.toTableData(this.addDblowListStatus(newResult, '退')),
        texts: [
          {
            type: 'danger',
            text,
          },
        ],
      };
    }
    if (hasRunDblowStrategy && this.assertDblowStrategy(jisiluList, 170)) {
      return {
        table: this.toTableData(this.addDblowListStatus(newResult, '退')),
        texts: [
          {
            type: 'danger',
            text: '双低均值大于170，已达到退出条件',
          },
        ],
      };
    }
    if (hasRunDblowStrategy && this.assertDblowStrategy(jisiluList, 165)) {
      return {
        table: this.toTableData(this.addDblowListStatus(newResult, '减')),
        texts: [
          {
            type: 'warning',
            text: '双低均值大于165，已达到减仓条件',
          },
        ],
      };
    }
    return {
      table: this.toTableData(newResult),
      texts: [],
    };
  }

  /**
   * 判断进入或退出条件 进入条件：双低均值<150 减仓条件：双低均值>165  退出条件：双低均值>170
   * @param list 可转债列表
   * @param maxValue 判断最大值
   */
  assertDblowStrategy(list: Array<TModelData<KzzsdModel>>, maxValue: number): Boolean {
    const total = list.reduce<number>((number, item) => {
      number += item.dblow;
      return number;
    }, 0);
    const average = Number((total / list.length).toFixed());
    return average > maxValue;
  }

  /**
   * 排除条件
   * @param list 可转债列表
   */
  filterList(list: Array<TModelData<KzzsdModel>>): Array<TModelData<KzzsdModel>> {
    return list.filter((item) => {
      // 1. 已触发强赎
      if (!['C'].includes(item.btype)) return false;
      // 2. 1年内到期（此时期权价值太低了）
      if (item.year_left < 1) return false;
      // 3. 非A级债
      if (!item.rating_cd?.includes('A')) return false;
      // 4. 可转债价格>110
      if (item.price > 110) return false;
      // 5. 转股溢价率>50
      if (item.premium_rt > 50) return false;
      // 6. 双低值>130
      if (item.dblow > 130) return false;
      return true;
    });
  }

  /**
   * 轮动双低值
   * @param list 可转债列表
   * @param filterResult 可转债条件排除后列表
   * @param lastResult 上次策略结果
   * @param count 获取个数
   */
  replaceDblow(
    list: Array<TModelData<KzzsdModel>>,
    filterResult: Array<TModelData<KzzsdModel>>,
    lastResult: Array<TModelData<KzzsdModel>>,
    count: number
  ) {
    const newResult: Array<TModelData<KzzsdModel>> = [];
    const index = Math.round(list.length * 0.2); // 前20%
    const offsetDblow = list[index].dblow;
    const lastResultIds = lastResult.map((item) => item.bond_id);
    const choiceList = filterResult.filter((item) => !lastResultIds.includes(item.bond_id)); // 可选列表
    lastResult.forEach((item) => {
      if (item.dblow > offsetDblow && choiceList[0]?.dblow && item.dblow - choiceList[0].dblow >= 10) {
        // 当标的双低值大于整体可转债双低排名20%后，且轮出标的-新标的>=10
        newResult.push({ ...choiceList[0], status: ['新'] });
        choiceList.shift();
      } else {
        newResult.push({ ...item, status: [] });
      }
    });
    if (newResult.length > count) {
      return this.sortByDblow(newResult).slice(0, count);
    }
    return this.sortByDblow([...newResult, ...choiceList.slice(0, count - newResult.length)]);
  }

  /**
   * 将结果数据转换成界面需要的表格数据
   * @param list 可转债列表
   */
  toTableData(list: Array<TModelData<KzzsdModel>>) {
    const headerRecord: { [k in TModelData<KzzsdModel>]: string } = {
      bond_id: '转债代码',
      bond_nm: '转债名称',
      price: '转债现价',
      convert_value: '转股价值',
      premium_rt: '转股溢价率',
      dblow: '双低值',
      rating_cd: '评级',
      maturity_dt: '到期时间',
      year_left: '剩余年限',
      curr_iss_amt: '剩余规模（亿元）',
      // btype: '债券类型',
      stock_nm: '正股名称',
      sprice: '正股价格',
      force_redeem_price: '强赎价价格',
    };
    const headerKeys = Object.keys(headerRecord) as Array<keyof TModelData<KzzsdModel>>;
    return {
      caption: '可转债双低轮动策略',
      thead: headerKeys.map((k) => {
        return { value: headerRecord[k] };
      }),
      tbody: list.map((item) => {
        return headerKeys.map((k) => {
          if (k === 'bond_nm') {
            return {
              value: item[k] + (item.status ? `（${item.status?.join('、')}）` : ''),
              style: item.status?.length ? 'color: var(--color-primary-lighter)' : '',
            };
          }
          if (k === 'premium_rt') {
            return { value: item[k] + '%' };
          }
          return { value: item[k] };
        });
      }),
    };
  }

  /**
   * 添加状态
   * @param list
   * @param addStatus
   */
  addDblowListStatus(list: Array<TModelData<KzzsdModel>>, addStatus: string | string[]) {
    let status: string[] = [];
    if (isString(addStatus)) {
      status = [addStatus];
    }
    if (isArray(addStatus)) {
      status = addStatus;
    }
    return list.map((item) => {
      if (!item.status) item.status = [];
      const newStatus = [...item.status, ...status];
      item.status = [...new Set(newStatus)];
      return item;
    });
  }
}
