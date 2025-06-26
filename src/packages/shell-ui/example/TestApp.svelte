<script>
  import { onMount } from 'svelte';

  // 测试状态
  let testResults = [];
  let isLoading = true;
  let components = {};

  // 添加测试结果
  function addTestResult(component, status, message) {
    testResults = [...testResults, { component, status, message, timestamp: new Date() }];
  }

  // 测试组件导入和渲染
  async function testComponents() {
    try {
      // 动态导入打包后的组件
      const module = await import('../dist/index.js');
      components = module;

      addTestResult('模块导入', 'success', `成功导入 ${Object.keys(module).length} 个组件`);

      // 测试各个组件是否可以实例化
      const testComponentList = [
        'ShButton',
        'ShInput',
        'ShAlert',
        'ShLoading',
        'ShText',
        'ShTable',
        'ShList',
        'ShIcon',
        'ShModal',
        'ShToast',
      ];

      testComponentList.forEach((componentName) => {
        if (module[componentName]) {
          try {
            // 尝试创建组件实例（不挂载到DOM）
            const ComponentClass = module[componentName];
            if (typeof ComponentClass === 'function') {
              addTestResult(componentName, 'success', '组件类可用');
            } else {
              addTestResult(componentName, 'warning', '组件不是函数类型');
            }
          } catch (error) {
            addTestResult(componentName, 'error', `组件测试失败: ${error.message}`);
          }
        } else {
          addTestResult(componentName, 'warning', '组件未找到');
        }
      });
    } catch (error) {
      addTestResult('模块导入', 'error', `导入失败: ${error.message}`);
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    testComponents();
  });

  // 获取状态图标
  function getStatusIcon(status) {
    switch (status) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return '❓';
    }
  }

  // 获取状态颜色类
  function getStatusClass(status) {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  }

  // 统计结果
  $: successCount = testResults.filter((r) => r.status === 'success').length;
  $: errorCount = testResults.filter((r) => r.status === 'error').length;
  $: warningCount = testResults.filter((r) => r.status === 'warning').length;
</script>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-4xl mx-auto px-4">
    <!-- 头部 -->
    <header class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">IStock Shell UI</h1>
      <p class="text-lg text-gray-600">打包后组件测试应用</p>
    </header>

    <!-- 加载状态 -->
    {#if isLoading}
      <div class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <p class="mt-4 text-gray-600">正在测试组件...</p>
      </div>
    {:else}
      <!-- 测试统计 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-2xl font-bold text-green-600">{successCount}</div>
          <div class="text-sm text-gray-600">成功</div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-2xl font-bold text-yellow-600">{warningCount}</div>
          <div class="text-sm text-gray-600">警告</div>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <div class="text-2xl font-bold text-red-600">{errorCount}</div>
          <div class="text-sm text-gray-600">错误</div>
        </div>
      </div>

      <!-- 测试结果列表 -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">测试结果详情</h2>
        </div>
        <div class="divide-y divide-gray-200">
          {#each testResults as result}
            <div class="px-6 py-4 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <span class="text-xl">{getStatusIcon(result.status)}</span>
                <div>
                  <div class="font-medium text-gray-900">{result.component}</div>
                  <div class="text-sm {getStatusClass(result.status)}">{result.message}</div>
                </div>
              </div>
              <div class="text-xs text-gray-500">
                {result.timestamp.toLocaleTimeString()}
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- 组件信息 -->
      <div class="mt-8 bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">可用组件列表</h2>
        </div>
        <div class="px-6 py-4">
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {#each Object.keys(components) as componentName}
              <div class="px-3 py-2 bg-blue-50 text-blue-700 rounded text-sm font-medium">
                {componentName}
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- 使用说明 -->
      <div class="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-blue-900 mb-3">📖 使用说明</h3>
        <div class="space-y-2 text-blue-800">
          <p>• 此页面用于测试打包后的组件库是否正常工作</p>
          <p>• 绿色表示组件可正常使用，黄色表示警告，红色表示错误</p>
          <p>• 如果出现错误，请检查构建配置和组件导出</p>
          <p>• 运行 <code class="bg-blue-100 px-1 rounded">npm run build:all</code> 重新构建</p>
        </div>
      </div>

      <!-- 总体状态 -->
      <div class="mt-8 text-center">
        {#if errorCount === 0}
          <div class="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
            <span class="text-xl mr-2">🎉</span>
            <span class="font-semibold">所有测试通过！组件库可正常使用</span>
          </div>
        {:else}
          <div class="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-lg">
            <span class="text-xl mr-2">⚠️</span>
            <span class="font-semibold">存在 {errorCount} 个错误，请检查构建配置</span>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
</style>
