<script lang="ts" module>
  // 导入代码高亮样式和Markdown处理库
  import 'highlight.js/styles/github-dark.css';
  import type { MarkedExtension } from 'marked';
  import type { HTMLAttributes } from 'svelte/elements';

  // Markdown组件属性接口（继承div元素属性）
  export interface MarkdownProps extends HTMLAttributes<HTMLDivElement> {
    content?: string; // 原始Markdown内容
    options?: MarkedExtension; // Marked解析器扩展配置
  }
</script>

<script lang="ts">
  // 导入代码高亮样式和Markdown处理库
  import 'highlight.js/styles/github-dark.css';
  import { Marked } from 'marked';
  import { markedHighlight } from 'marked-highlight';
  import hljs from 'highlight.js';
  import { tuc } from '@istock-shell/util';
  const {
    content = $bindable(''), // Markdown原始内容
    options = {}, // Marked解析器配置
    class: className = '', // 自定义类名
    ...otherProps // 其他原生属性
  }: MarkdownProps = $props();

  // 响应式状态：存储解析后的HTML内容
  let markdownHtml: string = $state('');

  // 初始化Marked解析器
  const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang, _info) {
        // 验证并获取有效语言类型
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        // 执行代码高亮处理
        return hljs.highlight(code, { language }).value;
      },
      ...options, // 合并自定义配置
    })
  );

  // Markdown解析方法
  const parseMarkdownToHtml = async () => {
    markdownHtml = await marked.parse(content);
  };

  // 响应式效果：当内容变化时重新解析
  $effect(() => {
    if (content) {
      void parseMarkdownToHtml();
    }
  });
</script>

<div class={[tuc('markdown'), className]} {...otherProps}>
  <!-- 安全渲染HTML内容 -->
  <!--eslint-disable-next-line svelte/no-at-html-tags-->
  {@html markdownHtml}
</div>
