import fs from 'fs';
import path from 'path';

const cwdPath = process.cwd();
const rootPath = cwdPath;
const docsPath = path.resolve(rootPath, './docs');
const outPath = path.resolve(rootPath, './docs/all.md');

async function mergeMarkdownFiles(sourceDir, outputFile) {
  // 确保输出目录存在
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  // 创建一个可写流
  const outputStream = fs.createWriteStream(outputFile, { flags: 'a' });

  async function processDirectory(directory) {
    const items = fs.readdirSync(directory, { withFileTypes: true });
    for (let item of items) {
      const itemPath = path.join(directory, item.name);
      if (item.isDirectory()) {
        // 如果是子目录，递归处理
        await processDirectory(itemPath);
      } else if (item.isFile() && item.name.endsWith('.md')) {
        // 如果是.md文件，读取并写入目标文件
        const data = fs.readFileSync(itemPath);
        outputStream.write(data);
        // 添加换行符以分隔文件内容
        outputStream.write('\n');
      }
    }
  }

  await processDirectory(sourceDir);

  outputStream.end();

  console.log('Markdown文件合并成功');
}

export default async function mergeMarkdown () {
  await mergeMarkdownFiles(docsPath, outPath);
}
