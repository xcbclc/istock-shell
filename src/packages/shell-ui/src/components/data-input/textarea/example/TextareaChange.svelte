<script lang="ts">
  import { ShTextarea } from '@istock/shell-ui';
  let value: string = $state('');
  function onChangeValue(value?: string) {
    console.log('onChangeValue', value);
  }
</script>

<ShTextarea bind:value {onChangeValue} />
<p>当前输入值：{value}</p>
