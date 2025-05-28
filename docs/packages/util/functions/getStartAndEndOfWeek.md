[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / getStartAndEndOfWeek

# Function: getStartAndEndOfWeek()

> **getStartAndEndOfWeek**(`today`): `object`

Defined in: src/packages/util/src/date.ts:35

获取指定日期所在周的起止时间。

## Parameters

### today

`Date`

任意一周中的某一天

## Returns

`object`

包含本周起止时间的对象

### endOfWeek

> **endOfWeek**: `Date`

### startOfWeek

> **startOfWeek**: `Date`

## Example

```ts
getStartAndEndOfWeek(new Date());
```
