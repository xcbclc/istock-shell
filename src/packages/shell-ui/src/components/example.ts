import { type Component, mount } from 'svelte';
import '../style/daisyui.css';

export type TExampleAppCode = {
  code: string;
  lang: 'svelte';
};

const appRecord: Record<string, () => Promise<Component>> = import.meta.glob<Component>(
  './**/example/*.svelte',
  {
    import: 'default',
    eager: false,
  }
);

const appCodeRecord: Record<string, () => Promise<string>> = import.meta.glob<string>(
  './**/example/*.svelte',
  {
    import: 'default',
    eager: false,
    query: '?raw',
  }
);

/**
 * 根据scr路径获取演示组件的源码
 * @param src
 */
export const getExampleAppCode = async (src: string): Promise<TExampleAppCode> => {
  const code = (await appCodeRecord[src]?.()) || '';
  return {
    code,
    lang: 'svelte',
  };
};

/**
 * 根据scr路径获取演示组件并挂载到指定元素上
 * @param id
 * @param src
 */
export const mountExampleApp = async (id: string, src: string): Promise<void> => {
  const component = await appRecord[src]?.();
  const target = document.getElementById(id);
  if (component && target) {
    mount(component, {
      target,
    });
  }
};
