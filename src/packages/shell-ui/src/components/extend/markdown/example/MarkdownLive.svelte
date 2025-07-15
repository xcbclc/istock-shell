<script lang="ts">
  import { ShMarkdown, ShTextarea } from '@istock-shell/ui';
  let content = $state('```js \n' + 'alert("你好")\n' + '```');
</script>

<ShTextarea
  bind:value={content}
  class="w-full"
  style={'border: 1px solid var(--input-color);padding: 10px'}
  placeholder="请输入markdown文档"
/>
<ShMarkdown {content} class="w-full" />
