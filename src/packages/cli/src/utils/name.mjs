/**
 * @fileoverview 字符串格式转换工具模块
 * 提供各种字符串格式转换功能，包括文件名、类名、模型名等格式转换
 *
 * @author iStock Shell Team
 * @version 1.0.0
 * @since 2024
 */

/**
 * 将字符串转换为文件名格式（kebab-case）
 * 将驼峰命名、下划线命名或空格分隔的字符串转换为连字符分隔的小写格式
 *
 * @function
 * @param {string} str - 输入字符串，支持驼峰、下划线、空格等格式
 * @returns {string} 转换后的文件名，使用连字符分隔的小写格式
 *
 * @example
 * // 驼峰转文件名
 * toFileName('MyComponent') // 返回: 'my-component'
 *
 * @example
 * // 下划线转文件名
 * toFileName('my_component') // 返回: 'my-component'
 *
 * @example
 * // 空格转文件名
 * toFileName('My Component') // 返回: 'my-component'
 */
export function toFileName(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // 在小写字母和大写字母之间插入连字符
    .replace(/[\s_]+/g, '-') // 将空格和下划线替换为连字符
    .toLowerCase(); // 转换为小写
}

/**
 * 将字符串转换为类名格式（PascalCase）
 * 将连字符、下划线或空格分隔的字符串转换为首字母大写的驼峰格式
 *
 * @function
 * @param {string} str - 输入字符串，支持连字符、下划线、空格等格式
 * @returns {string} 转换后的类名，使用PascalCase格式（首字母大写的驼峰）
 *
 * @example
 * // 连字符转类名
 * toClassName('my-component') // 返回: 'MyComponent'
 *
 * @example
 * // 下划线转类名
 * toClassName('my_component') // 返回: 'MyComponent'
 *
 * @example
 * // 空格转类名
 * toClassName('my component') // 返回: 'MyComponent'
 */
export function toClassName(str) {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : '')) // 将连字符、下划线、空格后的字符转为大写
    .replace(/^(.)/, (_, char) => char.toUpperCase()); // 首字母大写
}

/**
 * 将字符串转换为模型名格式（camelCase）
 * 将连字符、下划线或空格分隔的字符串转换为首字母小写的驼峰格式
 *
 * @function
 * @param {string} str - 输入字符串，支持连字符、下划线、空格等格式
 * @returns {string} 转换后的模型名，使用camelCase格式（首字母小写的驼峰）
 *
 * @example
 * // 连字符转模型名
 * toModelName('my-component') // 返回: 'myComponent'
 *
 * @example
 * // 下划线转模型名
 * toModelName('my_component') // 返回: 'myComponent'
 *
 * @example
 * // 空格转模型名
 * toModelName('my component') // 返回: 'myComponent'
 */
export function toModelName(str) {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : '')) // 将连字符、下划线、空格后的字符转为大写
    .replace(/^(.)/, (_, char) => char.toLowerCase()); // 首字母小写
}
