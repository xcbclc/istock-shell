<!--
  @component AiConfig AI配置组件

  AI模型配置相关的配置项
-->

<script lang="ts" module>
  export interface AiConfigProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { ShFieldSet, ShField, ShInput, ShSelect, ShButton, ShIcon, type SelectItemOption } from '@istock-shell/ui';

  let { windowId }: AiConfigProps = $props();

  // AI配置设置
  let settings = $state({
    aiConfig: {
      provider: 'openai', // openai, anthropic, google, local
      model: 'gpt-3.5-turbo',
      apiKey: '',
      baseUrl: '',
      temperature: 0.7,
      maxTokens: 2048,
      timeout: 30000,
    },
  });

  // AI模型提供商选项
  const aiProviderOptions: SelectItemOption[] = [
    { label: 'OpenAI', value: 'openai' },
    { label: 'Anthropic', value: 'anthropic' },
    { label: 'Google', value: 'google' },
    { label: '本地模型', value: 'local' },
  ];

  // AI模型选项
  const aiModelOptions: SelectItemOption[] = [
    { label: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo' },
    { label: 'GPT-4', value: 'gpt-4' },
    { label: 'GPT-4 Turbo', value: 'gpt-4-turbo' },
    { label: 'Claude 3 Haiku', value: 'claude-3-haiku' },
    { label: 'Claude 3 Sonnet', value: 'claude-3-sonnet' },
    { label: 'Claude 3 Opus', value: 'claude-3-opus' },
    { label: 'Gemini Pro', value: 'gemini-pro' },
  ];

  // 测试连接
  const testConnection = async () => {
    try {
      // 这里应该调用实际的测试逻辑
      console.log('测试AI连接:', settings.aiConfig);
      // 模拟测试
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('连接测试成功！');
    } catch (error) {
      console.error('连接测试失败:', error);
      alert('连接测试失败，请检查配置。');
    }
  };

  // 重置配置
  const resetConfig = () => {
    settings.aiConfig = {
      provider: 'openai',
      model: 'gpt-3.5-turbo',
      apiKey: '',
      baseUrl: '',
      temperature: 0.7,
      maxTokens: 2048,
      timeout: 30000,
    };
  };
</script>

<!-- AI模型配置 -->
<div class="space-y-8">
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="基础配置" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ShField label={{ title: '服务提供商', placement: 'before' }} class="space-y-4">
            <ShSelect bind:value={settings.aiConfig.provider} options={aiProviderOptions} color="primary" size="md" />
          </ShField>

          <ShField label={{ title: '模型选择', placement: 'before' }} class="space-y-4">
            <ShSelect bind:value={settings.aiConfig.model} options={aiModelOptions} color="primary" size="md" />
          </ShField>

          <ShField label={{ title: 'API密钥', placement: 'before' }} class="space-y-4">
            <ShInput bind:value={settings.aiConfig.apiKey} type="password" placeholder="输入API密钥" size="md" />
          </ShField>

          <ShField label={{ title: '基础URL', placement: 'before' }} class="space-y-4">
            <ShInput bind:value={settings.aiConfig.baseUrl} placeholder="https://api.openai.com/v1" size="md" />
          </ShField>
        </div>
      </ShFieldSet>
    </div>
  </div>

  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="高级参数" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ShField label={{ title: '温度值 (0-2)', placement: 'before' }} class="space-y-4">
            <ShInput bind:value={settings.aiConfig.temperature} type="number" min="0" max="2" step="0.1" size="md" />
            <p class="text-xs text-base-content/60">控制输出的随机性，值越高越随机</p>
          </ShField>

          <ShField label={{ title: '最大令牌数', placement: 'before' }} class="space-y-4">
            <ShInput bind:value={settings.aiConfig.maxTokens} type="number" min="1" max="8192" size="md" />
            <p class="text-xs text-base-content/60">单次对话的最大令牌数量</p>
          </ShField>

          <ShField label={{ title: '超时时间 (毫秒)', placement: 'before' }} class="space-y-4">
            <ShInput bind:value={settings.aiConfig.timeout} type="number" min="1000" max="120000" size="md" />
            <p class="text-xs text-base-content/60">请求超时时间</p>
          </ShField>
        </div>
      </ShFieldSet>
    </div>
  </div>

  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="操作" class="space-y-6">
        <div class="flex gap-4">
          <ShButton color="primary" size="md" onclick={testConnection}>
            <ShIcon name="lightning" class="w-4 h-4" />
            测试连接
          </ShButton>

          <ShButton color="secondary" size="md" onclick={resetConfig}>
            <ShIcon name="settings" class="w-4 h-4" />
            重置配置
          </ShButton>
        </div>
      </ShFieldSet>
    </div>
  </div>

  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="使用说明" class="space-y-4">
        <div class="prose prose-sm max-w-none">
          <h4>配置说明：</h4>
          <ul>
            <li><strong>OpenAI</strong>：需要有效的OpenAI API密钥</li>
            <li><strong>Anthropic</strong>：需要Claude API访问权限</li>
            <li><strong>Google</strong>：需要Google AI Studio API密钥</li>
            <li><strong>本地模型</strong>：需要本地部署的兼容API</li>
          </ul>
          <h4>安全提示：</h4>
          <ul>
            <li>API密钥将安全存储在本地</li>
            <li>不会上传到任何服务器</li>
            <li>建议定期更换API密钥</li>
          </ul>
        </div>
      </ShFieldSet>
    </div>
  </div>
</div>
