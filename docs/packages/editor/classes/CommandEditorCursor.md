[**@istock/editor**](../README.md)

***

[@istock/editor](../globals.md) / CommandEditorCursor

# Class: CommandEditorCursor

Defined in: command-editor-cursor.ts:4

编辑框光标操作

## Constructors

### Constructor

> **new CommandEditorCursor**(`commandInput`): `CommandEditorCursor`

Defined in: command-editor-cursor.ts:9

#### Parameters

##### commandInput

`HTMLElement`

#### Returns

`CommandEditorCursor`

## Properties

### selection

> **selection**: `Selection`

Defined in: command-editor-cursor.ts:5

## Methods

### getOneRange()

> **getOneRange**(): `Range`

Defined in: command-editor-cursor.ts:19

获取Range对象

#### Returns

`Range`

***

### moveNodeOffset()

> **moveNodeOffset**(`endNode`, `endOffset`): `void`

Defined in: command-editor-cursor.ts:149

移动到指定节点及对应偏移位置

#### Parameters

##### endNode

`Node` | `Element`

##### endOffset

`number`

#### Returns

`void`

***

### moveToEnd()

> **moveToEnd**(): `void`

Defined in: command-editor-cursor.ts:104

移动光标到开始位置

#### Returns

`void`

***

### moveTokenOffset()

> **moveTokenOffset**(`number`, `isBefore`): `void`

Defined in: command-editor-cursor.ts:119

光标向前或后移动指定个token位置

#### Parameters

##### number

`number` = `1`

##### isBefore

`boolean` = `true`

#### Returns

`void`

***

### moveToStart()

> **moveToStart**(): `void`

Defined in: command-editor-cursor.ts:91

移动光标到开始位置

#### Returns

`void`

***

### setOffset()

> **setOffset**(`offset`): `void`

Defined in: command-editor-cursor.ts:39

设置光标位置

#### Parameters

##### offset

`number`

#### Returns

`void`
