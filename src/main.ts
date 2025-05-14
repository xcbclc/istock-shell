import '@istock/shell-ui/src/index.css';
import './style/main.css';
import App from './App.svelte';
import { mount } from 'svelte';

let app;
const appEl = document.getElementById('app');
if (appEl) {
  app = mount(App, {
    target: appEl,
  });
}
export default app;
