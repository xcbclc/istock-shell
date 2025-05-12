import path from 'path';
import { glob } from 'glob';
import fs from 'fs/promises';

const cwdPath = process.cwd();
const rootPath = cwdPath;
const shellUiPath = path.resolve(rootPath, './src/packages/shell-ui');
const docsTargetPath = path.resolve(rootPath, './docs/packages/shell-ui');

async function processMarkdown(mdContent, basePath) {
  let result = mdContent;

  const componentRegex = /<IStockShellUiExample\b[\s\S]*?<\/IStockShellUiExample>|<IStockShellUiExample\b[^>]*\/?>/gis;
  const components = [];
  let componentMatch;

  while ((componentMatch = componentRegex.exec(mdContent)) !== null) {
    const fullMatch = componentMatch[0];
    const startTagMatch = fullMatch.match(/<IStockShellUiExample\b([^>]*)>/);

    const attributes = {
      $fullMatch: fullMatch, // 完整标签字符串（含闭合部分）
    };

    // 提取开始标签中的属性
    if (startTagMatch) {
      const attrStr = startTagMatch[1];
      const attrRegex = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
      let attrMatch;

      while ((attrMatch = attrRegex.exec(attrStr)) !== null) {
        const name = attrMatch[1].toLowerCase();
        const value = attrMatch[2] || attrMatch[3] || attrMatch[4];
        attributes[name] = value;
      }
    }

    components.push(attributes);
  }

  for (let component of components) {
    const originalSveltePath = component.src;

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
      const svelteFullPath = path.resolve(path.dirname(basePath), originalSveltePath);
      const svelteCode = await fs.readFile(svelteFullPath, 'utf-8');

      // 转义特殊字符（保留必要转义）
      const escapedCode = svelteCode.replace(/</g, '&lt;').replace(/>/g, '&gt;');

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

export default async function () {
  try {
    // 确保目标目录存在
    await fs.mkdir(docsTargetPath, { recursive: true });

    // 清空 components 目录
    const componentsDir = path.join(docsTargetPath, 'components');
    await fs.rm(componentsDir, { recursive: true, force: true }); // 强制删除目录及内容
    await fs.mkdir(componentsDir, { recursive: true }); // 重新创建空目录

    // 获取所有 MD 文件路径
    const mdPaths = await glob(path.resolve(shellUiPath, './src') + '/**/*.md');

    for (const mdPath of mdPaths) {
      // 读取原始 MD 文件内容
      const content = await fs.readFile(mdPath, 'utf-8');

      // 处理内容
      const processedContent = await processMarkdown(content, mdPath);

      // 计算目标路径
      const relativePath = path.relative(path.join(shellUiPath, 'src'), mdPath);
      const targetPath = path.join(docsTargetPath, relativePath);

      // 写入处理后的内容
      const fileName = path.basename(mdPath);
      // 只处理 README.md 和 index.md 文件
      if (fileName === 'README.md' || fileName === 'index.md') {
        // 确保目标目录存在
        await fs.mkdir(path.dirname(targetPath), { recursive: true });
        await fs.writeFile(targetPath, processedContent, 'utf-8');
        console.log(`已处理并处理到: ${relativePath}`);
      }
    }

    console.log('所有文件处理完成！');
  } catch (error) {
    console.error('处理文件时发生错误:', error);
  }
}
