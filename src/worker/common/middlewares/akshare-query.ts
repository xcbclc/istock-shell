import {
  type ApplicationContext,
  type ControllerMethodCmdRoute,
  type ControllerMethodCmdRouteOptions,
} from '@istock-shell/iswork';
import { ScopeError, isPlainObject, wrap } from '@istock-shell/util';
import { getPipeOption, getUnitOption } from '../cmd-template/option';
import type { TMatrixTable, TUiTableProps } from '../types/index';
import {
  getTableData,
  format,
  parseFilterConditions,
  parseCmdInfoToUnit,
  withUnit,
  matrixToUiTableData,
} from '../pipes/index';

/**
 * 接口参数定义
 */
export interface Parameter {
  /** 参数标题 */
  title: string;
  /** 参数名称 */
  name: string;
  /** 参数类型 */
  type: string;
  /** 参数描述 */
  description: string;
}

/**
 * 输入接口参数定义
 */
export interface InputParameter extends Parameter {
  /** 是否必需 */
  isRequired: boolean;
  /** 默认值 */
  defaultValue?: string;
  /** 可选项 */
  choices?: string[];
}

/**
 * 输出接口参数定义
 */
export interface OutputParameter extends Parameter {
  /** 单位 */
  unit: string;
}

/**
 * 接口定义
 */
export interface ApiInterface {
  /** 所属文件名 */
  moduleName: string;
  /** 接口标题 */
  title: string;
  /** 接口名称 */
  name: string;
  /** API函数名 */
  api: string;
  /** 目标地址 */
  targetUrl: string;
  /** 接口描述 */
  description: string;
  /** 限量说明 */
  remarks: string;
  /** 输入参数 */
  inputParameters: InputParameter[];
  /** 输出参数 */
  outputParameters: OutputParameter[];
}

// 使用import.meta.glob动态导入所有akshare接口文件
const modules: Record<string, ApiInterface[]> = import.meta.glob('../../akshare/**/*.ts', {
  eager: true,
  import: 'default',
});

// 合并所有akshare接口
const allApi: ApiInterface[] = Object.values(modules).flat(2);

const apiMap: Map<string, ApiInterface> = new Map();
const cmdMap: Map<string, ControllerMethodCmdRoute> = new Map();

/**
 * 根据输入参数生成命令选项配置
 * @param inputParams 输入参数数组
 * @returns 选项配置对象和必选参数数组
 */
function generateCmdOptions(inputParams: InputParameter[]): {
  options: Record<string, ControllerMethodCmdRouteOptions>;
  args: ControllerMethodCmdRouteOptions[];
} {
  const options: Record<string, ControllerMethodCmdRouteOptions> = {};
  const args: ControllerMethodCmdRouteOptions[] = [];

  inputParams.forEach((param) => {
    const shortParam = `-${param.name}`;
    const longParam = `--${param.title}`;

    // 类型映射
    let paramType = 'string';
    if (param.type === 'str') {
      paramType = 'string';
    } else if (param.type === 'int64' || param.type === 'int') {
      paramType = 'number';
    } else if (param.type === 'float64' || param.type === 'float') {
      paramType = 'number';
    } else if (param.type === 'bool' || param.type === 'boolean') {
      paramType = 'boolean';
    } else if (param.type === 'object') {
      paramType = 'string';
    }

    const cmdOption: ControllerMethodCmdRouteOptions = {
      name: param.name,
      parameter: [],
      parameterType: [paramType],
      description: param.description,
      default: param.defaultValue || '',
      optional: !param.isRequired,
      choices: param.choices || [],
    };

    if (param.isRequired) {
      args.push(cmdOption);
    } else {
      cmdOption.parameter = [shortParam, longParam];
      options[param.title] = cmdOption;
    }
  });

  return { options, args };
}

/**
 * 生成命令用法字符串
 * @param cmd 命令名称
* @param args 必选参数配置
 * @param options 选项配置
 * @returns 用法字符串
 */
function generateUsage(
  cmd: string,
  args: ControllerMethodCmdRouteOptions[],
  options: Record<string, ControllerMethodCmdRouteOptions>
): string {
  let usage = cmd;

  // 添加必选参数
  args.forEach((arg) => {
    usage += ` <${arg.name}>`;
  });

  // 添加可选参数
  Object.values(options).forEach((option) => {
    if (!['单位', '管道'].includes(option.name)) {
      const shortParam = option.parameter[0];
      usage += ` [${shortParam} ${option.default ? ['[', option.name, ']'].join('') : ['<', option.name, '>'].join('')}]`;
    }
  });

  return usage;
}

/**
 * 生成命令示例
 * @param cmd 命令名称
 * @param args 必选参数配置
 * @param options 选项配置
 * @returns 示例字符串
 */
function generateExample(
  cmd: string,
  args: ControllerMethodCmdRouteOptions[],
  _options: Record<string, ControllerMethodCmdRouteOptions>
): string {
  let example = cmd;
  
  args.forEach((arg) => {
    if (arg.default) {
      example += ` ${arg.default}`;
    } else if (arg.choices && arg.choices.length > 0) {
      example += ` ${arg.choices[0]}`;
    } else {
      example += ' 缺省值';
    }
    
  })

  // Object.values(options).forEach((option) => {
  //   const shortParam = option.parameter[0];
  //   if (option.default) {
  //     example += ` ${shortParam}`;
  //   } else if (option.choices && option.choices.length > 0) {
  //     example += ` ${shortParam} ${option.choices[0]}`;
  //   }
  // });

  return example;
}

// 初始化映射表
allApi.forEach((api) => {
  const cmd = api.name;
  const { options, args } = generateCmdOptions(api.inputParameters);
  // 根据outputParameters单位添加默认值
  const defaultUnit = api.outputParameters
    .filter((param) => param.unit && param.unit.trim() !== '')
    .map((param) => {
      return `${param.title}:*·${param.unit.trim()}`;
    })
    .join(',');
  options['单位'] = getUnitOption({ default: defaultUnit });
  options['管道'] = getPipeOption();
  const usage = generateUsage(cmd, args, options);
  const example = generateExample(cmd, args, options);
  apiMap.set(cmd, api);
  cmdMap.set(cmd, {
    name: api.title,
    /** 命令字符串 */
    cmd,
    /** 命令用法说明 */
    usage,
    /** 命令简短描述 */
    shortDescription: api.description,
    /** 命令详细描述 */
    description: api.description,
    /** 命令参数选项配置 */
    options,
    /** 命令参数配置 */
    arguments: args,
    /** 命令来源信息 */
    source: { title: api.title, url: api.targetUrl },
    /** 命令备注 */
    remarks: api.remarks,
    /** 命令使用示例 */
    example: example,
  });
});

/**
 * AKShare通用查询中间件
 * 支持所有akshare业务的命令查询
 * @param ctx 应用上下文
 * @param next 下一个中间件
 */
export const akshareQuery = async (ctx: ApplicationContext, next: () => Promise<unknown>) => {
  const { cmdp } = ctx;
  const info = cmdp.getInfo();
  if (info.controller !== 'akshare' || !info.method) {
    await next();
    return;
  }
  const cmdRoute: ControllerMethodCmdRoute | undefined = cmdMap.get(info.method);
  if (!cmdRoute) {
    throw new ScopeError(`middleware.akshareQuery`, `通过${info.method}未找到akshare命令路由信息`);
  }
  const apiInterface = apiMap.get(info.method);
  if (!apiInterface) {
    throw new ScopeError(`middleware.akshareQuery`, `通过${info.method}未找到akshare接口信息`);
  }
  try {
    const { options = {}, arguments: args = [] } = isPlainObject(info.payload) ? info.payload : {};
    const apiUrl = [import.meta.env.VITE_PROXY_API ?? '/api/v1/proxy', apiInterface.api].join('/');

    // 构建请求参数
    const queryParams: Record<string, any> = {};

    // 处理必选参数
    if (args && Array.isArray(args)) {
      cmdRoute.arguments?.forEach((argConfig, index) => {
        if (args[index] !== undefined) {
          queryParams[argConfig.name] = args[index];
        }
      });
    }

    // 处理可选参数
    if (options && typeof options === 'object') {
      Object.entries(options).forEach(([key, value]) => {
        if (!['单位', '管道'].includes(key)) {
          // 根据参数配置找到对应的参数名
          const optionConfig = Object.values(cmdRoute.options || {}).find(
            (opt) => opt.parameter && (opt.parameter.includes(`-${key}`) || opt.parameter.includes(`--${key}`))
          );
          if (optionConfig) {
            queryParams[optionConfig.name] = value ?? optionConfig.default;
          }
        }
      });
    }

    // 构建查询参数字符串
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    // 构建完整的URL（包含查询参数）
    const fullUrl = searchParams.toString() ? `${apiUrl}?${searchParams.toString()}` : apiUrl;

    // 调用AkShare API
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'xx-target': (import.meta.env.VITE_ISTOCK_BASE ?? 'https://istock.red') + '/api/akshare' },
    });

    if (!response.ok) {
      throw new ScopeError(`middleware.akshareQuery`, `${response.status} ${response.statusText}`);
    }

    const list = await response.json();
    if (!list && !list.length) {
      ctx.cmdp.setReturnPayload({
        output: [
          {
            component: 'ShEmpty',
            props: {},
          },
        ],
      });
      return;
    }
    let headers: string[] = Object.keys(list[0]);
    // 构建单位字符串
    const unit: string = apiInterface.outputParameters
      .filter((param) => param.unit && param.unit.trim() !== '')
      .map((param) => `${param.title}:*·${param.unit}`)
      .join(',');
    const pipe: string = options['管道'] ?? '';
    let table: TMatrixTable = getTableData(list, headers, unit);
    table = format(table, parseFilterConditions(pipe), ctx.app.getPipeRecord());
    table = withUnit(table, parseCmdInfoToUnit(ctx, info));

    const props: TUiTableProps = matrixToUiTableData(table, apiInterface.title ?? '');
    props.size = 'sm';

    let message = ctx.cmdp.getReturnMessage({
      output: [
        {
          component: 'ShVirtualTable',
          props,
        },
      ],
    });
    ctx.app.emit(wrap(message));
  } catch (error) {
    throw new ScopeError(
      `middleware.akshareQuery`,
      `调用AkShare API ${apiInterface.api} 失败 => ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

// 导出命令映射表供其他模块使用
export default { cmdMap, apiMap };
export const akshareCmdMap = cmdMap;
export const akshareApiMap = apiMap;
