[**@istock-shell/command-parser**](../README.md)

---

[@istock-shell/command-parser](../globals.md) / keyCommand

# Variable: keyCommand

> `const` **keyCommand**: `object`

Defined in: tokenizer.ts:71

关键字命令配置

定义了支持的关键字命令及其匹配规则

## Type declaration

### ai

> **ai**: `object`

AI 助手命令配置

#### ai.command

> **command**: `string` = `'ai:'`

命令前缀

#### ai.content

> **content**: `RegExp`

内容匹配正则表达式

### alias

> **alias**: `object`

别名命令配置

#### alias.command

> **command**: `string` = `':'`

命令前缀

#### alias.content

> **content**: `RegExp`

内容匹配正则表达式

### search

> **search**: `object`

搜索命令配置

#### search.command

> **command**: `string` = `'ss:'`

命令前缀

#### search.content

> **content**: `RegExp`

内容匹配正则表达式
