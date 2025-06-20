import dayjs from 'dayjs';
import type { CmdWindowContext } from '@/window/cmd-window-context';
import { CmdWindowMode } from '@/window/cmd-window-context';
import { getQueryParam } from '@/packages/util';
import { StoreContext, createStoreEffects, type StoreConfig } from '@/store/base';

export interface PromptStoreDataText {
  text: string;
  type: string;
}

export interface PromptStoreDataDomain {
  name: string;
  viewName: string;
}

export interface PromptStoreData {
  time: Date;
  username: string;
  app: string;
  domains: PromptStoreDataDomain[];
  split: string;
}

export const LOCAL_STORE_DOMAINS = 'istock_local_store_domains';

export const getPromptTexts = (data?: PromptStoreData): PromptStoreDataText[] => {
  if (!data) return [];
  const domain = ['', data.app, ...data.domains.map((d) => d.viewName)];
  return [
    { text: dayjs(data.time).format('HH:mm:ss') || '', type: 'time' },
    { text: data.username, type: 'username' },
    { text: domain.join('/'), type: 'path' },
    { text: data.split, type: 'split' },
  ];
};

export class Prompt extends StoreContext<PromptStoreData> {
  readonly #promptToken: string = LOCAL_STORE_DOMAINS;
  #timeoutId?: number;
  public data: PromptStoreData = $state({
    time: new Date(),
    username: '',
    app: 'IS',
    domains: [],
    split: '$',
  });
  public readonly promptText: PromptStoreDataText[] = $derived.by(() => getPromptTexts(this.data));
  constructor(ctx: CmdWindowContext, config: StoreConfig<PromptStoreData> = {}) {
    super(ctx, config);
    this.storeEffect = createStoreEffects({});
  }
  protected async init() {
    const localDomain = sessionStorage.getItem(`${this.#promptToken}_${this.ctx.windowId}`);
    let domains: PromptStoreDataDomain[] = localDomain ? JSON.parse(localDomain) : [];
    if (this.ctx.mode === CmdWindowMode.example) {
      // demo模式覆盖默认数据
      const queryDomains = getQueryParam('domains');
      if (queryDomains) {
        domains = JSON.parse(decodeURIComponent(queryDomains));
      }
    }
    this.data = {
      time: new Date(),
      username: '',
      app: 'IS',
      domains,
      split: '$',
    };
    this.startTimeUpdate();
  }

  protected startTimeUpdate(): void {
    const updateEffect = () => {
      this.data.time = new Date();
      this.#timeoutId = setTimeout(updateEffect, 1000);
    };
    updateEffect(); // 立即执行一次
  }

  destroy() {
    if (this.#timeoutId) clearTimeout(this.#timeoutId);
    super.destroy();
  }
}
