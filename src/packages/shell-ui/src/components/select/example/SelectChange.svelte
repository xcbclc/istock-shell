<script lang="ts">
  import { ShSelect, type TSelectItemOption } from '../index';
  let value = $state<number>();
  let opt = $state();
  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
  function onChangeValue<T>(value: T, option?: TSelectItemOption<T>) {
    console.log('onChangeValue', value, option);
    opt = option;
  }
</script>

<div class="flex items-center justify-center flex-col gap-4">
  <ShSelect bind:value {options} {onChangeValue} />
  {#if value !== undefined}<p>您选择了：{JSON.stringify(opt)}</p>{/if}
</div>
