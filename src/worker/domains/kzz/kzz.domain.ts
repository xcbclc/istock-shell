import { Domain } from '@istock/iswork';
import { SettingDomain } from '@domains/global/setting/setting.domain';
import { KzzsssjController } from './kzzsssj/kzzsssj.controller';
import { KzzsssjService } from './kzzsssj/kzzsssj.service';
import { KzzsdController } from './kzzsd/kzzsd.controller';
import { KzzsdService } from './kzzsd/kzzsd.service';

@Domain({
  name: 'kzz',
  viewName: '可转债',
  imports: [SettingDomain],
  providers: [KzzsssjService, KzzsdService],
  controllers: [KzzsssjController, KzzsdController],
})
export class KzzDomain {}
