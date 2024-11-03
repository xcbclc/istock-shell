import { program } from 'commander';
import packageJson from '../package.json' assert { type: 'json' };
import cmdInit from './action/cmd-init.mjs';
import cmdDoc from './action/cmd-doc.mjs';
import docPackage from './action/package.mjs';
import mergeMarkdown from './action/merge-markdown.mjs';

program.version(packageJson.version);

program.command('cmd init').description('初始化命令开发').action(cmdInit);

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
  });

program.parse(process.argv);
