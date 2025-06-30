<script lang="ts">
  import { ShMenu, type MenuItemProps } from '@istock-shell/ui';
  const titleItems = [
    { text: 'Title', isTitle: true },
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' },
  ];
  const titleParentItems: MenuItemProps[] = [
    {
      text: 'Title',
      isTitle: true,
      isParent: true,
      subItem: {
        items: [{ text: 'Item 1' }, { text: 'Item 2' }, { text: 'Item 3' }],
      },
    },
  ];
</script>

<div class="space-y-8">
  <div>
    <h3 class="text-lg font-semibold mb-4">带标题的菜单</h3>
    <ShMenu items={titleItems} canToggle={false} class="w-56" />
  </div>
  <div>
    <h3 class="text-lg font-semibold mb-4">带标题的菜单</h3>
    <ShMenu items={titleParentItems} canToggle={false} class="w-56" />
  </div>
</div>
