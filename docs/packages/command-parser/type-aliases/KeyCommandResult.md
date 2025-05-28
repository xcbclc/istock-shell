[**@istock-shell/command-parser**](../README.md)

---

[@istock-shell/command-parser](../globals.md) / KeyCommandResult

# Type Alias: KeyCommandResult

> **KeyCommandResult** = `object`

Defined in: parser.ts:149

关键字命令解析结果

表示解析后的关键字命令（如 ai:、ss: 等）的结构

## Properties

### arguments

> **arguments**: `any`[]

Defined in: parser.ts:155

命令参数列表

---

### cmd

> **cmd**: `string`

Defined in: parser.ts:153

命令名称

---

### type

> **type**: [`keyCommand`](../enumerations/AstTreeType.md#keycommand)

Defined in: parser.ts:151

结果类型，固定为关键字命令类型
