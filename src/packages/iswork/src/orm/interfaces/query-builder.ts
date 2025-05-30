/**
 * @fileoverview 查询构建器接口定义
 * @description 定义查询构建器相关的接口和类型
 */

import type {
  QueryFields,
  QueryFilter,
  QueryFilterArr,
  QueryJoin,
  QueryJoinArr,
  QuerySort,
  QuerySortArr,
  SearchCondition,
  ParamOptionType,
} from '../types';

/**
 * 参数选项映射类型
 * @description 参数选项的键值对映射
 */
export type ParamsOptions = Record<string, ParamOptionBase>;

/**
 * 参数选项基础接口
 * @description 定义参数选项的基础结构
 */
export interface ParamOptionBase {
  /** 字段名称 */
  field?: string;
  /** 参数类型 */
  type?: ParamOptionType;
  /** 是否为主键 */
  primary?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 部分查询构建器选项接口
 * @description QueryBuilder 的部分配置选项，主要用于传参
 * @example
 * ```typescript
 * const options: PartialQueryBuilderOptions = {
 *   delim: '&',
 *   delimStr: ',',
 *   paramNamesMap: {
 *     fields: 'select',
 *     filter: 'where'
 *   }
 * };
 * ```
 */
export interface PartialQueryBuilderOptions {
  /** 参数分隔符 */
  delim?: string;
  /** 字符串分隔符 */
  delimStr?: string;
  /** 参数名称映射 */
  paramNamesMap?: {
    /** 字段参数名 */
    fields?: string | string[];
    /** 搜索参数名 */
    search?: string | string[];
    /** 过滤参数名 */
    filter?: string | string[];
    /** 或条件参数名 */
    or?: string | string[];
    /** 连接参数名 */
    join?: string | string[];
    /** 排序参数名 */
    sort?: string | string[];
    /** 限制参数名 */
    limit?: string | string[];
    /** 偏移参数名 */
    offset?: string | string[];
    /** 页码参数名 */
    page?: string | string[];
    /** 缓存参数名 */
    cache?: string | string[];
    /** 包含已删除参数名 */
    includeDeleted?: string | string[];
  };
}

/**
 * 解析后的请求参数接口
 * @description 解析后的标准化查询参数
 * @example
 * ```typescript
 * const params: ParsedRequestParams = {
 *   fields: ['id', 'name'],
 *   search: { name: 'john' },
 *   filter: [['status', 'eq', 'active']],
 *   or: [],
 *   join: [],
 *   sort: [['createdAt', 'DESC']],
 *   limit: 10,
 *   offset: 0,
 *   page: 1,
 *   cache: 0,
 *   includeDeleted: 0
 * };
 * ```
 */
export interface ParsedRequestParams {
  /** 查询字段 */
  fields: QueryFields;
  /** 搜索条件 */
  search: SearchCondition;
  /** 过滤条件 */
  filter: QueryFilter[];
  /** 或条件 */
  or: QueryFilter[];
  /** 连接条件 */
  join: QueryJoin[];
  /** 排序条件 */
  sort: QuerySort[];
  /** 限制数量 */
  limit: number;
  /** 偏移量 */
  offset: number;
  /** 页码 */
  page: number;
  /** 缓存设置 */
  cache: number;
  /** 是否包含已删除记录 */
  includeDeleted: number;
}

/**
 * 查询参数选项接口
 * @description 定义查询操作的参数选项
 * @example
 * ```typescript
 * const queryOptions: QueryParamsOptions = {
 *   fields: ['id', 'name', 'email'],
 *   filter: ['status', 'eq', 'active'],
 *   sort: ['createdAt', 'DESC'],
 *   limit: 20,
 *   page: 1
 * };
 * ```
 */
export interface QueryParamsOptions {
  /** 查询字段 */
  fields?: QueryFields;
  /** 搜索条件 */
  search?: SearchCondition;
  /** 过滤条件 */
  filter?: QueryFilter | QueryFilterArr | Array<QueryFilter | QueryFilterArr>;
  /** 或条件 */
  or?: QueryFilter | QueryFilterArr | Array<QueryFilter | QueryFilterArr>;
  /** 连接条件 */
  join?: QueryJoin | QueryJoinArr | Array<QueryJoin | QueryJoinArr>;
  /** 排序条件 */
  sort?: QuerySort | QuerySortArr | Array<QuerySort | QuerySortArr>;
  /** 限制数量 */
  limit?: number;
  /** 偏移量 */
  offset?: number;
  /** 页码 */
  page?: number;
  /** 缓存设置 */
  cache?: number;
  /** 是否包含已删除记录 */
  includeDeleted?: number;
}
