<script lang="ts">
  import { ShIcon } from '../index';
  const icons = ['email', 'error', 'file', 'link', 'password', 'phone', 'question', 'right', 'search', 'user'];
</script>

<div class="flex items-center justify-center gap-4">
  {#each icons as icon}
    <div class="text-center">
      <ShIcon {icon} />
      <p>{icon}</p>
    </div>
  {/each}
</div>
