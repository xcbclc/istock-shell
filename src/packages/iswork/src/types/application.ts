import type { TMiddleware } from './middleware';

export type TApplicationEventOptions = {
  emit: Function;
};

export type TApplicationOptions = {
  middlewares: TMiddleware[];
  emit: Function;
  domainPath: string;
} & TApplicationEventOptions;
