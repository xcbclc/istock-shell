<template>

  <div class="theme-switcher">

    <div class="theme-dropdown">
       <!-- 主题切换按钮 -->
      <div role="button" class="theme-toggle-btn" :title="`当前主题: ${getCurrentThemeLabel()}`">

        <div class="theme-icon-wrapper">
           <!-- 主题切换图标 --> <svg
            class="theme-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >

            <path
              d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
              fill="currentColor"
            />
             </svg
          >
        </div>

      </div>
       <!-- 主题选择下拉菜单 -->
      <div class="theme-menu-warp">

        <div class="theme-menu">

          <div class="menu-header">

            <h3 class="menu-title">主题设置</h3>

            <div class="current-theme-badge">{{ getCurrentThemeLabel() }}</div>

          </div>

          <div class="themes-grid">

            <div
              v-for="theme in themes"
              :key="theme.value"
              @click.stop="setTheme(theme.value)"
              :class="['theme-option', { 'theme-active': currentTheme === theme.value }]"
              :title="theme.label"
            >
               <!-- 主题预览卡片 -->
              <div class="theme-preview">

                <div class="preview-colors">

                  <div
                    v-for="(color, index) in theme.colors.slice(0, 3)"
                    :key="index"
                    class="color-stripe"
                    :style="{ backgroundColor: color }"
                  ></div>

                </div>

              </div>
               <!-- 主题信息 -->
              <div class="theme-info">
                 <span class="theme-name">{{ theme.label }}</span
                >
              </div>
               <!-- 选中状态指示器 -->
              <div v-if="currentTheme === theme.value" class="selected-indicator">
                 <svg viewBox="0 0 20 20" fill="currentColor">

                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                   </svg
                >
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useData } from 'vitepress';

const { isDark } = useData();

interface Theme {
  value: string;
  label: string;
  colors: string[];
}

const themes: Theme[] = [
  { value: 'light', label: '亮色', colors: ['#f8fafc', '#e2e8f0', '#94a3b8'] },
  { value: 'dark', label: '暗色', colors: ['#1e293b', '#334155', '#94a3b8'] },
  { value: 'cupcake', label: '杯子蛋糕', colors: ['#faf7f5', '#edd9d0', '#e2d6cf'] },
  { value: 'bumblebee', label: '大黄蜂', colors: ['#fef3c7', '#f59e0b', '#92400e'] },
  { value: 'emerald', label: '祖母绿', colors: ['#d1fae5', '#10b981', '#065f46'] },
  { value: 'corporate', label: '企业', colors: ['#f8fafc', '#64748b', '#1e293b'] },
  { value: 'synthwave', label: '合成波', colors: ['#2d1b69', '#e779c1', '#58c7f3'] },
  { value: 'retro', label: '复古', colors: ['#ef9995', '#2e282a', '#e4a672'] },
  { value: 'cyberpunk', label: '赛博朋克', colors: ['#ffee00', '#e352ff', '#00ffff'] },
  { value: 'valentine', label: '情人节', colors: ['#e96d7b', '#a991f7', '#f2d4d7'] },
  { value: 'halloween', label: '万圣节', colors: ['#212121', '#f57800', '#f3d9c6'] },
  { value: 'garden', label: '花园', colors: ['#e9e7e7', '#ec8c69', '#5c7f67'] },
  { value: 'forest', label: '森林', colors: ['#171212', '#1db354', '#372e29'] },
  { value: 'aqua', label: '水色', colors: ['#345da7', '#4d73be', '#8496c5'] },
  { value: 'lofi', label: '低保真', colors: ['#f3f4f6', '#9ca3af', '#374151'] },
  { value: 'pastel', label: '粉彩', colors: ['#fef7ff', '#f3e8ff', '#a855f7'] },
  { value: 'fantasy', label: '幻想', colors: ['#f0f9ff', '#7dd3fc', '#0369a1'] },
  { value: 'wireframe', label: '线框', colors: ['#ffffff', '#000000', '#6b7280'] },
  { value: 'black', label: '纯黑', colors: ['#000000', '#333333', '#666666'] },
  { value: 'luxury', label: '奢华', colors: ['#000000', '#ffffff', '#e0e0e0'] },
  { value: 'dracula', label: '德古拉', colors: ['#282a36', '#44475a', '#6272a4'] },
  { value: 'cmyk', label: 'CMYK', colors: ['#ffffff', '#00ffff', '#ff00ff'] },
  { value: 'autumn', label: '秋季', colors: ['#fef3c7', '#f59e0b', '#92400e'] },
  { value: 'business', label: '商务', colors: ['#1e293b', '#3b82f6', '#374151'] },
  { value: 'acid', label: '酸性', colors: ['#fbbf24', '#84cc16', '#dc2626'] },
  { value: 'lemonade', label: '柠檬水', colors: ['#fef3c7', '#fbbf24', '#f59e0b'] },
  { value: 'night', label: '夜晚', colors: ['#0f1729', '#293a5b', '#4a6baf'] },
  { value: 'coffee', label: '咖啡', colors: ['#20161f', '#211720', '#795e54'] },
  { value: 'winter', label: '冬季', colors: ['#f1f5f9', '#94a3b8', '#475569'] },
  { value: 'dim', label: '昏暗', colors: ['#2d3250', '#424769', '#7077a1'] },
  { value: 'nord', label: '北欧', colors: ['#2e3440', '#3b4252', '#434c5e'] },
  { value: 'sunset', label: '日落', colors: ['#fed7aa', '#fb923c', '#ea580c'] },
];

const currentTheme = ref('');

// 获取当前主题的标签
const getCurrentThemeLabel = () => {
  const theme = themes.find((t) => t.value === currentTheme.value);
  return theme ? theme.label : '默认';
};

const setTheme = (theme: string) => {
  currentTheme.value = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('daisyui-theme', theme);

  // 同步VitePress的暗色模式
  const darkThemes = [
    'dark',
    'synthwave',
    'halloween',
    'forest',
    'black',
    'luxury',
    'dracula',
    'business',
    'night',
    'coffee',
    'dim',
    'nord',
  ];
  if (darkThemes.includes(theme)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

onMounted(() => {
  // 从localStorage获取保存的主题
  const savedTheme = localStorage.getItem('daisyui-theme');

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // 如果没有保存的主题，则根据系统偏好设置默认主题
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // setTheme(prefersDark ? 'business' : 'light');
    setTheme('business');
  }

  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('daisyui-theme')) {
      // setTheme(e.matches ? 'business' : 'light');
      setTheme('business');
    }
  });
});

// 监听VitePress的暗色模式变化
watch(isDark, (newVal) => {
  const savedTheme = localStorage.getItem('daisyui-theme');
  if (!savedTheme) {
    // setTheme(newVal ? 'business' : 'light');
    setTheme('business');
  }
});
</script>

<style scoped>
:root {
  --theme-transition: all 0.25s ease;
}

/* 主题切换器容器 */
.theme-switcher {
  margin-left: 8px;
  display: flex;
  align-items: center;
  position: relative;
}

/* 主题切换按钮 */
.theme-toggle-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  transition: var(--theme-transition);
  background-color: transparent;
}

.theme-toggle-btn:active {
  transform: scale(0.95);
}

/* 主题图标包装器 */
.theme-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

/* 主题图标 */
.theme-icon {
  color: var(--vp-c-text-2);
  transition: var(--theme-transition);
}


/* 主题下拉容器 */
.theme-dropdown {
  position: relative;
}

.theme-dropdown:hover .theme-menu-warp {
  opacity: 1;
  visibility: visible;
}

/* 主题菜单 */
.theme-menu-warp{
  padding-top: 10px;
  position: absolute;
  top: 100%;
  right: 0;
  width: 280px;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
}
.theme-menu {
  background-color: var(--vp-c-bg);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 12px;
  transition: var(--theme-transition);
  scrollbar-width: thin;
  max-height: 420px;
  overflow-y: auto;
}

/* 菜单头部 */
.menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.menu-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
}

.current-theme-badge {
  font-size: 12px;
  color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft);
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

/* 主题网格 */
.themes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

/* 主题选项 */
.theme-option {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: var(--theme-transition);
  border: 1px solid transparent;
  background-color: var(--vp-c-bg-soft);
}

.theme-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.theme-active {
  border-color: var(--vp-c-brand);
}

/* 主题预览 */
.theme-preview {
  width: 100%;
  height: 36px;
  overflow: hidden;
}

.preview-colors {
  display: flex;
  height: 100%;
}

.color-stripe {
  flex: 1;
  height: 100%;
}

/* 主题信息 */
.theme-info {
  padding: 6px;
  text-align: center;
}

.theme-name {
  font-size: 11px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 选中状态指示器 */
.selected-indicator {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  background-color: var(--vp-c-brand);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.selected-indicator svg {
  width: 10px;
  height: 10px;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .theme-menu {
    width: 240px;
  }

  .themes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

