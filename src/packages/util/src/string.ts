/**
 * 获取字符串尾部和首部的交集
 * @param str1
 * @param str2
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
