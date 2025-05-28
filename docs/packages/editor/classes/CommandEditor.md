[**@istock-shell/editor**](../README.md)

---

[@istock-shell/editor](../globals.md) / CommandEditor

# Class: CommandEditor

Defined in: command-editor.ts:79

命令编辑器类
提供命令行输入、编辑、语法高亮、历史记录等功能

## Constructors

### Constructor

> **new CommandEditor**(`commandInput`): `CommandEditor`

Defined in: command-editor.ts:127

构造函数

#### Parameters

##### commandInput

`HTMLElement`

命令输入DOM元素

#### Returns

`CommandEditor`

## Accessors

### commandInput

#### Get Signature

> **get** **commandInput**(): `HTMLElement`

Defined in: command-editor.ts:103

获取命令输入DOM元素

##### Returns

`HTMLElement`

命令输入DOM元素

---

### input

#### Get Signature

> **get** **input**(): `string`

Defined in: command-editor.ts:111

获取当前输入的文本内容

##### Returns

`string`

解析后的文本内容

---

### vNodes

#### Get Signature

> **get** **vNodes**(): [`CommandEditorContentNode`](../type-aliases/CommandEditorContentNode.md)[]

Defined in: command-editor.ts:119

获取虚拟节点数组

##### Returns

[`CommandEditorContentNode`](../type-aliases/CommandEditorContentNode.md)[]

虚拟节点数组

## Methods

### destroy()

> **destroy**(): `void`

Defined in: command-editor.ts:521

销毁编辑器实例
移除所有事件监听器，清理资源

#### Returns

`void`

---

### getCursorOffsetText()

> **getCursorOffsetText**(): `string`

Defined in: command-editor.ts:432

获取光标位置前的所有文本内容

#### Returns

`string`

光标前的文本字符串

---

### handleCommandInput()

> **handleCommandInput**(`input`, `offsetText`, `options`): `void`

Defined in: command-editor.ts:383

处理命令输入的公共方法
解析输入文本为token，更新虚拟节点，并渲染到HTML

#### Parameters

##### input

`string`

输入的完整文本

##### offsetText

`string` = `...`

光标位置前的文本内容

##### options

[`CommandEditorInputOption`](../type-aliases/CommandEditorInputOption.md) = `{}`

输入选项

#### Returns

`void`

---

### handleCommandInputAppend()

> **handleCommandInputAppend**(`str`): `void`

Defined in: command-editor.ts:401

向当前输入内容追加字符串
智能处理重叠部分，避免重复内容

#### Parameters

##### str

`string`

要追加的字符串

#### Returns

`void`

---

### onMount()

> **onMount**(): `void`

Defined in: command-editor.ts:139

组件挂载时调用
设置焦点到输入框并初始化事件监听

#### Returns

`void`

---

### syncVNodeAndHtml()

> **syncVNodeAndHtml**(`vNodes`): `void`

Defined in: command-editor.ts:421

同步虚拟节点数据并更新HTML显示
直接设置虚拟节点数组并重新渲染

#### Parameters

##### vNodes

[`CommandEditorContentNode`](../type-aliases/CommandEditorContentNode.md)[]

新的虚拟节点数组

#### Returns

`void`
