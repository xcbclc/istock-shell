<script lang="ts">
  import { ShText } from '@istock-shell/ui';
</script>

<h3 class="font-bold mt-2 mb-2">尺寸：</h3>
<ShText
  align="center"
  texts={[
    { text: '超小尺寸', size: 'xs' },
    { text: '小尺寸', size: 'sm' },
    { text: '中尺寸', size: 'md' },
    { text: '大尺寸', size: 'lg' },
    { text: '超大尺寸', size: 'xl' },
  ]}
/>
<h3 class="font-bold mt-2 mb-2">颜色：</h3>
<ShText
  align="center"
  texts={[
    { text: '中性颜色文本', color: 'neutral' },
    { text: '主要颜色文本', color: 'primary' },
    { text: '次要颜色文本', color: 'secondary' },
    { text: '强调颜色文本', color: 'accent' },
    { text: '信息颜色文本', color: 'info' },
    { text: '成功颜色文本', color: 'success' },
    { text: '警告颜色文本', color: 'warning' },
    { text: '错误颜色文本', color: 'error' },
  ]}
/>
<h3 class="font-bold mt-2 mb-2">对齐：</h3>
<div class="min-w-sm">
  <ShText
    texts={[
      { text: '文字居左', align: 'left' },
      { text: '文字居中', align: 'center' },
      { text: '文字居右', align: 'right' },
    ]}
  />
</div>
