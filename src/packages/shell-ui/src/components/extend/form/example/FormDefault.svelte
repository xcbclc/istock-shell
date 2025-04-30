<script lang="ts">
  import { ShForm, shShowMessage, type FormItemConfig } from '@istock/shell-ui';

  // 表单字段配置
  const formItems: FormItemConfig[] = [
    {
      name: 'username',
      label: '用户名',
      field: {
        type: 'input',
        placeholder: '请输入用户名',
        description: '用户名将用于系统登录',
        validator: {
          required: true,
          minLength: 4,
          maxLength: 20,
        },
      },
    },
    {
      name: 'password',
      label: '密码',
      field: {
        type: 'input',
        inputType: 'password',
        placeholder: '请输入密码，如：Aa123456',
        validator: {
          required: true,
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        },
      },
    },
    {
      name: 'email',
      label: '邮箱',
      field: {
        type: 'input',
        inputType: 'email',
        placeholder: '请输入邮箱',
        validator: {
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        },
      },
    },
    {
      name: 'role',
      label: '角色',
      field: {
        type: 'select',
        options: [
          { label: '管理员', value: 'admin' },
          { label: '用户', value: 'user' },
          { label: '访客', value: 'guest' },
        ],
        defaultValue: 'user',
        description: '不同角色拥有不同的权限',
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
          { label: '其他', value: 'other' },
        ],
      },
    },
    {
      name: 'interests',
      label: '兴趣爱好',
      field: {
        type: 'checkbox',
        options: [
          { label: '阅读', value: 'reading' },
          { label: '游戏', value: 'gaming' },
          { label: '旅行', value: 'travel' },
          { label: '运动', value: 'sports' },
          { label: '音乐', value: 'music' },
        ],
        description: '可多选',
      },
    },
    {
      name: 'bio',
      label: '个人简介',
      field: {
        type: 'textarea',
        placeholder: '请简单介绍一下自己',
        validator: {
          maxLength: 200,
        },
      },
    },
    {
      name: 'newsletter',
      label: '订阅新闻邮件',
      field: {
        type: 'toggle',
        defaultValue: true,
      },
    },
  ];

  // 表单值
  let formValues = {};

  // 处理表单值变化
  function handleValuesChange(values: Record<string, any>, isValid: boolean): void {
    console.log('表单值变化:', values, '是否有效:', isValid);
  }

  // 处理表单提交
  function handleSubmit(values: Record<string, any>): void {
    console.log('提交的表单数据:', values);
    void shShowMessage.success('表单提交成功！');
  }
</script>

<h2 class="text-xl font-semibold mb-4">用户注册表单</h2>

<ShForm {formItems} bind:values={formValues} onChangeValues={handleValuesChange} onSubmit={handleSubmit} />
