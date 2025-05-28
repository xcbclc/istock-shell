/**
 * 用于将字符映射为对应的 HTML 实体。
 * @since 0.1.0
 */
const htmlEscapes: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * 用于匹配 HTML 实体和 HTML 字符。
 * @since 0.1.0
 */
const reUnescapedHtml = /[&<>"']/g;
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

/**
 * 将字符串中的 "&"、"<"、">"、'"' 和 "'" 字符转换为对应的 HTML 实体。
 *
 * **注意：** 仅转义上述字符，若需转义更多字符请使用第三方库如 [_he_](https://mths.be/he)。
 *
 * 虽然 ">" 字符也被转义以保持对称，但像 ">" 和 "/" 这样的字符在 HTML 中通常无需转义，除非它们出现在标签或未加引号的属性值中。详情可参考 [Mathias Bynens 的文章](https://mathiasbynens.be/notes/ambiguous-ampersands)。
 *
 * 在处理 HTML 时，建议始终 [为属性值加引号](http://wonko.com/post/html-escaping) 以减少 XSS 风险。
 *
 * @since 0.1.0
 * @category 字符串
 * @param {string} [string=''] 需要转义的字符串。
 * @returns {string} 返回转义后的字符串。
 * @see escapeRegExp, unescape
 * @example
 * escape('fred, barney, & pebbles')
 * // => 'fred, barney, &amp; pebbles'
 */
export function escape(string: string): string {
  return string && reHasUnescapedHtml.test(string)
    ? string.replace(reUnescapedHtml, (chr) => htmlEscapes[chr])
    : string || '';
}

export default escape;
