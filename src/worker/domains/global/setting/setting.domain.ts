import { Global, Domain } from '@istock-shell/iswork';
import { CookieService } from './cookie/cookie.service';
import { CookieController } from './cookie/cookie.controller';
import { ThemeService } from './theme/theme.service';
import { ThemeController } from './theme/theme.controller';

@Global()
@Domain({
  name: 'setting',
  viewName: '设置',
  providers: [CookieService, ThemeService],
  controllers: [CookieController, ThemeController],
})
export class SettingDomain {}
