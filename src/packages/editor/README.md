# @istock-shell/editor

`@istock-shell/editor` 是一个专为命令行界面设计的富文本编辑器库，提供了强大的命令输入、编辑和语法高亮功能。它能够将普通的命令字符串转换成富有标签和样式的HTML内容，让命令、子命令、参数及选项参数等关键元素以更直观、美观的方式呈现给用户。同时支持HTML内容反向转换回原始的命令字符串，实现命令内容的双向处理。

## ✨ 特性

- 🎨 **语法高亮**: 自动识别命令、参数、选项等元素并应用不同样式
- 📝 **富文本编辑**: 支持复杂的命令输入和编辑操作
- 🔄 **双向转换**: HTML与纯文本之间的无损转换
- 📍 **光标管理**: 精确的光标定位和选择范围控制
- 📚 **历史记录**: 内置撤销/重做功能
- 🎯 **事件系统**: 完整的事件监听和自定义事件支持
- 🌏 **中文输入**: 完善的中文输入法支持
- 🔧 **可扩展**: 模块化设计，易于扩展和定制

## 📦 安装

```bash
npm install @istock-shell/editor
# 或
pnpm add @istock-shell/editor
# 或
yarn add @istock-shell/editor
```

## 🚀 快速开始

### 基础用法

```typescript
import { CommandEditor } from '@istock-shell/editor';

// 获取命令输入容器元素
const inputElement = document.getElementById('command-input') as HTMLElement;

// 创建编辑器实例
const editor = new CommandEditor(inputElement);

// 挂载编辑器（设置焦点和事件监听）
editor.onMount();

// 获取当前输入内容
console.log(editor.input);

// 设置输入内容
editor.handleCommandInput('ls -la /home');

// 追加内容
editor.handleCommandInputAppend(' --color=auto');
```

### 事件监听

```typescript
import { CommandEditor, CommandEditorEventNames } from '@istock-shell/editor';
import type { CommandEditorRecommendCmdEvent } from '@istock-shell/editor';

const editor = new CommandEditor(inputElement);

// 监听推荐命令事件
inputElement.addEventListener(CommandEditorEventNames.RecommendCmd, (event: CommandEditorRecommendCmdEvent) => {
  console.log('推荐命令事件:', event.detail.data);
});

// 监听发送命令事件
inputElement.addEventListener(CommandEditorEventNames.SendCmd, (event) => {
  console.log('发送命令:', event.detail.data);
});

// 监听重新渲染事件
inputElement.addEventListener(CommandEditorEventNames.ReRenderCmd, (event) => {
  console.log('重新渲染命令');
});
```

### 光标操作

```typescript
import { CommandEditorCursor } from '@istock-shell/editor';

const cursor = new CommandEditorCursor(inputElement);

// 设置光标位置（基于文本偏移量）
cursor.setOffset(10);

// 移动到开始位置
cursor.moveToStart();

// 移动到结束位置
cursor.moveToEnd();

// 基于token偏移量移动
cursor.moveTokenOffset(2);

// 基于节点偏移量移动
cursor.moveNodeOffset(1);
```

### 解析器使用

```typescript
import { CommandEditorParser } from '@istock-shell/editor';
import type { CommandEditorContentNode } from '@istock-shell/editor';
import { TokenType } from '@istock-shell/command-parser';

const parser = new CommandEditorParser();

// DOM转文本
const text = parser.parseDomToText(inputElement);

// 虚拟节点转HTML
const vNodes: CommandEditorContentNode[] = [
  { id: 1, type: TokenType.command, value: 'ls' },
  { id: 2, type: TokenType.option, value: '-la' },
];
const html = parser.parseVNodeToHtml(vNodes);

// 虚拟节点转文本
const plainText = parser.parseVNodeToText(vNodes);
```

## 📚 API 文档

### CommandEditor

命令编辑器主类，提供完整的编辑功能。

#### 属性

- `commandInput: HTMLElement` - 只读，获取命令输入DOM元素
- `input: string` - 只读，获取当前输入的文本内容
- `vNodes: CommandEditorContentNode[]` - 只读，获取虚拟节点数组

#### 方法

- `constructor(commandInput: HTMLElement)` - 构造函数
- `onMount(): void` - 组件挂载，设置焦点并初始化事件监听
- `handleCommandInput(input: string, offsetText?: string, options?: CommandEditorInputOption): void` - 处理命令输入
- `handleCommandInputAppend(str: string): void` - 追加命令输入
- `syncVNodeAndHtml(): void` - 同步虚拟节点和HTML
- `getCursorOffsetText(): number` - 获取光标位置的文本偏移量
- `destroy(): void` - 销毁编辑器，清理资源

### CommandEditorCursor

光标操作类，提供精确的光标控制功能。

#### 属性

- `selection: Selection` - 浏览器选择对象

#### 方法

- `constructor(commandInput: HTMLElement)` - 构造函数
- `getOneRange(): Range` - 获取当前有效的Range对象
- `setOffset(offset: number): void` - 根据文本偏移量设置光标位置
- `moveToStart(): void` - 移动光标到开始位置
- `moveToEnd(): void` - 移动光标到结束位置
- `moveTokenOffset(offset: number): void` - 基于token偏移量移动光标
- `moveNodeOffset(offset: number): void` - 基于节点偏移量移动光标

### CommandEditorParser

解析器类，负责虚拟节点与DOM、文本之间的转换。

#### 静态属性

- `blockTagNames: string[]` - 块级标签名称数组
- `brTagName: string` - 换行标签名称
- `spaceRegMatch: RegExp` - 空格字符匹配正则表达式
- `lineBreak: string` - 换行符
- `space: string` - 空格字符

#### 方法

- `parseDomToText(dom: HTMLElement): string` - 将DOM元素解析为纯文本
- `getOffsetTextForDom(dom: HTMLElement, range: CommandEditorRangInfo): number` - 获取DOM中指定范围的文本偏移量
- `parseVNodeToHtml(vNodes: CommandEditorContentNode[]): string` - 将虚拟节点数组转换为HTML字符串
- `parseVNodeToText(vNodes: CommandEditorContentNode[]): string` - 将虚拟节点数组转换为纯文本
- `findCursorInfoForDom(dom: HTMLElement, offset: number): CommandEditorRangInfo | null` - 根据文本偏移量查找DOM中的光标位置信息

## 🎯 事件系统

### 事件类型

```typescript
enum CommandEditorEventNames {
  RecommendCmd = 'recommendCmd', // 推荐命令事件
  SendCmd = 'sendCmd', // 发送命令事件
  ReRenderCmd = 'reRenderCmd', // 重新渲染命令事件
}

enum CommandEditorActionTypes {
  Auto = 'auto', // 自动操作
  Up = 'up', // 向上操作
  Down = 'down', // 向下操作
  Undo = 'undo', // 撤销操作
  Redo = 'redo', // 重做操作
}
```

### 自定义事件

所有事件都遵循统一的事件结构：

```typescript
type CommandEditorCustomEvent<Data = unknown> = {
  detail: {
    data: Data;
    sourceEvent?: Event;
  };
} & Event;
```

## 🔧 类型定义

```typescript
// 内容节点类型
type CommandEditorContentNode = {
  id?: number;
} & Token;

// 范围信息类型
type CommandEditorRangInfo = {
  endContainer: Node;
  endOffset: number;
};

// 输入选项类型
type CommandEditorInputOption = {
  action?: CommandEditorActionTypes;
  event?: Event;
};

// 推荐命令数据类型
type CommandEditorRecommendCmdData = {
  action?: CommandEditorActionTypes;
  target: CommandEditor;
};
```

## 🎨 样式定制

编辑器生成的HTML结构支持CSS样式定制：

```css
/* 命令样式 */
[data-type='command'] {
  color: #0066cc;
  font-weight: bold;
}

/* 选项样式 */
[data-type='option'] {
  color: #cc6600;
}

/* 参数样式 */
[data-type='argument'] {
  color: #009900;
}

/* 字符串样式 */
[data-type='string'] {
  color: #cc0066;
}
```

## 🔗 依赖

- `@istock-shell/command-parser` - 命令解析器
- `@istock-shell/util` - 工具库

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目！

## 📞 支持

如果您在使用过程中遇到问题，请通过以下方式获取帮助：

- 提交 GitHub Issue
- 查看项目文档
- 联系项目维护者
