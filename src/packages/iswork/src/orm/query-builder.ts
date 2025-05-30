/**
 * @fileoverview ORM 查询构建器
 * @description 提供灵活的查询构建功能，支持字段选择、过滤、排序、分页、连接等操作
 */

import { parse, stringify } from 'qs';
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
} from '@istock-shell/util';
import { CondOperator } from '../enums';
import type { ParsedRequestParams, PartialQueryBuilderOptions, QueryParamsOptions } from './interfaces';
import type {
  QueryFields,
  QueryFilter,
  QueryFilterArr,
  QueryJoin,
  QueryJoinArr,
  QuerySort,
  QuerySortArr,
  SearchCondition,
} from './types';

/**
 * 查询构建器选项类型
 * @description QueryBuilder 的完整选项配置类型
 */
export type QueryBuilderOptions = Required<PartialQueryBuilderOptions> & {
  paramNamesMap: Required<PartialQueryBuilderOptions['paramNamesMap']>;
};

/**
 * 查询构建器选项键类型
 * @description paramNamesMap 的键类型
 */
export type QueryBuilderOptionsKeys = keyof QueryParamsOptions;

/** 排序方向列表 */
export const sortOrdersList = ['ASC', 'DESC'];

/**
 * 比较操作符列表
 * @description 支持的比较操作符：
 * - eq (=, equal) - 等于
 * - ne (!=, not equal) - 不等于
 * - gt (>, greater than) - 大于
 * - lt (<, lower that) - 小于
 * - gte (>=, greater than or equal) - 大于等于
 * - lte (<=, lower than or equal) - 小于等于
 * - starts (LIKE val%, starts with) - 以...开始
 * - ends (LIKE %val, ends with) - 以...结束
 * - cont (LIKE %val%, contains) - 包含
 * - excl (NOT LIKE %val%, not contains) - 不包含
 * - in (IN, in range, accepts multiple values) - 在范围内
 * - notin (NOT IN, not in range, accepts multiple values) - 不在范围内
 * - isnull (IS NULL, is NULL, doesn't accept value) - 为空
 * - notnull (IS NOT NULL, not NULL, doesn't accept value) - 不为空
 * - between (BETWEEN, between, accepts two values) - 在两值之间
 * - eqL (LOWER(field) =, equal) - 小写等于
 * - neL (LOWER(field) !=, not equal) - 小写不等于
 * - startsL (LIKE|ILIKE val%) - 小写以...开始
 * - endsL (LIKE|ILIKE %val, ends with) - 小写以...结束
 * - contL (LIKE|ILIKE %val%, contains) - 小写包含
 * - exclL (NOT LIKE|ILIKE %val%, not contains) - 小写不包含
 * - inL (LOWER(field) IN, in range, accepts multiple values) - 小写在范围内
 * - notinL (LOWER(field) NOT IN, not in range, accepts multiple values) - 小写不在范围内
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

/** 完整的比较操作符列表 */
export const comparisonOperatorsList = [
  ...deprecatedComparisonOperatorsList,
  ...Object.values(CondOperator).map((n) => n),
];

/**
 * 查询构建器类
 * @description 提供链式调用的查询构建功能，支持字段选择、过滤、排序、分页等操作
 * @example
 * ```typescript
 * const qb = QueryBuilder.create()
 *   .select(['id', 'name', 'email'])
 *   .where({ name: { $cont: 'john' } })
 *   .sort([{ field: 'createdAt', order: 'DESC' }])
 *   .limit(10)
 *   .offset(0);
 *
 * const queryString = qb.query();
 * // 输出: fields=id,name,email&filter=name||$cont||john&sort=createdAt,DESC&limit=10&offset=0
 * ```
 */
export class QueryBuilder {
  static #options: QueryBuilderOptions = {
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
  static setOptions(options: PartialQueryBuilderOptions) {
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
   * @return PartialQueryBuilderOptions QueryBuilder选项
   */
  static getOptions(): PartialQueryBuilderOptions {
    return QueryBuilder.#options;
  }

  /**
   * QueryBuilder工厂方法，创建一个QueryBuilder实例
   * @param params 查询参数选项
   */
  static create(params?: QueryParamsOptions | string): QueryBuilder {
    const qb = new QueryBuilder(params);
    return qb;
  }

  #queryString: string = '';

  #queryObject: Partial<ParsedRequestParams> = {};

  /**
   * 获取参数
   */
  get options(): QueryBuilderOptions {
    return QueryBuilder.#options;
  }

  /**
   * @param params 查询字符串
   */
  constructor(params?: string | QueryParamsOptions) {
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
  select(fields: QueryFields): this {
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
  search(s: SearchCondition) {
    if (!isNil(s) && isObject(s)) {
      this.#queryObject.search = s;
    }
    return this;
  }

  /**
   * 设置过滤
   * @param f 过滤条件
   */
  setFilter(f: QueryFilter | QueryFilterArr | Array<QueryFilter | QueryFilterArr>): this {
    this.#setCondition(f, 'filter');
    return this;
  }

  /**
   * 设置或逻辑
   * @param f 过滤条件
   */
  setOr(f: QueryFilter | QueryFilterArr | Array<QueryFilter | QueryFilterArr>): this {
    this.#setCondition(f, 'or');
    return this;
  }

  /**
   * 设置联表查询
   * @param j 联表查询选项
   */
  setJoin(j: QueryJoin | QueryJoinArr | Array<QueryJoin | QueryJoinArr>): this {
    if (!isNil(j)) {
      const join = this.#queryObject.join ?? [];
      let newJoin: QueryJoin[] = [];
      if (this.#assertNestCond<Array<QueryJoin | QueryJoinArr>>(j)) {
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
  sortBy(s: QuerySort | QuerySortArr | Array<QuerySort | QuerySortArr>): this {
    if (!isNil(s)) {
      const sort = this.#queryObject.sort ?? [];
      let newSort: QuerySort[] = [];
      if (this.#assertNestCond<Array<QuerySort | QuerySortArr>>(s)) {
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
  #createFromParams(params: QueryParamsOptions): this {
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
  #cond(f: QueryFilter | QueryFilterArr, _cond: 'filter' | 'or' | 'search' = 'search'): QueryFilter {
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
  #parseJoin(j: QueryJoin | QueryJoinArr): QueryJoin {
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
  #parseSortBy(s: QuerySort | QuerySortArr): QuerySort {
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
  #setCondition(f: QueryFilter | QueryFilterArr | Array<QueryFilter | QueryFilterArr>, cond: 'filter' | 'or'): void {
    if (!isNil(f)) {
      const condValue = this.#queryObject[cond] ?? [];
      let newCondValue: QueryFilter[] = [];
      if (this.#assertNestCond<Array<QueryFilter | QueryFilterArr>>(f)) {
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
