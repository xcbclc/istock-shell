import { get } from 'svelte/store';
import { toLocaleDateString, sleep } from '@istock/util';
import { ECommandEditorActionTypes, type CommandEditor } from '@istock/editor';
import type { TModelData } from '@istock/iswork';
import type { CmdWindowContext } from '@/window/cmd-window-context';
import type { HistoryModel } from '@domains/global/history/history.model';
import type { DomainModel } from '@domains/global/domain/domain.model';
import type { IPrompt, TPromptText } from './cmd/cmd-prompt';
import type { TCmdRoute } from './domains/global/cmd-route';
import type { TCmdInputNodes } from './cmd/cmd-input';
import { LOCAL_STORE_DOMAINS } from './cmd/cmd-prompt';

// 运行初始化逻辑
export async function initStore(ctx: CmdWindowContext) {
  const removeOnInputRecommendCmd = onInputRecommendCmd(ctx);
  const removeOnPromptTexts = onPromptTexts(ctx);
  const removeOnPromptDomainChange = onPromptDomainChange(ctx);
  await initCmdRouteList(ctx);
  await initOutputHistory(ctx);
  const removeOnShowCmdInfo = onShowCmdInfo(ctx);
  const removeOnOutputHistory = onOutputHistory(ctx);
  const removeOnSyncHistory = onSyncHistory(ctx);
  return () => {
    removeOnInputRecommendCmd();
    removeOnPromptTexts();
    removeOnPromptDomainChange();
    removeOnShowCmdInfo();
    removeOnOutputHistory();
    removeOnSyncHistory();
  };
}

// 展示首屏信息
function onShowCmdInfo(ctx: CmdWindowContext) {
  const { cmdOutput, showCmdInfo } = ctx.cmdStore;
  return cmdOutput.subscribe((data) => {
    const hasOutput = data?.list?.length;
    showCmdInfo.set(!hasOutput);
  });
}

// 输入命令推荐
function onInputRecommendCmd(ctx: CmdWindowContext) {
  const { cmdStore, domainStore } = ctx;
  const eventAddress = `event://@istock.ui:${ctx.windowId}/cmd.recommend`;
  // 推荐算法
  const handler = async (data: { action: ECommandEditorActionTypes; target: CommandEditor }) => {
    const { action, target } = data;
    let input = target.input;
    if ([ECommandEditorActionTypes.Up, ECommandEditorActionTypes.Down].includes(action)) {
      let inputNodes!: TCmdInputNodes;
      let { list, historyIndex } = get(cmdStore.cmdOutput);
      if (historyIndex === -1) {
        // 初始值
        historyIndex = list.length;
      }
      if (action === ECommandEditorActionTypes.Up) historyIndex--;
      if (action === ECommandEditorActionTypes.Down) historyIndex++;
      if (historyIndex >= list.length) {
        const { editInputNodes } = get(cmdStore.cmdInput);
        inputNodes = editInputNodes;
        historyIndex = list.length;
      }
      if (historyIndex < 0) {
        historyIndex = 0;
      }
      if (inputNodes === undefined) {
        const item = list[historyIndex];
        if (item) input = item.input;
      }
      if (input) {
        target.handleCommandInput(input, input);
        cmdStore.cmdOutput.update((data) => {
          data.historyIndex = historyIndex;
          return data;
        });
      }
    }
    if (action === ECommandEditorActionTypes.Auto) {
      await domainStore.inputRecommend.recommend(input);
    }
  };
  ctx.event.on(eventAddress, handler);
  return () => {
    ctx.event.off(eventAddress, handler);
  };
}

// 显示动态提示符
function onPromptTexts(ctx: CmdWindowContext) {
  const { cmdStore } = ctx;
  let timeoutId: number;

  // 根据提示符数据获取提示符文本
  const getPromptTexts = (data: IPrompt): TPromptText[] => {
    const domain = ['', data.app, ...data.domains.map((d) => d.viewName)];
    return [
      { text: toLocaleDateString(data.time, 'hh:mm:ss') || '', type: 'time' },
      { text: data.username, type: 'username' },
      { text: domain.join('/'), type: 'path' },
      { text: data.split, type: 'split' },
    ];
  };

  // 更新时间
  const promptInterval = () => {
    cmdStore.cmdPrompt.update((prompt) => {
      prompt.time = new Date();
      return prompt;
    });
    timeoutId = window.setTimeout(promptInterval, 1000);
  };
  promptInterval(); // 启动定时器

  // 当提示数据有更新，提示文本也更新
  const unSubscribe = cmdStore.cmdPrompt.subscribe((data) => {
    cmdStore.cmdPromptTexts.set(getPromptTexts(data));
  });

  // ctx.message
  // todo 获取真实数据时更新
  cmdStore.cmdPrompt.update((prompt) => {
    prompt.username = '访客';
    return prompt;
  });

  return () => {
    clearTimeout(timeoutId);
    unSubscribe();
  };
}

// 提示域改变处理
function onPromptDomainChange(ctx: CmdWindowContext) {
  const { cmdStore, domainStore, windowId } = ctx;
  const { username } = domainStore.user.getUserInfo();
  const eventAddress = `event://@${username}.global:${windowId}/domain.changePromptDomain`;
  const handlerChange = (data: Array<TModelData<DomainModel>>) => {
    cmdStore.cmdPrompt.update((prompt) => {
      data.shift(); // 去掉根目录
      prompt.domains = data.map((item) => ({ viewName: item.viewName, name: item.name }));
      sessionStorage.setItem(`${LOCAL_STORE_DOMAINS}_${ctx.windowId}`, JSON.stringify(prompt.domains));
      return prompt;
    });
  };
  ctx.event.on(eventAddress, handlerChange);
  return () => {
    ctx.event.off(eventAddress, handlerChange);
  };
}

// 从worker获取初始化路由数据
async function initCmdRouteList(ctx: CmdWindowContext) {
  const { domainStore, cmdParser } = ctx;
  const { payload } = await ctx.message.send<TCmdRoute[]>('global', 'cmdRoute.list', {});
  if (payload) {
    domainStore.cmdRoute.update((list) => {
      list.splice(list.length, 0, ...payload);
      return list;
    });
    get(domainStore.cmdRoute).forEach((data) => {
      cmdParser.addCommand({
        name: data.name, // 命令名称
        cmd: data.cmd, // 命令
        usage: data.usage, // 用法
        description: data.description, // 命令描述
        options: data.options, // 可选参数列表
        arguments: data.arguments,
        commands: data.subcommand,
      });
    });
  }
}

// 从worker获取初始化历史数据
async function initOutputHistory(ctx: CmdWindowContext) {
  const { domainStore } = ctx;
  const { payload } = await ctx.message.send<HistoryModel[]>('global', 'history.list', {});
  if (payload) {
    domainStore.outputHistory.set(payload);
  }
}

// 根据历史记录同步到命令输出列表中
function onOutputHistory(ctx: CmdWindowContext) {
  const { domainStore, cmdStore } = ctx;
  // 初始化历史数据
  return domainStore.outputHistory.subscribe((history) => {
    cmdStore.cmdOutput.update((data) => {
      data.list = history;
      return data;
    });
  });
}

// 同步更新历史记录
function onSyncHistory(ctx: CmdWindowContext) {
  const { domainStore, windowId } = ctx;
  const { username } = domainStore.user.getUserInfo();

  const eventAddress = `event://@${username}.global:${windowId}/history.batchDeleteCmd`;
  const handlerChange = async (success: boolean) => {
    if (success) {
      await sleep();
      const { domainStore } = ctx;
      const { payload } = await ctx.message.send<HistoryModel[]>('global', 'history.list', {});
      if (payload) {
        domainStore.outputHistory.set(payload);
      }
    }
  };
  ctx.event.on(eventAddress, handlerChange);
  return () => {
    ctx.event.off(eventAddress, handlerChange);
  };
}
