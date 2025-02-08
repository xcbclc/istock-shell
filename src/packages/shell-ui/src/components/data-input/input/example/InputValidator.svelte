<script lang="ts">
  import { ShInput } from '../index';
  const passwordPattern = '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}';
</script>

<div class="flex items-center justify-center flex-col gap-4">
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
    <p class="validator-hint">必须介于1到10之间</p>
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
    <p class="validator-hint">必须是11位数字</p>
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
    <p class="validator-hint">必须是有效的URL</p>
  </div>

  {#snippet usernameIconRender()}
    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      ><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"
        ><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g
      ></svg
    >
  {/snippet}

  {#snippet emailIconRender()}
    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      ><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"
        ><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
        ></path></g
      ></svg
    >
  {/snippet}

  {#snippet passwordIconRender()}
    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      ><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"
        ><path
          d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
        ></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g
      ></svg
    >
  {/snippet}

  {#snippet telIconRender()}
    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
      ><g fill="none"
        ><path
          d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
          fill="currentColor"
        ></path><path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
          fill="currentColor"
        ></path></g
      ></svg
    >
  {/snippet}

  {#snippet urlIconRender()}
    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      ><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"
        ><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path
          d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
        ></path></g
      ></svg
    >
  {/snippet}
</div>
