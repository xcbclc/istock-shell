[**@istock-shell/editor**](../README.md)

---

[@istock-shell/editor](../globals.md) / CommandEditor

# Class: CommandEditor

Defined in: src/packages/editor/src/command-editor-plus.ts:111

命令编辑器类
提供命令行输入、编辑、语法高亮、历史记录等功能

## Constructors

### Constructor

> **new CommandEditor**(`commandInput`, `content`, `options`): `CommandEditor`

Defined in: src/packages/editor/src/command-editor-plus.ts:181

构造函数

#### Parameters

##### commandInput

`HTMLElement`

命令输入DOM元素

##### content

`string` = `''`

##### options

[`CommandEditorOptions`](../type-aliases/CommandEditorOptions.md) = `{}`

#### Returns

`CommandEditor`

## Accessors

### commandInput

#### Get Signature

> **get** **commandInput**(): `HTMLElement`

Defined in: src/packages/editor/src/command-editor-plus.ts:121

获取命令输入DOM元素

##### Returns

`HTMLElement`

命令输入DOM元素

---

### editor

#### Get Signature

> **get** **editor**(): `Editor`

Defined in: src/packages/editor/src/command-editor-plus.ts:125

##### Returns

`Editor`

---

### input

#### Get Signature

> **get** **input**(): `string`

Defined in: src/packages/editor/src/command-editor-plus.ts:133

获取当前输入的文本内容

##### Returns

`string`

解析后的文本内容

---

### inputJson

#### Get Signature

> **get** **inputJson**(): `DocumentType`\<`undefined` \| `Record`\<`string`, `any`\>, `NodeType`\<`string`, `undefined` \| `Record`\<`string`, `any`\>, `any`, (`NodeType`\<`any`, `any`, `any`, `any`\> \| `TextType`\<`MarkType`\<`any`, `any`\>\>)[]\>[]\>

Defined in: src/packages/editor/src/command-editor-plus.ts:152

获取当前输入的文本内容的JSON表示

##### Returns

`DocumentType`\<`undefined` \| `Record`\<`string`, `any`\>, `NodeType`\<`string`, `undefined` \| `Record`\<`string`, `any`\>, `any`, (`NodeType`\<`any`, `any`, `any`, `any`\> \| `TextType`\<`MarkType`\<`any`, `any`\>\>)[]\>[]\>

文本内容的JSON表示

---

### mentions

#### Get Signature

> **get** **mentions**(): [`CommandEditorMentionData`](../interfaces/CommandEditorMentionData.md)[]

Defined in: src/packages/editor/src/command-editor-plus.ts:160

获取当前输入的文本内容中的提及数据

##### Returns

[`CommandEditorMentionData`](../interfaces/CommandEditorMentionData.md)[]

提及数据数组

## Methods

### destroy()

> **destroy**(): `void`

Defined in: src/packages/editor/src/command-editor-plus.ts:491

销毁编辑器实例及副作用

#### Returns

`void`

---

### getCursorClientRect()

> **getCursorClientRect**(): `DOMRect`

Defined in: src/packages/editor/src/command-editor-plus.ts:460

获取当前光标位置的客户端矩形信息

#### Returns

`DOMRect`

光标位置的DOMRect对象

---

### getCursorOffsetText()

> **getCursorOffsetText**(): `string`

Defined in: src/packages/editor/src/command-editor-plus.ts:447

获取当前光标位置前的文本内容

#### Returns

`string`

光标前的文本字符串

---

### handleCommandInput()

> **handleCommandInput**(`input`): `void`

Defined in: src/packages/editor/src/command-editor-plus.ts:318

向输入框填充输入内容

#### Parameters

##### input

`string`

需要填充的内容

#### Returns

`void`

---

### handleCommandInputAppend()

> **handleCommandInputAppend**(`str`): `void`

Defined in: src/packages/editor/src/command-editor-plus.ts:343

合并当前光标位置的文本内容

#### Parameters

##### str

`string`

要合并的字符串

#### Returns

`void`

---

### onMount()

> **onMount**(): `void`

Defined in: src/packages/editor/src/command-editor-plus.ts:219

组件挂载时调用
设置焦点到输入框并初始化事件监听

#### Returns

`void`
