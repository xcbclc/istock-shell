<script lang="ts">
  import { ShTable, type TableDataList, type TableThead, type TableTrButton } from '@istock/shell-ui';

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

  const buttons: TableTrButton[] = [
    {
      text: 'update',
      color: 'primary',
      onClickValue: (value: TableDataList[0], index: number) => {
        result = JSON.stringify(['update', value, index]);
        console.log('update', value, index);
      },
    },
    {
      text: 'delete',
      onClickValue: (value: TableDataList[0], index: number) => {
        result = JSON.stringify(['delete', value, index]);
        console.log('delete', value, index);
      },
    },
  ];

  let result = $state('');
</script>

<ShTable {thead} {tbody} {buttons} buttonConfig={{ columnTitle: 'Action' }} />
<p class="text-sm">{result}</p>
