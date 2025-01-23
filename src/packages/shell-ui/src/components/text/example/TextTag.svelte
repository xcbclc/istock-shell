<script lang="ts">
  import Text from '../Text.svelte';
</script>

<div class="flex items-center justify-center flex-col gap-2">
  <Text tag="p" texts={[{ text: 'p标签' }]} />
  <Text tag="span" texts={[{ text: 'span标签' }]} />
  <Text tag="a" texts={[{ text: 'a标签' }]} />
  <Text tag="i" texts={[{ text: 'i标签' }]} />
  <Text tag="em" texts={[{ text: 'em标签' }]} />
  <Text tag="strong" texts={[{ text: 'strong标签' }]} />
</div>
