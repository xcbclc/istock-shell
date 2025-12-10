/**
 * @fileoverview Shell UI组件文档生成模块
 * 处理Shell UI组件的Markdown文档，解析组件示例并生成最终文档
 * @author iStock Shell Team
 * @version 1.0.0
 */

import path from 'path';
import { glob } from 'glob';
import fs from 'fs/promises';

/** @type {string} 当前工作目录路径 */
const cwdPath = process.cwd();
/** @type {string} 项目根目录路径 */
const rootPath = cwdPath;
/** @type {string} Shell UI包源码路径 */
const shellUiPath = path.resolve(rootPath, './src/packages/shell-ui');
/** @type {string} 文档目标输出路径 */
const docsTargetPath = path.resolve(rootPath, './docs/packages/shell-ui');

/**
 * 处理Markdown内容中的组件示例
 * 解析IStockShellUiExample标签，读取对应的Svelte组件和示例文档
 * 将组件示例内容嵌入到最终的文档中
 *
 * @async
 * @function
 * @param {string} mdContent - 原始Markdown内容
 * @param {string} basePath - 当前Markdown文件的路径
 * @returns {Promise<string>} 处理后的Markdown内容
 * @throws {Error} 当文件读取失败时抛出错误
 *
 * @example
 * const processed = await processMarkdown(content, './src/components/button/README.md');
 */
async function processMarkdown(mdContent, basePath) {
  /** @type {string} 处理结果 */
  let result = mdContent;

  // 匹配IStockShellUiExample组件标签的正则表达式
  /** @type {RegExp} 组件标签匹配正则 */
  const componentRegex = /<IStockShellUiExample\b[\s\S]*?<\/IStockShellUiExample>|<IStockShellUiExample\b[^>]*\/?>/gis;

  /** @type {Array<Object>} 解析出的组件配置列表 */
  const components = [];
  let componentMatch;

  // 解析所有组件标签
  while ((componentMatch = componentRegex.exec(mdContent)) !== null) {
    /** @type {string} 完整的匹配字符串 */
    const fullMatch = componentMatch[0];
    /** @type {RegExpMatchArray|null} 开始标签匹配结果 */
    const startTagMatch = fullMatch.match(/<IStockShellUiExample\b([^>]*)>/);

    /** @type {Object} 组件属性对象 */
    const attributes = {
      $fullMatch: fullMatch, // 完整标签字符串（含闭合部分）
    };

    // 提取开始标签中的属性
    if (startTagMatch) {
      /** @type {string} 属性字符串 */
      const attrStr = startTagMatch[1];
      /** @type {RegExp} 属性匹配正则 */
      const attrRegex = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
      let attrMatch;

      // 解析所有属性
      while ((attrMatch = attrRegex.exec(attrStr)) !== null) {
        /** @type {string} 属性名（转为小写） */
        const name = attrMatch[1].toLowerCase();
        /** @type {string} 属性值 */
        const value = attrMatch[2] || attrMatch[3] || attrMatch[4];
        attributes[name] = value;
      }
    }

    components.push(attributes);
  }

  for (let component of components) {
    const originalSveltePath = component.src;

    if (!originalSveltePath) {
      console.warn(`[Warn] <IStockShellUiExample> tag missing 'src' attribute in ${basePath}`);
      continue;
    }

    // 获取当前 MD 文件相对于 src 目录的路径
    const mdRelativeDir = path.relative(path.join(shellUiPath, 'src/components'), path.dirname(basePath));
    // 构建新的 Svelte 文件路径
    const svelteFilePath = path.join(mdRelativeDir, originalSveltePath).replace(/\\/g, '/');
    // 获取对应的 MD 文件路径
    const mdFilePath = svelteFilePath.replace('.svelte', '.md');
    // 获取完整的 MD 文件路径
    const fullMdPath = path.resolve(path.join(shellUiPath, 'src/components'), mdFilePath);

    try {
      // 读取 Svelte 源码
      // const svelteFullPath = path.resolve(path.dirname(basePath), originalSveltePath);
      // const svelteCode = await fs.readFile(svelteFullPath, 'utf-8');

      // 转义特殊字符（保留必要转义）
      // const escapedCode = svelteCode.replace(/</g, '&lt;').replace(/>/g, '&gt;');

      const exampleMdContent = await fs.readFile(fullMdPath, 'utf-8');
      // 将源码插入标签内部
      const updatedComponent = component.$fullMatch.replace(originalSveltePath, './' + svelteFilePath);
      // .replace('><\/IStockShellUiExample>', `>\n<code>${escapedCode}</code>\n<\/IStockShellUiExample>`);
      if (['false', false].includes(component.raw)) {
        result = result.replace(component.$fullMatch, `${exampleMdContent}\n\n${updatedComponent}\n`);
      } else {
        result = result.replace(component.$fullMatch, `${exampleMdContent}\n\n::: raw\n${updatedComponent}\n:::\n`);
      }
    } catch (error) {
      console.warn(`无法读取示例 MD 文件: ${fullMdPath}`, error);
    }
  }

  return result;
}

/**
 * 生成Shell UI组件文档
 * 扫描Shell UI包中的所有Markdown文件，处理组件示例，生成最终的文档
 * 只处理README.md和index.md文件
 *
 * @async
 * @function
 * @returns {Promise<void>} 无返回值
 * @throws {Error} 当文件操作失败时抛出错误
 *
 * @example
 * // 生成Shell UI组件文档
 * await shellUiDoc();
 * // 将在docs/packages/shell-ui目录下生成处理后的文档
 */
export default async function () {
  try {
    // 确保目标目录存在
    await fs.mkdir(docsTargetPath, { recursive: true });

    // 清空components目录，确保生成的文档是最新的
    /** @type {string} 组件文档目录路径 */
    const componentsDir = path.join(docsTargetPath, 'components');
    await fs.rm(componentsDir, { recursive: true, force: true }); // 强制删除目录及内容
    await fs.mkdir(componentsDir, { recursive: true }); // 重新创建空目录

    // 获取所有Markdown文件路径
    /** @type {string[]} Markdown文件路径列表 */
    const mdPaths = await glob(path.resolve(shellUiPath, './src') + '/**/*.md');

    // 处理每个Markdown文件
    for (const mdPath of mdPaths) {
      // 读取原始Markdown文件内容
      /** @type {string} 原始文件内容 */
      const content = await fs.readFile(mdPath, 'utf-8');

      // 处理组件示例内容
      /** @type {string} 处理后的内容 */
      const processedContent = await processMarkdown(content, mdPath);

      // 计算目标文件路径
      /** @type {string} 相对路径 */
      const relativePath = path.relative(path.join(shellUiPath, 'src'), mdPath);
      /** @type {string} 目标文件完整路径 */
      const targetPath = path.join(docsTargetPath, relativePath);

      // 只处理特定的文档文件
      /** @type {string} 文件名 */
      const fileName = path.basename(mdPath);
      // 只处理 README.md 和 index.md 文件
      if (fileName === 'README.md' || fileName === 'index.md') {
        // 确保目标目录存在
        await fs.mkdir(path.dirname(targetPath), { recursive: true });
        // 写入处理后的内容
        await fs.writeFile(targetPath, processedContent, 'utf-8');
        console.log(`已处理并处理到: ${relativePath}`);
      }
    }

    console.log('所有文件处理完成！');
  } catch (error) {
    console.error('处理文件时发生错误:', error);
  }
}
