[**@istock/editor**](../README.md)

***

[@istock/editor](../globals.md) / CommandEditorParser

# Class: CommandEditorParser

Defined in: command-editor-parser.ts:12

## Constructors

### Constructor

> **new CommandEditorParser**(): `CommandEditorParser`

#### Returns

`CommandEditorParser`

## Properties

### blockTagNames

> `static` **blockTagNames**: `string`[]

Defined in: command-editor-parser.ts:13

***

### brTagName

> `static` **brTagName**: `string` = `'BR'`

Defined in: command-editor-parser.ts:14

***

### lineBreak

> `static` **lineBreak**: `string` = `'\n'`

Defined in: command-editor-parser.ts:17

***

### space

> `static` **space**: `string` = `' '`

Defined in: command-editor-parser.ts:18

***

### spaceRegMatch

> `static` **spaceRegMatch**: `RegExp`

Defined in: command-editor-parser.ts:16

## Methods

### findCursorInfoForDom()

> **findCursorInfoForDom**(`rootEl`, `offsetText`): `null` \| [`TCommandEditorRangInfo`](../type-aliases/TCommandEditorRangInfo.md)

Defined in: command-editor-parser.ts:195

根据DOM元素和光标位置之前的所有文本，获取光标的endContainer、endOffset信息

#### Parameters

##### rootEl

`Element`

##### offsetText

`string`

#### Returns

`null` \| [`TCommandEditorRangInfo`](../type-aliases/TCommandEditorRangInfo.md)

***

### getOffsetTextForDom()

> **getOffsetTextForDom**(`rootEl`, `offsetNode`, `offsetIndex`): `string`

Defined in: command-editor-parser.ts:84

获取指定节点指定位置前面所有字符串

#### Parameters

##### rootEl

`Element`

包含offsetNode的元素

##### offsetNode

`Node`

range.endContainer

##### offsetIndex

`number` = `-1`

range.endOffset，-1表示末尾

#### Returns

`string`

***

### parseDomToText()

> **parseDomToText**(`rootEl`): `string`

Defined in: command-editor-parser.ts:53

解析元素成字符串

#### Parameters

##### rootEl

`Element`

#### Returns

`string`

***

### parseVNodeToHtml()

> **parseVNodeToHtml**(`vNodes`): `string`

Defined in: command-editor-parser.ts:132

将vNode解析成html

#### Parameters

##### vNodes

[`TCommandEditorContentNode`](../type-aliases/TCommandEditorContentNode.md)[]

#### Returns

`string`

***

### parseVNodeToText()

> **parseVNodeToText**(`vNodes`): `string`

Defined in: command-editor-parser.ts:173

将vNode解析成text

#### Parameters

##### vNodes

[`TCommandEditorContentNode`](../type-aliases/TCommandEditorContentNode.md)[]

#### Returns

`string`
