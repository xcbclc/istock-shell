import type { IQueryParamsOptions } from '../interfaces';
import type { QueryBuilder } from '../query-builder';

export type TParamOptionType = 'number' | 'string' | 'uuid';

// orm查询参数
export type TOrmQuery = string | IQueryParamsOptions | QueryBuilder;

// 查询字段类型
export type TQueryFields = string[];

// 排序操作符
export type TQuerySortOperator = 'ASC' | 'DESC';

// 字段排序对象表示
export type TQuerySort = {
  field: string;
  order: TQuerySortOperator;
};

// 字段排序数组表示
export type TQuerySortArr = [string, TQuerySortOperator];

// 条件操作符
export type TSConditionKey = '$and' | '$or';

// 联表查询对象表示
export type TQueryJoin = {
  field: string;
  select?: TQueryFields;
};

// 联表查询数组表示
export type TQueryJoinArr = [string, TQueryFields?];

// 查询基本值
export type TSPrimitivesVal = string | number | boolean;

// 查询字段值
export type TSFiledValues = TSPrimitivesVal | TSPrimitivesVal[];

// 条件操作符
export type TDeprecatedCondOperator =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'lt'
  | 'gte'
  | 'lte'
  | 'starts'
  | 'ends'
  | 'cont'
  | 'excl'
  | 'in'
  | 'notin'
  | 'isnull'
  | 'notnull'
  | 'between';

// 查询字段条件
export type TSFieldOperator = {
  $eq?: TSFiledValues;
  $ne?: TSFiledValues;
  $gt?: TSFiledValues;
  $lt?: TSFiledValues;
  $gte?: TSFiledValues;
  $lte?: TSFiledValues;
  $starts?: TSFiledValues;
  $ends?: TSFiledValues;
  $cont?: TSFiledValues;
  $excl?: TSFiledValues;
  $in?: TSFiledValues;
  $notin?: TSFiledValues;
  $between?: TSFiledValues;
  $isnull?: TSFiledValues;
  $notnull?: TSFiledValues;
  $eqL?: TSFiledValues;
  $neL?: TSFiledValues;
  $startsL?: TSFiledValues;
  $endsL?: TSFiledValues;
  $contL?: TSFiledValues;
  $exclL?: TSFiledValues;
  $inL?: TSFiledValues;
  $notinL?: TSFiledValues;
  $or?: TSFieldOperator;
  $and?: never;
};

// 条件操作
export type TComparisonOperator = TDeprecatedCondOperator | keyof TSFieldOperator;

// 查询过滤条件对象表示
export type TQueryFilter = {
  field: string;
  operator: TComparisonOperator;
  value?: any;
};

// 查询过滤条件数组表示
export type TQueryFilterArr = [string, TComparisonOperator, any?];

// 字段查询
export type TSField = TSPrimitivesVal | TSFieldOperator;

// 多个字段查询
export type TSFields = {
  [key: string]: TSField | Array<TSFields | TSConditionAND> | undefined;
  $or?: Array<TSFields | TSConditionAND>;
  $and?: never;
};

// and条件
export type TSConditionAND = {
  $and?: Array<TSFields | TSConditionAND>;
  $or?: never;
};

// 整个条件查询
export type TSCondition = TSFields | TSConditionAND;
