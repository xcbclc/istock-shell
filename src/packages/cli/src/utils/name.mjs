/**
 * 转换成文件名
 * @param str
 * @returns {*}
 */
export function toFileName(str) {
  if (!str) return;
  // 使用正则表达式将驼峰命名转换为破折号分隔
  return str.replace(/[A-Z]/g, (match, index) => {
    // 如果匹配到的大写字母是字符串的首字母，则直接返回小写字母
    if (index === 0) {
      return match.toLowerCase();
    }
    // 否则，在大写字母前添加破折号并转换为小写字母
    return `-${match.toLowerCase()}`;
  });
}

/**
 * 转换成为类名
 * @param str
 * @returns {*}
 */
export function toClassName(str) {
  if (!str) return;
  return str
    .split('-')
    .map((v) => {
      if (!v) return '';
      return v[0].toUpperCase() + v.slice(1);
    })
    .join('');
}

/**
 * m转换成模型名
 * @param str
 * @returns {*}
 */
export function toModelName(str) {
  if (!str) return;
  return str.replace('-', '_');
}
