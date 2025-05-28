[**@istock-shell/command-parser**](../README.md)

---

[@istock-shell/command-parser](../globals.md) / CommandPipeResult

# Type Alias: CommandPipeResult

> **CommandPipeResult** = `object`

Defined in: parser.ts:199

管道操作符解析结果

表示命令之间的管道连接操作符（如 |、&、||、&& 等）

## Properties

### type

> **type**: [`pipe`](../enumerations/AstTreeType.md#pipe)

Defined in: parser.ts:201

结果类型，固定为管道类型

---

### value

> **value**: `string`

Defined in: parser.ts:203

管道操作符的值
