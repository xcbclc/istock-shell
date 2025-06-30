<script lang="ts">
  import { ShMenu } from '@istock-shell/ui';

  const stateActiveItems = [
    { text: '普通项' },
    { text: '激活项', active: true },
    { text: '普通项' },
  ];
  const stateFocusItems = [{ text: '普通项' }, { text: '聚焦项', focus: true }, { text: '普通项' }];
  const stateDisabledItems = [
    { text: '普通项' },
    { text: '禁用项', disabled: true },
    { text: '普通项' },
  ];
</script>

<div class="space-y-8">
  <div>
    <h3 class="text-lg font-semibold mb-4">激活</h3>
    <ShMenu items={stateActiveItems} class="w-56" />
  </div>
  <div>
    <h3 class="text-lg font-semibold mb-4">聚焦</h3>
    <ShMenu items={stateFocusItems} class="w-56" />
  </div>
  <div>
    <h3 class="text-lg font-semibold mb-4">禁用</h3>
    <ShMenu items={stateDisabledItems} class="w-56" />
  </div>
</div>
