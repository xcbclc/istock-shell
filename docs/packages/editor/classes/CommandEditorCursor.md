[@istock/editor](../README.md) / [Exports](../modules.md) / CommandEditorCursor

# Class: CommandEditorCursor

编辑框光标操作

## Table of contents

### Constructors

- [constructor](CommandEditorCursor.md#constructor)

### Properties

- [#commandInput](CommandEditorCursor.md##commandinput)
- [selection](CommandEditorCursor.md#selection)

### Methods

- [getOneRange](CommandEditorCursor.md#getonerange)
- [moveNodeOffset](CommandEditorCursor.md#movenodeoffset)
- [moveToEnd](CommandEditorCursor.md#movetoend)
- [moveToStart](CommandEditorCursor.md#movetostart)
- [moveTokenOffset](CommandEditorCursor.md#movetokenoffset)
- [setOffset](CommandEditorCursor.md#setoffset)

## Constructors

### constructor

• **new CommandEditorCursor**(`commandInput`): [`CommandEditorCursor`](CommandEditorCursor.md)

#### Parameters

| Name           | Type          |
| :------------- | :------------ |
| `commandInput` | `HTMLElement` |

#### Returns

[`CommandEditorCursor`](CommandEditorCursor.md)

#### Defined in

command-editor-cursor.ts:9

## Properties

### #commandInput

• `Private` `Readonly` **#commandInput**: `HTMLElement`

#### Defined in

command-editor-cursor.ts:7

---

### selection

• **selection**: `Selection`

#### Defined in

command-editor-cursor.ts:5

## Methods

### getOneRange

▸ **getOneRange**(): `Range`

获取Range对象

#### Returns

`Range`

#### Defined in

command-editor-cursor.ts:19

---

### moveNodeOffset

▸ **moveNodeOffset**(`endNode`, `endOffset`): `void`

移动到指定节点及对应偏移位置

#### Parameters

| Name        | Type                |
| :---------- | :------------------ |
| `endNode`   | `Node` \| `Element` |
| `endOffset` | `number`            |

#### Returns

`void`

#### Defined in

command-editor-cursor.ts:149

---

### moveToEnd

▸ **moveToEnd**(): `void`

移动光标到开始位置

#### Returns

`void`

#### Defined in

command-editor-cursor.ts:104

---

### moveToStart

▸ **moveToStart**(): `void`

移动光标到开始位置

#### Returns

`void`

#### Defined in

command-editor-cursor.ts:91

---

### moveTokenOffset

▸ **moveTokenOffset**(`number?`, `isBefore?`): `void`

光标向前或后移动指定个token位置

#### Parameters

| Name       | Type      | Default value |
| :--------- | :-------- | :------------ |
| `number`   | `number`  | `1`           |
| `isBefore` | `boolean` | `true`        |

#### Returns

`void`

#### Defined in

command-editor-cursor.ts:119

---

### setOffset

▸ **setOffset**(`offset`): `void`

设置光标位置

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `offset` | `number` |

#### Returns

`void`

#### Defined in

command-editor-cursor.ts:39
