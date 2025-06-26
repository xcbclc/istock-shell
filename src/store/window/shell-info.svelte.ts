import { title, version } from '@root/package.json';
import { createStoreEffects, type StoreConfig, StoreWindow } from '@/store';
import type { CmdWindow } from '@/window';
import {
  LOCAL_STORE_SHELL_INFO_READ_TOKEN,
  shellInfoStoreAsciiTitle,
  shellInfoStoreDisclaimer,
} from './data/shell-info-data';

export interface ShellInfoStoreModel {
  title: string;
  asciiTitle: string;
  version: string;
  disclaimer: string;
}

export interface ShellInfoStoreData extends ShellInfoStoreModel {}

export class ShellInfo extends StoreWindow<ShellInfoStoreModel> {
  public readonly readToken: string = LOCAL_STORE_SHELL_INFO_READ_TOKEN;
  public data: ShellInfoStoreData = $state({
    asciiTitle: shellInfoStoreAsciiTitle,
    title,
    version,
    disclaimer: shellInfoStoreDisclaimer,
  });
  public readState: boolean = $state(localStorage.getItem(this.readToken) === 'true');
  constructor(cmdWindow: CmdWindow, config: StoreConfig<ShellInfoStoreModel> = {}) {
    super(cmdWindow, config);
  }
  protected async init() {
    console.log(this.data.asciiTitle);
    console.info(this.data.title, this.data.version);
    this.storeEffect = createStoreEffects({
      readStateChange: () => {
        if (this.readState) {
          localStorage.setItem(this.readToken, 'true');
        } else {
          localStorage.removeItem(this.readToken);
        }
      },
    });
  }
}
