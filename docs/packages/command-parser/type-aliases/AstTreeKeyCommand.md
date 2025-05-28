[**@istock-shell/command-parser**](../README.md)

---

[@istock-shell/command-parser](../globals.md) / AstTreeKeyCommand

# Type Alias: AstTreeKeyCommand

> **AstTreeKeyCommand** = `object`

Defined in: ast.ts:93

AST 关键字命令节点类型定义

表示特殊的关键字命令（如 ai:、ss: 等）

## Properties

### children

> **children**: [`AstTreeParameter`](AstTreeParameter.md)[]

Defined in: ast.ts:99

子节点列表，仅包含参数

---

### type

> **type**: [`keyCommand`](../enumerations/AstTreeType.md#keycommand)

Defined in: ast.ts:95

节点类型标识

---

### value

> **value**: `string`

Defined in: ast.ts:97

关键字命令值
