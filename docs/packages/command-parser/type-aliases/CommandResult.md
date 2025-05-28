[**@istock-shell/command-parser**](../README.md)

---

[@istock-shell/command-parser](../globals.md) / CommandResult

# Type Alias: CommandResult

> **CommandResult** = `object`

Defined in: parser.ts:165

普通命令解析结果

表示解析后的普通命令的结构，包含命令名称、参数、选项和可能的子命令

## Properties

### arguments

> **arguments**: `unknown`[]

Defined in: parser.ts:171

位置参数列表

---

### cmd

> **cmd**: `string`

Defined in: parser.ts:169

命令名称

---

### options

> **options**: `Record`\<`string`, `unknown`\>

Defined in: parser.ts:173

选项参数映射

---

### subCommand?

> `optional` **subCommand**: `CommandResult`

Defined in: parser.ts:175

子命令（如果存在）

---

### type

> **type**: [`command`](../enumerations/AstTreeType.md#command)

Defined in: parser.ts:167

结果类型，固定为命令类型
