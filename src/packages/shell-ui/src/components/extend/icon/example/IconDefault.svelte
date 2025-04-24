<script lang="ts">
  import { ShIcon } from '@istock/shell-ui';
  const icons = [
    'close',
    'email',
    'empty',
    'error',
    'file',
    'goods-box',
    'heart',
    'info',
    'lightning',
    'link',
    'operation',
    'password',
    'phone',
    'play',
    'question',
    'right',
    'search',
    'success',
    'user',
    'warning',
  ];
</script>

{#each icons as name}
  <div class="text-center">
    <ShIcon {name} />
    <p>{name}</p>
  </div>
{/each}
