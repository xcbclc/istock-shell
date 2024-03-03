import type { ApplicationContext, TCmdpInfo } from '@istock/iswork';
import { parseFilterConditions, type TTableFilterConditions } from './table-query';
import type { TCmdRequest } from '../types';

/**
 * 解析请求参数成单位参数
 * @param 上下文
 * @param cmdInfo
 * @param optionName
 */
export const parseCmdInfoToUnit = (
  _ctx: ApplicationContext,
  cmdInfo: TCmdpInfo,
  optionName = '单位'
): TTableFilterConditions => {
  const payload = cmdInfo.payload as TCmdRequest<Record<string, unknown>>;
  if (!payload?.options?.[optionName]) return [];
  const unit = payload.options[optionName];
  return parseFilterConditions(unit as string);
};

export default {
  parseCmdInfoToUnit,
};
