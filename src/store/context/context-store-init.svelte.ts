import type { CmdWindowContext } from '@/window';
import { Output } from './output/output.svelte';
import { CmdRoute } from './cmd-route.svelte';
import { Contextmenu } from './contextmenu.svelte';
import { History } from './history.svelte';
import { Input } from './input.svelte';
import { Prompt } from './prompt.svelte';
import { Recommend } from './recommend.svelte';

const contextStoreClassRecord = {
  output: Output,
  cmdRoute: CmdRoute,
  contextmenu: Contextmenu,
  history: History,
  input: Input,
  prompt: Prompt,
  recommend: Recommend,
} as const;

export type ContextStore = {
  output: Output;
  cmdRoute: CmdRoute;
  contextmenu: Contextmenu;
  history: History;
  input: Input;
  prompt: Prompt;
  recommend: Recommend;
};

export type ContextStoreKey = keyof ContextStore;

export const createContextStore = (context: CmdWindowContext): ContextStore => {
  const contextStore = (
    Object.entries(contextStoreClassRecord) as Array<[ContextStoreKey, new (context: CmdWindowContext) => any]>
  ).reduce(
    (store, [key, StoreClass]) => {
      store[key] = new StoreClass(context);
      return store;
    },
    {} as Record<ContextStoreKey, any>
  ) as ContextStore;
  return contextStore;
};

export const startContextStore = async (context: CmdWindowContext) => {
  const contextStore = context.store;
  await Promise.all([
    contextStore.input.start(),
    contextStore.output.start(),
    contextStore.history.start(),
    contextStore.prompt.start(),
    contextStore.cmdRoute.start(),
    contextStore.recommend.start(),
    contextStore.contextmenu.start(),
  ]);
};

export const onContextStoreHandle = (context: CmdWindowContext) => {
  const { port } = context;
  const { user } = context.cmdWindow.store;
  const { history, output, prompt } = context.store;
  const { username } = user.data;

  const eventHistoryBatchDelete = `event://@${username}.global:${port}/history.batchDeleteCmd`;
  const onBatchDeleteHistory = history.onBatchDeleteHistory.bind(history);
  context.message.on(eventHistoryBatchDelete, onBatchDeleteHistory);

  const eventOutputAiAddress = `event://@${username}.global:${port}/ai.send`;
  const onSendAiMessage = output.onSendAiMessage.bind(output);
  context.message.on(eventOutputAiAddress, onSendAiMessage);

  const evenPromptDomainChangeAddress = `event://@${username}.global:${port}/domain.changePromptDomain`;
  const onDomainChange = prompt.onDomainChange.bind(prompt);
  context.message.on(evenPromptDomainChangeAddress, onDomainChange);

  const evenUserCheckLoginAddress = `event://@anonymous.global:${port}/user.checkLogin`;
  const onCheckLogin = user.checkLogin.bind(user);
  context.message.on(evenUserCheckLoginAddress, onCheckLogin);

  return () => {
    context.message.off(eventHistoryBatchDelete, onBatchDeleteHistory);
    context.message.off(eventOutputAiAddress, onSendAiMessage);
    context.message.off(evenPromptDomainChangeAddress, onDomainChange);
    context.message.off(evenUserCheckLoginAddress, onCheckLogin);
  };
};
