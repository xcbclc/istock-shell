<script lang="ts">
  import { ShDataList, ShInput, type DataListOptionProps } from '@istock/shell-ui';

  let options: Array<DataListOptionProps<string>> = $state([]);
  let inputValue = $state('');
  let timeout: number;

  const mockSearch = async (keyword: string): Promise<Array<DataListOptionProps<string>>> => {
    // 模拟异步搜索
    return await new Promise((resolve) => {
      setTimeout(() => {
        const results = [{ value: `${keyword}-1` }, { value: `${keyword}-2` }, { value: `${keyword}-3` }];
        resolve(results);
      }, 300);
    });
  };

  $effect(() => {
    clearTimeout(timeout);
    if (inputValue) {
      timeout = setTimeout(async () => {
        options = await mockSearch(inputValue);
      }, 150);
    } else {
      options = [];
    }
  });
</script>

<ShInput list="dynamic-list" placeholder="输入关键词搜索" bind:value={inputValue} />
<ShDataList id="dynamic-list" {options} />
