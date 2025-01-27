<script lang="ts">
  import { ShCheckbox, type TCheckboxItemOption } from '../index';
  let value = $state<number[]>([]);
  let opt = $state();
  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
  function onChangeValue<T>(value: T[], option?: Array<TCheckboxItemOption<T>>) {
    console.log('onChangeValue', value, option);
    opt = option;
  }
</script>

<div class="flex items-center justify-center gap-2">
  <ShCheckbox bind:value {options} {onChangeValue} />
</div>
{#if value !== undefined}<p>您选择了：{JSON.stringify(opt)}</p>{/if}
