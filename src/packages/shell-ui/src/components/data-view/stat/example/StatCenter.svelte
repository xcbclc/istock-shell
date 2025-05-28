<script lang="ts">
  import { ShStat, type StatItemProps } from '@istock-shell/ui';
  const list: StatItemProps[] = $state([
    {
      title: '下载量',
      value: '31K',
      desc: '1月1日至2月1日',
    },
    {
      title: '用户量',
      value: {
        text: '4,200',
        color: 'secondary',
      },
      desc: {
        text: '↗︎ 40 (2%)',
        color: 'secondary',
      },
    },
    {
      title: '新注册',
      value: '1,200',
      desc: '↘︎ 90 (14%)',
    },
  ]);
</script>

<ShStat {list} center />
