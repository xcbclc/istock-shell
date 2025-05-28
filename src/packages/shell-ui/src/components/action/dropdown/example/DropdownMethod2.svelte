<script lang="ts">
  import { ShButton, ShDropdownMenu } from '@istock-shell/ui';
</script>

<ShButton popovertarget="popover-1" style="anchor-name:--anchor-1">按钮</ShButton>
<ShDropdownMenu
  popover
  id="popover-1"
  class="dropdown"
  style="position-anchor:--anchor-1"
  items={[{ text: '项目 1' }, { text: '项目 2' }]}
/>
