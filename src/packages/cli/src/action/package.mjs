import { execSync } from 'child_process';

export default async () => {
  try {
    const packageCmds = ['iswork', 'command-parser', 'editor'].map((value) => {
      return {
        name: value,
        cmd: `typedoc --plugin typedoc-plugin-markdown --tsconfig ./tsconfig-doc.json --out ./docs/packages/${value} ./src/packages/${value}/src/index.ts`,
      };
    });
    packageCmds.forEach((cmd) => {
      const output = execSync(cmd.cmd).toString();
      console.log(`${cmd.name}执行结果:\n${output}`);
    });
  } catch (error) {
    // 如果命令执行失败，捕获错误
    console.error(`执行时发生错误:\n${error}`);
  }
};
