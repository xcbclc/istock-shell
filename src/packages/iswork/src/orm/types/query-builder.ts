/**
 * @fileoverview 查询构建器类型定义
 * @description 定义 ORM 查询构建器使用的所有类型，包括查询参数、排序、过滤条件等
 */

import type { QueryParamsOptions } from '../interfaces';
import type { QueryBuilder } from '../query-builder';

/**
 * 参数选项类型
 * @description 定义查询参数的数据类型
 * @example
 * ```typescript
 * const paramType: ParamOptionType = 'string';
 * ```
 */
export type ParamOptionType = 'number' | 'string' | 'uuid';

/**
 * ORM 查询参数类型
 * @description 定义 ORM 查询可接受的参数类型，支持字符串、查询选项对象或查询构建器
 * @example
 * ```typescript
 * const query1: OrmQuery = 'SELECT * FROM users';
 * const query2: OrmQuery = { where: { name: 'John' } };
 * const query3: OrmQuery = new QueryBuilder().select('*').from('users');
 * ```
 */
export type OrmQuery = string | QueryParamsOptions | QueryBuilder;

/**
 * 查询字段类型
 * @description 定义查询中选择的字段列表
 * @example
 * ```typescript
 * const fields: QueryFields = ['id', 'name', 'email'];
 * ```
 */
export type QueryFields = string[];

/**
 * 排序操作符类型
 * @description 定义查询结果的排序方向
 * @example
 * ```typescript
 * const sortOrder: QuerySortOperator = 'ASC';
 * ```
 */
export type QuerySortOperator = 'ASC' | 'DESC';

/**
 * 字段排序对象类型
 * @description 定义字段排序的对象表示形式
 * @example
 * ```typescript
 * const sort: QuerySort = {
 *   field: 'created_at',
 *   order: 'DESC'
 * };
 * ```
 */
export type QuerySort = {
  /** 排序字段名 */
  field: string;
  /** 排序方向 */
  order: QuerySortOperator;
};

/**
 * 字段排序数组类型
 * @description 定义字段排序的数组表示形式
 * @example
 * ```typescript
 * const sortArr: QuerySortArr = ['created_at', 'DESC'];
 * ```
 */
export type QuerySortArr = [string, QuerySortOperator];

/**
 * 条件操作符键类型
 * @description 定义逻辑条件操作符的键名
 * @example
 * ```typescript
 * const conditionKey: ConditionKey = '$and';
 * ```
 */
export type ConditionKey = '$and' | '$or';

/**
 * 联表查询对象类型
 * @description 定义联表查询的对象表示形式
 * @example
 * ```typescript
 * const join: QueryJoin = {
 *   field: 'user_id',
 *   select: ['id', 'name']
 * };
 * ```
 */
export type QueryJoin = {
  /** 联表字段名 */
  field: string;
  /** 选择的字段列表 */
  select?: QueryFields;
};

/**
 * 联表查询数组类型
 * @description 定义联表查询的数组表示形式
 * @example
 * ```typescript
 * const joinArr: QueryJoinArr = ['user_id', ['id', 'name']];
 * ```
 */
export type QueryJoinArr = [string, QueryFields?];

/**
 * 查询基本值类型
 * @description 定义查询中可使用的基本数据类型
 * @example
 * ```typescript
 * const value1: PrimitivesVal = 'John';
 * const value2: PrimitivesVal = 25;
 * const value3: PrimitivesVal = true;
 * ```
 */
export type PrimitivesVal = string | number | boolean;

/**
 * 查询字段值类型
 * @description 定义查询字段可接受的值类型，支持单个值或值数组
 * @example
 * ```typescript
 * const singleValue: FiledValues = 'John';
 * const multipleValues: FiledValues = ['John', 'Jane', 'Bob'];
 * ```
 */
export type FiledValues = PrimitivesVal | PrimitivesVal[];

/**
 * 已弃用的条件操作符类型
 * @description 定义旧版本的条件操作符，保持向后兼容性
 * @deprecated 建议使用新的 FieldOperator 类型
 * @example
 * ```typescript
 * const operator: DeprecatedCondOperator = 'eq';
 * ```
 */
export type DeprecatedCondOperator =
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

/**
 * 字段操作符类型
 * @description 定义查询字段可使用的各种条件操作符
 * @example
 * ```typescript
 * const fieldCondition: FieldOperator = {
 *   $eq: 'John',
 *   $gt: 18
 * };
 * ```
 */
export type FieldOperator = {
  /** 等于操作符 */
  $eq?: FiledValues;
  /** 不等于操作符 */
  $ne?: FiledValues;
  /** 大于操作符 */
  $gt?: FiledValues;
  /** 小于操作符 */
  $lt?: FiledValues;
  /** 大于等于操作符 */
  $gte?: FiledValues;
  /** 小于等于操作符 */
  $lte?: FiledValues;
  /** 以指定字符串开始 */
  $starts?: FiledValues;
  /** 以指定字符串结束 */
  $ends?: FiledValues;
  /** 包含指定字符串 */
  $cont?: FiledValues;
  /** 不包含指定字符串 */
  $excl?: FiledValues;
  /** 在指定值列表中 */
  $in?: FiledValues;
  /** 不在指定值列表中 */
  $notin?: FiledValues;
  /** 在指定范围之间 */
  $between?: FiledValues;
  /** 值为空 */
  $isnull?: FiledValues;
  /** 值不为空 */
  $notnull?: FiledValues;
  /** 等于操作符（忽略大小写） */
  $eqL?: FiledValues;
  /** 不等于操作符（忽略大小写） */
  $neL?: FiledValues;
  /** 以指定字符串开始（忽略大小写） */
  $startsL?: FiledValues;
  /** 以指定字符串结束（忽略大小写） */
  $endsL?: FiledValues;
  /** 包含指定字符串（忽略大小写） */
  $contL?: FiledValues;
  /** 不包含指定字符串（忽略大小写） */
  $exclL?: FiledValues;
  /** 在指定值列表中（忽略大小写） */
  $inL?: FiledValues;
  /** 不在指定值列表中（忽略大小写） */
  $notinL?: FiledValues;
  /** 或条件操作符 */
  $or?: FieldOperator;
  /** 与条件操作符（禁用） */
  $and?: never;
};

/**
 * 比较操作符类型
 * @description 定义所有可用的比较操作符，包括已弃用和新版本的操作符
 * @example
 * ```typescript
 * const operator: ComparisonOperator = '$eq';
 * ```
 */
export type ComparisonOperator = DeprecatedCondOperator | keyof FieldOperator;

/**
 * 查询过滤条件对象类型
 * @description 定义查询过滤条件的对象表示形式
 * @example
 * ```typescript
 * const filter: QueryFilter = {
 *   field: 'age',
 *   operator: '$gt',
 *   value: 18
 * };
 * ```
 */
export type QueryFilter = {
  /** 字段名 */
  field: string;
  /** 操作符 */
  operator: ComparisonOperator;
  /** 比较值 */
  value?: any;
};

/**
 * 查询过滤条件数组类型
 * @description 定义查询过滤条件的数组表示形式
 * @example
 * ```typescript
 * const filterArr: QueryFilterArr = ['age', '$gt', 18];
 * ```
 */
export type QueryFilterArr = [string, ComparisonOperator, any?];

/**
 * 搜索字段类型
 * @description 定义单个字段的搜索条件，可以是基本值或字段操作符
 * @example
 * ```typescript
 * const searchField1: SearchField = 'John';
 * const searchField2: SearchField = { $gt: 18 };
 * ```
 */
export type SearchField = PrimitivesVal | FieldOperator;

/**
 * 多字段搜索类型
 * @description 定义多个字段的搜索条件，支持复杂的逻辑组合
 * @example
 * ```typescript
 * const searchFields: SearchFields = {
 *   name: 'John',
 *   age: { $gt: 18 },
 *   $or: [{ status: 'active' }, { role: 'admin' }]
 * };
 * ```
 */
export type SearchFields = {
  /** 动态字段搜索条件 */
  [key: string]: SearchField | Array<SearchFields | ConditionAND> | undefined;
  /** 或条件操作符 */
  $or?: Array<SearchFields | ConditionAND>;
  /** 与条件操作符（禁用） */
  $and?: never;
};

/**
 * AND 条件类型
 * @description 定义 AND 逻辑条件的结构
 * @example
 * ```typescript
 * const andCondition: ConditionAND = {
 *   $and: [
 *     { name: 'John' },
 *     { age: { $gt: 18 } }
 *   ]
 * };
 * ```
 */
export type ConditionAND = {
  /** 与条件操作符 */
  $and?: Array<SearchFields | ConditionAND>;
  /** 或条件操作符（禁用） */
  $or?: never;
};

/**
 * 搜索条件类型
 * @description 定义完整的搜索条件，可以是多字段搜索或 AND 条件
 * @example
 * ```typescript
 * const condition1: SearchCondition = { name: 'John', age: { $gt: 18 } };
 * const condition2: SearchCondition = {
 *   $and: [{ name: 'John' }, { age: { $gt: 18 } }]
 * };
 * ```
 */
export type SearchCondition = SearchFields | ConditionAND;
