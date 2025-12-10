**@istock-shell/editor**

---

# @istock-shell/editor

`@istock-shell/editor` 是一个基于 TipTap 的现代化命令行富文本编辑器库，专为命令行界面设计。它提供了强大的命令输入、编辑、语法高亮、提及建议和键盘快捷键功能，让命令行交互更加直观和高效。

## ✨ 特性

- 🎨 **语法高亮**: 基于词法分析器自动识别命令、参数、选项等元素并应用不同样式
- 📝 **富文本编辑**: 基于 TipTap 的现代化编辑体验，支持撤销/重做
- 💡 **智能提及**: 支持 @ 提及功能，可自定义建议列表和渲染
- ⌨️ **键盘快捷键**: 完整的快捷键支持，包括回车发送、方向键导航、撤销重做等
- 🎯 **事件系统**: 完整的事件监听和自定义事件支持
- 🔧 **可扩展**: 模块化设计，基于 TipTap 扩展系统，易于扩展和定制
- 📍 **光标管理**: 精确的光标定位和文本操作
- 🌏 **现代化**: 使用 TypeScript 编写，提供完整的类型支持

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

### 配置选项

```typescript
import { CommandEditor } from '@istock-shell/editor';
import type { CommandEditorOptions } from '@istock-shell/editor';

const options: CommandEditorOptions = {
  // 命令高亮配置
  commandHighlighter: {
    // 会自动使用内置的 Tokenizer
  },

  // 提及功能配置
  mention: {
    HTMLAttributes: {
      class: 'custom-mention',
    },
    suggestionOption: {
      getSuggestionList: async (query: string) => {
        // 返回建议列表
        return [
          { id: 1, label: 'command1', value: 'cmd1', type: 'command' },
          { id: 2, label: 'command2', value: 'cmd2', type: 'command' },
        ];
      },
      renderSuggestionList: async (list, state) => {
        // 渲染建议列表 UI
        const element = document.createElement('div');
        element.className = 'suggestion-list';
        // ... 渲染逻辑
        return element;
      },
      updateSuggestionListPosition: (x, y, position) => {
        // 更新建议列表位置
      },
      onKeyDownSuggestion: (event) => {
        // 处理建议列表键盘事件
        return false;
      },
      onDestroySuggestion: () => {
        // 销毁建议列表
      },
    },
  },

  // 键盘快捷键配置
  keyboardShortcuts: {
    Enter: () => true, // 自定义回车行为
  },
};

const editor = new CommandEditor(inputElement, '', options);
```

### 事件监听

```typescript
import { CommandEditor, CommandEditorEventNames } from '@istock-shell/editor';
import type { CommandEditorRecommendCmdEvent } from '@istock-shell/editor';

const editor = new CommandEditor(inputElement);

// 监听推荐命令事件（方向键、Tab键触发）
inputElement.addEventListener(CommandEditorEventNames.RecommendCmd, (event: CommandEditorRecommendCmdEvent) => {
  const { action, target } = event.detail.data;
  console.log('推荐命令事件:', action, target);
});

// 监听发送命令事件（回车键触发）
inputElement.addEventListener(CommandEditorEventNames.SendCmd, (event) => {
  const { target } = event.detail.data;
  console.log('发送命令:', target.input);
});
```

## 📚 API 文档

### CommandEditor

命令编辑器主类，基于 TipTap 编辑器构建。

#### 属性

- `commandInput: HTMLElement` - 只读，获取命令输入DOM元素
- `editor: Editor` - 只读，获取 TipTap 编辑器实例
- `input: string` - 只读，获取当前输入的纯文本内容
- `inputJson: object` - 只读，获取当前输入内容的JSON表示

#### 方法

- `constructor(commandInput: HTMLElement, content?: string, options?: CommandEditorOptions)` - 构造函数
- `onMount(): void` - 组件挂载，设置焦点并初始化事件监听
- `handleCommandInput(input: string): void` - 设置命令输入内容
- `handleCommandInputAppend(str: string): void` - 追加命令输入内容
- `getCursorOffsetText(): string` - 获取光标位置前的文本内容
- `getCursorClientRect(): DOMRect` - 获取光标位置的客户端矩形信息
- `destroy(): void` - 销毁编辑器，清理资源

### 配置选项类型

#### CommandEditorOptions

```typescript
type CommandEditorOptions = {
  commandHighlighter?: Partial<CommandHighlighterOption>;
  mention?: Partial<MentionOptions> & { suggestionOption?: MentionSuggestionOption };
  keyboardShortcuts?: KeyboardShortcutsOption;
};
```

#### CommandHighlighterOption

```typescript
interface CommandHighlighterOption {
  tokenizer: Tokenizer; // 词法分析器实例
}
```

#### MentionSuggestionOption

```typescript
interface MentionSuggestionOption {
  getSuggestionList: (query: string) => Promise<MentionSuggestionData[]>;
  renderSuggestionList: (list: MentionSuggestionData[], state: 'start' | 'update') => Promise<HTMLElement | undefined>;
  updateSuggestionListPosition: (x: number, y: number, position: string) => void;
  onKeyDownSuggestion: (event: KeyboardEvent) => boolean;
  onDestroySuggestion: () => void;
}
```

#### MentionSuggestionData

```typescript
interface MentionSuggestionData extends Record<string, any> {
  id: string | number;
  label: string;
  value: string;
  type: string;
  extra?: Record<string, any>;
}
```

#### KeyboardShortcutsOption

```typescript
interface KeyboardShortcutsOption {
  Enter?: () => Boolean;
}
```

## 🎯 事件系统

### 事件类型

```typescript
enum CommandEditorEventNames {
  RecommendCmd = 'recommendCmd', // 推荐命令事件
  SendCmd = 'sendCmd', // 发送命令事件
}

enum CommandEditorActionTypes {
  Auto = 'auto', // 自动操作（Tab键）
  Up = 'up', // 向上操作（方向键上）
  Down = 'down', // 向下操作（方向键下）
  Undo = 'undo', // 撤销操作
  Redo = 'redo', // 重做操作
}
```

### 键盘快捷键

- `Enter`: 发送命令事件
- `Shift + Enter`: 插入换行符
- `Tab`: 触发自动推荐命令事件
- `Alt/Ctrl/Cmd + ↑`: 触发向上推荐命令事件
- `Alt/Ctrl/Cmd + ↓`: 触发向下推荐命令事件
- `Ctrl/Cmd + Z`: 撤销操作
- `Ctrl/Cmd + Shift + Z`: 重做操作

### 自定义事件

所有事件都遵循统一的事件结构：

```typescript
type CommandEditorCustomEvent<Data = unknown> = {
  detail: {
    data: Data;
    sourceEvent?: Event;
  };
} & Event;

type CommandEditorRecommendCmdData = {
  action?: CommandEditorActionTypes;
  target: CommandEditor;
};

type CommandEditorRecommendCmdEvent = CommandEditorCustomEvent<CommandEditorRecommendCmdData>;
```

## 🎨 样式定制

编辑器使用 CSS 类名进行语法高亮，支持以下样式定制：

```css
/* 命令样式 */
.is-command {
  color: #0066cc;
  font-weight: bold;
}

/* 参数样式 */
.is-parameter {
  color: #009900;
}

/* 选项键样式 */
.is-optionKey {
  color: #cc6600;
}

/* 管道符样式 */
.is-pipe {
  color: #cc0066;
}

/* 关键命令样式 */
.is-keyCommand {
  color: #9900cc;
}

/* 关键命令内容样式 */
.is-keyCommandContent {
  color: #cc9900;
}

/* 括号样式 */
.is-parentheses {
  color: #666666;
}

/* 提及样式 */
.is-mention {
  background-color: #f0f0f0;
  border-radius: 3px;
  padding: 0 2px;
}
```

## 🔗 依赖

### 主要依赖

- `@tiptap/core` - TipTap 核心编辑器
- `@tiptap/starter-kit` - TipTap 基础功能包
- `@tiptap/extension-mention` - TipTap 提及扩展
- `@floating-ui/dom` - 浮动定位库
- `@istock-shell/command-parser` - 命令解析器
- `@istock-shell/util` - 工具库

### 开发依赖

- `typescript` - TypeScript 支持
- `rollup` - 构建工具
- `@rollup/plugin-typescript` - TypeScript 插件

## 🏗️ 架构设计

编辑器采用模块化设计，主要包含以下模块：

1. **CommandEditor**: 主编辑器类，整合所有功能
2. **CommandHighlighter**: 命令语法高亮扩展
3. **MentionSuggestion**: 提及建议功能
4. **KeyboardShortcuts**: 键盘快捷键处理

每个模块都可以独立配置和扩展，基于 TipTap 的扩展系统构建。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目！

## 📞 支持

如果您在使用过程中遇到问题，请通过以下方式获取帮助：

- 提交 [GitHub Issue](https://github.com/xcbclc/istock-shell/issues)
- 查看项目文档
- 联系项目维护者

## 📄 许可证

MIT License
