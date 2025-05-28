**@istock-shell/command-parser**

---

# @istock-shell/command-parser

`@istock-shell/command-parser` 是一个功能强大且易于使用的命令行解析库，专为现代 TypeScript/JavaScript 应用程序设计。该库提供了完整的命令行解析解决方案，能够将复杂的命令行输入转换为结构化的数据对象，支持高级语法特性如管道操作、命令分组、嵌套命令等。

## ✨ 核心特性

- 🚀 **完整的解析流程**: 词法分析 → 语法分析 → 语义分析
- 🔧 **灵活的命令定义**: 支持参数、选项、子命令的灵活配置
- 🌊 **高级语法支持**: 管道操作符（`|`、`&`、`||`、`&&`）、圆括号分组
- 🎯 **类型安全**: 完整的 TypeScript 类型定义和运行时类型验证
- 📝 **关键字命令**: 支持特殊命令前缀（如 `ai:`、`ss:`）
- 🔍 **详细错误报告**: 精确的错误定位和友好的错误信息
- 🎨 **链式 API**: 支持流畅的链式调用语法

## 📦 安装

```bash
npm install @istock-shell/command-parser
# 或
yarn add @istock-shell/command-parser
# 或
pnpm add @istock-shell/command-parser
```

## 🚀 快速开始

### 基础用法

```typescript
import { CmdParser } from '@istock-shell/command-parser';

// 创建解析器实例
const parser = new CmdParser();

// 定义命令
parser.addCommand({
  name: 'copy',
  cmd: 'copy',
  description: '复制文件或目录',
  arguments: [
    { name: 'source', optional: false, parameterType: ['string'], description: '源文件路径' },
    { name: 'destination', optional: false, parameterType: ['string'], description: '目标路径' },
  ],
  options: [
    { name: 'recursive', parameter: ['r'], parameterType: ['boolean'], description: '递归复制目录' },
    { name: 'verbose', parameter: ['v'], parameterType: ['boolean'], description: '显示详细信息' },
  ],
  callback: (args) => {
    console.log(`复制 ${args.source} 到 ${args.destination}`);
    if (args.recursive) console.log('启用递归模式');
    if (args.verbose) console.log('启用详细输出');
  },
});

// 解析命令
const result = parser.parse('copy file1.txt file2.txt -r --verbose');
console.log(result);
```

### 管道操作

```typescript
// 支持多种管道操作符
const pipeResult1 = parser.parse('ls -la | grep test'); // OR 管道
const pipeResult2 = parser.parse('echo hello & echo world'); // AND 管道
const pipeResult3 = parser.parse('cmd1 || cmd2'); // 条件 OR
const pipeResult4 = parser.parse('cmd1 && cmd2'); // 条件 AND
```

### 命令分组

```typescript
// 使用圆括号进行命令分组
const groupResult = parser.parse('(echo start && echo process) | grep start');
```

### 关键字命令

```typescript
// 支持特殊的关键字命令
const aiResult = parser.parse('ai: 帮我写一个函数');
const searchResult = parser.parse('ss: TypeScript 教程');
```

## 📚 API 文档

### CmdParser 类

主要的命令行解析器类，提供完整的解析功能。

#### 构造函数

```typescript
const parser = new CmdParser();
```

#### 方法

##### addCommand(command: Command): this

添加命令定义。

```typescript
parser.addCommand({
  name: 'build',
  cmd: 'build',
  description: '构建项目',
  arguments: [
    {
      name: 'target',
      parameterType: ['string'],
      optional: true,
      default: 'dist',
    },
  ],
  options: [
    {
      name: 'watch',
      parameter: ['w'],
      parameterType: ['boolean'],
      description: '监听文件变化',
    },
  ],
});
```

##### addOption(option: Option): this

添加全局选项。

```typescript
parser.addOption({
  name: 'help',
  parameter: ['h'],
  parameterType: ['boolean'],
  description: '显示帮助信息',
});
```

##### addArgument(argument: Argument): this

添加全局参数。

```typescript
parser.addArgument({
  name: 'config',
  parameterType: ['string'],
  description: '配置文件路径',
});
```

##### parse(input: string): ParseResult

解析命令行字符串。

```typescript
const result = parser.parse('build src --watch');
```

### 接口定义

#### Command 接口

```typescript
interface Command {
  name: string; // 命令名称
  cmd: string; // 命令标识符
  usage?: string; // 用法说明
  description?: string; // 命令描述
  options?: Option[]; // 选项参数列表
  arguments?: Argument[]; // 位置参数列表
  commands?: Command[]; // 子命令列表
  callback?: (args: any) => void; // 回调函数
}
```

#### Option 接口

```typescript
interface Option {
  name: string; // 选项名称
  parameter: string[]; // 参数名称列表
  parameterType: string[]; // 参数类型列表，如 string、number、boolean
  description?: string; // 选项描述
  default?: any; // 默认值
  optional?: boolean; // 是否可选
  regex?: RegExp; // 正则表达式验证
  min?: number; // 最小值（数字类型适用）
  max?: number; // 最大值（数字类型适用）
  choices?: Array<string | number | boolean | null>; // 可选值列表
}
```

#### Argument 接口

```typescript
interface Argument {
  name: string; // 参数名称
  parameterType: string[]; // 参数类型列表，如 string、number、boolean
  description?: string; // 参数描述
  default?: any; // 默认值
  optional?: boolean; // 是否可选
  regex?: RegExp; // 正则表达式验证
  min?: number; // 最小值（数字类型适用）
  max?: number; // 最大值（数字类型适用）
  choices?: Array<string | number | boolean | null>; // 可选值列表
}
```

## 🔧 高级用法

### 嵌套子命令

```typescript
parser.addCommand({
  name: 'git',
  cmd: 'git',
  description: 'Git 版本控制',
  commands: [
    {
      name: 'commit',
      cmd: 'commit',
      description: '提交更改',
      options: [
        {
          name: 'message',
          parameter: ['m'],
          parameterType: ['string'],
          optional: false,
        },
      ],
    },
    {
      name: 'push',
      cmd: 'push',
      description: '推送到远程仓库',
      options: [
        {
          name: 'force',
          parameter: ['f'],
          parameterType: ['boolean'],
        },
      ],
    },
  ],
});

// 使用: git commit -m "Initial commit"
// 使用: git push --force
```

### 类型验证

```typescript
parser.addCommand({
  name: 'server',
  cmd: 'server',
  description: '启动服务器',
  arguments: [
    {
      name: 'port',
      parameterType: ['number'],
      optional: false,
      description: '服务器端口号',
    },
  ],
  options: [
    {
      name: 'host',
      parameter: ['host'],
      parameterType: ['string'],
      default: 'localhost',
      description: '服务器主机地址',
    },
  ],
});

// 使用: server 3000 --host 0.0.0.0
```

### 错误处理

```typescript
try {
  const result = parser.parse('invalid command syntax');
} catch (error) {
  if (error instanceof ScopeError) {
    console.error('解析错误:', error.message);
    // 错误信息包含详细的位置和原因
  }
}
```

## 🏗️ 架构设计

该库采用经典的编译器设计模式，包含三个主要阶段：

1. **词法分析（Tokenizer）**: 将输入字符串分解为 Token 序列
2. **语法分析（AST）**: 构建抽象语法树，表示命令的结构
3. **语义分析（Parser）**: 匹配命令定义，验证参数和选项

```
输入字符串 → Tokenizer → Token[] → AST → AstTree → Parser → 结构化结果
```
