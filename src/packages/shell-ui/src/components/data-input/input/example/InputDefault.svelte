<script lang="ts">
  import { ShInput } from '../index';
  let value: string = $state('');
</script>

<div class="flex items-center justify-center flex-col gap-4">
  <ShInput bind:value placeholder="请输入" />
  <p>输入值：{value}</p>
</div>
