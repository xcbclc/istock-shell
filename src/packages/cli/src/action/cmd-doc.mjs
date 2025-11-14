/**
 * @fileoverview 命令文档生成模块
 * 自动扫描命令文件并生成对应的Markdown文档
 * 支持TypeScript和JSON格式的命令定义文件
 * @author iStock Shell Team
 */
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

/** @type {string} 当前工作目录路径 */
const cwdPath = process.cwd();
/** @type {string} 项目根目录路径 */
const rootPath = cwdPath;
/** @type {string} CLI包路径 */
const cliPath = path.resolve(rootPath, './src/packages/cli');
/** @type {string} 命令域目录路径 */
const domainPath = path.resolve(rootPath, './src/worker/domains');
/** @type {string} 当前文件路径 */
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = path.dirname(currentFilePath); // 当前目录

/**
 * 递归查找指定目录下的所有命令文件
 * 支持.ts和.json格式的命令定义文件
 *
 * @param {string} directoryPath - 要搜索的目录路径
 * @param {string[]} [files=[]] - 累积的文件路径数组
 * @returns {string[]} 找到的命令文件路径数组
 *
 * @example
 * const cmdFiles = getAllCmdFiles('./src/worker/domains');
 * console.log(cmdFiles); // ['./src/worker/domains/global/chart/chart.cmd.ts', ...]
 */
function getAllCmdFiles(directoryPath, files = []) {
  /** @type {fs.Dirent[]} 目录项列表 */
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true });

  for (const entry of entries) {
    /** @type {string} 完整文件路径 */
    const fullPath = path.join(directoryPath, entry.name);
    /** @type {boolean} 是否为JSON命令文件 */
    const isJson = path.extname(entry.name) === '.json' && entry.name.indexOf('cmd.json') !== -1;
    /** @type {boolean} 是否为TypeScript命令文件 */
    const isTs = path.extname(entry.name) === '.ts' && entry.name.indexOf('cmd.ts') !== -1;

    if (entry.isDirectory()) {
      // 递归处理子目录
      getAllCmdFiles(fullPath, files);
    } else if (entry.isFile() && (isJson || isTs)) {
      // 添加符合条件的命令文件
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * 生成命令文档
 * 编译TypeScript文件，扫描命令定义，生成对应的Markdown文档
 * 包括命令列表页面和各个命令的详细文档页面
 *
 * @async
 * @function
 * @returns {Promise<void>} 无返回值
 * @throws {Error} 当编译或文件操作失败时抛出错误
 *
 * @example
 * // 生成所有命令的文档
 * await cmdDoc();
 * // 将在docs/use/command目录下生成相应的Markdown文档
 */
export default async () => {
  console.log('开始编译TypeScript文件...');
  // 编译TypeScript文件
  let output = execSync('npx tsc -p tsconfig-cli.json').toString();
  console.log(`ts转义执行结果:\n${output || '成功'}`);
  console.log('TypeScript编译完成');

  // 处理TypeScript路径别名
  output = execSync('npx tsc-alias -p tsconfig-cli.json').toString();
  console.log(`ts路径替换执行结果:\n${output || '成功'}`);

  // 获取所有命令文件
  /** @type {string[]} 命令文件路径列表 */
  const cmdFiles = getAllCmdFiles(path.resolve(domainPath));

  /** @type {Object.<string, Array>} 命令文档链接记录 */
  const linkRecord = {};

  // 获取动态配置
  const aliasRecord = await getDomainAliasRecord();
  console.log('找到文件数量:', cmdFiles.length);

  /**
   * 根据输入参数生成命令选项配置
   * @param {Array} inputParams - 输入参数数组
   * @returns {{options: Object, args: Array}} 选项配置对象和必选参数数组
   */
  function generateCmdOptions(inputParams) {
    const options = {};
    const args = [];

    inputParams.forEach((param) => {
      const shortParam = `-${param.name}`;
      const longParam = `--${param.title}`;

      // 类型映射
      let paramType = 'string';
      if (param.type === 'str') {
        paramType = 'string';
      } else if (param.type === 'int64' || param.type === 'int') {
        paramType = 'number';
      } else if (param.type === 'float64' || param.type === 'float') {
        paramType = 'number';
      } else if (param.type === 'bool' || param.type === 'boolean') {
        paramType = 'boolean';
      } else if (param.type === 'object') {
        paramType = 'string';
      }

      const cmdOption = {
        name: param.name,
        parameter: [],
        parameterType: [paramType],
        description: param.description,
        default: param.defaultValue || '',
        optional: !param.isRequired,
        choices: param.choices || [],
      };

      if (param.isRequired) {
        args.push(cmdOption);
      } else {
        cmdOption.parameter = [shortParam, longParam];
        options[param.title] = cmdOption;
      }
    });

    return { options, args };
  }

  /**
   * 生成命令用法字符串
   * @param {string} cmd - 命令名称
   * @param {Array} args - 必选参数配置
   * @param {Object} options - 选项配置
   * @returns {string} 用法字符串
   */
  function generateUsage(cmd, args, options) {
    let usage = cmd;

    // 添加必选参数
    args.forEach((arg) => {
      usage += ` <${arg.name}>`;
    });

    // 添加可选参数
    Object.values(options).forEach((option) => {
      if (!['单位', '管道'].includes(option.name)) {
        const shortParam = option.parameter[0];
        usage += ` [${shortParam} ${option.default ? ['[', option.name, ']'].join('') : ['<', option.name, '>'].join('')}]`;
      }
    });

    return usage;
  }

  /**
   * 生成命令示例
   * @param {string} cmd - 命令名称
   * @param {Array} args - 必选参数配置
   * @param {Object} options - 选项配置
   * @returns {string} 示例字符串
   */
  function generateExample(cmd, args, options) {
    let example = cmd;

    args.forEach((arg) => {
      if (arg.default) {
        example += ` ${arg.default}`;
      } else if (arg.choices && arg.choices.length > 0) {
        example += ` ${arg.choices[0]}`;
      } else {
        example += ' 缺省值';
      }
    });

    return example;
  }

  /**
   * 从Controller文件中获取viewName作为显示名称
   * @param {string} cmdPath - cmd文件路径
   */
  function getControllerViewName(cmdPath) {
    try {
      // 将cmd文件路径转换为controller文件路径
      const controllerPath = cmdPath.replace(/\.cmd\.(ts|json)$/, '.controller.ts');

      if (!fs.existsSync(controllerPath)) {
        // 如果controller文件不存在，返回文件名作为默认值
        return path.basename(cmdPath, path.extname(cmdPath)).replace('.cmd', '');
      }

      // 读取controller文件内容
      const controllerContent = fs.readFileSync(controllerPath, 'utf-8');

      // 使用正则表达式匹配@Controller装饰器中的viewName（支持多行和注释）
      const controllerMatch = controllerContent.match(
        /@Controller\s*\(\s*{[\s\S]*?viewName\s*:\s*['"]([^'"]+)['"][\s\S]*?}\s*\)/
      );

      if (controllerMatch && controllerMatch[1]) {
        return controllerMatch[1];
      }

      // 如果没有找到viewName，尝试从alias中获取
      const aliasMatch = controllerContent.match(
        /@Controller\s*\(\s*{[\s\S]*?alias\s*:\s*['"]([^'"]+)['"][\s\S]*?}\s*\)/
      );

      if (aliasMatch && aliasMatch[1]) {
        return aliasMatch[1];
      }

      // 如果都没有找到，返回文件名作为默认值
      return path.basename(cmdPath, path.extname(cmdPath)).replace('.cmd', '');
    } catch (error) {
      console.warn(`获取controller viewName失败: ${cmdPath}`, error);
      return path.basename(cmdPath, path.extname(cmdPath)).replace('.cmd', '');
    }
  }

  /**
   * 从domains文件中动态获取配置信息
   * @returns {Promise<Object.<string, {name: string, cmd: Object.<string, string>}>>}
   */
  async function getDomainAliasRecord() {
    const aliasRecord = {};

    // 读取所有domain文件
    const domainFiles = fs
      .readdirSync(domainPath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    for (const domainName of domainFiles) {
      const domainFilePath = path.resolve(domainPath, domainName, `${domainName}.domain.ts`);
      if (fs.existsSync(domainFilePath)) {
        try {
          const domainContent = fs.readFileSync(domainFilePath, 'utf-8');

          let viewName = '';

          let viewNameMatch = domainContent.match(/viewName:\s*['"]([^'"]+)['"]/);
          viewName = viewNameMatch ? viewNameMatch[1] : domainName;

          // 处理akshare特殊情况，viewName可能是变量
          if (!viewNameMatch && domainName === 'akshare') {
            const nameVarMatch = domainContent.match(/const\s+name\s*=\s*['"]([^'"]+)['"]/);
            if (nameVarMatch) {
              viewName = nameVarMatch[1];
            }
          }

          // 初始化domain记录
          aliasRecord[domainName] = {
            name: viewName,
            cmd: {},
          };

          // 获取该domain下的所有命令文件
          const domainDir = path.resolve(domainPath, domainName);
          const cmdFiles = getAllCmdFiles(domainDir);
          console.log(`处理域 ${domainName}, 找到 ${cmdFiles.length} 个命令文件`);

          for (const cmdFile of cmdFiles) {
            try {
              let cmdData;
              if (path.extname(cmdFile) === '.ts') {
                const relativePath = cmdFile.replace(domainPath, 'src/worker/domains');
                const buildFilePath = path.resolve(
                  cliPath,
                  './dist/worker/domains',
                  relativePath.replace('.ts', '.js').replace('src/worker/domains/', '')
                );
                if (fs.existsSync(buildFilePath)) {
                  const relativeImportPath = path.relative(currentDirPath, buildFilePath);
                  const importedData = await import(relativeImportPath.replaceAll('\\', '/'));
                  cmdData = importedData.default;
                }
              } else if (path.extname(cmdFile) === '.json') {
                cmdData = JSON.parse(fs.readFileSync(cmdFile, 'utf8'));
              }

              if (cmdData) {
                const cmdList = cmdData.cmd ? [cmdData] : Object.values(cmdData);
                for (const cmd of cmdList) {
                  if (cmd.name && cmd.cmd) {
                    aliasRecord[domainName].cmd[cmd.cmd] = cmd.name;
                  }
                }
              }
            } catch (error) {
              console.warn(`解析命令文件失败: ${cmdFile}`, error.message);
            }
          }
        } catch (error) {
          console.warn(`解析domain文件失败: ${domainFilePath}`, error.message);
        }
      }
    }

    // 处理akshare特殊情况 - 从生成的接口文件中获取命令列表
    // 处理akshare特殊情况
    if (aliasRecord.akshare) {
      try {
        const akshareDir = path.resolve(rootPath, 'src/worker/akshare');
        if (fs.existsSync(akshareDir)) {
          // 递归获取所有.ts文件
          const getAllTsFiles = (dir, files = []) => {
            const entries = fs.readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
              const fullPath = path.join(dir, entry.name);
              if (entry.isDirectory()) {
                getAllTsFiles(fullPath, files);
              } else if (entry.isFile() && entry.name.endsWith('.ts')) {
                files.push(fullPath);
              }
            }
            return files;
          };

          const tsFiles = getAllTsFiles(akshareDir);
          for (const tsFile of tsFiles) {
            const content = fs.readFileSync(tsFile, 'utf-8');
            // 提取接口名称
            const nameMatches = content.match(/name:\s*['"]([^'"]+)['"]/g);
            if (nameMatches) {
              nameMatches.forEach((match) => {
                const cmdKey = match.match(/name:\s*['"]([^'"]+)['"]/)[1];
                const titleMatch = content.match(
                  new RegExp(
                    `name:\s*['"]${cmdKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"][\s\S]*?title:\s*['"]([^'"]+)['"]`
                  )
                );
                const title = titleMatch ? titleMatch[1] : cmdKey;
                aliasRecord.akshare.cmd[cmdKey] = title;
              });
            }
          }
        }
      } catch (error) {
        console.warn('获取akshare命令映射失败:', error.message);
      }
    }

    // 手动添加akshare域配置
    if (!aliasRecord.akshare) {
      aliasRecord.akshare = {
        name: 'AKShare',
        cmd: {},
      };
    }

    return aliasRecord;
  }

  for (let file of cmdFiles) {
    let data;
    let matchPathStr = 'src/worker/domains/';
    let buildFileStartIndex = file.indexOf(matchPathStr);
    if (buildFileStartIndex < 0) {
      matchPathStr = 'src\\worker\\domains\\';
      buildFileStartIndex = file.indexOf(matchPathStr);
    }
    const relativeBuildFilePath = file.substring(buildFileStartIndex).replace(matchPathStr, '');
    // eslint-disable-next-line no-useless-escape
    const domainName = relativeBuildFilePath.split(/[\/\\]/)[0];
    if (path.extname(file) === '.ts') {
      //处理ts类型
      const buildFilePath = path.resolve(cliPath, './dist/worker/domains', relativeBuildFilePath.replace('.ts', '.js'));
      const relativePath = path.relative(currentDirPath, buildFilePath);
      data = await import(relativePath.replaceAll('\\', '/'));
      if (data) data = data.default;
    }
    if (path.extname(file) === '.json') {
      // json类型
      data = JSON.parse(fs.readFileSync(file, 'utf8'));
    }
    // 通过数据生成md文档
    if (data) {
      // 读取模板文件
      const filePath = path.resolve(rootPath, './docs/use/command', relativeBuildFilePath.replace(/.ts|.json/g, '.md'));
      const dirPath = path.dirname(filePath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      const templatePath = path.resolve(cliPath, './src/template/doc/cmd/cmd.ejs');
      const templateContent = fs.readFileSync(templatePath, 'utf-8');
      data = data.default ? data.default : data;
      const cmdList = data.cmd ? [data] : Object.values(data);
      const cmdRecord = cmdList.reduce((record, item) => {
        if (record[item.cmd]) {
          const cmdData = record[item.cmd];
          if (item.subcommand) {
            cmdData.subcommand = [...cmdData.subcommand, item.subcommand];
          }
        } else {
          if (!item.subcommand) {
            item.subcommand = [];
          }
          if (Object.prototype.toString.call(item.subcommand) === '[object Object]') {
            item.subcommand = [item.subcommand];
          }
          record[item.cmd] = item;
        }
        return record;
      }, {});
      if (!aliasRecord[domainName]?.name) continue;
      const renderedContent = ejs.render(
        templateContent,
        {
          isGlobalDomain: domainName === 'global',
          domains: [
            {
              viewName: aliasRecord[domainName]?.name ?? domainName,
              name: domainName,
            },
          ],
          list: Object.values(cmdRecord),
          formatMdString: (v) => {
            if (Object.prototype.toString.call(v) !== '[object String]') return v;
            return v
              .replaceAll('*', '\\*')
              .replaceAll('|', '\\|')
              .replaceAll('[', '\\[')
              .replaceAll(']', '\\]')
              .replaceAll('`', '\\`')
              .replaceAll('_', '\\_')
              .replaceAll('#', '\\#')
              .replaceAll('~', '\\~')
              .replaceAll('^', '\\^')
              .replaceAll('"', '&quot;')
              .replaceAll("'", '&#39;')
              .replaceAll('{', '&#123;')
              .replaceAll('}', '&#125;')
              .replaceAll('<', '&lt;')
              .replaceAll('>', '&gt;')
              .replaceAll('\n', '<br/>');
          },
          getIStockShellDemoHeight: (_cmdData) => {
            return 640;
          },
        },
        { filename: templatePath }
      );
      fs.writeFileSync(filePath, renderedContent);
      if (!linkRecord[domainName]) linkRecord[domainName] = [];
      linkRecord[domainName].push({
        name: getControllerViewName(file),
        link: `/use/command/${relativeBuildFilePath.replaceAll('\\', '/').replace(/.ts|.json/g, '.html')}`,
      });
    }
  }

  // 特殊处理akshare域
  if (aliasRecord.akshare) {
    try {
      const akshareDir = path.resolve(rootPath, 'src/worker/akshare');
      if (fs.existsSync(akshareDir)) {
        // 递归获取所有.ts文件并按模块分组
        const moduleGroups = new Map();

        const getAllTsFiles = (dir, files = []) => {
          const entries = fs.readdirSync(dir, { withFileTypes: true });
          for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
              getAllTsFiles(fullPath, files);
            } else if (entry.isFile() && entry.name.endsWith('.ts')) {
              files.push(fullPath);
            }
          }
          return files;
        };

        const tsFiles = getAllTsFiles(akshareDir);

        for (const tsFile of tsFiles) {
          const content = fs.readFileSync(tsFile, 'utf-8');
          const relativePath = path.relative(akshareDir, tsFile);
          const moduleName = path.dirname(relativePath).replace(/\\/g, '/') || path.basename(tsFile, '.ts');

          try {
            // 提取导出的接口数组 - 更稳定的方法
            const arrayMatch = content.match(/export\s+const\s+\w+Interfaces\s*:\s*\w+\[\]\s*=\s*(\[[\s\S]*?\]);/);
            if (arrayMatch) {
              if (!moduleGroups.has(moduleName)) {
                moduleGroups.set(moduleName, []);
              }

              // 使用Function构造函数安全地解析数组数据
              const arrayStr = arrayMatch[1];
              let interfaces;
              try {
                // 创建一个安全的执行环境来解析数组
                interfaces = new Function('return ' + arrayStr)();
              } catch (evalError) {
                console.warn(`解析数组失败，尝试JSON.parse: ${tsFile}`);
                // 如果Function解析失败，尝试清理并使用JSON.parse
                const cleanedStr = arrayStr
                  .replace(/\/\*[\s\S]*?\*\//g, '') // 移除块注释
                  .replace(/\/\/.*$/gm, '') // 移除行注释
                  .replace(/,\s*}/g, '}') // 移除对象末尾多余的逗号
                  .replace(/,\s*]/g, ']'); // 移除数组末尾多余的逗号
                interfaces = JSON.parse(cleanedStr);
              }

              if (Array.isArray(interfaces)) {
                interfaces.forEach((interfaceObj) => {
                  if (interfaceObj.name && interfaceObj.title) {
                    // 解析inputParameters生成arguments和options
                    const { options, args } = generateCmdOptions(interfaceObj.inputParameters || []);

                    // 生成usage和example
                    const usage = generateUsage(interfaceObj.name, args, options);
                    const example = generateExample(interfaceObj.name, args, options);

                    const cmdRoute = {
                      name: interfaceObj.title,
                      cmd: interfaceObj.name,
                      usage: usage,
                      shortDescription: interfaceObj.description || '',
                      description: interfaceObj.description || '',
                      route: ['akshare', interfaceObj.name],
                      source: {
                        title: interfaceObj.moduleTitle || interfaceObj.title,
                        url: interfaceObj.targetUrl || '',
                      },
                      example: example,
                      arguments: args,
                      options: options,
                      subcommand: [],
                    };

                    moduleGroups.get(moduleName).push(cmdRoute);
                  }
                });
              }
            }
          } catch (parseError) {
            console.warn(`解析文件失败: ${tsFile}, 错误: ${parseError.message}`);
          }
        }

        // 为每个模块生成文档
        for (const [moduleName, commands] of moduleGroups) {
          if (commands.length > 0) {
            const filePath = path.resolve(rootPath, './docs/use/command/akshare', `${moduleName}.md`);
            const dirPath = path.dirname(filePath);
            if (!fs.existsSync(dirPath)) {
              fs.mkdirSync(dirPath, { recursive: true });
            }

            const templatePath = path.resolve(cliPath, './src/template/doc/cmd/cmd.ejs');
            const templateContent = fs.readFileSync(templatePath, 'utf-8');

            const renderedContent = ejs.render(
              templateContent,
              {
                isGlobalDomain: false,
                domains: [
                  {
                    viewName: aliasRecord.akshare?.name ?? 'AKShare',
                    name: 'akshare',
                  },
                ],
                list: commands,
                formatMdString: (v) => {
                  if (Object.prototype.toString.call(v) !== '[object String]') return v;
                  return v
                    .replaceAll('*', '\\*')
                    .replaceAll('|', '\\|')
                    .replaceAll('[', '\\[')
                    .replaceAll(']', '\\]')
                    .replaceAll('`', '\\`')
                    .replaceAll('_', '\\_')
                    .replaceAll('#', '\\#')
                    .replaceAll('~', '\\~')
                    .replaceAll('^', '\\^')
                    .replaceAll('"', '&quot;')
                    .replaceAll("'", '&#39;')
                    .replaceAll('{', '&#123;')
                    .replaceAll('}', '&#125;')
                    .replaceAll('<', '&lt;')
                    .replaceAll('>', '&gt;')
                    .replaceAll('\n', '<br/>');
                },
                getIStockShellDemoHeight: (_cmdData) => {
                  return 640;
                },
              },
              { filename: templatePath }
            );

            fs.writeFileSync(filePath, renderedContent);

            if (!linkRecord.akshare) linkRecord.akshare = [];
            // 从第一个命令中获取moduleTitle作为显示名称
            const moduleTitle = commands.length > 0 && commands[0].source ? commands[0].source.title : moduleName;
            linkRecord.akshare.push({
              name: moduleTitle,
              link: `/use/command/akshare/${moduleName}.html`,
            });
          }
        }
      }
    } catch (error) {
      console.warn('生成akshare文档失败:', error.message);
    }
  }

  const indexTemplateContent = fs.readFileSync(path.resolve(cliPath, './src/template/doc/cmd/index.ejs'), 'utf-8');

  fs.writeFileSync(
    path.resolve(rootPath, './docs/use/command/index.md'),
    ejs.render(indexTemplateContent, {
      links: Object.keys(linkRecord)
        .sort((k) => (k === 'global' ? -1 : 1))
        .map((k) => {
          const appName = aliasRecord[k]?.name ?? k;
          return {
            appName: appName === 'akshare' ? 'AKShare' : appName,
            list: linkRecord[k],
          };
        }),
    })
  );
  console.log(`命令文档构建完毕`);
};

// 如果直接运行此文件，则执行默认导出的函数
if (import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  (async () => {
    const cmdDoc = (await import(import.meta.url)).default;
    await cmdDoc();
  })();
}
