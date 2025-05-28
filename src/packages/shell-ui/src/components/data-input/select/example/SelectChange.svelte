<script lang="ts">
  import { ShSelect, type SelectItemOption } from '@istock-shell/ui';
  let value = $state<number>();
  let opt = $state();
  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
  function onChangeValue<T>(value: T, option?: SelectItemOption<T>) {
    console.log('onChangeValue', value, option);
    opt = option;
  }
</script>

<ShSelect bind:value {options} {onChangeValue} />
<p>您选择了：{opt ? JSON.stringify(opt) : ''}</p>
