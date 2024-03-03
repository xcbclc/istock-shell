[@istock/editor](README.md) / Exports

# @istock/editor

## Table of contents

### Enumerations

- [ECommandEditorActionTypes](enums/ECommandEditorActionTypes.md)
- [ECommandEditorEventNames](enums/ECommandEditorEventNames.md)

### Classes

- [CommandEditor](classes/CommandEditor.md)
- [CommandEditorCursor](classes/CommandEditorCursor.md)
- [CommandEditorParser](classes/CommandEditorParser.md)

### Type Aliases

- [TCommandEditorContentNode](modules.md#tcommandeditorcontentnode)
- [TCommandEditorCustomEvent](modules.md#tcommandeditorcustomevent)
- [TCommandEditorInputOption](modules.md#tcommandeditorinputoption)
- [TCommandEditorRangInfo](modules.md#tcommandeditorranginfo)
- [TCommandEditorRecommendCmdData](modules.md#tcommandeditorrecommendcmddata)
- [TCommandEditorRecommendCmdEvent](modules.md#tcommandeditorrecommendcmdevent)

## Type Aliases

### TCommandEditorContentNode

Ƭ **TCommandEditorContentNode**: \{ `id?`: `number` } & `TToken`

#### Defined in

command-editor-parser.ts:3

---

### TCommandEditorCustomEvent

Ƭ **TCommandEditorCustomEvent**\<`Data`\>: \{ `detail`: \{ `data`: `Data` ; `sourceEvent?`: `Event` } } & `Event`

#### Type parameters

| Name   | Type      |
| :----- | :-------- |
| `Data` | `unknown` |

#### Defined in

command-editor.ts:26

---

### TCommandEditorInputOption

Ƭ **TCommandEditorInputOption**: `Object`

#### Type declaration

| Name      | Type                                                              |
| :-------- | :---------------------------------------------------------------- |
| `action?` | [`ECommandEditorActionTypes`](enums/ECommandEditorActionTypes.md) |
| `event?`  | `Event`                                                           |

#### Defined in

command-editor.ts:18

---

### TCommandEditorRangInfo

Ƭ **TCommandEditorRangInfo**: `Object`

#### Type declaration

| Name           | Type     |
| :------------- | :------- |
| `endContainer` | `Node`   |
| `endOffset`    | `number` |

#### Defined in

command-editor-parser.ts:7

---

### TCommandEditorRecommendCmdData

Ƭ **TCommandEditorRecommendCmdData**: `Object`

#### Type declaration

| Name      | Type                                                              |
| :-------- | :---------------------------------------------------------------- |
| `action?` | [`ECommandEditorActionTypes`](enums/ECommandEditorActionTypes.md) |
| `target`  | [`CommandEditor`](classes/CommandEditor.md)                       |

#### Defined in

command-editor.ts:22

---

### TCommandEditorRecommendCmdEvent

Ƭ **TCommandEditorRecommendCmdEvent**: [`TCommandEditorCustomEvent`](modules.md#tcommandeditorcustomevent)\<[`TCommandEditorRecommendCmdData`](modules.md#tcommandeditorrecommendcmddata)\>

#### Defined in

command-editor.ts:29
