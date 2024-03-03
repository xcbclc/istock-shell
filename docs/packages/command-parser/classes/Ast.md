[@istock/command-parser](../README.md) / [Exports](../modules.md) / Ast

# Class: Ast

## Table of contents

### Constructors

- [constructor](Ast.md#constructor)

### Properties

- [#tokenizer](Ast.md##tokenizer)

### Accessors

- [symbol](Ast.md#symbol)
- [tokenizer](Ast.md#tokenizer)

### Methods

- [parse](Ast.md#parse)

## Constructors

### constructor

• **new Ast**(): [`Ast`](Ast.md)

#### Returns

[`Ast`](Ast.md)

#### Defined in

ast.ts:65

## Properties

### #tokenizer

• `Private` `Readonly` **#tokenizer**: [`Tokenizer`](Tokenizer.md)

#### Defined in

ast.ts:56

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

ast.ts:57

---

### tokenizer

• `get` **tokenizer**(): [`Tokenizer`](Tokenizer.md)

#### Returns

[`Tokenizer`](Tokenizer.md)

#### Defined in

ast.ts:61

## Methods

### parse

▸ **parse**(`input`): [`TAstTreeRoot`](../modules.md#tasttreeroot)

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `input` | `string` |

#### Returns

[`TAstTreeRoot`](../modules.md#tasttreeroot)

#### Defined in

ast.ts:69
