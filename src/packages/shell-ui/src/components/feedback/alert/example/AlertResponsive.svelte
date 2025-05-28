<script lang="ts">
  import { ShAlert, ShIcon, ShButton } from '@istock-shell/ui';
</script>

<ShAlert class="alert-vertical sm:alert-horizontal">
  <ShIcon size="xl" name="info" class="text-info" />
  <span>我们将使用 cookies 没有任何理由。</span>
  <div>
    <ShButton size="sm">拒绝</ShButton>
    <ShButton size="sm" color="primary">接受</ShButton>
  </div>
</ShAlert>
