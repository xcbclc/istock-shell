<script lang="ts">
  import { ShMenu } from '@istock-shell/ui';

  // 基本菜单项数据
  const basicItems = [{ text: 'Item 1' }, { text: 'Item 2' }, { text: 'Item 3' }];
</script>

<div class="space-y-8">
  <div>
    <h3 class="text-lg font-semibold mb-4">无内边距和圆角</h3>
    <ShMenu items={basicItems} class="w-56 [&_li>*]:rounded-none p-0 rounded-none"></ShMenu>
  </div>
</div>
