import type { CmdWindowContext } from '@/window/cmd-window-context';
import { getCmdRoute, type ICmdRouteWritable } from './global/cmd-route';
import { getOutputHistory, type IOutputHistory } from './global/output-history';
import { getInputRecommend, type IInputRecommend } from './global/input-recommend';
import { getUser, type IUserWritable } from './global/user';
import { getAddCmdAlias, type IAddCmdAliasWritable } from './global/cmd-alias';

export type TCmdAllDomainStore = {
  cmdRoute: ICmdRouteWritable;
  outputHistory: IOutputHistory;
  inputRecommend: IInputRecommend;
  user: IUserWritable;
  addCmdAlias: IAddCmdAliasWritable;
};

export const getDomainStore = (ctx: CmdWindowContext): TCmdAllDomainStore => {
  return {
    cmdRoute: getCmdRoute(ctx),
    outputHistory: getOutputHistory(ctx),
    inputRecommend: getInputRecommend(ctx),
    user: getUser(ctx),
    addCmdAlias: getAddCmdAlias(ctx),
  };
};
