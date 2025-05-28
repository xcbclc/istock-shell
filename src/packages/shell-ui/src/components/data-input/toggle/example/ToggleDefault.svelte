<script lang="ts">
  import { ShToggle } from '@istock-shell/ui';
  let value: boolean = $state(true);
</script>

<ShToggle bind:value />
<p>开关状态：{value}</p>
