<script lang="ts">
  import { ShButton, shShowMessage } from '@istock/shell-ui';
</script>

<ShButton onclick={async () => await shShowMessage.alert('这是一个普通提示')}>普通提示</ShButton>
<ShButton color="info" onclick={async () => await shShowMessage.info('这是一个信息提示')}>信息提示</ShButton>
<ShButton color="success" onclick={async () => await shShowMessage.success('这是一个成功提示')}>成功提示</ShButton>
<ShButton color="warning" onclick={async () => await shShowMessage.warning('这是一个警告提示')}>警告提示</ShButton>
<ShButton color="error" onclick={async () => await shShowMessage.error('这是一个错误提示')}>错误提示</ShButton>
