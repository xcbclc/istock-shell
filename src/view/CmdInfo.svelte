<script lang="ts" module>
  export interface CmdInfoProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';

  const { windowId }: CmdInfoProps = $props();

  const ctx = CmdWindowsManager.getInstance().getCmdContext(windowId);
  const { cmdInfo } = ctx.cmdStore;
</script>

<section class="card">
  <div class="card-body p-4">
    <h1 class="card-title justify-center text-xl text-primary flex-1">
      {#if $cmdInfo.title === 'iStock Shell'}
        <pre class="text-sm font-mono p-2 rounded-md">{$cmdInfo.asciiTitle}</pre>
      {:else}
        {$cmdInfo.title}
      {/if}
      <div class="badge badge-primary">
        v{$cmdInfo.version}
      </div>
    </h1>

    <div class="divider">免责声明</div>

    <div class="prose prose-sm max-w-none">
      <div class="bg-base-200 p-3 rounded-md">
        {#each ($cmdInfo.disclaimer || '').split('\n') as str}
          <p class="text-base-content my-1">{str}</p>
        {/each}
      </div>
    </div>
  </div>
</section>
