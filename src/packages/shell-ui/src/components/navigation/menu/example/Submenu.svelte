<script lang="ts">
  import { ShMenu, ShMenuItem, type MenuItemProps } from '@istock-shell/ui';
  const submenuItems: MenuItemProps[] = [
    {
      text: 'Item 1',
    },
    {
      text: 'Parent Item',
      subItem: {
        items: [
          { text: 'Submenu 1' },
          { text: 'Submenu 2' },
          {
            text: 'Parent',
            subItem: {
              items: [{ text: 'Submenu 1' }, { text: 'Submenu 2' }],
            },
          },
        ],
      },
    },
    {
      text: 'Item 3',
    },
  ];
  const moreItems: MenuItemProps[] = [
    {
      text: 'Solutions',
      subItem: {
        items: [{ text: 'Design' }, { text: 'Development' }, { text: 'Hosting' }, { text: 'Domain register' }],
      },
    },
    {
      text: 'Enterprise',
      subItem: {
        items: [
          { text: 'CRM software' },
          { text: 'Marketing management' },
          { text: 'Security' },
          { text: 'Consulting' },
        ],
      },
    },
    {
      text: 'Products',
      subItem: {
        items: [
          { text: 'UI Kit' },
          { text: 'WordPress themes' },
          { text: 'WordPress plugins' },
          {
            text: 'Open source',
            subItem: {
              items: [{ text: 'Auth management system' }, { text: 'VScode theme' }, { text: 'Color picker app' }],
            },
          },
        ],
      },
    },
    {
      text: 'Company',
      subItem: {
        items: [{ text: 'About us' }, { text: 'Contact us' }, { text: 'Privacy policy' }, { text: 'Press kit' }],
      },
    },
  ];
</script>

<div class="space-y-8">
  <div>
    <h3 class="text-lg font-semibold mb-4">折叠子菜单（class）</h3>
    <ShMenu items={submenuItems} class="w-56" />
  </div>
  <div>
    <h3 class="text-lg font-semibold mb-4">折叠子菜单（details）</h3>
    <ShMenu items={submenuItems} toggleType={2} class="w-56" />
  </div>
  <div>
    <h3 class="text-lg font-semibold mb-4">文件树</h3>
    <ShMenu class="max-w-xs w-full">
      <ShMenuItem>
        <a>
          {@render pdfIconRender()}
          resume.pdf
        </a>
      </ShMenuItem>
      <ShMenuItem>
        <details open>
          <summary>
            {@render folderIconRender()}
            My Files
          </summary>
          <ShMenu>
            <ShMenuItem>
              <a>
                {@render psdIconRender()}
                Project-final.psd
              </a>
            </ShMenuItem>
            <ShMenuItem>
              <a>
                {@render psdIconRender()}
                Project-final-2.psd
              </a>
            </ShMenuItem>
            <ShMenuItem>
              <details open>
                <summary>
                  {@render folderIconRender()}
                  Images
                </summary>
                <ShMenu>
                  <ShMenuItem>
                    <a>
                      {@render imgIconRender()}
                      Screenshot1.png
                    </a>
                  </ShMenuItem>
                  <ShMenuItem>
                    <a>
                      {@render imgIconRender()}
                      Screenshot2.png
                    </a>
                  </ShMenuItem>
                  <ShMenuItem>
                    <details open>
                      <summary>
                        {@render folderIconRender()}
                        Others
                      </summary>
                      <ShMenu>
                        <ShMenuItem>
                          <a>
                            {@render imgIconRender()}
                            Screenshot3.png
                          </a>
                        </ShMenuItem>
                      </ShMenu>
                    </details>
                  </ShMenuItem>
                </ShMenu>
              </details>
            </ShMenuItem>
          </ShMenu>
        </details>
      </ShMenuItem>
      <ShMenuItem>
        <a>
          {@render pdfIconRender()}
          reports-final-2.pdf
        </a>
      </ShMenuItem>
    </ShMenu>
  </div>
  <div>
    <h3 class="text-lg font-semibold mb-4">折叠子菜单（水平布局）</h3>
    <ShMenu items={submenuItems} layout="horizontal" collapsed={true} />
  </div>
  <div>
    <h3 class="text-lg font-semibold mb-4">超级菜单</h3>
    <ShMenu items={moreItems} canToggle={false} class="xl:menu-horizontal lg:min-w-max" />
  </div>
  <div>
    <h3 class="text-lg font-semibold mb-4">折叠子菜单展开（水平布局）</h3>
    <ShMenu items={submenuItems} toggleType={2} class="lg:menu-horizontal mb-64" />
  </div>
</div>

{#snippet pdfIconRender()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="h-4 w-4"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  </svg>
{/snippet}
{#snippet folderIconRender()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="h-4 w-4"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
    />
  </svg>
{/snippet}
{#snippet psdIconRender()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="h-4 w-4"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  </svg>
{/snippet}
{#snippet imgIconRender()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="h-4 w-4"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
    />
  </svg>
{/snippet}
