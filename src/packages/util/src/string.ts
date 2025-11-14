/**
 * 获取两个字符串尾部和首部的最大重叠部分。
 *
 * @param str1 - 第一个字符串
 * @param str2 - 第二个字符串
 * @returns 两个字符串尾部和首部的最大重叠部分
 * @example
 * getEndAndStartOverlapStr('abc', 'cde'); // 'c'
 */
export function getEndAndStartOverlapStr(str1: string, str2: string): string {
  let overlap = '';

  for (let i = 1; i <= str1.length && i <= str2.length; i++) {
    const endOfStr1 = str1.slice(-i);
    const startOfStr2 = str2.slice(0, i);

    if (endOfStr1 === startOfStr2) {
      overlap = endOfStr1;
    }
  }

  return overlap;
}

/**
 * 获取参数2去除与参数1尾部重叠部分后的剩余字符串。
 *
 * @param str1 - 第一个字符串
 * @param str2 - 第二个字符串
 * @returns 参数2去除重叠部分后的剩余字符串
 * @example
 * getNonOverlapStr('abc', 'cde'); // 'de'
 * getNonOverlapStr('hello', 'world'); // 'world'
 * getNonOverlapStr('test', 'testing'); // 'ing'
 */
export function getNonOverlapStr(str1: string, str2: string): string {
  const overlap = getEndAndStartOverlapStr(str1, str2);
  return str2.slice(overlap.length);
}
