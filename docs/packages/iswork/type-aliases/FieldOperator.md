[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / FieldOperator

# Type Alias: FieldOperator

> **FieldOperator** = `object`

Defined in: orm/types/query-builder.ts:177

字段操作符类型

## Description

定义查询字段可使用的各种条件操作符

## Example

```typescript
const fieldCondition: FieldOperator = {
  $eq: 'John',
  $gt: 18,
};
```

## Properties

### $and?

> `optional` **$and**: `never`

Defined in: orm/types/query-builder.ts:227

与条件操作符（禁用）

---

### $between?

> `optional` **$between**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:203

在指定范围之间

---

### $cont?

> `optional` **$cont**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:195

包含指定字符串

---

### $contL?

> `optional` **$contL**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:217

包含指定字符串（忽略大小写）

---

### $ends?

> `optional` **$ends**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:193

以指定字符串结束

---

### $endsL?

> `optional` **$endsL**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:215

以指定字符串结束（忽略大小写）

---

### $eq?

> `optional` **$eq**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:179

等于操作符

---

### $eqL?

> `optional` **$eqL**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:209

等于操作符（忽略大小写）

---

### $excl?

> `optional` **$excl**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:197

不包含指定字符串

---

### $exclL?

> `optional` **$exclL**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:219

不包含指定字符串（忽略大小写）

---

### $gt?

> `optional` **$gt**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:183

大于操作符

---

### $gte?

> `optional` **$gte**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:187

大于等于操作符

---

### $in?

> `optional` **$in**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:199

在指定值列表中

---

### $inL?

> `optional` **$inL**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:221

在指定值列表中（忽略大小写）

---

### $isnull?

> `optional` **$isnull**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:205

值为空

---

### $lt?

> `optional` **$lt**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:185

小于操作符

---

### $lte?

> `optional` **$lte**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:189

小于等于操作符

---

### $ne?

> `optional` **$ne**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:181

不等于操作符

---

### $neL?

> `optional` **$neL**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:211

不等于操作符（忽略大小写）

---

### $notin?

> `optional` **$notin**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:201

不在指定值列表中

---

### $notinL?

> `optional` **$notinL**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:223

不在指定值列表中（忽略大小写）

---

### $notnull?

> `optional` **$notnull**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:207

值不为空

---

### $or?

> `optional` **$or**: `FieldOperator`

Defined in: orm/types/query-builder.ts:225

或条件操作符

---

### $starts?

> `optional` **$starts**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:191

以指定字符串开始

---

### $startsL?

> `optional` **$startsL**: [`FiledValues`](FiledValues.md)

Defined in: orm/types/query-builder.ts:213

以指定字符串开始（忽略大小写）
