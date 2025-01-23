<script lang="ts">
  import Text from '../Text.svelte';
</script>

<div class="flex items-center justify-center flex-col gap-2">
  <Text size="xs" texts={[{ text: '超小尺寸' }]} />
  <Text size="sm" texts={[{ text: '小尺寸' }]} />
  <Text size="md" texts={[{ text: '中尺寸' }]} />
  <Text size="lg" texts={[{ text: '大尺寸' }]} />
  <Text size="xl" texts={[{ text: '超大尺寸' }]} />
</div>
