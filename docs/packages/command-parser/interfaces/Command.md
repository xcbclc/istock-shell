[**@istock-shell/command-parser**](../README.md)

---

[@istock-shell/command-parser](../globals.md) / Command

# Interface: Command

Defined in: parser.ts:123

命令接口

定义完整命令的结构，包括命令名称、描述、参数、选项、
子命令和执行动作。这是命令解析器的核心数据结构。

## Example

```typescript
const copyCommand: Command = {
  name: 'copy',
  cmd: 'copy',
  description: '复制文件或目录',
  arguments: [
    { name: 'source', parameterType: ['string'], optional: false },
    { name: 'destination', parameterType: ['string'], optional: false },
  ],
  options: [{ name: 'recursive', parameter: ['r'], parameterType: ['boolean'] }],
  callback: (args) => {
    // 执行复制操作
  },
};
```

## Properties

### arguments?

> `optional` **arguments**: [`Argument`](Argument.md)[]

Defined in: parser.ts:135

参数

---

### callback()?

> `optional` **callback**: (`args`) => `void`

Defined in: parser.ts:139

回调函数

#### Parameters

##### args

`any`

#### Returns

`void`

---

### cmd

> **cmd**: `string`

Defined in: parser.ts:127

命令

---

### commands?

> `optional` **commands**: `Command`[]

Defined in: parser.ts:137

子命令列表

---

### description?

> `optional` **description**: `string`

Defined in: parser.ts:131

命令描述

---

### name

> **name**: `string`

Defined in: parser.ts:125

命令名称

---

### options?

> `optional` **options**: [`Option`](Option.md)[]

Defined in: parser.ts:133

选项参数列表

---

### usage?

> `optional` **usage**: `string`

Defined in: parser.ts:129

用法
