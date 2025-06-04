<script lang="ts">
  import { ShMenu } from '@istock-shell/ui';

  // 基本菜单项数据
  const basicItems = [{ text: 'Menu size 1' }, { text: 'Menu size 2' }, { text: 'Menu size 3' }];
</script>

<div class="space-y-8">
  <!-- 不同尺寸 -->
  <div>
    <h3 class="text-lg font-semibold mb-4">不同尺寸</h3>
    <div class="space-y-4">
      <div>
        <p class="text-sm text-gray-600 mb-2">超小尺寸 (xs)</p>
        <ShMenu items={basicItems} size="xs" class="w-48" />
      </div>
      <div>
        <p class="text-sm text-gray-600 mb-2">小尺寸 (sm)</p>
        <ShMenu items={basicItems} size="sm" class="w-48" />
      </div>
      <div>
        <p class="text-sm text-gray-600 mb-2">中等尺寸 (md) - 默认</p>
        <ShMenu items={basicItems} size="md" class="w-56" />
      </div>
      <div>
        <p class="text-sm text-gray-600 mb-2">大尺寸 (lg)</p>
        <ShMenu items={basicItems} size="lg" class="w-64" />
      </div>
      <div>
        <p class="text-sm text-gray-600 mb-2">超大尺寸 (xl)</p>
        <ShMenu items={basicItems} size="xl" class="w-72" />
      </div>
    </div>
  </div>
</div>
