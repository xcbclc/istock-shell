---
title: 快速上手 | IStock Shell UI
description: IStock Shell UI组件库快速上手指南，通过实际示例学习如何使用组件，包括基础组件使用、表单构建、数据展示、主题切换等完整教程。
keywords: [IStock Shell UI教程, Svelte组件使用, 快速上手, 组件示例, 表单构建, 数据展示, 主题切换]
---

# 快速上手

本指南将通过实际示例，帮助你快速掌握 IStock Shell UI 组件库的使用方法。

## 🎯 学习目标

通过本教程，你将学会：

- 基础组件的使用方法
- 如何构建表单和处理用户输入
- 数据展示和可视化
- 主题系统的使用
- 响应式布局的实现

## 📝 第一个示例：Hello World

让我们从最简单的示例开始：

```svelte
<!-- HelloWorld.svelte -->
<script>
  import { ShButton, ShAlert } from '@istock-shell/ui';

  let showMessage = false;

  function handleClick() {
    showMessage = true;
    // 3秒后自动隐藏
    setTimeout(() => {
      showMessage = false;
    }, 3000);
  }
</script>

<div class="p-6 space-y-4">
  <h1 class="text-2xl font-bold">Hello IStock Shell UI!</h1>

  <ShButton color="primary" size="lg" onclick={handleClick}>点击我</ShButton>

  {#if showMessage}
    <ShAlert color="success">🎉 欢迎使用 IStock Shell UI！</ShAlert>
  {/if}
</div>
```

## 📋 构建用户注册表单

让我们构建一个更复杂的示例 - 用户注册表单：

```svelte
<!-- UserRegistration.svelte -->
<script>
  import {
    ShInput,
    ShTextarea,
    ShSelect,
    ShCheckbox,
    ShButton,
    ShAlert,
    ShFieldSet,
  } from '@istock-shell/ui';

  // 表单数据
  let formData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    role: '',
    agreeTerms: false,
  };

  // 表单状态
  let isSubmitting = false;
  let submitResult = null;

  // 角色选项
  const roleOptions = [
    { value: 'developer', label: '开发者' },
    { value: 'designer', label: '设计师' },
    { value: 'manager', label: '项目经理' },
    { value: 'other', label: '其他' },
  ];

  // 表单验证
  function validateForm() {
    if (!formData.username.trim()) {
      return '请输入用户名';
    }
    if (!formData.email.includes('@')) {
      return '请输入有效的邮箱地址';
    }
    if (formData.password.length < 6) {
      return '密码长度至少6位';
    }
    if (formData.password !== formData.confirmPassword) {
      return '两次输入的密码不一致';
    }
    if (!formData.role) {
      return '请选择角色';
    }
    if (!formData.agreeTerms) {
      return '请同意用户协议';
    }
    return null;
  }

  // 提交表单
  async function handleSubmit() {
    const error = validateForm();
    if (error) {
      submitResult = { type: 'error', message: error };
      return;
    }

    isSubmitting = true;

    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 2000));

      submitResult = {
        type: 'success',
        message: '注册成功！欢迎加入我们！',
      };

      // 重置表单
      formData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
        role: '',
        agreeTerms: false,
      };
    } catch (error) {
      submitResult = {
        type: 'error',
        message: '注册失败，请稍后重试',
      };
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="max-w-md mx-auto p-6 space-y-6">
  <h2 class="text-2xl font-bold text-center">用户注册</h2>

  <!-- 基本信息 -->
  <ShFieldSet legend="基本信息">
    <div class="space-y-4">
      <ShInput bind:value={formData.username} placeholder="请输入用户名" label="用户名" required />

      <ShInput
        bind:value={formData.email}
        type="email"
        placeholder="请输入邮箱地址"
        label="邮箱"
        required
      />
    </div>
  </ShFieldSet>

  <!-- 密码设置 -->
  <ShFieldSet legend="密码设置">
    <div class="space-y-4">
      <ShInput
        bind:value={formData.password}
        type="password"
        placeholder="请输入密码"
        label="密码"
        required
      />

      <ShInput
        bind:value={formData.confirmPassword}
        type="password"
        placeholder="请确认密码"
        label="确认密码"
        required
      />
    </div>
  </ShFieldSet>

  <!-- 个人信息 -->
  <ShFieldSet legend="个人信息">
    <div class="space-y-4">
      <ShSelect
        bind:value={formData.role}
        options={roleOptions}
        placeholder="请选择角色"
        label="角色"
        required
      />

      <ShTextarea
        bind:value={formData.bio}
        placeholder="简单介绍一下自己..."
        label="个人简介"
        rows={3}
      />
    </div>
  </ShFieldSet>

  <!-- 协议同意 -->
  <ShCheckbox bind:checked={formData.agreeTerms} label="我已阅读并同意用户协议和隐私政策" />

  <!-- 提交按钮 -->
  <ShButton
    color="primary"
    size="lg"
    block
    loading={isSubmitting}
    disabled={isSubmitting}
    onclick={handleSubmit}
  >
    {isSubmitting ? '注册中...' : '立即注册'}
  </ShButton>

  <!-- 结果提示 -->
  {#if submitResult}
    <ShAlert color={submitResult.type === 'success' ? 'success' : 'error'}>
      {submitResult.message}
    </ShAlert>
  {/if}
</div>
```

## 📊 数据展示示例

让我们创建一个数据展示页面，展示用户列表和统计信息：

```svelte
<!-- DataDisplay.svelte -->
<script>
  import {
    ShTable,
    ShStat,
    ShButton,
    ShInput,
    ShSelect,
    ShLoading,
    ShEmpty,
  } from '@istock-shell/ui';

  // 模拟用户数据
  let users = [
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      role: '开发者',
      status: '活跃',
      joinDate: '2024-01-15',
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@example.com',
      role: '设计师',
      status: '活跃',
      joinDate: '2024-02-20',
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@example.com',
      role: '项目经理',
      status: '离线',
      joinDate: '2024-03-10',
    },
    {
      id: 4,
      name: '赵六',
      email: 'zhaoliu@example.com',
      role: '开发者',
      status: '活跃',
      joinDate: '2024-03-25',
    },
  ];

  // 筛选和搜索
  let searchTerm = '';
  let roleFilter = '';
  let isLoading = false;

  // 统计数据
  $: stats = {
    total: users.length,
    active: users.filter((u) => u.status === '活跃').length,
    developers: users.filter((u) => u.role === '开发者').length,
    newThisMonth: users.filter((u) => new Date(u.joinDate) > new Date('2024-03-01')).length,
  };

  // 过滤后的用户列表
  $: filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // 表格列定义
  const columns = [
    { key: 'name', title: '姓名', sortable: true },
    { key: 'email', title: '邮箱' },
    { key: 'role', title: '角色' },
    { key: 'status', title: '状态' },
    { key: 'joinDate', title: '加入日期', sortable: true },
    { key: 'actions', title: '操作' },
  ];

  // 角色选项
  const roleOptions = [
    { value: '', label: '全部角色' },
    { value: '开发者', label: '开发者' },
    { value: '设计师', label: '设计师' },
    { value: '项目经理', label: '项目经理' },
  ];

  // 刷新数据
  async function refreshData() {
    isLoading = true;
    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isLoading = false;
  }

  // 编辑用户
  function editUser(user) {
    console.log('编辑用户:', user);
  }

  // 删除用户
  function deleteUser(user) {
    if (confirm(`确定要删除用户 ${user.name} 吗？`)) {
      users = users.filter((u) => u.id !== user.id);
    }
  }
</script>

<div class="p-6 space-y-6">
  <h2 class="text-2xl font-bold">用户管理</h2>

  <!-- 统计卡片 -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <ShStat title="总用户数" value={stats.total} description="注册用户总数" color="primary" />

    <ShStat title="活跃用户" value={stats.active} description="当前在线用户" color="success" />

    <ShStat title="开发者" value={stats.developers} description="开发者用户数" color="info" />

    <ShStat
      title="本月新增"
      value={stats.newThisMonth}
      description="本月新注册用户"
      color="warning"
    />
  </div>

  <!-- 搜索和筛选 -->
  <div class="flex flex-col md:flex-row gap-4 items-end">
    <div class="flex-1">
      <ShInput bind:value={searchTerm} placeholder="搜索用户名或邮箱..." label="搜索" />
    </div>

    <div class="w-full md:w-48">
      <ShSelect bind:value={roleFilter} options={roleOptions} label="角色筛选" />
    </div>

    <ShButton color="primary" onclick={refreshData} loading={isLoading}>刷新</ShButton>
  </div>

  <!-- 用户表格 -->
  {#if isLoading}
    <div class="flex justify-center py-12">
      <ShLoading size="lg" />
    </div>
  {:else if filteredUsers.length === 0}
    <ShEmpty title="暂无用户数据" description="没有找到符合条件的用户" />
  {:else}
    <div class="overflow-x-auto">
      <ShTable data={filteredUsers} {columns}>
        <!-- 自定义状态列 -->
        <svelte:fragment slot="status" let:item>
          <span
            class="badge"
            class:badge-success={item.status === '活跃'}
            class:badge-error={item.status === '离线'}
          >
            {item.status}
          </span>
        </svelte:fragment>

        <!-- 自定义操作列 -->
        <svelte:fragment slot="actions" let:item>
          <div class="flex gap-2">
            <ShButton size="sm" color="info" onclick={() => editUser(item)}>编辑</ShButton>
            <ShButton size="sm" color="error" onclick={() => deleteUser(item)}>删除</ShButton>
          </div>
        </svelte:fragment>
      </ShTable>
    </div>
  {/if}
</div>
```

## 🎨 主题切换示例

让我们创建一个主题切换功能：

```svelte
<!-- ThemeDemo.svelte -->
<script>
  import { ShButton, ShSelect, ShCard, ShAlert, ShInput, ShCheckbox } from '@istock-shell/ui';

  // 可用主题
  const themes = [
    { value: 'light', label: '浅色主题' },
    { value: 'dark', label: '深色主题' },
    { value: 'cupcake', label: '纸杯蛋糕' },
    { value: 'bumblebee', label: '大黄蜂' },
    { value: 'emerald', label: '翡翠绿' },
    { value: 'corporate', label: '企业风' },
    { value: 'synthwave', label: '合成波' },
    { value: 'retro', label: '复古风' },
    { value: 'cyberpunk', label: '赛博朋克' },
    { value: 'valentine', label: '情人节' },
    { value: 'halloween', label: '万圣节' },
    { value: 'garden', label: '花园' },
    { value: 'forest', label: '森林' },
    { value: 'aqua', label: '水蓝' },
    { value: 'lofi', label: 'Lo-Fi' },
    { value: 'pastel', label: '粉彩' },
    { value: 'fantasy', label: '幻想' },
    { value: 'wireframe', label: '线框' },
    { value: 'black', label: '纯黑' },
    { value: 'luxury', label: '奢华' },
    { value: 'dracula', label: '德古拉' },
    { value: 'cmyk', label: 'CMYK' },
    { value: 'autumn', label: '秋天' },
    { value: 'business', label: '商务' },
    { value: 'acid', label: '酸性' },
    { value: 'lemonade', label: '柠檬水' },
    { value: 'night', label: '夜晚' },
    { value: 'coffee', label: '咖啡' },
    { value: 'winter', label: '冬天' },
  ];

  let currentTheme = 'light';
  let demoText = '这是一段示例文本';
  let isChecked = false;

  // 切换主题
  function changeTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }

  // 颜色示例
  const colors = [
    'primary',
    'secondary',
    'accent',
    'neutral',
    'info',
    'success',
    'warning',
    'error',
  ];
</script>

<div class="p-6 space-y-6">
  <h2 class="text-2xl font-bold">主题演示</h2>

  <!-- 主题选择器 -->
  <div class="w-full max-w-xs">
    <ShSelect
      bind:value={currentTheme}
      options={themes}
      label="选择主题"
      onchange={(e) => changeTheme(e.target.value)}
    />
  </div>

  <!-- 颜色按钮演示 -->
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">按钮颜色</h3>
    <div class="flex flex-wrap gap-2">
      {#each colors as color}
        <ShButton {color} size="sm">
          {color}
        </ShButton>
      {/each}
    </div>
  </div>

  <!-- 表单组件演示 -->
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">表单组件</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ShInput bind:value={demoText} label="输入框" placeholder="请输入文本" />

      <ShCheckbox bind:checked={isChecked} label="复选框示例" />
    </div>
  </div>

  <!-- 提示信息演示 -->
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">提示信息</h3>
    <div class="space-y-2">
      <ShAlert color="info">这是一条信息提示</ShAlert>
      <ShAlert color="success">这是一条成功提示</ShAlert>
      <ShAlert color="warning">这是一条警告提示</ShAlert>
      <ShAlert color="error">这是一条错误提示</ShAlert>
    </div>
  </div>

  <!-- 当前主题信息 -->
  <div class="mt-8 p-4 bg-base-200 rounded-lg">
    <h4 class="font-semibold mb-2">当前主题信息</h4>
    <p>主题名称: <code class="bg-base-300 px-2 py-1 rounded">{currentTheme}</code></p>
    <p class="text-sm text-base-content/70 mt-2">
      主题会影响所有组件的颜色和样式，你可以通过切换不同主题来查看效果。
    </p>
  </div>
</div>
```

## 📱 响应式布局示例

创建一个响应式的仪表盘布局：

```svelte
<!-- ResponsiveDashboard.svelte -->
<script>
  import { ShStat, ShChart, ShTable, ShButton, ShAlert } from '@istock-shell/ui';

  // 模拟图表数据
  const chartData = [
    { month: '1月', sales: 120, users: 80 },
    { month: '2月', sales: 150, users: 95 },
    { month: '3月', sales: 180, users: 110 },
    { month: '4月', sales: 200, users: 125 },
    { month: '5月', sales: 220, users: 140 },
    { month: '6月', sales: 250, users: 160 },
  ];

  // 图表配置
  const chartConfig = {
    data: chartData,
    xField: 'month',
    yField: 'sales',
    smooth: true,
    point: {
      size: 5,
      shape: 'diamond',
    },
  };

  // 最近活动数据
  const recentActivities = [
    { id: 1, user: '张三', action: '登录系统', time: '2分钟前' },
    { id: 2, user: '李四', action: '创建项目', time: '5分钟前' },
    { id: 3, user: '王五', action: '更新文档', time: '10分钟前' },
    { id: 4, user: '赵六', action: '提交代码', time: '15分钟前' },
  ];
</script>

<div class="p-4 lg:p-6 space-y-6">
  <!-- 页面标题 -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <h1 class="text-2xl lg:text-3xl font-bold">仪表盘</h1>
    <div class="flex gap-2">
      <ShButton color="primary" size="sm">刷新数据</ShButton>
      <ShButton color="secondary" size="sm">导出报告</ShButton>
    </div>
  </div>

  <!-- 统计卡片 - 响应式网格 -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <ShStat title="总销售额" value="¥125,430" description="比上月增长 12%" color="primary" />

    <ShStat title="新用户" value="1,234" description="比上月增长 8%" color="success" />

    <ShStat title="订单数" value="856" description="比上月增长 15%" color="info" />

    <ShStat title="转化率" value="3.2%" description="比上月下降 2%" color="warning" />
  </div>

  <!-- 图表和活动 - 响应式布局 -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- 销售趋势图 -->
    <div class="lg:col-span-2">
      <div class="bg-base-100 p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">销售趋势</h3>
        <div class="h-64">
          <ShChart config={chartConfig} />
        </div>
      </div>
    </div>

    <!-- 最近活动 -->
    <div class="lg:col-span-1">
      <div class="bg-base-100 p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">最近活动</h3>
        <div class="space-y-3">
          {#each recentActivities as activity}
            <div class="flex items-start gap-3 p-2 hover:bg-base-200 rounded">
              <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">{activity.user}</p>
                <p class="text-xs text-base-content/70 truncate">{activity.action}</p>
                <p class="text-xs text-base-content/50">{activity.time}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- 数据表格 - 全宽度 -->
  <div class="bg-base-100 p-4 rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-4">用户数据</h3>
    <div class="overflow-x-auto">
      <ShTable
        data={recentActivities}
        columns={[
          { key: 'user', title: '用户' },
          { key: 'action', title: '操作' },
          { key: 'time', title: '时间' },
        ]}
      />
    </div>
  </div>

  <!-- 提示信息 -->
  <ShAlert color="info">
    💡 提示：这个仪表盘演示了响应式布局的使用。在不同屏幕尺寸下，组件会自动调整布局。
  </ShAlert>
</div>
```

## 🎓 学习要点总结

通过以上示例，你应该掌握了：

### 1. 基础组件使用

- 组件导入和基本属性设置
- 事件处理和状态管理
- 数据绑定和响应式更新

### 2. 表单构建

- 表单验证和错误处理
- 异步提交和加载状态
- 表单分组和布局

### 3. 数据展示

- 表格数据渲染和自定义列
- 统计卡片和数据可视化
- 搜索和筛选功能

### 4. 主题系统

- 主题切换和动态应用
- 颜色系统的使用
- 自定义样式覆盖

### 5. 响应式设计

- 网格布局和断点使用
- 移动端适配
- 灵活的组件组合

## 🚀 下一步

现在你已经掌握了基础用法，可以：

- 查看 [组件文档](./components/) 了解每个组件的详细API
- 阅读 [主题定制指南](./theming.md) 学习高级主题定制
- 参考 [最佳实践](./best-practices.md) 获取设计和开发建议
- 查看 [示例项目](./examples/) 获取更多实际应用场景

## 💡 小贴士

1. **组件组合**：IStock Shell UI 的组件设计为可组合的，你可以自由组合不同组件来构建复杂的界面

2. **性能优化**：对于大数据量场景，使用 VirtualTable 和 VirtualList 组件可以获得更好的性能

3. **主题一致性**：保持整个应用的主题一致性，避免混用不同的颜色系统

4. **响应式优先**：始终考虑移动端体验，使用响应式布局类

5. **无障碍支持**：组件内置了无障碍支持，但在使用时也要注意语义化和键盘导航

---

<p class="text-center text-gray-500 mt-8">
  🎉 恭喜！你已经掌握了 IStock Shell UI 的基础用法！
</p>
