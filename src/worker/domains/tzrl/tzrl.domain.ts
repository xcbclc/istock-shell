import { Domain } from '@istock/iswork';
import { TzrlController } from './tzrl/tzrl.controller';
import { TzrlService } from './tzrl/tzrl.service';

@Domain({
  name: 'tzrl',
  viewName: '投资日历',
  providers: [TzrlService],
  controllers: [TzrlController],
})
export class TzrlDomain {}
