<script lang="ts">
  import { ShCheckboxItem } from '../index';
</script>

<div class="flex items-center justify-center">
  <fieldset class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-64">
    <legend class="fieldset-legend">登录选项</legend>
    <label class="fieldset-label">
      <ShCheckboxItem option={{ value: true }} />
      记住我
    </label>
  </fieldset>
</div>
