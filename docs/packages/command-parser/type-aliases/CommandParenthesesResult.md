[**@istock-shell/command-parser**](../README.md)

---

[@istock-shell/command-parser](../globals.md) / CommandParenthesesResult

# Type Alias: CommandParenthesesResult

> **CommandParenthesesResult** = `object`

Defined in: parser.ts:185

圆括号分组解析结果

表示被圆括号包围的命令组的结构

## Properties

### children

> **children**: [`CommandItemResult`](CommandItemResult.md)[]

Defined in: parser.ts:189

子命令项列表

---

### type

> **type**: [`parentheses`](../enumerations/AstTreeType.md#parentheses)

Defined in: parser.ts:187

结果类型，固定为圆括号类型
