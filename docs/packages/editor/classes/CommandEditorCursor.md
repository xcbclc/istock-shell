[**@istock-shell/editor**](../README.md)

---

[@istock-shell/editor](../globals.md) / CommandEditorCursor

# Class: CommandEditorCursor

Defined in: command-editor-cursor.ts:6

命令编辑器光标操作类
提供光标定位、移动、范围选择等功能

## Constructors

### Constructor

> **new CommandEditorCursor**(`commandInput`): `CommandEditorCursor`

Defined in: command-editor-cursor.ts:17

构造函数

#### Parameters

##### commandInput

`HTMLElement`

命令输入DOM元素

#### Returns

`CommandEditorCursor`

#### Throws

当无法获取到selection对象时抛出错误

## Properties

### selection

> **selection**: `Selection`

Defined in: command-editor-cursor.ts:8

浏览器选择对象

## Methods

### getOneRange()

> **getOneRange**(): `Range`

Defined in: command-editor-cursor.ts:30

获取当前有效的Range对象
如果当前选择在命令输入元素内，返回当前Range；否则创建一个默认Range

#### Returns

`Range`

当前有效的Range对象

---

### moveNodeOffset()

> **moveNodeOffset**(`endNode`, `endOffset`): `void`

Defined in: command-editor-cursor.ts:168

移动光标到指定节点的指定偏移位置
精确控制光标在DOM节点中的位置

#### Parameters

##### endNode

目标节点

`Element` | `Node`

##### endOffset

`number`

在目标节点中的偏移量

#### Returns

`void`

---

### moveToEnd()

> **moveToEnd**(): `void`

Defined in: command-editor-cursor.ts:119

移动光标到输入框的结束位置

#### Returns

`void`

---

### moveTokenOffset()

> **moveTokenOffset**(`number`, `isBefore`): `void`

Defined in: command-editor-cursor.ts:136

按token单位移动光标位置
根据data-id属性查找token元素并移动光标

#### Parameters

##### number

`number` = `1`

移动的token数量，默认为1

##### isBefore

`boolean` = `true`

是否向前移动，true为向前，false为向后

#### Returns

`void`

---

### moveToStart()

> **moveToStart**(): `void`

Defined in: command-editor-cursor.ts:105

移动光标到输入框的开始位置

#### Returns

`void`

---

### setOffset()

> **setOffset**(`offset`): `void`

Defined in: command-editor-cursor.ts:52

根据文本偏移量设置光标位置
自动处理边界情况，超出范围时移动到开始或结束位置

#### Parameters

##### offset

`number`

文本偏移量（字符数）

#### Returns

`void`
