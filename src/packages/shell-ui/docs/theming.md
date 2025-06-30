---
title: 主题定制 | IStock Shell UI
description: IStock Shell UI主题系统详细指南，包括颜色系统、尺寸规格、自定义主题、CSS变量、DaisyUI主题配置等完整的主题定制方案。
keywords: [IStock Shell UI主题, 主题定制, CSS变量, DaisyUI主题, 颜色系统, 样式定制, Tailwind CSS]
---

# 主题定制

IStock Shell UI 基于 Tailwind CSS 和 DaisyUI 构建了完整的主题系统，支持深度定制和动态切换。

## 🎨 主题系统概览

### 技术架构

- **基础框架**: Tailwind CSS 4.1+
- **主题引擎**: DaisyUI 5.0+
- **变量系统**: CSS 自定义属性
- **动态切换**: JavaScript 主题切换

### 主题层级

```
主题系统
├── DaisyUI 预设主题 (29个)
├── 组件变体配置
├── CSS 变量覆盖
└── 自定义主题扩展
```

## 🌈 颜色系统

### 核心颜色

IStock Shell UI 定义了8种核心颜色，每种颜色都有完整的色阶：

```css
:root {
  /* 主色系 */
  --primary: #3b82f6; /* 主色调 */
  --primary-content: #ffffff; /* 主色文字 */

  /* 次要色系 */
  --secondary: #64748b; /* 次要色 */
  --secondary-content: #ffffff;

  /* 强调色系 */
  --accent: #f59e0b; /* 强调色 */
  --accent-content: #ffffff;

  /* 中性色系 */
  --neutral: #374151; /* 中性色 */
  --neutral-content: #ffffff;

  /* 语义色系 */
  --info: #0ea5e9; /* 信息色 */
  --info-content: #ffffff;

  --success: #10b981; /* 成功色 */
  --success-content: #ffffff;

  --warning: #f59e0b; /* 警告色 */
  --warning-content: #ffffff;

  --error: #ef4444; /* 错误色 */
  --error-content: #ffffff;
}
```

### 颜色使用示例

```svelte
<script>
  import { ShButton, ShAlert, ShStat } from '@istock-shell/ui';
</script>

<!-- 不同颜色的按钮 -->
<div class="flex gap-2 flex-wrap">
  <ShButton color="primary">主色按钮</ShButton>
  <ShButton color="secondary">次要按钮</ShButton>
  <ShButton color="accent">强调按钮</ShButton>
  <ShButton color="neutral">中性按钮</ShButton>
  <ShButton color="info">信息按钮</ShButton>
  <ShButton color="success">成功按钮</ShButton>
  <ShButton color="warning">警告按钮</ShButton>
  <ShButton color="error">错误按钮</ShButton>
</div>

<!-- 不同颜色的提示 -->
<div class="space-y-2">
  <ShAlert color="info">这是信息提示</ShAlert>
  <ShAlert color="success">这是成功提示</ShAlert>
  <ShAlert color="warning">这是警告提示</ShAlert>
  <ShAlert color="error">这是错误提示</ShAlert>
</div>
```

## 📏 尺寸系统

### 尺寸规格

IStock Shell UI 提供5种标准尺寸：

```javascript
const sizes = {
  xs: '0.75rem', // 12px
  sm: '0.875rem', // 14px
  md: '1rem', // 16px (默认)
  lg: '1.125rem', // 18px
  xl: '1.25rem', // 20px
};
```

### 组件尺寸映射

```css
/* 按钮尺寸 */
.btn-xs {
  @apply h-6 px-2 text-xs min-h-6;
}
.btn-sm {
  @apply h-8 px-3 text-sm min-h-8;
}
.btn-md {
  @apply h-12 px-4 text-sm min-h-12;
}
.btn-lg {
  @apply h-16 px-6 text-lg min-h-16;
}
.btn-xl {
  @apply h-20 px-8 text-xl min-h-20;
}

/* 输入框尺寸 */
.input-xs {
  @apply h-6 px-2 text-xs min-h-6;
}
.input-sm {
  @apply h-8 px-3 text-sm min-h-8;
}
.input-md {
  @apply h-12 px-4 text-sm min-h-12;
}
.input-lg {
  @apply h-16 px-6 text-lg min-h-16;
}
.input-xl {
  @apply h-20 px-8 text-xl min-h-20;
}
```

### 尺寸使用示例

```svelte
<script>
  import { ShButton, ShInput } from '@istock-shell/ui';
</script>

<!-- 不同尺寸的按钮 -->
<div class="flex items-end gap-2">
  <ShButton size="xs">超小</ShButton>
  <ShButton size="sm">小</ShButton>
  <ShButton size="md">中等</ShButton>
  <ShButton size="lg">大</ShButton>
  <ShButton size="xl">超大</ShButton>
</div>

<!-- 不同尺寸的输入框 -->
<div class="space-y-2">
  <ShInput size="xs" placeholder="超小输入框" />
  <ShInput size="sm" placeholder="小输入框" />
  <ShInput size="md" placeholder="中等输入框" />
  <ShInput size="lg" placeholder="大输入框" />
  <ShInput size="xl" placeholder="超大输入框" />
</div>
```

## 🎭 预设主题

### DaisyUI 主题列表

IStock Shell UI 支持 DaisyUI 的所有29个预设主题：

```javascript
const themes = [
  'light', // 浅色主题 (默认)
  'dark', // 深色主题
  'cupcake', // 纸杯蛋糕
  'bumblebee', // 大黄蜂
  'emerald', // 翡翠绿
  'corporate', // 企业风
  'synthwave', // 合成波
  'retro', // 复古风
  'cyberpunk', // 赛博朋克
  'valentine', // 情人节
  'halloween', // 万圣节
  'garden', // 花园
  'forest', // 森林
  'aqua', // 水蓝
  'lofi', // Lo-Fi
  'pastel', // 粉彩
  'fantasy', // 幻想
  'wireframe', // 线框
  'black', // 纯黑
  'luxury', // 奢华
  'dracula', // 德古拉
  'cmyk', // CMYK
  'autumn', // 秋天
  'business', // 商务
  'acid', // 酸性
  'lemonade', // 柠檬水
  'night', // 夜晚
  'coffee', // 咖啡
  'winter', // 冬天
];
```

### 主题切换实现

```svelte
<!-- ThemeSwitcher.svelte -->
<script>
  import { ShSelect } from '@istock-shell/ui';
  import { onMount } from 'svelte';

  const themes = [
    { value: 'light', label: '浅色主题' },
    { value: 'dark', label: '深色主题' },
    { value: 'cupcake', label: '纸杯蛋糕' },
    { value: 'cyberpunk', label: '赛博朋克' },
    { value: 'dracula', label: '德古拉' },
    // ... 更多主题
  ];

  let currentTheme = 'light';

  // 应用主题
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    currentTheme = theme;
  }

  // 初始化主题
  onMount(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
  });

  // 主题变化处理
  function handleThemeChange(event) {
    applyTheme(event.target.value);
  }
</script>

<ShSelect
  bind:value={currentTheme}
  options={themes}
  label="选择主题"
  onchange={handleThemeChange}
/>
```

### 系统主题检测

```javascript
// 检测系统主题偏好
function getSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

// 监听系统主题变化
function watchSystemTheme(callback) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    callback(e.matches ? 'dark' : 'light');
  });
}

// 使用示例
const systemTheme = getSystemTheme();
applyTheme(systemTheme);

watchSystemTheme((theme) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(theme);
  }
});
```

## 🛠️ 自定义主题

### 创建自定义主题

```css
/* custom-theme.css */
[data-theme='my-custom'] {
  /* 基础颜色 */
  --primary: #6366f1;
  --primary-content: #ffffff;

  --secondary: #8b5cf6;
  --secondary-content: #ffffff;

  --accent: #06b6d4;
  --accent-content: #ffffff;

  --neutral: #1f2937;
  --neutral-content: #ffffff;

  /* 语义颜色 */
  --info: #3b82f6;
  --info-content: #ffffff;

  --success: #10b981;
  --success-content: #ffffff;

  --warning: #f59e0b;
  --warning-content: #1f2937;

  --error: #ef4444;
  --error-content: #ffffff;

  /* 背景颜色 */
  --base-100: #ffffff;
  --base-200: #f3f4f6;
  --base-300: #e5e7eb;
  --base-content: #1f2937;

  /* 边框和分割线 */
  --border-color: #d1d5db;
  --divider-color: #e5e7eb;

  /* 阴影 */
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

  /* 圆角 */
  --rounded-box: 0.5rem;
  --rounded-btn: 0.375rem;
  --rounded-badge: 1rem;

  /* 动画 */
  --animation-btn: 0.25s;
  --animation-input: 0.2s;

  /* 字体 */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

### 注册自定义主题

```javascript
// theme-config.js
export const customThemes = {
  'my-custom': {
    name: '我的自定义主题',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      // ... 更多颜色
    },
  },
  'company-brand': {
    name: '公司品牌主题',
    colors: {
      primary: '#ff6b35',
      secondary: '#004e89',
      accent: '#ffd23f',
      // ... 更多颜色
    },
  },
};

// 应用自定义主题
export function applyCustomTheme(themeName) {
  const theme = customThemes[themeName];
  if (!theme) return;

  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });

  root.setAttribute('data-theme', themeName);
}
```

## 🎨 组件样式定制

### 按钮样式定制

```css
/* 自定义按钮样式 */
.btn-custom {
  @apply btn;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  transition: all 0.3s ease;
}

.btn-custom:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.btn-custom:active {
  transform: translateY(0);
}
```

```svelte
<!-- 使用自定义按钮样式 -->
<button class="btn-custom"> 自定义样式按钮 </button>
```

### 输入框样式定制

```css
/* 自定义输入框样式 */
.input-custom {
  @apply input;
  border: 2px solid transparent;
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(135deg, #667eea, #764ba2) border-box;
  transition: all 0.3s ease;
}

.input-custom:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
```

### 卡片样式定制

```css
/* 玻璃态卡片 */
.card-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* 渐变卡片 */
.card-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}
```

## 🌙 深色模式支持

### 深色模式变量

```css
/* 深色模式主题 */
[data-theme='dark'] {
  --primary: #3b82f6;
  --primary-content: #ffffff;

  --secondary: #64748b;
  --secondary-content: #ffffff;

  --accent: #f59e0b;
  --accent-content: #1f2937;

  --neutral: #1f2937;
  --neutral-content: #ffffff;

  --base-100: #1f2937;
  --base-200: #374151;
  --base-300: #4b5563;
  --base-content: #f9fafb;

  --info: #3b82f6;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
}
```

### 深色模式切换

```svelte
<!-- DarkModeToggle.svelte -->
<script>
  import { ShButton } from '@istock-shell/ui';
  import { onMount } from 'svelte';

  let isDark = false;

  function toggleDarkMode() {
    isDark = !isDark;
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      isDark = savedTheme === 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // 检测系统偏好
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
  });
</script>

<ShButton color="neutral" size="sm" onclick={toggleDarkMode}>
  {isDark ? '🌞' : '🌙'}
  {isDark ? '浅色模式' : '深色模式'}
</ShButton>
```

## 📱 响应式主题

### 响应式颜色

```css
/* 响应式主题变量 */
:root {
  --primary: #3b82f6;
}

@media (max-width: 768px) {
  :root {
    --primary: #1d4ed8; /* 移动端使用更深的主色 */
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --primary: #60a5fa; /* 深色模式下的主色 */
  }
}
```

### 响应式尺寸

```css
/* 响应式组件尺寸 */
.btn-responsive {
  @apply btn-sm;
}

@media (min-width: 768px) {
  .btn-responsive {
    @apply btn-md;
  }
}

@media (min-width: 1024px) {
  .btn-responsive {
    @apply btn-lg;
  }
}
```

## 🔧 高级定制技巧

### CSS-in-JS 主题

```javascript
// theme-generator.js
export function generateTheme(config) {
  const { primary, secondary, accent, mode = 'light' } = config;

  const baseColors =
    mode === 'dark'
      ? {
          base100: '#1f2937',
          base200: '#374151',
          base300: '#4b5563',
          baseContent: '#f9fafb',
        }
      : {
          base100: '#ffffff',
          base200: '#f3f4f6',
          base300: '#e5e7eb',
          baseContent: '#1f2937',
        };

  return {
    '--primary': primary,
    '--secondary': secondary,
    '--accent': accent,
    '--base-100': baseColors.base100,
    '--base-200': baseColors.base200,
    '--base-300': baseColors.base300,
    '--base-content': baseColors.baseContent,
  };
}

// 应用生成的主题
export function applyGeneratedTheme(config) {
  const theme = generateTheme(config);
  const root = document.documentElement;

  Object.entries(theme).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}
```

### 主题预览器

```svelte
<!-- ThemePreview.svelte -->
<script>
  import { ShButton, ShInput, ShAlert, ShCard } from '@istock-shell/ui';

  export let theme;

  function applyPreviewTheme() {
    const previewContainer = document.querySelector('.theme-preview');
    Object.entries(theme).forEach(([property, value]) => {
      previewContainer.style.setProperty(property, value);
    });
  }

  $: if (theme) applyPreviewTheme();
</script>

<div class="theme-preview p-6 border rounded-lg" data-theme="custom">
  <h3 class="text-lg font-semibold mb-4">主题预览</h3>

  <div class="space-y-4">
    <!-- 按钮预览 -->
    <div class="flex gap-2">
      <ShButton color="primary" size="sm">主色按钮</ShButton>
      <ShButton color="secondary" size="sm">次要按钮</ShButton>
      <ShButton color="accent" size="sm">强调按钮</ShButton>
    </div>

    <!-- 输入框预览 -->
    <ShInput placeholder="输入框预览" />

    <!-- 提示预览 -->
    <ShAlert color="info">这是主题预览效果</ShAlert>
  </div>
</div>
```

## 📚 最佳实践

### 1. 主题一致性

- 在整个应用中保持主题一致性
- 避免混用不同的颜色系统
- 确保文字和背景的对比度符合无障碍标准

### 2. 性能优化

- 使用 CSS 变量而不是重复的样式规则
- 避免过度的主题切换动画
- 合理使用主题缓存

### 3. 用户体验

- 提供主题切换的视觉反馈
- 记住用户的主题偏好
- 支持系统主题自动切换

### 4. 开发效率

- 建立主题设计系统
- 使用主题生成工具
- 创建主题文档和规范

## 🔍 故障排除

### 常见问题

**Q: 主题切换后样式没有生效？**
A: 检查 CSS 变量是否正确定义，确保 `data-theme` 属性正确设置。

**Q: 自定义主题颜色显示异常？**
A: 确保颜色值格式正确，检查 CSS 变量的优先级。

**Q: 深色模式下文字看不清？**
A: 检查文字颜色和背景颜色的对比度，调整 `*-content` 变量。

**Q: 主题在某些组件上不生效？**
A: 确保组件正确使用了主题变量，检查 CSS 选择器的特异性。

---

<p class="text-center text-gray-500 mt-8">
  🎨 通过主题定制，让你的应用拥有独特的视觉风格！
</p>
