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
  // 导入代码高亮样式和Markdown处理库
  import 'highlight.js/styles/github-dark.css';
  import type { MarkedExtension } from 'marked';
  import type { HTMLAttributes } from 'svelte/elements';

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
</script>

<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { tuc } from '@istock-shell/util';
  import type { Marked } from 'marked';
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
    import('highlight.js/styles/github-dark.css');
    const [importMarked, importHighlight, importMarkedHighlight] = await Promise.all([
      import('marked'),
      import('highlight.js'),
      import('marked-highlight'),
    ]);
    const { Marked: MarkedClass } = importMarked;
    const hljs = importHighlight.default;
    const { markedHighlight: markedHighlightMethod } = importMarkedHighlight;
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
          // 验证并获取有效语言类型，如果不支持则使用plaintext
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          // 执行代码高亮处理，返回带有高亮标记的HTML
          return hljs.highlight(code, { language }).value;
        },
        ...options, // 合并用户自定义配置选项
      })
    );
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
