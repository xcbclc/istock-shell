import '@/style/main.scss';
import App from './App.svelte';
if (import.meta.env.VITE_MOYU === 'true') {
  import('@/style/theme/moyu.scss');
}

let app;
const appEl = document.getElementById('app');
if (appEl) {
  app = new App({
    target: appEl,
  });
}
export default app;
