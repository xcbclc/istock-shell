import type { SvelteComponent } from 'svelte';
import type { IOutputViewComponentMapWritable } from '@/store/cmd/cmd-output-component';
import * as ShellUi from '@istock/shell-ui';
import CmdOutputDoc from '../output/CmdOutputDoc.svelte';
import CmdOutputEvent from '../output/CmdOutputEvent.svelte';

export const registerOutputViewComponents = (outputComponentStore: IOutputViewComponentMapWritable) => {
  Object.entries(ShellUi as unknown as Record<string, SvelteComponent>).forEach(([name, component]) => {
    outputComponentStore.registerComponent(name, component);
  });
  outputComponentStore.registerComponent('CmdOutputDoc', CmdOutputDoc as unknown as SvelteComponent);
  outputComponentStore.registerComponent('CmdOutputEvent', CmdOutputEvent as unknown as SvelteComponent);
};
