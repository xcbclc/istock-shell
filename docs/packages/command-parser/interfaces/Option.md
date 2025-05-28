[**@istock-shell/command-parser**](../README.md)

---

[@istock-shell/command-parser](../globals.md) / Option

# Interface: Option

Defined in: parser.ts:73

命令选项接口

定义命令行选项的结构和属性。选项是可选的命名参数，
通常以 - 或 -- 开头，可以在命令行的任意位置出现。

## Example

```typescript
const verboseOption: Option = {
  name: 'verbose',
  parameter: ['v'],
  parameterType: ['boolean'],
  description: '启用详细输出',
  default: false,
};
```

## Properties

### choices?

> `optional` **choices**: (`null` \| `string` \| `number` \| `boolean`)[]

Defined in: parser.ts:93

选项的可选值列表

---

### default?

> `optional` **default**: `any`

Defined in: parser.ts:83

选项的默认值

---

### description?

> `optional` **description**: `string`

Defined in: parser.ts:81

选项的描述信息

---

### max?

> `optional` **max**: `number`

Defined in: parser.ts:91

数值类型选项的最大值

---

### min?

> `optional` **min**: `number`

Defined in: parser.ts:89

数值类型选项的最小值

---

### name

> **name**: `string`

Defined in: parser.ts:75

选项名称

---

### optional?

> `optional` **optional**: `boolean`

Defined in: parser.ts:85

是否为可选选项

---

### parameter

> **parameter**: `string`[]

Defined in: parser.ts:77

选项的参数名称列表，如 ['v', 'verbose']

---

### parameterType

> **parameterType**: `string`[]

Defined in: parser.ts:79

参数类型列表，如 string、number、boolean 等

---

### regex?

> `optional` **regex**: `RegExp`

Defined in: parser.ts:87

用于验证选项值的正则表达式
