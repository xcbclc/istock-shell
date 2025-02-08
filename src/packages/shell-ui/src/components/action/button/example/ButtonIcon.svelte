<script lang="ts">
  import { ShButton, ShIcon } from '@istock/shell-ui';
</script>

<!-- 按钮icon在前面 -->
<ShButton>
  <ShIcon name="heart" />
  喜欢
</ShButton>
<!-- 按钮icon在后面 -->
<ShButton>
  喜欢
  <ShIcon name="heart" />
</ShButton>
