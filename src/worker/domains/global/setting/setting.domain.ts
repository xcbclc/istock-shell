import { Global, Domain } from '@istock/iswork';
import { CookieService } from './cookie/cookie.service';
import { CookieController } from './cookie/cookie.controller';

@Global()
@Domain({
  name: 'setting',
  viewName: '设置',
  providers: [CookieService],
  controllers: [CookieController],
})
export class SettingDomain {}
