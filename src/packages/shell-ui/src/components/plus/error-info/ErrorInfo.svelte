<script lang="ts" module>
  import type { ITextBaseProps } from '../../index';
  export interface ErrorProps extends Omit<ITextBaseProps, 'tag'> {
    title?: string;
    description?: string;
    stack?: string[];
  }
</script>

<script lang="ts">
  import { ShText } from '../../index';
  const { title, description, stack = [], color, ...otherProps }: ErrorProps = $props();
</script>

{#if title}
  <ShText color="error" weight="bold" texts={[{ text: title }]} {...otherProps} />
{/if}
{#if description}
  <ShText color="error" texts={[{ text: description }]} {...otherProps} />
{/if}
{#each stack as line}
  <ShText color="error" texts={[{ text: line }]} {...otherProps} />
{/each}
