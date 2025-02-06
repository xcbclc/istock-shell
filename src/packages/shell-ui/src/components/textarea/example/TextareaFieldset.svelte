<script lang="ts">
  import { ShTextarea } from '../index';

  let value: string = $state('');
</script>

<div class="flex items-center justify-center">
  <fieldset class="fieldset">
    <legend class="fieldset-legend">您的简介?</legend>
    <ShTextarea bind:value placeholder="请输入" />
    <span class="fieldset-label">简介: {value ?? ''}</span>
  </fieldset>
</div>
