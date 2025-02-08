export const componentVariants = {
  button: {
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
  },
};

export type ComponentVariantConfig = typeof componentVariants;

export type ComponentVariantName = keyof typeof componentVariants;

/**
 * 获取组件配置
 * @param componentName 组件名称
 * @returns 组件配置
 */
export const getComponentConfig = <T extends ComponentVariantName>(componentName: T) => {
  const config = componentVariants[componentName];
  if (!config) {
    throw new Error(`Component config for '${componentName}' not found`);
  }
  return config;
};
