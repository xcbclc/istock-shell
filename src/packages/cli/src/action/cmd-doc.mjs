import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

const cwdPath = process.cwd();
const rootPath = cwdPath;
const cliPath = path.resolve(rootPath, './src/packages/cli');
const domainPath = path.resolve(rootPath, './src/worker/domains');
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = path.dirname(currentFilePath); // 当前目录

/**
 * 根据文件夹查找对应文件
 * @param directoryPath
 * @param files
 * @returns {*[]}
 */
function getAllCmdFiles(directoryPath, files = []) {
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);
    const isJson = path.extname(entry.name) === '.json' && entry.name.indexOf('cmd.json') !== -1;
    const isTs = path.extname(entry.name) === '.ts' && entry.name.indexOf('cmd.ts') !== -1;
    if (entry.isDirectory()) {
      getAllCmdFiles(fullPath, files);
    } else if (entry.isFile() && (isJson || isTs)) {
      files.push(fullPath);
    }
  }

  return files;
}

export default async () => {
  let output = execSync('tsc -p tsconfig-cli.json').toString();
  console.log(`ts转义执行结果:\n${output || '成功'}`);
  output = execSync('tsc-alias -p tsconfig-cli.json').toString();
  console.log(`ts路径替换执行结果:\n${output || '成功'}`);
  const cmdFiles = getAllCmdFiles(path.resolve(domainPath));
  const linkRecord = {}; // 命令文档入口数据
  // todo 暂时手写映射
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
    zq: {
      name: '债券',
      cmd: {
        kzzsssj: '可转债实时数据',
      },
    },
    tzrl: {
      name: '投资日历',
      cmd: {
        tzrl: '投资日历',
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
