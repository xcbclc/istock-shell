<script lang="ts">
  import { ShBreadcrumbs } from '@istock-shell/ui';

  // 长文本面包屑项数据
  const longTextItems = [
    { text: 'Long text 1' },
    { text: 'Long text 2' },
    { text: 'Long text 3' },
    { text: 'Long text 4' },
    { text: 'Long text 5' },
  ];
</script>

<ShBreadcrumbs items={longTextItems} maxWidth="xs"></ShBreadcrumbs>
