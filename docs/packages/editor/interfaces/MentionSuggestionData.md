[**@istock-shell/editor**](../README.md)

---

[@istock-shell/editor](../globals.md) / MentionSuggestionData

# Interface: MentionSuggestionData

Defined in: src/packages/editor/src/mention-suggestion.ts:8

命令编辑器提及建议数据类型

## Extends

- `MentionNodeAttrs`

## Properties

### extra?

> `optional` **extra**: `Record`\<`string`, `any`\>

Defined in: src/packages/editor/src/mention-suggestion.ts:13

---

### id

> **id**: `string`

Defined in: src/packages/editor/src/mention-suggestion.ts:9

The identifier for the selected item that was mentioned, stored as a `data-id`
attribute.

#### Overrides

`MentionNodeAttrs.id`

---

### label

> **label**: `string`

Defined in: src/packages/editor/src/mention-suggestion.ts:10

The label to be rendered by the editor as the displayed text for this mentioned
item, if provided. Stored as a `data-label` attribute. See `renderLabel`.

#### Overrides

`MentionNodeAttrs.label`

---

### mentionSuggestionChar?

> `optional` **mentionSuggestionChar**: `string`

Defined in: node_modules/.pnpm/@tiptap+extension-mention@3_b14c55ac81742689b5220f775a7b2bcb/node_modules/@tiptap/extension-mention/dist/index.d.ts:20

The character that triggers the suggestion, stored as
`data-mention-suggestion-char` attribute.

#### Inherited from

`MentionNodeAttrs.mentionSuggestionChar`

---

### type

> **type**: `string`

Defined in: src/packages/editor/src/mention-suggestion.ts:12

---

### value

> **value**: `string`

Defined in: src/packages/editor/src/mention-suggestion.ts:11
