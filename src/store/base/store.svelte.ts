import { StoreEffect } from './store-effect.svelte';

/**
 * 自动保存配置接口
 */
export interface AutoSaveConfig {
  /** 是否启用自动保存 */
  enabled: boolean;
  /** 保存延迟时间（毫秒） */
  delay?: number;
  /** 保存时的消息域路径 */
  domainPath: string;
  /** 保存时的执行路径 */
  executePath: string;
  /** 数据转换函数 */
  transform?: (data: any) => any;
}

/**
 * Store配置接口
 */
export interface StoreConfig<T> {
  /** 自动保存配置 */
  autoSave?: AutoSaveConfig;
  /** 初始数据 */
  initialData?: Partial<T>;
  /** 初始化完成回调 */
  initializedCallback?: Function;
  /** 是否启用调试模式 */
  debug?: boolean;
}

/**
 * 响应式Store抽象基类
 * 提供统一的状态管理、自动保存和生命周期管理
 */
export abstract class Store<T extends Record<string, any> = {}> {
  #model: T = {} as T;
  protected readonly config: StoreConfig<T>;
  protected storeEffect?: StoreEffect;
  protected saveTimer?: number;
  protected isDestroyed = $state(false);
  protected isInitialized = $state(false);

  /**
   * 获取当前模型数据
   */
  get model(): T {
    return this.#model;
  }

  /**
   * 设置模型数据并触发自动保存
   */
  set model(value: T) {
    if (this.isDestroyed) return;

    const oldValue = this.#model;
    this.#model = value;

    // 触发自动保存
    if (this.isInitialized && this.config.autoSave?.enabled && value) {
      this.scheduleSave(value, oldValue);
    }

    if (this.config.debug) {
      console.log(`[Store] Model updated:`, { old: oldValue, new: value });
    }
  }
  constructor(config: StoreConfig<T> = {}) {
    this.config = {
      autoSave: {
        enabled: false,
        delay: 300,
        domainPath: '',
        executePath: '',
        ...config.autoSave,
      },
      debug: false,
      ...config,
    };

    // 设置初始数据
    if (config.initialData) {
      this.#model = { ...config.initialData } as T;
    }
  }

  /**
   * 异步初始化Store
   * 子类必须实现此方法来加载初始数据
   */
  protected abstract init(): Promise<void>;

  /**
   * 设置响应式效果
   * 子类可以重写此方法来添加自定义效果
   */
  protected setupEffects(): void {
    // 子类可以重写此方法
  }

  /**
   * 启动Store（调用init并标记为已初始化）
   */
  public async start(): Promise<void> {
    if (this.isInitialized || this.isDestroyed) return;

    try {
      await this.init();
      this.setupEffects();
      this.isInitialized = true;
      if (!this.config.initialData && this.#model) {
        this.config.initialData = { ...this.#model };
      }
      if (this.config.debug) {
        console.log(`[Store] Initialized successfully`);
      }
    } catch (error) {
      console.error(`[Store] Initialization failed:`, error);
      throw error;
    }
  }

  /**
   * 手动保存数据
   */
  protected abstract save(data?: T): Promise<void>;

  /**
   * 更新模型数据
   */
  public updateModel(updates: T): void {
    if (!this.#model || this.isDestroyed) return;

    this.model = updates;
  }

  /**
   * 重置模型数据
   */
  public resetModel(): void {
    if (this.isDestroyed) return;

    this.model = this.config.initialData ? ({ ...this.config.initialData } as T) : this.model;
  }

  /**
   * 调度自动保存
   */
  protected scheduleSave(newValue: T, _oldValue?: T): void {
    if (!this.config.autoSave?.enabled) return;

    // 清除之前的保存计时器
    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
    }

    // 设置新的保存计时器
    this.saveTimer = setTimeout(() => {
      this.save(newValue);
    }, this.config.autoSave.delay || 300);
  }

  /**
   * 销毁Store，清理所有资源
   */
  public destroy(): void {
    this.saveTimer && clearTimeout(this.saveTimer);
    this.storeEffect?.destroy();
  }
}
