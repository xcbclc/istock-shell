import '@istock/shell-ui/src/index.scss';
import App from './App.svelte';
import { mount } from 'svelte';

if (import.meta.env.VITE_MOYU === 'true') {
  import('@istock/shell-ui/src/style/theme/moyu.scss');
}

let app;
const appEl = document.getElementById('app');
if (appEl) {
  app = mount(App, {
    target: appEl,
  });
}
export default app;
