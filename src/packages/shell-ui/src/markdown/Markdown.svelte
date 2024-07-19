<script lang="ts">
  import 'highlight.js/styles/github-dark.css';
  import { Marked, type MarkedExtension } from 'marked';
  import { markedHighlight } from 'marked-highlight';
  import hljs from 'highlight.js';

  export let content: string = '';
  export let options: MarkedExtension = {};

  let markdownHtml: string = '';
  const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang, _info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
    })
  );
  const parseMarkdownToHtml = async () => {
    markdownHtml = await marked.parse(content);
  };
  $: if (content) {
    void parseMarkdownToHtml();
  }
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
