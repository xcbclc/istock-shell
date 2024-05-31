[@istock/editor](../README.md) / [Exports](../modules.md) / CommandEditor

# Class: CommandEditor

## Table of contents

### Constructors

- [constructor](CommandEditor.md#constructor)

### Properties

- [#autoNodeId](CommandEditor.md##autonodeid)
- [#commandInput](CommandEditor.md##commandinput)
- [#cursor](CommandEditor.md##cursor)
- [#editorParser](CommandEditor.md##editorparser)
- [#historyIndex](CommandEditor.md##historyindex)
- [#historys](CommandEditor.md##historys)
- [#inputComposing](CommandEditor.md##inputcomposing)
- [#tokenizer](CommandEditor.md##tokenizer)
- [#vNodes](CommandEditor.md##vnodes)

### Accessors

- [commandInput](CommandEditor.md#commandinput)
- [input](CommandEditor.md#input)
- [vNodes](CommandEditor.md#vnodes)

### Methods

- [#createEvent](CommandEditor.md##createevent)
- [#eventHandle](CommandEditor.md##eventhandle)
- [#getNewNodeId](CommandEditor.md##getnewnodeid)
- [#getNewVNodes](CommandEditor.md##getnewvnodes)
- [#handleBlur](CommandEditor.md##handleblur)
- [#handleCommandInput](CommandEditor.md##handlecommandinput)
- [#handleCompositionEnd](CommandEditor.md##handlecompositionend)
- [#handleCompositionStart](CommandEditor.md##handlecompositionstart)
- [#handleCompositionUpdate](CommandEditor.md##handlecompositionupdate)
- [#handleFocus](CommandEditor.md##handlefocus)
- [#handleInput](CommandEditor.md##handleinput)
- [#handleKeydown](CommandEditor.md##handlekeydown)
- [#handleKeyup](CommandEditor.md##handlekeyup)
- [#initEvent](CommandEditor.md##initevent)
- [#reDoInput](CommandEditor.md##redoinput)
- [#unDoInput](CommandEditor.md##undoinput)
- [#updateNodeToHtml](CommandEditor.md##updatenodetohtml)
- [destroy](CommandEditor.md#destroy)
- [getCursorOffsetText](CommandEditor.md#getcursoroffsettext)
- [handleCommandInput](CommandEditor.md#handlecommandinput)
- [handleCommandInputAppend](CommandEditor.md#handlecommandinputappend)
- [onMount](CommandEditor.md#onmount)
- [syncVNodeAndHtml](CommandEditor.md#syncvnodeandhtml)

## Constructors

### constructor

• **new CommandEditor**(`commandInput`): [`CommandEditor`](CommandEditor.md)

#### Parameters

| Name           | Type          |
| :------------- | :------------ |
| `commandInput` | `HTMLElement` |

#### Returns

[`CommandEditor`](CommandEditor.md)

#### Defined in

command-editor.ts:54

## Properties

### #autoNodeId

• `Private` **#autoNodeId**: `number` = `0`

#### Defined in

command-editor.ts:34

---

### #commandInput

• `Private` `Readonly` **#commandInput**: `HTMLElement`

#### Defined in

command-editor.ts:32

---

### #cursor

• `Private` `Readonly` **#cursor**: [`CommandEditorCursor`](CommandEditorCursor.md)

#### Defined in

command-editor.ts:38

---

### #editorParser

• `Private` `Readonly` **#editorParser**: [`CommandEditorParser`](CommandEditorParser.md)

#### Defined in

command-editor.ts:37

---

### #historyIndex

• `Private` **#historyIndex**: `number` = `0`

#### Defined in

command-editor.ts:40

---

### #historys

• `Private` **#historys**: [`string`, `number`][] = `[]`

#### Defined in

command-editor.ts:39

---

### #inputComposing

• `Private` **#inputComposing**: `boolean` = `false`

#### Defined in

command-editor.ts:33

---

### #tokenizer

• `Private` `Readonly` **#tokenizer**: `Tokenizer`

#### Defined in

command-editor.ts:36

---

### #vNodes

• `Private` **#vNodes**: [`TCommandEditorContentNode`](../modules.md#tcommandeditorcontentnode)[] = `[]`

#### Defined in

command-editor.ts:35

## Accessors

### commandInput

• `get` **commandInput**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

command-editor.ts:42

---

### input

• `get` **input**(): `string`

#### Returns

`string`

#### Defined in

command-editor.ts:46

---

### vNodes

• `get` **vNodes**(): [`TCommandEditorContentNode`](../modules.md#tcommandeditorcontentnode)[]

#### Returns

[`TCommandEditorContentNode`](../modules.md#tcommandeditorcontentnode)[]

#### Defined in

command-editor.ts:50

## Methods

### #createEvent

▸ **#createEvent**(`name`, `action?`, `event?`): `void`

创建自定义事件

#### Parameters

| Name      | Type                                                                 |
| :-------- | :------------------------------------------------------------------- |
| `name`    | `string`                                                             |
| `action?` | [`ECommandEditorActionTypes`](../enums/ECommandEditorActionTypes.md) |
| `event?`  | `Event`                                                              |

#### Returns

`void`

#### Defined in

command-editor.ts:362

---

### #eventHandle

▸ **#eventHandle**\<`T`\>(`method`): `void`

#### Type parameters

| Name | Type                                                    |
| :--- | :------------------------------------------------------ |
| `T`  | extends `"addEventListener"` \| `"removeEventListener"` |

#### Parameters

| Name     | Type |
| :------- | :--- |
| `method` | `T`  |

#### Returns

`void`

#### Defined in

command-editor.ts:71

---

### #getNewNodeId

▸ **#getNewNodeId**(): `number`

#### Returns

`number`

#### Defined in

command-editor.ts:97

---

### #getNewVNodes

▸ **#getNewVNodes**(`tokens`, `vNodes`): [`TCommandEditorContentNode`](../modules.md#tcommandeditorcontentnode)[]

简单对比生成最新虚拟节点数据

#### Parameters

| Name     | Type                                                                     |
| :------- | :----------------------------------------------------------------------- |
| `tokens` | `TToken`[]                                                               |
| `vNodes` | [`TCommandEditorContentNode`](../modules.md#tcommandeditorcontentnode)[] |

#### Returns

[`TCommandEditorContentNode`](../modules.md#tcommandeditorcontentnode)[]

#### Defined in

command-editor.ts:335

---

### #handleBlur

▸ **#handleBlur**(`_event`): `void`

#### Parameters

| Name     | Type         |
| :------- | :----------- |
| `_event` | `FocusEvent` |

#### Returns

`void`

#### Defined in

command-editor.ts:102

---

### #handleCommandInput

▸ **#handleCommandInput**(`event`, `config?`): `void`

命令输入处理

#### Parameters

| Name              | Type      |
| :---------------- | :-------- |
| `event`           | `Event`   |
| `config?`         | `Object`  |
| `config.newLine?` | `boolean` |

#### Returns

`void`

#### Defined in

command-editor.ts:234

---

### #handleCompositionEnd

▸ **#handleCompositionEnd**(`event`): `void`

#### Parameters

| Name    | Type               |
| :------ | :----------------- |
| `event` | `CompositionEvent` |

#### Returns

`void`

#### Defined in

command-editor.ts:222

---

### #handleCompositionStart

▸ **#handleCompositionStart**(`_event`): `void`

处理中文输入问题

#### Parameters

| Name     | Type               |
| :------- | :----------------- |
| `_event` | `CompositionEvent` |

#### Returns

`void`

#### Defined in

command-editor.ts:214

---

### #handleCompositionUpdate

▸ **#handleCompositionUpdate**(`_event`): `void`

#### Parameters

| Name     | Type               |
| :------- | :----------------- |
| `_event` | `CompositionEvent` |

#### Returns

`void`

#### Defined in

command-editor.ts:218

---

### #handleFocus

▸ **#handleFocus**(`_event`): `void`

#### Parameters

| Name     | Type         |
| :------- | :----------- |
| `_event` | `FocusEvent` |

#### Returns

`void`

#### Defined in

command-editor.ts:101

---

### #handleInput

▸ **#handleInput**(`event`): `void`

输入处理

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `event` | `Event` |

#### Returns

`void`

#### Defined in

command-editor.ts:110

---

### #handleKeydown

▸ **#handleKeydown**(`event`): `void`

快捷键处理

#### Parameters

| Name    | Type            |
| :------ | :-------------- |
| `event` | `KeyboardEvent` |

#### Returns

`void`

#### Defined in

command-editor.ts:122

---

### #handleKeyup

▸ **#handleKeyup**(`_event`): `void`

#### Parameters

| Name     | Type            |
| :------- | :-------------- |
| `_event` | `KeyboardEvent` |

#### Returns

`void`

#### Defined in

command-editor.ts:116

---

### #initEvent

▸ **#initEvent**(): `void`

#### Returns

`void`

#### Defined in

command-editor.ts:67

---

### #reDoInput

▸ **#reDoInput**(`event`): `void`

撤销输入操作

#### Parameters

| Name    | Type            |
| :------ | :-------------- |
| `event` | `KeyboardEvent` |

#### Returns

`void`

#### Defined in

command-editor.ts:194

---

### #unDoInput

▸ **#unDoInput**(`event`): `void`

撤销输入操作

#### Parameters

| Name    | Type            |
| :------ | :-------------- |
| `event` | `KeyboardEvent` |

#### Returns

`void`

#### Defined in

command-editor.ts:174

---

### #updateNodeToHtml

▸ **#updateNodeToHtml**(`vNodes`, `offsetText?`, `options?`): `void`

更新vNode节点到html

#### Parameters

| Name         | Type                                                                     | Default value |
| :----------- | :----------------------------------------------------------------------- | :------------ |
| `vNodes`     | [`TCommandEditorContentNode`](../modules.md#tcommandeditorcontentnode)[] | `undefined`   |
| `offsetText` | `string`                                                                 | `''`          |
| `options`    | [`TCommandEditorInputOption`](../modules.md#tcommandeditorinputoption)   | `{}`          |

#### Returns

`void`

#### Defined in

command-editor.ts:307

---

### destroy

▸ **destroy**(): `void`

销毁时解绑事件

#### Returns

`void`

#### Defined in

command-editor.ts:376

---

### getCursorOffsetText

▸ **getCursorOffsetText**(): `string`

获取光标前面字符串

#### Returns

`string`

#### Defined in

command-editor.ts:295

---

### handleCommandInput

▸ **handleCommandInput**(`input`, `offsetText?`, `options?`): `void`

处理input输入字符串

#### Parameters

| Name         | Type                                                                   |
| :----------- | :--------------------------------------------------------------------- |
| `input`      | `string`                                                               |
| `offsetText` | `string`                                                               |
| `options`    | [`TCommandEditorInputOption`](../modules.md#tcommandeditorinputoption) |

#### Returns

`void`

#### Defined in

command-editor.ts:252

---

### handleCommandInputAppend

▸ **handleCommandInputAppend**(`str`): `void`

向后追加字符串

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

`void`

#### Defined in

command-editor.ts:268

---

### onMount

▸ **onMount**(): `void`

#### Returns

`void`

#### Defined in

command-editor.ts:62

---

### syncVNodeAndHtml

▸ **syncVNodeAndHtml**(`vNodes`): `void`

同步节点数据及更新到html

#### Parameters

| Name     | Type                                                                     |
| :------- | :----------------------------------------------------------------------- |
| `vNodes` | [`TCommandEditorContentNode`](../modules.md#tcommandeditorcontentnode)[] |

#### Returns

`void`

#### Defined in

command-editor.ts:286
