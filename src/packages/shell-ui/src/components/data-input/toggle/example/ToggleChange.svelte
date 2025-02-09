<script lang="ts">
  import { ShToggle } from '@istock/shell-ui';
  let value: boolean = $state(false);
  function onChangeValue(value?: boolean) {
    console.log('onChangeValue', value);
  }
</script>

<ShToggle bind:value {onChangeValue} />
<p>开关状态：{value}</p>
