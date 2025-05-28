/**
 * 获取当前 URL 查询参数的值。
 * 
 * @param name - 查询参数名
 * @returns 查询参数值或 null
 * @example
 * // 假设当前 URL 为 https://example.com?id=123&name=test
 * getQueryParam('id'); // '123'
 * getQueryParam('name'); // 'test'
 * getQueryParam('notexist'); // null
 */
export const getQueryParam = (name: string): string | null => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  return params.get(name);
};
