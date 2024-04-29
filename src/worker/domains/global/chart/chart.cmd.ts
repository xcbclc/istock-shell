import type { TControllerMethodCmdRoute } from '@istock/iswork';
import { ExampleDataBt, ExampleDataTxt, ExampleDataZxt, ExampleDataGplzt } from './example-data';

export enum EChartType {
  Pie = 'bt',
  Bar = 'txt',
  Line = 'zxt',
  Stock = 'gplzt',
}
export type TArguments = [EChartType];
export type TOption = {
  横轴?: string;
  纵轴?: string;
  纵轴1?: string;
  纵轴2?: string;
  过滤?: string;
  类别?: string;
  单位?: string;
  数据?: Array<Record<string, unknown>>;
  配置?: Record<string, unknown>;
};

export type TPieArguments = [EChartType.Pie];
export type TPieOption = {
  纵轴: string;
} & TOption;

export type TBarArguments = [EChartType.Bar];
export type TBarOption = {
  横轴: string;
  纵轴: string;
} & TOption;

export type TLineArguments = [EChartType.Line];
export type TLineOption = {
  横轴: string;
  纵轴: string;
} & TOption;

export type TStockArguments = [EChartType.Stock];
export type TStockOption = {
  横轴: string;
  纵轴1: string;
  纵轴2: string;
} & Omit<TOption, '纵轴'>;

const getTypeArgument = () => ({
  name: '类型',
  parameter: [],
  parameterType: ['string'],
  description: '图表的类型',
  optional: false,
});
const getCommonOptions = () => {
  return {
    过滤: {
      name: '过滤',
      parameter: ['-gl', '--过滤'],
      parameterType: ['string'],
      description: `表格数据过滤参数
        格式如：列名称:行名称·过滤方法 或 *:行名称·过滤方法 或 列名称:*·过滤方法 或 列名称1:*·过滤方法，列名称2:*·过滤方法`,
      optional: true,
    },
    单位: {
      name: '单位',
      parameter: ['-dw', '--单位'],
      parameterType: ['string'],
      description: '数据单位',
      optional: true,
    },
    类别: {
      name: '类别',
      parameter: ['-lb', '--类别'],
      parameterType: ['string'],
      description: '图表项类别',
      optional: true,
    },
    数据: {
      name: '数据',
      parameter: ['-sj', '--数据'],
      parameterType: ['array'],
      description: '表格数据',
      optional: true,
      choices: [],
    },
    配置: {
      name: '配置',
      parameter: ['-pz', '--配置'],
      parameterType: ['string'],
      description: '图表额外配置',
      optional: true,
      choices: [],
    },
  };
};

export const getChartCommand = (subcommand: TControllerMethodCmdRoute) => {
  const chartCommand: TControllerMethodCmdRoute = {
    name: '图表',
    cmd: 'tb',
    usage: 'tb <子命令>',
    description: '图表命令',
    options: {},
    subcommand,
  };
  if (chartCommand.subcommand) chartCommand.subcommand.usage = `${chartCommand.cmd} ${subcommand.usage}`;
  return chartCommand;
};

export const 饼图: TControllerMethodCmdRoute = {
  name: '饼图',
  cmd: 'bt',
  usage: 'bt <-y <饼图取值字段>> [-gl <过滤条件>] [-lb <图表项类别>] [-pz <配置数据>] [-sj <表格数据>]',
  description: '把数据转换成饼图',
  options: {
    ...getCommonOptions(),
    纵轴: {
      name: '纵轴',
      parameter: ['-y', '--纵轴'],
      parameterType: ['string'],
      description: '饼图取值字段',
      optional: false,
    },
  },
  arguments: [getTypeArgument()],
  example: `tb bt -y 占比 -lb 产品 -sj ${JSON.stringify(ExampleDataBt)}`,
};

export const 条形图 = {
  name: '条形图',
  cmd: 'txt',
  usage:
    'txt <-x <条形图横轴取值字段>> <-y <条形图纵轴取值字段>> [-gl <过滤条件>] [-lb <图表项类别>] [-pz <配置数据>] [-sj <表格数据>]',
  description: '把数据转换成条形图',
  options: {
    ...getCommonOptions(),
    横轴: {
      name: '横轴',
      parameter: ['-x', '--横轴'],
      parameterType: ['string'],
      description: '条形图横轴取值字段',
      optional: false,
    },
    纵轴: {
      name: '纵轴',
      parameter: ['-y', '--纵轴'],
      parameterType: ['string'],
      description: '条形图纵轴取值字段',
      optional: false,
    },
  },
  arguments: [getTypeArgument()],
  example: `tb txt -x 年报 -y 净利润(亿元) -sj ${JSON.stringify(ExampleDataTxt)}`,
};

export const 折线图 = {
  name: '折线图',
  cmd: 'zxt',
  usage:
    'zxt <-x <折线图横轴取值字段>> <-y <折线图纵轴取值字段>> [-gl <过滤条件>] [-lb <图表项类别>] [-pz <配置数据>] [-sj <表格数据>]',
  description: '把数据转换成折线图',
  options: {
    ...getCommonOptions(),
    横轴: {
      name: '横轴',
      parameter: ['-x', '--横轴'],
      parameterType: ['string'],
      description: '折线图横轴取值字段',
      optional: false,
    },
    纵轴: {
      name: '纵轴',
      parameter: ['-y', '--纵轴'],
      parameterType: ['string'],
      description: '折线图纵轴取值字段',
      optional: false,
    },
  },
  arguments: [getTypeArgument()],
  example: `tb zxt -x 年报 -y 净利润(亿元) -sj ${JSON.stringify(ExampleDataZxt)}`,
};

export const 股票蜡烛图 = {
  name: '股票蜡烛图',
  cmd: 'gplzt',
  usage:
    'gplzt <-x <蜡烛图横轴取值字段>> <-y1 <蜡烛图纵轴开盘价收盘价>> <-y2 <蜡烛图纵轴最高价最低价>> [-gl <过滤条件>] [-lb <图表项类别>] [-pz <配置数据>] [-sj <表格数据>]',
  description: '把数据转换成股票蜡烛图',
  options: {
    ...getCommonOptions(),
    横轴: {
      name: '横轴',
      parameter: ['-x', '--横轴'],
      parameterType: ['string'],
      description: '蜡烛图横轴取值字段',
      optional: false,
    },
    纵轴1: {
      name: '纵轴1',
      parameter: ['-y1', '--纵轴1'],
      parameterType: ['string'],
      description: '设置蜡烛图纵轴开盘价收盘价的取值字段，如：开盘价,收盘价',
      optional: false,
    },
    纵轴2: {
      name: '纵轴2',
      parameter: ['-y2', '--纵轴2'],
      parameterType: ['string'],
      description: '设置蜡烛图纵轴最高价最低价的取值字段，如：最高价,最低价',
      optional: false,
    },
  },
  arguments: [getTypeArgument()],
  example: `tb gplzt -x 日期 -y1 开盘,收盘 -y2 最高,最低 -sj ${JSON.stringify(ExampleDataGplzt)}`,
};

export default {
  饼图: getChartCommand(饼图),
  条形图: getChartCommand(条形图),
  折线图: getChartCommand(折线图),
  股票蜡烛图: getChartCommand(股票蜡烛图),
};
