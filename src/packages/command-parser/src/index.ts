export * from './ast';
/**
 * Command Parser 包的主要导出模块
 *
 * 这个包提供了完整的命令行解析功能，包括词法分析、语法分析和语义分析。
 * 主要组件包括：
 *
 * - **CmdParser**: 主要的命令行解析器类，提供完整的解析功能
 * - **Tokenizer**: 词法分析器，将字符串分解为 Token 序列
 * - **Ast**: 抽象语法树解析器，构建命令的语法结构
 * - **接口定义**: Command、Option、Argument 等核心接口
 *
 * @example
 * ```typescript
 * import { CmdParser } from '@istock-shell/command-parser';
 *
 * const parser = new CmdParser();
 * parser.addCommand({
 *   name: 'hello',
 *   cmd: 'hello',
 *   description: '打招呼命令',
 *   arguments: [
 *     { name: 'name', parameterType: ['string'], optional: false }
 *   ],
 *   callback: (args) => {
 *     console.log(`Hello, ${args.name}!`);
 *   }
 * });
 *
 * const result = parser.parse('hello world');
 * ```
 *
 * @packageDocumentation
 */

// 导出解析器相关的所有类型和类
export * from './parser';

// 导出词法分析器相关的所有类型和类
export * from './tokenizer';
