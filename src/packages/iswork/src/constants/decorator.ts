/**
 * @fileoverview 装饰器常量定义
 * @description 定义框架中所有装饰器使用的元数据键常量
 */

/** 全局域元数据键 */
export const GLOBAL_DOMAIN_METADATA = Symbol('global.domain.metadata');

/** 域元数据键 */
export const DOMAIN_METADATA = Symbol('domain.metadata');

/** 控制器元数据键 */
export const CONTROLLER_METADATA = Symbol('controller');

/** 控制器方法元数据键 */
export const CONTROLLER_METHOD_METADATA = Symbol('controller.method');

/** 控制器方法组件元数据键 */
export const CONTROLLER_METHOD_COMPONENT_METADATA = Symbol('controller.method.component');

/** 控制器方法返回值元数据键 */
export const CONTROLLER_METHOD_RETURN_METADATA = Symbol('controller.method.return');

/** 控制器方法名称元数据键 */
export const CONTROLLER_METHOD_NAME_METADATA = Symbol('controller.method.name');

/** 控制器方法消息元数据键 */
export const CONTROLLER_METHOD_MESSAGE_METADATA = Symbol('controller.method.message');

/** 控制器方法消息处理器元数据键 */
export const CONTROLLER_METHOD_MESSAGE_HANDLER_METADATA = Symbol('controller.method.message.handler');

/** 控制器方法命令路由元数据键 */
export const CONTROLLER_METHOD_CMDROUTE_METADATA = Symbol('controller.method.cmdRoute');

/** 控制器方法参数字段元数据键 */
export const CONTROLLER_METHOD_PARAM_FILED_METADATA = Symbol('controller.method.param.filed');

/** 控制器方法参数元数据键 */
export const CONTROLLER_METHOD_PARAM_META_METADATA = Symbol('controller.method.param.meta');

/** 控制器方法参数负载元数据键 */
export const CONTROLLER_METHOD_PARAM_PAYLOAD_METADATA = Symbol('controller.method.param.payload');

/** 控制器方法参数命令路由选项元数据键 */
export const CONTROLLER_METHOD_PARAM_CMDROUTEOPTIONS_METADATA = Symbol('controller.method.param.cmdRouteOptions');

/** 控制器方法参数命令路由参数元数据键 */
export const CONTROLLER_METHOD_PARAM_CMDROUTEARGUMENTS_METADATA = Symbol('controller.method.param.cmdRouteArguments');

/** IoC 注入元数据键 */
export const IOC_INJECT = Symbol('ioc.inject');

/** IoC 可注入元数据键 */
export const IOC_INJECTABLE = Symbol('ioc.injectable');

/** TypeScript 设计时参数类型元数据键 */
export const DESIGN_PARAMTYPES = 'design:paramtypes';
