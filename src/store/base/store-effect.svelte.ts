/**
 * 副作用配置接口
 */
export interface EffectConfig {
  /** 是否启用调试 */
  debug?: boolean;
}

/**
 * Store副作用管理器
 * 提供简化的响应式副作用管理
 */
export abstract class StoreEffect {
  #effects: Map<string, () => void> = new Map();
  #isDestroyed = false;

  constructor() {
    this.setupAutoEffects();
  }

  /**
   * 创建响应式副作用
   * @param name 副作用名称
   * @param effect 副作用函数
   * @param config 配置选项
   */
  protected createEffect(name: string, effect: () => void | Promise<void>, config: EffectConfig = {}): () => void {
    if (this.#isDestroyed) {
      console.warn(`[StoreEffect] Cannot create effect '${name}' - effect manager is destroyed`);
      return () => {};
    }

    const { debug = false } = config;

    // 包装副作用函数以支持异步
    const wrappedEffect = async () => {
      try {
        if (debug) {
          console.log(`[StoreEffect] Running effect '${name}'`);
        }
        await effect();
      } catch (error) {
        console.error(`[StoreEffect] Error in effect '${name}':`, error);
      }
    };

    let cleanup = $effect.root(() => {
      $effect(() => {
        wrappedEffect();
      });
    });
    // 存储清理函数
    if (cleanup) {
      this.#effects.set(name, cleanup);
    }

    return cleanup;
  }

  /**
   * 创建防抖副作用
   * @param name 副作用名称
   * @param effect 副作用函数
   * @param delay 防抖延迟（毫秒）
   * @param config 配置选项
   */
  protected createDebouncedEffect(
    name: string,
    effect: () => void | Promise<void>,
    delay: number = 300,
    config: EffectConfig = {}
  ): () => void {
    let timeoutId: number | undefined;

    const debouncedEffect = async () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = window.setTimeout(async () => {
        try {
          await effect();
        } catch (error) {
          console.error(`[StoreEffect] Error in debounced effect '${name}':`, error);
        }
      }, delay);
    };

    const cleanup = this.createEffect(name, debouncedEffect, config);

    // 返回包含清理逻辑的函数
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      cleanup();
    };
  }

  /**
   * 移除指定的副作用
   * @param name 副作用名称
   */
  protected removeEffect(name: string): void {
    const cleanup = this.#effects.get(name);
    if (cleanup) {
      cleanup();
      this.#effects.delete(name);
    }
  }

  /**
   * 获取所有副作用名称
   */
  protected getEffectNames(): string[] {
    return Array.from(this.#effects.keys());
  }

  /**
   * 检查副作用是否存在
   * @param name 副作用名称
   */
  protected hasEffect(name: string): boolean {
    return this.#effects.has(name);
  }

  /**
   * 设置自动副作用（子类可重写）
   */
  protected setupAutoEffects(): void {
    // 子类可以重写此方法来设置自动副作用
  }

  /**
   * 销毁所有副作用
   */
  destroy(): void {
    if (this.#isDestroyed) return;

    this.#isDestroyed = true;

    // 清理所有副作用
    for (const [name, cleanup] of this.#effects) {
      try {
        cleanup();
      } catch (error) {
        console.error(`[StoreEffect] Error cleaning up effect '${name}':`, error);
      }
    }

    this.#effects.clear();
  }
}

/**
 * 创建简单的副作用工厂函数
 * @param effects 副作用配置对象
 */
export function createStoreEffects(effects: Record<string, () => void | Promise<void>>): StoreEffect {
  return new (class extends StoreEffect {
    protected setupAutoEffects(): void {
      Object.entries(effects).forEach(([name, effect]) => {
        this.createEffect(name, effect);
      });
    }
  })();
}
