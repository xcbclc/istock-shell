<script lang="ts">
  import { ShModal, ShButton } from '@istock-shell/ui';
  let show = $state(false);
</script>

<ShButton
  onclick={() => {
    show = true;
  }}>打开对话框</ShButton
>
<ShModal bind:show title="你好！" content="按ESC键或单击外面遮罩层关闭" maskClosable></ShModal>
