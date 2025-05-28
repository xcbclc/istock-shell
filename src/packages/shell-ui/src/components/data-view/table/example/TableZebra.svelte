<script lang="ts">
  import { ShTable, type TableDataList, type TableThead } from '@istock-shell/ui';

  const thead: TableThead = [
    { value: '', dataKey: 'index' },
    { value: 'Name', dataKey: 'name' },
    { value: 'Job', dataKey: 'job' },
    { value: 'Favorite Color', dataKey: 'color' },
  ];
  const tbody: TableDataList = [
    { index: 1, name: 'Cy Ganderton', job: 'Quality Control Specialist', color: 'Blue' },
    { index: 2, name: 'Hart Hagerty', job: 'Desktop Support Technician', color: 'Purple' },
    { index: 3, name: 'Brice Swyre', job: 'Tax Accountant', color: 'Red' },
  ];
</script>

<ShTable {thead} {tbody} zebra />
