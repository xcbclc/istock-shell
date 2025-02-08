<script lang="ts">
  import { createEventDispatcher, type SvelteComponent } from 'svelte';
  import ShForm from '../form/index';
  import ShFormItem from '../form-item/index';
  import ShInput from '../input/index';
  import type { IDynamicFormData, IDynamicFormField } from './IDynamicFormData';

  interface Props {
    formData?: IDynamicFormData;
  }

  let {
    formData = $bindable({
      title: '',
      size: 'md',
      fields: [],
      values: {},
    }),
  }: Props = $props();
  const componentRecord: Record<string, typeof SvelteComponent<any>> = {
    ShInput,
  };
  const dispatch = createEventDispatcher();
  const onSubmit = (event: CustomEvent<unknown>) => {
    dispatch('submit', event.detail);
  };
  const onChange = (value: any, field: IDynamicFormField<string>) => {
    formData.values[field.name] = value;
  };
</script>

<ShForm on:submit={onSubmit} bind:formData>
  {#each formData.fields as field}
    {#if field.componentName && componentRecord[field.componentName]}
      <ShFormItem label={field.label} name={field.name}>
        {@const SvelteComponent_1 = componentRecord[field.componentName]}
        <SvelteComponent_1
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
