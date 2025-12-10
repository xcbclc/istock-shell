[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / CondOperator

# Enumeration: CondOperator

Defined in: enums/index.ts:19

条件操作符枚举

## Description

定义查询条件中使用的各种操作符，支持等值、比较、字符串匹配等操作

## Example

```typescript
// 使用条件操作符进行查询
const query = {
  name: { [CondOperator.EQUALS]: 'John' },
  age: { [CondOperator.GREATER_THAN]: 18 },
  email: { [CondOperator.CONTAINS]: '@example.com' },
};
```

## Enumeration Members

### BETWEEN

> **BETWEEN**: `"$between"`

Defined in: enums/index.ts:49

在指定范围之间

---

### CONTAINS

> **CONTAINS**: `"$cont"`

Defined in: enums/index.ts:37

包含指定字符串

---

### CONTAINS_LOW

> **CONTAINS_LOW**: `"$contL"`

Defined in: enums/index.ts:59

包含指定字符串（忽略大小写）

---

### ENDS

> **ENDS**: `"$ends"`

Defined in: enums/index.ts:35

以指定字符串结束

---

### ENDS_LOW

> **ENDS_LOW**: `"$endsL"`

Defined in: enums/index.ts:57

以指定字符串结束（忽略大小写）

---

### EQUALS

> **EQUALS**: `"$eq"`

Defined in: enums/index.ts:21

等于操作符

---

### EQUALS_LOW

> **EQUALS_LOW**: `"$eqL"`

Defined in: enums/index.ts:51

等于操作符（忽略大小写）

---

### EXCLUDES

> **EXCLUDES**: `"$excl"`

Defined in: enums/index.ts:39

不包含指定字符串

---

### EXCLUDES_LOW

> **EXCLUDES_LOW**: `"$exclL"`

Defined in: enums/index.ts:61

不包含指定字符串（忽略大小写）

---

### GREATER_THAN

> **GREATER_THAN**: `"$gt"`

Defined in: enums/index.ts:25

大于操作符

---

### GREATER_THAN_EQUALS

> **GREATER_THAN_EQUALS**: `"$gte"`

Defined in: enums/index.ts:29

大于等于操作符

---

### IN

> **IN**: `"$in"`

Defined in: enums/index.ts:41

在指定值列表中

---

### IN_LOW

> **IN_LOW**: `"$inL"`

Defined in: enums/index.ts:63

在指定值列表中（忽略大小写）

---

### IS_NULL

> **IS_NULL**: `"$isnull"`

Defined in: enums/index.ts:45

值为空

---

### LOWER_THAN

> **LOWER_THAN**: `"$lt"`

Defined in: enums/index.ts:27

小于操作符

---

### LOWER_THAN_EQUALS

> **LOWER_THAN_EQUALS**: `"$lte"`

Defined in: enums/index.ts:31

小于等于操作符

---

### NOT_EQUALS

> **NOT_EQUALS**: `"$ne"`

Defined in: enums/index.ts:23

不等于操作符

---

### NOT_EQUALS_LOW

> **NOT_EQUALS_LOW**: `"$neL"`

Defined in: enums/index.ts:53

不等于操作符（忽略大小写）

---

### NOT_IN

> **NOT_IN**: `"$notin"`

Defined in: enums/index.ts:43

不在指定值列表中

---

### NOT_IN_LOW

> **NOT_IN_LOW**: `"$notinL"`

Defined in: enums/index.ts:65

不在指定值列表中（忽略大小写）

---

### NOT_NULL

> **NOT_NULL**: `"$notnull"`

Defined in: enums/index.ts:47

值不为空

---

### STARTS

> **STARTS**: `"$starts"`

Defined in: enums/index.ts:33

以指定字符串开始

---

### STARTS_LOW

> **STARTS_LOW**: `"$startsL"`

Defined in: enums/index.ts:55

以指定字符串开始（忽略大小写）
