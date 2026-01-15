declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_ISTOCK_SHELL: string;
  readonly VITE_ISTOCK_SHELL_UI_COMPONENT_EDIT_URL: string;
}
interface Window {
  readonly CmdWindowsManager: {
    cmdWindowsManager: {
      getCmdContext: (windowId: number | string) => any;
    };
  };
}
