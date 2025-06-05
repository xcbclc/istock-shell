<script lang="ts">
  import { ShBreadcrumbs } from '@istock-shell/ui';

  // 基本面包屑项数据
  const basicItems = [
    { text: 'Home', href: '#/' },
    { text: 'Documents', href: '#/documents' },
    { text: 'Add Document' },
  ];
</script>

<ShBreadcrumbs items={basicItems} />
