<script lang="ts">
  import { ShAlert, ShButton, ShIcon } from '@istock/shell-ui';
</script>

<ShAlert>
  <ShIcon size="xl" name="info" class="text-info" />
  <div>
    <h3 class="font-bold">新消息！</h3>
    <div class="text-xs">你有一条未读消息</div>
  </div>
  <div>
    <ShButton size="sm">查看</ShButton>
  </div>
</ShAlert>
