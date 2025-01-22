<script lang="ts">
  import Button from '../Button.svelte';
</script>

<Button tag="a">a标签</Button>
<Button tag="button" type="submit">提交</Button>
<Button tag="input" type="button" value="Input按钮"></Button>
<Button tag="input" type="submit" value="Input提交"></Button>
<Button tag="input" type="radio" aria-label="Radio"></Button>
<Button tag="input" type="checkbox" aria-label="Checkbox"></Button>
<Button tag="input" type="reset" value="Reset"></Button>
