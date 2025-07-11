<script lang="ts">
  import {
    ShVirtualList,
    ShTable,
    type VirtualListProps,
    type VirtualRange,
    type TableThead,
  } from '@istock-shell/ui';

  // 股票数据类型定义
  type StockData = {
    id: string;
    名称: string;
    代码: string;
    最新价: string;
    涨跌额: string;
    涨跌幅: string;
    总市值: string;
    成交量: string;
    成交额: string;
    行业: string;
  };

  // 模拟股票数据
  const stockNames = [
    '贵州茅台',
    '腾讯控股',
    '阿里巴巴',
    '中国平安',
    '招商银行',
    '五粮液',
    '美团',
    '宁德时代',
    '比亚迪',
    '海康威视',
  ];
  const stockCodes = [
    'SH600519',
    'HK00700',
    'HK09988',
    'SH601318',
    'SH600036',
    'SZ000858',
    'HK03690',
    'SZ300750',
    'SZ002594',
    'SZ002415',
  ];
  const industries = [
    '白酒',
    '互联网',
    '电商',
    '保险',
    '银行',
    '白酒',
    '外卖',
    '电池',
    '汽车',
    '安防',
  ];

  // 生成股票列表数据（10000条）
  let list: StockData[] = $state(
    Array.from({ length: 10000 }).map((_, index) => {
      const stockIndex = index % stockNames.length;
      const basePrice = 100 + Math.random() * 1500;
      const change = (Math.random() - 0.5) * 20;
      const changePercent = (change / basePrice) * 100;

      return {
        id: `${index + 1}`,
        名称: stockNames[stockIndex],
        代码: stockCodes[stockIndex],
        最新价: basePrice.toFixed(2),
        涨跌额: change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2),
        涨跌幅: change >= 0 ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`,
        总市值: `${(Math.random() * 50000 + 1000).toFixed(2)}亿`,
        成交量: `${(Math.random() * 100 + 1).toFixed(2)}万手`,
        成交额: `${(Math.random() * 200 + 10).toFixed(2)}亿`,
        行业: industries[stockIndex],
      };
    })
  );

  // 表头配置
  const thead: TableThead = [
    { value: '序号', dataKey: 'id', class: 'w-16 text-center' },
    { value: '股票名称', dataKey: '名称', class: 'w-24' },
    { value: '股票代码', dataKey: '代码', class: 'w-24 font-mono' },
    { value: '最新价', dataKey: '最新价', class: 'w-20 text-right font-mono' },
    { value: '涨跌额', dataKey: '涨跌额', class: 'w-20 text-right font-mono' },
    { value: '涨跌幅', dataKey: '涨跌幅', class: 'w-20 text-right font-mono' },
    { value: '总市值', dataKey: '总市值', class: 'w-24 text-right' },
    { value: '成交量', dataKey: '成交量', class: 'w-20 text-right' },
    { value: '成交额', dataKey: '成交额', class: 'w-20 text-right' },
    { value: '行业', dataKey: '行业', class: 'w-16' },
  ];

  // 当前可视区域范围状态（用于跟踪渲染区间）
  let range: VirtualRange = $state({
    start: 0,
    end: 0,
    totalHeight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  });

  const tbody: StockData[] = $derived.by(() => {
    return list.slice(range.start, range.end + 1);
  });

  const wrapStyle = $derived.by(() => {
    if (range && virtualList) {
      const height = `${range.totalHeight}px`;
      const padding = `${range.paddingTop}px 0 ${range.paddingBottom}px 0`;
      return `height: ${height}; padding: ${padding}`;
    }
    return '';
  });

  // 虚拟列表组件实例引用（用于调用组件方法）
  let virtualList: ShVirtualList;

  // 可视区域变化回调（当用户滚动时触发）
  const onRangeChange = (newRange: VirtualRange) => {
    range = newRange; // 更新当前可见范围
  };

  // 列表项尺寸变化回调（当元素尺寸变化时通知虚拟列表）
  const onItemResize = (node: HTMLElement) => {
    virtualList?.onItemResize(node); // 调用虚拟列表的尺寸更新方法
  };
</script>

<ShVirtualList bind:this={virtualList} {list} {onRangeChange} class="w-full h-120">
  <div class="virtual-main" style={wrapStyle}>
    <ShTable {thead} {tbody} onRender={onItemResize} pinRows size="sm" />
  </div>
</ShVirtualList>
