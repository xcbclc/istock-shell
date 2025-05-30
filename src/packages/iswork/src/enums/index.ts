/**
 * @fileoverview 枚举类型定义
 * @description 定义了系统中使用的各种枚举类型，包括条件操作符、方法过滤器、装饰器类型等
 */

/**
 * 条件操作符枚举
 * @description 定义查询条件中使用的各种操作符，支持等值、比较、字符串匹配等操作
 * @example
 * ```typescript
 * // 使用条件操作符进行查询
 * const query = {
 *   name: { [CondOperator.EQUALS]: 'John' },
 *   age: { [CondOperator.GREATER_THAN]: 18 },
 *   email: { [CondOperator.CONTAINS]: '@example.com' }
 * };
 * ```
 */
export enum CondOperator {
  /** 等于操作符 */
  EQUALS = '$eq',
  /** 不等于操作符 */
  NOT_EQUALS = '$ne',
  /** 大于操作符 */
  GREATER_THAN = '$gt',
  /** 小于操作符 */
  LOWER_THAN = '$lt',
  /** 大于等于操作符 */
  GREATER_THAN_EQUALS = '$gte',
  /** 小于等于操作符 */
  LOWER_THAN_EQUALS = '$lte',
  /** 以指定字符串开始 */
  STARTS = '$starts',
  /** 以指定字符串结束 */
  ENDS = '$ends',
  /** 包含指定字符串 */
  CONTAINS = '$cont',
  /** 不包含指定字符串 */
  EXCLUDES = '$excl',
  /** 在指定值列表中 */
  IN = '$in',
  /** 不在指定值列表中 */
  NOT_IN = '$notin',
  /** 值为空 */
  IS_NULL = '$isnull',
  /** 值不为空 */
  NOT_NULL = '$notnull',
  /** 在指定范围之间 */
  BETWEEN = '$between',
  /** 等于操作符（忽略大小写） */
  EQUALS_LOW = '$eqL',
  /** 不等于操作符（忽略大小写） */
  NOT_EQUALS_LOW = '$neL',
  /** 以指定字符串开始（忽略大小写） */
  STARTS_LOW = '$startsL',
  /** 以指定字符串结束（忽略大小写） */
  ENDS_LOW = '$endsL',
  /** 包含指定字符串（忽略大小写） */
  CONTAINS_LOW = '$contL',
  /** 不包含指定字符串（忽略大小写） */
  EXCLUDES_LOW = '$exclL',
  /** 在指定值列表中（忽略大小写） */
  IN_LOW = '$inL',
  /** 不在指定值列表中（忽略大小写） */
  NOT_IN_LOW = '$notinL',
}

/**
 * 方法名过滤器枚举
 * @description 定义方法扫描时的过滤类型
 */
export enum MethodNameFilter {
  /** 所有方法和访问器 */
  ALL = 'all',
  /** 仅方法 */
  METHOD = 'method',
  /** 仅访问器 */
  ACCESSOR = 'accessor',
}

/**
 * 装饰器类型枚举
 * @description 定义装饰器可以应用的目标类型
 */
export enum DecoratorType {
  /** 类装饰器 */
  Class,
  /** 属性装饰器 */
  Property,
  /** 方法装饰器 */
  Method,
  /** 参数装饰器 */
  Parameter,
}

/**
 * 装饰器回调类型枚举
 * @description 定义装饰器回调函数的执行时机
 */
export enum DecoratorCallbackType {
  /** 无回调（默认值） */
  None,
  /** 方法请求时回调 */
  MethodRequest,
  /** 方法响应时回调 */
  MethodResponse,
}

/**
 * 消息状态枚举
 * @description 定义消息传输的状态码
 */
export enum MessageStatus {
  /** 消息传输完成 */
  COMPLETE = 299,
}

/**
 * 消息命令动作枚举
 * @description 定义消息命令的操作类型
 */
export enum MessageCmdAction {
  /** 新增操作 */
  APPEND,
  /** 替换操作 */
  REPLACE,
}
