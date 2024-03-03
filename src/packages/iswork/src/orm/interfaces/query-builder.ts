import type {
  TQueryFields,
  TQueryFilter,
  TQueryFilterArr,
  TQueryJoin,
  TQueryJoinArr,
  TQuerySort,
  TQuerySortArr,
  TSCondition,
  TParamOptionType,
} from '../types';

export type IParamsOptions = Record<string, IParamOption>;

export interface IParamOption {
  field?: string;
  type?: TParamOptionType;
  primary?: boolean;
  disabled?: boolean;
}

// QueryBuilder选项数据，主要用来传参
export interface IPartialQueryBuilderOptions {
  delim?: string;
  delimStr?: string;
  paramNamesMap?: {
    fields?: string | string[];
    search?: string | string[];
    filter?: string | string[];
    or?: string | string[];
    join?: string | string[];
    sort?: string | string[];
    limit?: string | string[];
    offset?: string | string[];
    page?: string | string[];
    cache?: string | string[];
    includeDeleted?: string | string[];
  };
}

export interface IParsedRequestParams {
  fields: TQueryFields;
  search: TSCondition;
  filter: TQueryFilter[];
  or: TQueryFilter[];
  join: TQueryJoin[];
  sort: TQuerySort[];
  limit: number;
  offset: number;
  page: number;
  cache: number;
  includeDeleted: number;
}

// 查询参数选项
export interface IQueryParamsOptions {
  fields?: TQueryFields;
  search?: TSCondition;
  filter?: TQueryFilter | TQueryFilterArr | Array<TQueryFilter | TQueryFilterArr>;
  or?: TQueryFilter | TQueryFilterArr | Array<TQueryFilter | TQueryFilterArr>;
  join?: TQueryJoin | TQueryJoinArr | Array<TQueryJoin | TQueryJoinArr>;
  sort?: TQuerySort | TQuerySortArr | Array<TQuerySort | TQuerySortArr>;
  limit?: number;
  offset?: number;
  page?: number;
  cache?: number;
  includeDeleted?: number;
}
