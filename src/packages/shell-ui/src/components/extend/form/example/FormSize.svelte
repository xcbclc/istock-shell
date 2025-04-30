<script lang="ts">
  import { ShForm, ShButton, shShowMessage, type FormItemSize } from '@istock/shell-ui';

  const formSizes: FormItemSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  const formItems = [
    {
      name: 'username',
      label: '用户名',
      field: {
        type: 'input',
        placeholder: '请输入用户名',
      },
    },
    {
      name: 'password',
      label: '密码',
      field: {
        type: 'input',
        inputType: 'password',
        placeholder: '请输入密码',
      },
    },
    {
      name: 'remember',
      label: '记住我',
      field: {
        type: 'toggle',
      },
    },
  ];

  const handleSubmit = (values: Record<string, any>) => {
    console.log('表单提交：', values);
    void shShowMessage.success('表单提交成功！');
  };
  const values = {};
  let size: FormItemSize = 'md';
</script>

<div class="join">
  {#each formSizes as formSize}
    <ShButton size="sm" color={formSize === size ? 'primary' : ''} onclick={() => (size = formSize)}
      >{formSize}</ShButton
    >
  {/each}
</div>
<ShForm {formItems} {values} onSubmit={handleSubmit} labelWidth="100px" {size} color="primary" />
