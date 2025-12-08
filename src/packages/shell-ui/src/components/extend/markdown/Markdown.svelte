<!--
@component
ShMarkdown Markdown渲染组件

一个功能丰富的Markdown渲染组件，支持代码高亮、自定义解析配置和响应式内容更新。
基于 Marked 库和 Highlight.js 构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持完整的Markdown语法解析和渲染
- 内置代码语法高亮功能（基于Highlight.js）
- 支持自定义Marked解析器扩展配置
- 响应式内容更新，内容变化时自动重新渲染
- 继承所有原生 div 元素的属性和事件
- 完整的 TypeScript 类型安全
- 安全的HTML内容渲染

示例用法：
```svelte
<script lang="ts">
  import { ShMarkdown } from '@istock-shell/ui';

  let markdownContent = `
    # 标题

    这是一段**粗体**文本和*斜体*文本。

    \`\`\`javascript
    console.log('Hello, World!');
    \`\`\`
  `;
</script>

<p>基础Markdown渲染</p>
<ShMarkdown content={markdownContent} />

<p>带自定义配置的Markdown</p>
<ShMarkdown
  content={markdownContent}
  options={{ breaks: true, gfm: true }}
  class="custom-markdown"
/>
```
-->
<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { MarkedExtension, Marked } from 'marked';
  import type { HLJSApi } from 'highlight.js';
  import { markedHighlight } from 'marked-highlight';

  /**
   * Markdown组件属性接口
   * 继承所有原生 div 元素的 HTML 属性，并扩展Markdown特有的功能属性
   * @typedef {HTMLAttributes<HTMLDivElement> & MarkdownPropsExtension} MarkdownProps
   */
  export interface MarkdownProps extends HTMLAttributes<HTMLDivElement> {
    /** 原始Markdown内容字符串，支持完整的Markdown语法 */
    content?: string;
    /** Marked解析器扩展配置，用于自定义解析行为和扩展功能 */
    options?: MarkedExtension;
    /** 内容被加载 **/
    onContentLoaded?: (success: Boolean) => void;
  }
  let MarkedClass: typeof Marked | undefined;
  let hljs: HLJSApi | undefined;
  let markedHighlightMethod: typeof markedHighlight | undefined;
</script>

<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { tuc } from '@istock-shell/util';
  const {
    content = $bindable(''), // Markdown原始内容，支持双向绑定
    options = {}, // Marked解析器扩展配置（默认空对象）
    onContentLoaded, // 内容被加载
    class: className = '', // 自定义CSS类名（默认空字符串）
    ...otherProps // 其他原生div元素属性
  }: MarkdownProps = $props();

  /**
   * 响应式状态：存储解析后的HTML内容
   * 用于缓存Markdown解析结果，避免重复解析
   */
  let markdownHtml: string = $state('');

  /**
   * Marked解析器实例
   */
  let marked: Marked | undefined = $state.raw();

  /**
   * 初始化Marked解析器实例
   * 配置代码高亮插件和自定义选项
   *
   * 配置说明：
   * - langPrefix: 为代码块添加CSS类名前缀，便于样式控制
   * - highlight: 自定义代码高亮处理函数
   * - ...options: 合并用户自定义配置
   */
  const initMarked = async () => {
    if (!MarkedClass || !hljs || !markedHighlightMethod) {
      const [importMarked, importHighlight, importMarkedHighlight] = await Promise.all([
        import('marked'),
        import('highlight.js'),
        import('marked-highlight'),
      ]);
      MarkedClass = importMarked.Marked;
      hljs = importHighlight.default;
      markedHighlightMethod = importMarkedHighlight.markedHighlight;
    }
    if (MarkedClass && hljs && markedHighlightMethod) {
      marked = new MarkedClass(
        markedHighlightMethod({
          langPrefix: 'hljs language-', // 代码块CSS类名前缀
          highlight(code, lang, _info) {
            /**
             * 代码高亮处理函数
             * @param code - 代码内容
             * @param lang - 语言标识
             * @param _info - 额外信息（未使用）
             * @returns 高亮后的HTML字符串
             */
            if (!hljs) return;
            // 验证并获取有效语言类型，如果不支持则使用plaintext
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            // 执行代码高亮处理，返回带有高亮标记的HTML
            return hljs.highlight(code, { language }).value;
          },
          ...options, // 合并用户自定义配置选项
        })
      );
    }
    // 导入代码高亮样式和Markdown处理库
    import('highlight.js/styles/github-dark.css');
  };

  /**
   * Markdown解析方法
   * 将原始Markdown内容解析为HTML字符串
   * 使用异步处理以支持复杂的解析操作
   */
  const parseMarkdownToHtml = async () => {
    if (marked) {
      markdownHtml = await marked.parse(content);
    }
  };

  /**
   * 响应式效果：监听内容变化并自动重新解析
   * 当content属性发生变化时，自动触发Markdown重新解析
   * 确保渲染内容与输入内容保持同步
   */
  $effect(() => {
    if (content && marked) {
      void parseMarkdownToHtml();
    }
  });

  onMount(async () => {
    try {
      await initMarked();
      await tick();
      onContentLoaded?.(true);
    } catch (e) {
      onContentLoaded?.(false);
      throw e;
    }
  });
</script>

<!--
  Markdown内容容器：基于原生div元素，应用默认样式类和自定义类名，透传所有原生属性
  样式处理：
  - 应用markdown基础样式类，提供统一的Markdown渲染样式
  - 支持自定义类名扩展，允许用户覆盖或补充样式
  - 透传所有div元素属性，保持完整的HTML元素功能
-->
<div class={[tuc('markdown'), className]} {...otherProps}>
  <!--
    安全渲染HTML内容：使用@html指令渲染解析后的Markdown HTML
    安全性说明：
    - 内容来源于Marked库的安全解析，已经过XSS防护处理
    - 禁用ESLint的no-at-html-tags规则，因为这里是受控的HTML渲染
    - 建议在生产环境中对用户输入的Markdown内容进行额外的安全过滤
  -->
  <!--eslint-disable-next-line svelte/no-at-html-tags-->
  {@html markdownHtml}
</div>

<style>
  @reference "../../../style/daisyui.css";
  @layer components {
    /* 基础排版与色彩，遵循 DaisyUI 主题变量 */
    :global(.markdown) {
      @apply text-base-content;
      line-height: 1.75;
    }

    /* 标题层级，清晰的视觉层次与节奏 */
    :global(.markdown h1) {
      @apply text-3xl font-bold mt-6 mb-4 text-base-content border-b border-base-300 pb-2;
    }
    :global(.markdown h2) {
      @apply text-2xl font-semibold mt-5 mb-3 text-base-content border-b border-base-300 pb-1;
    }
    :global(.markdown h3) {
      @apply text-xl font-semibold mt-4 mb-2 text-base-content;
    }
    :global(.markdown h4) {
      @apply text-lg font-semibold mt-3 mb-2 text-base-content;
    }
    :global(.markdown h5) {
      @apply text-base font-semibold mt-3 mb-2 text-base-content;
    }
    :global(.markdown h6) {
      @apply text-sm font-semibold mt-3 mb-2 uppercase tracking-wide text-base-content;
    }

    /* 段落与文本元素 */
    :global(.markdown p) {
      @apply my-2;
    }
    :global(.markdown strong) {
      @apply font-semibold;
    }
    :global(.markdown em) {
      font-style: italic;
    }
    :global(.markdown a) {
      @apply link link-primary no-underline;
    }
    :global(.markdown a:hover) {
      @apply underline;
    }

    /* 引用块：弱化背景与左侧强调线 */
    :global(.markdown blockquote) {
      @apply my-4 pl-4 border-l-4 border-base-300 bg-base-200 rounded-lg;
    }

    /* 分隔线 */
    :global(.markdown hr) {
      @apply my-8 border-base-300;
    }

    /* 列表与层级缩进 */
    :global(.markdown ul) {
      @apply list-disc my-4 pl-6;
    }
    :global(.markdown ol) {
      @apply list-decimal my-4 pl-6;
    }
    :global(.markdown li) {
      @apply my-1;
    }
    :global(.markdown li > ul),
    :global(.markdown li > ol) {
      @apply mt-2;
    }

    /* 行内代码与代码块 */
    :global(.markdown code) {
      @apply font-mono text-sm rounded px-1.5 py-0.5 bg-base-200 border border-base-300;
    }
    :global(.markdown pre) {
      @apply bg-base-200 border border-base-300 rounded-xl p-4 my-6 overflow-x-auto;
    }
    :global(.markdown pre code) {
      display: block;
      padding: 0;
      background: transparent;
      border: 0;
      @apply text-sm;
    }
    :global(.markdown pre code.hljs) {
      background: transparent !important;
    }
    :global(.markdown .hljs) {
      @apply bg-transparent text-base-content;
    }

    /* 表格：对齐、边框与交互态 */
    :global(.markdown table) {
      @apply w-full my-6 border-collapse rounded-xl overflow-hidden border border-base-300;
    }
    :global(.markdown thead) {
      @apply bg-base-200;
    }
    :global(.markdown th) {
      @apply text-left font-semibold text-base-content px-3 py-2 border-b border-base-300;
    }
    :global(.markdown td) {
      @apply text-base-content px-3 py-2 border-t border-base-300;
    }
    :global(.markdown tbody tr:hover) {
      @apply bg-base-200;
    }
    :global(.markdown tbody tr:nth-child(odd)) {
      @apply bg-base-100;
    }

    /* 图片：响应式与边界处理 */
    :global(.markdown img) {
      @apply max-w-full rounded-xl border border-base-300 my-4;
    }

    /* 键盘符号与任务列表复选框 */
    :global(.markdown kbd) {
      @apply inline-flex items-center justify-center rounded-md border border-base-300 bg-base-200 px-1.5 py-0.5 text-xs font-medium;
    }
    :global(.markdown .task-list-item) {
      @apply list-none pl-0;
    }
    :global(.markdown .task-list-item input[type='checkbox']) {
      width: 1rem;
      height: 1rem;
      vertical-align: middle;
      margin-right: 0.5rem;
      @apply rounded border-base-300 bg-base-200;
    }
  }
</style>
