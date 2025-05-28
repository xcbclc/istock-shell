[**@istock-shell/command-parser**](../README.md)

---

[@istock-shell/command-parser](../globals.md) / Tokenizer

# Class: Tokenizer

Defined in: tokenizer.ts:117

词法分析器类

负责将输入的命令行字符串分解为 Token 序列。
该类是命令解析流程的第一步，将连续的字符串转换为
具有语义的词法单元，为后续的语法分析做准备。

支持的语法元素包括：

- 普通命令和参数
- 选项键（如 -v、--help）
- 管道操作符（|、&、||、&&）
- 圆括号分组
- 关键字命令（ai:、ss:、:）
- 字符串字面量（支持单引号、双引号、反引号）

## Example

```typescript
const tokenizer = new Tokenizer();
const tokens = tokenizer.parse('ls -la | grep test');
console.log(tokens);
```

## Constructors

### Constructor

> **new Tokenizer**(): `Tokenizer`

#### Returns

`Tokenizer`

## Properties

### symbol

> **symbol**: `object`

Defined in: tokenizer.ts:166

符号配置对象

定义了各种操作符和分隔符的具体值及其语义

#### options

> **options**: `string`[]

选项前缀符号列表

#### parenthesesLeft

> **parenthesesLeft**: `string`[]

左圆括号符号列表

#### parenthesesRight

> **parenthesesRight**: `string`[]

右圆括号符号列表

#### pipe2And

> **pipe2And**: `string`[]

条件 AND 管道符号列表 - 第一个命令正确，第一个和第二个命令的输出都会显示。第一个命令错误，不执行第二个命令

#### pipe2Or

> **pipe2Or**: `string`[]

条件 OR 管道符号列表 - 第一个命令正确，显示第一命令输出。第一个命令错误，显示第二个命令输出

#### pipeAnd

> **pipeAnd**: `string`[]

AND 管道符号列表 - 无论第一个命令是否错误，都会显示第一个命令和第二个命令的输出

#### pipeOr

> **pipeOr**: `string`[]

OR 管道符号列表 - 无论第一个命令是否错误，都会执行第二个命令，只显示第二个命令输出

## Methods

### parse()

> **parse**(`input`, `isCheck`): [`Token`](../type-aliases/Token.md)[]

Defined in: tokenizer.ts:224

解析输入字符串为 Token 序列

这是词法分析的主要方法，将输入的命令行字符串逐字符解析，
识别各种语法元素并生成对应的 Token。解析过程包括：

1. 逐字符扫描输入字符串
2. 识别空白字符并处理行列位置
3. 识别关键字命令（如 ai:、ss: 等）
4. 识别普通命令、参数、选项等
5. 进行语法检查，确保括号匹配、管道符使用正确等

#### Parameters

##### input

`string`

要解析的命令行字符串

##### isCheck

`boolean` = `true`

是否进行语法检查，默认为 true

#### Returns

[`Token`](../type-aliases/Token.md)[]

Token 序列数组

#### Example

```typescript
const tokenizer = new Tokenizer();

// 解析简单命令
const tokens1 = tokenizer.parse('ls -la');
console.log(tokens1);
// 输出: [{type: 'command', value: 'ls'}, {type: 'space', value: ' '}, {type: 'optionKey', value: '-la'}]

// 解析带管道的命令
const tokens2 = tokenizer.parse('ls | grep test');
// 输出包含命令、管道和参数的 Token 序列

// 解析关键字命令
const tokens3 = tokenizer.parse('ai: help me');
// 输出包含关键字命令和内容的 Token 序列

// 跳过语法检查
const tokens4 = tokenizer.parse('incomplete command', false);
```

#### Throws

当遇到无法识别的字符或语法错误时抛出
