<script lang="ts">
  import Text from '../Text.svelte';
</script>

<div class="flex flex-col gap-2">
  <Text align="left" texts={[{ text: '文字居左' }]} />
  <Text align="center" texts={[{ text: '文字居中' }]} />
  <Text align="right" texts={[{ text: '文字居右' }]} />
</div>
