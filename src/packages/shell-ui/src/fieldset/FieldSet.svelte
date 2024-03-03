<script lang="ts">
  export let title: string = '';
</script>

<fieldset>
  <legend>{title}</legend>
  <slot />
</fieldset>
