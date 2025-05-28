<script lang="ts">
  import { ShStat, type StatItemProps } from '@istock-shell/ui';
  const list: StatItemProps[] = $state([
    {
      title: '账户余额',
      value: '$89,400',
      actions: [{ text: '添加余额', color: 'success' }],
    },
    {
      title: '当前余额',
      value: '$89,400',
      actions: [{ text: '提款' }, { text: '存款' }],
    },
  ]);
</script>

<ShStat {list} />
