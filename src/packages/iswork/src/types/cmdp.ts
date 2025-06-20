/**
 * @fileoverview CMDP 协议类型定义
 * @description 定义 CMDP（Command Protocol）协议相关的类型和接口
 */

/**
 * CMDP 元数据值类型
 * @description 定义 CMDP 元数据中可以使用的基本值类型
 * @example
 * ```typescript
 * const metaValue1: CmdpMetaValue = 'success';
 * const metaValue2: CmdpMetaValue = 200;
 * const metaValue3: CmdpMetaValue = true;
 * const metaValue4: CmdpMetaValue = null;
 * ```
 */
export type CmdpMetaValue = string | number | boolean | undefined | null;

/**
 * CMDP 解析信息
 * @description 从 CMDP 地址解析出的基本信息
 * @example
 * ```typescript
 * const resolveInfo: CmdpResolveInfo = {
 *   subDomain: 'user',
 *   controller: 'UserController',
 *   method: 'getUserInfo'
 * };
 * ```
 */
export type CmdpResolveInfo = {
  /** 子域名 */
  subDomain: string;
  /** 控制器名称 */
  controller: string;
  /** 方法名称 */
  method: string;
};

/**
 * CMDP 元数据
 * @description CMDP 消息的元数据信息
 */
export type CmdpMeta = {
  /** 状态信息 */
  status?: string | number;
  /** 其他元数据字段 */
  [k: string]: CmdpMetaValue;
} | null;

/**
 * CMDP 载荷
 * @description CMDP 消息的载荷数据
 */
export type CmdpPayload = Record<string, any> | CmdpMetaValue;

/**
 * CMDP 消息
 * @description 完整的 CMDP 消息结构
 * @template Payload 载荷类型，默认为 CmdpPayload
 */
export type CmdpMessage<Payload = CmdpPayload> = {
  /** CMDP 地址 */
  address: string;
  /** 元数据 */
  meta?: CmdpMeta;
  /** 载荷数据 */
  payload?: Payload;
};

/**
 * CMDP 地址信息
 * @description 解析后的 CMDP 地址详细信息
 */
export type CmdpAddressInfo = {
  /** 协议类型 */
  protocol?: string;
  /** 用户标识 */
  user: string;
  /** 域名列表 */
  domains: string[];
  /** 端口号 */
  port: string;
  /** 控制器名称 */
  controller: string;
  /** 方法名称 */
  method: string;
};

/**
 * CMDP 完整信息类型
 * @description 包含 CMDP 协议的完整信息，包括协议、地址、元数据、载荷和返回数据
 * @example
 * ```typescript
 * const cmdpInfo: CmdpInfo = {
 *   protocol: 'cmdp',
 *   address: 'cmdp://user@domain:8080/controller/method',
 *   user: 'user',
 *   domains: ['domain'],
 *   port: '8080',
 *   controller: 'controller',
 *   method: 'method',
 *   meta: { status: 'pending' },
 *   payload: { data: 'example' },
 *   returnMeta: { status: 'success' },
 *   returnPayload: { result: 'completed' }
 * };
 * ```
 */
export type CmdpInfo = {
  /** 协议类型 */
  protocol: string;
  /** 完整地址 */
  address: string;
  /** 请求元数据 */
  meta?: CmdpMeta;
  /** 请求载荷 */
  payload?: CmdpPayload;
  /** 返回元数据 */
  returnMeta?: CmdpMeta;
  /** 返回载荷 */
  returnPayload?: CmdpPayload;
} & CmdpAddressInfo;

/**
 * CMDP 选项配置类型
 * @description 用于配置 CMDP 协议的选项
 * @example
 * ```typescript
 * const options: CmdpOptions = {
 *   protocol: 'https:'
 * };
 * ```
 */
export type CmdpOptions = {
  /** 协议类型，如 'http:' 或 'https:' */
  protocol?: string;
};
