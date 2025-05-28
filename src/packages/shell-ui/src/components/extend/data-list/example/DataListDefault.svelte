<script lang="ts">
  import { ShDataList, ShInput } from '@istock-shell/ui';

  const options = $state([{ value: '选项一' }, { value: '选项二' }, { value: '选项三' }]);
</script>

<ShInput list="demo-datalist" placeholder="请输入或选择" />
<ShDataList id="demo-datalist" {options} />
