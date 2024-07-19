<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { IDynamicFormData } from '../dynamic-form/IDynamicFormData';
  export let formData: IDynamicFormData = {
    title: '',
    size: 'md',
    fields: [],
    values: {},
  };
  export let size: string = 'md';
  const dispatch = createEventDispatcher();
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    // dispatch('submit', formData.values);
  };
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      console.log('formData.values', formData.values);
      dispatch('submit', formData.values);
    }
  };
</script>

<form class="form {`is-${size}`}" on:keydown={onKeydown} on:submit={onSubmit}><slot /></form>

<style lang="scss">
  .form {
    .is-md {
      max-width: 640px;
    }
  }
</style>
