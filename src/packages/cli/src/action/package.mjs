/**
 * @fileoverview 包文档生成模块
 * 使用TypeDoc为各个包生成API文档
 * @author iStock Shell Team
 * @version 1.0.0
 */

import { execSync } from 'child_process';
import { copyFileSync, mkdirSync, cpSync, existsSync } from 'fs';
import { dirname } from 'path';

/**
 * 生成包文档
 * 为项目中的各个包生成TypeDoc API文档
 * 包括iswork、command-parser、editor、util等核心包
 *
 * @async
 * @function
 * @returns {Promise<void>} 无返回值
 * @throws {Error} 当TypeDoc命令执行失败时抛出错误
 *
 * @example
 * // 生成所有包的API文档
 * await packageDoc();
 * // 将在docs/packages目录下生成各包的文档
 */
export default async () => {
  try {
    /**
     * 包文档生成命令配置
     * @type {Array<{name: string, cmd: string}>}
     */
    const packageCmds = ['iswork', 'command-parser', 'editor', 'util'].map((value) => {
      return {
        /** @type {string} 包名称 */
        name: value,
        /** @type {string} TypeDoc生成命令 */
        cmd: `typedoc --plugin typedoc-plugin-markdown --tsconfig ./tsconfig-doc.json --out ./docs/packages/${value} ./src/packages/${value}/src/index.ts`,
      };
    });
    // 拷贝CLI包的README.md文件到文档目录
    try {
      const sourceReadme = './src/packages/cli/README.md';
      const targetReadme = './docs/packages/cli/README.md';
      // 确保目标目录存在
      mkdirSync(dirname(targetReadme), { recursive: true });
      // 拷贝README.md文件
      copyFileSync(sourceReadme, targetReadme);
      console.log('CLI包README.md文件已成功拷贝到文档目录');
    } catch (copyError) {
      console.error('拷贝CLI包README.md文件时发生错误:', copyError.message);
    }

    // 拷贝iswork包的docs目录到文档目录
    try {
      const sourceDocsDir = './src/packages/iswork/docs';
      const targetDocsDir = './docs/packages/iswork';
      // 检查源目录是否存在
      if (existsSync(sourceDocsDir)) {
        // 确保目标目录存在
        mkdirSync(dirname(targetDocsDir), { recursive: true });
        // 拷贝整个docs目录
        cpSync(sourceDocsDir, targetDocsDir, { recursive: true, force: true });
        console.log('iswork包docs目录已成功拷贝到文档目录');
      } else {
        console.warn('iswork包docs目录不存在，跳过拷贝');
      }
    } catch (copyError) {
      console.error('拷贝iswork包docs目录时发生错误:', copyError.message);
    }
    // 执行每个包的文档生成命令
    packageCmds.forEach((cmd) => {
      const output = execSync(cmd.cmd).toString();
      console.log(`${cmd.name}执行结果:\n${output}`);
    });
  } catch (error) {
    // 捕获并处理命令执行错误
    console.error(`执行时发生错误:\n${error}`);
  }
};
