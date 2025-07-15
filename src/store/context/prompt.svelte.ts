import dayjs from 'dayjs';
import type { CmdWindowContext } from '@/window';
import { getQueryParam } from '@istock-shell/util';
import { StoreContext, createStoreEffects, type StoreConfig } from '@/store';

export interface PromptStoreDataText {
  text: string;
  type: string;
}

export interface PromptStoreDataDomain {
  name: string;
  viewName: string;
}

export interface PromptStoreData {
  time: string;
  nickname: string;
  app: string;
  domains: PromptStoreDataDomain[];
  split: string;
}

export const LOCAL_STORE_PROMPT_DOMAINS = 'istock_local_store_prompt_domains';

export const getPromptTexts = (data?: PromptStoreData): PromptStoreDataText[] => {
  if (!data) return [];
  const domain = ['', data.app, ...data.domains.map((d) => d.viewName)];
  return [
    { text: dayjs(data.time).format('HH:mm:ss') || '', type: 'time' },
    { text: data.nickname, type: 'nickname' },
    { text: domain.join('/'), type: 'path' },
    { text: data.split, type: 'split' },
  ];
};

export class Prompt extends StoreContext<PromptStoreData> {
  #timeoutId?: number;
  public data: PromptStoreData = $state({
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    nickname: '',
    app: 'IS',
    domains: [],
    split: '$',
  });
  public readonly promptTexts: PromptStoreDataText[] = $derived.by(() => {
    return getPromptTexts(this.data);
  });
  readonly #promptToken: string = $derived.by(() => {
    return `${LOCAL_STORE_PROMPT_DOMAINS}_${this.ctx.windowId}`;
  });
  constructor(ctx: CmdWindowContext, config: StoreConfig<PromptStoreData> = {}) {
    super(ctx, config);
    this.storeEffect = createStoreEffects({
      nameChange: () => {
        const { nickname, username } = ctx.cmdWindow.store.user.data;
        this.data.nickname = nickname || username;
      },
    });
  }
  protected async init() {
    const localDomain = sessionStorage.getItem(this.#promptToken);
    let domains: PromptStoreDataDomain[] = localDomain ? JSON.parse(localDomain) : [];
    if (this.ctx.cmdWindow.isDemoMode) {
      // demo模式覆盖默认数据
      const queryDomains = getQueryParam('domains');
      if (queryDomains) {
        domains = JSON.parse(decodeURIComponent(queryDomains));
      }
    }
    // 直接更新属性而不是替换整个对象
    this.data.domains = domains;
    this.startTimeUpdate();
  }
  protected startTimeUpdate(): void {
    const updateEffect = () => {
      // 直接更新属性而不是替换整个对象，以确保$derived.by能够正确追踪变化
      this.data.time = dayjs().format('YYYY-MM-DD HH:mm:ss');
      this.#timeoutId = window.setTimeout(updateEffect, 1000);
    };
    updateEffect(); // 立即执行一次
  }
  onDomainChange(data: PromptStoreDataDomain[]) {
    // 创建一个新数组而不是修改传入的数组
    const domains = [...data];
    domains.shift(); // 去掉根目录
    // 直接更新属性而不是替换整个对象
    this.data.domains = domains.map((item) => ({ viewName: item.viewName, name: item.name }));
    sessionStorage.setItem(this.#promptToken, JSON.stringify(this.data.domains));
  }
  destroy() {
    if (this.#timeoutId) clearTimeout(this.#timeoutId);
    super.destroy();
  }
}
