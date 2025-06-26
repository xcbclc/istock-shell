import type { SvelteComponent } from 'svelte';
import type { OutputComponent } from '@/store';
import * as ShellUi from '@istock-shell/ui';
import CmdOutputDoc from './CmdOutputDoc.svelte';
import CmdOutputDocTable from './CmdOutputDocTable.svelte';
import CmdOutputEvent from './CmdOutputEvent.svelte';

export const registerOutputViewComponents = (outputComponent: OutputComponent) => {
  Object.entries(ShellUi as unknown as Record<string, SvelteComponent>).forEach(([name, component]) => {
    outputComponent.registerComponent(name, component);
  });
  outputComponent.registerComponent('CmdOutputDocTable', CmdOutputDocTable as unknown as SvelteComponent);
  outputComponent.registerComponent('CmdOutputDoc', CmdOutputDoc as unknown as SvelteComponent);
  outputComponent.registerComponent('CmdOutputEvent', CmdOutputEvent as unknown as SvelteComponent);
};
