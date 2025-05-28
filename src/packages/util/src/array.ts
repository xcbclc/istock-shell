/**
 * 根据指定 key 和 value 查找数组元素，返回第一个匹配的元素。
 *
 * @param array - 要查找的数组
 * @param value - 需要匹配的值
 * @param key - 用于查找的 key
 * @returns 返回找到的元素或 undefined
 * @example
 * findByKeyForValue([{id: 1}, {id: 2}], 2, 'id'); // {id: 2}
 */
export function findByKeyForValue<T>(array: T[], value: T[keyof T], key: keyof T): T | undefined {
  return array.find((item) => item[key] === value);
}
