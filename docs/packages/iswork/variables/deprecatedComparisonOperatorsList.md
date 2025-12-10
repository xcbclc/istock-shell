[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / deprecatedComparisonOperatorsList

# Variable: deprecatedComparisonOperatorsList

> `const` **deprecatedComparisonOperatorsList**: `string`[]

Defined in: orm/query-builder.ts:75

比较操作符列表

## Description

支持的比较操作符：

- eq (=, equal) - 等于
- ne (!=, not equal) - 不等于
- gt (>, greater than) - 大于
- lt (<, lower that) - 小于
- gte (>=, greater than or equal) - 大于等于
- lte (<=, lower than or equal) - 小于等于
- starts (LIKE val%, starts with) - 以...开始
- ends (LIKE %val, ends with) - 以...结束
- cont (LIKE %val%, contains) - 包含
- excl (NOT LIKE %val%, not contains) - 不包含
- in (IN, in range, accepts multiple values) - 在范围内
- notin (NOT IN, not in range, accepts multiple values) - 不在范围内
- isnull (IS NULL, is NULL, doesn't accept value) - 为空
- notnull (IS NOT NULL, not NULL, doesn't accept value) - 不为空
- between (BETWEEN, between, accepts two values) - 在两值之间
- eqL (LOWER(field) =, equal) - 小写等于
- neL (LOWER(field) !=, not equal) - 小写不等于
- startsL (LIKE|ILIKE val%) - 小写以...开始
- endsL (LIKE|ILIKE %val, ends with) - 小写以...结束
- contL (LIKE|ILIKE %val%, contains) - 小写包含
- exclL (NOT LIKE|ILIKE %val%, not contains) - 小写不包含
- inL (LOWER(field) IN, in range, accepts multiple values) - 小写在范围内
- notinL (LOWER(field) NOT IN, not in range, accepts multiple values) - 小写不在范围内
