<script lang="ts">
  import { ShBreadcrumbs, shShowMessage, type BreadcrumbItemProps } from '@istock-shell/ui';

  const breadcrumbItems: BreadcrumbItemProps[] = [
    {
      text: 'Home',
      href: '#/',
    },
    {
      text: 'Documents',
      href: '#/documents',
    },
    {
      text: 'Projects',
      href: '#/projects',
    },
    {
      text: 'Current Page',
      current: true,
    },
  ];

  const onItemClick = (item: BreadcrumbItemProps, index: number) => {
    console.log('onItemClick', index, item);
    shShowMessage.info(`点击了面包屑项: ${item.text} (索引: ${index})`);
  };
</script>

<ShBreadcrumbs items={breadcrumbItems} {onItemClick} />
