<script lang="ts">
  import { ShStat } from '@istock-shell/ui';
  const list = $state([
    {
      title: '总页面浏览量',
      value: '89,400',
      desc: '比上个月增加21%',
    },
  ]);
</script>

<ShStat {list} />
