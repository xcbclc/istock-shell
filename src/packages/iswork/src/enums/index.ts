export enum ECondOperator {
  EQUALS = '$eq',
  NOT_EQUALS = '$ne',
  GREATER_THAN = '$gt',
  LOWER_THAN = '$lt',
  GREATER_THAN_EQUALS = '$gte',
  LOWER_THAN_EQUALS = '$lte',
  STARTS = '$starts',
  ENDS = '$ends',
  CONTAINS = '$cont',
  EXCLUDES = '$excl',
  IN = '$in',
  NOT_IN = '$notin',
  IS_NULL = '$isnull',
  NOT_NULL = '$notnull',
  BETWEEN = '$between',
  EQUALS_LOW = '$eqL',
  NOT_EQUALS_LOW = '$neL',
  STARTS_LOW = '$startsL',
  ENDS_LOW = '$endsL',
  CONTAINS_LOW = '$contL',
  EXCLUDES_LOW = '$exclL',
  IN_LOW = '$inL',
  NOT_IN_LOW = '$notinL',
}

export enum EMethodNameFilter {
  ALL = 'all',
  METHOD = 'method',
  ACCESSOR = 'accessor',
}

export enum EDecoratorType {
  Class,
  Property,
  Method,
  Parameter,
}

export enum EDecoratorCallbackType {
  None, // 默认值
  MethodRequest,
  MethodResponse,
}

export enum EMessageStatus {
  COMPLETE = 299, // 消息传输完成
}

export enum EMessageCmdAction {
  APPEND, // 新增
  REPLACE, // 替换
}
