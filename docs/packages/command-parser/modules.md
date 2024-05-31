[@istock/command-parser](README.md) / Exports

# @istock/command-parser

## Table of contents

### Enumerations

- [EAstTreeType](enums/EAstTreeType.md)
- [ETokenType](enums/ETokenType.md)

### Classes

- [Ast](classes/Ast.md)
- [CmdParser](classes/CmdParser.md)
- [Tokenizer](classes/Tokenizer.md)

### Type Aliases

- [TAstTree](modules.md#tasttree)
- [TAstTreeCommand](modules.md#tasttreecommand)
- [TAstTreeItem](modules.md#tasttreeitem)
- [TAstTreeKeyCommand](modules.md#tasttreekeycommand)
- [TAstTreeOption](modules.md#tasttreeoption)
- [TAstTreeParameter](modules.md#tasttreeparameter)
- [TAstTreeParentheses](modules.md#tasttreeparentheses)
- [TAstTreePipe](modules.md#tasttreepipe)
- [TAstTreeRoot](modules.md#tasttreeroot)
- [TCommandItemResult](modules.md#tcommanditemresult)
- [TCommandParenthesesResult](modules.md#tcommandparenthesesresult)
- [TCommandParserResult](modules.md#tcommandparserresult)
- [TCommandPipeResult](modules.md#tcommandpiperesult)
- [TCommandResult](modules.md#tcommandresult)
- [TKeyCommandResult](modules.md#tkeycommandresult)
- [TToken](modules.md#ttoken)
- [TTokenMethodResult](modules.md#ttokenmethodresult)

### Variables

- [keyCommand](modules.md#keycommand)

## Type Aliases

### TAstTree

Ƭ **TAstTree**: [`TAstTreeRoot`](modules.md#tasttreeroot)

#### Defined in

ast.ts:53

---

### TAstTreeCommand

Ƭ **TAstTreeCommand**: `Object`

#### Type declaration

| Name       | Type                                                                                                     |
| :--------- | :------------------------------------------------------------------------------------------------------- |
| `children` | ([`TAstTreeParameter`](modules.md#tasttreeparameter) \| [`TAstTreeOption`](modules.md#tasttreeoption))[] |
| `type`     | [`command`](enums/EAstTreeType.md#command)                                                               |
| `value`    | `string`                                                                                                 |

#### Defined in

ast.ts:29

---

### TAstTreeItem

Ƭ **TAstTreeItem**: [`TAstTreeParentheses`](modules.md#tasttreeparentheses) \| [`TAstTreeCommand`](modules.md#tasttreecommand) \| [`TAstTreeKeyCommand`](modules.md#tasttreekeycommand) \| [`TAstTreePipe`](modules.md#tasttreepipe)

#### Defined in

ast.ts:41

---

### TAstTreeKeyCommand

Ƭ **TAstTreeKeyCommand**: `Object`

#### Type declaration

| Name       | Type                                                  |
| :--------- | :---------------------------------------------------- |
| `children` | [`TAstTreeParameter`](modules.md#tasttreeparameter)[] |
| `type`     | [`keyCommand`](enums/EAstTreeType.md#keycommand)      |
| `value`    | `string`                                              |

#### Defined in

ast.ts:35

---

### TAstTreeOption

Ƭ **TAstTreeOption**: `Object`

#### Type declaration

| Name    | Type                                           |
| :------ | :--------------------------------------------- |
| `type`  | [`optionKey`](enums/EAstTreeType.md#optionkey) |
| `value` | `string`                                       |

#### Defined in

ast.ts:19

---

### TAstTreeParameter

Ƭ **TAstTreeParameter**: `Object`

#### Type declaration

| Name    | Type                                           |
| :------ | :--------------------------------------------- |
| `type`  | [`parameter`](enums/EAstTreeType.md#parameter) |
| `value` | `string`                                       |

#### Defined in

ast.ts:14

---

### TAstTreeParentheses

Ƭ **TAstTreeParentheses**: `Object`

#### Type declaration

| Name       | Type                                               |
| :--------- | :------------------------------------------------- |
| `children` | [`TAstTreeItem`](modules.md#tasttreeitem)[]        |
| `type`     | [`parentheses`](enums/EAstTreeType.md#parentheses) |

#### Defined in

ast.ts:43

---

### TAstTreePipe

Ƭ **TAstTreePipe**: `Object`

#### Type declaration

| Name    | Type                                 |
| :------ | :----------------------------------- |
| `type`  | [`pipe`](enums/EAstTreeType.md#pipe) |
| `value` | `string`                             |

#### Defined in

ast.ts:24

---

### TAstTreeRoot

Ƭ **TAstTreeRoot**: `Object`

#### Type declaration

| Name       | Type                                        |
| :--------- | :------------------------------------------ |
| `children` | [`TAstTreeItem`](modules.md#tasttreeitem)[] |
| `type`     | [`root`](enums/EAstTreeType.md#root)        |

#### Defined in

ast.ts:48

---

### TCommandItemResult

Ƭ **TCommandItemResult**: [`TCommandParenthesesResult`](modules.md#tcommandparenthesesresult) \| [`TCommandPipeResult`](modules.md#tcommandpiperesult) \| [`TKeyCommandResult`](modules.md#tkeycommandresult) \| [`TCommandResult`](modules.md#tcommandresult)

#### Defined in

parser.ts:74

---

### TCommandParenthesesResult

Ƭ **TCommandParenthesesResult**: `Object`

#### Type declaration

| Name       | Type                                                    |
| :--------- | :------------------------------------------------------ |
| `children` | [`TCommandItemResult`](modules.md#tcommanditemresult)[] |
| `type`     | [`parentheses`](enums/EAstTreeType.md#parentheses)      |

#### Defined in

parser.ts:64

---

### TCommandParserResult

Ƭ **TCommandParserResult**: `Object`

#### Type declaration

| Name       | Type                                                    |
| :--------- | :------------------------------------------------------ |
| `children` | [`TCommandItemResult`](modules.md#tcommanditemresult)[] |
| `type`     | [`root`](enums/EAstTreeType.md#root)                    |

#### Defined in

parser.ts:76

---

### TCommandPipeResult

Ƭ **TCommandPipeResult**: `Object`

#### Type declaration

| Name    | Type                                 |
| :------ | :----------------------------------- |
| `type`  | [`pipe`](enums/EAstTreeType.md#pipe) |
| `value` | `string`                             |

#### Defined in

parser.ts:69

---

### TCommandResult

Ƭ **TCommandResult**: `Object`

#### Type declaration

| Name          | Type                                          |
| :------------ | :-------------------------------------------- |
| `arguments`   | `unknown`[]                                   |
| `cmd`         | `string`                                      |
| `options`     | `Record`\<`string`, `unknown`\>               |
| `subCommand?` | [`TCommandResult`](modules.md#tcommandresult) |
| `type`        | [`command`](enums/EAstTreeType.md#command)    |

#### Defined in

parser.ts:56

---

### TKeyCommandResult

Ƭ **TKeyCommandResult**: `Object`

#### Type declaration

| Name        | Type                                             |
| :---------- | :----------------------------------------------- |
| `arguments` | `any`[]                                          |
| `cmd`       | `string`                                         |
| `type`      | [`keyCommand`](enums/EAstTreeType.md#keycommand) |

#### Defined in

parser.ts:50

---

### TToken

Ƭ **TToken**: `Object`

#### Type declaration

| Name    | Type                                |
| :------ | :---------------------------------- |
| `type`  | [`ETokenType`](enums/ETokenType.md) |
| `value` | `string`                            |

#### Defined in

tokenizer.ts:16

---

### TTokenMethodResult

Ƭ **TTokenMethodResult**: `Object`

#### Type declaration

| Name         | Type      |
| :----------- | :-------- |
| `index`      | `number`  |
| `isContinue` | `boolean` |

#### Defined in

tokenizer.ts:21

## Variables

### keyCommand

• `Const` **keyCommand**: `Object`

#### Type declaration

| Name             | Type                                                  |
| :--------------- | :---------------------------------------------------- |
| `ai`             | \{ `command`: `string` = 'ai:'; `content`: `RegExp` } |
| `ai.command`     | `string`                                              |
| `ai.content`     | `RegExp`                                              |
| `alias`          | \{ `command`: `string` = ':'; `content`: `RegExp` }   |
| `alias.command`  | `string`                                              |
| `alias.content`  | `RegExp`                                              |
| `search`         | \{ `command`: `string` = 'ss:'; `content`: `RegExp` } |
| `search.command` | `string`                                              |
| `search.content` | `RegExp`                                              |

#### Defined in

tokenizer.ts:26
