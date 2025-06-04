<script lang="ts">
  import { ShMenu, ShMenuItem, ShTooltip } from '@istock-shell/ui';
</script>

<div class="space-y-8">
  <div>
    <h3 class="text-lg font-semibold mb-4">仅图标菜单</h3>
    <ShMenu>
      <ShMenuItem>
        <a>{@render icon1()}</a>
      </ShMenuItem>
      <ShMenuItem>
        <a>{@render icon2()}</a>
      </ShMenuItem>
      <ShMenuItem>
        <a>{@render icon3()}</a>
      </ShMenuItem>
    </ShMenu>
  </div>
  <div>
    <h3 class="text-lg font-semibold mb-4">仅图标菜单（水平布局）</h3>
    <ShMenu layout="horizontal">
      <ShMenuItem>
        <a>{@render icon1()}</a>
      </ShMenuItem>
      <ShMenuItem>
        <a>{@render icon2()}</a>
      </ShMenuItem>
      <ShMenuItem>
        <a>{@render icon3()}</a>
      </ShMenuItem>
    </ShMenu>
  </div>
  <div>
    <h3 class="text-lg font-semibold mb-4">仅图标菜单（带提示）</h3>
    <ShMenu>
      <ShMenuItem>
        <ShTooltip dataTip="主页" placement="right">{@render icon1()}</ShTooltip>
      </ShMenuItem>
      <ShMenuItem>
        <ShTooltip dataTip="详细" placement="right">{@render icon2()}</ShTooltip>
      </ShMenuItem>
      <ShMenuItem>
        <ShTooltip dataTip="统计" placement="right">{@render icon3()}</ShTooltip>
      </ShMenuItem>
    </ShMenu>
  </div>
  <div>
    <h3 class="text-lg font-semibold mb-4">图标菜单</h3>
    <ShMenu>
      <ShMenuItem>
        <a>{@render icon1()}Item 1</a>
      </ShMenuItem>
      <ShMenuItem>
        <a>{@render icon2()}Item 2</a>
      </ShMenuItem>
      <ShMenuItem>
        <a>{@render icon3()}Item 3</a>
      </ShMenuItem>
    </ShMenu>
  </div>
  <div>
    <h3 class="text-lg font-semibold mb-4">图标菜单带徽章（响应布局）</h3>
    <ShMenu class="lg:menu-horizontal">
      <ShMenuItem>
        <a>{@render icon1()}Inbox<span class="badge badge-xs">99+</span></a>
      </ShMenuItem>
      <ShMenuItem>
        <a>{@render icon2()}Updates<span class="badge badge-xs badge-warning">NEW</span></a>
      </ShMenuItem>
      <ShMenuItem>
        <a>Stats<span class="badge badge-xs badge-info"></span></a>
      </ShMenuItem>
    </ShMenu>
  </div>
</div>

{#snippet icon1()}
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
{/snippet}
{#snippet icon2()}
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
{/snippet}
{#snippet icon3()}
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
{/snippet}
