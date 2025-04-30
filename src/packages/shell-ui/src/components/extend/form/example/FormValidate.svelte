<script lang="ts">
  import { ShForm, shShowMessage } from '@istock/shell-ui';

  const validateFormItems = [
    {
      name: 'username',
      label: '用户名',
      field: {
        type: 'input',
        placeholder: '请输入用户名',
        required: true,
        validator: {
          minLength: 3,
          maxLength: 20,
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
          required: true,
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        },
      },
    },
    {
      name: 'age',
      label: '年龄',
      field: {
        type: 'input',
        inputType: 'number',
        placeholder: '请输入年龄',
        validator: {
          min: 18,
          max: 120,
        },
      },
    },
    {
      name: 'password',
      label: '密码',
      field: {
        type: 'input',
        inputType: 'password',
        placeholder: '请输入密码',
        validator: {
          required: true,
          minLength: 6,
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
          custom: (value: string) => {
            if (!/(?=.*[a-z])/.test(value)) return '密码必须包含小写字母';
            if (!/(?=.*[A-Z])/.test(value)) return '密码必须包含大写字母';
            if (!/(?=.*\d)/.test(value)) return '密码必须包含数字';
            return true;
          },
        },
      },
    },
    {
      name: 'confirmPassword',
      label: '确认密码',
      field: {
        type: 'input',
        inputType: 'password',
        placeholder: '请确认密码',
        validator: {
          required: true,
          custom: (value: string, values: Record<string, any>) => {
            if (value !== values.password) {
              return '两次输入的密码不一致';
            }
            return true;
          },
        },
      },
    },
    {
      name: 'agree',
      label: '同意条款',
      field: {
        type: 'checkbox',
        options: [{ label: '我已阅读并同意服务条款', value: true }],
        validator: {
          custom: (value: any) => {
            if (!value?.length) {
              return '请同意服务条款';
            }
            return true;
          },
        },
      },
    },
  ];

  const dynamicValidateItems = [
    {
      name: 'employmentStatus',
      label: '就业状态',
      field: {
        type: 'select',
        placeholder: '请选择就业状态',
        options: [
          { label: '就业', value: 'employed' },
          { label: '自雇', value: 'self-employed' },
          { label: '失业', value: 'unemployed' },
          { label: '学生', value: 'student' },
        ],
        required: true,
      },
    },
    {
      name: 'companyName',
      label: '公司名称',
      field: {
        type: 'input',
        placeholder: '请输入公司名称',
        required: true,
        hidden: (values: Record<string, any>) => values.employmentStatus !== 'employed',
      },
    },
    {
      name: 'businessType',
      label: '业务类型',
      field: {
        type: 'input',
        placeholder: '请输入业务类型',
        required: true,
        hidden: (values: Record<string, any>) => values.employmentStatus !== 'self-employed',
      },
    },
    {
      name: 'seekingJob',
      label: '正在找工作',
      field: {
        type: 'toggle',
        hidden: (values: Record<string, any>) => values.employmentStatus !== 'unemployed',
      },
    },
    {
      name: 'school',
      label: '学校名称',
      field: {
        type: 'input',
        placeholder: '请输入学校名称',
        required: true,
        hidden: (values: Record<string, any>) => values.employmentStatus !== 'student',
      },
    },
  ];

  const handleSubmit = (values: Record<string, any>) => {
    console.log('表单提交：', values);
    void shShowMessage.success('表单提交成功！');
  };

  let validateValues: Record<string, any> = {};
  let dynamicValues: Record<string, any> = {};
</script>

<div class="mt-3">
  <h2 class="text-xl text-center font-semibold mb-4">表单验证</h2>
  <p class="text-sm text-center mb-4">表单字段验证示例</p>
  <ShForm
    formItems={validateFormItems}
    values={validateValues}
    onChangeValues={(values) => (validateValues = values)}
    onSubmit={handleSubmit}
    layout="horizontal"
    labelWidth="120px"
    color="primary"
    initValidate={true}
  />
</div>

<div class="mt-3">
  <h2 class="text-xl text-center font-semibold mb-4">动态表单验证</h2>
  <p class="text-sm text-center mb-4">根据表单值动态显示/隐藏字段</p>
  <ShForm
    formItems={dynamicValidateItems}
    values={dynamicValues}
    onChangeValues={(values) => (dynamicValues = values)}
    onSubmit={handleSubmit}
    layout="horizontal"
    labelWidth="120px"
    color="primary"
  />
</div>
