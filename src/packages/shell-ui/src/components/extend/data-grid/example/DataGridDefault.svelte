<script lang="ts">
  import { ShDataGrid, ShChart, type DataGridProps, type DataGridItem } from '@istock/shell-ui';
  import dataGridData from './DataGridDefault.json';

  const data: DataGridProps = $state({
    stats: dataGridData.stats,
    items: dataGridData.items.map((item) => {
      const data: DataGridItem = { component: ShChart };
      return { ...item, ...data };
    }),
  });
</script>

<ShDataGrid {...data} />
