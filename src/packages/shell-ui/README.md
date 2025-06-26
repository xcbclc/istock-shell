# @istock-shell/ui

一个基于 Svelte 和 Tailwind CSS 构建的现代化 UI 组件库。

## 安装

```bash
npm install @istock-shell/ui
# 或
pnpm add @istock-shell/ui
# 或
yarn add @istock-shell/ui
```

## 使用

### 基础用法

```svelte
<script>
  import { SimpleButton } from '@istock-shell/ui';
</script>

<SimpleButton text="点击我" />
```

### 样式导入

```css
/* 在你的主 CSS 文件中导入样式 */
@import '@istock-shell/ui/style';
```

## 组件

### SimpleButton

一个简单的按钮组件。

**属性：**
- `text: string` - 按钮文本（默认：'Click me'）
- `disabled: boolean` - 是否禁用（默认：false）

**事件：**
- `on:click` - 点击事件

**示例：**

```svelte
<SimpleButton 
  text="提交" 
  disabled={false} 
  on:click={() => console.log('clicked')} 
/>
```

## 开发

```bash
# 安装依赖
pnpm install

# 构建
pnpm run build

# 开发模式
pnpm run dev

# 代码检查
pnpm run lint

# 格式化代码
pnpm run format
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！