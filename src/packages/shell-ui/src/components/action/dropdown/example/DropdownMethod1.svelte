<script lang="ts">
  import { ShDropdown } from '@istock/shell-ui';
</script>

<ShDropdown tag="details" items={[{ text: '项目 1' }, { text: '项目 2' }]}>
  {#snippet triggerElementRender()}
    <summary class="btn m-1">打开或关闭</summary>
  {/snippet}
</ShDropdown>
