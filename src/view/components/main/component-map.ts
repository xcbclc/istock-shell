import type { SvelteComponent } from 'svelte';
import type { IOutputViewComponentMapWritable } from '@/store/cmd/cmd-output-component';
import * as ShellUi from '@istock/shell-ui';
import OutputDoc from '../output/OutputDoc.svelte';
import OutputEvent from '../output/OutputEvent.svelte';

export const registerOutputViewComponents = (outputComponentStore: IOutputViewComponentMapWritable) => {
  Object.entries(ShellUi as unknown as Record<string, SvelteComponent>).forEach(([name, component]) => {
    outputComponentStore.registerComponent(name, component);
  });
  outputComponentStore.registerComponent('OutputDoc', OutputDoc as unknown as SvelteComponent);
  outputComponentStore.registerComponent('OutputEvent', OutputEvent as unknown as SvelteComponent);
};
