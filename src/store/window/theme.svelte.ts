import type { ModelData } from '@istock-shell/iswork';
import type { ThemeModel } from '@domains/global/setting/theme/theme.model';
import { StoreWindow, createStoreEffects, type StoreConfig } from '@/store';
import type { CmdWindow } from '@/window';
import { themeStoreOptions, themeStoreVars } from './data/theme-data';

export interface ThemeOption {
  label: string;
  value: string;
}

export interface ThemeStoreModel extends ModelData<ThemeModel> {}

export const LOCAL_STORE_THEME_TOKEN = 'istock_local_store_theme_token';

export const LOCAL_STORE_THEME_DEMO_TOKEN = 'istock_local_store_theme_demo_token';

export class Theme extends StoreWindow<ThemeStoreModel> {
  readonly #defaultThemeName = 'business';
  public name: string = $state('');
  public variables: ThemeStoreModel['variables'] = $state({});
  public options: ThemeOption[] = $state(themeStoreOptions);
  readonly themeVars: string[] = themeStoreVars;
  constructor(cmdWindow: CmdWindow, config: StoreConfig<ThemeStoreModel> = {}) {
    super(
      cmdWindow,
      Object.assign(
        {
          autoSave: {
            enabled: true,
            delay: 100,
            domainPath: 'setting',
            executePath: 'theme.createOrUpdate',
          },
        },
        config
      )
    );
  }
  protected async init() {
    this.name =
      localStorage.getItem(this.cmdWindow.isDemoMode ? LOCAL_STORE_THEME_DEMO_TOKEN : LOCAL_STORE_THEME_TOKEN) || '';
    this.storeEffect = createStoreEffects({
      themeNameChange: () => {
        if (this.name) {
          this.useThemeByName(this?.model?.name);
          this.model.name = this.name;
          this.variables = this.getVariables();
          localStorage.setItem(LOCAL_STORE_THEME_TOKEN, this.name);
        }
      },
      themeVarChange: () => {
        if (this.name) {
          this.useThemeByName(this.model?.name);
          const variables = this.getVariables();
          this.updateModel({ ...this.model, variables });
        }
      },
    });
    const model = await this.getActiveTheme();
    if (model) {
      this.updateModel(model);
      this.name = model.name;
      this.variables = model.variables;
    } else {
      this.useThemeByName(this.#defaultThemeName);
      this.name = this.#defaultThemeName;
    }
  }

  protected async getActiveTheme() {
    const { payload } = await this.cmdWindow.message.send<ThemeStoreModel>(
      'setting',
      'theme.getActiveTheme',
      this.name
    );
    return payload;
  }
  protected useThemeByName(name: string): void {
    document.documentElement.setAttribute('data-theme', name);
  }
  protected getVariables(): Record<string, string> {
    const record = this.themeVars.reduce<Record<string, string>>((record, key) => {
      record[key] = getComputedStyle(document.documentElement).getPropertyValue(key);
      return record;
    }, {});
    return record;
  }
}
