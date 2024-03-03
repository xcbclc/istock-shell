import { Domain } from '@istock/iswork';
import { transformStockName } from '@/worker/common';
import { GpsczmController } from './gpsczm/gpsczm.controller';
import { GpsczmService } from './gpsczm/gpsczm.service';
import { GgxxcxController } from './ggxxcx/ggxxcx.controller';
import { GgxxcxService } from './ggxxcx/ggxxcx.service';
import { HqbjController } from './hqbj/hqbj.controller';
import { HqbjService } from './hqbj/hqbj.service';
import { LshqsjController } from './lshqsj/lshqsj.controller';
import { LshqsjService } from './lshqsj/lshqsj.service';
import { SshqsjController } from './sshqsj/sshqsj.controller';
import { SshqsjService } from './sshqsj/sshqsj.service';
import { LsfbsjController } from './lsfbsj/lsfbsj.controller';
import { LsfbsjService } from './lsfbsj/lsfbsj.service';

@Domain({
  name: 'ag',
  viewName: 'A股',
  providers: [GpsczmService, GgxxcxService, HqbjService, SshqsjService, LshqsjService, LsfbsjService],
  controllers: [
    GpsczmController,
    GgxxcxController,
    HqbjController,
    SshqsjController,
    LshqsjController,
    LsfbsjController,
  ],
  middlewares: [transformStockName],
})
export class AgDomain {}
