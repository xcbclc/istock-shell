<script lang="ts">
  import { ShModal, ShButton } from '@istock-shell/ui';
  let show = $state(false);
</script>

<ShButton
  onclick={() => {
    show = true;
  }}>打开对话框</ShButton
>
<ShModal bind:show>
  <div class="modal-box w-11/12 max-w-5xl">
    <h3 class="text-lg font-bold">你好！</h3>
    <p class="py-4">按ESC键或单击下面的按钮关闭</p>
    <div class="modal-action">
      <form method="dialog">
        <ShButton>关闭</ShButton>
      </form>
    </div>
  </div>
</ShModal>
