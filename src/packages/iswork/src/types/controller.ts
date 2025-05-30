/**
 * @fileoverview 控制器类型定义
 * @description 定义控制器相关的类型和元数据接口，包括控制器、方法、组件、参数等类型定义
 */

import type { AnyClass } from '../interfaces';
import type { Middleware } from '../types';

/**
 * 控制器基类类型
 * @description 定义控制器基类的类型，继承自 AnyClass
 * @template T 控制器实例类型，默认为 unknown
 */
export type ControllerBase<T = any> = AnyClass<T>;

/**
 * 控制器元数据类型
 * @description 定义控制器的元数据配置，包括别名、版本、组件和中间件等信息
 */
export type ControllerMetadata = {
  /** 控制器别名，默认值为控制器实例类名 */
  alias?: string | string[];
  /** 控制器版本 */
  version?: string;
  /** 定义控制器返回数据的展示组件 */
  component?: ControllerMethodComponentMetadata;
  /** 需要运行的中间件 */
  middlewares?: Middleware[];
};

/**
 * 控制器方法元数据类型
 * @description 定义控制器方法的元数据配置，包括别名和版本信息
 */
export type ControllerMethodMetadata = {
  /** 控制器方法别名，默认值为控制器方法名 */
  alias?: string | string[];
  /** 控制器方法版本 */
  version?: string;
};

/**
 * 控制器方法组件元数据类型
 * @description 定义控制器方法对应组件的元数据配置，包括组件名称、属性和额外参数
 */
export type ControllerMethodComponentMetadata = {
  /** 组件名称 */
  name: string;
  /** 组件属性参数 */
  props?: Record<string, unknown>;
  /** 组件额外参数 */
  extra?: Record<string, unknown>;
};

/**
 * 控制器方法消息元数据类型
 * @description 定义控制器方法的消息处理配置
 */
export type ControllerMethodMessageMetadata = {
  /** 是否启用消息处理 */
  message: boolean;
};

/**
 * 控制器方法消息处理器元数据类型
 * @description 定义控制器方法消息处理器的配置映射
 */
export type ControllerMethodMessageHandlerMetadata = Record<string | number, boolean>;

/**
 * 控制器方法返回值元数据类型
 * @description 定义控制器方法返回值处理的管道配置
 */
export type ControllerMethodReturnMetadata = {
  /** 管道函数名称 */
  name: string;
  /** 管道函数参数 */
  args?: unknown[];
};

/**
 * 控制器方法组件接受类型
 * @description 定义控制器方法可以接受的组件数据格式
 * @template Props 组件属性类型，默认为 Record<string, unknown>
 */
export type ControllerMethodComponentAccept<Props = Record<string, unknown>> =
  | Record<string, unknown>
  | { extra?: Record<string, unknown>; props?: Props; component?: string };

/**
 * 控制器方法组件输出类型
 * @description 定义控制器方法组件的输出数据格式
 * @template Props 组件属性类型，默认为 Record<string, unknown>
 */
export type ControllerMethodComponentOutput<Props = Record<string, unknown>> = {
  /** 组件名称 */
  component: string;
  /** 组件属性 */
  props: Props;
  /** 组件额外参数 */
  extra?: Record<string, unknown>;
  /** 消息ID */
  messageId?: string;
};

/**
 * 控制器方法组件响应类型
 * @description 定义控制器方法组件的响应数据格式
 * @template Props 组件属性类型，默认为 Record<string, unknown>
 */
export type ControllerMethodComponentResponse<Props = Record<string, unknown>> = {
  /** 组件输出数组 */
  output: Array<ControllerMethodComponentOutput<Props>>;
};

/**
 * 控制器方法参数元数据类型
 * @description 定义控制器方法参数的元数据映射
 */
export type ControllerMethodParamMetadata = Record<string | number, string>;

/**
 * 控制器方法参数字段元数据类型
 * @description 控制器方法参数字段元数据的别名类型
 */
export type ControllerMethodParamFiledMetadata = ControllerMethodParamMetadata;

/**
 * 控制器方法参数元信息元数据类型
 * @description 定义控制器方法参数元信息的元数据映射
 */
export type ControllerMethodParamMetaMetadata = Record<string | number, string>;

/**
 * 控制器方法参数载荷元数据类型
 * @description 定义控制器方法参数载荷的元数据映射
 */
export type ControllerMethodParamPayloadMetadata = Record<string | number, boolean>;

/**
 * 控制器方法命令路由类型
 * @description 定义控制器方法的命令路由配置，包括命令信息、选项、子命令等
 */
export type ControllerMethodCmdRoute = {
  /** 命令名称 */
  name: string;
  /** 命令字符串 */
  cmd: string;
  /** 命令用法说明 */
  usage?: string;
  /** 命令简短描述 */
  shortDescription?: string;
  /** 命令详细描述 */
  description?: string;
  /** 命令参数选项配置 */
  options?: Record<string, ControllerMethodCmdRouteOptions>;
  /** 子命令配置 */
  subcommand?: ControllerMethodCmdRoute;
  /** 命令参数配置 */
  arguments?: ControllerMethodCmdRouteOptions[];
  /** 命令来源信息 */
  source?: { title?: string; url?: string };
  /** 命令备注 */
  remarks?: string;
  /** 命令使用示例 */
  example?: string;
};

/**
 * 控制器方法命令路由元数据类型
 * @description 定义控制器方法命令路由的元数据配置
 */
export type ControllerMethodCmdRouteMetadata = {
  /** 命令名称 */
  name: string;
  /** 命令字符串 */
  cmd: string;
  /** 命令用法说明 */
  usage?: string;
  /** 命令简短描述 */
  shortDescription?: string;
  /** 命令详细描述 */
  description?: string;
  /** 命令参数选项数组 */
  options?: ControllerMethodCmdRouteOptions[];
  /** 子命令元数据 */
  subcommand?: ControllerMethodCmdRouteMetadata;
  /** 命令参数数组 */
  arguments?: ControllerMethodCmdRouteOptions[];
  /** 命令使用示例 */
  example?: string;
};

/**
 * 控制器方法命令路由选项类型
 * @description 定义控制器方法命令路由的选项配置
 */
export type ControllerMethodCmdRouteOptions = {
  /** 参数名称 */
  name: string;
  /** 参数键数组 */
  parameter: string[];
  /** 对应参数类型数组 */
  parameterType: string[];
  /** 参数描述 */
  description?: string;
  /** 参数默认值 */
  default?: any;
  /** 参数是否可选 */
  optional?: boolean;
  /** 参数可选值列表 */
  choices?: Array<string | number | boolean | null>;
};

/**
 * 控制器方法命令路由选项元数据类型
 * @description 定义控制器方法命令路由选项的元数据映射
 */
export type ControllerMethodCmdRouteOptionsMetadata = Record<
  string | number,
  Required<ControllerMethodCmdRouteOptions> | string[] | string
>;

export type ControllerMethodCmdRouteArguments = Record<string | number, number>;
