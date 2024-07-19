export interface IObserver<V = unknown> {
  next: (value: V) => void;
  error: (err: any) => void;
  complete: (value?: V) => void;
}

export type TSubscribeCallback<V = unknown> = (observer: IObserver<V>) => TUnSubscribe;
export type TUnSubscribe = { unsubscribe: () => void };

export class Observable<V = unknown> {
  readonly #subscribeCallback: TSubscribeCallback<V>;

  constructor(subscribeCallback: TSubscribeCallback<V>) {
    this.#subscribeCallback = subscribeCallback;
  }

  subscribe(observer: IObserver<V>): TUnSubscribe {
    return this.#subscribeCallback(observer);
  }

  static create<V>(subscribeCallback: TSubscribeCallback<V>): Observable<V> {
    return new Observable<V>(subscribeCallback);
  }
}
