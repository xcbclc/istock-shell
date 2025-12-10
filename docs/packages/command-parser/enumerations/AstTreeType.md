[**@istock-shell/command-parser**](../README.md)

---

[@istock-shell/command-parser](../globals.md) / AstTreeType

# Enumeration: AstTreeType

Defined in: ast.ts:11

AST（抽象语法树）节点类型枚举

定义了命令解析过程中可能出现的所有节点类型

## Enumeration Members

### command

> **command**: `3`

Defined in: ast.ts:19

普通命令节点类型

---

### keyCommand

> **keyCommand**: `4`

Defined in: ast.ts:21

关键字命令节点类型（如 ai:、ss: 等）

---

### mention

> **mention**: `7`

Defined in: ast.ts:27

提及节点类型

---

### optionKey

> **optionKey**: `6`

Defined in: ast.ts:25

选项键节点类型（如 -v、--help 等）

---

### parameter

> **parameter**: `5`

Defined in: ast.ts:23

参数节点类型

---

### parentheses

> **parentheses**: `1`

Defined in: ast.ts:15

圆括号分组节点类型

---

### pipe

> **pipe**: `2`

Defined in: ast.ts:17

管道操作符节点类型

---

### root

> **root**: `0`

Defined in: ast.ts:13

根节点类型
