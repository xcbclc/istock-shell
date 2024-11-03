import { DataSource } from '@istock/iswork';
import { UserModel } from '@domains/global/user/user.model';
import { DomainModel } from '@domains/global/domain/domain.model';
import { CmdRouteModel } from '@domains/global/cmd-route/cmd-route.model';
import { HistoryModel } from '@domains/global/history/history.model';
import { StockCodeModel } from '@domains/global/stock-code/stock-code.model';
import { StockCodeResultModel } from '@domains/global/stock-code/stock-code-result.model';
import { SzgpsczmModel, SzlbtjModel, SzdqjypxModel, SzgphycjModel, SzmrgkModel } from '@domains/ag/gpsczm/gpsczm.model';
import { GgxxcxModel } from '@domains/ag/ggxxcx/ggxxcx.model';
import { HqbjModel } from '@domains/ag/hqbj/hqbj.model';
import { SshqsjModel, SshqxlModel } from '@domains/ag/sshqsj/sshqsj.model';
import {
  LshqsjModel,
  LshqxlModel,
  LshqtxModel,
  FssjxlModel,
  FssjdcModel,
  RnfssjdcModel,
  PqsjlModel,
} from '@domains/ag/lshqsj/lshqsj.model';
import { LsfbsjModel } from '@domains/ag/lsfbsj/lsfbsj.model';
import { CmdAliasModel } from '@domains/global/cmd-alias/cmd-alias.model';
import { CjModel } from '@domains/wzdh/cj/cj.model';
import { AiModel } from '@domains/global/ai/ai.model';
import { KzzsssjModel } from '@domains/kzz/kzzsssj/kzzsssj.model';
import { KzzsdModel } from '@domains/kzz/kzzsd/kzzsd.model';
import { KzzsdResultModel } from '@domains/kzz/kzzsd/kzzsd-result.model';
import { TzrlModel } from '@domains/tzrl/tzrl/tzrl.model';
import { CookieModel } from '@domains/global/setting/cookie/cookie.model';

export const indexedDataSourceModels = [
  UserModel,
  HistoryModel,
  CmdAliasModel,
  CookieModel,
  KzzsdResultModel,
  StockCodeResultModel,
];
export const akShareFetchDataSourceModels = [
  SzgpsczmModel,
  SzlbtjModel,
  SzdqjypxModel,
  SzgphycjModel,
  SzmrgkModel,
  GgxxcxModel,
  HqbjModel,
  SshqsjModel,
  SshqxlModel,
  LshqsjModel,
  LshqxlModel,
  LshqtxModel,
  FssjxlModel,
  FssjdcModel,
  RnfssjdcModel,
  PqsjlModel,
  LsfbsjModel,
  StockCodeModel,
  KzzsssjModel,
];
export const fetchDataSourceModels = [AiModel, TzrlModel, KzzsdModel];
export const memoryDataSourceModels = [DomainModel, CmdRouteModel, CjModel];

export const initDataSource = async () => {
  const indexedDataSource = new DataSource<'indexedDB'>({
    name: 'indexedDB',
    type: 'indexedDB',
    entities: indexedDataSourceModels,
    dbName: 'istock',
    version: 7,
  });
  await indexedDataSource.initialize();

  const akShareFetchDataSource = new DataSource<'fetch'>({
    name: 'fetch',
    type: 'fetch',
    entities: akShareFetchDataSourceModels,
    prefixUrl: import.meta.env.VITE_AKSHARE_API ?? '/api/akshare',
  });
  await akShareFetchDataSource.initialize();

  const fetchDataSource = new DataSource<'fetch'>({
    name: 'fetch',
    type: 'fetch',
    entities: fetchDataSourceModels,
    prefixUrl: import.meta.env.VITE_ISTOCK_API ?? '/api',
  });
  await fetchDataSource.initialize();

  const memoryDataSource = new DataSource<'memoryDB'>({
    name: 'memoryDB',
    type: 'memoryDB',
    dbName: 'istock',
    entities: memoryDataSourceModels,
  });
  await memoryDataSource.initialize();
};
