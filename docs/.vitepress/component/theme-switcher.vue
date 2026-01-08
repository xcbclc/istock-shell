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
              <div class="theme-preview" :style="{ backgroundColor: theme.colors[4] }">
                 <!-- 主要颜色条 -->
                <div class="preview-colors">

                  <div
                    v-for="(color, index) in theme.colors.slice(0, 4)"
                    :key="index"
                    class="color-stripe"
                    :style="{ backgroundColor: color }"
                  ></div>

                </div>
                 <!-- 模拟UI元素 -->
                <div class="preview-ui" :style="{ backgroundColor: theme.colors[5] }">

                  <div class="ui-mock-layout">
                     <!-- 模拟按钮组 -->
                    <div class="ui-buttons">

                      <div class="ui-btn primary" :style="{ backgroundColor: theme.colors[0] }"></div>

                      <div class="ui-btn secondary" :style="{ backgroundColor: theme.colors[1] }"></div>

                      <div class="ui-btn accent" :style="{ backgroundColor: theme.colors[2] }"></div>

                    </div>
                     <!-- 模拟文本内容 -->
                    <div class="ui-content">

                      <div class="ui-text-block">

                        <div class="ui-title" :style="{ backgroundColor: theme.colors[3] }"></div>

                        <div class="ui-subtitle" :style="{ backgroundColor: theme.colors[1], opacity: 0.6 }"></div>

                      </div>

                      <div class="ui-progress" :style="{ backgroundColor: theme.colors[5] }">

                        <div class="ui-progress-fill" :style="{ backgroundColor: theme.colors[0] }"></div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
               <!-- 主题信息 -->
              <div class="theme-info">
                 <span class="theme-name">{{ theme.label }}</span
                > <!-- <div class="theme-scheme-badge" :class="theme.scheme">
                   {{ theme.scheme === 'dark' ? '深色' : '浅色' }}
                </div> -->
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
import { themeConfigOptions, themeConfigDataRecord, type ThemeConfigData } from '../config/theme-data';

const { isDark } = useData();

interface Theme {
  value: string;
  label: string;
  scheme: string;
  colors: string[];
  variables: ThemeConfigData['variables'];
}

const themes: Theme[] = themeConfigOptions
  .map((opt) => {
    const item = themeConfigDataRecord[opt.value];
    if (!item) return;
    return {
      value: opt.value,
      label: opt.label,
      scheme: item.variables['color-scheme'] || 'light',
      colors: [
        item.variables['--color-primary'] || '#3b82f6',
        item.variables['--color-secondary'] || '#64748b',
        item.variables['--color-accent'] || '#06b6d4',
        item.variables['--color-neutral'] || '#374151',
        item.variables['--color-base-100'] || '#ffffff',
        item.variables['--color-base-200'] || '#f8fafc',
      ],
      variables: item.variables,
    };
  })
  .filter(Boolean);

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
  const darkThemes = themes.filter((data) => data.variables['color-scheme'] === 'dark').map((data) => data.value);
  if (darkThemes.includes(theme)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // 同步iframe
  document.querySelectorAll('iframe').forEach((el) => {
    const contentWindow = el.contentWindow;
    if (!contentWindow) return;
    const doc = contentWindow.document.documentElement;
    if (doc.getAttribute('data-type') !== 'cmd') return;
    doc.style.setProperty('min-height', '100vh');
    doc.style.setProperty(
      'background-color',
      getComputedStyle(document.documentElement).getPropertyValue('--color-base-200') || 'transparent'
    );
    const cmdWindow = contentWindow.CmdWindowsManager?.cmdWindowsManager?.getCmdWindow?.();
    console.log(cmdWindow);
    if (!cmdWindow) return;
    cmdWindow.store.theme.setThemeByName(theme);
  });
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
  transition: var(--theme-transition);
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

.theme-toggle-btn:hover {
  background-color: var(--vp-c-bg-soft);
}

.theme-toggle-btn:active {
  transform: scale(0.95);
  transition: all 0.1s ease;
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

.theme-toggle-btn:hover .theme-icon {
  color: var(--vp-c-brand);
}
.theme-toggle-btn:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
}


/* 主题下拉容器 */
.theme-dropdown {
  position: relative;
  transition: var(--theme-transition);
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
  width: 360px;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px) scale(0.95);
}

.theme-dropdown:hover .theme-menu-warp {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.theme-menu {
  background-color: var(--vp-c-bg);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 0 16px 16px;
  transition: var(--theme-transition);
  scrollbar-width: thin;
  max-height: 480px;
  overflow-y: auto;
  border: 1px solid var(--vp-c-divider-light);
  backdrop-filter: blur(10px);
  transition: var(--theme-transition);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

/* 自定义滚动条样式 */
.theme-menu::-webkit-scrollbar {
  width: 6px;
}

.theme-menu::-webkit-scrollbar-track {
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
}

.theme-menu::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 3px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-menu::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-brand);
}

/* 菜单头部 */
.menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  transition: var(--theme-transition);
}

.menu-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
  transition: var(--theme-transition);
}

.current-theme-badge {
  font-size: 12px;
  color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft);
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
  transition: var(--theme-transition);
}

.current-theme-badge:hover {
  background-color: var(--vp-c-brand-light);
  color: white;
}

/* 主题网格 */
.themes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  transition: var(--theme-transition);
}

/* 主题选项 */
.theme-option {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: var(--theme-transition);
  border: 2px solid transparent;
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease-out forwards;
}

.theme-option:nth-child(1) { animation-delay: 0.1s; }
.theme-option:nth-child(2) { animation-delay: 0.2s; }
.theme-option:nth-child(3) { animation-delay: 0.3s; }
.theme-option:nth-child(4) { animation-delay: 0.4s; }
.theme-option:nth-child(5) { animation-delay: 0.5s; }
.theme-option:nth-child(6) { animation-delay: 0.6s; }
.theme-option:nth-child(7) { animation-delay: 0.7s; }
.theme-option:nth-child(8) { animation-delay: 0.8s; }
.theme-option:nth-child(9) { animation-delay: 0.9s; }

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.theme-option:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-divider);
}

.theme-option:active {
  transform: translateY(-1px) scale(0.98);
  transition: all 0.1s ease;
}

.theme-active {
  border-color: var(--vp-c-brand);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.theme-active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--vp-c-brand-light) 0%, transparent 50%);
  opacity: 0;
  pointer-events: none;
  z-index: 1;
  transition: var(--theme-transition);
  animation: brandGlow 0.5s ease-out forwards;
}

@keyframes brandGlow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.05;
  }
}

/* 主题预览 */
.theme-preview {
  width: 100%;
  height: 52px;
  overflow: hidden;
  position: relative;
  border-radius: 8px 8px 0 0;
  transition: var(--theme-transition);
}

.theme-option:hover .theme-preview {
  transform: scale(1.02);
}

.preview-colors {
  display: flex;
  height: 24px;
}

.color-stripe {
  flex: 1;
  height: 100%;
  position: relative;
  transition: var(--theme-transition);
}

.color-stripe:first-child {
  border-radius: 8px 0 0 0;
}

.color-stripe:last-child {
  border-radius: 0 8px 0 0;
}

.theme-option:hover .color-stripe {
  transform: scaleY(1.1);
}

/* 模拟UI元素 */
.preview-ui {
  padding: 3px;
  height: 28px;
  display: flex;
  align-items: center;
  border-radius: 0 0 6px 6px;
  transition: var(--theme-transition);
}

.ui-mock-layout {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  height: 100%;
  transition: var(--theme-transition);
}

.theme-option:hover .ui-mock-layout {
  transform: scale(1.05);
}

.ui-buttons {
  display: flex;
  gap: 2px;
  align-items: center;
}

.ui-btn {
  width: 8px;
  height: 4px;
  border-radius: 1px;
  opacity: 0.9;
  transition: var(--theme-transition);
}

.theme-option:hover .ui-btn {
  transform: scale(1.1);
  opacity: 1;
}

.ui-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
  justify-content: center;
}

.ui-text-block {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.ui-title {
  height: 2px;
  width: 70%;
  border-radius: 1px;
  opacity: 0.8;
  transition: var(--theme-transition);
}

.theme-option:hover .ui-title {
  width: 80%;
  opacity: 1;
}

.ui-subtitle {
  height: 1.5px;
  width: 50%;
  border-radius: 1px;
  transition: var(--theme-transition);
}

.theme-option:hover .ui-subtitle {
  width: 60%;
  opacity: 0.8;
}

.ui-progress {
  height: 2px;
  width: 80%;
  border-radius: 1px;
  position: relative;
  opacity: 0.3;
  transition: var(--theme-transition);
}

.theme-option:hover .ui-progress {
  opacity: 0.5;
}

.ui-progress-fill {
  height: 100%;
  width: 60%;
  border-radius: 1px;
  opacity: 1;
  transition: var(--theme-transition);
}

.theme-option:hover .ui-progress-fill {
  width: 75%;
}

/* 主题信息 */
.theme-info {
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider-light);
  position: relative;
  z-index: 2;
  transition: var(--theme-transition);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.theme-option:hover .theme-info {
  background-color: var(--vp-c-bg-soft);
}

.theme-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
  line-height: 1.2;
  transition: var(--theme-transition);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.theme-option:hover .theme-name {
  color: var(--vp-c-brand);
  transform: translateX(2px);
}

.theme-scheme-badge {
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid var(--vp-c-divider-light);
  transition: var(--theme-transition);
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
}
.theme-option:hover .theme-scheme-badge {
  transform: scale(1.05);
}
.theme-scheme-badge.light {
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider-light);
}
.theme-scheme-badge.dark {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
}
.theme-scheme-badge.auto {
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
}

/* 选中状态指示器 */
.selected-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 22px;
  height: 22px;
  background: linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-dark) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 3px var(--vp-c-bg), 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 10;
  transition: var(--theme-transition);
  animation: fadeInScale 0.25s ease-out;
}

@keyframes fadeInScale {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

.selected-indicator svg {
  width: 12px;
  height: 12px;
  color: white;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}



/* 响应式设计 */
@media (max-width: 768px) {
  .theme-menu {
    width: 320px;
    max-height: 75vh;
    border-radius: 16px;
  }

  .themes-grid {
    gap: 12px;
    grid-template-columns: repeat(2, 1fr);
  }

  .theme-option {
    border-radius: 12px;
  }

  .theme-preview {
    height: 56px;
    border-radius: 10px 10px 0 0;
  }

  .preview-colors {
    height: 28px;
  }

  .preview-ui {
    height: 28px;
    padding: 4px;
  }

  .theme-info {
    padding: 12px;
  }

  .theme-name {
    font-size: 12px;
    font-weight: 600;
  }

  .theme-scheme {
    font-size: 9px;
    padding: 2px 6px;
  }

  .selected-indicator {
    width: 20px;
    height: 20px;
    top: 6px;
    right: 6px;
  }

  .selected-indicator svg {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 480px) {
  .theme-menu {
    width: 300px;
    padding: 0 12px 12px;
  }

  .themes-grid {
    gap: 10px;
  }
}

  .theme-preview {
    height: 50px;
  }

  .preview-colors {
    height: 24px;
  }

  .preview-ui {
    height: 26px;
  }

  .theme-name {
    font-size: 11px;
  }

  .theme-scheme {
    font-size: 8px;
    padding: 2px 5px;
  }
</style>

