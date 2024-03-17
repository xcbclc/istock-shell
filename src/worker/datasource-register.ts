import { DataSource } from '@istock/iswork';
import { UserModel } from '@domains/global/user/user.model';
import { DomainModel } from '@domains/global/domain/domain.model';
import { CmdRouteModel } from '@domains/global/cmd-route/cmd-route.model';
import { HistoryModel } from '@domains/global/history/history.model';
import { StockCodeModel } from '@domains/global/stock-code/stock-code.model';
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

export const indexedDataSourceModels = [UserModel, HistoryModel, CmdAliasModel];
export const fetchDataSourceModels = [
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
];
export const memoryDataSourceModels = [DomainModel, CmdRouteModel];

export const inintDataSource = async () => {
  const indexedDataSource = new DataSource<'indexedDB'>({
    name: 'indexedDB',
    type: 'indexedDB',
    entities: indexedDataSourceModels,
    dbName: 'istock',
    version: 5,
  });
  await indexedDataSource.initialize();

  const fetchDataSource = new DataSource<'fetch'>({
    name: 'fetch',
    type: 'fetch',
    entities: fetchDataSourceModels,
    prefixUrl: import.meta.env.VITE_AKSHARE_API ?? '/api/public',
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
