<template>

  <div class="hero-play">
     <IStockShellDemo cmd="" mode="3" :height="360" :cmdAutoCallback="onCmdAutoCallback" />
    <div v-if="fm.hero?.image?.src" class="product-image" style="display: none">
       <img :src="fm.hero.image.src" :alt="fm.hero.image.alt" />
    </div>

  </div>

</template>

<script setup lang="ts">
import { useData } from 'vitepress';
import IStockShellDemo from './istock-shell-demo.vue';

const { frontmatter: fm } = useData();

const onCmdAutoCallback = async (contentWindow: Window, windowId: string) => {
  const ctx = contentWindow.CmdWindowsManager.cmdWindowsManager.getCmdContext(windowId);
  if (!ctx) return;
  const { input, output } = ctx.store;
  let cmds = [
    'yycz',
    'yyjr akshare',
    'gp_shzqjys',
    // 'ai: 请简短总结当前a股市场是否估值过高？#[${1}]',
    'yyjr ../wzdh',
    'mlcz',
    'cjdh',
    'yyjr ..',
    'lssc',
  ];
  while (true) {
    for (const cmd of cmds) {
      while (!input.canInput) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      const lastOutput = output.list[output.list.length - 1];
      let mentions: Array<{
        id: string;
        label: string;
        mentionSuggestionChar: string;
      }> = [];
      if (lastOutput) {
        mentions.push({
          id: lastOutput.id,
          label: lastOutput.input,
          mentionSuggestionChar: '#',
        });
      }
      let newCmd: string = cmd.replace(/\$\{1\}/g, lastOutput ? `${lastOutput.id},${lastOutput.input}` : '');
      for (let i = 1; i <= newCmd.length; i++) {
        input.commandEditor.handleCommandInput(newCmd.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      await input.sendCmd(newCmd, mentions);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    cmds = cmds.filter((c) => !c.startsWith('ai:'));
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
};
</script>

<style scoped>
.hero-play {
    position: relative;
    z-index: 10;
    width: 100%;
    margin-top: -60px;
  }
</style>

