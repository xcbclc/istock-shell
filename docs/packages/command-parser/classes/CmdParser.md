[**@istock-shell/command-parser**](../README.md)

---

[@istock-shell/command-parser](../globals.md) / CmdParser

# Class: CmdParser

Defined in: parser.ts:271

命令行解析器类

这是一个功能完整的命令行解析器，负责将用户输入的命令行字符串
解析为结构化的命令、参数和选项。支持复杂的命令行语法，包括：

- 嵌套命令和子命令
- 命名选项和位置参数
- 管道操作和命令组合
- 圆括号分组
- 类型验证和默认值处理

解析流程：

1. 使用词法分析器将输入转换为 Token 序列
2. 使用语法分析器构建抽象语法树（AST）
3. 遍历 AST 并匹配预定义的命令结构
4. 验证参数和选项的类型及必需性
5. 返回解析结果或错误信息

## Example

```typescript
const parser = new CmdParser();

// 添加命令定义
parser.addCommand({
  name: 'copy',
  cmd: 'copy',
  arguments: [
    { name: 'source', parameterType: ['string'], optional: false },
    { name: 'dest', parameterType: ['string'], optional: false },
  ],
  options: [{ name: 'recursive', parameter: ['r'], parameterType: ['boolean'] }],
});

// 解析命令行
const result = parser.parse('copy file1.txt file2.txt -r');
```

## Constructors

### Constructor

> **new CmdParser**(): `CmdParser`

Defined in: parser.ts:309

构造函数

初始化命令行解析器，创建必要的内部组件。

#### Returns

`CmdParser`

## Accessors

### symbol

#### Get Signature

> **get** **symbol**(): `object`

Defined in: parser.ts:290

获取符号表实例

##### Returns

符号表实例

###### options

> **options**: `string`[]

选项前缀符号列表

###### parenthesesLeft

> **parenthesesLeft**: `string`[]

左圆括号符号列表

###### parenthesesRight

> **parenthesesRight**: `string`[]

右圆括号符号列表

###### pipe2And

> **pipe2And**: `string`[]

条件 AND 管道符号列表 - 第一个命令正确，第一个和第二个命令的输出都会显示。第一个命令错误，不执行第二个命令

###### pipe2Or

> **pipe2Or**: `string`[]

条件 OR 管道符号列表 - 第一个命令正确，显示第一命令输出。第一个命令错误，显示第二个命令输出

###### pipeAnd

> **pipeAnd**: `string`[]

AND 管道符号列表 - 无论第一个命令是否错误，都会显示第一个命令和第二个命令的输出

###### pipeOr

> **pipeOr**: `string`[]

OR 管道符号列表 - 无论第一个命令是否错误，都会执行第二个命令，只显示第二个命令输出

---

### tokenizer

#### Get Signature

> **get** **tokenizer**(): [`Tokenizer`](Tokenizer.md)

Defined in: parser.ts:300

获取词法分析器实例

##### Returns

[`Tokenizer`](Tokenizer.md)

词法分析器实例

## Methods

### addArgument()

> **addArgument**(`argument`): `this`

Defined in: parser.ts:361

添加全局参数

向解析器添加一个全局参数定义。全局参数是位置参数，
按照添加的顺序从命令行中获取值。

#### Parameters

##### argument

[`Argument`](../interfaces/Argument.md)

要添加的参数定义

#### Returns

`this`

返回解析器实例，支持链式调用

#### Example

```typescript
parser.addArgument({
  name: 'inputFile',
  description: '输入文件路径',
  optional: false,
  parameterType: ['string'],
});
```

---

### addCommand()

> **addCommand**(`command`): `this`

Defined in: parser.ts:396

添加命令定义

向解析器添加一个命令定义。命令定义包含命令名称、描述、
参数、选项和执行动作等信息。

#### Parameters

##### command

[`Command`](../interfaces/Command.md)

要添加的命令定义

#### Returns

`this`

返回解析器实例，支持链式调用

#### Example

```typescript
parser.addCommand({
  name: 'copy',
  cmd: 'copy',
  description: '复制文件',
  arguments: [
    { name: 'source', parameterType: ['string'], optional: false },
    { name: 'destination', parameterType: ['string'], optional: false },
  ],
  options: [{ name: 'recursive', parameter: ['r'], parameterType: ['boolean'] }],
  callback: (args) => {
    console.log(`Copying ${args.source} to ${args.destination}`);
  },
});
```

---

### addOption()

> **addOption**(`option`): `this`

Defined in: parser.ts:335

添加全局选项

向解析器添加一个全局选项定义。全局选项可以在任何命令中使用，
通常用于定义通用的配置选项，如 --verbose、--help 等。

#### Parameters

##### option

[`Option`](../interfaces/Option.md)

要添加的选项定义

#### Returns

`this`

返回解析器实例，支持链式调用

#### Example

```typescript
parser.addOption({
  name: 'verbose',
  parameter: ['v'],
  description: '启用详细输出',
  parameterType: ['boolean'],
  default: false,
});
```

---

### parse()

> **parse**(`input`): [`CommandParserResult`](../type-aliases/CommandParserResult.md)

Defined in: parser.ts:434

解析命令行字符串

这是解析器的主要入口方法，将输入的命令行字符串解析为
结构化的命令执行结果。解析过程包括：

1. 词法分析 - 将字符串分解为 Token 序列
2. 语法分析 - 构建抽象语法树（AST）
3. 语义分析 - 匹配命令定义并验证参数
4. 结果生成 - 返回可执行的命令结果

#### Parameters

##### input

`string`

要解析的命令行字符串

#### Returns

[`CommandParserResult`](../type-aliases/CommandParserResult.md)

解析结果，包含匹配的命令、参数和选项

#### Example

```typescript
// 解析简单命令
const result1 = parser.parse('copy file1.txt file2.txt');

// 解析带选项的命令
const result2 = parser.parse('copy file1.txt file2.txt --recursive');

// 解析管道命令
const result3 = parser.parse('ls -la | grep test');

// 解析分组命令
const result4 = parser.parse('(echo hello && echo world) | grep hello');
```

#### Throws

当命令语法错误或找不到匹配的命令定义时抛出
