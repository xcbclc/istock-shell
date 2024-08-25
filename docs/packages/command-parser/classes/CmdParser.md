[@istock/command-parser](../README.md) / [Exports](../modules.md) / CmdParser

# Class: CmdParser

解析命令行工具，把命令字符串解析成规定格式数据

## Table of contents

### Constructors

- [constructor](CmdParser.md#constructor)

### Properties

- [#arguments](CmdParser.md##arguments)
- [#ast](CmdParser.md##ast)
- [#commands](CmdParser.md##commands)
- [#options](CmdParser.md##options)

### Accessors

- [symbol](CmdParser.md#symbol)
- [tokenizer](CmdParser.md#tokenizer)

### Methods

- [#checkOptions](CmdParser.md##checkoptions)
- [#checkParams](CmdParser.md##checkparams)
- [#getCommandResult](CmdParser.md##getcommandresult)
- [#parseCommand](CmdParser.md##parsecommand)
- [#parseParamsValue](CmdParser.md##parseparamsvalue)
- [addArgument](CmdParser.md#addargument)
- [addCommand](CmdParser.md#addcommand)
- [addOption](CmdParser.md#addoption)
- [parse](CmdParser.md#parse)

## Constructors

### constructor

• **new CmdParser**(): [`CmdParser`](CmdParser.md)

#### Returns

[`CmdParser`](CmdParser.md)

#### Defined in

parser.ts:99

## Properties

### #arguments

• `Private` `Readonly` **#arguments**: `IArgument`[] = `[]`

#### Defined in

parser.ts:88

---

### #ast

• `Private` `Readonly` **#ast**: [`Ast`](Ast.md)

#### Defined in

parser.ts:89

---

### #commands

• `Private` `Readonly` **#commands**: `ICommand`[] = `[]`

#### Defined in

parser.ts:87

---

### #options

• `Private` `Readonly` **#options**: `IOption`[] = `[]`

#### Defined in

parser.ts:86

## Accessors

### symbol

• `get` **symbol**(): `Object`

#### Returns

`Object`

| Name               | Type       |
| :----------------- | :--------- |
| `options`          | `string`[] |
| `parenthesesLeft`  | `string`[] |
| `parenthesesRight` | `string`[] |
| `pipe2And`         | `string`[] |
| `pipe2Or`          | `string`[] |
| `pipeAnd`          | `string`[] |
| `pipeOr`           | `string`[] |

#### Defined in

parser.ts:91

---

### tokenizer

• `get` **tokenizer**(): [`Tokenizer`](Tokenizer.md)

#### Returns

[`Tokenizer`](Tokenizer.md)

#### Defined in

parser.ts:95

## Methods

### #checkOptions

▸ **#checkOptions**(`options`, `optionResult`, `command`): `void`

检查校验选项参数

#### Parameters

| Name           | Type                            |
| :------------- | :------------------------------ |
| `options`      | `IOption`[]                     |
| `optionResult` | `Record`\<`string`, `unknown`\> |
| `command`      | `ICommand`                      |

#### Returns

`void`

#### Defined in

parser.ts:278

---

### #checkParams

▸ **#checkParams**(`paramValue`, `checkInfo`): `void`

检查校验参数

#### Parameters

| Name         | Type                     |
| :----------- | :----------------------- |
| `paramValue` | `unknown`                |
| `checkInfo`  | `IArgument` \| `IOption` |

#### Returns

`void`

#### Defined in

parser.ts:303

---

### #getCommandResult

▸ **#getCommandResult**(`commandResult`, `commands`, `nodeChildren`): [`TCommandResult`](../modules.md#tcommandresult)

根据相关信息获取命令解析结果

#### Parameters

| Name            | Type                                                                                                           |
| :-------------- | :------------------------------------------------------------------------------------------------------------- |
| `commandResult` | [`TCommandResult`](../modules.md#tcommandresult)                                                               |
| `commands`      | `ICommand`[]                                                                                                   |
| `nodeChildren`  | ([`TAstTreeParameter`](../modules.md#tasttreeparameter) \| [`TAstTreeOption`](../modules.md#tasttreeoption))[] |

#### Returns

[`TCommandResult`](../modules.md#tcommandresult)

#### Defined in

parser.ts:222

---

### #parseCommand

▸ **#parseCommand**(`topCommand`, `nodes`, `resultChildren`): [`TCommandItemResult`](../modules.md#tcommanditemresult)[]

解析命令行参数逻辑

#### Parameters

| Name             | Type                                                       |
| :--------------- | :--------------------------------------------------------- |
| `topCommand`     | `ICommand`                                                 |
| `nodes`          | [`TAstTreeItem`](../modules.md#tasttreeitem)[]             |
| `resultChildren` | [`TCommandItemResult`](../modules.md#tcommanditemresult)[] |

#### Returns

[`TCommandItemResult`](../modules.md#tcommanditemresult)[]

#### Defined in

parser.ts:146

---

### #parseParamsValue

▸ **#parseParamsValue**(`parameterType`, `val`): `any`

根据参数类型解析值

#### Parameters

| Name            | Type       | Description |
| :-------------- | :--------- | :---------- |
| `parameterType` | `string`[] | 参数类型    |
| `val`           | `any`      | 参数值      |

#### Returns

`any`

#### Defined in

parser.ts:347

---

### addArgument

▸ **addArgument**(`arg`): `void`

添加全局命令参数

#### Parameters

| Name  | Type        |
| :---- | :---------- |
| `arg` | `IArgument` |

#### Returns

`void`

#### Defined in

parser.ts:115

---

### addCommand

▸ **addCommand**(`command`): `void`

添加全局命令

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `command` | `ICommand` |

#### Returns

`void`

#### Defined in

parser.ts:123

---

### addOption

▸ **addOption**(`option`): `void`

添加全局选项参数

#### Parameters

| Name     | Type      |
| :------- | :-------- |
| `option` | `IOption` |

#### Returns

`void`

#### Defined in

parser.ts:107

---

### parse

▸ **parse**(`input`): [`TCommandParserResult`](../modules.md#tcommandparserresult)

解析命令行参数入口

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `input` | `string` |

#### Returns

[`TCommandParserResult`](../modules.md#tcommandparserresult)

#### Defined in

parser.ts:131
