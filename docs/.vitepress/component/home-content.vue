<template>

  <div class="home-content">
     <!-- 智能命令交互区域 -->
    <div class="section-demo">

      <div class="container">

        <div class="feature-grid">

          <div class="feature-content">

            <h2 class="section-title">
               <span class="gradient-text">智能命令交互</span> <span class="subtitle"
                >Intelligent Command Interface</span
              >
            </h2>

            <p class="section-desc">
               强大的命令解析引擎，支持智能补全、别名系统。 像聊天一样简单，比传统终端更高效。
            </p>

            <div class="feature-highlights">

              <div class="highlight-item">

                <div class="highlight-icon">⚡</div>

                <div class="highlight-text">

                  <h4>极速响应</h4>

                  <p>毫秒级命令解析，实时数据反馈</p>

                </div>

              </div>

              <div class="highlight-item">

                <div class="highlight-icon">🎯</div>

                <div class="highlight-text">

                  <h4>智能补全</h4>

                  <p>模糊匹配，自动提示，降低学习成本</p>

                </div>

              </div>

              <div class="highlight-item">

                <div class="highlight-icon">🔗</div>

                <div class="highlight-text">

                  <h4>管道操作</h4>

                  <p>Unix风格管道，灵活组合命令</p>

                </div>

              </div>

            </div>

          </div>

          <div class="feature-demo" style="padding-top: 40px">

            <div class="demo-card">
               <IStockShellDemo cmd="yyjr akshare && gp_zqlbtj" :height="480" subtitle="命令演示 · Command Demo" />
            </div>

          </div>

        </div>

      </div>

    </div>
     <!-- 全市场数据覆盖区域 -->
    <div class="section-demo alt-bg">

      <div class="container">

        <div class="feature-grid reverse">

          <div class="feature-demo">

            <div class="demo-card">
               <IStockShellDemo
                cmd=""
                mode="3"
                :cmdAutoCallback="onCmdQueryDataAutoCallback"
                :height="420"
                subtitle="数据查询 · Stock Data Query"
              />
            </div>

          </div>

          <div class="feature-content">

            <h2 class="section-title">
               <span class="gradient-text">全市场数据覆盖</span> <span class="subtitle">Comprehensive Market Data</span>

            </h2>

            <p class="section-desc">
               深度集成 AkShare 等数据源，覆盖 A股、港股、美股、期货、基金、外汇等全品类金融数据。
              使用命令，获取完整市场洞察。
            </p>

            <div class="data-categories">

              <div class="category-tag">A股</div>

              <div class="category-tag">港股</div>

              <div class="category-tag">美股</div>

              <div class="category-tag">期货</div>

              <div class="category-tag">基金</div>

              <div class="category-tag">外汇</div>

              <div class="category-tag">可转债</div>

              <div class="category-tag">期权</div>

            </div>

          </div>

        </div>

      </div>

    </div>
     <!-- AI智能分析区域 -->
    <div class="section-demo">

      <div class="container">

        <div class="ai-analysis-section">

          <div class="section-header">

            <h2 class="section-title">
               <span class="gradient-text">AI 智能分析</span> <span class="subtitle">AI Powered Analysis</span>
            </h2>

            <p class="section-desc">
               集成大语言模型能力，通过自然语言对话获取市场解读、投资建议。 让数据分析更具深度和洞察力。
            </p>

          </div>

          <div class="ai-showcase">

            <div class="ai-examples">

              <div class="example-card">

                <div class="example-icon">📊</div>

                <div class="example-content">

                  <h4>市场分析</h4>

                  <p>"分析一下当前的A股市场情绪"</p>

                </div>

              </div>

              <div class="example-card">

                <div class="example-icon">💡</div>

                <div class="example-content">

                  <h4>投资建议</h4>

                  <p>"贵州茅台现在的估值如何？"</p>

                </div>

              </div>

              <div class="example-card">

                <div class="example-icon">🔍</div>

                <div class="example-content">

                  <h4>数据解读</h4>

                  <p>"解释一下这个财报数据"</p>

                </div>

              </div>

            </div>

            <div class="demo-card">
               <IStockShellDemo
                cmd="ai:请简短总结一下当前的A股市场情绪"
                :height="356"
                subtitle="AI对话 · AI Conversation"
              />
            </div>

          </div>

        </div>

      </div>

    </div>
     <!-- 数据可视化区域 -->
    <div class="section-demo alt-bg">

      <div class="container">

        <div class="visualization-section">

          <div class="section-header">

            <h2 class="section-title">
               <span class="gradient-text">数据可视化</span> <span class="subtitle">Data Visualization</span>
            </h2>

            <p class="section-desc">
               内置多种专业图表组件，支持将数据通过管道输出为 K线图、折线图、饼图等。
              专业级的数据呈现，让复杂数据一目了然。
            </p>

          </div>

          <div class="viz-showcase">

            <div class="chart-types">

              <div class="chart-type active">

                <div class="chart-icon">📈</div>
                 <span>K线图</span>
              </div>

              <div class="chart-type">

                <div class="chart-icon">📊</div>
                 <span>饼图</span>
              </div>

              <div class="chart-type">

                <div class="chart-icon">📉</div>
                 <span>折线图</span>
              </div>

              <div class="chart-type">

                <div class="chart-icon">📋</div>
                 <span>表格</span>
              </div>

            </div>

            <div class="demo-card">
               <IStockShellDemo
                cmd='tb bt -y 占比 -lb 产品 -sj [{"产品":"茅台酒","占比":0.8408},{"产品":"其它系列酒","占比":0.137},{"产品":"其它业务","占比":0.0222}]'
                :height="640"
                subtitle="图表展示 · Charts Showcase"
              />
            </div>

          </div>

        </div>

      </div>

    </div>
     <!-- 特色对比区域 -->
    <div class="section-demo">

      <div class="container">

        <div class="comparison-section">

          <h2 class="section-title">
             <span class="gradient-text">为什么选择 iStock Shell</span> <span class="subtitle"
              >Why Choose iStock Shell</span
            >
          </h2>

          <div class="comparison-grid">

            <div class="comparison-card">

              <div class="comparison-header">

                <h3>传统金融软件</h3>

              </div>

              <div class="comparison-items">

                <div class="comparison-item negative">
                   <span class="item-icon">❌</span> <span>复杂的图形界面操作</span>
                </div>

                <div class="comparison-item negative">
                   <span class="item-icon">❌</span> <span>数据获取步骤繁琐</span>
                </div>

                <div class="comparison-item negative">
                   <span class="item-icon">❌</span> <span>分析功能相对固定</span>
                </div>

                <div class="comparison-item negative"> <span class="item-icon">❌</span> <span>学习成本高</span> </div>

              </div>

            </div>

            <div class="comparison-card highlighted">

              <div class="comparison-header">

                <h3>iStock Shell</h3>

                <div class="recommendation-badge">推荐</div>

              </div>

              <div class="comparison-items">

                <div class="comparison-item positive">
                   <span class="item-icon">✅</span> <span>自然语言命令交互</span>
                </div>

                <div class="comparison-item positive">
                   <span class="item-icon">✅</span> <span>一键获取全市场数据</span>
                </div>

                <div class="comparison-item positive">
                   <span class="item-icon">✅</span> <span>AI智能分析解读</span>
                </div>

                <div class="comparison-item positive">
                   <span class="item-icon">✅</span> <span>极低的学习成本</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
     <!-- 行动召唤区域 -->
    <div class="section-demo cta-section">

      <div class="container">

        <div class="cta-content">

          <h2 class="cta-title">准备开始您的智能金融分析之旅？</h2>

          <p class="cta-desc">立即体验 iStock Shell，感受 AI 驱动的金融数据分析新方式</p>

          <div class="cta-buttons">
             <a href="/use/quick-start/easy-to-use.html" class="cta-button primary"
              > <span>立即开始</span> <span class="button-icon">→</span> </a
            > <a href="https://istock.red/shell" class="cta-button secondary" target="_blank"
              > <span>在线体验</span> <span class="button-icon">🚀</span> </a
            >
          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<script setup lang="ts">
import { useData } from 'vitepress';
import IStockShellDemo from './istock-shell-demo.vue';

const { frontmatter: fm } = useData();

const onCmdQueryDataAutoCallback = async (contentWindow: Window, windowId: string) => {
  const ctx = contentWindow.CmdWindowsManager.cmdWindowsManager.getCmdContext(windowId);
  if (!ctx) return;
  const { input, output } = ctx.store;
  let cmds = [
    'yyjr akshare',
    'gp_shzqjys',
    'gp_zmgg',
    'gp_zmmg',
    'qh_np_sshqsj_pz -symbol 黄金',
    'gmjj_jjyj_xq -symbol 000300',
    'zq_sshqsj',
    'zq_sshqsj',
    'qq_mrtj_shzqjys',
    'yyjr ../',
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
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
};
</script>

<style scoped>
.home-content {
  background: var(--vp-c-bg);
}

.section-demo {
  padding: 80px 0;
}

.alt-bg {
  background: var(--vp-c-bg-soft);
}

.container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
}

.gradient-text {
  background: -webkit-linear-gradient(315deg, var(--vp-c-purple-2) 25%, var(--vp-c-brand-2));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  display: block;
  font-size: 14px;
  color: var(--vp-c-text-2);
  font-weight: 500;
  margin-top: 8px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.section-desc {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 40px;
  color: var(--vp-c-text-2);
  font-size: 18px;
  line-height: 1.6;
}

/* 功能网格布局 */
.feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.feature-grid.reverse {
  direction: rtl;
}

.feature-grid.reverse > * {
  direction: ltr;
}

.feature-content {
  padding: 20px 0;
}

.feature-highlights {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.highlight-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

.highlight-icon {
  font-size: 24px;
  flex-shrink: 0;
  margin-top: 2px;
}

.highlight-text h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.highlight-text p {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* 演示卡片 */
.demo-card {
  background: var(--vp-c-bg-soft);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.demo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.15);
}

.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.demo-tip {
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 4px 8px;
  border-radius: 6px;
}

/* 数据分类标签 */
.data-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.category-tag {
  padding: 8px 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: all 0.3s ease;
}

.category-tag:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

/* AI分析区域 */
.ai-analysis-section {
  text-align: center;
}

.ai-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 60px;
  align-items: start;
}

.ai-examples {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.example-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  text-align: left;
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.example-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-purple-1);
}

.example-icon {
  font-size: 32px;
  margin-bottom: 0;
  flex-shrink: 0;
  line-height: 1.2;
}

.example-card h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.example-card p {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
  font-style: italic;
}

/* 数据可视化区域 */
.visualization-section {
  text-align: center;
}

.viz-showcase {
  margin-top: 60px;
}

.chart-types {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.chart-type {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
}

.chart-type:hover,
.chart-type.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.chart-type.active {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.chart-icon {
  font-size: 24px;
}

.chart-type span {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

/* 对比区域 */
.comparison-section {
  text-align: center;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 60px;
}

.comparison-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.3s ease;
}

.comparison-card.highlighted {
  background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, var(--vp-c-purple-soft) 100%);
  border-color: var(--vp-c-brand-1);
  transform: scale(1.02);
  position: relative;
}

.comparison-header {
  text-align: center;
  margin-bottom: 24px;
  position: relative;
}

.comparison-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.recommendation-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--vp-c-brand-1);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.comparison-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comparison-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.comparison-item:hover {
  background: var(--vp-c-bg);
  transform: translateX(4px);
}

.item-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.comparison-item.positive {
  color: var(--vp-c-green-1);
}

.comparison-item.negative {
  color: var(--vp-c-red-1);
}

/* 行动召唤区域 */
.cta-section {
  background: linear-gradient(135deg, var(--vp-c-purple-soft) 0%, var(--vp-c-brand-soft) 100%);
  text-align: center;
  padding: 100px 0;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
  background: -webkit-linear-gradient(315deg, var(--vp-c-purple-2) 25%, var(--vp-c-brand-2));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}

.cta-desc {
  font-size: 18px;
  color: var(--vp-c-text-2);
  margin-bottom: 40px;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.cta-button.primary {
  background: var(--vp-c-brand-1);
  color: white;
}

.cta-button.primary:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.cta-button.secondary {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

.cta-button.secondary:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.button-icon {
  font-size: 18px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .section-demo {
    padding: 60px 0;
  }
  
  .feature-grid,
  .ai-showcase,
  .comparison-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .feature-grid.reverse {
    direction: ltr;
  }
  
  .section-title {
    font-size: 28px;
  }
  
  .cta-title {
    font-size: 28px;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-button {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
  
  .chart-types {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 8px;
  }
  
  .data-categories {
    justify-content: center;
  }
}

@media (min-width: 640px) {
  .section-title {
    font-size: 48px;
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-demo {
  animation: fadeInUp 0.8s ease-out;
}

.highlight-item,
.example-card,
.comparison-card,
.demo-card {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.highlight-item:nth-child(1) { animation-delay: 0.1s; }
.highlight-item:nth-child(2) { animation-delay: 0.2s; }
.highlight-item:nth-child(3) { animation-delay: 0.3s; }

.example-card:nth-child(1) { animation-delay: 0.1s; }
.example-card:nth-child(2) { animation-delay: 0.2s; }
.example-card:nth-child(3) { animation-delay: 0.3s; }
</style>

