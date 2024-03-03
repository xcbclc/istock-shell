import path from 'path';
import fs from 'fs';
import inquirer from 'inquirer';
import ejs from 'ejs';
import { toModelName, toClassName, toFileName } from '../utils/name.mjs';

const cwdPath = process.cwd();
const nameReg = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/; // 允许输入字母、数字和破折号（-）

export default async () => {
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
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '您期望命令相关文件名为？',
      validate: (input) => {
        if (!input) return false;
        return nameReg.test(input);
      },
    },
  ]);

  const templatePath = path.resolve(cwdPath, './src/packages/cli/src/template/cmd');
  const outputDir = path.resolve(cwdPath, `./src/worker/domains/${domain}`);
  const className = toClassName(name);
  const fileName = toFileName(name);
  const dirPath = path.resolve(outputDir, fileName);

  // 使用 fs.existsSync 检查文件夹是否存在
  if (!fs.existsSync(outputDir)) {
    // 如果文件夹不存在，则创建文件夹
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`${domain}命令域文件夹创建成功`);
  }
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // 读取模板文件
  const files = fs.readdirSync(templatePath);
  files.forEach((file) => {
    const realFileName = file.replace('tpl', fileName).replace('ejs', 'ts');
    const filePath = path.resolve(dirPath, realFileName);
    if (fs.existsSync(filePath)) {
      console.warn(`${filePath}文件在${fileName}目录下已存在，不需要创建`);
      return;
    }
    const templateContent = fs.readFileSync(`${templatePath}/${file}`, 'utf-8');
    const renderedContent = ejs.render(templateContent, {
      name,
      className,
      fileName,
      instanceName: className[0].toLowerCase() + className.slice(1),
      modelName: toModelName(name),
    });
    fs.writeFileSync(filePath, renderedContent);
  });

  console.log(`初始化命令开发已完成`);
};
