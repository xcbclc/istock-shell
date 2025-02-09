<script lang="ts" module>
  import { ShErrorInfo } from '@istock/shell-ui';
  let error: Error;
  try {
    error = new Error('创建了一个错误');
  } catch (e) {}
</script>

<script lang="ts">
  const info = $state({
    title: error.message,
    description: '这里是错误描述，这个错误手动创建的。',
    stack: (error.stack ?? '').split('\n'),
  });
</script>

<ShErrorInfo {...info} />
