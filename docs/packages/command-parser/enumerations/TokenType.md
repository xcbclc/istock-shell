[**@istock-shell/command-parser**](../README.md)

---

[@istock-shell/command-parser](../globals.md) / TokenType

# Enumeration: TokenType

Defined in: tokenizer.ts:11

Token 类型枚举

定义了词法分析过程中可能产生的所有 Token 类型。
每种类型代表命令行输入中的不同语法元素。

## Enumeration Members

### command

> **command**: `"command"`

Defined in: tokenizer.ts:21

普通命令

---

### keyCommand

> **keyCommand**: `"keyCommand"`

Defined in: tokenizer.ts:29

关键字命令（如 ai:、ss: 等）

---

### keyCommandContent

> **keyCommandContent**: `"keyCommandContent"`

Defined in: tokenizer.ts:31

关键字命令的内容部分

---

### lineN

> **lineN**: `"lineN"`

Defined in: tokenizer.ts:17

换行符 (\n)

---

### lineR

> **lineR**: `"lineR"`

Defined in: tokenizer.ts:15

回车符 (\r)

---

### mention

> **mention**: `"mention"`

Defined in: tokenizer.ts:33

提及（如 @[id,label] 或 #[id,label]）

---

### optionKey

> **optionKey**: `"optionKey"`

Defined in: tokenizer.ts:25

选项键（如 -v、--help 等）

---

### parameter

> **parameter**: `"parameter"`

Defined in: tokenizer.ts:23

参数值

---

### parentheses

> **parentheses**: `"parentheses"`

Defined in: tokenizer.ts:19

圆括号字符（包括左右圆括号）

---

### pipe

> **pipe**: `"pipe"`

Defined in: tokenizer.ts:27

管道操作符（如 |、&、||、&& 等）

---

### space

> **space**: `"space"`

Defined in: tokenizer.ts:13

空格字符
