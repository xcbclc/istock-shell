<script lang="ts">
  import { ShToggle } from '../index';
  let value: boolean = $state(false);
  function onChangeValue(value?: boolean) {
    console.log('onChangeValue', value);
  }
</script>

<div class="flex items-center justify-center flex-col gap-4">
  <ShToggle bind:value {onChangeValue} />
  <p>开关状态：{value}</p>
</div>
