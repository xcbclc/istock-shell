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
  // 编译TypeScript文件
  let output = execSync('tsc -p tsconfig-cli.json').toString();
  console.log(`ts转义执行结果:\n${output || '成功'}`);

  // 处理TypeScript路径别名
  output = execSync('tsc-alias -p tsconfig-cli.json').toString();
  console.log(`ts路径替换执行结果:\n${output || '成功'}`);

  // 获取所有命令文件
  /** @type {string[]} 命令文件路径列表 */
  const cmdFiles = getAllCmdFiles(path.resolve(domainPath));

  /** @type {Object.<string, Array>} 命令文档链接记录 */
  const linkRecord = {};

  /**
   * 命令域和命令的中文名称映射
   * TODO: 后续考虑从配置文件中读取
   * @type {Object.<string, {name: string, cmd: Object.<string, string>}>}
   */
  const aliasRecord = {
    global: {
      name: '全局',
      cmd: {
        chart: '图表',
        'cmd-route': '命令',
        domain: '应用',
        history: '历史',
        user: '用户',
        ai: 'Ai',
      },
    },
    ag: {
      name: 'A股',
      cmd: {
        ggxxcx: '个股信息查询',
        gpsczm: '股票市场总貌',
        hqbj: '行情报价',
        lsfbsj: '历史分笔数据',
        lshqsj: '历史行情数据',
        sshqsj: '实时行情数据',
      },
    },
    wzdh: {
      name: '网站导航',
      cmd: {
        cj: '财经导航',
      },
    },
    kzz: {
      name: '可转债',
      cmd: {
        kzzsssj: '可转债实时数据',
        kzzsd: '可转债双低策略',
      },
    },
    tzrl: {
      name: '投资日历',
      cmd: {
        tzrl: '投资日历',
      },
    },
    cdfc: {
      name: '成都房产',
      cmd: {
        cdesf: '成都二手房行情',
      },
    },
  };
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
            return v.replaceAll('*', '\\*').replace('\n', '<br/>');
          },
          getIStockShellDemoHeight: (cmdData) => {
            const cmd = cmdData.cmd;
            const parentCmd = cmdData.parentCmd;
            if (cmd === 'lssc') {
              return 650;
            }
            if (parentCmd === 'tb' && ['bt', 'txt', 'zxt', 'gplzt'].includes(cmd)) {
              return 800;
            }
            return 480;
          },
        },
        { filename: templatePath }
      );
      fs.writeFileSync(filePath, renderedContent);
      if (!linkRecord[domainName]) linkRecord[domainName] = [];
      linkRecord[domainName].push({
        name: path.basename(file),
        link: `/use/command/${relativeBuildFilePath.replaceAll('\\', '/').replace(/.ts|.json/g, '.html')}`,
      });
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
            appName,
            list: linkRecord[k].map((item) => {
              const name = item.name.split('.')[0];
              item.name = aliasRecord[k]?.cmd?.[name] ?? item.name;
              return item;
            }),
          };
        }),
    })
  );
  console.log(`命令文档构建完毕`);
};
