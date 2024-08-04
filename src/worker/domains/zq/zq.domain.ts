import { Domain } from '@istock/iswork';
import { KzzsssjController } from './kzzsssj/kzzsssj.controller';
import { KzzsssjService } from './kzzsssj/kzzsssj.service';

@Domain({
  name: 'zq',
  viewName: '债券',
  providers: [KzzsssjService],
  controllers: [KzzsssjController],
})
export class ZqDomain {}
