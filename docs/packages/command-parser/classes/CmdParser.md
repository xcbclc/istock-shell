[**@istock/command-parser**](../README.md)

***

[@istock/command-parser](../globals.md) / CmdParser

# Class: CmdParser

Defined in: parser.ts:85

解析命令行工具，把命令字符串解析成规定格式数据

## Constructors

### Constructor

> **new CmdParser**(): `CmdParser`

Defined in: parser.ts:99

#### Returns

`CmdParser`

## Accessors

### symbol

#### Get Signature

> **get** **symbol**(): `object`

Defined in: parser.ts:91

##### Returns

`object`

###### options

> **options**: `string`[]

###### parenthesesLeft

> **parenthesesLeft**: `string`[]

###### parenthesesRight

> **parenthesesRight**: `string`[]

###### pipe2And

> **pipe2And**: `string`[]

###### pipe2Or

> **pipe2Or**: `string`[]

###### pipeAnd

> **pipeAnd**: `string`[]

###### pipeOr

> **pipeOr**: `string`[]

***

### tokenizer

#### Get Signature

> **get** **tokenizer**(): [`Tokenizer`](Tokenizer.md)

Defined in: parser.ts:95

##### Returns

[`Tokenizer`](Tokenizer.md)

## Methods

### addArgument()

> **addArgument**(`arg`): `void`

Defined in: parser.ts:115

添加全局命令参数

#### Parameters

##### arg

`IArgument`

#### Returns

`void`

***

### addCommand()

> **addCommand**(`command`): `void`

Defined in: parser.ts:123

添加全局命令

#### Parameters

##### command

`ICommand`

#### Returns

`void`

***

### addOption()

> **addOption**(`option`): `void`

Defined in: parser.ts:107

添加全局选项参数

#### Parameters

##### option

`IOption`

#### Returns

`void`

***

### parse()

> **parse**(`input`): [`TCommandParserResult`](../type-aliases/TCommandParserResult.md)

Defined in: parser.ts:131

解析命令行参数入口

#### Parameters

##### input

`string`

#### Returns

[`TCommandParserResult`](../type-aliases/TCommandParserResult.md)
