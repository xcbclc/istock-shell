<script lang="ts" module>
  import type { HTMLOptionAttributes } from 'svelte/elements';
  export type TSelectItemOption<T = any> = {
    label?: string | number | boolean;
    value: T;
    disabled?: boolean;
    children?: Array<TSelectItemOption<T>>;
  };
  export interface SelectItemProps<T = any> extends HTMLOptionAttributes {
    option?: TSelectItemOption<T>;
    selected?: boolean;
  }
</script>

<script lang="ts">
  const { option, ...otherProps }: SelectItemProps = $props();
</script>

<option {...otherProps} disabled={option?.disabled} value={option?.value}>{option?.label ?? option?.value}</option>

<style></style>
