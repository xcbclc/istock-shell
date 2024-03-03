<script lang="ts">
  import CmdMain from './components/main/CmdMain.svelte';
  import CmdForm from './components/form/CmdForm.svelte';

  export let windowId: number;
</script>

<section class="cmd">
  <CmdMain {windowId} />
  <CmdForm {windowId} />
</section>

<style lang="scss">
  .cmd {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
  }
</style>
