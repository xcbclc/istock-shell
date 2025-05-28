<script lang="ts">
  import { ShStat, type StatItemProps } from '@istock-shell/ui';
  const list: StatItemProps[] = $state([
    {
      title: '下载量',
      value: '31K',
      desc: '1月1日至2月1日',
    },
    {
      title: '新用户',
      value: '4,200',
      desc: '↗︎ 400 (22%)',
    },
    {
      title: '新注册',
      value: '1,200',
      desc: '↘︎ 90 (14%)',
    },
  ]);
</script>

<ShStat {list} vertical />
