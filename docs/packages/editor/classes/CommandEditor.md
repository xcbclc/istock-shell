[**@istock/editor**](../README.md)

***

[@istock/editor](../globals.md) / CommandEditor

# Class: CommandEditor

Defined in: command-editor.ts:31

## Constructors

### Constructor

> **new CommandEditor**(`commandInput`): `CommandEditor`

Defined in: command-editor.ts:54

#### Parameters

##### commandInput

`HTMLElement`

#### Returns

`CommandEditor`

## Accessors

### commandInput

#### Get Signature

> **get** **commandInput**(): `HTMLElement`

Defined in: command-editor.ts:42

##### Returns

`HTMLElement`

***

### input

#### Get Signature

> **get** **input**(): `string`

Defined in: command-editor.ts:46

##### Returns

`string`

***

### vNodes

#### Get Signature

> **get** **vNodes**(): [`TCommandEditorContentNode`](../type-aliases/TCommandEditorContentNode.md)[]

Defined in: command-editor.ts:50

##### Returns

[`TCommandEditorContentNode`](../type-aliases/TCommandEditorContentNode.md)[]

## Methods

### destroy()

> **destroy**(): `void`

Defined in: command-editor.ts:376

销毁时解绑事件

#### Returns

`void`

***

### getCursorOffsetText()

> **getCursorOffsetText**(): `string`

Defined in: command-editor.ts:295

获取光标前面字符串

#### Returns

`string`

***

### handleCommandInput()

> **handleCommandInput**(`input`, `offsetText`, `options`): `void`

Defined in: command-editor.ts:252

处理input输入字符串

#### Parameters

##### input

`string`

##### offsetText

`string` = `...`

##### options

[`TCommandEditorInputOption`](../type-aliases/TCommandEditorInputOption.md) = `{}`

#### Returns

`void`

***

### handleCommandInputAppend()

> **handleCommandInputAppend**(`str`): `void`

Defined in: command-editor.ts:268

向后追加字符串

#### Parameters

##### str

`string`

#### Returns

`void`

***

### onMount()

> **onMount**(): `void`

Defined in: command-editor.ts:62

#### Returns

`void`

***

### syncVNodeAndHtml()

> **syncVNodeAndHtml**(`vNodes`): `void`

Defined in: command-editor.ts:286

同步节点数据及更新到html

#### Parameters

##### vNodes

[`TCommandEditorContentNode`](../type-aliases/TCommandEditorContentNode.md)[]

#### Returns

`void`
