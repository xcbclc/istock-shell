<template>
   <!-- 示例组件容器 -->
  <div class="ui-example mockup-window">
     <!-- 示例展示区域 -->
    <div v-if="loading" class="flex align-center justify-center">
       <span class="loading loading-dots loading-md"></span>
    </div>

    <div
      v-show="!loading"
      :class="[
        'ui-example-demo',
        layout === 'column'
          ? `flex flex-wrap items-center justify-center flex-col ${gap === 'xl' ? 'gap-12' : 'gap-4'}`
          : '',
        layout === 'row' ? `flex flex-wrap items-center justify-center ${gap === 'xl' ? 'gap-6' : 'gap-2'}` : '',
      ]"
      :style="demoStyle"
      :id="id"
    ></div>

    <div class="ui-example-divider"></div>
     <!-- 操作按钮区域 -->
    <div class="ui-example-actions">
       <!-- 复制按钮 -->
      <div class="tooltip" :class="copyTip ? 'tooltip-open' : ''">

        <div class="tooltip-content">{{ copyTip || '复制代码' }}</div>
         <i class="ui-example-icon" @click="copyCode"
          > <svg viewBox="0 0 24 24" width="1em" height="1em">

            <path
              fill="currentColor"
              d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"
            ></path>
             </svg
          > </i
        >
      </div>
       <!-- 代码显示/隐藏按钮 -->
      <div class="tooltip">

        <div class="tooltip-content">{{ isCodeVisible ? '收起代码' : '显示代码' }}</div>
         <i class="ui-example-icon" title="复制代码" @click="toggleCode"
          > <svg viewBox="0 0 24 24" width="1em" height="1em">

            <path
              fill="currentColor"
              d="m23 12l-7.071 7.071l-1.414-1.414L20.172 12l-5.657-5.657l1.414-1.414L23 12zM3.828 12l5.657 5.657l-1.414 1.414L1 12l7.071-7.071l1.414 1.414L3.828 12z"
            ></path>
             </svg
          > </i
        >
      </div>

      <div class="tooltip">

        <div class="tooltip-content">编辑该代码</div>

        <div class="tooltip-content"></div>
         <i class="ui-example-icon" title="编辑代码" @click="editCode"
          > <svg viewBox="0 0 24 24" width="1em" height="1em">

            <path
              fill="currentColor"
              d="M5.883 18.653c-.3-.2-.558-.455-.86-.816a50.32 50.32 0 0 1-.466-.579c-.463-.575-.755-.84-1.057-.949a1 1 0 0 1 .676-1.883c.752.27 1.261.735 1.947 1.588c-.094-.117.34.427.433.539c.19.227.33.365.44.438c.204.137.587.196 1.15.14c.023-.382.094-.753.202-1.095C5.38 15.31 3.7 13.396 3.7 9.64c0-1.24.37-2.356 1.058-3.292c-.218-.894-.185-1.975.302-3.192a1 1 0 0 1 .63-.582c.081-.024.127-.035.208-.047c.803-.123 1.937.17 3.415 1.096A11.731 11.731 0 0 1 12 3.315c.912 0 1.818.104 2.684.308c1.477-.933 2.613-1.226 3.422-1.096c.085.013.157.03.218.05a1 1 0 0 1 .616.58c.487 1.216.52 2.297.302 3.19c.691.936 1.058 2.045 1.058 3.293c0 3.757-1.674 5.665-4.642 6.392c.125.415.19.879.19 1.38a300.492 300.492 0 0 1-.012 2.716a1 1 0 0 1-.019 1.958c-1.139.228-1.983-.532-1.983-1.525l.002-.446l.005-.705c.005-.708.007-1.338.007-1.998c0-.697-.183-1.152-.425-1.36c-.661-.57-.326-1.655.54-1.752c2.967-.333 4.337-1.482 4.337-4.66c0-.955-.312-1.744-.913-2.404a1 1 0 0 1-.19-1.045c.166-.414.237-.957.096-1.614l-.01.003c-.491.139-1.11.44-1.858.949a1 1 0 0 1-.833.135A9.626 9.626 0 0 0 12 5.315c-.89 0-1.772.119-2.592.35a1 1 0 0 1-.83-.134c-.752-.507-1.374-.807-1.868-.947c-.144.653-.073 1.194.092 1.607a1 1 0 0 1-.189 1.045C6.016 7.89 5.7 8.694 5.7 9.64c0 3.172 1.371 4.328 4.322 4.66c.865.097 1.201 1.177.544 1.748c-.192.168-.429.732-.429 1.364v3.15c0 .986-.835 1.725-1.96 1.528a1 1 0 0 1-.04-1.962v-.99c-.91.061-1.662-.088-2.254-.485z"
            ></path></svg
          > </i
        >
      </div>

    </div>
     <!-- 代码展示区域 --> <Transition
      >
      <div class="ui-example-code" v-show="isCodeVisible" v-html="html"></div>
       </Transition
    >
  </div>

</template>

<script setup lang="ts">
import { defineProps, onMounted, computed, ref, shallowRef, watch } from 'vue';
import { createHighlighter, type Highlighter, type BundledTheme } from 'shiki';
import { useData } from 'vitepress';
import { mountExampleApp, getExampleAppCode } from '@istock-shell/ui/src/components/example';

// 主题配置
const theme: Record<'light' | 'dark', BundledTheme> = {
  light: 'github-light',
  dark: 'github-dark',
} as const;

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  layout: {
    type: String,
    default: 'row', // 'column' | 'row' | 'auto'
  },
  gap: {
    type: String,
    required: false,
  },
  demoStyle: {
    type: String,
    default: '',
  },
});
const { isDark } = useData();
const html = ref(''); // 存储高亮后的HTML代码

// 控制代码显示状态
const isCodeVisible = ref(false);
const copyTip = ref('');

const loading = ref(false);

// 切换代码显示/隐藏
const toggleCode = () => {
  isCodeVisible.value = !isCodeVisible.value;
};

// 根据源文件路径生成唯一ID
const id = computed(() => {
  return props.src
    .replace(/\.svelte$/g, '')
    .split('/')
    .filter((str) => !['.'].includes(str))
    .join('-');
});

// 代码高亮器实例
let highlighter = shallowRef<Highlighter>();

// 初始化代码高亮器
const initHighlighter = async () => {
  highlighter.value = await createHighlighter({
    themes: [theme.light, theme.dark],
    langs: ['svelte'],
  });
};

// 初始化高亮器
initHighlighter();

// 监听主题变化和源代码变化
watch([() => highlighter.value, () => props.src, isDark], async () => {
  // 更新代码高亮HTML
  if (!highlighter.value) return;
  const exampleAppCode = await getExampleAppCode(props.src);
  html.value = await highlighter.value.codeToHtml(exampleAppCode.code, {
    lang: exampleAppCode.lang,
    theme: isDark.value ? theme.dark : theme.light,
  });
});

// 组件挂载时初始化示例应用
onMounted(async () => {
  loading.value = true;
  await mountExampleApp(id.value, props.src);
  loading.value = false;
});

// 复制代码到剪贴板
const copyCode = async () => {
  try {
    const exampleAppCode = await getExampleAppCode(props.src);
    await navigator.clipboard.writeText(exampleAppCode.code);
    copyTip.value = '复制成功';
  } catch (err) {
    copyTip.value = '复制失败';
    console.error('复制失败:', err);
  } finally {
    setTimeout(() => {
      copyTip.value = '';
    }, 1500);
  }
};

const editCode = () => {
  const url = `${import.meta.env.VITE_ISTOCK_SHELL_UI_COMPONENT_EDIT_URL ?? ''}${props.src.slice(1)}`;
  window.open(url, '_blank');
};
</script>

<style>
/* 示例组件容器样式 */
.ui-example {
  padding: 16px 16px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.ui-example-demo{
  position: relative;
  min-height: 80px;
}

/* 分割线样式 */
.ui-example-divider {
  margin: 16px 0 8px;
  border-top: 1px dashed var(--vp-c-divider);
}

/* 操作按钮区域样式 */
.ui-example-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
}

/* 操作按钮图标样式 */
.ui-example-icon {
  display: inline-block;
  margin: 0 8px;
  font-size: 16px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  &:hover {
    color: var(--vp-c-text-1);
  }
}

/* 修改代码着色器样式 */
.shiki {
  background-color: transparent !important;
}

/* 代码展示区域样式 */
.ui-example-code {
  overflow-y: auto;
  transition: all 0.3s ease;
}
</style>

