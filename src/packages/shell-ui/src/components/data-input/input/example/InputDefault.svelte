<script lang="ts">
  import { ShInput } from '@istock-shell/ui';
  let value: string = $state('');
</script>

<ShInput bind:value placeholder="请输入" />
<p>当前输入值：{value}</p>
