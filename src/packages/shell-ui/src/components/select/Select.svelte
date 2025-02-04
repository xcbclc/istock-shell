<script lang="ts" module>
  import type { HTMLSelectAttributes } from 'svelte/elements';
  import type { TSelectItemOption } from './SelectItem.svelte';
  import ShSelectItem from './SelectItem.svelte';

  const selectVariantConfig = {
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
  export type TSelectColor = keyof (typeof selectVariantConfig)['variants']['color'];
  export type TSelectSize = keyof (typeof selectVariantConfig)['variants']['size'];
  export type TSelectVariant = keyof (typeof selectVariantConfig)['variants']['variant'];

  export interface BaseSelectProps extends Omit<Omit<HTMLSelectAttributes, 'size'>, 'multiple'> {
    color?: TSelectColor;
    size?: TSelectSize;
    variant?: TSelectVariant;
    options?: TSelectItemOption[];
    disabled?: boolean;
    placeholder?: string;
  }

  export type SelectProps = BaseSelectProps &
    (
      | {
          multiple?: true;
          value?: any[];
          onChangeValue?: <T>(value: T[], options?: Array<TSelectItemOption<T>>) => void;
        }
      | {
          multiple?: false;
          value?: any;
          onChangeValue?: <T>(value: T, option?: TSelectItemOption<T>) => void;
        }
    );
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc, findByKeyForValue } from '@istock/util';

  let {
    value = $bindable(),
    color,
    size,
    variant,
    placeholder,
    options = [],
    onChangeValue,
    class: className = '',
    ...otherProps
  }: SelectProps = $props();
  const multiple: boolean = otherProps.multiple ?? false;
  const selectVariants = tv(selectVariantConfig, {
    responsiveVariants: ['size'],
  });

  const allOptions = $derived.by(() => {
    return options.reduce<TSelectItemOption[]>((list, option) => {
      if (option?.children?.length) {
        list = [...list, ...option.children];
      }
      list.push(option);
      return list;
    }, []);
  });

  if (multiple && !value) {
    value = [];
  }

  $effect(() => {
    if (multiple) {
      const valArray = value as any[];
      onChangeValue?.(
        valArray,
        valArray.map((v) => findByKeyForValue(allOptions, v, 'value')).filter((v) => !!v)
      );
    } else {
      const valSingle = value;
      const option = findByKeyForValue(allOptions, valSingle, 'value');
      onChangeValue?.(valSingle, option);
    }
  });

  const getSelectedValue = () => value;
  const setSelectedValue = (newValue: any) => {
    if (multiple) {
      const valArray = value as any[];
      const [val] = newValue ?? [];
      if (valArray.includes(val)) {
        value = valArray.filter((v) => v !== val);
      } else {
        value = [...value, val];
      }
      return;
    }
    if (value === newValue) {
      value = undefined;
    } else {
      value = newValue;
    }
  };
</script>

<select
  bind:value={getSelectedValue, setSelectedValue}
  class={[tuc(selectVariants({ color, size, variant })), className]}
  {...otherProps}
>
  {#if placeholder}
    <ShSelectItem
      option={{ label: placeholder, value: '', disabled: true }}
      selected={multiple ? !value.length : !value}
    />
  {/if}
  {#each options as option, index (index)}
    {#if option.children?.length}
      <optgroup label={`${option?.label || ''}`}>
        {#each option.children as child, cIndex (cIndex)}
          <ShSelectItem option={child} selected={multiple ? value.includes(child.value) : value === child.value} />
        {/each}
      </optgroup>
    {:else}
      <ShSelectItem {option} selected={multiple ? value.includes(option.value) : value === option.value} />
    {/if}
  {/each}
</select>
