<script lang="ts">
  import { onDestroy, onMount, tick } from 'svelte';
  import { ETokenType } from '@istock/command-parser';
  import type { TContextmenuPosition } from '@/store/cmd/cmd-contextmenu';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import CmdPrompt from '../prompt/CmdPrompt.svelte';
  import CmdContextmenu from './CmdContextmenu.svelte';
  import { registerOutputViewComponents } from './component-map';
  import { handleBlockContextmenuFactory } from './block-contextmenu';

  export let windowId: number;

  const ctx = CmdWindowsManager.getInstance().getCmdContext(windowId);

  let mainElement: HTMLDivElement | null;
  // let contextmenuElement: HTMLElement | null;

  const { cmdOutput, cmdContextmenu, outputViewComponentMap } = ctx.cmdStore;

  const wrapOutputList = (list: any[]) => {
    return list.map((item) => {
      item.windowId = windowId;
      return item;
    });
  };

  const wrapOutputCmdInput = (input: string) => {
    const tokens = ctx.cmdParser.tokenizer.parse(input);
    const lastTokens = tokens[tokens.length - 1];
    if (lastTokens && [ETokenType.lineN, ETokenType.lineR].includes(lastTokens.type)) {
      tokens.pop();
    }
    return tokens;
  };

  // 注册所有命令输出动态组件
  registerOutputViewComponents(outputViewComponentMap);
  let componentMap = new Map();
  if (outputViewComponentMap.getMap) {
    componentMap = outputViewComponentMap.getMap();
  }

  // 右键菜单全局位置
  let position: TContextmenuPosition = {
    window: { width: 0, height: 0 },
    offset: { x: -1, y: -1 },
  };
  const handleBlockContextmenu = handleBlockContextmenuFactory(ctx, windowId, (data) => {
    position = { ...position, ...data };
  });

  // 命令输出有变动时滚动到最底部
  const scrollEnd = async () => {
    if (mainElement) {
      await tick();
      // 演示模式不需要滚动到底部
      if (ctx.isExample) return;
      // 需要考虑开发时重新编译报错
      mainElement?.lastChild?.scrollIntoView?.(false);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const unSubscribeScroll = cmdOutput.subscribe(scrollEnd);

  // 性能优化
  let observer: IntersectionObserver | null;

  const updateObserve = async () => {
    if (mainElement) {
      observer && observer.disconnect();
      await tick();
      if (observer && mainElement?.children) {
        for (const el of mainElement.children) {
          observer.observe(el);
        }
      }
    }
  };
  const unSubscribe = cmdOutput.subscribe(() => {
    void updateObserve();
  });

  const onSubmit = (messageId: string, payload: any) => {
    ctx.sendMessageToChannel(messageId, payload);
  };

  onMount(() => {
    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((row) => {
          const { target } = row;
          // todo 换成数据响应驱动
          if (row.isIntersecting) {
            target.classList.remove('is-hidden');
          } else {
            if (!target.classList.contains('is-hidden')) {
              target.classList.add('is-hidden');
            }
          }
        });
      },
      {
        root: mainElement,
        rootMargin: '25% 0% 25% 0%',
      }
    );
    void updateObserve();
  });

  onDestroy(() => {
    observer && observer.disconnect();
    unSubscribeScroll();
    unSubscribe();
  });
</script>

<div class="cmd-main" bind:this={mainElement}>
  <CmdContextmenu
    contextmenu={$cmdContextmenu}
    {position}
    on:menuClick={async (ev) => {
      await handleBlockContextmenu.handleMenuClick(ev, $cmdOutput.list);
    }}
    on:mouseStatus={handleBlockContextmenu.handleMouseStatus}
  />
  {#each wrapOutputList($cmdOutput.list) as block, index (index)}
    <section
      class="cmd-block is-hidden"
      on:keydown={async (ev) => {
        if (ctx.isExample) return;
        await handleBlockContextmenu.handleMenuShortcutKey(ev, block);
      }}
      on:contextmenu={(ev) => {
        if (ctx.isExample) return;
        handleBlockContextmenu.handleOpenBlockContextmenu(ev);
      }}
      on:mouseenter={(ev) => {
        if (ctx.isExample) return;
        handleBlockContextmenu.handleBlockMouseEnter(ev, index);
      }}
      on:click={(ev) => {
        if (ctx.isExample) return;
        handleBlockContextmenu.handleOnClick(ev);
      }}
    >
      <div class="cmd-block-header">
        <div class="title">
          <CmdPrompt texts={block.promptTexts} />
        </div>
        <div class="input">
          {#each wrapOutputCmdInput(block.input) as token, tIndex (tIndex)}
            {#if [ETokenType.lineN, ETokenType.lineR].includes(token.type)}
              <br />
            {:else}
              <span class="is-{token.type}">{token.value}</span>
            {/if}
          {/each}
        </div>
      </div>
      <div class="cmd-block-output">
        {#each block.output as output, oIndex (oIndex)}
          <svelte:component
            this={componentMap.get(output.component) || componentMap.get('ViewNotFound')}
            source={block.source}
            windowId={block.windowId}
            on:submit={(event) => {
              onSubmit(output.messageId, event?.detail);
            }}
            {...output.props}
          />
        {/each}
      </div>
    </section>
  {/each}
</div>

<style lang="scss">
  :root {
    --block-gap: var(--gap-default);
    --block-border-color: var(--color-sub-background);
    --block-focus-background-color: var(--color-background-lighter);
  }
  .cmd-main {
    flex: auto;
    overflow-y: auto;
    scroll-behavior: smooth;
  }
  .cmd-block {
    padding: var(--block-gap);
    border-bottom: 1px solid var(--block-border-color);
    will-change: opacity;
    transform: translateZ(0);
    backface-visibility: hidden;
    &.is-hidden {
      visibility: hidden;
      opacity: 0;
    }
    &:hover {
      outline: none;
      background-color: var(--block-focus-background-color);
      transition: background-color var(--transition-duration);
    }
  }
  .cmd-block-header {
    .title,
    .input {
      display: inline;
    }
    .input {
      word-break: break-all;
      color: var(--color-primary);
      .is-command {
        font-weight: var(--font-weight);
        color: var(--color-text-command);
      }
      .is-optionKey {
        color: var(--color-text-option);
      }
      .is-parameter {
        color: var(--color-text-parameter);
      }
    }
  }
  .cmd-block-output {
    padding: 0 0.5em;
  }
</style>
