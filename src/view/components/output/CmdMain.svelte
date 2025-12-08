<script lang="ts" module>
  export interface CmdMainProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { TokenType } from '@istock-shell/command-parser';
  import { shShowMessage } from '@istock-shell/ui';
  import { CmdWindowsManager } from '@/window';
  import { ContextmenuStoreCopy } from '@/store';
  import CmdPrompt from '../display/CmdPrompt.svelte';
  import CmdContextmenu from './contextmenu/CmdContextmenu.svelte';
  import CmdMainComponent from './CmdMainComponent.svelte';
  import { registerOutputViewComponents } from './output-components/component-map';
  import { contextmenuHandleFactory } from './contextmenu/contextmenu-handle';

  const { windowId }: CmdMainProps = $props();

  const ctx = CmdWindowsManager.cmdWindowsManager.getCmdContext(windowId);

  const { output, contextmenu } = ctx.store;
  const { outputComponent } = ctx.cmdWindow.store;
  let contentLoadedCount: number = $state(0);
  let contentLoaded: boolean = $state(false);
  let cancelScrollId: number | null = null;
  let scrollContainer: HTMLDivElement;
  let canScrollEnd: boolean = true;
  // 右键菜单全局位置
  const handleBlockContextmenu = contextmenuHandleFactory(ctx);
  // 注册所有命令输出动态组件
  registerOutputViewComponents(outputComponent);

  const getCmdElementId = (cmdId: string) => {
    return ['cmd', windowId, cmdId].join('-');
  };

  const getCmdInputTokens = (input: string) => {
    const tokens = ctx.cmdWindow.cmdParser.tokenizer.parse(input);
    const lasTokens = tokens[tokens.length - 1];
    if (lasTokens && [TokenType.lineN, TokenType.lineR].includes(lasTokens.type)) {
      tokens.pop();
    }
    return tokens;
  };

  const formatMention = (value: string) => {
    const index = value.indexOf(',');
    if (index !== -1 && value.endsWith(']')) {
      return '#' + value.slice(index + 1, -1);
    }
    return '#' + value;
  };

  const scrollEnd = (isInit: boolean = false) => {
    if (scrollContainer && canScrollEnd) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight + 100;
      cancelScrollId && clearTimeout(cancelScrollId);
      cancelScrollId = setTimeout(() => {
        scrollContainer?.lastElementChild?.scrollIntoView?.(false);
        scrollEnd(isInit);
      }, 10);
    }
  };

  const onMainMouseEnter = () => {
    canScrollEnd = false;
  };

  const onMainMouseLeave = async () => {
    canScrollEnd = true;
    handleBlockContextmenu.onMainMouseLeave();
  };

  const onContentLoaded = () => {
    contentLoadedCount++;
    if (contentLoadedCount === output.componentCount && !contentLoaded) {
      contentLoaded = true;
    }
  };

  $effect(() => {
    if ((output.count || output.last) && output.loading && !ctx.cmdWindow.isDemoMode && canScrollEnd) {
      scrollEnd();
    }
  });

  onMount(() => {
    document.addEventListener('keydown', handleBlockContextmenu.onMenuShortcutKey);
    if (!ctx.cmdWindow.isDemoMode) {
      scrollEnd(true);
    }
    return () => {
      document.removeEventListener('keydown', handleBlockContextmenu.onMenuShortcutKey);
      cancelScrollId && clearTimeout(cancelScrollId);
    };
  });
</script>

<div class="h-full relative">
  <div class="h-full relative" onmouseenter={onMainMouseEnter} onmouseleave={onMainMouseLeave}>
    {#if contextmenu.show}
      <CmdContextmenu
        list={contextmenu.list}
        position={contextmenu.position}
        onMouseStatus={handleBlockContextmenu.onContextmenuMouseStatus}
        onMenuClick={async (menu) => {
          await handleBlockContextmenu.onMenuClick(menu);
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
      />
    {/if}
    <div class="h-full overflow-y-auto" bind:this={scrollContainer}>
      {#each output.list as block, index (block.id)}
        <section
          id={getCmdElementId(block.id)}
          data-id={getCmdElementId(block.id)}
          tabindex="0"
          onclick={(ev) => {
            handleBlockContextmenu.onSectionClick(ev, index);
          }}
          oncontextmenu={(ev) => {
            handleBlockContextmenu.onContextmenu(ev, index);
          }}
          onmouseenter={(ev) => {
            handleBlockContextmenu.onSectionMouseEnter(ev, index);
          }}
          onmouseleave={(ev) => {
            handleBlockContextmenu.onSectionMouseLeave(ev, index);
          }}
          class="p-2 rounded-sm border-b border-base-300/20 -outline-offset-1 outline-base-300 hover:bg-base-200 active:bg-base-200 focus-visible:outline-2 transition-colors"
        >
          <div class="mb-1 flex items-start">
            <!-- 提示符 -->
            <CmdPrompt texts={block.promptTexts} />
            <!-- 命令输入 -->
            <div class="command-container text-sm flex-auto break-all">
              {#each getCmdInputTokens(block.input) as token, tIndex (tIndex)}
                {#if [TokenType.lineN, TokenType.lineR].includes(token.type)}
                  <br />
                {:else if token.type === TokenType.mention}
                  <div class="is-{token.type}">
                    <span title={formatMention(token.value)}>{formatMention(token.value)}</span>
                  </div>
                {:else}
                  <span class="is-{token.type}">
                    {token.value}
                  </span>
                {/if}
              {/each}
            </div>
          </div>
          <!-- 命令输出 -->
          {#if block.output.length > 0}
            <div class="flex flex-col gap-4">
              {#each block.output as componentInfo, outputIndex (outputIndex)}
                <CmdMainComponent
                  outputId={block.id}
                  {componentInfo}
                  source={block.source}
                  {windowId}
                  initShow={index > output.count - 10}
                  {onContentLoaded}
                />
              {/each}
            </div>
          {/if}
        </section>
      {/each}
    </div>
  </div>
  {#if !contentLoaded}
    <div class="flex align-middle justify-center absolute top-0 left-0 w-full h-full z-10 bg-base-200/50"></div>
  {/if}
</div>
