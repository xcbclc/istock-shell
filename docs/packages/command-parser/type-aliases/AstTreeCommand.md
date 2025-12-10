[**@istock-shell/command-parser**](../README.md)

---

[@istock-shell/command-parser](../globals.md) / AstTreeCommand

# Type Alias: AstTreeCommand

> **AstTreeCommand** = `object`

Defined in: ast.ts:93

AST 普通命令节点类型定义

表示命令行中的普通命令及其参数和选项

## Properties

### children

> **children**: ([`AstTreeParameter`](AstTreeParameter.md) \| [`AstTreeOption`](AstTreeOption.md))[]

Defined in: ast.ts:99

子节点列表，包含参数和选项

---

### type

> **type**: [`command`](../enumerations/AstTreeType.md#command)

Defined in: ast.ts:95

节点类型标识

---

### value

> **value**: `string`

Defined in: ast.ts:97

命令名称
