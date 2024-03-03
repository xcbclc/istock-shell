import type { TControllerMethodCmdRoute } from '@/packages/iswork';

export enum EChartType {
  Pie = 'bt',
  Bar = 'txt',
  Line = 'zxt',
  Stock = 'gplzt',
}
export type TArguments = [EChartType];
export type TOption = {
  x?: string;
  y?: string;
  y1?: string;
  y2?: string;
  过滤?: string;
  类别?: string;
  单位?: string;
  数据?: Array<Record<string, unknown>>;
  配置?: Record<string, unknown>;
};

export type TPieArguments = [EChartType.Pie];
export type TPieOption = {
  y: string;
} & TOption;

export type TBarArguments = [EChartType.Bar];
export type TBarOption = {
  x: string;
  y: string;
} & TOption;

export type TLineArguments = [EChartType.Line];
export type TLineOption = {
  x: string;
  y: string;
} & TOption;

export type TStockArguments = [EChartType.Stock];
export type TStockOption = {
  x: string;
  y1: string;
  y2: string;
} & Omit<TOption, 'y'>;

const getTypeArgument = () => ({
  name: '类型',
  parameter: [],
  parameterType: ['string'],
  description: '图表的类型',
  optional: true,
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
  return {
    name: '图表',
    cmd: 'tb',
    usage: 'tb <子命令>',
    description: '图表命令',
    subcommand,
    options: {},
  };
};

export const 饼图: TControllerMethodCmdRoute = {
  name: '饼图',
  cmd: 'bt',
  usage: 'bt <-y <饼图取值字段>> [-gl <过滤条件>] [-lb <图表项类别>] [-pz <配置数据>] [-sj <表格数据>]',
  description: '把数据转换成饼图',
  options: {
    ...getCommonOptions(),
    y: {
      name: 'y',
      parameter: ['-y', '--纵轴'],
      parameterType: ['string'],
      description: '饼图取值字段',
      optional: false,
    },
  },
  arguments: [getTypeArgument()],
};

export const 条形图 = {
  name: '条形图',
  cmd: 'txt',
  usage:
    'txt <-x <条形图横轴取值字段>> <-y <条形图纵轴取值字段>> [-gl <过滤条件>] [-lb <图表项类别>] [-pz <配置数据>] [-sj <表格数据>]',
  description: '把数据转换成条形图',
  options: {
    ...getCommonOptions(),
    x: {
      name: 'x',
      parameter: ['-x', '--横轴'],
      parameterType: ['string'],
      description: '条形图横轴取值字段',
      optional: false,
    },
    y: {
      name: 'y',
      parameter: ['-y', '--纵轴'],
      parameterType: ['string'],
      description: '条形图纵轴取值字段',
      optional: false,
    },
  },
  arguments: [getTypeArgument()],
};

export const 折线图 = {
  name: '折线图',
  cmd: 'zxt',
  usage:
    'zxt <-x <折线图横轴取值字段>> <-y <折线图纵轴取值字段>> [-gl <过滤条件>] [-lb <图表项类别>] [-pz <配置数据>] [-sj <表格数据>]',
  description: '把数据转换成折线图',
  options: {
    ...getCommonOptions(),
    x: {
      name: 'x',
      parameter: ['-x', '--横轴'],
      parameterType: ['string'],
      description: '折线图横轴取值字段',
      optional: false,
    },
    y: {
      name: 'y',
      parameter: ['-y', '--纵轴'],
      parameterType: ['string'],
      description: '折线图纵轴取值字段',
      optional: false,
    },
  },
  arguments: [getTypeArgument()],
};

export const 股票蜡烛图 = {
  name: '股票蜡烛图',
  cmd: 'gplzt',
  usage:
    'gplzt <-x <蜡烛图横轴取值字段>> <-y1 <蜡烛图纵轴开盘价收盘价>> <-y2 <蜡烛图纵轴最高价最低价>> [-gl <过滤条件>] [-lb <图表项类别>] [-pz <配置数据>] [-sj <表格数据>]',
  description: '把数据转换成股票蜡烛图',
  options: {
    ...getCommonOptions(),
    x: {
      name: 'x',
      parameter: ['-x', '--横轴'],
      parameterType: ['string'],
      description: '蜡烛图横轴取值字段',
      optional: false,
    },
    y1: {
      name: 'y1',
      parameter: ['-y1', '--纵轴1'],
      parameterType: ['string'],
      description: '设置蜡烛图纵轴开盘价收盘价的取值字段，如：开盘价,收盘价',
      optional: false,
    },
    y2: {
      name: 'y2',
      parameter: ['-y2', '--纵轴2'],
      parameterType: ['string'],
      description: '设置蜡烛图纵轴最高价最低价的取值字段，如：最高价,最低价',
      optional: false,
    },
  },
  arguments: [getTypeArgument()],
};

export default {
  饼图,
  条形图,
  折线图,
  股票蜡烛图,
};
