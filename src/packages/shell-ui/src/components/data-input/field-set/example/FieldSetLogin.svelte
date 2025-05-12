<script lang="ts">
  import { ShFieldSet, ShField, ShInput, ShButton } from '@istock/shell-ui';
</script>

<ShFieldSet title="登录" class="w-xs bg-base-200 border border-base-300 p-4 rounded-box">
  <ShField label="邮箱">
    <ShInput type="email" require placeholder="请输入邮箱" />
    <div class="validator-hint hidden">输入有效的电子邮件地址</div>
  </ShField>
  <ShField label="密码">
    <ShInput type="password" required minlength={8} placeholder="请输入密码" />
    <p class="validator-hint hidden">必须超过8个字符。</p>
  </ShField>
  <ShButton type="submit" color="neutral">登录</ShButton>
</ShFieldSet>
