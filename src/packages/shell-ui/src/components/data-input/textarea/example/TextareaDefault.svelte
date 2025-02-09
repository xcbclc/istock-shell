<script lang="ts">
  import { ShTextarea } from '@istock/shell-ui';
  let value: string = $state('');
</script>

<ShTextarea bind:value placeholder="请输入" />
<p>当前输入值：{value}</p>
