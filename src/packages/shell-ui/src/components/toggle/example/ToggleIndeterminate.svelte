<script lang="ts">
  import { ShToggle } from '@istock/shell-ui';
  let value: boolean = $state(true);
</script>

<div class="flex items-center justify-center">
  <ShToggle bind:value indeterminate />
</div>
