<script lang="ts">
  import { ShToggle } from '@istock/shell-ui';
  let value: boolean = $state(true);
</script>

<div class="flex items-center justify-center flex-col gap-4">
  <ShToggle bind:value />
  <p>开关状态：{value}</p>
</div>
