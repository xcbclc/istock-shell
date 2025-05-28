<script lang="ts">
  import { ShTable, type TableDataList, type TableThead } from '@istock-shell/ui';

  const thead: TableThead = [
    { value: '', dataKey: 'index', tag: 'th' },
    { value: 'Name', dataKey: 'name' },
    { value: 'Job', dataKey: 'job' },
    { value: 'Company', dataKey: 'company' },
    { value: 'Location', dataKey: 'location' },
    { value: 'Last Login', dataKey: 'lastLogin' },
    { value: 'Favorite Color', dataKey: 'color' },
    { value: '', dataKey: 'index', tag: 'th' },
  ];
  const tbody: TableDataList = [
    {
      list: [
        { value: 1, tag: 'th' },
        { value: 'Cy Ganderton' },
        { value: 'Quality Control Specialist' },
        { value: 'Littel, Schaden and Vandervort' },
        { value: 'Canada' },
        { value: '12/16/2020' },
        { value: 'Blue' },
        { value: 1, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 2, tag: 'th' },
        { value: 'Hart Hagerty' },
        { value: 'Desktop Support Technician' },
        { value: 'Zemlak, Daniel and Leannon' },
        { value: 'United States' },
        { value: '12/5/2020' },
        { value: 'Purple' },
        { value: 2, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 3, tag: 'th' },
        { value: 'Brice Swyre' },
        { value: 'Tax Accountant' },
        { value: 'Carroll Group' },
        { value: 'China' },
        { value: '8/15/2020' },
        { value: 'Red' },
        { value: 3, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 4, tag: 'th' },
        { value: 'Marjy Ferencz' },
        { value: 'Office Assistant I' },
        { value: 'Rowe-Schoen' },
        { value: 'Russia' },
        { value: '3/25/2021' },
        { value: 'Crimson' },
        { value: 4, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 5, tag: 'th' },
        { value: 'Yancy Tear' },
        { value: 'Community Outreach Specialist' },
        { value: 'Wyman-Ledner' },
        { value: 'Brazil' },
        { value: '5/22/2020' },
        { value: 'Indigo' },
        { value: 5, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 6, tag: 'th' },
        { value: 'Irma Vasilik' },
        { value: 'Editor' },
        { value: 'Wiza, Bins and Emard' },
        { value: 'Venezuela' },
        { value: '12/8/2020' },
        { value: 'Purple' },
        { value: 6, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 7, tag: 'th' },
        { value: 'Meghann Durtnal' },
        { value: 'Staff Accountant IV' },
        { value: 'Schuster-Schimmel' },
        { value: 'Philippines' },
        { value: '2/17/2021' },
        { value: 'Yellow' },
        { value: 7, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 8, tag: 'th' },
        { value: 'Sammy Seston' },
        { value: 'Accountant I' },
        { value: "O'Hara, Welch and Keebler" },
        { value: 'Indonesia' },
        { value: '5/23/2020' },
        { value: 'Crimson' },
        { value: 8, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 9, tag: 'th' },
        { value: 'Lesya Tinham' },
        { value: 'Safety Technician IV' },
        { value: 'Turner-Kuhlman' },
        { value: 'Philippines' },
        { value: '2/21/2021' },
        { value: 'Maroon' },
        { value: 9, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 10, tag: 'th' },
        { value: 'Zaneta Tewkesbury' },
        { value: 'VP Marketing' },
        { value: 'Sauer LLC' },
        { value: 'Chad' },
        { value: '6/23/2020' },
        { value: 'Green' },
        { value: 10, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 11, tag: 'th' },
        { value: 'Andy Tipple' },
        { value: 'Librarian' },
        { value: 'Hilpert Group' },
        { value: 'Poland' },
        { value: '7/9/2020' },
        { value: 'Indigo' },
        { value: 11, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 12, tag: 'th' },
        { value: 'Sophi Biles' },
        { value: 'Recruiting Manager' },
        { value: 'Gutmann Inc' },
        { value: 'Indonesia' },
        { value: '2/12/2021' },
        { value: 'Maroon' },
        { value: 12, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 13, tag: 'th' },
        { value: 'Florida Garces' },
        { value: 'Web Developer IV' },
        { value: 'Gaylord, Pacocha and Baumbach' },
        { value: 'Poland' },
        { value: '5/31/2020' },
        { value: 'Purple' },
        { value: 13, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 14, tag: 'th' },
        { value: 'Maribeth Popping' },
        { value: 'Analyst Programmer' },
        { value: 'Deckow-Pouros' },
        { value: 'Portugal' },
        { value: '4/27/2021' },
        { value: 'Aquamarine' },
        { value: 14, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 15, tag: 'th' },
        { value: 'Moritz Dryburgh' },
        { value: 'Dental Hygienist' },
        { value: 'Schiller, Cole and Hackett' },
        { value: 'Sri Lanka' },
        { value: '8/8/2020' },
        { value: 'Crimson' },
        { value: 15, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 16, tag: 'th' },
        { value: 'Reid Semiras' },
        { value: 'Teacher' },
        { value: 'Sporer, Sipes and Rogahn' },
        { value: 'Poland' },
        { value: '7/30/2020' },
        { value: 'Green' },
        { value: 16, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 17, tag: 'th' },
        { value: 'Alec Lethby' },
        { value: 'Teacher' },
        { value: 'Reichel, Glover and Hamill' },
        { value: 'China' },
        { value: '2/28/2021' },
        { value: 'Khaki' },
        { value: 17, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 18, tag: 'th' },
        { value: 'Aland Wilber' },
        { value: 'Quality Control Specialist' },
        { value: 'Kshlerin, Rogahn and Swaniawski' },
        { value: 'Czech Republic' },
        { value: '9/29/2020' },
        { value: 'Purple' },
        { value: 18, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 19, tag: 'th' },
        { value: 'Teddie Duerden' },
        { value: 'Staff Accountant III' },
        { value: 'Pouros, Ullrich and Windler' },
        { value: 'France' },
        { value: '10/27/2020' },
        { value: 'Aquamarine' },
        { value: 19, tag: 'th' },
      ],
    },
    {
      list: [
        { value: 20, tag: 'th' },
        { value: 'Lorelei Blackstone' },
        { value: 'Data Coordinator' },
        { value: 'Witting, Kutch and Greenfelder' },
        { value: 'Kazakhstan' },
        { value: '6/3/2020' },
        { value: 'Red' },
        { value: 20, tag: 'th' },
      ],
    },
  ];

  const tfoot: TableDataList = [
    {
      list: thead.map((item, index) => {
        let tag: 'th' | 'td' = 'td';
        if (index === 0 || index === thead.length - 1) tag = 'th';
        return { ...item, tag };
      }),
    },
  ];
</script>

<div class="overflow-x-auto h-96 w-120">
  <ShTable {thead} {tbody} {tfoot} size="xs" pinRows pinCols />
</div>
