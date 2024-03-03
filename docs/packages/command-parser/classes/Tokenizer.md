[@istock/command-parser](../README.md) / [Exports](../modules.md) / Tokenizer

# Class: Tokenizer

## Table of contents

### Constructors

- [constructor](Tokenizer.md#constructor)

### Properties

- [#command](Tokenizer.md##command)
- [#keyCommand](Tokenizer.md##keycommand)
- [#lineN](Tokenizer.md##linen)
- [#lineR](Tokenizer.md##liner)
- [#optionKey](Tokenizer.md##optionkey)
- [#optionKeyPrefix](Tokenizer.md##optionkeyprefix)
- [#parameter](Tokenizer.md##parameter)
- [#parenthesesLeft](Tokenizer.md##parenthesesleft)
- [#parenthesesRight](Tokenizer.md##parenthesesright)
- [#pipeAnd](Tokenizer.md##pipeand)
- [#pipeOr](Tokenizer.md##pipeor)
- [#space](Tokenizer.md##space)
- [#strSymbol](Tokenizer.md##strsymbol)
- [#whitespace](Tokenizer.md##whitespace)
- [symbol](Tokenizer.md#symbol)

### Methods

- [#checkSyntax](Tokenizer.md##checksyntax)
- [#getErrorPosition](Tokenizer.md##geterrorposition)
- [#tokenizerCommand](Tokenizer.md##tokenizercommand)
- [#tokenizerKeywords](Tokenizer.md##tokenizerkeywords)
- [#whiteSpaceSymbol](Tokenizer.md##whitespacesymbol)
- [parse](Tokenizer.md#parse)

## Constructors

### constructor

• **new Tokenizer**(): [`Tokenizer`](Tokenizer.md)

#### Returns

[`Tokenizer`](Tokenizer.md)

## Properties

### #command

• `Private` `Readonly` **#command**: `RegExp`

#### Defined in

tokenizer.ts:55

---

### #keyCommand

• `Private` `Readonly` **#keyCommand**: `Object`

#### Type declaration

| Name             | Type                                                  |
| :--------------- | :---------------------------------------------------- |
| `ai`             | \{ `command`: `string` = 'ai:'; `content`: `RegExp` } |
| `ai.command`     | `string`                                              |
| `ai.content`     | `RegExp`                                              |
| `search`         | \{ `command`: `string` = 'ss:'; `content`: `RegExp` } |
| `search.command` | `string`                                              |
| `search.content` | `RegExp`                                              |

#### Defined in

tokenizer.ts:36

---

### #lineN

• `Private` `Readonly` **#lineN**: `RegExp`

#### Defined in

tokenizer.ts:34

---

### #lineR

• `Private` `Readonly` **#lineR**: `RegExp`

#### Defined in

tokenizer.ts:33

---

### #optionKey

• `Private` `Readonly` **#optionKey**: `RegExp`

#### Defined in

tokenizer.ts:60

---

### #optionKeyPrefix

• `Private` `Readonly` **#optionKeyPrefix**: `RegExp`

#### Defined in

tokenizer.ts:59

---

### #parameter

• `Private` `Readonly` **#parameter**: `RegExp`

#### Defined in

tokenizer.ts:57

---

### #parenthesesLeft

• `Private` `Readonly` **#parenthesesLeft**: `RegExp`

#### Defined in

tokenizer.ts:48

---

### #parenthesesRight

• `Private` `Readonly` **#parenthesesRight**: `RegExp`

#### Defined in

tokenizer.ts:49

---

### #pipeAnd

• `Private` `Readonly` **#pipeAnd**: `RegExp`

#### Defined in

tokenizer.ts:51

---

### #pipeOr

• `Private` `Readonly` **#pipeOr**: `RegExp`

#### Defined in

tokenizer.ts:52

---

### #space

• `Private` `Readonly` **#space**: `RegExp`

#### Defined in

tokenizer.ts:29

---

### #strSymbol

• `Private` `Readonly` **#strSymbol**: `RegExp`

#### Defined in

tokenizer.ts:62

---

### #whitespace

• `Private` `Readonly` **#whitespace**: `RegExp`

#### Defined in

tokenizer.ts:31

---

### symbol

• **symbol**: `Object`

#### Type declaration

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

tokenizer.ts:64

## Methods

### #checkSyntax

▸ **#checkSyntax**(`tokens`): `void`

检查是否有格式错误

#### Parameters

| Name     | Type                               |
| :------- | :--------------------------------- |
| `tokens` | [`TToken`](../modules.md#ttoken)[] |

#### Returns

`void`

#### Defined in

tokenizer.ts:158

---

### #getErrorPosition

▸ **#getErrorPosition**(`tokens`, `currentIndex`): `string`

获取错误位置

#### Parameters

| Name           | Type                               |
| :------------- | :--------------------------------- |
| `tokens`       | [`TToken`](../modules.md#ttoken)[] |
| `currentIndex` | `number`                           |

#### Returns

`string`

#### Defined in

tokenizer.ts:440

---

### #tokenizerCommand

▸ **#tokenizerCommand**(`tokens`, `input`, `index`): [`TTokenMethodResult`](../modules.md#ttokenmethodresult)

分析每一条命令

#### Parameters

| Name     | Type                               | Description |
| :------- | :--------------------------------- | :---------- |
| `tokens` | [`TToken`](../modules.md#ttoken)[] | token数组   |
| `input`  | `string`                           | 输入字符串  |
| `index`  | `number`                           | 当前索引    |

#### Returns

[`TTokenMethodResult`](../modules.md#ttokenmethodresult)

#### Defined in

tokenizer.ts:364

---

### #tokenizerKeywords

▸ **#tokenizerKeywords**(`tokens`, `input`, `index`): [`TTokenMethodResult`](../modules.md#ttokenmethodresult)

分析每一条关键字语句命令

#### Parameters

| Name     | Type                               | Description |
| :------- | :--------------------------------- | :---------- |
| `tokens` | [`TToken`](../modules.md#ttoken)[] | token数组   |
| `input`  | `string`                           | 输入字符串  |
| `index`  | `number`                           | 当前索引    |

#### Returns

[`TTokenMethodResult`](../modules.md#ttokenmethodresult)

#### Defined in

tokenizer.ts:308

---

### #whiteSpaceSymbol

▸ **#whiteSpaceSymbol**(`tokens`, `input`, `index`): `Object`

符号分析

#### Parameters

| Name     | Type                               | Description |
| :------- | :--------------------------------- | :---------- |
| `tokens` | [`TToken`](../modules.md#ttoken)[] | token数组   |
| `input`  | `string`                           | 输入字符串  |
| `index`  | `number`                           | 当前索引    |

#### Returns

`Object`

| Name         | Type      |
| :----------- | :-------- |
| `index`      | `number`  |
| `isContinue` | `boolean` |

#### Defined in

tokenizer.ts:263

---

### parse

▸ **parse**(`input`, `isCheck?`): [`TToken`](../modules.md#ttoken)[]

把输入字符串解析成token

#### Parameters

| Name      | Type      | Default value |
| :-------- | :-------- | :------------ |
| `input`   | `string`  | `undefined`   |
| `isCheck` | `boolean` | `true`        |

#### Returns

[`TToken`](../modules.md#ttoken)[]

#### Defined in

tokenizer.ts:79
