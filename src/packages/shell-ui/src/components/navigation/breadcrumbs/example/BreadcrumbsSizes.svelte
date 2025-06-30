<script lang="ts">
  import { ShBreadcrumbs } from '@istock-shell/ui';

  // 基本面包屑项数据
  const basicItems = [
    { text: 'Home', href: '/' },
    { text: 'Documents', href: '/documents' },
    { text: 'Add Document' },
  ];
</script>

<div class="space-y-8">
  <!-- 不同尺寸 -->
  <div>
    <h3 class="text-lg font-semibold mb-4">不同尺寸</h3>
    <div class="space-y-4">
      <div>
        <p class="text-sm text-gray-600 mb-2">超小尺寸 (xs)</p>
        <ShBreadcrumbs items={basicItems} size="xs" />
      </div>
      <div>
        <p class="text-sm text-gray-600 mb-2">小尺寸 (sm) - 默认</p>
        <ShBreadcrumbs items={basicItems} size="sm" />
      </div>
      <div>
        <p class="text-sm text-gray-600 mb-2">中等尺寸 (md)</p>
        <ShBreadcrumbs items={basicItems} size="md" />
      </div>
      <div>
        <p class="text-sm text-gray-600 mb-2">大尺寸 (lg)</p>
        <ShBreadcrumbs items={basicItems} size="lg" />
      </div>
      <div>
        <p class="text-sm text-gray-600 mb-2">超大尺寸 (xl)</p>
        <ShBreadcrumbs items={basicItems} size="xl" />
      </div>
    </div>
  </div>
</div>
