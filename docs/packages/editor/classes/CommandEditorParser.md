[@istock/editor](../README.md) / [Exports](../modules.md) / CommandEditorParser

# Class: CommandEditorParser

## Table of contents

### Constructors

- [constructor](CommandEditorParser.md#constructor)

### Properties

- [blockTagNames](CommandEditorParser.md#blocktagnames)
- [brTagName](CommandEditorParser.md#brtagname)
- [lineBreak](CommandEditorParser.md#linebreak)
- [space](CommandEditorParser.md#space)
- [spaceRegMatch](CommandEditorParser.md#spaceregmatch)

### Methods

- [#getBrTagHtml](CommandEditorParser.md##getbrtaghtml)
- [#getLineTagHtml](CommandEditorParser.md##getlinetaghtml)
- [#getTokenTagHtml](CommandEditorParser.md##gettokentaghtml)
- [findCursorInfoForDom](CommandEditorParser.md#findcursorinfofordom)
- [getOffsetTextForDom](CommandEditorParser.md#getoffsettextfordom)
- [parseDomToText](CommandEditorParser.md#parsedomtotext)
- [parseVNodeToHtml](CommandEditorParser.md#parsevnodetohtml)
- [parseVNodeToText](CommandEditorParser.md#parsevnodetotext)

## Constructors

### constructor

• **new CommandEditorParser**(): [`CommandEditorParser`](CommandEditorParser.md)

#### Returns

[`CommandEditorParser`](CommandEditorParser.md)

## Properties

### blockTagNames

▪ `Static` **blockTagNames**: `string`[]

#### Defined in

command-editor-parser.ts:13

---

### brTagName

▪ `Static` **brTagName**: `string` = `'BR'`

#### Defined in

command-editor-parser.ts:14

---

### lineBreak

▪ `Static` **lineBreak**: `string` = `'\n'`

#### Defined in

command-editor-parser.ts:17

---

### space

▪ `Static` **space**: `string` = `' '`

#### Defined in

command-editor-parser.ts:18

---

### spaceRegMatch

▪ `Static` **spaceRegMatch**: `RegExp`

#### Defined in

command-editor-parser.ts:16

## Methods

### #getBrTagHtml

▸ **#getBrTagHtml**(`node`): `string`

获取br标签

#### Parameters

| Name   | Type                                                                   |
| :----- | :--------------------------------------------------------------------- |
| `node` | [`TCommandEditorContentNode`](../modules.md#tcommandeditorcontentnode) |

#### Returns

`string`

#### Defined in

command-editor-parser.ts:25

---

### #getLineTagHtml

▸ **#getLineTagHtml**(`node`, `value`): `string`

获取一行数据

#### Parameters

| Name    | Type                                                                   |
| :------ | :--------------------------------------------------------------------- |
| `node`  | [`TCommandEditorContentNode`](../modules.md#tcommandeditorcontentnode) |
| `value` | `string`                                                               |

#### Returns

`string`

#### Defined in

command-editor-parser.ts:45

---

### #getTokenTagHtml

▸ **#getTokenTagHtml**(`node`, `value`): `string`

获取token标签

#### Parameters

| Name    | Type                                                                   |
| :------ | :--------------------------------------------------------------------- |
| `node`  | [`TCommandEditorContentNode`](../modules.md#tcommandeditorcontentnode) |
| `value` | `string`                                                               |

#### Returns

`string`

#### Defined in

command-editor-parser.ts:35

---

### findCursorInfoForDom

▸ **findCursorInfoForDom**(`rootEl`, `offsetText`): `null` \| [`TCommandEditorRangInfo`](../modules.md#tcommandeditorranginfo)

根据DOM元素和光标位置之前的所有文本，获取光标的endContainer、endOffset信息

#### Parameters

| Name         | Type      |
| :----------- | :-------- |
| `rootEl`     | `Element` |
| `offsetText` | `string`  |

#### Returns

`null` \| [`TCommandEditorRangInfo`](../modules.md#tcommandeditorranginfo)

#### Defined in

command-editor-parser.ts:197

---

### getOffsetTextForDom

▸ **getOffsetTextForDom**(`rootEl`, `offsetNode`, `offsetIndex?`): `string`

获取指定节点指定位置前面所有字符串

#### Parameters

| Name          | Type      | Default value | Description                 |
| :------------ | :-------- | :------------ | :-------------------------- |
| `rootEl`      | `Element` | `undefined`   | 包含offsetNode的元素        |
| `offsetNode`  | `Node`    | `undefined`   | range.endContainer          |
| `offsetIndex` | `number`  | `-1`          | range.endOffset，-1表示末尾 |

#### Returns

`string`

#### Defined in

command-editor-parser.ts:85

---

### parseDomToText

▸ **parseDomToText**(`rootEl`): `string`

解析元素成字符串

#### Parameters

| Name     | Type      |
| :------- | :-------- |
| `rootEl` | `Element` |

#### Returns

`string`

#### Defined in

command-editor-parser.ts:53

---

### parseVNodeToHtml

▸ **parseVNodeToHtml**(`vNodes`): `string`

将vNode解析成html

#### Parameters

| Name     | Type                                                                     |
| :------- | :----------------------------------------------------------------------- |
| `vNodes` | [`TCommandEditorContentNode`](../modules.md#tcommandeditorcontentnode)[] |

#### Returns

`string`

#### Defined in

command-editor-parser.ts:134

---

### parseVNodeToText

▸ **parseVNodeToText**(`vNodes`): `string`

将vNode解析成text

#### Parameters

| Name     | Type                                                                     |
| :------- | :----------------------------------------------------------------------- |
| `vNodes` | [`TCommandEditorContentNode`](../modules.md#tcommandeditorcontentnode)[] |

#### Returns

`string`

#### Defined in

command-editor-parser.ts:175
