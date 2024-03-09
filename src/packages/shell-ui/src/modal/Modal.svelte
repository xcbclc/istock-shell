<!-- Modal.svelte -->
<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';
  import Button from '../button/index';
  export let isOpen = false;
  export let title = '';
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let closable = true;
  export let maskClosable = true;
  export let onOk: (() => void) | null = null;
  export let onCancel: (() => void) | null = null;
  export let okText = '确定';
  export let cancelText = '取消';

  const dispatch = createEventDispatcher();

  const handleOk = () => {
    if (onOk) {
      onOk();
    }
    dispatch('ok');
    closeModal();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    dispatch('cancel');
    closeModal();
  };

  const closeModal = () => {
    dispatch('close');
  };

  const handleMaskClick = () => {
    if (maskClosable) {
      closeModal();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });

  $: {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }
</script>

{#if isOpen}
  <div class="modal">
    <div class="modal-mask" on:click={handleMaskClick}></div>
    <div class="modal-container {size}">
      {#if closable}
        <span class="modal-close" on:click={closeModal}>&times;</span>
      {/if}
      <div class="modal-header">
        <h2 class="modal-title">{title}</h2>
      </div>
      <div class="modal-body">
        <slot />
      </div>
      <div class="modal-footer">
        <Button on:click={handleCancel} type="secondary" {size}>{cancelText}</Button>
        <Button on:click={handleOk} type="primary" {size}>{okText}</Button>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-container {
    position: relative;
    background-color: var(--color-sub-background);
    border-radius: var(--border-radius);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1001;
  }

  .modal-header {
    padding: var(--gap-default) var(--gap-2x);
    border-bottom: 1px solid var(--border-color);
  }

  .modal-title {
    margin: 0;
    font-size: var(--font-size-xxl);
    font-weight: var(--font-weight);
  }

  .modal-body {
    padding: var(--gap-default) var(--gap-2x);
  }

  .modal-footer {
    padding: var(--gap-default) var(--gap-2x);
    text-align: right;
    border-top: 1px solid var(--border-color);
    button {
      vertical-align: middle;
    }
    :global(button:not(:first-child)) {
      margin-left: var(--gap-default);
    }
    :global(button:not(:last-child)) {
      margin-right: var(--gap-default);
    }
  }

  .modal-close {
    position: absolute;
    top: var(--gap-zero2x);
    right: var(--gap-2x);
    font-size: var(--font-size-3xl);
    cursor: pointer;
  }

  .small {
    width: 30%;
    max-width: 320px;
    .modal-title {
      font-size: var(--font-size);
    }
    .modal-body {
      font-size: var(--font-size-smaller);
    }
    .modal-close {
      top: var(--gap-zero4x);
    }
  }

  .medium {
    width: 60%;
    max-width: 540px;
  }

  .large {
    width: 80%;
    max-width: 960px;
  }
</style>
