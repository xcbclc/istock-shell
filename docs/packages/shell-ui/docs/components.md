---
title: 组件指南 | IStock Shell UI
description: IStock Shell UI 完整组件使用指南，包括动作组件、数据录入、数据展示、反馈组件、导航组件和扩展组件的详细使用方法、API参考和最佳实践。
keywords: [IStock Shell UI组件, Svelte组件, 组件使用指南, UI组件库, 组件API, 最佳实践]
---

# 组件指南

IStock Shell UI 提供了丰富的组件库，涵盖了现代 Web 应用开发的各个方面。本指南将详细介绍每个组件的使用方法和最佳实践。

## 📋 组件分类

### 🎯 动作组件 (Action)

用于触发操作和交互的组件

### 📝 数据录入 (Data Input)

用于收集和输入数据的表单组件

### 📊 数据展示 (Data View)

用于展示和呈现数据的组件

### 💬 反馈组件 (Feedback)

用于向用户提供反馈信息的组件

### 🧭 导航组件 (Navigation)

用于页面导航和路由的组件

### 🔧 扩展组件 (Extend)

提供高级功能和特殊用途的组件

---

## 🎯 动作组件

### ShButton - 按钮组件

功能丰富的按钮组件，支持多种样式和状态。

#### 基础用法

```svelte
<script>
  import { ShButton } from '@istock-shell/ui';
</script>

<!-- 基础按钮 -->
<ShButton>默认按钮</ShButton>

<!-- 不同颜色 -->
<ShButton color="primary">主要按钮</ShButton>
<ShButton color="secondary">次要按钮</ShButton>
<ShButton color="success">成功按钮</ShButton>
<ShButton color="warning">警告按钮</ShButton>
<ShButton color="error">错误按钮</ShButton>

<!-- 不同尺寸 -->
<ShButton size="xs">超小</ShButton>
<ShButton size="sm">小</ShButton>
<ShButton size="md">中等</ShButton>
<ShButton size="lg">大</ShButton>
<ShButton size="xl">超大</ShButton>
```

#### 样式变体

```svelte
<!-- 轮廓样式 -->
<ShButton variant="outline" color="primary">轮廓按钮</ShButton>

<!-- 柔和样式 -->
<ShButton variant="soft" color="secondary">柔和按钮</ShButton>

<!-- 幽灵样式 -->
<ShButton variant="ghost" color="accent">幽灵按钮</ShButton>

<!-- 链接样式 -->
<ShButton variant="link" color="info">链接按钮</ShButton>

<!-- 虚线样式 -->
<ShButton variant="dash" color="neutral">虚线按钮</ShButton>
```

#### 状态和功能

```svelte
<!-- 加载状态 -->
<ShButton loading>加载中...</ShButton>

<!-- 禁用状态 -->
<ShButton disabled>禁用按钮</ShButton>

<!-- 块级按钮 -->
<ShButton block>块级按钮</ShButton>

<!-- 带图标 -->
<ShButton>
  <svg slot="icon" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 12l-4-4h8l-4 4z" />
  </svg>
  带图标按钮
</ShButton>

<!-- 点击事件 -->
<ShButton onclick={() => alert('按钮被点击!')}>点击我</ShButton>
```

#### API 参考

| 属性       | 类型                                                                                               | 默认值      | 描述           |
| ---------- | -------------------------------------------------------------------------------------------------- | ----------- | -------------- |
| `color`    | `'primary' \| 'secondary' \| 'accent' \| 'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'primary'` | 按钮颜色       |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                             | `'md'`      | 按钮尺寸       |
| `variant`  | `'solid' \| 'outline' \| 'soft' \| 'ghost' \| 'link' \| 'dash'`                                    | `'solid'`   | 样式变体       |
| `loading`  | `boolean`                                                                                          | `false`     | 加载状态       |
| `disabled` | `boolean`                                                                                          | `false`     | 禁用状态       |
| `block`    | `boolean`                                                                                          | `false`     | 块级显示       |
| `tag`      | `string`                                                                                           | `'button'`  | HTML 标签      |
| `onclick`  | `function`                                                                                         | -           | 点击事件处理器 |

### ShDropdown - 下拉菜单

提供下拉选择和操作菜单功能。

#### 基础用法

```svelte
<script>
  import { ShDropdown, ShButton } from '@istock-shell/ui';

  const menuItems = [
    { label: '编辑', value: 'edit' },
    { label: '删除', value: 'delete', color: 'error' },
    { label: '分享', value: 'share' },
  ];

  function handleSelect(item) {
    console.log('选择了:', item);
  }
</script>

<ShDropdown items={menuItems} onselect={handleSelect}>
  <ShButton slot="trigger">操作菜单</ShButton>
</ShDropdown>
```

### ShModal - 模态框

用于显示重要信息或收集用户输入的模态对话框。

#### 基础用法

```svelte
<script>
  import { ShModal, ShButton } from '@istock-shell/ui';

  let showModal = false;

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }
</script>

<ShButton onclick={openModal}>打开模态框</ShButton>

<ShModal bind:show={showModal} title="确认操作">
  <p>您确定要执行此操作吗？</p>

  <div slot="actions" class="flex gap-2">
    <ShButton color="primary" onclick={closeModal}>确认</ShButton>
    <ShButton variant="outline" onclick={closeModal}>取消</ShButton>
  </div>
</ShModal>
```

---

## 📝 数据录入组件

### ShInput - 输入框

通用的文本输入组件，支持多种输入类型。

#### 基础用法

```svelte
<script>
  import { ShInput } from '@istock-shell/ui';

  let value = '';
</script>

<!-- 基础输入框 -->
<ShInput bind:value placeholder="请输入内容" />

<!-- 不同类型 -->
<ShInput type="email" placeholder="邮箱地址" />
<ShInput type="password" placeholder="密码" />
<ShInput type="number" placeholder="数字" />
<ShInput type="tel" placeholder="电话号码" />

<!-- 不同尺寸 -->
<ShInput size="sm" placeholder="小尺寸" />
<ShInput size="md" placeholder="中等尺寸" />
<ShInput size="lg" placeholder="大尺寸" />
```

#### 状态和验证

```svelte
<!-- 禁用状态 -->
<ShInput disabled placeholder="禁用输入框" />

<!-- 只读状态 -->
<ShInput readonly value="只读内容" />

<!-- 错误状态 -->
<ShInput error placeholder="错误状态" />

<!-- 带标签 -->
<ShInput label="用户名" placeholder="请输入用户名" />

<!-- 带帮助文本 -->
<ShInput label="密码" type="password" placeholder="请输入密码" help="密码长度至少8位" />
```

### ShTextarea - 文本域

多行文本输入组件。

```svelte
<script>
  import { ShTextarea } from '@istock-shell/ui';

  let content = '';
</script>

<ShTextarea bind:value={content} placeholder="请输入多行文本" rows={4} label="描述" />
```

### ShSelect - 选择器

下拉选择组件，支持单选和多选。

```svelte
<script>
  import { ShSelect } from '@istock-shell/ui';

  const options = [
    { value: 'option1', label: '选项1' },
    { value: 'option2', label: '选项2' },
    { value: 'option3', label: '选项3' },
  ];

  let selectedValue = '';
  let selectedValues = [];
</script>

<!-- 单选 -->
<ShSelect bind:value={selectedValue} {options} placeholder="请选择" label="单选选择器" />

<!-- 多选 -->
<ShSelect bind:value={selectedValues} {options} multiple placeholder="请选择多个选项" label="多选选择器" />
```

### ShCheckbox - 复选框

复选框组件，支持单个和组合使用。

```svelte
<script>
  import { ShCheckbox } from '@istock-shell/ui';

  let checked = false;
  let checkedItems = [];
</script>

<!-- 单个复选框 -->
<ShCheckbox bind:checked>同意服务条款</ShCheckbox>

<!-- 复选框组 -->
<div class="space-y-2">
  <ShCheckbox bind:group={checkedItems} value="option1">选项1</ShCheckbox>
  <ShCheckbox bind:group={checkedItems} value="option2">选项2</ShCheckbox>
  <ShCheckbox bind:group={checkedItems} value="option3">选项3</ShCheckbox>
</div>
```

### ShRadio - 单选框

单选框组件，用于互斥选择。

```svelte
<script>
  import { ShRadio } from '@istock-shell/ui';

  let selectedOption = '';
</script>

<div class="space-y-2">
  <ShRadio bind:group={selectedOption} value="option1">选项1</ShRadio>
  <ShRadio bind:group={selectedOption} value="option2">选项2</ShRadio>
  <ShRadio bind:group={selectedOption} value="option3">选项3</ShRadio>
</div>
```

### ShToggle - 开关

开关切换组件。

```svelte
<script>
  import { ShToggle } from '@istock-shell/ui';

  let enabled = false;
</script>

<ShToggle bind:checked={enabled} label="启用通知" />
```

---

## 📊 数据展示组件

### ShTable - 表格

功能强大的数据表格组件。

```svelte
<script>
  import { ShTable } from '@istock-shell/ui';

  const columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'age', title: '年龄', sortable: true },
    { key: 'email', title: '邮箱' },
    { key: 'actions', title: '操作' },
  ];

  const data = [
    { id: 1, name: '张三', age: 25, email: 'zhang@example.com' },
    { id: 2, name: '李四', age: 30, email: 'li@example.com' },
    { id: 3, name: '王五', age: 28, email: 'wang@example.com' },
  ];
</script>

<ShTable {columns} {data} />
```

### ShList - 列表

通用列表组件，支持多种布局。

```svelte
<script>
  import { ShList } from '@istock-shell/ui';

  const items = [
    { id: 1, title: '列表项1', description: '这是第一个列表项' },
    { id: 2, title: '列表项2', description: '这是第二个列表项' },
    { id: 3, title: '列表项3', description: '这是第三个列表项' },
  ];
</script>

<ShList {items} />
```

### ShStat - 统计数值

用于展示统计数据的组件。

```svelte
<script>
  import { ShStat } from '@istock-shell/ui';
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <ShStat title="总用户" value="1,234" trend="up" change="+12%" />
  <ShStat title="活跃用户" value="856" trend="up" change="+8%" />
  <ShStat title="转化率" value="68%" trend="down" change="-2%" />
</div>
```

### ShKbd - 键盘按键

用于显示键盘快捷键的组件。

```svelte
<script>
  import { ShKbd } from '@istock-shell/ui';
</script>

<p>按 <ShKbd>Ctrl</ShKbd> + <ShKbd>S</ShKbd> 保存文件</p><p>按 <ShKbd>Esc</ShKbd> 退出</p>
```

---

## 💬 反馈组件

### ShAlert - 警告提示

用于显示重要信息的警告组件。

```svelte
<script>
  import { ShAlert } from '@istock-shell/ui';
</script>

<!-- 不同类型的警告 -->
<div class="space-y-4">
  <ShAlert color="info">这是一条信息提示</ShAlert>
  <ShAlert color="success">操作成功完成</ShAlert>
  <ShAlert color="warning">请注意这个警告</ShAlert>
  <ShAlert color="error">发生了错误</ShAlert>
</div>

<!-- 可关闭的警告 -->
<ShAlert color="info" closable>这是一条可关闭的提示</ShAlert>
```

### ShToast - 消息提示

轻量级的消息通知组件。

```svelte
<script>
  import { ShToast, ShButton } from '@istock-shell/ui';

  function showToast(type) {
    ShToast.show({
      type,
      message: `这是一条${type}消息`,
      duration: 3000,
    });
  }
</script>

<div class="flex gap-2">
  <ShButton onclick={() => showToast('success')}>成功消息</ShButton>
  <ShButton onclick={() => showToast('error')}>错误消息</ShButton>
  <ShButton onclick={() => showToast('warning')}>警告消息</ShButton>
  <ShButton onclick={() => showToast('info')}>信息消息</ShButton>
</div>
```

### ShLoading - 加载指示器

显示加载状态的组件。

```svelte
<script>
  import { ShLoading } from '@istock-shell/ui';
</script>

<!-- 不同尺寸的加载器 -->
<div class="flex items-center gap-4">
  <ShLoading size="sm" />
  <ShLoading size="md" />
  <ShLoading size="lg" />
</div>

<!-- 带文字的加载器 -->
<ShLoading text="加载中..." />

<!-- 全屏加载 -->
<ShLoading overlay text="正在处理，请稍候..." />
```

### ShTooltip - 工具提示

鼠标悬停显示的提示信息。

```svelte
<script>
  import { ShTooltip, ShButton } from '@istock-shell/ui';
</script>

<ShTooltip content="这是一个工具提示">
  <ShButton>悬停查看提示</ShButton>
</ShTooltip>
```

---

## 🧭 导航组件

### ShMenu - 菜单

导航菜单组件，支持多级菜单。

```svelte
<script>
  import { ShMenu } from '@istock-shell/ui';

  const menuItems = [
    {
      label: '首页',
      href: '/',
      icon: 'home',
    },
    {
      label: '产品',
      children: [
        { label: '产品A', href: '/product-a' },
        { label: '产品B', href: '/product-b' },
      ],
    },
    {
      label: '关于',
      href: '/about',
    },
  ];
</script>

<ShMenu items={menuItems} />
```

### ShBreadcrumbs - 面包屑

显示当前页面路径的导航组件。

```svelte
<script>
  import { ShBreadcrumbs } from '@istock-shell/ui';

  const breadcrumbs = [
    { label: '首页', href: '/' },
    { label: '产品', href: '/products' },
    { label: '产品详情', href: '/products/123' },
    { label: '当前页面' },
  ];
</script>

<ShBreadcrumbs items={breadcrumbs} />
```

---

## 🔧 扩展组件

### ShChart - 图表

基于 AntV G2 的图表组件。

```svelte
<script>
  import { ShChart } from '@istock-shell/ui';

  const chartData = [
    { month: '1月', sales: 1000 },
    { month: '2月', sales: 1200 },
    { month: '3月', sales: 800 },
    { month: '4月', sales: 1500 },
    { month: '5月', sales: 1800 },
  ];

  const chartConfig = {
    type: 'line',
    data: chartData,
    xField: 'month',
    yField: 'sales',
    smooth: true,
  };
</script>

<ShChart config={chartConfig} width={600} height={400} />
```

### ShMarkdown - Markdown 渲染器

渲染 Markdown 内容的组件。

```svelte
<script>
  import { ShMarkdown } from '@istock-shell/ui';

  const markdownContent = `
# 标题

这是一段 **粗体** 和 *斜体* 文本。

## 代码示例

\`\`\`javascript
const hello = 'world';
console.log(hello);
\`\`\`

- 列表项1
- 列表项2
- 列表项3
  `;
</script>

<ShMarkdown content={markdownContent} />
```

### ShVirtualTable - 虚拟表格

高性能的虚拟化表格组件，适用于大数据量场景。

```svelte
<script>
  import { ShVirtualTable } from '@istock-shell/ui';

  // 生成大量数据
  const data = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
    email: `user${i + 1}@example.com`,
    age: Math.floor(Math.random() * 50) + 20,
  }));

  const columns = [
    { key: 'id', title: 'ID', width: 80 },
    { key: 'name', title: '姓名', width: 120 },
    { key: 'email', title: '邮箱', width: 200 },
    { key: 'age', title: '年龄', width: 80 },
  ];
</script>

<ShVirtualTable {data} {columns} height={400} itemHeight={40} />
```

### ShForm - 表单

完整的表单解决方案，支持验证和提交。

```svelte
<script>
  import { ShForm, ShInput, ShSelect, ShButton } from '@istock-shell/ui';

  const formSchema = {
    name: {
      type: 'text',
      label: '姓名',
      required: true,
      placeholder: '请输入姓名',
    },
    email: {
      type: 'email',
      label: '邮箱',
      required: true,
      placeholder: '请输入邮箱',
    },
    age: {
      type: 'number',
      label: '年龄',
      min: 18,
      max: 100,
    },
  };

  function handleSubmit(data) {
    console.log('表单数据:', data);
  }
</script>

<ShForm schema={formSchema} onsubmit={handleSubmit} />
```

### ShIcon - 图标

图标组件，支持多种图标库。

```svelte
<script>
  import { ShIcon } from '@istock-shell/ui';
</script>

<!-- 不同尺寸的图标 -->
<div class="flex items-center gap-2">
  <ShIcon name="home" size="sm" />
  <ShIcon name="user" size="md" />
  <ShIcon name="settings" size="lg" />
</div>

<!-- 不同颜色的图标 -->
<div class="flex items-center gap-2">
  <ShIcon name="heart" color="error" />
  <ShIcon name="star" color="warning" />
  <ShIcon name="check" color="success" />
</div>
```

### ShEmpty - 空状态

显示空状态的组件。

```svelte
<script>
  import { ShEmpty, ShButton } from '@istock-shell/ui';
</script>

<ShEmpty title="暂无数据" description="当前没有任何内容，点击下方按钮添加">
  <ShButton color="primary">添加内容</ShButton>
</ShEmpty>
```

---

## 🎨 组件样式定制

### 全局样式覆盖

```css
/* 自定义按钮样式 */
.btn-custom {
  @apply btn;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
}

/* 自定义输入框样式 */
.input-custom {
  @apply input;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
}

.input-custom:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

### 组件级样式定制

```svelte
<script>
  import { ShButton } from '@istock-shell/ui';
</script>

<ShButton class="my-custom-button">自定义样式按钮</ShButton>

<style>
  :global(.my-custom-button) {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    border: none;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  :global(.my-custom-button:hover) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
</style>
```

## 📱 响应式设计

### 响应式组件使用

```svelte
<script>
  import { ShButton, ShInput, ShCard } from '@istock-shell/ui';
</script>

<!-- 响应式按钮 -->
<ShButton size="sm" class="md:btn-md lg:btn-lg">响应式按钮</ShButton>

<!-- 响应式网格布局 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <ShCard>卡片1</ShCard>
  <ShCard>卡片2</ShCard>
  <ShCard>卡片3</ShCard>
</div>

<!-- 响应式表单 -->
<div class="w-full max-w-md mx-auto">
  <ShInput placeholder="响应式输入框" class="w-full" />
</div>
```

## 🔧 最佳实践

### 1. 组件组合

```svelte
<!-- 好的做法：组合使用组件 -->
<div class="space-y-4">
  <ShAlert color="info">
    <ShIcon name="info" slot="icon" />
    请填写完整的用户信息
  </ShAlert>

  <ShForm>
    <ShInput label="用户名" required />
    <ShInput label="邮箱" type="email" required />

    <div class="flex gap-2">
      <ShButton type="submit" color="primary">提交</ShButton>
      <ShButton variant="outline">取消</ShButton>
    </div>
  </ShForm>
</div>
```

### 2. 状态管理

```svelte
<script>
  import { writable } from 'svelte/store';
  import { ShButton, ShLoading } from '@istock-shell/ui';

  const loading = writable(false);

  async function handleSubmit() {
    loading.set(true);
    try {
      await submitData();
      // 处理成功
    } catch (error) {
      // 处理错误
    } finally {
      loading.set(false);
    }
  }
</script>

{#if $loading}
  <ShLoading text="提交中..." />
{:else}
  <ShButton onclick={handleSubmit}>提交</ShButton>
{/if}
```

### 3. 错误处理

```svelte
<script>
  import { ShAlert, ShInput, ShButton } from '@istock-shell/ui';

  let errors = {};
  let formData = { email: '', password: '' };

  function validateForm() {
    errors = {};

    if (!formData.email) {
      errors.email = '邮箱不能为空';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = '邮箱格式不正确';
    }

    if (!formData.password) {
      errors.password = '密码不能为空';
    } else if (formData.password.length < 6) {
      errors.password = '密码长度至少6位';
    }

    return Object.keys(errors).length === 0;
  }

  function handleSubmit() {
    if (validateForm()) {
      // 提交表单
    }
  }
</script>

<div class="space-y-4">
  <ShInput bind:value={formData.email} label="邮箱" type="email" error={!!errors.email} />
  {#if errors.email}
    <ShAlert color="error" size="sm">{errors.email}</ShAlert>
  {/if}

  <ShInput bind:value={formData.password} label="密码" type="password" error={!!errors.password} />
  {#if errors.password}
    <ShAlert color="error" size="sm">{errors.password}</ShAlert>
  {/if}

  <ShButton onclick={handleSubmit}>登录</ShButton>
</div>
```

### 4. 性能优化

```svelte
<script>
  import { ShVirtualTable, ShList } from '@istock-shell/ui';

  // 对于大数据量，使用虚拟化组件
  export let largeDataSet = [];

  // 使用计算属性避免重复计算
  $: filteredData = largeDataSet.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
</script>

<!-- 大数据量使用虚拟表格 -->
{#if largeDataSet.length > 1000}
  <ShVirtualTable data={filteredData} {columns} />
{:else}
  <ShList items={filteredData} />
{/if}
```

---

<p class="text-center text-gray-500 mt-8">
  📚 更多组件使用示例和 API 文档，请查看各组件的详细文档页面。
</p>
