import { Global, Domain } from '@istock-shell/iswork';
import { CookieService } from './cookie/cookie.service';
import { CookieController } from './cookie/cookie.controller';
import { ProxyService } from './proxy/proxy.service';
import { ProxyController } from './proxy/proxy.controller';
import { ThemeService } from './theme/theme.service';
import { ThemeController } from './theme/theme.controller';
import { ShortcutService } from './shortcut/shortcut.service';
import { ShortcutController } from './shortcut/shortcut.controller';

@Global()
@Domain({
  name: 'setting',
  viewName: '设置',
  providers: [CookieService, ProxyService, ThemeService, ShortcutService],
  controllers: [CookieController, ProxyController, ThemeController, ShortcutController],
})
export class SettingDomain {}
