<script lang="ts">
  import { ShTooltip, ShButton } from '@istock-shell/ui';
</script>

<ShTooltip dataTip="你好">
  {#snippet tooltipRender()}
    <div class="animate-bounce text-orange-400 -rotate-10 text-2xl font-black">Wow!</div>
  {/snippet}
  <ShButton>移进显示</ShButton>
</ShTooltip>
