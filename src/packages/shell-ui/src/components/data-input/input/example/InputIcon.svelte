<script lang="ts">
  import { ShInput, ShIcon } from '@istock/shell-ui';
</script>

<ShInput type="text" prefixRender={usernameIconRender} placeholder="用户名" />
<ShInput type="search" prefixRender={searchIconRender} placeholder="搜索" />
<ShInput type="email" prefixRender={emailIconRender} placeholder="电子邮件" />
<div class="join">
  <div>
    <ShInput type="email" prefixRender={emailIconRender} placeholder="电子邮件" />
  </div>
  <button class="btn btn-neutral join-item">加入</button>
</div>
<ShInput type="password" prefixRender={passwordIconRender} placeholder="密码" />
<ShInput type="tel" prefixRender={telIconRender} placeholder="电话" />
<ShInput type="url" prefixRender={urlIconRender} placeholder="网址" />

{#snippet usernameIconRender()}
  <ShIcon name="user" />
{/snippet}

{#snippet searchIconRender()}
  <ShIcon name="search" />
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
