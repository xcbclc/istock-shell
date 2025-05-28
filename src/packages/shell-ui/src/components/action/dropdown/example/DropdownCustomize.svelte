<script lang="ts">
  import { ShDropdown, ShButton } from '@istock-shell/ui';
</script>

<ShDropdown>
  <ShButton tabindex="0">点击</ShButton>
  <div tabindex="0" class="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-md">
    <div class="card-body">
      <p>这是一张卡片，您可以将任何元素用于下拉菜单。</p>
    </div>
  </div>
</ShDropdown>
