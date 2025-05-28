/**
 * @fileoverview iStock Shell CLI工具主入口文件
 * 提供命令行接口用于初始化命令开发、生成文档等功能
 * @author iStock Shell Team
 */

import { program } from 'commander';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cmdInit from './action/cmd-init.mjs';
import cmdDoc from './action/cmd-doc.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));
import docPackage from './action/package.mjs';
import mergeMarkdown from './action/merge-markdown.mjs';
import shellUi from './action/shell-ui.mjs';

// 设置CLI工具版本号
program.version(packageJson.version);

/**
 * 注册'cmd init'命令
 * 用于初始化命令开发环境，创建命令模板文件
 */
program.command('cmd init').description('初始化命令开发').action(cmdInit);

/**
 * 注册'doc'命令组
 * 支持多种文档生成操作：
 * - cmd: 生成命令文档
 * - package: 生成包文档
 * - merge: 合并Markdown文档
 * - ui: 生成UI组件文档
 * @param {string} action - 文档生成操作类型
 */
program
  .command('doc <action>')
  .description('自动生成文档')
  .action(async (action) => {
    if (action === 'cmd') {
      await cmdDoc();
    }
    if (action === 'package') {
      await docPackage();
    }
    if (action === 'merge') {
      await mergeMarkdown();
    }
    if (action === 'ui') {
      await shellUi();
    }
  });

// 解析命令行参数并执行相应命令
program.parse(process.argv);
