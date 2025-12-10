[**@istock-shell/command-parser**](../README.md)

---

[@istock-shell/command-parser](../globals.md) / Ast

# Class: Ast

Defined in: ast.ts:181

AST（抽象语法树）解析器类

负责将词法分析器产生的 Token 序列转换为抽象语法树结构。
该类是命令解析流程中的核心组件，将线性的 Token 序列转换为
具有层次结构的语法树，便于后续的语义分析和命令执行。

## Example

```typescript
const ast = new Ast();
const tree = ast.parse('ls -la | grep test');
console.log(tree);
// 输出包含命令、选项和管道操作符的抽象语法树结构
```

## Constructors

### Constructor

> **new Ast**(): `Ast`

Defined in: ast.ts:208

构造函数

初始化 AST 解析器，创建内部的词法分析器实例

#### Returns

`Ast`

## Accessors

### symbol

#### Get Signature

> **get** **symbol**(): `object`

Defined in: ast.ts:190

获取词法分析器的符号配置

##### Returns

符号配置对象，包含各种操作符和分隔符的定义

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

Defined in: ast.ts:199

获取词法分析器实例

##### Returns

[`Tokenizer`](Tokenizer.md)

词法分析器实例

## Methods

### parse()

> **parse**(`input`): [`AstTreeRoot`](../type-aliases/AstTreeRoot.md)

Defined in: ast.ts:244

解析输入字符串为抽象语法树

该方法是 AST 解析的主入口，接收命令行字符串输入，
通过词法分析器生成 Token 序列，然后递归构建语法树结构。

#### Parameters

##### input

`string`

待解析的命令行字符串

#### Returns

[`AstTreeRoot`](../type-aliases/AstTreeRoot.md)

解析后的抽象语法树

#### Throws

ScopeError 当遇到未知类型的 Token 时抛出

#### Example

```typescript
const ast = new Ast();

// 解析简单命令
const tree1 = ast.parse('ls -la');
// 输出: {type: 'root', children: [{type: 'command', value: 'ls', children: [{type: 'optionKey', value: '-la'}]}]}

// 解析管道命令
const tree2 = ast.parse('ls | grep test');
// 输出包含命令、管道和参数的抽象语法树结构

// 解析带圆括号的复杂命令
const tree3 = ast.parse('(ls -la && pwd) | grep home');
// 输出包含圆括号分组、命令、管道和参数的复杂抽象语法树结构

// 解析关键字命令
const tree4 = ast.parse('ai: 帮我写一个函数');
// 输出包含关键字命令和内容的抽象语法树结构
```
