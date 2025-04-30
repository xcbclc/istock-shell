export type VariantConfigSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export const ButtonVariantConfig = {
  base: 'btn',
  variants: {
    color: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      accent: 'btn-accent',
      neutral: 'btn-neutral',
      info: 'btn-info',
      success: 'btn-success',
      warning: 'btn-warning',
      error: 'btn-error',
    },
    size: {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
      xl: 'btn-xl',
    },
    soft: {
      true: 'btn-soft',
    },
    outline: {
      true: 'btn-outline',
    },
    dash: {
      true: 'btn-dash',
    },
    active: {
      true: 'btn-active',
    },
    ghost: {
      true: 'btn-ghost',
    },
    link: {
      true: 'btn-link',
    },
    wide: {
      true: 'btn-wide',
    },
    disabled: {
      true: 'btn-disabled',
    },
    shape: {
      square: 'btn-square',
      circle: 'btn-circle',
    },
    block: {
      true: 'btn-block',
    },
  },
  defaultVariants: {},
};
export const CheckboxVariantConfig = {
  base: '',
  variants: {
    type: {
      default: '',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      neutral: 'text-neutral',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    disabled: {
      true: 'text-disabled',
    },
  },
  defaultVariants: {},
};
export const CheckboxItemVariantConfig = {
  base: 'checkbox',
  variants: {
    size: {
      xs: 'checkbox-xs',
      sm: 'checkbox-sm',
      md: 'checkbox-md',
      lg: 'checkbox-lg',
      xl: 'checkbox-xl',
    },
    color: {
      primary: 'checkbox-primary',
      secondary: 'checkbox-secondary',
      accent: 'checkbox-accent',
      neutral: 'checkbox-neutral',
      info: 'checkbox-info',
      success: 'checkbox-success',
      warning: 'checkbox-warning',
      error: 'checkbox-error',
    },
  },
  defaultVariants: {},
};
export const InputVariantConfig = {
  base: 'input',
  variants: {
    size: {
      xs: 'input-xs',
      sm: 'input-sm',
      md: 'input-md',
      lg: 'input-lg',
      xl: 'input-xl',
    },
    color: {
      primary: 'input-primary',
      secondary: 'input-secondary',
      accent: 'input-accent',
      neutral: 'input-neutral',
      info: 'input-info',
      success: 'input-success',
      warning: 'input-warning',
      error: 'input-error',
    },
    variant: {
      ghost: 'input-ghost',
    },
    validator: {
      true: 'validator',
    },
  },
  defaultVariants: {},
};
export const RadioVariantConfig = {
  base: '',
  variants: {
    type: {
      default: '',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      neutral: 'text-neutral',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    disabled: {
      true: 'text-disabled',
    },
  },
  defaultVariants: {},
};
export const RadioItemVariantConfig = {
  base: 'radio',
  variants: {
    size: {
      xs: 'radio-xs',
      sm: 'radio-sm',
      md: 'radio-md',
      lg: 'radio-lg',
      xl: 'radio-xl',
    },
    color: {
      primary: 'radio-primary',
      secondary: 'radio-secondary',
      accent: 'radio-accent',
      neutral: 'radio-neutral',
      info: 'radio-info',
      success: 'radio-success',
      warning: 'radio-warning',
      error: 'radio-error',
    },
  },
  defaultVariants: {},
};
export const SelectVariantConfig = {
  base: 'select',
  variants: {
    size: {
      xs: 'select-xs',
      sm: 'select-sm',
      md: 'select-md',
      lg: 'select-lg',
      xl: 'select-xl',
    },
    color: {
      primary: 'select-primary',
      secondary: 'select-secondary',
      accent: 'select-accent',
      neutral: 'select-neutral',
      info: 'select-info',
      success: 'select-success',
      warning: 'select-warning',
      error: 'select-error',
    },
    variant: {
      ghost: 'select-ghost',
    },
  },
  defaultVariants: {},
};
export const TextareaVariantConfig = {
  base: 'textarea',
  variants: {
    size: {
      xs: 'textarea-xs',
      sm: 'textarea-sm',
      md: 'textarea-md',
      lg: 'textarea-lg',
      xl: 'textarea-xl',
    },
    color: {
      primary: 'textarea-primary',
      secondary: 'textarea-secondary',
      accent: 'textarea-accent',
      neutral: 'textarea-neutral',
      info: 'textarea-info',
      success: 'textarea-success',
      warning: 'textarea-warning',
      error: 'textarea-error',
    },
    variant: {
      ghost: 'textarea-ghost',
    },
  },
  defaultVariants: {},
};
export const ToggleVariantConfig = {
  base: 'toggle',
  variants: {
    size: {
      xs: 'toggle-xs',
      sm: 'toggle-sm',
      md: 'toggle-md',
      lg: 'toggle-lg',
      xl: 'toggle-xl',
    },
    color: {
      primary: 'toggle-primary',
      secondary: 'toggle-secondary',
      accent: 'toggle-accent',
      neutral: 'toggle-neutral',
      info: 'toggle-info',
      success: 'toggle-success',
      warning: 'toggle-warning',
      error: 'toggle-error',
    },
  },
  defaultVariants: {},
};
export const LoadingVariantConfig = {
  base: 'loading',
  variants: {
    shape: {
      spinner: 'loading-spinner',
      dots: 'loading-dots',
      ring: 'loading-ring',
      ball: 'loading-ball',
      bars: 'loading-bars',
      infinity: 'loading-infinity',
    },
    size: {
      xs: 'loading-xs',
      sm: 'loading-sm',
      md: 'loading-md',
      lg: 'loading-lg',
      xl: 'loading-xl',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      neutral: 'text-neutral',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
    },
  },
  defaultVariants: {},
};
export const LoadingTextVariantConfig = {
  base: '',
  variants: {
    size: {
      default: '',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    color: {
      default: '',
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      neutral: 'text-neutral',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
    },
  },
  defaultVariants: {},
};
export const TextVariantConfig = {
  base: '',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      neutral: 'text-neutral',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    weight: {
      light: 'font-light',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {},
};
export const IconVariantConfig = {
  base: 'icon',
  variants: {
    size: {
      xs: 'icon-xs',
      sm: 'icon-sm',
      md: 'icon-md',
      lg: 'icon-lg',
      xl: 'icon-xl',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      neutral: 'text-neutral',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
    },
  },
  defaultVariants: {},
};
export const TooltipVariantConfig = {
  base: 'tooltip',
  variants: {
    color: {
      primary: 'tooltip-primary',
      secondary: 'tooltip-secondary',
      accent: 'tooltip-accent',
      neutral: 'tooltip-neutral',
      info: 'tooltip-info',
      success: 'tooltip-success',
      warning: 'tooltip-warning',
      error: 'tooltip-error',
    },
    placement: {
      top: 'tooltip-top',
      bottom: 'tooltip-bottom',
      left: 'tooltip-left',
      right: 'tooltip-right',
    },
    open: {
      true: 'tooltip-open',
    },
  },
  defaultVariants: {},
};

export const AlertVariantConfig = {
  base: 'alert',
  variants: {
    color: {
      info: 'alert-info',
      success: 'alert-success',
      warning: 'alert-warning',
      error: 'alert-error',
    },
    soft: {
      true: 'alert-soft',
    },
    outline: {
      true: 'alert-outline',
    },
    dash: {
      true: 'alert-dash',
    },
  },
  defaultVariants: {},
};

export const ToastVariantConfig = {
  base: 'toast',
  variants: {
    horizontal: {
      start: 'toast-start',
      center: 'toast-center',
      end: 'toast-end',
    },
    vertical: {
      top: 'toast-top',
      middle: 'toast-middle',
      bottom: 'toast-bottom',
    },
  },
  defaultVariants: {},
};

export const DropdownVariantConfig = {
  base: 'dropdown ',
  variants: {
    placement: {
      start: 'dropdown-start',
      center: 'dropdown-center',
      end: 'dropdown-end',
      top: 'dropdown-top',
      topCenter: 'dropdown-top dropdown-center',
      topEnd: 'dropdown-top dropdown-end',
      bottom: 'dropdown-bottom',
      bottomCenter: 'dropdown-bottom dropdown-center',
      bottomEnd: 'dropdown-bottom dropdown-end',
      left: 'dropdown-left',
      leftCenter: 'dropdown-left dropdown-center',
      leftEnd: 'dropdown-left dropdown-end',
      right: 'dropdown-right',
      rightEnd: 'dropdown-right dropdown-end',
      rightCenter: 'dropdown-right dropdown-center',
    },
    trigger: {
      click: '',
      hover: 'dropdown-hover',
    },
    open: {
      true: 'dropdown-open',
    },
  },
  defaultVariants: {},
};

export const KbdVariantConfig = {
  base: 'kbd',
  variants: {
    size: {
      xs: 'kbd-xs',
      sm: 'kbd-sm',
      md: 'kbd-md',
      lg: 'kbd-lg',
      xl: 'kbd-xl',
    },
  },
  defaultVariants: {},
};

export const StatVariantConfig = {
  base: 'stats',
  variants: {
    vertical: {
      true: 'stats-vertical',
    },
    shadow: {
      true: 'shadow',
    },
  },
  defaultVariants: {},
};

export const StatTitleVariantConfig = {
  ...TextVariantConfig,
  base: 'stat-title',
};
export const StatValueVariantConfig = {
  ...TextVariantConfig,
  base: 'stat-value',
};
export const StatDescVariantConfig = {
  ...TextVariantConfig,
  base: 'stat-desc',
};
export const TableVariantConfig = {
  base: 'table',
  variants: {
    size: {
      xs: 'table-xs',
      sm: 'table-sm',
      md: 'table-md',
      lg: 'table-lg',
      xl: 'table-xl',
    },
    pinRows: {
      true: 'table-pin-rows',
    },
    pinCols: {
      true: 'table-pin-cols',
    },
    zebra: {
      true: 'table-zebra',
    },
  },
  defaultVariants: {},
};

export const FormItemVariantConfig = {
  base: 'form-item',
  variants: {
    layout: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
    hasError: {
      true: 'form-item-error',
    },
    size: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
      xl: 'gap-5',
    },
    cols: {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      5: 'col-span-5',
    },
  },
  defaultVariants: {
    size: 'md' as VariantConfigSize,
  },
};

// 标签样式
export const FormItemLabelVariantConfig = {
  base: 'form-item-label',
  variants: {
    layout: {
      vertical: 'form-item-label-vertical',
      horizontal: '',
    },
    required: {
      true: 'after:content-["*"] after:ml-0.5 after:text-error',
    },
    hasError: {
      true: 'text-error',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      neutral: 'text-neutral',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
    },
    size: {
      xs: 'form-item-label-xs text-xs',
      sm: 'form-item-label-sm text-sm',
      md: 'form-item-label-md text-md',
      lg: 'form-item-label-lg text-lg',
      xl: 'form-item-label-xl text-xl',
    },
    placement: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    },
  },
  defaultVariants: {
    size: 'md' as VariantConfigSize,
  },
};
export const FormItemFieldContentVariantConfig = {
  base: 'form-item-content',
  variants: {
    layout: {
      vertical: 'w-full',
      horizontal: 'flex-auto',
    },
  },
  defaultVariants: {},
};
export const FormItemFieldComponentVariantConfig = {
  base: 'form-item-component',
  variants: {
    layout: {
      vertical: 'form-item-component-vertical',
      horizontal: 'flex-auto',
    },
    size: {
      xs: 'form-item-component-xs',
      sm: 'form-item-component-sm',
      md: 'form-item-component-md',
      lg: 'form-item-component-lg',
      xl: 'form-item-component-xl',
    },
  },
};
export const FormVariantConfig = {
  base: 'form',
  variants: {
    layout: {
      vertical: '',
      horizontal: '',
    },
    size: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
    },
  },
  defaultVariants: {
    size: 'md' as VariantConfigSize,
  },
};

export const FormButtonVariantConfig = {
  base: 'form-button-area',
  variants: {
    layout: {
      vertical: 'flex-row',
      horizontal: 'flex-row',
    },
    size: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
    placement: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    },
  },
  defaultVariants: {
    size: 'md' as VariantConfigSize,
  },
};
