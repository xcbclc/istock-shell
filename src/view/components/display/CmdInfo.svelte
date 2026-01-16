<script lang="ts" module>
  export interface CmdInfoProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { CmdWindowsManager } from '@/window';
  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow();
  const { shellInfo } = cmdWindow.store;
  const { projectInfo } = shellInfo.data;
</script>

<section class="card">
  <div class="card-body p-4">
    <h1 class="card-title justify-center text-xl text-primary flex-1">
      {#if projectInfo.title === 'iStock Shell'}
        <pre class="text-sm font-mono p-2 rounded-md">{shellInfo.data.asciiTitle}</pre>
      {:else}
        {projectInfo.title}
      {/if}
      <div class="badge badge-primary">
        v{projectInfo.version}
      </div>
    </h1>

    <div class="divider text-sm text-base-content/80">免责声明</div>

    <div class="prose prose-sm max-w-none">
      <div class="bg-base-200 p-3 rounded-md text-base-content/80">
        {#each (shellInfo.data.disclaimer || '').split('\n') as str}
          <p class="my-1">{str}</p>
        {/each}
      </div>
    </div>
  </div>
</section>
