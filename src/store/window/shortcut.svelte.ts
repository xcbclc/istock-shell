import type { ModelData, ModelPartialData } from '@istock-shell/iswork';
import type { ShortcutModel } from '@domains/global/setting/shortcut/shortcut.model';
import { StoreWindow, createStoreEffects, type StoreConfig } from '@/store';
import type { CmdWindow } from '@/window';
import { shortcutStoreDefaultList, isMacOS } from './data/shortcut-data';

export interface ShortcutStoreModel extends ModelData<ShortcutModel> {}

export interface ShortcutStoreData extends ModelPartialData<ShortcutModel> {
  id: string;
  key: string;
  shortcut: string;
}

export class Shortcut extends StoreWindow<ShortcutStoreModel> {
  public list: ShortcutStoreData[] = $state([]);
  public currentSettingItem: ShortcutStoreData | null = $state(null);

  constructor(cmdWindow: CmdWindow, config: StoreConfig<ShortcutStoreModel> = {}) {
    super(cmdWindow, config);
  }

  protected async init() {
    await this.getList();
    if (!this.list.length) {
      await this.cmdWindow.message.send<string[]>('setting', 'shortcut.createMany', shortcutStoreDefaultList);
      await this.getList();
    } else if (this.list.length !== shortcutStoreDefaultList.length) {
      const oldShortcuts = this.list.map((shortcut) => shortcut.key);
      const newShortcutStoreDefaultList = shortcutStoreDefaultList.filter((shortcut) => {
        return !oldShortcuts.includes(shortcut.key);
      });
      await this.cmdWindow.message.send<string[]>('setting', 'shortcut.createMany', newShortcutStoreDefaultList);
      await this.getList();
    }
    this.storeEffect = createStoreEffects({});
  }

  public async getList() {
    const { payload: list } = await this.cmdWindow.message.send<ShortcutStoreModel[]>('setting', 'shortcut.list', []);
    if (list) this.list = list;
  }

  public getShortcut(key: string) {
    return this.list.find((item) => item.key === key)?.shortcut ?? '';
  }

  public async syncShortcut(data: ShortcutStoreModel | ShortcutStoreData): Promise<void> {
    await this.cmdWindow.message.send<string[]>('setting', 'shortcut.createOrUpdate', data);
    await this.getList();
  }

  // 重置快捷键
  public async resetShortcuts() {
    const record = shortcutStoreDefaultList.reduce(
      (pre, cur) => {
        pre[cur.key] = cur.shortcut;
        return pre;
      },
      {} as Record<string, string>
    );
    await this.cmdWindow.message.send<string[]>(
      'setting',
      'shortcut.updateMany',
      $state.snapshot(this.list).map((item) => {
        item.shortcut = record[item.key] ?? item.shortcut;
        return item;
      })
    );
    await this.getList();
  }

  // 检测快捷键冲突
  public checkConflicts(shortcut: string): boolean {
    const hasDuplicate = this.list.some((item) => item.shortcut === shortcut);
    return hasDuplicate;
  }

  // 检查快捷键是否匹配
  public matchShortcut(event: KeyboardEvent, key: string): boolean {
    const data = this.list.find((item) => item.key === key);
    return this.parseShortcutDisplay(event) === data?.shortcut;
  }

  // 解析键盘事件为快捷键字符串
  public parseShortcut(event: KeyboardEvent): string[] {
    const keys: string[] = [];

    if (event.ctrlKey) keys.push('Ctrl');
    if (event.altKey) keys.push('Alt');
    if (event.shiftKey) keys.push('Shift');
    if (event.metaKey) keys.push('Cmd');

    const key = event.key;
    if (key !== 'Control' && key !== 'Alt' && key !== 'Shift' && key !== 'Meta') {
      keys.push(key.length === 1 ? key.toUpperCase() : key);
    }

    return keys;
  }

  public hasExtraShortcutKey(keys: string[]) {
    return keys.filter((k) => !['Ctrl', 'Alt', 'Shift', 'Cmd'].includes(k)).length !== 0;
  }

  public parseShortcutDisplay(event: KeyboardEvent): string {
    return this.parseShortcut(event).join('+');
  }

  // 格式化快捷键显示文本（为Mac用户显示更友好的标识）
  public formatShortcutDisplay(shortcut: string): string {
    if (!isMacOS()) return shortcut;

    return shortcut
      .replace(/Cmd/g, '⌘')
      .replace(/Meta/g, '⌘')
      .replace(/Ctrl/g, '⌃')
      .replace(/Alt/g, '⌥')
      .replace(/Shift/g, '⇧')
      .replace(/Ctrl/g, '⌃');
  }
}
