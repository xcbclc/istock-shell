/**
 * @fileoverview Markdown文件合并模块
 * 递归扫描指定目录下的所有Markdown文件并合并为单个文件
 * @author iStock Shell Team
 */

import fs from 'fs';
import path from 'path';

/** @type {string} 当前工作目录路径 */
const cwdPath = process.cwd();
/** @type {string} 项目根目录路径 */
const rootPath = cwdPath;
/** @type {string} 文档源目录路径 */
const docsPath = path.resolve(rootPath, './docs');
/** @type {string} 合并后的输出文件路径 */
const outPath = path.resolve(rootPath, './docs/.vitepress/dist/all.md');

/**
 * 合并指定目录下的所有Markdown文件
 * 递归遍历目录结构，将所有.md文件内容合并到单个输出文件中
 *
 * @async
 * @function
 * @param {string} sourceDir - 源目录路径
 * @param {string} outputFile - 输出文件路径
 * @returns {Promise<void>} 无返回值
 * @throws {Error} 当文件操作失败时抛出错误
 *
 * @example
 * await mergeMarkdownFiles('./docs', './output/all.md');
 */
async function mergeMarkdownFiles(sourceDir, outputFile) {
  // 确保输出目录存在
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });

  // 创建可写流用于追加内容
  /** @type {fs.WriteStream} 输出文件流 */
  const outputStream = fs.createWriteStream(outputFile, { flags: 'a' });

  /**
   * 递归处理目录中的文件
   * 遍历目录中的所有项目，对子目录递归处理，对Markdown文件进行合并
   *
   * @async
   * @function
   * @param {string} directory - 要处理的目录路径
   * @returns {Promise<void>} 无返回值
   */
  async function processDirectory(directory) {
    /** @type {fs.Dirent[]} 目录项列表 */
    const items = fs.readdirSync(directory, { withFileTypes: true });

    for (let item of items) {
      /** @type {string} 完整的项目路径 */
      const itemPath = path.join(directory, item.name);

      if (item.isDirectory()) {
        // 递归处理子目录
        await processDirectory(itemPath);
      } else if (item.isFile() && item.name.endsWith('.md')) {
        // 读取Markdown文件内容并写入输出流
        const data = fs.readFileSync(itemPath);
        outputStream.write(data);
        // 添加换行符分隔不同文件的内容
        outputStream.write('\n');
      }
    }
  }

  // 开始处理源目录
  await processDirectory(sourceDir);

  // 关闭输出流
  outputStream.end();

  console.log('Markdown文件合并成功');
}

/**
 * 合并文档目录下的所有Markdown文件
 * 将docs目录下的所有.md文件合并到单个输出文件中
 *
 * @async
 * @function
 * @returns {Promise<void>} 无返回值
 * @throws {Error} 当文件合并操作失败时抛出错误
 *
 * @example
 * // 合并所有文档文件
 * await mergeMarkdown();
 * // 结果文件将保存在 ./docs/.vitepress/dist/all.md
 */
export default async function mergeMarkdown() {
  await mergeMarkdownFiles(docsPath, outPath);
}
