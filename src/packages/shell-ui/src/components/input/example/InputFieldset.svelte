<script lang="ts">
  import { ShInput } from '../index';

  let value: string = $state('');
</script>

<div class="flex items-center justify-center">
  <fieldset class="fieldset">
    <legend class="fieldset-legend">您的姓名是?</legend>
    <ShInput bind:value placeholder="请输入" />
    <span class="fieldset-label">姓名: {value ?? ''}</span>
  </fieldset>
</div>
