/**
 * @fileoverview 命令初始化模块
 * 提供交互式命令行界面用于创建新的命令开发模板
 * @author iStock Shell Team
 */

import path from 'path';
import fs from 'fs';
import inquirer from 'inquirer';
import ejs from 'ejs';
import { toModelName, toClassName, toFileName } from '../utils/name.mjs';

/** @type {string} 当前工作目录路径 */
const cwdPath = process.cwd();

/** @type {RegExp} 命名规则正则表达式，允许输入字母、数字和破折号（-） */
const nameReg = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

/**
 * 初始化命令开发环境
 * 通过交互式问答收集用户输入，生成命令开发所需的模板文件
 * 包括控制器、服务、模型和命令配置文件
 *
 * @async
 * @function
 * @returns {Promise<void>} 无返回值
 * @throws {Error} 当文件操作失败时抛出错误
 *
 * @example
 * // 运行命令初始化
 * await cmdInit();
 * // 用户将被提示输入命令域和文件名
 * // 系统将自动生成相应的模板文件
 */
export default async () => {
  // 获取命令域名称
  const { domain } = await inquirer.prompt([
    {
      type: 'input',
      name: 'domain',
      message: '在哪个命令域下开发命令？',
      validate: (domain) => {
        if (!domain) return false;
        return nameReg.test(domain);
      },
    },
  ]);

  // 获取命令文件名
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '您期望命令相关文件名为？(文件名用-符号分割)',
      validate: (input) => {
        if (!input) return false;
        return nameReg.test(input);
      },
    },
  ]);

  // 定义模板和输出路径
  /** @type {string} 命令模板文件路径 */
  const templatePath = path.resolve(cwdPath, './src/packages/cli/src/template/cmd');
  /** @type {string} 命令域输出目录路径 */
  const outputDir = path.resolve(cwdPath, `./src/worker/domains/${domain}`);

  // 生成各种命名格式
  /** @type {string} 类名（PascalCase格式） */
  const className = toClassName(name);
  /** @type {string} 实例名（camelCase格式） */
  const instanceName = className[0].toLowerCase() + className.slice(1);
  /** @type {string} 文件名（kebab-case格式） */
  const fileName = toFileName(name);
  /** @type {string} 命令文件目录路径 */
  const dirPath = path.resolve(outputDir, fileName);

  // 确保目录结构存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`${domain}命令域文件夹创建成功`);
  }
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // 处理模板文件生成
  /** @type {string[]} 模板文件列表 */
  const files = fs.readdirSync(templatePath);

  files.forEach((file) => {
    // 生成实际文件名（替换模板占位符）
    const realFileName = file.replace('tpl', fileName).replace('ejs', 'ts');
    /** @type {string} 目标文件完整路径 */
    const filePath = path.resolve(dirPath, realFileName);

    // 检查文件是否已存在，避免覆盖
    if (fs.existsSync(filePath)) {
      console.warn(`${filePath}文件在${fileName}目录下已存在，不需要创建`);
      return;
    }

    // 读取模板内容并使用EJS渲染
    const templateContent = fs.readFileSync(`${templatePath}/${file}`, 'utf-8');
    /** @type {string} 渲染后的文件内容 */
    const renderedContent = ejs.render(templateContent, {
      name, // 原始名称
      className, // 类名（PascalCase）
      classAlias: instanceName, // 类别名（camelCase）
      fileName, // 文件名（kebab-case）
      instanceName, // 实例名（camelCase）
      modelName: toModelName(name), // 模型名（snake_case）
    });

    // 写入生成的文件
    fs.writeFileSync(filePath, renderedContent);
  });

  console.log(`初始化命令开发已完成`);
};
