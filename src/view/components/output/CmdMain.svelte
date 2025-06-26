<script lang="ts" module>
  export interface CmdMainProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { onDestroy, tick } from 'svelte';
  import { TokenType } from '@istock-shell/command-parser';
  import { ShVirtualList, shShowMessage, type VirtualCoreRange } from '@istock-shell/ui';
  import { CmdWindowsManager } from '@/window';
  import { ContextmenuStoreCopy } from '@/store';
  import CmdPrompt from '../display/CmdPrompt.svelte';
  import CmdContextmenu from './contextmenu/CmdContextmenu.svelte';
  import { registerOutputViewComponents } from './output-components/component-map';
  import { handleBlockContextmenuFactory } from './contextmenu/block-contextmenu';

  const { windowId }: CmdMainProps = $props();

  const ctx = CmdWindowsManager.cmdWindowsManager.getCmdContext(windowId);

  const { output, contextmenu } = ctx.store;
  const { outputComponent } = ctx.cmdWindow.store;

  let virtualList: typeof ShVirtualList;
  let range: VirtualCoreRange | undefined = $state();

  const getCmdInputTokens = (input: string) => {
    const tokens = ctx.cmdWindow.cmdParser.tokenizer.parse(input);
    const lasTokens = tokens[tokens.length - 1];
    if (lasTokens && [TokenType.lineN, TokenType.lineR].includes(lasTokens.type)) {
      tokens.pop();
    }
    return tokens;
  };

  // 注册所有命令输出动态组件
  registerOutputViewComponents(outputComponent);

  // 右键菜单全局位置
  const handleBlockContextmenu = handleBlockContextmenuFactory(ctx, windowId, (data) => {
    contextmenu.position = Object.assign(contextmenu.position, data);
  });

  const getCmdElementId = (cmdId) => {
    return ['cmd', windowId, cmdId].join('-');
  };

  // 命令输出有变动时滚动到最底部
  const onScrollEnd = async () => {
    if (virtualList) {
      await tick();
      // 演示模式不需要滚动到底部
      if (ctx.cmdWindow.isDemoMode) return;
      // 需要考虑开发时重新编译报错
      if (output.list.length > 0) {
        const lastBlock = output.list[output.list.length - 1];
        virtualList.scrollToElement(`#${getCmdElementId(lastBlock.id)}`);
      } else {
        virtualList.scrollToLastChild();
      }
    }
  };

  $effect(() => {
    if (output.list.length) {
      onScrollEnd();
    }
  });
  const onSectionKeydown = (ev) => {
    if (ctx.cmdWindow.isDemoMode) return;
    const currentIndex = handleBlockContextmenu.getCurrentIndex();
    if (currentIndex === -1) return;
    const currentBlock = output.list[currentIndex];
    if (currentBlock) {
      void handleBlockContextmenu.handleMenuShortcutKey(ev, currentBlock);
    }
  };

  const onSubmit = (messageId: string, payload: any) => {
    ctx.message.sendMessageToChannel(messageId, payload);
  };

  document.addEventListener('keydown', onSectionKeydown);
  onDestroy(() => {
    document.removeEventListener('keydown', onSectionKeydown);
  });
</script>

<div class="h-full">
  <CmdContextmenu
    list={contextmenu.list}
    position={contextmenu.position}
    onMenuClick={async (menu) => {
      await handleBlockContextmenu.handleMenuClick(menu, output.list);
      if (
        [
          ContextmenuStoreCopy.all,
          ContextmenuStoreCopy.input,
          ContextmenuStoreCopy.output,
          ContextmenuStoreCopy.prompt,
          ContextmenuStoreCopy.link,
        ].includes(menu.action)
      ) {
        await shShowMessage.success('操作成功');
      }
    }}
    onMouseStatus={handleBlockContextmenu.handleMouseStatus}
  />
  <ShVirtualList
    class="h-full"
    bind:this={virtualList}
    list={output.list}
    onRangeChange={(newRange) => (range = newRange)}
  >
    {#each output.list.slice(range?.start, range?.end + 1) as block, index (block.id)}
      <section
        id={['cmd', windowId, block.id].join('-')}
        data-id={getCmdElementId(block.id)}
        tabindex="0"
        class="p-2 rounded-sm border-b border-base-300/20 -outline-offset-1 outline-base-300 hover:bg-base-200 active:bg-base-200 focus-visible:outline-2 transition-colors"
        oncontextmenu={(ev) => {
          if (ctx.cmdWindow.isDemoMode) return;
          handleBlockContextmenu.handleOpenBlockContextmenu(ev);
        }}
        onmouseenter={(ev) => {
          if (ctx.cmdWindow.isDemoMode) return;
          handleBlockContextmenu.handleBlockMouseEnter(ev, index);
        }}
        onmouseleave={(ev) => {
          if (ctx.cmdWindow.isDemoMode) return;
          handleBlockContextmenu.handleMouseleave(ev, index);
        }}
        onclick={(ev) => {
          if (ctx.cmdWindow.isDemoMode) return;
          handleBlockContextmenu.handleOnClick(ev);
        }}
      >
        <div class="mb-1 flex items-start">
          <!-- 提示符 -->
          <CmdPrompt texts={block.promptTexts} />
          <!-- 命令输入 -->
          <div class="font-mono text-sm flex-auto break-all">
            {#each getCmdInputTokens(block.input) as token, tIndex (tIndex)}
              {#if [TokenType.lineN, TokenType.lineR].includes(token.type)}
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
              {@const SvelteComponent =
                outputComponent.getComponentByName(output.component) ||
                outputComponent.getComponentByNam.get('ShEmpty')}
              <SvelteComponent
                {...output.props}
                source={block.source}
                {windowId}
                onSubmit={(detail) => {
                  onSubmit(output.messageId, detail);
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
  @reference "@istock-shell/ui/style";
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
