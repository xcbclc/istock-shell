import '@istock-shell/ui/src/index.css';
import 'daisyui/themes.css';
import './style/main.css';
import { mount } from 'svelte';
import App from './App.svelte';

let app;
const appEl = document.getElementById('app');
if (appEl) {
  app = mount(App, {
    target: appEl,
  });
}
export default app;
