<script lang="ts" module>
  export interface CmdMainProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { onDestroy, tick } from 'svelte';
  import { ETokenType } from '@istock/command-parser';
  import { ShVirtualList, shShowMessage, type VirtualCoreRange } from '@istock/shell-ui';
  import { COPY, type TContextmenuPosition } from '@/store/cmd/cmd-contextmenu';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import CmdPrompt from '../prompt/CmdPrompt.svelte';
  import CmdContextmenu from './CmdContextmenu.svelte';
  import { registerOutputViewComponents } from './component-map';
  import { handleBlockContextmenuFactory } from './block-contextmenu';

  const { windowId }: CmdMainProps = $props();

  const ctx = CmdWindowsManager.getInstance().getCmdContext(windowId);

  let mainElement: HTMLDivElement | null | undefined = $state();

  const { cmdOutput, cmdContextmenu, outputViewComponentMap } = ctx.cmdStore;

  let virtualList: ShVirtualList;
  let range: VirtualCoreRange | undefined = $state();

  const getCmdInputTokens = (input: string) => {
    const tokens = ctx.cmdParser.tokenizer.parse(input);
    const lastTokens = tokens[tokens.length - 1];
    if (lastTokens && [ETokenType.lineN, ETokenType.lineR].includes(lastTokens.type)) {
      tokens.pop();
    }
    return tokens;
  };

  // 注册所有命令输出动态组件
  registerOutputViewComponents(outputViewComponentMap);
  let componentMap = $state(new Map());
  if (outputViewComponentMap.getMap) {
    componentMap = outputViewComponentMap.getMap();
  }

  // 右键菜单全局位置
  let position: TContextmenuPosition = $state({
    window: { width: 0, height: 0 },
    offset: { x: -1, y: -1 },
  });
  const handleBlockContextmenu = handleBlockContextmenuFactory(ctx, windowId, (data) => {
    position = { ...position, ...data };
  });

  // 命令输出有变动时滚动到最底部
  const scrollEnd = async () => {
    if (virtualList) {
      await tick();
      // 演示模式不需要滚动到底部
      if (ctx.isExample) return;
      // 需要考虑开发时重新编译报错
      virtualList.scrollToLastChild();
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const unSubscribeScroll = cmdOutput.subscribe(scrollEnd);

  const onSectionKeydown = (ev) => {
    if (ctx.isExample) return;
    const currentIndex = handleBlockContextmenu.getCurrentIndex();
    if (currentIndex === -1) return;
    const currentBlock = $cmdOutput.list[currentIndex];
    if (currentBlock) {
      void handleBlockContextmenu.handleMenuShortcutKey(ev, currentBlock);
    }
  };

  const onSubmit = (messageId: string, payload: any) => {
    ctx.sendMessageToChannel(messageId, payload);
  };

  document.addEventListener('keydown', onSectionKeydown);
  onDestroy(() => {
    document.removeEventListener('keydown', onSectionKeydown);
    unSubscribeScroll();
  });
</script>

<div class="h-full" bind:this={mainElement}>
  <CmdContextmenu
    contextmenu={$cmdContextmenu}
    {position}
    onMenuClick={async (menu) => {
      await handleBlockContextmenu.handleMenuClick(menu, $cmdOutput.list);
      if ([COPY.all, COPY.input, COPY.output, COPY.prompt, COPY.link].includes(menu.action)) {
        await shShowMessage.success('操作成功');
      }
    }}
    onMouseStatus={handleBlockContextmenu.handleMouseStatus}
  />
  <ShVirtualList
    class="h-full"
    bind:this={virtualList}
    list={$cmdOutput.list}
    onRangeChange={(newRange) => (range = newRange)}
  >
    {#each $cmdOutput.list.slice(range?.start, range?.end + 1) as block, index (block.id)}
      <section
        tabindex="0"
        class="p-2 rounded-sm border-b border-base-300/20 -outline-offset-1 outline-base-300 hover:bg-base-200 active:bg-base-200 focus-visible:outline-2 transition-colors"
        oncontextmenu={(ev) => {
          if (ctx.isExample) return;
          handleBlockContextmenu.handleOpenBlockContextmenu(ev);
        }}
        onmouseenter={(ev) => {
          if (ctx.isExample) return;
          handleBlockContextmenu.handleBlockMouseEnter(ev, index);
        }}
        onmouseleave={(ev) => {
          if (ctx.isExample) return;
          handleBlockContextmenu.handleMouseleave(ev, index);
        }}
        onclick={(ev) => {
          if (ctx.isExample) return;
          handleBlockContextmenu.handleOnClick(ev);
        }}
      >
        <div class="mb-1 flex items-start">
          <!-- 提示符 -->
          <CmdPrompt texts={block.promptTexts} />
          <!-- 命令输入 -->
          <div class="font-mono text-sm flex-auto break-all">
            {#each getCmdInputTokens(block.input) as token, tIndex (tIndex)}
              {#if [ETokenType.lineN, ETokenType.lineR].includes(token.type)}
                <br />
              {:else}
                <span class="is-{token.type}">{token.value}</span>
              {/if}
            {/each}
          </div>
        </div>
        <!-- 命令输出 -->
        {#if block.output.length > 0}
          <div class="overflow-x-auto">
            {#each block.output as output, oIndex (oIndex)}
              {@const SvelteComponent = componentMap.get(output.component) || componentMap.get('ShEmpty')}
              <SvelteComponent
                {...output.props}
                source={block.source}
                {windowId}
                onsumit={(event) => {
                  onSubmit(output.messageId, event?.detail);
                }}
              />
            {/each}
          </div>
        {/if}
      </section>
    {/each}
  </ShVirtualList>
</div>

<style>
  @reference "@istock/shell-ui/src/style/daisyui.css";
  :global(.is-command) {
    @apply text-primary;
  }
  :global(.is-command-text) {
    @apply font-semibold text-primary;
  }
  :global(.is-option) {
    @apply text-secondary;
  }
  :global(.is-parameter) {
    @apply text-accent;
  }
</style>
