import type { ApplicationContext, CmdpInfo } from '@istock-shell/iswork';
import { parseFilterConditions, type TableFilterConditions } from './table-query';
import type { CmdRequest } from '../types';

/**
 * 解析请求参数成单位参数
 * @param 上下文
 * @param cmdInfo
 * @param optionName
 */
export const parseCmdInfoToUnit = (
  _ctx: ApplicationContext,
  cmdInfo: CmdpInfo,
  optionName = '单位'
): TableFilterConditions => {
  const payload = cmdInfo.payload as CmdRequest<Record<string, unknown>>;
  if (!payload?.options?.[optionName]) return [];
  const unit = payload.options[optionName];
  return parseFilterConditions(unit as string);
};

export default {
  parseCmdInfoToUnit,
};
