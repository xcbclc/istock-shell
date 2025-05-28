[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / escape

# Function: escape()

> **escape**(`string?`): `string`

Defined in: src/packages/util/src/escape.ts:38

将字符串中的 "&"、"<"、">"、'"' 和 "'" 字符转换为对应的 HTML 实体。

**注意：** 仅转义上述字符，若需转义更多字符请使用第三方库如 [_he_](https://mths.be/he)。

虽然 ">" 字符也被转义以保持对称，但像 ">" 和 "/" 这样的字符在 HTML 中通常无需转义，除非它们出现在标签或未加引号的属性值中。详情可参考 [Mathias Bynens 的文章](https://mathiasbynens.be/notes/ambiguous-ampersands)。

在处理 HTML 时，建议始终 [为属性值加引号](http://wonko.com/post/html-escaping) 以减少 XSS 风险。

## Parameters

### string?

`string`

需要转义的字符串。

## Returns

`string`

返回转义后的字符串。

## Since

0.1.0

## See

escapeRegExp, unescape

## Example

```ts
escape('fred, barney, & pebbles');
// => 'fred, barney, &amp; pebbles'
```
