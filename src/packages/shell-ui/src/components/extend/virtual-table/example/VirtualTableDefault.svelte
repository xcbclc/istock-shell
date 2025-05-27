<script lang="ts">
  import { ShVirtualTable, type TableThead } from '@istock/shell-ui';

  type ListData = {
    id: string;
    [k: string]: any;
  };

  const tbody: ListData[] = $state(
    Array.from({ length: 10000 }).map((_, index) => {
      return {
        id: `${index + 1}`,
        名称: '贵州茅台',
        代码: 'SH600519',
        最新价: '1604.00',
        涨跌额: ' -31.71',
        涨跌幅: '-1.94%',
        总市值: '20149.41亿',
        成交量: '3.67万手',
        成交额: '   59.04亿',
      };
    })
  );

  const thead: TableThead = [
    { value: '编号', dataKey: 'id' },
    { value: '名称', dataKey: '名称' },
    { value: '代码', dataKey: '代码' },
    { value: '最新价', dataKey: '最新价' },
    { value: '涨跌额', dataKey: '涨跌额' },
    { value: '涨跌幅', dataKey: '涨跌幅' },
    { value: '总市值（亿）', dataKey: '总市值' },
    { value: '成交量（万手）', dataKey: '成交量' },
    { value: '成交额（亿）', dataKey: '成交额' },
  ];
</script>

<ShVirtualTable {thead} {tbody} class="w-full max-h-100"></ShVirtualTable>
