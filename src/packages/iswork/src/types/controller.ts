import type { IAnyClass } from '../interfaces';
import type { TMiddleware } from '../types';
export type TController<T = unknown> = IAnyClass<T>;

export type TControllerMetadata = {
  alias?: string | string[]; // 控制器别名，默认值为控制器实例类名
  version?: string; // 控制器版本
  component?: TControllerMethodComponentMetadata; // 定义控制器返回数据的展示组件
  middlewares?: TMiddleware[]; // 需要运行的中间件
};

export type TControllerMethodMetadata = {
  alias?: string | string[]; // 控制器方法别名，默认值为控制器方法名
  version?: string; // 控制器方法版本
};

export type TControllerMethodComponentMetadata = {
  name: string; // 组件名
  props?: Record<string, unknown>; // 组件参数
  extra?: Record<string, unknown>; // 组件额外参数
};

export type TControllerMethodMessageMetadata = {
  message: boolean;
};

export type TControllerMethodMessageHandlerMetadata = Record<string | number, boolean>;

export type TControllerMethodReturnMetadata = {
  name: string; // 管道函数名称
  args?: unknown[]; // 管道函数参数
};

export type TControllerMethodComponentAccept<Props = Record<string, unknown>> =
  | Record<string, unknown>
  | { extra?: Record<string, unknown>; props?: Props; component?: string };

export type TControllerMethodComponentOutput<Props = Record<string, unknown>> = {
  component: string;
  props: Props;
  extra?: Record<string, unknown>;
};
export type TControllerMethodComponentResponse<Props = Record<string, unknown>> = {
  output: Array<TControllerMethodComponentOutput<Props>>;
};

export type TControllerMethodParamMetadata = Record<string | number, string>;

export type TControllerMethodParamFiledMetadata = TControllerMethodParamMetadata;

export type TControllerMethodParamMetaMetadata = Record<string | number, string>;

export type TControllerMethodParamPayloadMetadata = Record<string | number, boolean>;

export type TControllerMethodCmdRoute = {
  name: string; // 命令名称
  cmd: string; // 命令
  usage?: string; // 命令用法
  shortDescription?: string; // 命令短介绍
  description?: string; // 命令介绍
  options?: Record<string, TControllerMethodCmdRouteOptions>; // 命令参数选项
  subcommand?: TControllerMethodCmdRoute; // 子命令
  arguments?: TControllerMethodCmdRouteOptions[]; // 命令参数
  source?: { title?: string; url?: string };
  remarks?: string;
  example?: string;
};

export type TControllerMethodCmdRouteMetadata = {
  name: string;
  cmd: string;
  usage?: string;
  shortDescription?: string;
  description?: string;
  options?: TControllerMethodCmdRouteOptions[];
  subcommand?: TControllerMethodCmdRouteMetadata;
  arguments?: TControllerMethodCmdRouteOptions[];
  example?: string;
};

export type TControllerMethodCmdRouteOptions = {
  name: string; // 参数名称
  parameter: string[]; // 参数键
  parameterType: string[]; // 对应参数类型
  description?: string; // 参数描述
  default?: any; // 参数默认数据
  optional?: boolean; // 参数是否可选
  choices?: Array<string | number | boolean | null>; // 参数可选值
};

export type TControllerMethodCmdRouteOptionsMetadata = Record<
  string | number,
  Required<TControllerMethodCmdRouteOptions> | string[] | string
>;

export type TControllerMethodCmdRouteArguments = Record<string | number, number>;
