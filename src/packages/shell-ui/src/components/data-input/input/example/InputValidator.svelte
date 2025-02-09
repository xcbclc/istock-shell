<script lang="ts">
  import { ShInput, ShIcon } from '@istock/shell-ui';
  const passwordPattern = '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}';
</script>

<div class="min-w-[18rem]">
  <ShInput type="text" placeholder="文本" list="invest" />
  <datalist id="invest">
    <option value="股票"> </option><option value="债券"> </option><option value="基金"> </option><option value="其它">
    </option></datalist
  >
</div>

<div class="min-w-[18rem]">
  <ShInput
    type="text"
    required
    pattern="[A-Za-z][A-Za-z0-9\-]*"
    minlength={3}
    maxlength={30}
    prefixRender={usernameIconRender}
    placeholder="用户名"
    title="仅包含字母、数字或破折号"
  />
  <p class="validator-hint hidden">
    必须为3到30个字符
    <br />仅包含字母、数字或破折号
  </p>
</div>

<div class="join min-w-[18rem]">
  <div>
    <ShInput type="email" prefixRender={emailIconRender} required placeholder="电子邮件" class="join-item" />
    <div class="validator-hint hidden">输入有效的电子邮件地址</div>
  </div>
  <button class="btn btn-neutral join-item">加入</button>
</div>

<div class="min-w-[18rem]">
  <ShInput
    type="password"
    prefixRender={passwordIconRender}
    required
    minlength={8}
    pattern={passwordPattern}
    title="必须超过8个字符，包括数字、小写字母、大写字母"
    placeholder="密码"
  />
  <p class="validator-hint hidden">
    必须超过8个字符，包括
    <br />至少一个数字
    <br />至少一个小写字母
    <br />至少一个大写字母
  </p>
</div>

<div class="min-w-[18rem]">
  <ShInput type="number" placeholder="数字" required min="1" max="10" title="必须介于1到10之间" />
  <p class="validator-hint hidden">必须介于1到10之间</p>
</div>

<div class="min-w-[18rem]">
  <ShInput
    type="tel"
    prefixRender={telIconRender}
    placeholder="电话"
    required
    pattern="[0-9]*"
    minlength={11}
    maxlength={11}
    title="必须是11位数字"
  />
  <p class="validator-hint hidden">必须是11位数字</p>
</div>

<div class="min-w-[18rem]">
  <ShInput
    type="url"
    prefixRender={urlIconRender}
    placeholder="网址"
    required
    pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
    title="必须是有效的URL"
  />
  <p class="validator-hint hidden">必须是有效的URL</p>
</div>

{#snippet usernameIconRender()}
  <ShIcon name="user" />
{/snippet}

{#snippet emailIconRender()}
  <ShIcon name="email" />
{/snippet}

{#snippet passwordIconRender()}
  <ShIcon name="password" />
{/snippet}

{#snippet telIconRender()}
  <ShIcon name="phone" />
{/snippet}

{#snippet urlIconRender()}
  <ShIcon name="link" />
{/snippet}
