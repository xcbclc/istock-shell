/**
 * 根据指定元素的key，获取对应value，返回value对应的数组元素
 * @param array - 要查找的数组
 * @param value - 需要
 * @param key - 用于查找的key
 * @returns - 返回找到的元素或undefined
 */
export function findByKeyForValue<T>(array: T[], value: T[keyof T], key: keyof T): T | undefined {
  return array.find((item) => item[key] === value);
}
