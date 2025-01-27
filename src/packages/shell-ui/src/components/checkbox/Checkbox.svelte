<script lang="ts" module>
  import type {
    CheckboxItemProps,
    TCheckboxItemOption,
    TCheckboxItemColor,
    TCheckboxItemSize,
  } from './CheckboxItem.svelte';
  import ShCheckboxItem from './CheckboxItem.svelte';

  const checkboxLabelVariantConfig = {
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
      disabled: {
        true: 'text-disabled',
      },
    },
    defaultVariants: {},
  };
  export type TCheckboxLabelType = keyof (typeof checkboxLabelVariantConfig)['variants']['type'];
  export type TCheckboxLabel = {
    type?: TCheckboxLabelType;
    position?: 'before' | 'after';
    class?: string;
  };
  export interface CheckboxProps extends Omit<Omit<CheckboxItemProps, 'option'>, 'groupValue'> {
    color?: TCheckboxItemColor;
    size?: TCheckboxItemSize;
    options?: TCheckboxItemOption[];
    label?: TCheckboxLabel;
    onChangeValue?: <T>(value: T[], option?: Array<TCheckboxItemOption<T>>) => void;
    value?: any[];
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc, findByKeyForValue } from '@istock/util';
  let {
    value = $bindable([]),
    options = [],
    label,
    disabled,
    onchange,
    onChangeValue,
    ...otherProps
  }: CheckboxProps = $props();
  const checkedList = $derived.by(() => {
    return options.map((opt) => {
      return value.includes(opt.value);
    });
  });
  const checkboxLabelVariants = tv(checkboxLabelVariantConfig);
  $effect(() => {
    onChangeValue?.(
      value,
      (value ?? []).map((v) => findByKeyForValue(options, v, 'value')).filter((v) => !!v)
    );
  });
  const getGroupValue = () => value;
  const setGroupValue = (newValue: any[], index: number) => {
    const checkedTempList = [...checkedList];
    checkedTempList[index] = !!newValue.length;
    value = options
      .filter((_opt, index) => {
        return checkedTempList[index];
      })
      .map((opt) => opt.value);
  };
</script>

{#each options as opt, index}
  {@const itemDisabled = opt.disabled ?? disabled ?? undefined}
  {#if opt.label}
    <label class={tuc(checkboxLabelVariants({ type: label?.type, color: otherProps.color }), label?.class ?? '')}>
      {#if label?.position === 'before'}
        <span class={tuc(checkboxLabelVariants({ disabled: itemDisabled }))}>{opt.label}</span>
      {/if}
      <ShCheckboxItem
        bind:groupValue={
          getGroupValue,
          (newValue) => {
            setGroupValue(newValue, index);
          }
        }
        value={opt.value}
        disabled={itemDisabled}
        {...otherProps}
      />
      {#if !label?.position || label?.position === 'after'}
        <span class={tuc(checkboxLabelVariants({ disabled: itemDisabled }))}>{opt.label}</span>
      {/if}
    </label>
  {:else}
    <ShCheckboxItem
      bind:groupValue={
        getGroupValue,
        (newValue) => {
          setGroupValue(newValue, index);
        }
      }
      value={opt.value}
      disabled={itemDisabled}
      {...otherProps}
    />
  {/if}
{/each}
