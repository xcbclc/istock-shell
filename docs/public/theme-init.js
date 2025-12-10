// 主题初始化脚本 - 在页面加载前立即执行，避免主题闪烁
(function () {
  // 从localStorage获取保存的主题
  const savedTheme = localStorage.getItem('daisyui-theme');

  // daisyUI支持的所有主题
  const supportedThemes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
  ];

  // 暗色主题列表
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
  ];

  let theme;

  if (savedTheme && supportedThemes.includes(savedTheme)) {
    theme = savedTheme;
  } else {
    // 设置默认主题为business
    theme = 'business';
  }

  // 立即应用主题
  document.documentElement.setAttribute('data-theme', theme);

  // 同步VitePress的暗色模式类
  if (darkThemes.includes(theme)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();
