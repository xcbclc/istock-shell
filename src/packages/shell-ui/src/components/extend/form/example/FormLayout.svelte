<script lang="ts">
  import {
    ShForm,
    ShButton,
    shShowMessage,
    type FormItemConfig,
    type FormItemLayout,
    type FormCols,
  } from '@istock/shell-ui';

  const colsList: FormCols[] = [1, 2, 3]; // 1-5
  const layouts: Array<{
    layout: FormItemLayout;
    text: string;
  }> = [
    {
      layout: 'horizontal',
      text: '水平布局',
    },
    {
      layout: 'vertical',
      text: '垂直布局',
    },
  ];
  const formItems: FormItemConfig[] = [
    {
      name: 'name',
      label: '姓名',
      field: {
        type: 'input',
        placeholder: '请输入姓名',
      },
    },
    {
      name: 'email',
      label: '邮箱',
      field: {
        type: 'input',
        inputType: 'email',
        placeholder: '请输入邮箱',
      },
    },
    {
      name: 'gender',
      label: '性别',
      field: {
        type: 'radio',
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
      },
    },
    {
      name: 'hobby',
      label: '爱好',
      field: {
        type: 'checkbox',
        options: [
          { label: '阅读', value: 'reading' },
          { label: '运动', value: 'sports' },
          { label: '旅行', value: 'travel' },
        ],
      },
    },
    {
      name: 'address',
      label: '地址',
      field: {
        type: 'input',
        placeholder: '请输入详细地址',
      },
    },
    {
      name: 'description',
      label: '个人简介',
      field: {
        type: 'textarea',
        placeholder: '请输入个人简介',
      },
    },
  ];

  const handleSubmit = (values: Record<string, any>) => {
    console.log('表单提交：', values);
    void shShowMessage.success('表单提交成功！');
  };
  const setLayout = (value: FormItemLayout) => (layout = value);
  const setCols = (value: FormCols) => (cols = value);

  let values = {};
  let layout: FormItemLayout = $state('horizontal');
  let cols: FormCols = $state(1);
</script>

<div class="flex justify-center gap-4">
  <div class="join">
    {#each layouts as layoutItem}
      <ShButton
        size="sm"
        color={layoutItem.layout === layout ? 'primary' : ''}
        onclick={() => setLayout(layoutItem.layout)}>{layoutItem.text}</ShButton
      >
    {/each}
  </div>
  <div class="join">
    {#each colsList as colItem}
      <ShButton size="sm" color={colItem === cols ? 'primary' : ''} onclick={() => setCols(colItem)}
        >{colItem}列</ShButton
      >
    {/each}
  </div>
</div>
<ShForm
  {formItems}
  bind:values
  onSubmit={handleSubmit}
  {layout}
  {cols}
  buttonPlacement={'center'}
  labelPlacement={layout === 'horizontal' ? 'end' : 'start'}
  labelWidth="120px"
/>
