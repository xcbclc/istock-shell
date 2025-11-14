/**
 * @fileoverview event AKShare接口定义
 * 自动生成，请勿手动修改
 */

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
  /** 所属文件标题 */
  moduleTitle: string;
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

/**
 * event接口数据
 */
export const eventInterfaces: ApiInterface[] = [
  {
    moduleTitle: '迁徙数据',
    moduleName: 'event',
    title: '迁入与迁出地详情',
    name: 'qryqcdxq',
    api: 'migration_area_baidu',
    targetUrl: 'https://qianxi.baidu.com/?from=shoubai#city=0',
    description: '百度-百度地图慧眼-百度迁徙-迁入/迁出地数据接口',
    remarks: '单次返回前 100 个城市的数据',
    inputParameters: [
      {
        title: 'area',
        name: 'area',
        type: 'str',
        description: 'area="乌鲁木齐市", 输入需要查询的省份或者城市, 都需要用全称, 比如: "浙江省", "乌鲁木齐市"',
        defaultValue: '乌鲁木齐市',
        isRequired: false,
      },
      {
        title: 'indicator',
        name: 'indicator',
        type: 'str',
        description: 'indicator="move_in", 返回迁入地详情, indicator="move_out", 返回迁出地详情',
        defaultValue: 'move_in',
        isRequired: false,
      },
      {
        title: 'date',
        name: 'date',
        type: 'str',
        description: 'date="20230922", 需要滞后一天',
        defaultValue: '20230922',
        isRequired: false,
      },
    ],
    outputParameters: [
      {
        title: 'city_name',
        name: 'city_name',
        type: 'object',
        description: '城市名称',
        unit: '',
      },
      {
        title: 'province_name',
        name: 'province_name',
        type: 'object',
        description: '所属省份',
        unit: '',
      },
      {
        title: 'value',
        name: 'value',
        type: 'float64',
        description: '迁徙规模, 比例',
        unit: '',
      },
    ],
  },
  {
    moduleTitle: '迁徙数据',
    moduleName: 'event',
    title: '迁徙规模',
    name: 'qxgm',
    api: 'migration_scale_baidu',
    targetUrl: 'https://qianxi.baidu.com/?from=shoubai#city=0',
    description: '百度-百度地图慧眼-百度迁徙-迁徙规模',
    remarks: '单次返回所有迁徙规模数据',
    inputParameters: [
      {
        title: 'area',
        name: 'area',
        type: 'str',
        description: 'area="广州市", 输入需要查询的省份或者城市, 都需要用全称, 比如: "浙江省", "乌鲁木齐市"',
        defaultValue: '广州市',
        isRequired: false,
      },
      {
        title: 'indicator',
        name: 'indicator',
        type: 'str',
        description: 'indicator="move_in", 返回迁入地详情, indicator="move_out", 返回迁出地详情',
        defaultValue: 'move_in',
        isRequired: false,
      },
    ],
    outputParameters: [
      {
        title: '日期',
        name: 'rq',
        type: 'object',
        description: '',
        unit: '',
      },
      {
        title: '迁徙规模指数',
        name: 'qxgmzs',
        type: 'float64',
        description: '定义参见百度',
        unit: '',
      },
    ],
  },
];

/**
 * 根据API名称获取接口定义
 * @param apiName API名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByApi(apiName: string): ApiInterface | undefined {
  return eventInterfaces.find((item) => item.api === apiName);
}

/**
 * 根据接口名称获取接口定义
 * @param name 接口名称
 * @returns 接口定义或undefined
 */
export function getInterfaceByName(name: string): ApiInterface | undefined {
  return eventInterfaces.find((item) => item.name === name);
}

export default eventInterfaces;
