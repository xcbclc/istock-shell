<script lang="ts">
  import { ShTable, ShTableRow, ShTableTh, ShTableTd, ShButton, ShCheckbox } from '@istock-shell/ui';
  let checkAll = $state<boolean[]>([]);
  let selects: string[] = $state([]);
  const indeterminate = $derived(selects.length > 0 && selects.length < 4);

  function onChangeAll(checked: boolean) {
    if (!checked) {
      selects = ['1', '2', '3', '4'];
    } else {
      selects = [];
    }
  }

  const setCheckboxSelect = (checked: boolean, value: string): string[] => {
    if (checked) {
      if (!selects.includes(value)) selects = [...selects, value];
    } else {
      selects = selects.filter((v) => v !== value);
    }
    return selects;
  };

  $effect(() => {
    if (selects.length === 4) {
      checkAll = [true];
    } else {
      checkAll = [false];
    }
  });
</script>

<div class="overflow-x-auto">
  <ShTable>
    <thead>
      <ShTableRow>
        <ShTableTh>
          <ShCheckbox
            bind:value={checkAll}
            options={[{ value: true, label: '' }]}
            {indeterminate}
            onclick={() => {
              onChangeAll(checkAll[0]);
            }}
          />
        </ShTableTh>
        <ShTableTh>Name</ShTableTh>
        <ShTableTh>Job</ShTableTh>
        <ShTableTh>Favorite Color</ShTableTh>
        <ShTableTh></ShTableTh>
      </ShTableRow>
    </thead>
    <tbody>
      <ShTableRow>
        <ShTableTh>
          <ShCheckbox
            bind:value={() => selects, (v) => setCheckboxSelect(!!v.length, '1')}
            options={[{ value: '1', label: '' }]}
          />
        </ShTableTh>
        <ShTableTd>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="mask mask-squircle h-12 w-12">
                <img src="https://img.daisyui.com/images/profile/demo/2@94.webp" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div class="font-bold">Hart Hagerty</div>
              <div class="text-sm opacity-50">United States</div>
            </div>
          </div>
        </ShTableTd>
        <ShTableTd>
          Zemlak, Daniel and Leannon
          <br />
          <span class="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </ShTableTd>
        <ShTableTd>Purple</ShTableTd>
        <ShTableTh><ShButton ghost size="xs">details</ShButton></ShTableTh>
      </ShTableRow>
      <ShTableRow>
        <ShTableTh
          ><ShCheckbox
            bind:value={() => selects, (v) => setCheckboxSelect(!!v.length, '2')}
            options={[{ value: '2', label: '' }]}
          /></ShTableTh
        >
        <ShTableTd>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="mask mask-squircle h-12 w-12">
                <img src="https://img.daisyui.com/images/profile/demo/3@94.webp" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div class="font-bold">Brice Swyre</div>
              <div class="text-sm opacity-50">China</div>
            </div>
          </div>
        </ShTableTd>
        <ShTableTd>
          Carroll Group
          <br />
          <span class="badge badge-ghost badge-sm">Tax Accountant</span>
        </ShTableTd>
        <ShTableTd>Red</ShTableTd>
        <ShTableTh><ShButton ghost size="xs">details</ShButton></ShTableTh>
      </ShTableRow>
      <ShTableRow>
        <ShTableTh
          ><ShCheckbox
            bind:value={() => selects, (v) => setCheckboxSelect(!!v.length, '3')}
            options={[{ value: '3', label: '' }]}
          /></ShTableTh
        >
        <ShTableTd>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="mask mask-squircle h-12 w-12">
                <img src="https://img.daisyui.com/images/profile/demo/4@94.webp" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div class="font-bold">Marjy Ferencz</div>
              <div class="text-sm opacity-50">Russia</div>
            </div>
          </div>
        </ShTableTd>
        <ShTableTd>
          Rowe-Schoen
          <br />
          <span class="badge badge-ghost badge-sm">Office Assistant I</span>
        </ShTableTd>
        <ShTableTd>Crimson</ShTableTd>
        <ShTableTh><ShButton ghost size="xs">details</ShButton></ShTableTh>
      </ShTableRow>
      <ShTableRow>
        <ShTableTh
          ><ShCheckbox
            bind:value={() => selects, (v) => setCheckboxSelect(!!v.length, '4')}
            options={[{ value: '4', label: '' }]}
          /></ShTableTh
        >
        <ShTableTd>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="mask mask-squircle h-12 w-12">
                <img src="https://img.daisyui.com/images/profile/demo/5@94.webp" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div class="font-bold">Yancy Tear</div>
              <div class="text-sm opacity-50">Brazil</div>
            </div>
          </div>
        </ShTableTd>
        <ShTableTd>
          Wyman-Ledner
          <br />
          <span class="badge badge-ghost badge-sm">Community Outreach Specialist</span>
        </ShTableTd>
        <ShTableTd>Indigo</ShTableTd>
        <ShTableTh><ShButton ghost size="xs">details</ShButton></ShTableTh>
      </ShTableRow>
    </tbody>
    <tfoot>
      <ShTableRow>
        <ShTableTh></ShTableTh>
        <ShTableTd>Name</ShTableTd>
        <ShTableTd>Job</ShTableTd>
        <ShTableTd>Favorite Color</ShTableTd>
        <ShTableTh></ShTableTh>
      </ShTableRow>
    </tfoot>
  </ShTable>
</div>
