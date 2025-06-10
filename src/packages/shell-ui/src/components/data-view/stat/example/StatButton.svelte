<script lang="ts">
  import { ShStat, shShowMessage, type StatItemProps } from '@istock-shell/ui';
  const list: StatItemProps[] = $state([
    {
      title: '账户余额',
      value: '$89,400',
      actions: [{ text: '添加余额', color: 'success', onclick: () => shShowMessage.info('点击添加余额') }],
    },
    {
      title: '当前余额',
      value: '$89,400',
      actions: [
        { text: '提款', onclick: () => shShowMessage.info('点击提款') },
        { text: '存款', onclick: () => shShowMessage.info('点击存款') },
      ],
    },
  ]);
</script>

<ShStat {list} />
