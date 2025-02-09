<script lang="ts">
  import Text from '../Text.svelte';
</script>

<div class="flex items-center justify-center flex-col gap-2">
  <Text color="neutral" texts={[{ text: '中性颜色文本' }]} />
  <Text color="primary" texts={[{ text: '主要颜色文本' }]} />
  <Text color="secondary" texts={[{ text: '次要颜色文本' }]} />
  <Text color="accent" texts={[{ text: '强调颜色文本' }]} />
  <Text color="info" texts={[{ text: '信息颜色文本' }]} />
  <Text color="success" texts={[{ text: '成功颜色文本' }]} />
  <Text color="warning" texts={[{ text: '警告颜色文本' }]} />
  <Text color="error" texts={[{ text: '错误颜色文本' }]} />
</div>
