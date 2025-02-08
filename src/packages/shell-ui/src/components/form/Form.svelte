<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Snippet } from 'svelte';
  import type { IDynamicFormData } from '../dynamic-form/IDynamicFormData';

  interface Props {
    formData?: IDynamicFormData;
    size?: string;
    children?: Snippet;
  }

  const {
    formData = {
      title: '',
      size: 'md',
      fields: [],
      values: {},
    },
    size = 'md',
    children,
  }: Props = $props();
  const dispatch = createEventDispatcher();
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    // dispatch('submit', formData.values);
  };
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      dispatch('submit', formData.values);
    }
  };
</script>

<form class="form {`is-${size}`}" onkeydown={onKeydown} onsubmit={onSubmit}>{@render children?.()}</form>

<style lang="scss">
  .form {
    .is-md {
      max-width: 640px;
    }
  }
</style>
