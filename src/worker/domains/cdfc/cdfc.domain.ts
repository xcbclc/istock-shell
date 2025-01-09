import { Domain } from '@istock/iswork';
import { CdesfController } from './cdesf/cdesf.controller';
import { CdesfService } from './cdesf/cdesf.service';

@Domain({
  name: 'cdfc',
  viewName: '成都房产',
  providers: [CdesfService],
  controllers: [CdesfController],
})
export class CdfcDomain {}
