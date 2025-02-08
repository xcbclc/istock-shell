<script lang="ts">
  import { ShCheckbox } from '../index';
  let value = $state<number[]>([0]);
  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
  const indeterminate = $derived(value.length > 0 && value.length < options.length);
  let checkAll = $state<boolean[]>([]);
  function onChangeAll(checked: boolean) {
    if (!checked) {
      value = options.map((item) => item.value);
    } else {
      value = [];
    }
  }
  function onChangeValue<T>(list: T[]) {
    const newAllChecked = list.length === options.length;
    if (checkAll[0] !== newAllChecked) {
      checkAll = [newAllChecked];
    }
  }
</script>

<div class="flex items-center justify-center flex-col gap-4">
  <div class="mr-4">
    <ShCheckbox
      bind:value={checkAll}
      options={[{ value: true, label: '全选' }]}
      {indeterminate}
      onclick={() => {
        onChangeAll(checkAll[0]);
      }}
    />
  </div>
  <ShCheckbox bind:value {options} {onChangeValue} />
</div>
