<script lang="ts">
  import Text from '../Text.svelte';
</script>

<div class="flex flex-col gap-2">
  <Text weight="light" texts={[{ text: '文字light' }]} />
  <Text weight="medium" texts={[{ text: '文字medium' }]} />
  <Text weight="semibold" texts={[{ text: '文字semibold' }]} />
  <Text weight="bold" texts={[{ text: '文字bold' }]} />
</div>
