<script lang="ts">
  import 'highlight.js/styles/github-dark.css';
  import { Marked, type MarkedExtension } from 'marked';
  import { markedHighlight } from 'marked-highlight';
  import hljs from 'highlight.js';

  interface Props {
    content?: string;
    options?: MarkedExtension;
  }

  const { content = '', options = {} }: Props = $props();

  let markdownHtml: string = $state('');
  const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang, _info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
      ...options,
    })
  );
  const parseMarkdownToHtml = async () => {
    markdownHtml = await marked.parse(content);
  };
  $effect(() => {
    if (content) {
      void parseMarkdownToHtml();
    }
  });
</script>

<div class="markdown">
  <!--eslint-disable-next-line svelte/no-at-html-tags-->
  {@html markdownHtml}
</div>

<style lang="scss">
  .markdown :global(code) {
    border-radius: var(--border-radius);
    word-break: break-all;
  }
</style>
