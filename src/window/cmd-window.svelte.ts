import { EventEmitter, FESnowflake } from '@istock-shell/util';
import { CmdParser } from '@istock-shell/command-parser';
import { Cmdp, type CmdpMessage } from '@istock-shell/iswork';
import { getWorker } from '@/worker';
import { createWindowStore, startWindowStore, type WindowStore } from '@/store/window/index';
import { type CmdWindowsManager } from './cmd-windows-manager';
import { CmdWorkerMessage } from './cmd-worker-message';

export enum CmdWindowMode {
  normal = '1',
  example = '2',
}

export type CmdWindowOptions = {
  mode?: CmdWindowMode;
};

export type WorkerMessageData = CmdpMessage & { ports?: MessagePort[] };

export class CmdWindow {
  readonly #cmdWindowsManager: CmdWindowsManager;
  readonly #mode: CmdWindowMode;
  readonly #windowId: number = 0;
  readonly #workId: number = 1;
  readonly #event: EventEmitter;
  readonly #cmdParser: CmdParser;
  readonly #store: WindowStore;
  readonly #worker: Worker;
  readonly #generateId: FESnowflake;
  readonly #message: CmdWorkerMessage;
  readonly #useRecord: Record<string, any> = {};
  readonly #cmdpProtocol = 'cmdp:';
  readonly #eventProtocol = 'event:';
  readonly #onWorkerMessage: (event: MessageEvent<WorkerMessageData>) => void;
  public isInitialized: Boolean = $state(false);
  get mode() {
    return this.#mode;
  }
  get isDemoMode() {
    return this.#mode === '2';
  }
  get workId() {
    return this.#workId;
  }
  get event() {
    return this.#event;
  }
  get cmdParser() {
    return this.#cmdParser;
  }
  get store(): WindowStore {
    return this.#store;
  }
  get worker() {
    return this.#worker;
  }
  get message() {
    return this.#message;
  }
  get cmdpProtocol() {
    return this.#cmdpProtocol;
  }
  get eventProtocol() {
    return this.#eventProtocol;
  }
  constructor(cmdWindowsManager: CmdWindowsManager, options: CmdWindowOptions) {
    this.#cmdWindowsManager = cmdWindowsManager;
    this.#mode = options.mode || CmdWindowMode.normal;
    this.#event = new EventEmitter();
    this.#cmdParser = new CmdParser();
    this.#worker = getWorker();
    this.#generateId = new FESnowflake(this.#workId, this.#windowId); // todo workerId自增 对于浏览器标签页或应用打开窗口的个数
    this.#message = new CmdWorkerMessage(this, this.#windowId, {}); // windowId为0时表示全局执行
    this.#store = createWindowStore(this);
    this.#onWorkerMessage = (event: MessageEvent<WorkerMessageData>) => this.#onWorkerMessageHandler(event);
  }
  public async init() {
    this.worker.addEventListener('message', this.#onWorkerMessage);
    await startWindowStore(this.#store);
    this.isInitialized = true;
  }
  async #onWorkerMessageHandler(event: MessageEvent<WorkerMessageData>) {
    const message = event.data ?? {};
    if (event.ports) {
      message.ports = event.ports as MessagePort[];
    }
    let { address } = message;
    if (!address) return;
    if (!Cmdp.check(address) && !Cmdp.check(address, 'event:')) return;
    const info = Cmdp.parseAddress(address);
    if ([this.cmdpProtocol, this.eventProtocol].includes(info.protocol)) {
      if (message?.meta?.messageId) {
        address += `?messageId=${message.meta.messageId}`;
      }
      if (info.port === `${this.#workId}${this.#windowId}`) {
        await this.message.emit(address, message);
      } else {
        const windowId = Number(info.port.substring(`${this.#workId}`.length));
        const cmdCtx = this.#cmdWindowsManager.getCmdContext(windowId);
        if (cmdCtx) {
          await cmdCtx.message.emit(address, message);
        }
      }
    } else {
      await this.event.emit(address, message);
    }
  }
  use<T>(key: string): T | undefined {
    return this.#useRecord[key];
  }
  register<T>(key: string, value: T) {
    this.#useRecord[key] = value;
  }
  getNextId(): string {
    return this.#generateId.nextId();
  }
  destroy() {
    this.worker.removeEventListener('message', this.#onWorkerMessage);
  }
}
