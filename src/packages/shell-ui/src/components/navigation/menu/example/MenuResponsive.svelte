<script lang="ts">
  import { ShMenu } from '@istock-shell/ui';

  const basicItems = [{ text: 'Item 1' }, { text: 'Item 2' }, { text: 'Item 3' }];
</script>

<div class="space-y-8">
  <div>
    <h3 class="text-lg font-semibold mb-4">响应式适配</h3>
    <ShMenu items={basicItems} class="lg:menu-horizontal"></ShMenu>
  </div>
</div>
