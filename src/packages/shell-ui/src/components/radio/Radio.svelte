<script lang="ts" module>
  import type { TRadioItemOption, TRadioItemColor, TRadioItemSize } from './RadioItem.svelte';
  import ShRadioItem from './RadioItem.svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  const radioLabelVariantConfig = {
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
  export type TRadioLabelType = keyof (typeof radioLabelVariantConfig)['variants']['type'];
  export type TRadioLabel = {
    type?: TRadioLabelType;
    position?: 'before' | 'after';
    class?: string;
  };

  export interface RadioProps extends Omit<HTMLInputAttributes, 'size'> {
    color?: TRadioItemColor;
    size?: TRadioItemSize;
    options?: TRadioItemOption[];
    label?: TRadioLabel;
    onChangeValue?: <T>(value: T, option?: TRadioItemOption<T>) => void;
  }
</script>

<script lang="ts">
  import { tv } from 'tailwind-variants';
  import { tuc, findByKeyForValue } from '@istock/util';

  let {
    value = $bindable(),
    options = [],
    label,
    disabled,
    onchange,
    onChangeValue,
    ...otherProps
  }: RadioProps = $props();
  const radioLabelVariants = tv(radioLabelVariantConfig);

  $effect(() => {
    onChangeValue?.(value, findByKeyForValue(options, value, 'value'));
  });
</script>

{#each options as opt}
  {@const itemDisabled = opt.disabled ?? disabled ?? undefined}
  {#if opt.label}
    <label class={tuc(radioLabelVariants({ type: label?.type, color: otherProps.color }), label?.class ?? '')}>
      {#if label?.position === 'before'}
        <span class={tuc(radioLabelVariants({ disabled: itemDisabled }))}>{opt.label}</span>
      {/if}
      <ShRadioItem bind:groupValue={value} value={opt.value} disabled={itemDisabled} {...otherProps} />
      {#if !label?.position || label?.position === 'after'}
        <span class={tuc(radioLabelVariants({ disabled: itemDisabled }))}>{opt.label}</span>
      {/if}
    </label>
  {:else}
    <ShRadioItem bind:groupValue={value} value={opt.value} disabled={itemDisabled} {...otherProps} />
  {/if}
{/each}
