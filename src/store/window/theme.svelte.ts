import type { ModelData } from '@istock-shell/iswork';
import type { ThemeModel } from '@domains/global/setting/theme/theme.model';
import { StoreWindow, createStoreEffects, type StoreConfig } from '@/store';
import type { CmdWindow } from '@/window';
import { themeStoreOptions, themeStoreVarKeys } from './data/theme-data';

export interface ThemeOption {
  label: string;
  value: string;
  variables: {
    'color-scheme': string;
    '--color-base-100': string;
    '--color-base-200': string;
    '--color-base-300': string;
    '--color-base-content': string;
    '--color-primary': string;
    '--color-primary-content': string;
    '--color-secondary': string;
    '--color-secondary-content': string;
    '--color-accent': string;
    '--color-accent-content': string;
    '--color-neutral': string;
    '--color-neutral-content': string;
    '--color-info': string;
    '--color-info-content': string;
    '--color-success': string;
    '--color-success-content': string;
    '--color-warning': string;
    '--color-warning-content': string;
    '--color-error': string;
    '--color-error-content': string;
  };
}

export interface ThemeStoreModel extends ModelData<ThemeModel> {}

export const LOCAL_STORE_THEME_TOKEN = 'istock_local_store_theme_token';

export const LOCAL_STORE_THEME_DEMO_TOKEN = 'daisyui-theme';

export class Theme extends StoreWindow<ThemeStoreModel> {
  readonly #defaultThemeName = 'business';
  public name: string = $state('');
  public variables: ThemeStoreModel['variables'] = $state({});
  public options: ThemeOption[] = $state(themeStoreOptions);
  readonly themeVars: string[] = themeStoreVarKeys;
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
    if (!this.cmdWindow.isDemoMode) {
      this.storeEffect = createStoreEffects({
        themeNameChange: () => {
          if (this.name) {
            this.useThemeByName(this.name);
            this.model.name = this.name;
            localStorage.setItem(LOCAL_STORE_THEME_TOKEN, this.name);
            this.variables = this.getVariables();
          }
        },
        themeVarChange: () => {
          if (this.name) {
            this.useThemeByName(this.name);
            const variables = this.getVariables();
            this.updateModel({ ...this.model, variables });
          }
        },
      });
    }
    const model = await this.getActiveTheme();
    if (this.cmdWindow.isDemoMode) {
      this.useThemeByName(this.name);
      this.variables = this.getVariables();
    } else {
      if (model) {
        this.name = model.name;
        this.variables = model.variables;
      } else {
        this.name = this.#defaultThemeName;
      }
      this.useThemeByName(this.name);
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
  setThemeByName(name: string): void {
    this.name = name;
    this.useThemeByName(this.name);
    this.variables = this.getVariables();
  }
  protected getVariables(): Record<string, string> {
    const record = this.themeVars.reduce<Record<string, string>>((record, key) => {
      record[key] = getComputedStyle(document.documentElement).getPropertyValue(key);
      return record;
    }, {});
    return record;
  }
}
