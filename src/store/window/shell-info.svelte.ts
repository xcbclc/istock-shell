import { createStoreEffects, type StoreConfig, StoreWindow } from '@/store';
import type { CmdWindow } from '@/window';
import {
  LOCAL_STORE_SHELL_INFO_READ_TOKEN,
  shellInfoStoreAsciiTitle,
  shellInfoStoreDisclaimer,
  shellInfoProjectInfo,
  getSystemInfo,
} from './data/shell-info-data';

export interface ShellInfoStoreModel {
  asciiTitle: string;
  disclaimer: string;
  projectInfo: {
    title: string;
    name: string;
    version: string;
    description: string;
    author: string;
    contact: string;
    license: string;
    homepage: string;
    repository: string;
    engines: {
      node: string;
      pnpm: string;
    };
    techStack: string[];
  };
  systemInfo: {
    userAgent: string;
    platform: string;
    language: string;
    languages: readonly string[];
    cookieEnabled: boolean;
    onLine: boolean;
    screenResolution: string;
    colorDepth: number;
    pixelDepth: number;
    timezone: string;
    timezoneOffset: number;
    hardwareConcurrency: number | string;
    maxTouchPoints: number;
    deviceMemory: number | string;
    connection: {
      effectiveType: string;
      downlink: number;
      rtt: number;
    } | null;
    localTime: string;
    utcTime: string;
  };
}

export interface ShellInfoStoreData extends ShellInfoStoreModel {}

export class ShellInfo extends StoreWindow<ShellInfoStoreModel> {
  public readonly readToken: string = LOCAL_STORE_SHELL_INFO_READ_TOKEN;
  public data: ShellInfoStoreData = $state({
    asciiTitle: shellInfoStoreAsciiTitle,
    disclaimer: shellInfoStoreDisclaimer,
    projectInfo: shellInfoProjectInfo,
    systemInfo: getSystemInfo(),
  });
  public readState: boolean = $state(localStorage.getItem(this.readToken) === 'true');
  constructor(cmdWindow: CmdWindow, config: StoreConfig<ShellInfoStoreModel> = {}) {
    super(cmdWindow, config);
  }
  protected async init() {
    console.log(this.data.asciiTitle);
    console.info(this.data.projectInfo.name, this.data.projectInfo.version);
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
