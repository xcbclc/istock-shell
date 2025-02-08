<script lang="ts">
  import { ShCheckbox, type CheckboxItemOption } from '@istock/shell-ui';
  let value = $state<number[]>([]);
  let opt = $state();
  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
  function onChangeValue<T>(value: T[], option?: Array<CheckboxItemOption<T>>) {
    console.log('onChangeValue', value, option);
    opt = option;
  }
</script>

<ShCheckbox bind:value {options} {onChangeValue} />
<p>您选择了：{JSON.stringify(opt)}</p>
