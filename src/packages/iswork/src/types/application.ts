import type { TMiddleware } from './middleware';

export type TApplicationEventOptions = {
  emit: (message: unknown, options?: { targetOrigin?: string; transfer?: Transferable[] }) => void;
};

export type TApplicationOptions = {
  middlewares: TMiddleware[];
  domainPath: string;
} & TApplicationEventOptions;
