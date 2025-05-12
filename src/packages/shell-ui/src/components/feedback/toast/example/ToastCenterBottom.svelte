<script lang="ts">
  import { ShToast } from '@istock/shell-ui';
</script>

<!-- 注意：absolute样式名仅演示用 -->
<ShToast
  horizontal="center"
  vertical="bottom"
  alerts={[
    { message: '新消息到达。', type: 'info' },
    { message: '消息发送成功。', type: 'success' },
  ]}
  class="absolute"
></ShToast>
