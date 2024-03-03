import { stringify, parse } from 'qs';
import {
  isObject,
  isString,
  isArrayFull,
  isNil,
  isUndefined,
  isArrayStrings,
  isNumber,
  isStringFull,
  ScopeError,
} from '@istock/util';
import { ECondOperator } from '../enums';
import type { IParsedRequestParams, IPartialQueryBuilderOptions, IQueryParamsOptions } from './interfaces';
import type {
  TQueryFields,
  TQueryFilter,
  TQueryFilterArr,
  TQueryJoin,
  TQueryJoinArr,
  TQuerySort,
  TQuerySortArr,
  TSCondition,
} from './types';

// QueryBuilder的选项数据
export type TQueryBuilderOptions = Required<IPartialQueryBuilderOptions> & {
  paramNamesMap: Required<IPartialQueryBuilderOptions['paramNamesMap']>;
};

// paramNamesMap的key数据
export type TQueryBuilderOptionsKeys = keyof IQueryParamsOptions;

export const sortOrdersList = ['ASC', 'DESC'];
/**
 * eq (=, equal)
 * ne (!=, not equal)
 * gt (>, greater than)
 * lt (<, lower that)
 * gte (>=, greater than or equal)
 * lte (<=, lower than or equal)
 * starts (LIKE val%, starts with)
 * ends (LIKE %val, ends with)
 * cont (LIKE %val%, contains)
 * excl (NOT LIKE %val%, not contains)
 * in (IN, in range, accepts multiple values)
 * notin (NOT IN, not in range, accepts multiple values)
 * isnull (IS NULL, is NULL, doesn't accept value)
 * notnull (IS NOT NULL, not NULL, doesn't accept value)
 * between (BETWEEN, between, accepts two values)
 * eqL (LOWER(field) =, equal)
 * neL (LOWER(field) !=, not equal)
 * startsL (LIKE|ILIKE val%)
 * endsL (LIKE|ILIKE %val, ends with)
 * contL (LIKE|ILIKE %val%, contains)
 * exclL (NOT LIKE|ILIKE %val%, not contains)
 * inL (LOWER(field) IN, in range, accepts multiple values)
 * notinL (LOWER(field) NOT IN, not in range, accepts multiple values)
 */
export const deprecatedComparisonOperatorsList = [
  'eq',
  'ne',
  'gt',
  'lt',
  'gte',
  'lte',
  'starts',
  'ends',
  'cont',
  'excl',
  'in',
  'notin',
  'isnull',
  'notnull',
  'between',
];
export const comparisonOperatorsList = [
  ...deprecatedComparisonOperatorsList,
  ...Object.values(ECondOperator).map((n) => n),
];

export class QueryBuilder {
  static #options: TQueryBuilderOptions = {
    delim: '||',
    delimStr: ',',
    paramNamesMap: {
      fields: 'fields',
      search: 'search',
      filter: 'filter',
      or: 'or',
      join: 'join',
      sort: 'sort',
      limit: 'limit',
      offset: 'offset',
      page: 'page',
      cache: 'cache',
      includeDeleted: 'includeDeleted',
    },
  };

  /**
   * 设置参数
   * @param options QueryBuilder选项
   */
  static setOptions(options: IPartialQueryBuilderOptions) {
    QueryBuilder.#options = {
      ...QueryBuilder.#options,
      ...options,
      paramNamesMap: {
        ...QueryBuilder.#options.paramNamesMap,
        ...(options.paramNamesMap ? options.paramNamesMap : {}),
      },
    };
  }

  /**
   * 获取参数
   * @return IPartialQueryBuilderOptions QueryBuilder选项
   */
  static getOptions(): IPartialQueryBuilderOptions {
    return QueryBuilder.#options;
  }

  /**
   * QueryBuilder工厂方法，创建一个QueryBuilder实例
   * @param params 查询参数选项
   */
  static create(params?: IQueryParamsOptions | string): QueryBuilder {
    const qb = new QueryBuilder(params);
    return qb;
  }

  #queryString: string = '';

  #queryObject: Partial<IParsedRequestParams> = {};

  /**
   * 获取参数
   */
  get options(): TQueryBuilderOptions {
    return QueryBuilder.#options;
  }

  /**
   * @param params 查询字符串
   */
  constructor(params?: string | IQueryParamsOptions) {
    if (params && isString(params)) {
      this.#createFromParams(parse(params));
    }
    if (params && isObject(params)) {
      this.#createFromParams(params);
    }
  }

  /**
   * 获取query查询字符串
   * @param encode 是否编码
   */
  query(encode = true): string {
    if (this.#queryObject.search) {
      this.#queryObject.filter = undefined;
      this.#queryObject.or = undefined;
    }
    this.#queryString = stringify(this.#queryObject, { encode });
    return this.#queryString;
  }

  /**
   * 获取查询对象数据
   */
  getQueryData() {
    return this.#queryObject;
  }

  /**
   * 选择字段
   * @param fields 数组字段名
   */
  select(fields: TQueryFields): this {
    if (isArrayFull(fields)) {
      if (!isArrayStrings(fields)) {
        throw new ScopeError(`iswork.${this.constructor.name}`, 'fields字段应该为字符串数组');
      }
      this.#queryObject.fields = fields;
    }
    return this;
  }

  /**
   * 设置搜索条件
   * @param 条件类型参数
   */
  search(s: TSCondition) {
    if (!isNil(s) && isObject(s)) {
      this.#queryObject.search = s;
    }
    return this;
  }

  /**
   * 设置过滤
   * @param f 过滤条件
   */
  setFilter(f: TQueryFilter | TQueryFilterArr | Array<TQueryFilter | TQueryFilterArr>): this {
    this.#setCondition(f, 'filter');
    return this;
  }

  /**
   * 设置或逻辑
   * @param f 过滤条件
   */
  setOr(f: TQueryFilter | TQueryFilterArr | Array<TQueryFilter | TQueryFilterArr>): this {
    this.#setCondition(f, 'or');
    return this;
  }

  /**
   * 设置联表查询
   * @param j 联表查询选项
   */
  setJoin(j: TQueryJoin | TQueryJoinArr | Array<TQueryJoin | TQueryJoinArr>): this {
    if (!isNil(j)) {
      const join = this.#queryObject.join ?? [];
      let newJoin: TQueryJoin[] = [];
      if (this.#assertNestCond<Array<TQueryJoin | TQueryJoinArr>>(j)) {
        newJoin = j.map((arr) => this.#parseJoin(arr));
      } else {
        newJoin = [this.#parseJoin(j)];
      }
      this.#queryObject.join = [...join, ...newJoin];
    }
    return this;
  }

  /**
   * 设置排序
   * @param s 排序参数条件
   */
  sortBy(s: TQuerySort | TQuerySortArr | Array<TQuerySort | TQuerySortArr>): this {
    if (!isNil(s)) {
      const sort = this.#queryObject.sort ?? [];
      let newSort: TQuerySort[] = [];
      if (this.#assertNestCond<Array<TQuerySort | TQuerySortArr>>(s)) {
        newSort = s.map((o) => this.#parseSortBy(o));
      } else {
        newSort = [this.#parseSortBy(s)];
      }
      this.#queryObject.sort = [...sort, ...newSort];
    }
    return this;
  }

  /**
   * 设置数据数量限制
   * @param n
   */
  setLimit(n: number): this {
    this.#setNumeric(n, 'limit');
    return this;
  }

  /**
   * 设置数据起始位置
   * @param n
   */
  setOffset(n: number): this {
    this.#setNumeric(n, 'offset');
    return this;
  }

  /**
   * 设置页码
   * @param n
   */
  setPage(n: number): this {
    this.#setNumeric(n, 'page');
    return this;
  }

  /**
   * 重置cache功能
   */
  resetCache(): this {
    this.#setNumeric(0, 'cache');
    return this;
  }

  setIncludeDeleted(n: number): this {
    this.#setNumeric(n, 'includeDeleted');
    return this;
  }

  /**
   * 根据参数对象设置对象值
   * @param params
   * @private
   */
  #createFromParams(params: IQueryParamsOptions): this {
    params.fields && this.select(params.fields);
    params.search && this.search(params.search);
    params.filter && this.setFilter(params.filter);
    params.or && this.setOr(params.or);
    params.join && this.setJoin(params.join);
    params.limit && this.setLimit(params.limit);
    params.offset && this.setOffset(params.offset);
    params.page && this.setPage(params.page);
    params.sort && this.sortBy(params.sort);
    if (params.cache) {
      this.resetCache();
    }
    params.includeDeleted && this.setIncludeDeleted(params.includeDeleted);
    return this;
  }

  /**
   * 添加查询条件及校验
   * @param f
   * @param _cond
   * @private
   */
  #cond(f: TQueryFilter | TQueryFilterArr, _cond: 'filter' | 'or' | 'search' = 'search'): TQueryFilter {
    const filter = Array.isArray(f) ? { field: f[0], operator: f[1], value: f[2] } : f;
    if (!isObject(filter) || !isStringFull(filter.field)) {
      throw new ScopeError(`iswork.${this.constructor.name}`, '字段field值应该为字符串');
    }
    if (!comparisonOperatorsList.includes(filter.operator)) {
      throw new ScopeError(
        `iswork.${this.constructor.name}`,
        `字段operator值应该为${comparisonOperatorsList.join('，')}`
      );
    }

    return filter;
  }

  /**
   * 解析联表查询条件及校验
   * @param j
   * @private
   */
  #parseJoin(j: TQueryJoin | TQueryJoinArr): TQueryJoin {
    const join = Array.isArray(j) ? { field: j[0], select: j[1] } : j;
    if (!isObject(join) || !isStringFull(join.field)) {
      throw new ScopeError(`iswork.${this.constructor.name}`, '字段field应该为字符串');
    }
    if (!isUndefined(join.select) && !isArrayStrings(join.select)) {
      throw new ScopeError(`iswork.${this.constructor.name}`, '字段join应该为字符串数组');
    }
    return join;
  }

  /**
   * 添加排序及校验
   * @param s
   * @private
   */
  #parseSortBy(s: TQuerySort | TQuerySortArr): TQuerySort {
    const sort = Array.isArray(s) ? { field: s[0], order: s[1] } : s;
    if (!isObject(sort) || !isStringFull(sort.field)) {
      throw new ScopeError(`iswork.${this.constructor.name}`, '字段field应为字符串');
    }
    if (!sortOrdersList.includes(sort.order)) {
      throw new ScopeError(`iswork.${this.constructor.name}`, `字段order应为${sortOrdersList.join('，')}`);
    }
    return sort;
  }

  /**
   * 设置条件方法
   * @param f
   * @param cond
   * @private
   */
  #setCondition(
    f: TQueryFilter | TQueryFilterArr | Array<TQueryFilter | TQueryFilterArr>,
    cond: 'filter' | 'or'
  ): void {
    if (!isNil(f)) {
      const condValue = this.#queryObject[cond] ?? [];
      let newCondValue: TQueryFilter[] = [];
      if (this.#assertNestCond<Array<TQueryFilter | TQueryFilterArr>>(f)) {
        newCondValue = f.map((o) => this.#cond(o, cond));
      } else {
        newCondValue = [this.#cond(f, cond)];
      }
      this.#queryObject[cond] = [...condValue, ...newCondValue];
    }
  }

  /**
   * 设置数字方法及校验
   * @param n
   * @param cond
   * @private
   */
  #setNumeric(n: number, cond: 'limit' | 'offset' | 'page' | 'cache' | 'includeDeleted'): void {
    if (!isNil(n)) {
      if (!isNumber(n)) {
        throw new ScopeError(`iswork.${this.constructor.name}`, '第一个参数应该为数字');
      }
      this.#queryObject[cond] = n;
    }
  }

  /**
   * 判断是否是嵌套条件
   * @param v
   * @private
   */
  #assertNestCond<Type = unknown>(v: unknown): v is Type {
    return Array.isArray(v) && !isString(v[0]);
  }
}
