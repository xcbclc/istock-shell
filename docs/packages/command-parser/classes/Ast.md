[**@istock/command-parser**](../README.md)

***

[@istock/command-parser](../globals.md) / Ast

# Class: Ast

Defined in: ast.ts:55

## Constructors

### Constructor

> **new Ast**(): `Ast`

Defined in: ast.ts:65

#### Returns

`Ast`

## Accessors

### symbol

#### Get Signature

> **get** **symbol**(): `object`

Defined in: ast.ts:57

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

Defined in: ast.ts:61

##### Returns

[`Tokenizer`](Tokenizer.md)

## Methods

### parse()

> **parse**(`input`): [`TAstTreeRoot`](../type-aliases/TAstTreeRoot.md)

Defined in: ast.ts:69

#### Parameters

##### input

`string`

#### Returns

[`TAstTreeRoot`](../type-aliases/TAstTreeRoot.md)
