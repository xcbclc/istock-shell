<script lang="ts">
  import { ShTextarea } from '../index';
  let value: string = $state('');
  function onChangeValue(value?: string) {
    console.log('onChangeValue', value);
  }
</script>

<div class="flex items-center justify-center flex-col gap-4">
  <ShTextarea bind:value {onChangeValue} />
  <p>输入值：{value}</p>
</div>
