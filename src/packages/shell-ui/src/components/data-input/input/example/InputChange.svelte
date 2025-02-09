<script lang="ts">
  import { ShInput } from '@istock/shell-ui';
  let value: string = $state('');
  function onChangeValue(value?: string) {
    console.log('onChangeValue', value);
  }
</script>

<ShInput bind:value {onChangeValue} />
<p>当前输入值：{value}</p>
