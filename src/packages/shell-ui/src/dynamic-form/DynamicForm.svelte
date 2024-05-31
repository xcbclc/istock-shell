<script lang="ts">
  import { createEventDispatcher, type SvelteComponent } from 'svelte';
  import ShForm from '../form/index';
  import ShFormItem from '../form-item/index';
  import ShInput from '../input/index';
  import type { IDynamicFormData, IDynamicFormField } from './IDynamicFormData';

  export let formData: IDynamicFormData = {
    title: '',
    size: 'md',
    fields: [],
    values: {},
  };
  const componentRecord: Record<string, typeof SvelteComponent<Record<string, unknown>>> = {
    ShInput,
  };
  const dispatch = createEventDispatcher();
  const onSubmit = (event: CustomEvent<unknown>) => {
    dispatch('submit', event.detail);
  };
  const onChange = (value: any, field: IDynamicFormField) => {
    formData.values[field.name] = value;
  };
</script>

<ShForm on:submit={onSubmit} bind:formData>
  {#each formData.fields as field}
    {#if field.componentName && componentRecord[field.componentName]}
      <ShFormItem label={field.label} name={field.name}>
        <svelte:component
          this={componentRecord[field.componentName]}
          bind:value={field.value}
          attributes={field.attributes}
          on:change={(event) => {
            onChange(event?.detail, field);
          }}
        />
      </ShFormItem>
    {/if}
  {/each}
</ShForm>

<style lang="scss">
</style>
