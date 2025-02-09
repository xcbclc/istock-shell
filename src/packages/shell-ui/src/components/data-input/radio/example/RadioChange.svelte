<script lang="ts">
  import { ShRadio, type RadioItemOption } from '@istock/shell-ui';
  let value = $state<number>();
  let opt = $state();
  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
  const onChangeValue = <T = number,>(value: T, option?: RadioItemOption<T>) => {
    console.log('onChangeValue', value, option);
    opt = option;
  };
</script>

<ShRadio bind:value {options} {onChangeValue} />
<p>您选择了：{opt ? JSON.stringify(opt) : ''}</p>
