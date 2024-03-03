import type { SvelteComponent } from 'svelte';
import { type Readable, readable, get } from 'svelte/store';
import type { CmdWindowContext } from '@/window/cmd-window-context';

export type TOutputViewComponentMap = Map<string, SvelteComponent>;
export interface IOutputViewComponentMapWritable extends Readable<TOutputViewComponentMap> {
  // 注册组件
  registerComponent: (name: string, component: SvelteComponent) => void;
  // 获取组件map数据
  getMap: () => TOutputViewComponentMap;
}

export const getOutputViewComponentMap = (_ctx: CmdWindowContext) => {
  const outputViewComponent: IOutputViewComponentMapWritable = Object.create(
    readable<TOutputViewComponentMap>(new Map())
  );
  outputViewComponent.registerComponent = (name, component) => {
    const componentMap = get(outputViewComponent);
    if (componentMap.get(name)) return;
    componentMap.set(name, component);
  };
  outputViewComponent.getMap = () => get(outputViewComponent);
  return outputViewComponent;
};
