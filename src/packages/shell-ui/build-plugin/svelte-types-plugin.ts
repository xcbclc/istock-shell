import type { Plugin } from 'vite';
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import { join, resolve } from 'path';

/**
 * 创建简化的Svelte类型提取插件
 * 用于从Svelte组件中提取TypeScript类型定义并生成.d.ts文件
 */
export const createSvelteTypesPlugin = (): Plugin => {
  return {
    name: 'svelte-types-extract',
    enforce: 'post',
    closeBundle() {
      try {
        console.log('🔍 Extracting Svelte component types...');
        const componentsDir = resolve(process.cwd(), 'src/components');
        const distDir = resolve(process.cwd(), 'dist/src/components');

        const processDirectory = (dir: string, relativePath = '') => {
          const items = readdirSync(dir);

          items.forEach((item) => {
            const itemPath = join(dir, item);
            const stat = statSync(itemPath);

            if (stat.isDirectory()) {
              processDirectory(itemPath, join(relativePath, item));
            } else if (item.endsWith('.svelte')) {
              extractTypesFromSvelte(itemPath, relativePath, item);
            }
          });
        };

        const extractTypesFromSvelte = (
          filePath: string,
          relativePath: string,
          fileName: string
        ) => {
          const content = readFileSync(filePath, 'utf-8');
          const moduleScriptMatch = content.match(
            /<script\s+lang=["']ts["']\s+module[^>]*>([\s\S]*?)<\/script>/i
          );

          if (moduleScriptMatch) {
            const moduleScript = moduleScriptMatch[1];
            const typeExports: string[] = [];

            // 先移除所有注释，避免干扰正则匹配
            const cleanModuleScript = moduleScript
              .replace(/\/\*[\s\S]*?\*\//g, '') // 移除块注释
              .replace(/\/\/.*$/gm, ''); // 移除行注释

            // 使用更精确的方法来提取类型定义
            const lines = cleanModuleScript.split('\n');
            let currentExport = '';
            let inExport = false;
            let braceCount = 0;
            let exportType = '';

            for (let i = 0; i < lines.length; i++) {
              const line = lines[i].trim();

              // 检测export type或export interface的开始
              if (line.match(/^export\s+(type|interface)\s+/)) {
                if (inExport && currentExport) {
                  // 保存之前的export
                  typeExports.push(currentExport.trim());
                }
                inExport = true;
                exportType = line.includes('type') ? 'type' : 'interface';
                currentExport = line;
                braceCount = 0;

                // 计算当前行的大括号
                for (const char of line) {
                  if (char === '{') braceCount++;
                  if (char === '}') braceCount--;
                }

                // 对于type，需要检查是否有等号和大括号
                if (exportType === 'type') {
                  // 如果包含等号和大括号，需要等待大括号平衡
                  if (line.includes('=') && line.includes('{')) {
                    // 如果大括号已平衡且以分号结尾，完成
                    if (braceCount === 0 && line.endsWith(';')) {
                      typeExports.push(currentExport.trim());
                      inExport = false;
                      currentExport = '';
                    }
                  }
                  // 如果只是简单的type定义（没有大括号）且以分号结尾，完成
                  else if (line.endsWith(';')) {
                    typeExports.push(currentExport.trim());
                    inExport = false;
                    currentExport = '';
                  }
                }
                // 如果是interface且大括号已平衡，完成
                else if (exportType === 'interface' && braceCount === 0 && line.includes('}')) {
                  typeExports.push(currentExport.trim());
                  inExport = false;
                  currentExport = '';
                }
              } else if (inExport) {
                // 继续当前的export，只有非空行才添加
                if (line.length > 0) {
                  currentExport += '\n' + line;
                }

                // 计算大括号
                for (const char of line) {
                  if (char === '{') braceCount++;
                  if (char === '}') braceCount--;
                }

                // 检查是否完成
                if (exportType === 'type') {
                  // 对于type，检查大括号平衡且以分号结尾
                  if (braceCount === 0 && line.endsWith(';')) {
                    typeExports.push(currentExport.trim());
                    inExport = false;
                    currentExport = '';
                  }
                } else if (exportType === 'interface') {
                  // 对于interface，检查大括号平衡且包含}
                  if (braceCount === 0 && line.includes('}')) {
                    typeExports.push(currentExport.trim());
                    inExport = false;
                    currentExport = '';
                  }
                }
              }
            }

            // 处理最后一个export（如果有）
            if (inExport && currentExport) {
              typeExports.push(currentExport.trim());
            }

            // 调试输出
            if (typeExports.length > 0) {
              console.log(`✓ Generated types for ${relativePath}: ${typeExports.length} exports`);
              typeExports.forEach((exp, idx) => {
                console.log(
                  `  Export ${idx + 1}: ${exp.substring(0, 100)}${exp.length > 100 ? '...' : ''}`
                );
              });
            }

            if (typeExports.length > 0) {
              // 生成类型定义内容，修复缩进问题
              const typeDefinitions = typeExports
                .map((exportStr) => {
                  // 清理注释和多余空行
                  const lines = exportStr
                    .split('\n')
                    .map((line) =>
                      line
                        .replace(/\/\*[\s\S]*?\*\//g, '')
                        .replace(/\/\/.*$/, '')
                        .trim()
                    )
                    .filter((line) => line.length > 0);

                  // 格式化接口和类型定义，确保正确的缩进
                  const formattedLines = [];
                  let indentLevel = 0;
                  const INDENT = '  '; // 使用2个空格作为缩进

                  for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];

                    // 如果行包含闭合大括号，先减少缩进级别
                    if (line.includes('}') && !line.includes('{')) {
                      indentLevel = Math.max(0, indentLevel - 1);
                    }

                    // 应用缩进
                    const indentedLine = INDENT.repeat(indentLevel) + line;
                    formattedLines.push(indentedLine);

                    // 如果行包含开放大括号，增加缩进级别
                    if (line.includes('{') && !line.includes('}')) {
                      indentLevel++;
                    }
                  }

                  return formattedLines.join('\n');
                })
                .join('\n');

              const outputPath = join(
                distDir,
                relativePath,
                fileName.replace('.svelte', '.svelte.d.ts')
              );
              const outputDir = join(distDir, relativePath);

              if (!existsSync(outputDir)) {
                mkdirSync(outputDir, { recursive: true });
              }

              // 获取文件名并转换为大写（去掉.svelte扩展名）
              const componentName = fileName.replace('.svelte', '');

              // 检查是否需要添加额外的import语句
              const needsHTMLAttributes = typeExports.some(
                (exp) =>
                  exp.includes('HTMLAttributes') ||
                  exp.includes('HTMLInputAttributes') ||
                  exp.includes('HTMLTextareaAttributes') ||
                  exp.includes('HTMLSelectAttributes') ||
                  exp.includes('HTMLFieldsetAttributes') ||
                  exp.includes('HTMLDialogAttributes') ||
                  exp.includes('HTMLFormAttributes') ||
                  exp.includes('HTMLTableAttributes') ||
                  exp.includes('HTMLColAttributes') ||
                  exp.includes('HTMLThAttributes') ||
                  exp.includes('HTMLTdAttributes') ||
                  exp.includes('HTMLLiAttributes') ||
                  exp.includes('HTMLImgAttributes') ||
                  exp.includes('HTMLOptionAttributes') ||
                  exp.includes('HTMLDataListAttributes') ||
                  exp.includes('HTMLBaseAttributes')
              );

              const needsSvelteTypes = typeExports.some(
                (exp) =>
                  exp.includes('SvelteHTMLElements') ||
                  exp.includes('Snippet') ||
                  exp.includes('Action')
              );

              const imports = ["import { SvelteComponent } from 'svelte';"];

              if (needsHTMLAttributes) {
                imports.push(
                  "import type { HTMLAttributes, HTMLInputAttributes, HTMLTextareaAttributes, HTMLSelectAttributes, HTMLFieldsetAttributes, HTMLDialogAttributes, HTMLFormAttributes, HTMLTableAttributes, HTMLColAttributes, HTMLThAttributes, HTMLTdAttributes, HTMLLiAttributes, HTMLImgAttributes, HTMLOptionAttributes, HTMLDataListAttributes, HTMLBaseAttributes } from 'svelte/elements';"
                );
              }

              if (needsSvelteTypes) {
                imports.push("import type { SvelteHTMLElements, Snippet, Action } from 'svelte';");
              }

              const typeContent = [
                ...imports,
                '',
                ...typeExports.map((exportStr) => {
                  // 重新格式化每个导出的类型定义，确保正确缩进
                  const lines = exportStr.split('\n');
                  const formattedLines = [];
                  let indentLevel = 0;
                  const INDENT = '  ';

                  for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (!trimmedLine) continue;

                    // 如果行包含闭合大括号，先减少缩进级别
                    if (trimmedLine.includes('}') && !trimmedLine.includes('{')) {
                      indentLevel = Math.max(0, indentLevel - 1);
                    }

                    // 应用缩进
                    const indentedLine = INDENT.repeat(indentLevel) + trimmedLine;
                    formattedLines.push(indentedLine);

                    // 如果行包含开放大括号，增加缩进级别
                    if (trimmedLine.includes('{') && !trimmedLine.includes('}')) {
                      indentLevel++;
                    }
                  }

                  return formattedLines.join('\n');
                }),
                '',
              ].join('\n');

              writeFileSync(outputPath, typeContent, 'utf-8');
              console.log(`✓ Generated types for ${fileName}: ${typeExports.length} exports`);
            }
          }
        };

        processDirectory(componentsDir);
      } catch (error) {
        console.error('Error extracting Svelte types:', error);
      }
    },
  };
};
