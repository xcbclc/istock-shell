[**@istock/command-parser**](../README.md)

***

[@istock/command-parser](../globals.md) / Tokenizer

# Class: Tokenizer

Defined in: tokenizer.ts:41

## Constructors

### Constructor

> **new Tokenizer**(): `Tokenizer`

#### Returns

`Tokenizer`

## Properties

### symbol

> **symbol**: `object`

Defined in: tokenizer.ts:70

#### options

> **options**: `string`[]

#### parenthesesLeft

> **parenthesesLeft**: `string`[]

#### parenthesesRight

> **parenthesesRight**: `string`[]

#### pipe2And

> **pipe2And**: `string`[]

#### pipe2Or

> **pipe2Or**: `string`[]

#### pipeAnd

> **pipeAnd**: `string`[]

#### pipeOr

> **pipeOr**: `string`[]

## Methods

### parse()

> **parse**(`input`, `isCheck`): [`TToken`](../type-aliases/TToken.md)[]

Defined in: tokenizer.ts:85

把输入字符串解析成token

#### Parameters

##### input

`string`

##### isCheck

`boolean` = `true`

#### Returns

[`TToken`](../type-aliases/TToken.md)[]
