[**@istock-shell/command-parser**](../README.md)

---

[@istock-shell/command-parser](../globals.md) / Argument

# Interface: Argument

Defined in: parser.ts:33

命令参数接口

定义命令行位置参数的结构和属性。位置参数是按照特定顺序出现的命令行参数，
不需要前缀标识符，直接跟在命令名称后面。

## Example

```typescript
const fileArgument: Argument = {
  name: 'file',
  parameterType: ['string'],
  description: '要处理的文件路径',
  optional: false,
};
```

## Properties

### choices?

> `optional` **choices**: (`null` \| `string` \| `number` \| `boolean`)[]

Defined in: parser.ts:51

参数的可选值列表

---

### default?

> `optional` **default**: `any`

Defined in: parser.ts:41

参数的默认值

---

### description?

> `optional` **description**: `string`

Defined in: parser.ts:39

参数的描述信息

---

### max?

> `optional` **max**: `number`

Defined in: parser.ts:49

数值类型参数的最大值

---

### min?

> `optional` **min**: `number`

Defined in: parser.ts:47

数值类型参数的最小值

---

### name

> **name**: `string`

Defined in: parser.ts:35

参数名称

---

### optional?

> `optional` **optional**: `boolean`

Defined in: parser.ts:43

是否为可选参数

---

### parameterType

> **parameterType**: `string`[]

Defined in: parser.ts:37

参数类型列表，如 string、number、boolean 等

---

### regex?

> `optional` **regex**: `RegExp`

Defined in: parser.ts:45

用于验证参数值的正则表达式
