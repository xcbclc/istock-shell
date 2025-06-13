<script lang="ts">
  import { ShMenu, shShowMessage, type MenuItemProps } from '@istock-shell/ui';
  const submenuItems: MenuItemProps[] = [
    {
      text: 'Item 1',
      key: 'index-1',
    },
    {
      text: 'Parent Item',
      key: 'index-2',
      subItem: {
        items: [
          { text: 'Submenu 1', key: 'index-2-1', active: true },
          { text: 'Submenu 2', key: 'index-2-2' },
          {
            text: 'Parent',
            key: 'index-2-3',
            subItem: {
              items: [
                { text: 'Submenu 1', key: 'index-2-3-1' },
                { text: 'Submenu 2', key: 'index-2-3-2' },
              ],
            },
          },
        ],
      },
    },
    {
      text: 'Item 3',
      key: 'index-3',
    },
  ];
  const onMenuItemClick = (item: MenuItemProps) => {
    console.log('onMenuItemClick', item.key, item);
    shShowMessage.info('onMenuItemClick：' + item.key);
  };
</script>

<ShMenu items={submenuItems} {onMenuItemClick} class="w-56" />
