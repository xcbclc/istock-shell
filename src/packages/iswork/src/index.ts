/**
 * @fileoverview iswork 框架主入口文件
 * @description 提供了一个基于装饰器的应用框架，支持依赖注入、ORM、消息处理等功能
 * @author iswork team
 */

// 导入 reflect-metadata 以支持装饰器元数据
import 'reflect-metadata';

// 导入装饰器模块
import Decorator from './decorators/index';

// 导出装饰器
export { Decorator };

// 导出所有模块
export * from './decorators/index';
export * from './enums/index';
export * from './types/index';
export * from './interfaces/index';
export * from './orm/index';
export * from './application/application';
export * from './application/context';
export * from './constants';
export * from './message/index';
export * from './cmdp/index';
