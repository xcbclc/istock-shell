<script lang="ts">
  import Loading from '../Loading.svelte';
</script>

<div class="flex items-center justify-center flex-col gap-2">
  <Loading color="primary" text="loading" />
  <Loading color="secondary">loading</Loading>
  <Loading color="accent" size="xs">loading</Loading>
  <Loading color="neutral" size="sm">loading</Loading>
  <Loading color="info" size="md">loading</Loading>
  <Loading color="success" size="lg">loading</Loading>
  <Loading color="warning" size="xl">loading</Loading>
</div>
