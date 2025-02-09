<script lang="ts">
  import { ShIcon } from '@istock/shell-ui';
  const icons = ['email', 'error', 'file', 'link', 'password', 'phone', 'question', 'right', 'search', 'user'];
</script>

{#each icons as name}
  <div class="text-center">
    <ShIcon {name} />
    <p>{name}</p>
  </div>
{/each}
