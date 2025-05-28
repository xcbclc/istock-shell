[**@istock-shell/editor**](../README.md)

---

[@istock-shell/editor](../globals.md) / CommandEditorParser

# Class: CommandEditorParser

Defined in: command-editor-parser.ts:30

命令编辑器解析器类
负责虚拟节点与DOM、文本之间的转换和解析

## Constructors

### Constructor

> **new CommandEditorParser**(): `CommandEditorParser`

#### Returns

`CommandEditorParser`

## Properties

### blockTagNames

> `static` **blockTagNames**: `string`[]

Defined in: command-editor-parser.ts:32

块级标签名称数组

---

### brTagName

> `static` **brTagName**: `string` = `'BR'`

Defined in: command-editor-parser.ts:34

换行标签名称

---

### lineBreak

> `static` **lineBreak**: `string` = `'\n'`

Defined in: command-editor-parser.ts:38

---

### space

> `static` **space**: `string` = `' '`

Defined in: command-editor-parser.ts:40

空格字符

---

### spaceRegMatch

> `static` **spaceRegMatch**: `RegExp`

Defined in: command-editor-parser.ts:37

空格字符匹配正则表达式

## Methods

### findCursorInfoForDom()

> **findCursorInfoForDom**(`rootEl`, `offsetText`): `null` \| [`CommandEditorRangInfo`](../type-aliases/CommandEditorRangInfo.md)

Defined in: command-editor-parser.ts:238

根据文本偏移量在DOM中查找对应的光标位置信息
通过遍历DOM节点匹配文本内容，确定光标应该位于的具体节点和偏移量

#### Parameters

##### rootEl

`Element`

根DOM元素

##### offsetText

`string`

光标位置前的文本内容

#### Returns

`null` \| [`CommandEditorRangInfo`](../type-aliases/CommandEditorRangInfo.md)

光标位置信息，包含容器节点和偏移量，找不到时返回null

---

### getOffsetTextForDom()

> **getOffsetTextForDom**(`rootEl`, `offsetNode`, `offsetIndex`): `string`

Defined in: command-editor-parser.ts:118

获取指定节点和位置之前的所有文本内容
用于计算光标位置前的文本，支持复杂的DOM结构

#### Parameters

##### rootEl

`Element`

包含offsetNode的根元素

##### offsetNode

`Node`

目标节点（通常是range.endContainer）

##### offsetIndex

`number` = `-1`

在目标节点中的偏移量，-1表示节点末尾

#### Returns

`string`

指定位置之前的所有文本内容

---

### parseDomToText()

> **parseDomToText**(`rootEl`): `string`

Defined in: command-editor-parser.ts:84

将DOM元素解析为纯文本字符串
递归遍历DOM节点，提取文本内容并处理换行

#### Parameters

##### rootEl

`Element`

根DOM元素

#### Returns

`string`

解析后的文本字符串

---

### parseVNodeToHtml()

> **parseVNodeToHtml**(`vNodes`): `string`

Defined in: command-editor-parser.ts:169

将虚拟节点数组解析为HTML字符串
根据token类型生成相应的HTML标签和样式

#### Parameters

##### vNodes

[`CommandEditorContentNode`](../type-aliases/CommandEditorContentNode.md)[]

虚拟节点数组

#### Returns

`string`

生成的HTML字符串

---

### parseVNodeToText()

> **parseVNodeToText**(`vNodes`): `string`

Defined in: command-editor-parser.ts:213

将虚拟节点数组解析为纯文本字符串
提取虚拟节点中的文本内容，统一处理换行和空格

#### Parameters

##### vNodes

[`CommandEditorContentNode`](../type-aliases/CommandEditorContentNode.md)[]

虚拟节点数组

#### Returns

`string`

解析后的纯文本字符串
